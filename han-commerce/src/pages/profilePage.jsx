import { useState } from "react";
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
} from "react-icons/fa";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, AN 12345",
    avatar: "https://i.pravatar.cc/150?img=68",
  };

  const stats = [
    { label: "Orders", value: 24, icon: FaShoppingCart },
    { label: "Reviews", value: 13, icon: FaChartBar },
    { label: "Wishlist", value: 5, icon: FaHeart },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="from-black to-gray-900 bg-gradient-to-b rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar || "/placeholder.svg"}
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
                      <span>{user.address}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    Account Settings
                  </h3>
                  <div className="space-y-4">
                    <button className="flex items-center text-left w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
                      <FaCog className="text-red-500 mr-3" />
                      <span>Edit Profile</span>
                    </button>
                    <button className="flex items-center text-left w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
                      <FaEnvelope className="text-red-500 mr-3" />
                      <span>Update Email Preferences</span>
                    </button>
                    <button className="flex items-center text-left w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
                      <FaLock className="text-red-500 mr-3" />
                      <span>Change Password</span>
                    </button>
                    <button className="flex items-center text-left w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
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
    </div>
  );
};

export default ProfilePage;
