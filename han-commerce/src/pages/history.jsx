"use client";

import { useEffect, useState } from "react";
import { localCall } from "../utilities/localstorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Loading state for initial fetch
  const [error, setError] = useState(false); // Error state
  const token = localStorage.getItem("han-commerce-token");
  const userData = JSON.parse(localStorage.getItem("han-commerce-user"));
  const navigate = useNavigate();

  const handleCancel = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cancelOrder",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "true") {
        alert(`You have successfully cancelled order number ${id}`);
        fetchData(); // Refresh data after cancellation
      } else {
        console.log("There is an error");
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewInfo = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const fetchData = async () => {
    if (!token) {
      navigate("/");
      return;
    }
    try {
      setIsFetching(true); // Start fetching
      const response = await axios.post(
        "http://127.0.0.1:8000/api/getHistory",
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
        setPurchases(response.data.data);
      } else {
        setError(true); // Set error if API response is invalid
      }
    } catch (error) {
      console.log(error);
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

  // Skeleton Loading Component
  const renderSkeleton = () => (
    <>
      {/* Desktop Skeleton */}
      <div className="hidden sm:block overflow-x-auto bg-gray-800 rounded-lg shadow">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {[
                "Order Id",
                "Purchase Date",
                "Price",
                "Status",
                "Address",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 border-b-2 border-gray-700 text-left text-xs font-semibold text-red-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="px-5 py-5 border-b border-gray-700 text-sm text-white font-medium">
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm text-white">
                  <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm text-white">
                  <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm">
                  <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm text-white">
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm">
                  <div className="h-8 bg-gray-700 rounded w-24 animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Skeleton */}
      <div className="sm:hidden space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-8 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-red-500 mb-4 sm:mb-0">
          Purchase History
        </h2>
      </div>

      {/* Loading State */}
      {isFetching ? (
        renderSkeleton()
      ) : error ? (
        // Error State
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400">
            Unable to load your purchase history. Please try again later.
          </p>
        </div>
      ) : purchases.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto bg-gray-800 rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {[
                    "Order Id",
                    "Purchase Date",
                    "Price",
                    "Status",
                    "Address",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-5 py-3 border-b-2 border-gray-700 text-left text-xs font-semibold text-red-400 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-700">
                    <td className="px-5 py-5 border-b border-gray-700 text-sm text-white font-medium">
                      {purchase.id}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm text-white">
                      {purchase.date}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm text-white">
                      {purchase.TotalPrice}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                      <span
                        className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                          purchase.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : purchase.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : purchase.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm text-white flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {purchase.address}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                      <div className="flex items-center gap-2">
                        {purchase.status === "pending" && (
                          <button
                            onClick={() => handleCancel(purchase.id)}
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center text-xs"
                          >
                            {isLoading ? (
                              <BiLoaderAlt className="icon-spin" />
                            ) : (
                              <span>Cancel</span>
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleViewInfo(purchase)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center text-xs"
                        >
                          View Info
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View - Card Layout */}
          <div className="sm:hidden space-y-4">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-gray-800 rounded-lg p-4 shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    Order #{purchase.id}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      purchase.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : purchase.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : purchase.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <p className="text-gray-400">Date:</p>
                  <p className="text-white">{purchase.date}</p>
                  <p className="text-gray-400">Price:</p>
                  <p className="text-white">{purchase.TotalPrice}</p>
                  <p className="text-gray-400">Address:</p>
                  <p className="text-white flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-red-500 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {purchase.address}
                  </p>
                </div>
                <div className="flex gap-2">
                  {purchase.status === "pending" && (
                    <button
                      onClick={() => handleCancel(purchase.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-xs"
                    >
                      {isLoading ? (
                        <BiLoaderAlt className="icon-spin" />
                      ) : (
                        "Cancel Order"
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => handleViewInfo(purchase)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-xs"
                  >
                    View Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Empty State
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-white mb-2">
            No purchase history found
          </h2>
          <p className="text-gray-400">You have not made any purchases yet.</p>
        </div>
      )}

      {/* Modal for Order Details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-red-950 to-black rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Order #{selectedOrder.id} Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-white">
                <strong>Date:</strong> {selectedOrder.date}
              </p>
              <p className="text-white">
                <strong>Price:</strong> {selectedOrder.TotalPrice}
              </p>
              <p className="text-white">
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p className="text-white">
                <strong>Address:</strong> {selectedOrder.address}
              </p>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Items:
                </h4>
                <ul className="space-y-2">
                  {selectedOrder.carts.map((item, index) => (
                    <li key={index} className="text-white text-sm">
                      {item.product_name} - {item.quantity} x {item.each_price}{" "}
                      = {item.total_price} Ks
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
