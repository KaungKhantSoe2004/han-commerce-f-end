import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import ProductModal from "./productModal";
import { localCall } from "../utilities/localstorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

const DiscountSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Loading state for fetching discounted products
  const [error, setError] = useState(false); // Error state for fetching discounted products
  const controls = useAnimation();
  const token = localStorage.getItem("han-commerce-token");
  const userData = JSON.parse(localStorage.getItem("han-commerce-user"));
  const navigate = useNavigate();
  const backendDomainName = "http://127.0.0.1:8000/";

  // Add or remove product from favorites
  const toggleFavorite = async (id, isFav) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      setIsLoading(true);
      const endpoint = isFav ? "removeFav" : "postFav";
      const response = await axios.post(
        `${backendDomainName}api/${endpoint}/`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "false") {
        return;
      }

      // Update the favorite status in the UI
      setDiscountedProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? { ...p, isFav: !isFav } : p))
      );
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch discounted products
  const fetchData = async () => {
    if (!token) {
      try {
        setIsFetching(true);
        const response = await axios.get(
          `${backendDomainName}api/getPlainDiscounts`
        );

        if (response.data.status === "false") {
          setError(true);
        } else {
          setDiscountedProducts(response.data.data);
        }
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          localCall("removeToken");
          localCall("removeUser");
          navigate("/login");
        }
        setError(true);
      } finally {
        setIsFetching(false);
      }
      return;
    }
    try {
      setIsFetching(true);
      const response = await axios.post(
        `${backendDomainName}api/getDiscounts`,
        { id: userData.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "false") {
        setError(true);
      } else {
        setDiscountedProducts(response.data.data);
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
      setError(true);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-moving carousel logic
  useEffect(() => {
    if (discountedProducts.length === 0) return;

    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % discountedProducts.length);
      controls.start({
        x: `-${currentFeature * 220}px`, // Adjust based on product card width
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [controls, currentFeature, discountedProducts.length]);

  // Skeleton Loading Component
  const renderSkeleton = () => (
    <div className="flex space-x-6 md:space-x-8 w-max">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="relative bg-neutral-400 rounded-xl overflow-hidden shadow-lg min-w-[220px] max-w-[220px] h-[220px] md:h-[300px] animate-pulse"
        >
          <div className="w-full h-full bg-gray-700"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-3">Discounted Products</h2>

      {/* Auto Moving Carousel */}
      <div className="relative overflow-hidden h-[220px] sm:h-[350px] lg:h-[400px]">
        {isFetching ? (
          renderSkeleton() // Show skeleton while loading
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-lg mb-4">Failed to load discounted products.</p>
            <button
              onClick={fetchData}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Retry
            </button>
          </div>
        ) : (
          <motion.div
            className="flex space-x-6 md:space-x-8 w-max"
            animate={controls}
            style={{ whiteSpace: "nowrap" }} // Keeps items in a single line
          >
            {discountedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="group cursor-pointer relative bg-neutral-400 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 min-w-[220px] max-w-[220px] h-[220px] md:h-[300px]"
                whileHover={{ scale: 1.05 }}
              >
                {/* Image Container */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  onClick={() => {
                    navigate(`product/${product.id}`);
                  }}
                >
                  <img
                    src={
                      product.cover_photo
                        ? `${backendDomainName}storage/${product.cover_photo}`
                        : "/placeholder.svg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    {product.discount}% OFF
                  </div>

                  {/* Hover Overlay with Product Info */}
                  <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute inset-0 p-4 flex flex-col justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {/* Top Section */}
                      <div className="space-y-2">
                        <div className="flex justify-end items-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(product.id, product.isFav);
                            }}
                            className="text-white/80 hover:text-red-500 transition-colors duration-300 float-right"
                          >
                            {product.isFav ? (
                              <FaHeart className="w-5 text-red-900 h-5" />
                            ) : (
                              <FiHeart className="w-5 text-red-900 h-5" />
                            )}
                          </button>
                        </div>
                        <h3 className="text-base font-semibold text-white line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {product.category_name}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <FiStar className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/80 text-sm ml-1">
                              {product.overall_ratings} (100)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {/* Price and Cart */}
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-red-500">
                            {product.price -
                              product.price * (Number(product.discount) / 100)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-500 hover:text-red-400 transition-colors duration-300 flex items-center space-x-1"
                          >
                            <FiShoppingCart className="w-4 h-4 text-black" />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </section>
  );
};

export default DiscountSection;
