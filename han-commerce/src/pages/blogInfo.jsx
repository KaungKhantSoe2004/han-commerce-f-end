import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const BlogInfo = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-black p-10 rounded-lg shadow-lg">
        {/* Blog Image */}
        <img
          src="../imgs/blogOne.png"
          alt="Blog Post"
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* Blog Info */}
        <div className="mt-6">
          <p className="text-gray-400 text-sm">
            Published on: <span className="text-red-500">February 7, 2025</span>
          </p>
          <h1 className="text-4xl font-bold text-red-500 mt-2">
            The Future of E-commerce
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            E-commerce is evolving rapidly with AI, automation, and personalized
            experiences. Stay ahead by understanding the latest trends and
            technologies shaping the industry.
          </p>
        </div>

        {/* Author Info */}
        <div className="mt-8 flex items-center border-t border-gray-700 pt-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Author"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <p className="text-red-500 font-semibold text-lg">John Doe</p>
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
};

export default BlogInfo;
