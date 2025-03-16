"use client";

import { useEffect, useState } from "react";
import "../styles/home.css";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { localCall } from "../utilities/localstorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [userInfo, setUserInfo] = useState({ address: "", phoneNumber: "" });
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Loading state for fetching cart items
  const [error, setError] = useState(false); // Error state for fetching cart items
  const backendDomainName = "http://127.0.0.1:8000/";

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.each_price * item.quantity, 0)
      .toFixed(2);
  };

  // Fetch cart items from the backend
  const fetchData = async () => {
    const token = localStorage.getItem("han-commerce-token");
    const userData = JSON.parse(localStorage.getItem("han-commerce-user"));
    if (!token) {
      navigate("/");
      return;
    }
    try {
      setIsFetching(true); // Start fetching
      const response = await axios.post(
        `${backendDomainName}api/getCart`,
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

      if (response.data.status === "true") {
        setCartItems(response.data.data);
      } else {
        setError(true); // Set error if API response is invalid
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
      setError(true); // Set error if request fails
    } finally {
      setIsFetching(false); // Stop fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle checkout
  const handleCheckout = () => {
    if (!userInfo.address || !userInfo.phoneNumber) {
      alert("Please fill in your shipping address and phone number.");
      return;
    }

    const postingData = {
      address: userInfo.address,
      phone: userInfo.phoneNumber,
      cart: JSON.stringify(cartItems),
      totalPrice: calculateTotal(),
    };

    setOrderData(postingData);
    setIsModalOpen(true);
  };

  // Confirm order
  const confirmOrder = async () => {
    setIsLoading(true);
    if (!orderData) {
      console.error("Order data is not available");
      return;
    }

    const token = localStorage.getItem("han-commerce-token");
    try {
      const response = await axios.post(
        `${backendDomainName}api/placeOrder`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (
        response.data.status === "true" ||
        response.data.status === "success"
      ) {
        setIsModalOpen(false);
        setCartItems([]);
        setOrderData(null);
        // alert("Order placed successfully!");
      } else {
        setIsLoading(false);
        throw new Error(response.data.message || "Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setIsLoading(false);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save item for later
  const saveItem = async (item) => {
    const token = localStorage.getItem("han-commerce-token");
    const formData = new FormData();

    formData.append("itemId", item.id);
    formData.append("color", item.color || selectedColor);
    formData.append("quantity", item.quantity);

    try {
      const response = await axios.post(
        `${backendDomainName}api/saveItem`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        alert("Item saved successfully");
      } else {
        throw new Error(response.data.message || "Error saving item");
      }
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Error saving item. Please try again.");
    }
  };

  // Handle user info change
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Skeleton Loading Component
  const renderSkeleton = () => (
    <div className="bg-black rounded-lg shadow-lg overflow-hidden mb-6 md:mb-8">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b border-gray-700"
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end md:space-x-4">
            <div className="flex items-center bg-gray-700 rounded-full animate-pulse">
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <style>
        {`
        .icon-spin {
  animation: spin 1s linear infinite;
}
        `}
      </style>
      <div className="container mx-auto px-4 py-8">
        <h4 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-red-500 flex items-center">
          <FaShoppingCart className="mr-2" />
          Your Cart
        </h4>
        {isFetching ? (
          renderSkeleton() // Show skeleton while loading
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-lg md:text-xl mb-4">
              Failed to load cart items.
            </p>
            <button
              onClick={fetchData}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 md:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm md:text-base"
            >
              Retry
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg md:text-xl mb-4">Your cart is empty</p>
            <button
              onClick={() => {
                // navigate("/");
                navigate("/#search");
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 md:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm md:text-base"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="bg-black rounded-lg shadow-lg overflow-hidden mb-6 md:mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b border-gray-700 hover:bg-gray-950 transition duration-300 ease-in-out"
                >
                  {/* Item Details */}
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img
                      src={
                        item.image
                          ? `${backendDomainName}storage/${item.image}`
                          : "/placeholder.svg"
                      }
                      alt={item.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base">
                        {item.each_price.toFixed(2)}Ks
                      </p>
                      {item.colors && (
                        <div className="mt-4 flex justify-center space-x-2">
                          {JSON.parse(item.colors).map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                                selectedColor === color
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              style={{ backgroundColor: color }}
                              aria-label={`Select ${color}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between md:justify-end md:space-x-4">
                    <div className="flex items-center bg-gray-700 rounded-full">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="text-gray-400 hover:text-white p-1 md:p-2 rounded-full transition duration-300 ease-in-out"
                      >
                        <FaMinus className="text-xs md:text-sm" />
                      </button>
                      <span className="px-2 md:px-4 py-1 md:py-2 font-semibold text-sm md:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-gray-400 hover:text-white p-1 md:p-2 rounded-full transition duration-300 ease-in-out"
                      >
                        <FaPlus className="text-xs md:text-sm" />
                      </button>
                    </div>
                    <p className="font-semibold text-base md:text-lg ml-4 md:ml-0">
                      {(item.each_price * item.quantity).toFixed(2)} ks
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 p-1 md:p-2 rounded-full transition duration-300 ease-in-out ml-4 md:ml-0"
                    >
                      <FaTrash className="text-sm md:text-base" />
                    </button>
                    <button
                      onClick={() => saveItem(item)}
                      className="text-blue-500 hover:text-blue-600 p-1 md:p-2 rounded-full transition duration-300 ease-in-out ml-4 md:ml-0"
                    >
                      <FaSave className="text-sm md:text-base" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Checkout Form */}
            <div className="bg-gray-950 rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg md:text-xl font-semibold">Total:</span>
                <span className="text-xl md:text-2xl font-bold text-red-500">
                  {calculateTotal()} Ks
                </span>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheckout();
                }}
                className="space-y-4 mb-4"
              >
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={userInfo.address}
                    onChange={handleUserInfoChange}
                    required
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    placeholder="Enter your shipping address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleUserInfoChange}
                    required
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    placeholder="Enter your phone number"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 text-sm md:text-base"
                >
                  Proceed to Checkout
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Checkout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 transition-all duration-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 to-black p-6 rounded-lg w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Confirm Order</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-900">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Shipping Information
                </h3>
                <p className="text-gray-300">Address: {userInfo.address}</p>
                <p className="text-gray-300">Phone: {userInfo.phoneNumber}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-900">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Order Summary
                </h3>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-400"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      {(item.each_price * item.quantity).toFixed(2)} Ks
                    </span>
                  </div>
                ))}
                <div className="mt-4 pt-2 border-t border-gray-700 flex justify-between text-white">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">{calculateTotal()} Ks</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                {isLoading ? (
                  <BiLoaderAlt className="icon-spin" />
                ) : (
                  <span>Confirm Order</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
