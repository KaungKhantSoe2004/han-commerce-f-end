import { useState } from "react";
import Pagination from "./Pagination";

const PaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically fetch data for the new page
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Pagination Example
      </h1>
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Current Page: {currentPage}
        </h2>
        <p className="text-gray-400">
          This is where your page content would go. You would typically fetch
          and display data based on the current page number.
        </p>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationExample;
