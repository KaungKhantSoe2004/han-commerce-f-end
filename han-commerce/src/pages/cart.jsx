"use client";

import { useState } from "react";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

const initialCartItems = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    price: 129.99,
    quantity: 1,
    image: "https://placehold.co/60x60",
  },
  {
    id: 2,
    name: '27" 4K Monitor',
    price: 399.99,
    quantity: 1,
    image: "https://placehold.co/60x60",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: 49.99,
    quantity: 2,
    image: "https://placehold.co/60x60",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h4 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-red-500 flex items-center">
          <FaShoppingCart className="mr-2" />
        </h4>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg md:text-xl mb-4">Your cart is empty</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 md:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm md:text-base">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="bg-black rounded-lg shadow-lg overflow-hidden mb-6 md:mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b border-gray-700 hover:bg-gray-950 transition duration-300 ease-in-out"
                >
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end md:space-x-4">
                    <div className="flex items-center bg-gray-700 rounded-full">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="text-gray-400 hover:text-white p-1 md:p-2 rounded-full transition duration-300 ease-in-out"
                      >
                        <FaMinus className="text-xs md:text-sm" />
                      </button>
                      <span className="px-2 md:px-4 py-1 md:py-2 font-semibold text-sm md:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-gray-400 hover:text-white p-1 md:p-2 rounded-full transition duration-300 ease-in-out"
                      >
                        <FaPlus className="text-xs md:text-sm" />
                      </button>
                    </div>
                    <p className="font-semibold text-base md:text-lg ml-4 md:ml-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 p-1 md:p-2 rounded-full transition duration-300 ease-in-out ml-4 md:ml-0"
                    >
                      <FaTrash className="text-sm md:text-base" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-950 rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg md:text-xl font-semibold">Total:</span>
                <span className="text-xl md:text-2xl font-bold text-red-500">
                  ${calculateTotal()}
                </span>
              </div>
              <div className=" flex justify-center">
                <button className="md:w-2/3 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 text-sm md:text-base">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
