import "../styles/nav.css";
import NavbarSearch from "./navBarSearch";

const NavBar = () => {
  return (
    <div className="navBar top-0 flex justify-center sticky bg-gradient-to-b from-gray-950 to-black/75 z-50">
      <div className="hidden navContainer p-3 md:flex">
        <div className="flex bg-amber-800 iconContainer">
          <img src="../imgs/bohan.png" className="navIcon" alt="" />
        </div>
        <div className="navItemContainer">
          <div className="w-full flex justify-around">
            <div className="cursor-pointer text-xs font-bold text-white">
              HOME
            </div>
            <div className="text-xs cursor-pointer font-bold text-gray-300">
              FAV
            </div>
            <div className="text-xs cursor-pointer font-bold text-gray-300">
              CONTACT
            </div>
            <div className="text-xs cursor-pointer font-bold text-gray-300">
              HISTORY
            </div>
            <div className="text-xs cursor-pointer font-bold text-gray-300">
              BLOGS
            </div>
          </div>
        </div>

        <div className="searchContainer flex justify-end p-3 items-center">
          <div
            className="bg-white text-black border border-gray-300 rounded-md px-2 py-1 shadow-sm hover:bg-gray-100 cursor-pointer flex items-center justify-center w-8 h-8"
            onClick={() => (window.location.href = "/search")}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="navBar top-0 md:hidden sticky bg-gradient-to-b from-gray-950 to-black/75 z-50 w-full">
        {/* First Row (Logo & Search) */}
        <div className="flex justify-between items-center px-4 py-2 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="../imgs/bohan.png"
              className="w-10 h-10 md:w-12 md:h-12"
              alt="Logo"
            />
          </div>

          {/* Search Button */}
          <div className="searchContainer">
            <div
              className="bg-white text-black border border-gray-300 rounded-md px-2 py-1 shadow-sm hover:bg-gray-100 cursor-pointer flex items-center justify-center w-8 h-8"
              onClick={() => (window.location.href = "/search")}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Second Row (Navigation Items) */}
        <div className="flex justify-center bg-black/20 py-2">
          <div className="flex space-x-6">
            <div className="cursor-pointer text-xs font-bold text-white">
              HOME
            </div>
            <div className="cursor-pointer text-xs font-bold text-gray-300">
              FAV
            </div>
            <div className="cursor-pointer text-xs font-bold text-gray-300">
              CONTACT
            </div>
            <div className="cursor-pointer text-xs font-bold text-gray-300">
              HISTORY
            </div>
            <div className="cursor-pointer text-xs font-bold text-gray-300">
              BLOGS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
