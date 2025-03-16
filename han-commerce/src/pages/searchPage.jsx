"use client";

import { useState, useEffect, useRef } from "react";
import { localCall } from "../utilities/localstorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductModal from "../devComponenets/productModal";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setInitialProducts } from "../features/productSlice";
import { setInitialCategories } from "../features/categorySlice";

const backendDomainName = "http://127.0.0.1:8000/";

function SearchBar({ searchTerm, onSearch }) {
  const controls = useAnimation();

  const inputRef = useRef(null);

  const handleFocus = () => {
    controls.start({ width: "100%" });
  };

  const handleBlur = () => {
    if (!searchTerm) {
      controls.start({ width: "80%" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 max-w-3xl mx-auto px-4 sm:px-0"
    >
      <div className="relative flex items-center bg-gray-800 rounded-full overflow-hidden shadow-xl shadow-gray-900/50 border border-gray-700 hover:border-red-500/50 transition-all duration-300">
        <motion.div className="flex items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="What are you looking for today?"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            initial={{ width: "80%" }}
            animate={controls}
            transition={{ duration: 0.3 }}
            className="w-full px-4 py-4 bg-transparent text-white border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-base transition-all duration-300"
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onSearch(searchTerm);
            inputRef.current.blur();
          }}
          className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold focus:outline-none transition-all duration-300"
        >
          <span className="hidden sm:inline">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:ml-2 sm:h-4 sm:w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

function FilterButtons({ categories, activeFilter, setActiveFilter, loading }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <AnimatePresence>
      {loading ? (
        <div className="flex overflow-x-auto scrollbar-hide py-2 mb-8">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium animate-pulse w-24 h-9 mr-3 flex-shrink-0"
              ></div>
            ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          <div
            ref={scrollRef}
            className="flex flex-wrap overflow-x-auto py-2 scrollbar-hide pl-4 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1 text-xs sm:px-5 sm:py-2 sm:text-sm rounded-full font-medium transition-all duration-300 mb-2 mr-2 ${
                  activeFilter === category
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20 border border-red-500"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PriceFilter({ minPrice, maxPrice, onPriceChange }) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localMin !== minPrice) onPriceChange("min", localMin);
      if (localMax !== maxPrice) onPriceChange("max", localMax);
    }, 300);
    return () => clearTimeout(timer);
  }, [localMin, localMax, minPrice, maxPrice, onPriceChange]);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6 bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-800"
    >
      <h3 className="text-sm font-semibold text-red-500 mb-3">Price Range</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="w-full pl-8 pr-2 py-2 bg-gray-800 text-white text-sm border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 rounded-lg transition-all duration-300"
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
            ₭
          </span>
        </div>
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="w-full pl-8 pr-2 py-2 bg-gray-800 text-white text-sm border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 rounded-lg transition-all duration-300"
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
            ₭
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonLoader() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-800"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-800 rounded w-1/4"></div>
          <div className="h-6 bg-gray-800 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

function ProductList({
  products,
  isSearching,
  loading,
  onCartClick,
  navigate,
  clearFilters,
}) {
  const displayedProducts = isSearching ? products : products.slice(0, 10);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {loading && displayedProducts.length == 0 ? (
        Array(10)
          .fill(0)
          .map((_, index) => <SkeletonLoader key={index} />)
      ) : displayedProducts.length > 0 ? (
        displayedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-red-500/50 transition-all duration-300 relative"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onCartClick(product);
              }}
              className="absolute top-3 right-3 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors duration-300 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </motion.button>

            <div
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={`${backendDomainName}storage/${product.cover_photo}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-red-500 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3 truncate">
                  {product.category}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">
                    {Number(product.price).toFixed(2)} Kyats
                  </span>
                  {product.discount > 0 && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div
          className="col-span-full text-center text-gray-500 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl font-medium">No products found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

function MobileFilterDrawer({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-50 p-6 border-t border-gray-800 max-h-[80vh] overflow-auto"
          >
            <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SearchPage() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(
    useSelector((state) => state.products.products)
  );

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(
    useSelector((state) => state.categories.categories)
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${backendDomainName}api/getAllProducts`
      );
      if (response.data.status === "false") {
        console.log("error occurred");
        setLoading(false);
        return;
      } else {
        setProducts(response.data.data);
        dispatch(setInitialProducts(response.data.data));
        setFilteredProducts(response.data.data);
        setCategories([...response.data.categories]);
        dispatch(setInitialCategories(response.data.categories));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      let filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (activeFilter === "All" || product.category === activeFilter) &&
          (minPrice === "" || product.price >= Number.parseFloat(minPrice)) &&
          (maxPrice === "" || product.price <= Number.parseFloat(maxPrice))
      );

      // Apply sorting
      filtered = sortProducts(filtered, sortOption);

      const timer = setTimeout(() => {
        setFilteredProducts(filtered);
        setIsSearching(searchTerm.length > 0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, activeFilter, products, minPrice, maxPrice, sortOption]);

  const sortProducts = (products, option) => {
    switch (option) {
      case "featured":
        return [...products].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
      case "newest":
        return [...products].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "discount":
        return [...products].sort((a, b) => b.discount - a.discount);
      default:
        return products;
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePriceChange = (type, value) => {
    if (type === "min") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilter("All");
    setMinPrice("");
    setMaxPrice("");
    setSortOption("featured");
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div id="search" className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent"
        >
          Product Search
        </motion.h1>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

        {/* Desktop Filters */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {filteredProducts.length} Products
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Discount</option>
            </select>
          </div>
        </div>

        {/* Mobile Sort & Filter Button */}
        <div className="flex md:hidden justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">
            {filteredProducts.length} Products
          </h2>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span>Filters</span>
            </motion.button>
          </div>
        </div>

        <FilterButtons
          categories={categories}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          loading={loading}
        />

        {/* Desktop Price Filter */}
        <div className="hidden md:block">
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="mb-6 px-4 py-2 bg-transparent border border-red-600 text-red-600 text-sm rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Clear Filters
          </motion.button>
        </div>

        <ProductList
          products={filteredProducts}
          isSearching={isSearching}
          loading={loading}
          onCartClick={(product) => setSelectedProduct(product)}
          navigate={navigate}
          clearFilters={clearFilters}
        />

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Filters</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="p-2 rounded-full bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </motion.button>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-red-500 mb-2">Sort By</h4>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full bg-gray-800 text-white text-sm border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Discount</option>
            </select>
          </div>

          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
          />

          <div className="flex gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                clearFilters();
                setMobileFiltersOpen(false);
              }}
              className="flex-1 px-4 py-2 bg-transparent border border-red-600 text-red-600 text-sm rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Clear All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm rounded-full transition-all duration-300"
            >
              Apply Filters
            </motion.button>
          </div>
        </MobileFilterDrawer>

        <AnimatePresence>
          {selectedProduct && (
            <ProductModal
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchPage;
