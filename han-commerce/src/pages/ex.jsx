"use client";

import { useRef } from "react"; // Import useRef
import DiscountCountdown from "../devComponenets/discountCountdown";
import MarketingPostSection from "../devComponenets/marketingPostSection";
import AboutUs from "../devComponenets/aboutUsSection";
import WhyUs from "../devComponenets/WhyUs";
import Suggestion from "../devComponenets/suggestion";
import DiscountSection from "../devComponenets/discountSection";
import CategorySection from "../devComponenets/categorySection";
import SearchPage from "./searchPage";

export default function MyHome() {
  const searchPageRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <DiscountCountdown
        scrollToSearch={() => scrollToSection(searchPageRef)}
      />

      <DiscountSection />

      <Suggestion />

      <CategorySection />

      <div ref={searchPageRef}>
        <SearchPage />
      </div>

      <MarketingPostSection />

      <WhyUs />

      <AboutUs />
    </div>
  );
}
