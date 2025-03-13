import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300); // Delay focus to allow animation to complete
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your search logic here

    // Redirect to search page or perform search
    // window.location.href = `/search?q=${inputRef.current?.value}`;
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={`
            flex items-center bg-gray-800 rounded-full overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? "w-64 pr-2" : "w-10"}
          `}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className={`
              w-full bg-transparent text-white pl-4 pr-2 py-2 text-sm focus:outline-none
              transition-all duration-300 ease-in-out
              ${isExpanded ? "opacity-100" : "opacity-0 w-0"}
            `}
            onBlur={() => setIsExpanded(false)}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white focus:outline-none"
          >
            <FaSearch className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
