const BlogCard = ({ title, excerpt, author, date, imageUrl, category }) => (
  <div
    key={title}
    className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
  >
    <img
      src={imageUrl}
      alt={title}
      width={300}
      height={200}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <span className="text-red-500 text-xs font-semibold tracking-wide uppercase">
        {category}
      </span>
      <h3 className="text-xl font-semibold text-white mt-2 mb-3">{title}</h3>
      <p className="text-gray-400 mb-4">{excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{author}</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </div>
  </div>
);
export default BlogCard;
