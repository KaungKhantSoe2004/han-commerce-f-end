"use client";

import { useEffect, useState } from "react";
import {
  FaShoppingCart as ShoppingCart,
  FaHeart as Heart,
  FaUser as User,
  FaMarker as X,
  FaSignOutAlt as Logout,
} from "react-icons/fa";
import { BiSearch as Search, BiMenu as Menu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const DefaultNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoogedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  // useEffect
  useEffect(() => {
    const token = localStorage.getItem("han-commerce-token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="sticky top-0  md:py-2 py-0  bg-gradient-to-b   from-gray-900 to-black/80  z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className=" flex   iconContainer">
            <img src="../imgs/bohan.png" className=" navIcon" alt="" />
          </div>

          {/* Desktop Menu and Search */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex items-baseline space-x-4 text-white">
              <div
                onClick={() => {
                  navigate("/");
                }}
                className="cursor-pointer hover:text-red-600 px-3 py-2 text-xs font-bold text-white/90 "
              >
                HOME
              </div>
              <div
                onClick={() => {
                  navigate("contact");
                }}
                className=" cursor-pointer hover:text-red-600 px-3 py-2 rounded-md text-xs font-bold"
              >
                CONTACT
              </div>
              <div
                onClick={() => {
                  navigate("history");
                }}
                className=" cursor-pointer hover:text-red-600 px-3 py-2 rounded-md text-xs font-bold"
              >
                HISTORY
              </div>
              <div
                onClick={() => {
                  navigate("blogs");
                }}
                className="cursor-pointer hover:text-red-600 px-3 py-2 rounded-md text-xs font-bold"
              >
                BLOG
              </div>
            </div>
            <form onSubmit={handleSearch} className="flex-1 max-w-md ml-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
          </div>

          {/* Right side icons */}
          {isLoogedIn ? (
            <div className="hidden md:flex items-center space-x-4">
              <div
                onClick={() => {
                  navigate("favorites");
                }}
                className="cursor-pointer hover:bg-red-700 p-2 rounded-full"
              >
                <Heart className="h-6 w-6" />
              </div>
              <div
                onClick={() => {
                  navigate("profile");
                }}
                className=" cursor-pointer hover:bg-red-700 p-2 rounded-full"
              >
                <User className="h-6 w-6" />
              </div>
              <div
                onClick={() => {
                  navigate("cart");
                }}
                className=" cursor-pointer hover:bg-red-700 p-2 rounded-full"
              >
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div
                onClick={() => navigate("login")}
                className="cursor-pointer hover:bg-red-700 p-2 rounded-lg bg-gray-700 flex items-center space-x-2"
              >
                <Logout className="h-4 w-4 text-white" />
                <span className=" text-sm text-white">Logout</span>
              </div>
            </div>
          ) : (
            <div className="hidden ml-2 md:flex items-center justify-center space-x-4">
              <div
                onClick={() => navigate("login")}
                className="cursor-pointer hover:bg-red-700 p-2 rounded-lg bg-gray-700 flex items-center space-x-2"
              >
                <span className=" text-sm text-white">Signup</span>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-red-300"
                />
                <button
                  type="submit"
                  className="absolute bg-gray-800 inset-y-0 left-0 pl-3 flex items-center"
                >
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>
            </form>
            <a
              href="#"
              className="block hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="block hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Products
            </a>
            <a
              href="#"
              className="block hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Categories
            </a>
            <a
              href="#"
              className="block hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Deals
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-red-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-10 w-10" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium">John Doe</div>
                <div className="text-sm font-medium text-gray-400">
                  john@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="block hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Settings
              </a>
              <a
                href="#"
                className="block hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DefaultNavBar;
