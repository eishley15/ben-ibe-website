// server.js

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from "fs";
import nodemailer from 'nodemailer'; // Import nodemailer

// Import models
import Product from './models/Product.js'; 
import Order from './models/Order.js';

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// Mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const apiRouter = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Serve uploads folder statically
app.use("/uploads", express.static("uploads"));

// =========================================================================
// PRODUCT MANAGEMENT (ADMIN ACCESS)
// =========================================================================

// POST /api/products: Create a new product (with image upload)
apiRouter.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, flowerType, color } = req.body;
    
    // Check if required fields and image are provided
    if (!name || !price || !req.file) {
      return res.status(400).json({ message: "Product name, price, and image are required." });
    }

    // Get the path to the uploaded image
    const imagePath = req.file.path;

    const newProduct = new Product({
      name,
      price: parseFloat(price), // Ensure price is a number
      description,
      image: imagePath,
      flowerType, // Add flowerType
      color, // Add color
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
});

// GET /api/products: Get all products (with optional search and filters)
apiRouter.get('/products', async (req, res) => {
  try {
    const { search, flowerType, color, price } = req.query;
    let query = {};

    // Build search query for name and description
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive
      query.$or = [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } }
      ];
    }

    // Build filter query for flower type
    if (flowerType) {
      const types = Array.isArray(flowerType) ? flowerType : [flowerType];
      query.flowerType = { $in: types };
    }

    // Build filter query for color
    if (color) {
      const colors = Array.isArray(color) ? color : [color];
      query.color = { $in: colors };
    }

    // Build filter query for price
    if (price) {
      const priceRanges = Array.isArray(price) ? price : [price];
      const orConditions = priceRanges.map(range => {
        if (range === "0-500") return { price: { $gte: 0, $lte: 500 } };
        if (range === "500-1000") return { price: { $gt: 500, $lte: 1000 } };
        if (range === "1000-1500") return { price: { $gt: 1000, $lte: 1500 } };
        if (range === "1500+") return { price: { $gt: 1500 } };
        return {};
      });
      query.$and = (query.$and || []).concat([{ $or: orConditions }]);
    }
    
    // Find products based on the constructed query and sort by newest first
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// PUT /api/products/:id: Update a product (with optional new image)
apiRouter.put('/products/:id', upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, flowerType, color } = req.body;
    
    const updateData = { name, price: parseFloat(price), description, flowerType, color };

    // If a new image is uploaded, update the image path
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE /api/products/:id: Delete a product
apiRouter.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Optional: Delete the image file from the server
    if (deletedProduct.image && fs.existsSync(deletedProduct.image)) {
        fs.unlinkSync(deletedProduct.image);
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

apiRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// =========================================================================
// ORDER MANAGEMENT
// =========================================================================

// POST /api/orders: Create a new order
apiRouter.post('/orders', async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item." });
    }

    // Create a new order document that contains an array of items.
    const newOrder = new Order({
      items: items.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        from: item.from,
        to: item.to,
        message: item.message,
        pickupDateTime: item.pickupDateTime,
      })),
      status: 'pending', // Set initial status
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ 
      message: 'Order placed successfully!',
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});

// =========================================================================
// CONTACT FORM
// =========================================================================

// Configure Nodemailer transporter with your Gmail details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address from .env
    pass: process.env.GMAIL_PASS, // Your Gmail App Password from .env
  },
});

// POST /api/contact: Handle contact form submissions
apiRouter.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send email to the owner
    subject: `New message from contact form on your website`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.' });
  }
});

// Use the router for all paths starting with /api
app.use('/api', apiRouter);

app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// START THE SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});