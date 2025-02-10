"use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaChartBar,
  FaShoppingCart,
  FaHeart,
  FaLock,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { localCall } from "../utilities/localstorage";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isEmailPreferencesModalOpen, setIsEmailPreferencesModalOpen] =
    useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [emailPreferences, setEmailPreferences] = useState({
    newsletter: true,
    promotions: false,
  });

  const fetchData = async () => {
    const token = localStorage.getItem("han-commerce-token");
    const userData = JSON.parse(localStorage.getItem("han-commerce-user"));

    if (!token) {
      navigate("/");
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/getProfile",
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
      if (response.data.data == null) {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
        return;
      } else {
        setUser(response.data.data);
        setFormData({
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone,
          address: response.data.data.IP,
        });
      }
    } catch (error) {
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

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    IP: "123 Main St, Anytown, AN 12345",
    avatar: "https://i.pravatar.cc/150?img=68",
  });

  const stats = [
    { label: "Orders", value: 24, icon: FaShoppingCart },
    { label: "Reviews", value: 13, icon: FaChartBar },
    { label: "Wishlist", value: 5, icon: FaHeart },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordData({ ...changePasswordData, [name]: value });
  };

  const handleEmailPreferencesChange = (e) => {
    const { name, checked } = e.target;
    setEmailPreferences({ ...emailPreferences, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      IP: formData.address,
    });
    setIsModalOpen(false);
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    // Add logic to update password
    setIsChangePasswordModalOpen(false);
  };

  const handleEmailPreferencesSubmit = async (e) => {
    e.preventDefault();
    // Add logic to update email preferences
    setIsEmailPreferencesModalOpen(false);
  };

  const handleLogout = () => {
    localCall("removeToken");
    localCall("removeUser");
    navigate("/login");
  };

  return (
    <div className={`min-h-screen bg-black text-white `}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="from-black to-gray-900 bg-gradient-to-b rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar || "../imgs/defaultUser.jpg"}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <p className="text-red-500 mb-4">Premium Member</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-4 py-2 rounded ${
                      activeTab === "profile" ? "bg-red-600" : "bg-gray-800"
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`px-4 py-2 rounded ${
                      activeTab === "settings" ? "bg-red-600" : "bg-gray-800"
                    }`}
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>
            <div className="from-black to-gray-900 bg-gradient-to-t rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <stat.icon className="text-red-500 mr-2" />
                      <span>{stat.label}</span>
                    </div>
                    <span className="font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="from-black to-gray-900 bg-gradient-to-b rounded-lg p-6">
              {activeTab === "profile" ? (
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    Profile Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaUser className="text-red-500 mr-3" />
                      <span>{user.name}</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-red-500 mr-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-red-500 mr-3" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-red-500 mr-3" />
                      <span>{user.IP}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    Account Settings
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center text-left w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
                    >
                      <FaCog className="text-red-500 mr-3" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={() => setIsEmailPreferencesModalOpen(true)}
                      className="flex items-center text-left w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
                    >
                      <FaEnvelope className="text-red-500 mr-3" />
                      <span>Update Email Preferences</span>
                    </button>
                    <button
                      onClick={() => setIsChangePasswordModalOpen(true)}
                      className="flex items-center text-left w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
                    >
                      <FaLock className="text-red-500 mr-3" />
                      <span>Change Password</span>
                    </button>
                    <button
                      onClick={() => setIsLogoutModalOpen(true)}
                      className="flex items-center text-left w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
                    >
                      <FaSignOutAlt className="text-red-500 mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 to-black p-6 rounded-lg w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Update Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "phone", "address"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="md:px-4 md:py-2 py-1 px-2 bg-red-600 text-white rounded hover:bg-red-800 cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 to-black p-6 rounded-lg w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Change Password</h2>
              <button
                onClick={() => setIsChangePasswordModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              {["currentPassword", "newPassword", "confirmNewPassword"].map(
                (field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      {field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <input
                      type="password"
                      id={field}
                      name={field}
                      value={changePasswordData[field]}
                      onChange={handleChangePasswordInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                )
              )}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="md:px-4 md:py-2 py-1 px-2 bg-red-600 text-white rounded hover:bg-red-800 cursor-pointer transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Email Preferences Modal */}
      {isEmailPreferencesModalOpen && (
        <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 to-black p-6 rounded-lg w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Update Email Preferences</h2>
              <button
                onClick={() => setIsEmailPreferencesModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleEmailPreferencesSubmit} className="space-y-4">
              {Object.keys(emailPreferences).map((preference) => (
                <div key={preference} className="flex items-center">
                  <input
                    type="checkbox"
                    id={preference}
                    name={preference}
                    checked={emailPreferences[preference]}
                    onChange={handleEmailPreferencesChange}
                    className="mr-2"
                  />
                  <label htmlFor={preference} className="text-gray-400">
                    {preference
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="md:px-4 md:py-2 py-1 px-2 bg-red-600 text-white rounded hover:bg-red-800 cursor-pointer transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 to-black p-6 rounded-lg w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Logout</h2>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <p className="text-gray-400 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
