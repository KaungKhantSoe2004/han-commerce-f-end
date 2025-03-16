"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { localCall } from "../utilities/localstorage";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductModal from "../devComponenets/productModal";

// Mock product data
const product = {
  cover_img: "/placeholder.svg?height=600&width=800",
  name: "Premium Wireless Headphones",
  category: "Electronics",
  description:
    "Experience crystal-clear sound with our premium wireless headphones. Featuring advanced noise-cancellation technology, comfortable over-ear design, and long-lasting battery life.",
  price: 199.99,
  available_quantity: 50,
  product_imgs: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  colors: ["#000000", "#ea0b0b"], // Add colors to the product data
};

// Skeleton Loading Component (unchanged)
const SkeletonLoading = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Images */}
          <div className="space-y-4">
            <div className="w-full h-[400px] bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-24 bg-gray-800 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Right column - Product Info */}
          <div className="space-y-6">
            <div>
              <div className="h-8 w-3/4 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-800 rounded mt-2 animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-800 rounded animate-pulse"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-8 w-1/4 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-1/4 bg-gray-800 rounded animate-pulse"></div>
            </div>

            <div className="space-y-4">
              <div className="w-full h-12 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="w-full h-12 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>

            <div className="border-t border-red-800 pt-4">
              <div className="h-6 w-1/4 bg-gray-800 rounded mb-2 animate-pulse"></div>
              <div className="space-y-1">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-4 w-full bg-gray-800 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductInfoPage = () => {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState(product);
  const backendDomainName = "http://127.0.0.1:8000/";
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const { id } = useParams();
  const token = localStorage.getItem("han-commerce-token");
  const userData = JSON.parse(localStorage.getItem("han-commerce-user"));

  // Add or remove product from favorites
  const toggleFavorite = async (id, isFav) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const endpoint = isFav ? "removeFav" : "postFav";
      console.log(userData.id);
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
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data from the backend
  const fetchData = async () => {
    if (userData == null) {
      try {
        const response = await axios.post(
          `${backendDomainName}api/getProduct`,
          {
            id,
          }
        );
        console.log(response);
        if (response.data.status === "false") {
          console.log("error occurred");
          setProductInfo(null); // Set productInfo to null if no data is found
        } else {
          setProductInfo(response.data.data);
          setCatalogs(JSON.parse(response.data.data.product_catalog));
          // console.log(response.data.data.product_catalog);
        }
      } catch (error) {
        console.log(error);
        if (error.message === "Request failed with status code 401") {
          localCall("removeToken");
          localCall("removeUser");
          navigate("/login");
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    }
    try {
      const response = await axios.post(`${backendDomainName}api/getProduct`, {
        id,
        userId: userData.id,
      });
      console.log(response);
      if (response.data.status === "false") {
        console.log("error occurred");
        setProductInfo(null); // Set productInfo to null if no data is found
      } else {
        setProductInfo(response.data.data);
        setCatalogs(JSON.parse(response.data.data.product_catalog));
        // console.log(response.data.data.product_catalog);
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <SkeletonLoading />;
  }

  // If productInfo is null or undefined, show a fallback UI
  if (!productInfo) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-2xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <motion.img
              key={productInfo?.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={
                productInfo.cover_photo
                  ? `${backendDomainName}storage/${productInfo.cover_photo}`
                  : "../images/style.img"
              }
              alt={productInfo?.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg border border-red-600"
            />
            <div className="grid grid-cols-4 gap-4">
              {catalogs?.map((img, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  src={`${backendDomainName}storage/${img}`}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md cursor-pointer border border-red-600"
                />
              ))}
            </div>
          </motion.div>

          {/* Right column - Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className=" text-2xl md:text-3xl font-bold text-red-500">
                {productInfo?.name}
              </div>
              <p className="text-sm text-red-300 mt-1">
                {productInfo?.category}
              </p>
            </div>

            <p className="text-gray-300">
              Ratings: {productInfo?.overall_ratings}/10
            </p>

            {/* Display Colors */}
            <div className="space-y-2">
              <p className="text-gray-300">Available Colors:</p>
              <div className="flex space-x-2">
                {productInfo.colors &&
                  JSON.parse(productInfo.colors).map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border border-red-600"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              {productInfo.discount ? (
                <span className="text-xl font-bold text-red-500">
                  <span className=" line-through block">
                    {" "}
                    {productInfo.price} Kyats
                  </span>
                  <span>
                    {Number(productInfo.price) -
                      Number(productInfo.price) *
                        (Number(productInfo.discount) / 100)}
                  </span>
                  Kyats
                  <br></br>
                  <span className=" text-gray-400">
                    ({productInfo.discount_message})
                  </span>
                </span>
              ) : (
                <span className="text-2xl font-bold text-red-500">
                  {Number(productInfo?.price).toFixed(2)}
                </span>
              )}
              <span className="text-sm text-red-300">
                {productInfo?.quantity} available
              </span>
            </div>

            {userData != null && (
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedProduct(productInfo);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    console.log("toggling");
                    toggleFavorite(productInfo.id, productInfo.isFav);
                    productInfo.isFav = !productInfo.isFav;
                  }}
                  className="w-full bg-gray-800 text-red-500 py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
                >
                  {productInfo.isFav
                    ? "Remove From Wishlist"
                    : " Add to Wishlist"}
                </motion.button>
              </div>
            )}

            <div className="border-t border-red-800 pt-4">
              <h2 className="text-xl font-semibold text-red-500 mb-2">
                Product Details
              </h2>
              <p className="text-gray-300">{productInfo?.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
};

export default ProductInfoPage;
