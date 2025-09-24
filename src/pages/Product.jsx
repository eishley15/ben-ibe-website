import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import FooterRed from "../components/FooterRed";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFlowerTypes, setSelectedFlowerTypes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // Define filter options
  const flowerTypes = [
    { value: "Fresh Flowers", label: "Fresh Flowers" },
    { value: "Dried Flowers", label: "Dried Flowers" },
    { value: "Balloon", label: "Balloon" },
    { value: "Personalized Gift", label: "Personalized Gift" },
  ];

  const colors = [
    { value: "Red", label: "Red" },
    { value: "Pink", label: "Pink" },
    { value: "Yellow", label: "Yellow" },
    { value: "Purple", label: "Purple" },
  ];

  const priceRanges = [
    { value: "0-500", label: "₱0 - ₱500" },
    { value: "500-1000", label: "₱500 - ₱1000" },
    { value: "1000-1500", label: "₱1000 - ₱1500" },
    { value: "1500+", label: "₱1500+" },
  ];

  // Fetch products with search and filter parameters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      // Build query parameters
      const params = new URLSearchParams();

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      selectedFlowerTypes.forEach((type) => params.append("flowerType", type));
      selectedColors.forEach((color) => params.append("color", color));
      selectedPriceRanges.forEach((range) => params.append("price", range));

      const queryString = params.toString();
      const url = `http://localhost:3000/api/products${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedFlowerTypes, selectedColors, selectedPriceRanges]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle search input with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    fetchProducts();
  };

  // Handle search on Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchProducts();
    }
  };

  // Handle flower type filter change
  const handleFlowerTypeChange = (flowerType) => {
    setSelectedFlowerTypes((prev) =>
      prev.includes(flowerType)
        ? prev.filter((type) => type !== flowerType)
        : [...prev, flowerType]
    );
  };

  // Handle color filter change
  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Handle price range filter change
  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(priceRange)
        ? prev.filter((range) => range !== priceRange)
        : [...prev, priceRange]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedFlowerTypes([]);
    setSelectedColors([]);
    setSelectedPriceRanges([]);
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 !px-20 !h-auto flex-grow">
        {/* Recommended For You section */}
        <section className="text-left my-12 !px-40 !mx-20">
          <h2 className="text-4xl font-bold text-[#9C332A] !mb-4">
            Recommended For You
          </h2>
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search for bouquets"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
                className="w-full !py-3 !px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7a9d7a] transition-all duration-300"
              />
            </div>
          </div>
        </section>

        {/* Product Grid and Filters */}
        <div className="flex flex-col lg:flex-row gap-8 !m-10">
          {/* Filter Options Sidebar */}
          <aside className="w-full lg:w-1/4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Filter Options:</h3>
              {(selectedFlowerTypes.length > 0 ||
                selectedColors.length > 0 ||
                selectedPriceRanges.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[#9C332A] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="space-y-4">
              {/* By Flower Type */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-lg !my-2">By Flower Type</h4>
                <ul className="!space-y-1 text-sm">
                  {flowerTypes.map((flowerType) => (
                    <li key={flowerType.value} className="!mb-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFlowerTypes.includes(
                            flowerType.value
                          )}
                          onChange={() =>
                            handleFlowerTypeChange(flowerType.value)
                          }
                          className="!mr-2 appearance-none h-4 w-4 border border-gray-400 bg-[#FFF9F0] checked:bg-[#9C332A] checked:border-[#9C332A] focus:outline-none transition duration-200 mt-1 align-top relative"
                        />
                        <span
                          className={
                            selectedFlowerTypes.includes(flowerType.value)
                              ? "font-semibold"
                              : ""
                          }
                        >
                          {flowerType.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* By Color */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-lg !my-2">By Color</h4>
                <ul className="!space-y-1 text-sm">
                  {colors.map((color) => (
                    <li key={color.value} className="!mb-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color.value)}
                          onChange={() => handleColorChange(color.value)}
                          className="!mr-2 appearance-none h-4 w-4 border border-gray-400 bg-[#FFF9F0] checked:bg-[#9C332A] checked:border-[#9C332A] focus:outline-none transition duration-200 mt-1 align-top"
                        />
                        <span
                          className={
                            selectedColors.includes(color.value)
                              ? "font-semibold"
                              : ""
                          }
                        >
                          {color.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* By Price */}
              <div>
                <h4 className="font-semibold text-lg !my-2">By Price</h4>
                <ul className="space-y-1 text-sm">
                  {priceRanges.map((priceRange) => (
                    <li key={priceRange.value} className="!mb-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(
                            priceRange.value
                          )}
                          onChange={() =>
                            handlePriceRangeChange(priceRange.value)
                          }
                          className="!mr-2 appearance-none h-4 w-4 border border-gray-400 bg-[#FFF9F0] checked:bg-[#9C332A] checked:border-[#9C332A] focus:outline-none transition duration-200 mt-1 align-top"
                        />
                        <span
                          className={
                            selectedPriceRanges.includes(priceRange.value)
                              ? "font-semibold"
                              : ""
                          }
                        >
                          {priceRange.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Active Filters Display */}
              {(selectedFlowerTypes.length > 0 ||
                selectedColors.length > 0 ||
                selectedPriceRanges.length > 0) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold mb-2">Active Filters:</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedFlowerTypes.map((type) => (
                      <span
                        key={type}
                        className="bg-[#9C332A] text-white !px-2 !py-1 rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
                    {selectedColors.map((color) => (
                      <span
                        key={color}
                        className="bg-[#9C332A] text-white !px-2 !py-1 rounded-full text-xs"
                      >
                        {color}
                      </span>
                    ))}
                    {selectedPriceRanges.map((range) => (
                      <span
                        key={range}
                        className="bg-[#9C332A] text-white !px-2 !py-1 rounded-full text-xs"
                      >
                        {priceRanges.find((p) => p.value === range)?.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {loading && (
              <div className="text-center text-gray-500 py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#9C332A]"></div>
                <p className="mt-2">Loading products...</p>
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 py-10">{error}</div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                <p className="text-lg mb-2">No products found.</p>
                {(searchTerm ||
                  selectedFlowerTypes.length > 0 ||
                  selectedColors.length > 0 ||
                  selectedPriceRanges.length > 0) && (
                  <p className="text-sm">
                    Try adjusting your search or filters.
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterRed />
    </div>
  );
};

export default ProductPage;
