import { useState } from "react";

export default function NavbarSearch() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchClick = () => {
    if (isExpanded) {
      window.location.href = "/search";
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-10"
        }`}
      >
        <input
          type="text"
          className={`peer h-10 w-full rounded-full border border-gray-700 bg-gray-900 px-4 text-sm text-white outline-none transition-all duration-300 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:shadow-inner ${
            isExpanded ? "opacity-100" : "w-0 opacity-0"
          }`}
          placeholder="Search products..."
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
        />
        <button
          className={`absolute right-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 ease-in-out hover:bg-blue-700 ${
            isExpanded ? "opacity-100" : "opacity-80 hover:opacity-100"
          }`}
          onClick={handleSearchClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
