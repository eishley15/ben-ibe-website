import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setCartItems(items);
    }
  }, [isOpen]);

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleEmptyCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            from: item.from,
            to: item.to,
            message: item.message,
            pickupDateTime: item.pickupDateTime,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed.");
      }

      alert("Your order has been placed successfully!");

      localStorage.removeItem("cartItems");
      onClose();
      navigate("/products");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error during checkout. Please try again.");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // If the cart is not open, don't render the component
  if (!isOpen) return null;

  return (
    // Full-screen overlay with semi-transparent background
    <div
      className="fixed inset-0 bg-black/10 bg-opacity-50 z-500 transition-opacity duration-300"
      onClick={onClose} // Closes the sidebar when clicking the overlay
    >
      {/* The actual cart sidebar that slides in */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 z-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevents clicks on the sidebar from closing it
      >
        <div className="flex justify-between items-center !p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          className="!p-4 overflow-y-auto"
          style={{ height: "calc(100% - 120px)" }}
        >
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 !mb-4">
                <img
                  src={`http://localhost:3000/${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <p className="font-semibold !mx-2">{item.name}</p>
                  <p className="text-sm text-gray-500 !mx-2">
                    ₱{item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 w-full !p-4 bg-white border-t">
          <div className="flex justify-between items-center font-bold text-lg !mb-4">
            <span>Subtotal:</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEmptyCart}
              className="flex-grow border border-[#9C332A] text-[#9C332A] !py-2 rounded-md font-semibold hover:bg-gray-100"
            >
              Empty Cart
            </button>
            <button
              onClick={handleCheckout}
              className="flex-grow bg-[#9C332A] text-white !py-2 rounded-md font-semibold hover:bg-[#8e7362]"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
