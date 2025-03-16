import {
  FaShoppingBag,
  FaChartLine,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import { localCall } from "../utilities/localstorage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInitialBlogs } from "../features/blogSlice";

const backendDomainName = "http://127.0.0.1:8000/";

const MarketingPostCard = ({
  id,
  title,
  content,
  icon,
  author,
  blog_img,
  cta,
}) => {
  const IconComponent = FaIcons[icon];

  // Function to truncate content to a specified length
  const truncateContent = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "..."; // Add ellipsis for truncated text
  };

  // Limit content to 100 characters (you can adjust this number)
  const previewContent = truncateContent(content, 100);
  const navigate = useNavigate();
  return (
    <div className="bg-black hover:bg-black/40 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="relative h-48 sm:h-64">
        <img
          src={
            blog_img
              ? `${backendDomainName}storage/${blog_img}`
              : "/placeholder.svg"
          }
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          {IconComponent && <IconComponent className="w-6 h-6 text-red-500" />}
          <span className="text-white font-semibold">
            {title} ({author})
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-300 mb-4">{previewContent}</p>
        <button
          onClick={() => {
            navigate(`blog/${id}`);
          }}
          className="flex items-center space-x-2 text-red-500 font-semibold hover:text-red-400 transition-colors duration-300"
        >
          <span>{cta}</span>
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const MarketingPostSection = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("han-commerce-token");
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState(
    useSelector((state) => state.blogs.blogs)
  );
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("han-commerce-user"));

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendDomainName}api/getThreeBlogs`);

      if (response.data.status === "false") {
        setLoading(false);
        return;
      } else {
        setMyBlogs(response.data.blogs);
        dispatch(setInitialBlogs(response.data.blogs));
        setLoading(false);
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-2">
          Featured Offers
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Explore our latest deals and promotions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && myBlogs.length == 0
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-black rounded-lg overflow-hidden shadow-lg animate-pulse"
                  >
                    <div className="relative h-48 sm:h-64 bg-gray-700"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
            : myBlogs.map((post) => (
                <MarketingPostCard key={post.id} {...post} />
              ))}
        </div>
        <div className="md:mt-10 mt-4 text-center">
          <button
            onClick={() => {
              navigate("/blogs");
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketingPostSection;
