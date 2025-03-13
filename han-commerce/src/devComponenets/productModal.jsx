import { useState } from "react";
import { FaTimes, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { localCall } from "../utilities/localstorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const colors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#00FF00" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
];

const ProductModal = ({ selectedProduct, setSelectedProduct }) => {
  const backendDomainName = "http://127.0.0.1:8000/";
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1); // State to track quantity in the modal
  const token = localStorage.getItem("han-commerce-token");
  const userData = localStorage.getItem("han-commerce-user");
  const navigate = useNavigate();

  const addToCart = async () => {
    let eachPrice = selectedProduct.price;
    if (selectedProduct.discount) {
      eachPrice =
        selectedProduct.price -
        selectedProduct.price * (Number(selectedProduct.discount) / 100);
    }

    try {
      const response = await axios.post(
        `${backendDomainName}api/addToCart/`,
        {
          id: selectedProduct.id,
          quantity: quantity,
          price: totalPrice,
          eachPrice: eachPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == "false") {
        return;
      } else {
        navigate("/cart");
      }
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login");
      }
    }
  };
  // Calculate total price based on quantity
  let totalPrice;
  if (selectedProduct.discount) {
    const discountPrice =
      selectedProduct.price -
      selectedProduct.price * (Number(selectedProduct.discount) / 100);

    totalPrice = discountPrice * quantity;
    // (Number(selectedProduct.discount) / 100);
  } else {
    totalPrice = selectedProduct.price * quantity;
  }

  const handleAddToCart = () => {
    const existingItem = cartItems.find(
      (item) =>
        item.id === selectedProduct.id && item.color.name === selectedColor.name
    );
    addToCart();
    if (existingItem) {
      // If the item is already in the cart, update the quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === selectedProduct.id &&
          item.color.name === selectedColor.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // If it's not in the cart, add it with the selected quantity
      setCartItems([
        ...cartItems,
        { id: selectedProduct.id, color: selectedColor, quantity },
      ]);
    }
    setSelectedProduct(null); // Close the modal
    navigate("cart");
  };

  const handleAddToFav = (id) => {
    const data = {
      product_id: id,
      user_id: userData.id,
    };
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1); // Increase quantity
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Decrease quantity, but not below 1
    }
  };

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
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
              src={
                selectedProduct.cover_photo
                  ? `${backendDomainName}storage/${selectedProduct.cover_photo}`
                  : "/placeholder.svg"
              }
              alt={selectedProduct.name}
              className="w-full h-auto object-cover rounded-lg max-h-64 border border-red-500"
            />
            {selectedProduct.colors && (
              <div className="mt-4 flex justify-center space-x-2">
                {JSON.parse(selectedProduct.colors).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      selectedColor == color ? "border-white" : " border-black"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            )}
            {/* <p className="mt-2 text-sm text-gray-400">
              Selected: {selectedColor.name}
            </p> */}
          </div>
          <div className="md:w-1/2 w-full space-y-4 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-red-500">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              {selectedProduct.category_name}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-red-500">
              {totalPrice} Ks {/* Display total price */}
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              High-quality product available in multiple colors.
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleDecreaseQuantity}
                className="bg-gray-600 text-white px-3 py-1 rounded-full"
              >
                <FaMinus />
              </button>
              <span className="text-xl text-white">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="bg-gray-600 text-white px-3 py-1 rounded-full"
              >
                <FaPlus />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
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
