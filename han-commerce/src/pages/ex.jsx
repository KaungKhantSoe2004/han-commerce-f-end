"use client";

import { motion, useAnimation } from "framer-motion";

import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiStar,
  FiTruck,
  FiCreditCard,
  FiShoppingBag,
  FiRefreshCcw,
} from "react-icons/fi";
import DiscountCountdown from "../devComponenets/discountCountdown";
import MarketingPostSection from "../devComponenets/marketingPostSection";
import Footer from "../devComponenets/footer";
import AboutUs from "../devComponenets/aboutUsSection";
import WhyUs from "../devComponenets/WhyUs";
import Suggestion from "../devComponenets/suggestion";
import DiscountSection from "../devComponenets/discountSection";
import CategorySection from "../devComponenets/categorySection";

const carouselItems = [
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20190230-8evU1tEe1Rg6ccKF4QQ1n4179Yreq4.png",
    title: "BUILD PERFECT FIGURE",
    subtitle: "SHAPE FOR GOOD",
    description: "AND HEALTHY LIFE",
  },
];

const product = {
  id: 1,
  name: "Gaming Headset",
  category: "Electronics",
  image: "../imgs/earphone.png", // Replace with actual image URL
  originalPrice: 99.99,
  discountedPrice: 59.99,
  discount: 40,
};

export default function MyHome() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const [position, setPosition] = useState(0);

  const controls = useAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      <DiscountCountdown product={product} />

      <DiscountSection />

      <Suggestion />

      <CategorySection />

      <MarketingPostSection />

      <WhyUs />

      <AboutUs />
    </div>
  );
}
