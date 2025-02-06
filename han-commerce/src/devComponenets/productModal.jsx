import { useState } from "react";
import { FaTimes, FaShoppingCart } from "react-icons/fa";

const colors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#00FF00" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
];

const ProductModal = ({ selectedProduct, setSelectedProduct }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gray-900 opacity-100 z-50 text-white p-6 md:p-8 rounded-xl max-w-2xl w-full relative mx-2 shadow-lg border border-red-500 ">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
          <div className="md:w-1/2 w-full flex flex-col items-center">
            <img
              src={selectedProduct.image || "/placeholder.svg"}
              alt={selectedProduct.name}
              className="w-full h-auto object-cover rounded-lg max-h-64 border border-red-500"
            />
            <div className="mt-4 flex justify-center space-x-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    selectedColor.name === color.name
                      ? "border-red-500"
                      : "border-gray-600"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Selected: {selectedColor.name}
            </p>
          </div>
          <div className="md:w-1/2 w-full space-y-4 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-red-500">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              {selectedProduct.category}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-red-500">
              ${selectedProduct.price.toFixed(2)}
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              High-quality product available in multiple colors.
            </p>
            <button
              onClick={() => {
                console.log(`Added to cart: Color - ${selectedColor.name}`);
                setSelectedProduct(null);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center text-sm"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
