import BlogCard from "./blogCard";

const blogPosts = [
  {
    id: 1,
    title: "10 E-commerce Trends to Watch in 2025",
    excerpt:
      "Discover the latest trends shaping the future of online retail and how they can impact your business.",
    author: "Jane Doe",
    date: "May 15, 2025",
    imageUrl: "../imgs/blogOne.png",
    category: "Trends",
  },
  {
    id: 2,
    title: "Maximizing Conversions: UX Tips for Your Online Store",
    excerpt:
      "Learn how to optimize your e-commerce website's user experience to drive more sales and customer satisfaction.",
    author: "John Smith",
    date: "May 10, 2025",
    imageUrl: "../imgs/blogTwo.png",
    category: "UX Design",
  },
  {
    id: 3,
    title:
      "The Power of Social Commerce: Integrating Social Media with E-commerce",
    excerpt:
      "Explore strategies to leverage social media platforms for increasing your e-commerce sales and brand awareness.",
    author: "Emily Johnson",
    date: "May 5, 2025",
    imageUrl: "../imgs/blogThree.png",
    category: "Marketing",
  },
  // Add more blog posts as needed
];

const BlogSection = () => {
  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-8">
          Latest from Our Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
