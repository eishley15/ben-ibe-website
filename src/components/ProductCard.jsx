import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#9C332A] rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
      {/* Container for both image and details */}
      <div className="relative w-full h-80 overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={`http://localhost:3000/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col justify-between items-center">
        {/* Product Name and Price */}
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col !p-2">
            <Link to={`/product/${product._id}`}>
              <h3 className="text-sm text-[#FFF9F0] font-bold">
                {product.name}
              </h3>
            </Link>
            <p className="text-[#FFF9F0] text-xs font-light">
              ₱{product.price.toFixed(2)}
            </p>
          </div>
          {/* Heart Icon (Favorite Button) */}
          <div className="p-2 cursor-pointer transition-transform duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#FFF9F0] hover:fill-[#FFF9F0] !mx-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
        </div>

        {/* Add to Cart Button, now inside the same container */}
        <Link
          to={`/product/${product._id}`}
          className="bg-[#FFF9F0] !text-[#9C332A] !px-4 !py-1 !m-2 rounded-full font-normal text-sm hover:bg-[#8e7362] transition-colors self-end mt-2"
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
