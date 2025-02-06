import {
  FaDownload,
  FaCheckCircle,
  FaShippingFast,
  FaUndoAlt,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";

const purchases = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    date: "2023-06-01",
    price: "$129.99",
    status: "Delivered",
    address: "123 Main St, Anytown, AN 12345",
  },
  {
    id: 2,
    name: '27" 4K Monitor',
    date: "2023-05-15",
    price: "$399.99",
    status: "Shipped",
    address: "456 Oak Rd, Somewhere, SW 67890",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    date: "2023-05-10",
    price: "$49.99",
    status: "Delivered",
    address: "789 Pine Ave, Nowhere, NW 54321",
  },
  {
    id: 4,
    name: "1TB SSD",
    date: "2023-04-22",
    price: "$109.99",
    status: "Processing",
    address: "321 Elm St, Everywhere, EV 13579",
  },
  {
    id: 5,
    name: "Gaming Headset",
    date: "2023-04-05",
    price: "$79.99",
    status: "Returned",
    address: "654 Birch Ln, Anywhere, AW 97531",
  },
];

export default function PurchaseHistory() {
  const handleCancel = (id) => {
    console.log(`Cancelling order ${id}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-red-500">
          Purchase History
        </h2>
        <button className="mt-3 sm:mt-0 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaDownload className="mr-2" />
          Download History
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto bg-gray-800 rounded-lg shadow">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {[
                "Product Name",
                "Purchase Date",
                "Price",
                "Status",
                "Address",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 border-b-2 border-gray-700 text-left text-xs font-semibold text-red-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-700">
                <td className="px-5 py-5 border-b border-gray-700 text-sm text-white font-medium">
                  {purchase.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm text-white">
                  {purchase.date}
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm text-white">
                  {purchase.price}
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm">
                  <span
                    className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                      purchase.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : purchase.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : purchase.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {purchase.status === "Delivered" && (
                      <FaCheckCircle className="mr-1" />
                    )}
                    {purchase.status === "Shipped" && (
                      <FaShippingFast className="mr-1" />
                    )}
                    {purchase.status === "Processing" && (
                      <FaShippingFast className="mr-1" />
                    )}
                    {purchase.status === "Returned" && (
                      <FaUndoAlt className="mr-1" />
                    )}
                    {purchase.status}
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm text-white flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-red-500" />
                  {purchase.address}
                </td>
                <td className="px-5 py-5 border-b border-gray-700 text-sm">
                  {(purchase.status === "Processing" ||
                    purchase.status === "Shipped") && (
                    <button
                      onClick={() => handleCancel(purchase.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center text-xs"
                    >
                      <FaTimes className="mr-1" />
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="sm:hidden">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-gray-800 rounded-lg p-4 mb-4 shadow"
          >
            <h3 className="text-lg font-semibold text-white">
              {purchase.name}
            </h3>
            <p className="text-gray-400 text-sm">Date: {purchase.date}</p>
            <p className="text-gray-400 text-sm">Price: {purchase.price}</p>
            <div className="flex items-center mt-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  purchase.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : purchase.status === "Shipped"
                    ? "bg-blue-100 text-blue-800"
                    : purchase.status === "Processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {purchase.status}
              </span>
            </div>
            <p className="text-white flex items-center mt-2">
              <FaMapMarkerAlt className="mr-1 text-red-500" />
              {purchase.address}
            </p>
            {(purchase.status === "Processing" ||
              purchase.status === "Shipped") && (
              <button
                onClick={() => handleCancel(purchase.id)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              >
                <FaTimes className="mr-2" />
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
