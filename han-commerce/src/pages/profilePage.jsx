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
import { useDispatch, useSelector } from "react-redux";
import { setInitialUser } from "../features/userSlice";
const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendDomainName = "http://127.0.0.1:8000/";
  const [activeTab, setActiveTab] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requireError, setRequireError] = useState(false);
  const [deliAddress, setDeliAddress] = useState("Ka mayut Yangon");
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isEmailPreferencesModalOpen, setIsEmailPreferencesModalOpen] =
    useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [shortPasswordValidation, setShortPasswordValidation] = useState(false);
  const [falseError, setFalseError] = useState(false);
  const [incorrectError, setIncorrectError] = useState(false);
  const [passwordCharactersValidation, setPasswordCharactersValidation] =
    useState(false);
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

  const fetchData = async () => {
    const token = localStorage.getItem("han-commerce-token");
    const userData = JSON.parse(localStorage.getItem("han-commerce-user"));

    if (!token) {
      navigate("/");
    }
    try {
      const response = await axios.post(
        `${backendDomainName}api/getProfile`,
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
        dispatch(setInitialUser(response.data.data));

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

  const [user, setUser] = useState(useSelector((state) => state.user.user));

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name == "" || formData.email == "") {
      setRequireError(true);
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("id", user.id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    // formDataToSend.append("profile", formData.profile);
    if (profileImage) {
      formDataToSend.append("profile", profileImage);
    }

    try {
      const token = localStorage.getItem("han-commerce-token");
      const response = await axios.post(
        `${backendDomainName}api/updateProfile`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status == "true") {
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          IP: formData.address,
          profile_photo_path:
            response.data.data.profile_photo_path || user.profile_photo_path,
        });
        // localCall("setUser", response.data.data);
        setIsModalOpen(false);
      } else {
        // Handle error
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const validatePassword = (password) => {
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return true;
    }
    return false; // No error
  };
  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordCharactersValidation(false);
    setFalseError(false);
    setShortPasswordValidation(false);
    setIncorrectError(false);
    if (
      changePasswordData.newPassword != changePasswordData.confirmNewPassword
    ) {
      setFalseError(true);
      return;
    }
    if (changePasswordData.newPassword.length < 8) {
      setShortPasswordValidation(true);
      return;
    }
    setPasswordCharactersValidation(
      validatePassword(changePasswordData.newPassword)
    );
    if (
      !shortPasswordValidation &&
      !passwordCharactersValidation &&
      !falseError
    ) {
      try {
        const token = localStorage.getItem("han-commerce-token");
        const postData = new FormData();
        postData.append("id", user.id);
        postData.append("newPassword", changePasswordData.newPassword);
        postData.append("currentPassword", changePasswordData.currentPassword);
        postData.append(
          "confirmNewPassword",
          changePasswordData.confirmNewPassword
        );
        const response = await axios.post(
          `${backendDomainName}api/changePassword`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status == "true") {
          console.log(changePasswordData);
          setIsChangePasswordModalOpen(false);
        } else if (
          response.data.status == "false" &&
          response.data.data == "password incorrect"
        ) {
          setIncorrectError(true);
        } else {
          // Handle error
          console.error("Failed to update password");
        }
      } catch (error) {
        console.error("Error updating password:", error);
      }
    }
  };

  const updateDeliAddress = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append("id", user.id);
    dataToSend.append("location", deliAddress);

    try {
      const token = localStorage.getItem("han-commerce-token");
      const response = await axios.post(
        `${backendDomainName}api/updateLocation`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status == "true") {
        setIsEmailPreferencesModalOpen(false);
      } else {
        // Handle error
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    localCall("removeToken");
    localCall("removeUser");
    navigate("/login");
  };

  return (
    <div className={`min-h-screen bg-black text-white`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="from-black to-gray-900 bg-gradient-to-b rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center">
                <img
                  src={
                    user.profile_photo_path
                      ? `${backendDomainName}storage/${user.profile_photo_path}`
                      : "../imgs/defaultUser.jpg"
                  }
                  alt={user.name}
                  className="w-32 h-32 rounded-full mb-4 object-cover"
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
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Update Profile
                  </button>
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
                      <span>Update Delivery Address</span>
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
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="profile"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
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
              {requireError && (
                <small className=" text-red-600">
                  You need to fill name and email section
                </small>
              )}
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
              <div className="errorContainer">
                {falseError && (
                  <small className=" block text-red-500">
                    Your New password is not the same as new comfirm password
                  </small>
                )}
                {incorrectError && (
                  <small className=" block text-red-500">
                    Your Old Password is incorrect.Try Again!
                  </small>
                )}
                {shortPasswordValidation && (
                  <small className=" block text-red-500">
                    Your New password must be at least 8 characters
                  </small>
                )}
                {passwordCharactersValidation && (
                  <small className=" block text-red-500">
                    Your New password must contain both characters and numbers
                  </small>
                )}
              </div>
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
              <h2 className="text-2xl font-bold">Update Delivery Address</h2>
              <button
                onClick={() => setIsEmailPreferencesModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={updateDeliAddress} className="space-y-4">
              <div>
                <label
                  htmlFor="deliAddress"
                  className="block text-sm font-medium text-red-400 mb-1"
                >
                  Tell us Where to deliver your products
                </label>
                <input
                  type="text"
                  id="deliAddress"
                  name="deliAddress"
                  value={deliAddress}
                  onChange={(e) => {
                    setDeliAddress(e.target.value);
                  }}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="md:px-4 md:py-2 py-1 px-2 bg-red-600 text-white rounded hover:bg-red-800 cursor-pointer transition-colors"
                >
                  Save
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
