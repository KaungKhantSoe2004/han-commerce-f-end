import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { localCall } from "../utilities/localstorage";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogInfo = () => {
  const items = ["forty.jpg", "twenty.jpg", "wo.jpg", "baba.jpg"];
  const randomAuthor = items[Math.floor(Math.random() * items.length)];
  const { id } = useParams();
  const [blogInfo, setBlogInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  // const token = localStorage.getItem("han-commerce-token");
  const navigate = useNavigate();
  const backendDomainName = "http://127.0.0.1:8000/";

  // Fetch data from the backend
  const fetchData = async () => {
    // if (!token) {
    //   navigate("/");
    // }
    try {
      const response = await axios.get(`${backendDomainName}api/getBlog/${id}`);
      if (response.data.status === "false") {
        setBlogInfo(null); // Set blogInfo to null if no data is found
      } else {
        setBlogInfo(response.data.data);
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Loading Skeleton
  const renderSkeleton = () => (
    <div className="min-h-screen text-white md:flex block items-center justify-center md:p-6 p-0">
      <div className="w-full p-10 rounded-lg shadow-lg animate-pulse">
        {/* Blog Image Skeleton */}
        <div className="w-full h-96 bg-gray-700 rounded-lg"></div>

        {/* Blog Info Skeleton */}
        <div className="mt-6 space-y-4">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>

        {/* Author Info Skeleton */}
        <div className="mt-8 flex items-center border-t border-gray-700 pt-4">
          <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
          <div className="ml-4 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-700 rounded w-32"></div>
          </div>
        </div>

        {/* Tags Skeleton */}
        <div className="mt-6 flex space-x-3">
          <div className="h-8 bg-gray-700 rounded-full w-20"></div>
          <div className="h-8 bg-gray-700 rounded-full w-20"></div>
        </div>

        {/* Social Share Icons Skeleton */}
        <div className="flex mt-8 space-x-6">
          <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  // Render blog content if data is available
  const renderBlogContent = () => (
    <div className="min-h-screen text-white md:flex block items-center justify-center md:p-6 p-0">
      <div className="w-full p-10 rounded-lg shadow-lg">
        {/* Blog Image */}
        <img
          src={
            blogInfo.blog_img
              ? `${backendDomainName}storage/${blogInfo.blog_img}`
              : "../imgs/blogOne.png"
          }
          alt="Blog Post"
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* Blog Info */}
        <div className="mt-6">
          <p className="text-gray-400 text-sm">
            Published on:{" "}
            <span className="text-red-500">
              {new Date(blogInfo.created_at)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}
            </span>
          </p>
          <div className="md:text-2xl text-xl font-bold text-red-500 mt-2">
            {blogInfo.title}
          </div>
          <p className="text-gray-300 mt-4 md:text-2xl text-base">
            {blogInfo.content}
          </p>
        </div>

        {/* Author Info */}
        <div className="mt-8 flex items-center border-t border-gray-700 pt-4">
          <img
            src={`../imgs/${randomAuthor}`}
            alt="Author"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <p className="text-red-500 font-semibold text-lg">
              {blogInfo.author}
            </p>
            <p className="text-gray-400 text-sm">E-commerce Expert</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <span className="bg-red-500 text-white text-sm px-4 py-2 rounded-full mr-3">
            #Ecommerce
          </span>
          <span className="bg-red-500 text-white text-sm px-4 py-2 rounded-full">
            #Trends
          </span>
        </div>

        {/* Social Share Icons */}
        <div className="flex mt-8 space-x-6 text-red-500 text-2xl">
          <FaFacebook className="cursor-pointer hover:text-white" />
          <FaTwitter className="cursor-pointer hover:text-white" />
          <FaInstagram className="cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );

  // Render based on loading state and data availability
  if (loading) {
    return renderSkeleton(); // Show skeleton loader while loading
  }

  if (!blogInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-2xl text-red-500">No blog data found.</p>
      </div>
    );
  }

  return renderBlogContent(); // Show blog content when data is available
};

export default BlogInfo;
