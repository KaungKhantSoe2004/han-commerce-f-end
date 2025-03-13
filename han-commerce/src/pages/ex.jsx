"use client";

import { useState, useEffect } from "react";

import DiscountCountdown from "../devComponenets/discountCountdown";
import MarketingPostSection from "../devComponenets/marketingPostSection";
import AboutUs from "../devComponenets/aboutUsSection";
import WhyUs from "../devComponenets/WhyUs";
import Suggestion from "../devComponenets/suggestion";
import DiscountSection from "../devComponenets/discountSection";
import CategorySection from "../devComponenets/categorySection";
import SearchPage from "./searchPage";

export default function MyHome() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DiscountCountdown />

      <DiscountSection />

      <Suggestion />

      <CategorySection />

      <SearchPage />
      <MarketingPostSection />

      <WhyUs />

      <AboutUs />
    </div>
  );
}
