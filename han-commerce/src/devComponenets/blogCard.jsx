import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, title, excerpt, author, created_at, blog_img }) => {
  const navigate = useNavigate();

  // Function to handle card click
  const handleCardClick = () => {
    navigate(`/blog/${id}`); // Navigate to the blog detail page
  };

  return (
    <div
      onClick={handleCardClick} // Add onClick handler to navigate
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      {/* Blog Image */}
      <img
        src={`http://127.0.0.1:8000/storage/${blog_img}`}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200"; // Fallback image
        }}
      />

      {/* Blog Content */}
      <div className="p-6">
        <span className="text-red-500 text-xs font-semibold tracking-wide uppercase">
          {/* Add a category or tag here if needed */}
        </span>
        <h3 className="text-xl font-semibold text-white mt-2 mb-3">{title}</h3>
        <p className="text-gray-400 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{author}</span>
          <span className="text-sm text-gray-500">
            {new Date(created_at).toISOString().slice(0, 19).replace("T", " ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
