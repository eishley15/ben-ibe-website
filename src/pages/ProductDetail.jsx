// src/pages/ProductDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FooterRed from "../components/FooterRed";
import { Link } from "react-router-dom";

// The ProductDetail component now accepts an 'openCart' prop
const ProductDetail = ({ openCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // New state variables for form inputs
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value, 10));
    setQuantity(isNaN(value) ? 1 : value);
  };

  const handleAddToCart = () => {
    // Check if required fields are filled
    if (!from || !to || !pickupDateTime) {
      alert(
        "Please fill in the 'From', 'To', and 'Pickup Date & Time' fields."
      );
      return;
    }

    const itemToAdd = {
      ...product,
      quantity,
      from,
      to,
      message,
      pickupDateTime,
    };

    // Get existing cart items from local storage
    const existingItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Add the new item
    const updatedCart = [...existingItems, itemToAdd];

    // Save the updated cart back to local storage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Open the cart sidebar
    if (openCart) {
      openCart();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F0] min-h-screen flex flex-col">
      <main className="container mx-auto !px-4 !py-8 flex-grow">
        <Link
          to="/products"
          className="text-2xl !ml-4 !text-[#9C332A] hover:underline"
        >
          ←
        </Link>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={`http://localhost:3000/${product.image}`}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg max-w-lg"
            />
          </div>

          {/* Product Details and Form */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold text-[#9C332A] mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-semibold text-gray-800 mb-6">
              ₱{product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="space-y-2 text-gray-700 mb-6">
              <p>
                <strong>Flower Type:</strong> {product.flowerType || "N/A"}
              </p>
              <p>
                <strong>Color:</strong> {product.color || "N/A"}
              </p>
            </div>

            {/* Custom Fields and Add to Cart */}
            <div className="rounded-lg space-y-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="from-input"
                  className="font-semibold text-gray-700"
                >
                  From:
                </label>
                <input
                  type="text"
                  id="from-input"
                  name="from" // ADDED THIS
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9C332A]"
                  placeholder="Your Name"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="to-input"
                  className="font-semibold text-gray-700"
                >
                  To:
                </label>
                <input
                  type="text"
                  id="to-input"
                  name="to" // ADDED THIS
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9C332A]"
                  placeholder="Recipient's Name"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="message-input"
                  className="font-semibold text-gray-700"
                >
                  Message On The Card:
                </label>
                <textarea
                  id="message-input"
                  name="message" // ADDED THIS
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9C332A]"
                  placeholder="Your personal message here..."
                ></textarea>
              </div>

              {/* Pickup Date & Time Input */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="pickup-datetime-input"
                  className="font-semibold text-gray-700"
                >
                  Pickup Date & Time:
                </label>
                <input
                  type="datetime-local"
                  id="pickup-datetime-input"
                  name="pickupDateTime" // ADDED THIS
                  value={pickupDateTime}
                  onChange={(e) => setPickupDateTime(e.target.value)}
                  className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9C332A]"
                />
              </div>

              <div className="flex items-center gap-4 !my-10">
                <label
                  htmlFor="quantity-input"
                  className="font-semibold text-gray-700"
                >
                  Qty:
                </label>
                <input
                  type="number"
                  id="quantity-input"
                  name="quantity" // ADDED THIS
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 !p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#9C332A]"
                />
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-[#9C332A] text-white !py-2 !px-6 rounded-full font-semibold transition-colors duration-200 hover:bg-[#8e7362]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterRed />
    </div>
  );
};

export default ProductDetail;
