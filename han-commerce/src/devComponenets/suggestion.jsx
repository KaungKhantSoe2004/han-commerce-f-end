import { useState } from "react";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import ProductModal from "./productModal";
const popularProducts = [
  {
    id: 1,
    name: "Pro Performance Hoodie",
    price: 89.99,
    category: "Sportswear",
    rating: 4.5,
    reviews: 128,
    colors: ["bg-blue-500", "bg-red-500", "bg-gray-700"],
    image:
      "https://i.pinimg.com/originals/a2/19/df/a219dfd23fedc5324684bf5c28ecec2e.jpg",
  },
  {
    id: 2,
    name: "Pro Performance Hoodie",
    price: 89.99,
    category: "Sportswear",
    rating: 4.5,
    reviews: 128,
    colors: ["bg-blue-500", "bg-red-500", "bg-gray-700"],
    image:
      "https://preview.colorlib.com/theme/malefashion/img/banner/banner-1.jpg",
  },
  {
    id: 3,
    name: "Pro Performance Hoodie",
    price: 89.99,
    category: "Sportswear",
    rating: 4.5,
    reviews: 128,
    colors: ["bg-blue-500", "bg-red-500", "bg-gray-700"],
    image:
      "https://i5.walmartimages.com/asr/78ac9c4d-2164-4fd5-bacc-928b458cdb88_1.11568b431a351d5e21fadfd57425cff7.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
  },
  {
    id: 4,
    name: "Pro Performance Hoodie",
    price: 89.99,
    category: "Sportswear",
    rating: 4.5,
    reviews: 128,
    colors: ["bg-blue-500", "bg-red-500", "bg-gray-700"],
    image:
      "https://i.pinimg.com/originals/a2/19/df/a219dfd23fedc5324684bf5c28ecec2e.jpg",
  },
  {
    id: 5,
    name: "Pro Performance Hoodie",
    price: 89.99,
    category: "Sportswear",
    rating: 4.5,
    reviews: 128,
    colors: ["bg-blue-500", "bg-red-500", "bg-gray-700"],
    image:
      "https://preview.colorlib.com/theme/malefashion/img/banner/banner-1.jpg",
  },
  {
    id: 6,
    name: "Pro Performance Hoodie",
    price: 89.99,
    category: "Sportswear",
    rating: 4.5,
    reviews: 128,
    colors: ["bg-blue-500", "bg-red-500", "bg-gray-700"],
    image:
      "https://i5.walmartimages.com/asr/78ac9c4d-2164-4fd5-bacc-928b458cdb88_1.11568b431a351d5e21fadfd57425cff7.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
  },
  {
    id: 7,
    name: "Pro Performance Hoodie",
    price: 89.99,
    category: "Sportswear",
    rating: 4.5,
    reviews: 128,
    colors: ["bg-blue-500", "bg-red-500", "bg-gray-700"],
    image:
      "https://i.pinimg.com/originals/a2/19/df/a219dfd23fedc5324684bf5c28ecec2e.jpg",
  },
  {
    id: 8,
    name: "Pro Performance Hoodie",
    price: 89.99,
    category: "Sportswear",
    rating: 4.5,
    reviews: 128,
    colors: ["bg-blue-500", "bg-red-500", "bg-gray-700"],
    image:
      "https://preview.colorlib.com/theme/malefashion/img/banner/banner-1.jpg",
  },
];
const Suggestion = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <section className="max-w-7xl mx-auto mt-3 px-4">
      <h2 className="text-3xl font-bold mb-8">Suggested For You</h2>
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          
        </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {popularProducts.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer relative bg-neutral-400 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Image Container - Adjusted to square aspect ratio */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />

              {/* New Arrival Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                New Arrival
              </div>

              {/* Hover Overlay with Product Info */}
              <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute inset-0 p-4 flex flex-col justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Top Section */}
                  <div className="space-y-2">
                    <div className="flex justify-end items-end">
                      <button className="text-white/80 hover:text-red-500 transition-colors duration-300 float-right">
                        <FiHeart className="w-5 h-5" />
                      </button>
                    </div>
                    <h3 className="text-base font-semibold text-white  line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-white/60 text-sm">{product.category}</p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/80 text-sm ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {/* Colors */}
                    <div className="flex space-x-2">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-5 h-5 rounded-full ${color} cursor-pointer border border-transparent hover:border-white transition-all duration-300`}
                        />
                      ))}
                    </div>

                    {/* Price and Cart */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-red-500">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white text-gray-100 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-500 hover:text-red-400 transition-colors duration-300 flex items-center space-x-1"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </section>
  );
};
export default Suggestion;
