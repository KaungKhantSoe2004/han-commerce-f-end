import { useEffect, useState } from "react";
import BlogCard from "../devComponenets/blogCard";
import axios from "axios";
// Assuming you already have a BlogCard component

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Discover the latest trends shaping the web industry.",
    image: "https://source.unsplash.com/400x300/?technology",
    date: "Jan 10, 2024",
  },
  {
    id: 2,
    title: "10 JavaScript Tips for Beginners",
    excerpt: "Enhance your JavaScript skills with these tips.",
    image: "https://source.unsplash.com/400x300/?coding",
    date: "Feb 15, 2024",
  },
  {
    id: 3,
    title: "How to Build a React App",
    excerpt: "A step-by-step guide to creating a React project.",
    image: "https://source.unsplash.com/400x300/?react",
    date: "Mar 5, 2024",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    excerpt: "Create stunning user experiences with these principles.",
    image: "https://source.unsplash.com/400x300/?design",
    date: "Mar 20, 2024",
  },
  {
    id: 5,
    title: "SEO Best Practices in 2024",
    excerpt: "Improve your site's visibility with SEO techniques.",
    image: "https://source.unsplash.com/400x300/?seo",
    date: "Apr 10, 2024",
  },
  {
    id: 6,
    title: "The Future of Web Development",
    excerpt: "Discover the latest trends shaping the web industry.",
    image: "https://source.unsplash.com/400x300/?technology",
    date: "Jan 10, 2024",
  },
  {
    id: 7,
    title: "10 JavaScript Tips for Beginners",
    excerpt: "Enhance your JavaScript skills with these tips.",
    image: "https://source.unsplash.com/400x300/?coding",
    date: "Feb 15, 2024",
  },
  {
    id: 8,
    title: "How to Build a React App",
    excerpt: "A step-by-step guide to creating a React project.",
    image: "https://source.unsplash.com/400x300/?react",
    date: "Mar 5, 2024",
  },
  {
    id: 9,
    title: "UI/UX Design Principles",
    excerpt: "Create stunning user experiences with these principles.",
    image: "https://source.unsplash.com/400x300/?design",
    date: "Mar 20, 2024",
  },
  {
    id: 10,
    title: "SEO Best Practices in 2024",
    excerpt: "Improve your site's visibility with SEO techniques.",
    image: "https://source.unsplash.com/400x300/?seo",
    date: "Apr 10, 2024",
  },
];

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/getBlogs");

      console.log(response.data);

      // setVipName(response.data.data.memberLevelName);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
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
            indexOfLastPost >= blogPosts.length
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
          disabled={indexOfLastPost >= blogPosts.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
