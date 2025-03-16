import { useEffect, useState } from "react";
import BlogCard from "../devComponenets/blogCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setInitialBlogs } from "../features/blogSlice";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [blogPosts, setBlogPosts] = useState(
    useSelector((state) => state.blogs.blogs)
  );
  const [loading, setLoading] = useState(true); // Loading state
  const postsPerPage = 6;

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts?.slice(indexOfFirstPost, indexOfLastPost);

  // Fetch blog posts
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/getBlogs");

      if (response.data.status === "true") {
        setBlogPosts(response.data.data);
        dispatch(setInitialBlogs(response.data.data));
      } else {
        alert("Sorry There is an error occured");
      }
    } catch (error) {
      alert("Sorry There Is an Error Occured");
    } finally {
      setLoading(false); // Stop loading after fetch completes
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Skeleton Loading Component
  const renderSkeleton = () => (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(postsPerPage)]?.map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-700 h-48 rounded-lg"></div>{" "}
          {/* Image placeholder */}
          <div className="mt-4 space-y-2">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>{" "}
            {/* Title placeholder */}
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>{" "}
            {/* Excerpt placeholder */}
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>{" "}
            {/* Author placeholder */}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        {loading && blogPosts.length == 0 ? (
          renderSkeleton() // Show skeleton while loading
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts?.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 my-8">
        <button
          className={`py-2 px-4 rounded-full ${
            currentPage === 1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className={`py-2 px-4 rounded-full ${
            indexOfLastPost >= blogPosts?.length
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
          disabled={indexOfLastPost >= blogPosts?.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
