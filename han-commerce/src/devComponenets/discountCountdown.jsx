import { useState, useEffect } from "react";
import { localCall } from "../utilities/localstorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCountDown } from "../features/countdownSlice";

export default function DiscountCountdown({ scrollToSearch }) {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("han-commerce-user"));
  const token = localStorage.getItem("han-commerce-token");
  console.log(token, userData);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(
    useSelector((state) => state.countDown.countDown)
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [dealEndTime, setDealEndTime] = useState(
    new Date("2025-02-10T23:59:59").getTime()
  );
  const [isFetching, setIsFetching] = useState(true);
  const backendDomainName = "http://127.0.0.1:8000/";
  const navigate = useNavigate();

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

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${backendDomainName}api/getCountDownProduct`
      );
      if (response.data.status === "false") {
        setError(true);
      } else {
        setProduct(response.data.product);
        dispatch(setCountDown(response.data.product));
        setDealEndTime(
          new Date(response.data.product.end_time_discount).getTime()
        );
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        localCall("removeToken");
        localCall("removeUser");
        navigate("/login", {
          state: { message: "Your session has expired. Please log in again." },
        });
      }
      setError(true);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    // if (product == {}) {
    if (window.location.hash === "#search") {
      scrollToSearch();
    }
    fetchData();
    // console.log("fetching");
    // }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      if (
        timeLeft.days <= 0 &&
        timeLeft.hours <= 0 &&
        timeLeft.minutes <= 0 &&
        timeLeft.seconds <= 0
      ) {
        clearInterval(timer);
      }
      setTimeLeft(timeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [dealEndTime]);

  if (isFetching) {
    return (
      <section
        id="discount"
        className="bg-black text-white py-16 px-6 text-center"
      >
        <div className="max-w-5xl mx-auto animate-pulse space-y-6">
          {/* Headline Skeleton */}
          <div className="h-8 w-1/2 bg-gray-700 mx-auto mb-4 rounded"></div>
          <div className="h-6 w-1/3 bg-gray-700 mx-auto mb-8 rounded"></div>

          {/* Product Display Skeleton */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 bg-gradient-to-t from-black to-gray-700 rounded-xl overflow-hidden p-6 shadow-lg">
            {/* Image Skeleton */}
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-700 rounded-lg"></div>

            {/* Info Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-700 rounded"></div>

              {/* Price and Discount Skeleton */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-3">
                <div className="h-6 w-20 bg-gray-700 rounded"></div>
                <div className="h-4 w-16 bg-gray-700 rounded line-through"></div>
                <div className="h-5 w-12 bg-gray-700 rounded"></div>
              </div>

              {/* Countdown Skeleton */}
              <div className="flex justify-center md:justify-start space-x-3 mt-4">
                {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
                  <div
                    key={i}
                    className="bg-red-600 rounded-lg px-3 py-2 shadow-md"
                  >
                    <div className="h-6 w-6 bg-gray-700 rounded mb-1"></div>
                    <div className="text-xs md:text-sm">{label}</div>
                  </div>
                ))}
              </div>

              {/* Button Skeleton */}
              <div className="mt-5 mx-auto md:mx-0">
                <div className="h-10 w-32 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product || Object.keys(product).length === 0) {
    return (
      <section className="bg-black text-white py-16 px-6 text-center">
        <p>Failed to load the product. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-16 px-6 text-center">
      <h2 className="md:text-4xl text-2xl font-bold text-red-400 md:mb-6 mb-3">
        Limited Time Offer!
      </h2>
      <p className="md:text-lg text-sm md:mb-8 mb-3">
        Get this exclusive deal before time runs out!
      </p>

      {/* Product Display */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 bg-gradient-to-t from-black to-gray-700 rounded-xl overflow-hidden p-6 shadow-lg max-w-5xl mx-auto">
        {/* Product Image */}
        <img
          src={
            product.cover_photo
              ? `${backendDomainName}storage/${product.cover_photo}`
              : "https://via.placeholder.com/150"
          }
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
              $
              {(
                Number(product.price) -
                Number(product.price) * (product.discount / 100)
              ).toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-sm md:text-base">
              ${Number(product.price).toFixed(2)}
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
          {token == null ? (
            <button
              onClick={() => {
                navigate("register");
              }}
              className="mt-5 w-full md:w-auto bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Register To Shop
            </button>
          ) : (
            <button
              onClick={() => scrollToSearch()}
              className="mt-5 w-full md:w-auto bg-red-900 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Shop Now
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
