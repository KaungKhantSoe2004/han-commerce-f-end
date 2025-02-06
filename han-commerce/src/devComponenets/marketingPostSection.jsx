import {
  FaShoppingBag,
  FaChartLine,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

const marketingPosts = [
  {
    id: 1,
    title: "Summer Sale Extravaganza",
    description:
      "Get up to 50% off on all summer essentials. Limited time offer!",
    icon: <FaShoppingBag className="w-6 h-6 text-red-500" />,
    imageUrl: "../imgs/blogOne.png",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Trending Products 2025",
    description:
      "Discover the hottest products that are flying off the shelves this year.",
    icon: <FaChartLine className="w-6 h-6 text-red-500" />,
    imageUrl: "../imgs/blogTwo.png",
    cta: "See Trends",
  },
  {
    id: 3,
    title: "Join Our Loyalty Program",
    description:
      "Earn points, get exclusive deals, and enjoy premium benefits.",
    icon: <FaUsers className="w-6 h-6 text-red-500" />,
    imageUrl: "../imgs/blogThree.png",
    cta: "Sign Up",
  },
];

const MarketingPostCard = ({ title, description, icon, imageUrl, cta }) => (
  <div className="bg-black hover:bg-black/40 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
    <div className="relative h-48 sm:h-64">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-70"></div>
      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
        {icon}
        <span className="text-white font-semibold">{title}</span>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-300 mb-4">{description}</p>
      <button className="flex items-center space-x-2 text-red-500 font-semibold hover:text-red-400 transition-colors duration-300">
        <span>{cta}</span>
        <FaArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const MarketingPostSection = () => {
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
          {marketingPosts.map((post) => (
            <MarketingPostCard key={post.id} {...post} />
          ))}
        </div>
        <div className="md:mt-10 mt-4 text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketingPostSection;
