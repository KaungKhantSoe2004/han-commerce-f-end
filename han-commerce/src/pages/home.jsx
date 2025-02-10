import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "../devComponenets/nav";
import TopImgSection from "../devComponenets/topImg";
import MyHome from "./ex";
import "../styles/home.css"; // Ensure this file exists for styling
import SecondImgSection from "../devComponenets/secondImg";
import ThirdImgSection from "../devComponenets/thirdImg";
import DefaultNavBar from "../devComponenets/defaultNav";

const HomePage = () => {
  const sections = [
    { id: 1, component: <TopImgSection /> },
    { id: 2, component: <SecondImgSection /> },
    { id: 3, component: <ThirdImgSection /> },
    { id: 4, component: <TopImgSection /> },
    { id: 5, component: <TopImgSection /> },
  ];

  const carouselRef = useRef(null);
  const indexRef = useRef(0);
  const [_, setCurrentIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("han-commerce-token");
    if (token) {
      setIsLoggedIn(true);
    }
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % sections.length;
      setCurrentIndex(indexRef.current);
      carouselRef.current?.scrollTo({
        left: indexRef.current * window.innerWidth,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homePage">
      {/* <DefaultNavBar /> */}
      <br />

      <div className="relative overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex space-x-4 scroll-container"
          drag="x"
          dragConstraints={{
            right: 0,
            left: -window.innerWidth * (sections.length - 1),
          }}
        >
          {sections.map((section) => (
            <motion.div key={section.id} className="min-w-full">
              {section.component}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <MyHome />
    </div>
  );
};

export default HomePage;
