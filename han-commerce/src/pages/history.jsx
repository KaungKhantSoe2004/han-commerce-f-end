"use client";

import { useEffect, useState } from "react";
import { localCall } from "../utilities/localstorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import {
  FiX,
  FiPackage,
  FiCalendar,
  FiCreditCard,
  FiMapPin,
  FiShoppingBag,
  FiTruck,
  FiCheck,
  FiClock,
  FiAlertTriangle,
  FiChevronLeft,
  FiDownload,
  FiMessageSquare,
} from "react-icons/fi";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../features/historySlice";

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState(
    useSelector((state) => state.history.history)
  );
  const dispatch = useDispatch();
  const backendDomainName = "http://127.0.0.1:8000/";
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
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
    // Add body class to prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Remove body class to allow scrolling again
    document.body.style.overflow = "auto";
    // Don't immediately clear the selected order to avoid UI flicker during close animation
    setTimeout(() => {
      setSelectedOrder(null);
    }, 300);
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
        console.log(response.data.data, "is history");
        setPurchases(response.data.data);
        dispatch(setHistory(response.data.data));
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

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/30 text-green-300";
      case "processing":
        return "bg-blue-500/30 text-blue-300";
      case "pending":
        return "bg-yellow-500/30 text-yellow-300";
      case "cancelled":
        return "bg-red-500/30 text-red-300";
      default:
        return "bg-gray-500/30 text-gray-300";
    }
  };

  // Calculate order total
  const calculateTotal = () => {
    if (!selectedOrder || !selectedOrder.carts) return "0.00";

    return selectedOrder.carts
      .reduce((total, item) => {
        const price = Number.parseFloat(item.total_price.replace(" Ks", ""));
        return total + price;
      }, 0)
      .toFixed(2);
  };

  // Generate HTML invoice for download
  const generateHtmlInvoice = () => {
    if (!selectedOrder) return;

    setIsDownloading(true);

    try {
      // Create HTML content
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice #${selectedOrder.id}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .invoice-header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #f44336;
      padding-bottom: 10px;
    }
    .invoice-header h1 {
      color: #f44336;
      margin-bottom: 5px;
    }
    .order-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .order-info div {
      flex: 1;
    }
    .order-info h3 {
      margin-top: 0;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f8f8f8;
    }
    .total-row {
      font-weight: bold;
    }
    .tracking-info {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    .tracking-events {
      margin-left: 20px;
    }
    .footer {
      margin-top: 50px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    @media print {
      body {
        padding: 0;
      }
      button {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-header">
    <h1>INVOICE</h1>
    <p>Order #${selectedOrder.id}</p>
  </div>
  
  <div class="order-info">
    <div>
      <h3>Order Details</h3>
      <p><strong>Date:</strong> ${selectedOrder.date}</p>
      <p><strong>Status:</strong> ${selectedOrder.status}</p>
      <p><strong>Order ID:</strong> ${selectedOrder.id}</p>
    </div>
    <div>
      <h3>Shipping Address</h3>
      <p>${selectedOrder.address}</p>
    </div>
  </div>
  
  <h3>Order Items</h3>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${selectedOrder.carts
        .map(
          (item) => `
        <tr>
          <td>${item.product_name}</td>
          <td>${item.quantity}</td>
          <td>${item.each_price}</td>
          <td>${item.total_price}</td>
        </tr>
      `
        )
        .join("")}
      <tr>
        <td colspan="2"></td>
        <td><strong>Subtotal:</strong></td>
        <td>${calculateTotal()} Ks</td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><strong>Shipping:</strong></td>
        <td>0.00 Ks</td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><strong>Tax:</strong></td>
        <td>0.00 Ks</td>
      </tr>
      <tr class="total-row">
        <td colspan="2"></td>
        <td><strong>Total:</strong></td>
        <td>${selectedOrder.TotalPrice}</td>
      </tr>
    </tbody>
  </table>
  
  <div class="tracking-info">
    <h3>Tracking Information</h3>
    ${
      selectedOrder.tracking && selectedOrder.tracking.number
        ? `
      <p><strong>Tracking Number:</strong> ${selectedOrder.tracking.number}</p>
      <p><strong>Carrier:</strong> ${selectedOrder.tracking.carrier}</p>
    `
        : "<p>Tracking information will be available once your order ships.</p>"
    }
    
    <h4>Tracking Events:</h4>
    <div class="tracking-events">
      ${
        selectedOrder.tracking && selectedOrder.tracking.events
          ? selectedOrder.tracking.events
              .map(
                (event) => `
        <p><strong>${event.date} ${event.time}</strong> - ${event.status} (${event.location})</p>
      `
              )
              .join("")
          : "<p>No tracking events available yet.</p>"
      }
    </div>
  </div>
  
  <div class="footer">
    <p>Thank you for your purchase!</p>
    <p>If you have any questions, please contact our support team.</p>
  </div>
</body>
</html>
      `;

      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: "text/html" });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice-${selectedOrder.id}.html`;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);

      // Show success feedback
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Error downloading HTML invoice:", error);
      setIsDownloading(false);
    }
  };

  const getStatusDetails = (status) => {
    if (!status)
      return {
        bgColor: "bg-gray-500/30",
        textColor: "text-gray-300",
        icon: <FiPackage className="w-4 h-4" />,
      };

    switch (status.toLowerCase()) {
      case "completed":
        return {
          bgColor: "bg-green-500/30",
          textColor: "text-green-300",
          icon: <FiCheck className="w-4 h-4" />,
        };
      case "processing":
        return {
          bgColor: "bg-blue-500/30",
          textColor: "text-blue-300",
          icon: <FiTruck className="w-4 h-4" />,
        };
      case "pending":
        return {
          bgColor: "bg-yellow-500/30",
          textColor: "text-yellow-300",
          icon: <FiClock className="w-4 h-4" />,
        };
      case "cancelled":
        return {
          bgColor: "bg-red-500/30",
          textColor: "text-red-300",
          icon: <FiAlertTriangle className="w-4 h-4" />,
        };
      default:
        return {
          bgColor: "bg-gray-500/30",
          textColor: "text-gray-300",
          icon: <FiPackage className="w-4 h-4" />,
        };
    }
  };

  useEffect(() => {
    fetchData();
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
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
      {isFetching && purchases.length == 0 ? (
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
                className="bg-gray-800 rounded-xl p-4 shadow-lg transition-all hover:shadow-xl"
              >
                {/* Header Section */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white truncate">
                    Order #{purchase.id}
                  </h3>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize whitespace-nowrap ${
                      purchase.status === "completed"
                        ? "bg-green-500/20 text-green-300"
                        : purchase.status === "processing"
                        ? "bg-blue-500/20 text-blue-300"
                        : purchase.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </div>

                {/* Product Info Section */}
                <div className="flex items-start gap-3 mb-4">
                  {/* Product Cover */}
                  <div className="flex-shrink-0">
                    <img
                      src={`${backendDomainName}storage/${purchase.carts[0].cover}`}
                      alt={purchase.productName || "Product"}
                      className="w-16 h-16 object-cover rounded-md border border-gray-700"
                      onError={(e) => (e.target.src = "default-image-url.jpg")} // Fallback image
                    />
                  </div>
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {purchase.productName || "Unnamed Product"}
                    </p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mt-1">
                      <p className="text-gray-400">Date:</p>
                      <p className="text-white truncate">{purchase.date}</p>
                      <p className="text-gray-400">Price:</p>
                      <p className="text-white">{purchase.TotalPrice}</p>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="text-sm mb-4">
                  <p className="text-gray-400 flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-red-500 flex-shrink-0"
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
                    <span>Address:</span>
                  </p>
                  <p className="text-white mt-1 line-clamp-2">
                    {purchase.address}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {purchase.status === "pending" && (
                    <button
                      onClick={() => handleCancel(purchase.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <BiLoaderAlt className="w-4 h-4 animate-spin" />
                      ) : (
                        "Cancel Order"
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => handleViewInfo(purchase)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg text-xs transition-colors"
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

      {/* Enhanced Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/80 flex items-center justify-center z-50 p-0 md:p-6 animate-in fade-in duration-200">
          {/* Mobile Back Button - Only on Mobile */}
          {isMobile && (
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 z-50 bg-black/40 text-white p-2 rounded-full"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            className={`bg-gradient-to-b from-red-950 to-black rounded-xl shadow-2xl shadow-red-900/30 border border-red-900/30 animate-in slide-in-from-bottom-5 duration-300 overflow-hidden
            ${
              isMobile
                ? "w-full h-full rounded-none"
                : "w-full max-w-4xl max-h-[90vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Desktop Header - Only on Desktop */}
            {!isMobile && (
              <div className="flex justify-between items-center p-6 border-b border-red-900/30">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 p-2.5 rounded-full">
                    <FiPackage className="w-6 h-6 text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Order #{selectedOrder.id}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                          getStatusDetails(selectedOrder.status).bgColor
                        } ${getStatusDetails(selectedOrder.status).textColor}`}
                      >
                        {getStatusDetails(selectedOrder.status).icon}
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </span>
                      <span className="text-gray-400 text-sm">|</span>
                      <span className="text-gray-400 text-sm">
                        {selectedOrder.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors rounded-full hover:bg-red-900/50 p-2"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Mobile Header - Only on Mobile */}
            {isMobile && (
              <div className="sticky top-0 z-10 bg-gradient-to-b from-red-950 to-red-950/95 p-4 border-b border-red-900/30">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">
                    Order #{selectedOrder.id}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors rounded-full hover:bg-red-900/50 p-1.5"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                      getStatusDetails(selectedOrder.status).bgColor
                    } ${getStatusDetails(selectedOrder.status).textColor}`}
                  >
                    {getStatusDetails(selectedOrder.status).icon}
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                  <span className="text-gray-400 text-xs">|</span>
                  <span className="text-gray-400 text-xs">
                    {selectedOrder.date}
                  </span>
                </div>
              </div>
            )}

            {/* Mobile Tabs - Only on Mobile */}
            {isMobile && (
              <div className="flex border-b border-red-900/30">
                <button
                  className={`flex-1 py-3 text-sm font-medium ${
                    activeTab === "details"
                      ? "text-white border-b-2 border-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-medium ${
                    activeTab === "items"
                      ? "text-white border-b-2 border-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("items")}
                >
                  Items
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-medium ${
                    activeTab === "tracking"
                      ? "text-white border-b-2 border-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("tracking")}
                >
                  Tracking
                </button>
              </div>
            )}

            {/* Content Container */}
            <div
              className={`${
                isMobile
                  ? "overflow-auto h-[calc(100%-130px)]"
                  : "overflow-auto max-h-[calc(90vh-80px)]"
              }`}
            >
              <div
                className={`${
                  isMobile ? "p-4" : "p-6 grid grid-cols-1 md:grid-cols-5 gap-6"
                }`}
              >
                {/* Left Column - Order Details */}
                {(!isMobile || (isMobile && activeTab === "details")) && (
                  <div
                    className={`${isMobile ? "" : "md:col-span-2 space-y-6"}`}
                  >
                    {/* Order Info */}
                    <div className="space-y-5">
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                        <FiPackage className="text-red-400" />
                        Order Information
                      </h4>

                      <div className="flex items-start gap-3">
                        <div className="bg-red-500/20 p-2 rounded-lg">
                          <FiCalendar className="w-4 h-4 text-red-300" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Order Date</p>
                          <p className="text-white">{selectedOrder.date}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-red-500/20 p-2 rounded-lg">
                          <FiMapPin className="w-4 h-4 text-red-300" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            Shipping Address
                          </p>
                          <p className="text-white">{selectedOrder.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-red-500/20 p-2 rounded-lg">
                          <FiTruck className="w-4 h-4 text-red-300" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            Estimated Delivery
                          </p>
                          <p className="text-white">
                            {selectedOrder.status === "completed"
                              ? "Delivered"
                              : selectedOrder.status === "processing"
                              ? "March 20, 2025"
                              : "Pending"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="mt-6 pt-6 border-t border-red-900/30">
                      <div className="flex items-center gap-2 mb-4">
                        <FiCreditCard className="w-4 h-4 text-red-400" />
                        <h4 className="text-lg font-semibold text-white">
                          Payment Summary
                        </h4>
                      </div>

                      <div className="space-y-3 bg-black/30 rounded-lg p-4 border border-red-900/20">
                        <div className="flex justify-between">
                          <p className="text-gray-400">Subtotal</p>
                          <p className="text-white">{calculateTotal()} Ks</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-400">Shipping</p>
                          <p className="text-white">0.00 Ks</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-400">Tax</p>
                          <p className="text-white">0.00 Ks</p>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-red-900/30 mt-2">
                          <p className="text-white font-semibold">Total</p>
                          <p className="text-white font-semibold">
                            {selectedOrder.TotalPrice}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons - Mobile Only */}
                      {isMobile && (
                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={generateHtmlInvoice}
                            disabled={isDownloading}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                          >
                            {isDownloading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <FiDownload className="w-4 h-4" />
                            )}
                          </button>
                          {/* <button
                            onClick={generateHtmlInvoice}
                            disabled={isDownloading}
                            className="flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-lg border border-red-900/30 disabled:opacity-50"
                          >
                            {isDownloading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <FiDownload className="w-4 h-4" />
                            )}
                          </button> */}
                          <button
                            onClick={() => {
                              window.location.href =
                                "https://t.me/Kaungkhant9koji";
                            }}
                            className="flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-lg border border-red-900/30"
                          >
                            <FiMessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Right Column - Items and Tracking */}
                {(!isMobile ||
                  (isMobile &&
                    (activeTab === "items" || activeTab === "tracking"))) && (
                  <div className={`${isMobile ? "" : "md:col-span-3"}`}>
                    {/* Items Section */}
                    {(!isMobile || (isMobile && activeTab === "items")) && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <FiShoppingBag className="w-4 h-4 text-red-400" />
                          <h4 className="text-lg font-semibold text-white">
                            Order Items
                          </h4>
                        </div>

                        <div className="space-y-4">
                          {selectedOrder.carts &&
                            selectedOrder.carts.map((item, index) => (
                              <div
                                key={index}
                                className="flex gap-4 bg-black/40 p-4 rounded-lg border border-red-900/30 hover:border-red-700/50 transition-colors"
                              >
                                {/* Product Image */}
                                <div className="relative w-20 h-20 rounded-md overflow-hidden border border-red-900/50 bg-black/50 flex-shrink-0">
                                  <img
                                    src={`${backendDomainName}storage/${item.cover}`}
                                    alt={item.product_name}
                                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                                    onError={(e) => {
                                      e.target.src =
                                        "/placeholder.svg?height=80&width=80";
                                    }}
                                  />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                  <p className="text-white font-medium">
                                    {item.product_name}
                                  </p>
                                  <div className="flex flex-wrap justify-between mt-2 gap-y-1">
                                    <p className="text-gray-400 text-sm">
                                      Qty: {item.quantity}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                      {item.each_price} each
                                    </p>
                                  </div>
                                  <div className="flex justify-between items-center mt-2">
                                    <button className="text-red-400 hover:text-red-300 text-xs">
                                      View Product
                                    </button>
                                    <p className="text-white font-medium">
                                      {item.total_price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Tracking Section */}
                    {(!isMobile || (isMobile && activeTab === "tracking")) && (
                      <div
                        className={`${
                          isMobile ? "" : "mt-6 pt-6 border-t border-red-900/30"
                        }`}
                      >
                        {/* <div className="flex items-center gap-2 mb-4">
                          <FiTruck className="w-4 h-4 text-red-400" />
                          <h4 className="text-lg font-semibold text-white">
                            Tracking Information
                          </h4>
                        </div> */}

                        <div className="bg-black/30 rounded-lg p-4 border border-red-900/20">
                          {selectedOrder.tracking &&
                          selectedOrder.tracking.number ? (
                            <>
                              <div className="flex flex-wrap justify-between mb-4">
                                <div>
                                  <p className="text-gray-400 text-sm">
                                    Tracking Number
                                  </p>
                                  <p className="text-white font-medium">
                                    {selectedOrder.tracking.number}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">
                                    Carrier
                                  </p>
                                  <p className="text-white">
                                    {selectedOrder.tracking.carrier}
                                  </p>
                                </div>
                              </div>

                              {/* Timeline */}
                              <div className="relative mt-6 pl-6 border-l-2 border-red-900/50 space-y-6">
                                {selectedOrder.tracking.events &&
                                  selectedOrder.tracking.events.map(
                                    (event, index) => (
                                      <div key={index} className="relative">
                                        {/* Timeline Dot */}
                                        <div
                                          className={`absolute -left-[25px] w-4 h-4 rounded-full ${
                                            index === 0
                                              ? "bg-red-500"
                                              : "bg-red-900/70"
                                          }`}
                                        ></div>

                                        {/* Event Content */}
                                        <div
                                          className={`${
                                            index === 0
                                              ? "bg-red-900/30"
                                              : "bg-black/30"
                                          } p-3 rounded-lg border ${
                                            index === 0
                                              ? "border-red-700/50"
                                              : "border-red-900/20"
                                          }`}
                                        >
                                          <div className="flex justify-between mb-1">
                                            <p className="text-white font-medium">
                                              {event.status}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                              {event.date}
                                            </p>
                                          </div>
                                          <div className="flex justify-between">
                                            <p className="text-gray-400 text-sm">
                                              {event.location}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                              {event.time}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-6">
                              <p className="text-gray-400 mb-2">
                                Tracking information will be available once your
                                order ships.
                              </p>
                              <p className="text-white">
                                Your order is currently being{" "}
                                {selectedOrder.status}.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Footer - Only on Desktop */}
            {!isMobile && (
              <div className="sticky bottom-0 bg-gradient-to-t from-black to-black/95 p-6 border-t border-red-900/30 flex justify-between items-center">
                <div className="flex gap-3">
                  <button
                    onClick={generateHtmlInvoice}
                    disabled={isDownloading}
                    className="bg-black/40 hover:bg-black/60 text-white py-2.5 px-4 rounded-lg text-sm transition-colors border border-red-900/30 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                    ) : (
                      <FiDownload className="w-4 h-4" />
                    )}
                    Download Invoice
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = "https://t.me/Kaungkhant9koji";
                    }}
                    className="bg-black/40 hover:bg-black/60 text-white py-2.5 px-4 rounded-lg text-sm transition-colors border border-red-900/30 flex items-center gap-2"
                  >
                    <FiMessageSquare className="w-4 h-4" />
                    Contact Support
                  </button>
                </div>
                {/* <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="bg-black/40 hover:bg-black/60 text-white py-2.5 px-4 rounded-lg text-sm transition-colors border border-red-900/30"
                  >
                    Close
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center gap-2">
                    <FiTruck className="w-4 h-4" />
                    Track Order
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
