import { useEffect } from "react";
import { FiHeart, FiStar, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { localCall } from "../utilities/localstorage";
import axios from "axios";

export default function FavoritesPage() {
  // delcaring Navigate
  const navigate = useNavigate();

  // This would typically come from your favorites state management
  const favoriteProducts = [
    {
      id: "1",
      name: "Premium Sports Shoe",
      category: "Footwear",
      price: 129.99,
      rating: 4.5,
      reviews: 128,
      colors: ["bg-red-500", "bg-black", "bg-white"],
      image: "../imgs/blogThree.png",
    },
    {
      id: "2",
      name: "Premium Sports Shoe",
      category: "Footwear",
      price: 129.99,
      rating: 4.5,
      reviews: 128,
      colors: ["bg-red-500", "bg-black", "bg-white"],
      image: "../imgs/blogThree.png",
    },
    {
      id: "3",
      name: "Premium Sports Shoe",
      category: "Footwear",
      price: 129.99,
      rating: 4.5,
      reviews: 128,
      colors: ["bg-red-500", "bg-black", "bg-white"],
      image: "../imgs/blogThree.png",
    },
    {
      id: "4",
      name: "Premium Sports Shoe",
      category: "Footwear",
      price: 129.99,
      rating: 4.5,
      reviews: 128,
      colors: ["bg-red-500", "bg-black", "bg-white"],
      image: "../imgs/blogThree.png",
    },
    {
      id: "5",
      name: "Premium Sports Shoe",
      category: "Footwear",
      price: 129.99,
      rating: 4.5,
      reviews: 128,
      colors: ["bg-red-500", "bg-black", "bg-white"],
      image: "../imgs/blogThree.png",
    },
    {
      id: "6",
      name: "Premium Sports Shoe",
      category: "Footwear",
      price: 129.99,
      rating: 4.5,
      reviews: 128,
      colors: ["bg-red-500", "bg-black", "bg-white"],
      image: "../imgs/blogThree.png",
    },
  ];

  // useEffect
  const fetchData = async () => {
    const token = localStorage.getItem("han-commerce-token");
    const userData = JSON.parse(localStorage.getItem("han-commerce-user"));
    if (!token) {
      navigate("/");
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/getFav",
        {
          id: userData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      // setVipName(response.data.data.memberLevelName);
    } catch (error) {
      console.log(error);
      if (error.message == "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black/95 border-b border-red-500/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <FiHeart className="text-red-500" />
            My Favorites
          </div>
          <p className="text-gray-400 mt-2">
            {favoriteProducts.length} items in your wishlist
          </p>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer relative bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/10 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover Overlay with Product Info */}
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 p-4 flex flex-col justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Top Section */}
                    <div className="space-y-2">
                      <div className="flex justify-end items-end">
                        <button className="text-red-500 hover:text-white transition-colors duration-300">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
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
                          <FiStar className="w-4 h-4 text-red-500" />
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
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className={`w-5 h-5 rounded-full ${color} cursor-pointer border border-transparent hover:border-red-500 transition-all duration-300`}
                          />
                        ))}
                      </div>

                      {/* Price and Cart */}
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-red-500">
                          ${product.price.toFixed(2)}
                        </span>
                        <button className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center space-x-1">
                          <FiShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {favoriteProducts.length === 0 && (
          <div className="text-center py-32">
            <FiHeart className="w-16 h-16 text-red-500/20 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-400">
              Start adding some items to your wishlist!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
