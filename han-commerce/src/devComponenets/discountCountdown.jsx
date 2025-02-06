import { useState, useEffect } from "react";

export default function DiscountCountdown({ product }) {
  // Set deal expiry time (YYYY-MM-DD HH:MM:SS)
  const dealEndTime = new Date("2025-02-10T23:59:59").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const timeLeft = dealEndTime - now;

    return {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeLeft / (1000 * 60)) % 60),
      seconds: Math.floor((timeLeft / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-black text-white py-16 px-6 text-center">
      <h2 className="md:text-4xl text-2xl font-bold text-red-400 md:mb-6 mb-3">
        Limited Time Offer!
      </h2>
      <p className="md:text-lg  text-sm md:mb-8 mb-3">
        Get this exclusive deal before time runs out!
      </p>

      {/* Product Display */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 bg-gradient-to-t from-black to-gray-700 rounded-xl overflow-hidden p-6 shadow-lg max-w-5xl mx-auto">
        {/* Product Image */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg"
        />

        {/* Product Info */}
        <div className="text-center md:text-left w-full">
          <h3 className="text-xl md:text-2xl font-bold">{product.name}</h3>
          <p className="text-gray-400 text-sm md:text-base">
            {product.category}
          </p>

          {/* Price and Discount */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 mt-3">
            <span className="text-lg md:text-xl font-bold text-red-500">
              ${product.discountedPrice.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-sm md:text-base">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs md:text-sm">
              {product.discount}% OFF
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center md:justify-start space-x-3 text-center text-lg md:text-2xl font-bold mt-4">
            <div className="bg-red-600 text-white rounded-lg px-3 py-2 shadow-md">
              <p>{timeLeft.days}</p>
              <span className="text-xs md:text-sm">Days</span>
            </div>
            <div className="bg-red-600 text-white rounded-lg px-3 py-2 shadow-md">
              <p>{timeLeft.hours}</p>
              <span className="text-xs md:text-sm">Hours</span>
            </div>
            <div className="bg-red-600 text-white rounded-lg px-3 py-2 shadow-md">
              <p>{timeLeft.minutes}</p>
              <span className="text-xs md:text-sm">Minutes</span>
            </div>
            <div className="bg-red-600 text-white rounded-lg px-3 py-2 shadow-md">
              <p>{timeLeft.seconds}</p>
              <span className="text-xs md:text-sm">Seconds</span>
            </div>
          </div>

          {/* Shop Now Button */}
          <button className="mt-5 w-full md:w-auto bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
