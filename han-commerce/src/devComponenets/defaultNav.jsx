"use client";

import { useEffect, useState } from "react";
import {
  FaShoppingCart as ShoppingCart,
  FaHeart as Heart,
  FaUser as User,
  FaCross as X,
  FaSignOutAlt as Logout,
} from "react-icons/fa";
import { BiMenu as Menu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { globalLogout } from "../utilities/localstorage";
import { motion, AnimatePresence } from "framer-motion";

const DefaultNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("han-commerce-token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearchClick = () => {
    navigate("/search");
    setIsMenuOpen(false);
  };

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <nav className="sticky top-0 md:py-2 py-0 bg-gradient-to-b from-gray-900 to-black/80 z-50 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex iconContainer transition-transform hover:scale-105">
            <img src="../imgs/bohan.png" className="navIcon" alt="Logo" />
          </div>

          {/* Desktop Menu and Search */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex items-baseline space-x-4 text-white">
              <div
                onClick={() => navigate("/")}
                className="cursor-pointer hover:text-red-500 px-3 py-2 text-xs font-bold text-white/90 transition-colors duration-200"
              >
                HOME
              </div>
              <div
                onClick={() => navigate("contact")}
                className="cursor-pointer hover:text-red-500 px-3 py-2 rounded-md text-xs font-bold transition-colors duration-200"
              >
                CONTACT
              </div>
              {isLoggedIn && (
                <div
                  onClick={() => navigate("history")}
                  className="cursor-pointer hover:text-red-500 px-3 py-2 rounded-md text-xs font-bold transition-colors duration-200"
                >
                  HISTORY
                </div>
              )}
              <div
                onClick={() => navigate("blogs")}
                className="cursor-pointer hover:text-red-500 px-3 py-2 rounded-md text-xs font-bold transition-colors duration-200"
              >
                BLOG
              </div>
            </div>
            <div
              onClick={handleSearchClick}
              className="ml-6 flex items-center justify-center w-10 h-10 bg-gray-800/50 rounded-full hover:bg-red-600/70 cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-red-500/20 group"
              title="Search Products"
            >
              <svg
                className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right side icons (Desktop) */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center space-x-4">
              <div
                onClick={() => navigate("favorites")}
                className="cursor-pointer hover:bg-red-700/70 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Heart className="h-6 w-6" />
              </div>
              <div
                onClick={() => navigate("profile")}
                className="cursor-pointer hover:bg-red-700/70 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <User className="h-6 w-6" />
              </div>
              <div
                onClick={() => navigate("cart")}
                className="cursor-pointer hover:bg-red-700/70 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div
                onClick={() => globalLogout(navigate)}
                className="cursor-pointer hover:bg-red-700/70 p-2 rounded-lg bg-gray-700/50 flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <Logout className="h-4 w-4 text-white" />
                <span className="text-sm text-white">Logout</span>
              </div>
            </div>
          ) : (
            <div className="hidden ml-2 md:flex items-center justify-center space-x-4">
              <div
                onClick={() => navigate("login")}
                className="cursor-pointer hover:bg-red-700/70 p-2 rounded-lg bg-gray-700/50 flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <span className="text-sm text-white">Signup</span>
              </div>
            </div>
          )}

          {/* Mobile right side (Cart, Fav, and Menu button) */}
          <div className="md:hidden flex items-center space-x-2">
            {isLoggedIn && (
              <>
                <div
                  onClick={() => navigate("cart")}
                  className="cursor-pointer hover:bg-red-700/70 p-2 rounded-full transition-all duration-300 hover:scale-110"
                  title="Cart"
                >
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div
                  onClick={() => navigate("favorites")}
                  className="cursor-pointer hover:bg-red-700/70 p-2 rounded-full transition-all duration-300 hover:scale-110"
                  title="Favorites"
                >
                  <Heart className="h-6 w-6" />
                </div>
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-700/70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-all duration-300"
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

      {/* Mobile Menu with Framer Motion Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900/95 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div
                onClick={handleSearchClick}
                className="mb-4 flex items-center justify-start w-full bg-gray-800/50 rounded-lg py-3 px-4 hover:bg-red-600/70 cursor-pointer transition-all duration-300 shadow-md hover:shadow-red-500/20"
              >
                <svg
                  className="h-5 w-5 text-gray-300 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-white font-medium">Search Products</span>
              </div>
              <div
                onClick={() => {
                  navigate("/");
                  setIsMenuOpen(false);
                }}
                className="block hover:bg-red-700/70 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-200"
              >
                Home
              </div>
              <div
                onClick={() => {
                  navigate("contact");
                  setIsMenuOpen(false);
                }}
                className="block hover:bg-red-700/70 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-200"
              >
                Contact
              </div>
              {isLoggedIn && (
                <div
                  onClick={() => {
                    navigate("history");
                    setIsMenuOpen(false);
                  }}
                  className="block hover:bg-red-700/70 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-200"
                >
                  History
                </div>
              )}
              <div
                onClick={() => {
                  navigate("blogs");
                  setIsMenuOpen(false);
                }}
                className="block hover:bg-red-700/70 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-200"
              >
                Blog
              </div>
            </div>
            {isLoggedIn && (
              <div className="pt-4 pb-3 border-t border-red-700/50">
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
                  <div
                    onClick={() => {
                      navigate("profile");
                      setIsMenuOpen(false);
                    }}
                    className="block hover:bg-red-700/70 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-200"
                  >
                    Your Profile
                  </div>
                  <div
                    onClick={() => {
                      navigate("settings");
                      setIsMenuOpen(false);
                    }}
                    className="block hover:bg-red-700/70 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-200"
                  >
                    Settings
                  </div>
                  <div
                    onClick={() => globalLogout(navigate)}
                    className="block hover:bg-red-700/70 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-200"
                  >
                    Sign out
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default DefaultNavBar;
