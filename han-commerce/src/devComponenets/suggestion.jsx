import { useState, useEffect } from "react";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import axios from "axios";
import ProductModal from "./ProductModal";
import { FaHeart } from "react-icons/fa";

const backendDomainName = "http://127.0.0.1:8000/";

const Suggestion = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("han-commerce-token");

  // Fetch suggestions from the backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        let response;

        if (token) {
          // Authenticated request with POST

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          response = await axios.post(
            `${backendDomainName}api/getSuggestion`,
            {}, // Empty body since it's a POST request for suggestions
            config
          );
        } else {
          // Unauthenticated request with GET
          response = await axios.get(
            `${backendDomainName}api/getPlainSuggestion`
          );
        }

        if (response.data.status == "true") {
          setSuggestions(response.data.defaultProducts);
        } else {
          setError("No products found.");
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [token]);

  // Skeleton loading component (remains unchanged)
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-neutral-400 rounded-xl overflow-hidden shadow-lg animate-pulse"
        >
          <div className="aspect-square bg-gray-300"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Rest of the component (remains unchanged)
  return (
    <section className="max-w-7xl mx-auto mt-3 px-4">
      <h2 className="text-3xl font-bold mb-8">Suggested For You</h2>

      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {suggestions.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer relative bg-neutral-400 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={(e) => {
                // Prevent navigation if the cart button is clicked
                if (!e.target.closest("button")) {
                  window.location.href = `/product/${product.id}`;
                }
              }}
            >
              {/* Image Container - Adjusted to square aspect ratio */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={`${backendDomainName}storage/${product.cover_photo}`}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Discount or New Arrival Badge */}
                {product.discount ? (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    {product.discount}% OFF
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    New Arrival
                  </div>
                )}

                {/* Hover Overlay with Product Info */}
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 p-4 flex flex-col justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Top Section */}
                    <div className="space-y-2">
                      <div className="flex justify-end items-end">
                        {product.isFav ? (
                          <button className="text-white/80 hover:text-red-500 transition-colors duration-300 float-right">
                            <FaHeart className="w-5 h-5 text-red-600 " />
                          </button>
                        ) : (
                          <button className="text-white/80 hover:text-red-500 transition-colors duration-300 float-right">
                            <FiHeart className="w-5 h-5 " />
                          </button>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-white line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {product.category}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <FiStar className="w-4 h-4 text-yellow-400" />
                          <span className="text-white/80 text-sm ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {/* Colors */}
                      <div className="flex space-x-2">
                        {JSON.parse(product.colors).map((color, index) => (
                          <div
                            key={index}
                            className={`w-5 h-5 rounded-full ${color} cursor-pointer border border-transparent hover:border-white transition-all duration-300`}
                          />
                        ))}
                      </div>

                      {/* Price and Cart */}
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-red-500">
                          ${Number(product.price).toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent onClick from firing
                            setSelectedProduct(product);
                          }}
                          className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-500 hover:text-red-400 transition-colors duration-300 flex items-center space-x-1"
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </section>
  );
};

export default Suggestion;
