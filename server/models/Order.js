// models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  pickupDateTime: {
    type: Date,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema], // This is the required format for your server.js
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;