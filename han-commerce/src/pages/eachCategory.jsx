import { useState, useEffect } from "react";
import axios from "axios";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import ProductModal from "../devComponenets/productModal";
import { useParams } from "react-router-dom";

const EachCategoryPage = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page
  const backendDomainName = "http://127.0.0.1:8000/";
  const { id } = useParams();
  // Fetch products for the category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `${backendDomainName}api/getProductsByCategory`,
          {
            id,
          }
        );
        console.log(response);
        if (response.data.status === "true") {
          setMyProducts(response.data.data);
        } else {
          console.log("Error fetching products");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  // Toggle favorite status
  const toggleFavorite = (productId, isFav) => {
    setMyProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, isFav: !isFav } : product
      )
    );
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = myProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Skeleton Loading Component
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(productsPerPage)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-neutral-400 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="relative aspect-square overflow-hidden">
            <div className="w-full h-full bg-gray-700"></div>{" "}
            {/* Image placeholder */}
          </div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>{" "}
            {/* Title placeholder */}
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>{" "}
            {/* Category placeholder */}
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>{" "}
            {/* Rating placeholder */}
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>{" "}
            {/* Price placeholder */}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      {/* Product Grid */}
      {loading ? (
        renderSkeleton() // Show skeleton while loading
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer relative bg-neutral-400 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={
                      product.cover_photo
                        ? `${backendDomainName}storage/${product.cover_photo}`
                        : "/placeholder.svg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* New Arrival Badge */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    New Arrival
                  </div>
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      {product.discount}% Discount
                    </div>
                  )}

                  {/* Hover Overlay with Product Info */}
                  <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute inset-0 p-4 flex flex-col justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {/* Top Section */}
                      <div className="space-y-2">
                        <div className="flex justify-end items-end">
                          <button
                            onClick={() =>
                              toggleFavorite(product.id, product.isFav)
                            }
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
                              {product.overall_rating} (100)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {/* Price and Cart */}
                        <div className="flex items-center justify-between">
                          {product.discount ? (
                            <span className="text-xl font-bold text-red-500">
                              <span className="line-through">
                                {product.price} Kyats
                              </span>
                              <span>
                                {Number(product.price) -
                                  (
                                    Number(product.price) *
                                    (1 - Number(product.discount) / 100)
                                  ).toFixed(2)}{" "}
                                Kyats
                              </span>
                            </span>
                          ) : (
                            <span className="text-xl font-bold text-red-500">
                              {product.price} Kyats
                            </span>
                          )}
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="bg-white cursor-pointer text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-500 hover:text-gray-400 transition-colors duration-300 flex items-center space-x-1"
                          >
                            <FiShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-4 my-8">
            <button
              className={`py-2 px-4 rounded-full ${
                currentPage === 1
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className={`py-2 px-4 rounded-full ${
                indexOfLastProduct >= myProducts?.length
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              disabled={indexOfLastProduct >= myProducts?.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
};

export default EachCategoryPage;
