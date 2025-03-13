import { useAnimation, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { localCall } from "../utilities/localstorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

const CategorySection = () => {
  const navigate = useNavigate();
  const backendDomainName = "http://127.0.0.1:8000/";
  const [currentFeature, setCurrentFeature] = useState(0);
  const [myCategories, setMyCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching categories
  const [error, setError] = useState(false); // Error state for fetching categories
  const token = localStorage.getItem("han-commerce-token");
  const userData = JSON.parse(localStorage.getItem("han-commerce-user"));
  const controls = useAnimation();

  // Fetch categories
  const fetchData = async () => {
    if (!token) {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${backendDomainName}api/getPlainCategory`
        );

        if (response.data.status === "false") {
          setError(true);
        } else {
          setMyCategories(response.data.categories);
        }
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          localCall("removeToken");
          localCall("removeUser");
          navigate("/login");
        }
        setError(true);
      } finally {
        setIsLoading(false);
      }
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${backendDomainName}api/getCategory`,
        { id: userData.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "false") {
        setError(true);
      } else {
        setMyCategories(response.data.categories);
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-moving carousel logic
  useEffect(() => {
    if (!isLoading && myCategories.length > 0) {
      const timer = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % myCategories.length);
        controls.start({
          x: `-${currentFeature * 220}px`, // Adjust based on category card width
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [controls, currentFeature, isLoading, myCategories.length]);

  // Skeleton Loading Component
  const renderSkeleton = () => (
    <div className="flex gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="relative group cursor-pointer min-w-[200px]"
        >
          <div className="w-full h-48 bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="mt-2 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Categories</h2>

      <div className="overflow-hidden w-full">
        {isLoading ? (
          renderSkeleton() // Show skeleton while loading
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-lg mb-4">Failed to load categories.</p>
            <button
              onClick={fetchData}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Retry
            </button>
          </div>
        ) : (
          <motion.div
            className="flex gap-4"
            animate={controls}
            drag="x"
            dragConstraints={{ left: -500, right: 0 }}
          >
            {myCategories.map((category) => (
              <div
                key={category.name}
                onClick={() => {
                  navigate(`category/${category.id}`);
                }}
                className="relative group cursor-pointer min-w-[200px]"
              >
                <img
                  src={
                    category.img
                      ? `${backendDomainName}storage/${category.img}`
                      : "/placeholder.svg"
                  }
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
