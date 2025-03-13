"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopImgSection from "../devComponenets/topImg";
import SecondImgSection from "../devComponenets/secondImg";
import ThirdImgSection from "../devComponenets/thirdImg";
import FourthImgSection from "../devComponenets/fourthImg";
import FifthImgSection from "../devComponenets/fifthImg";
import MyHome from "./ex";

const HomePage = () => {
  const sections = [
    { id: 1, component: <TopImgSection /> },
    { id: 2, component: <SecondImgSection /> },
    { id: 3, component: <ThirdImgSection /> },
    { id: 4, component: <FourthImgSection /> },
    { id: 5, component: <FifthImgSection /> },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, 4000); // 4 seconds per section

    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <>
      <div className=" bg-black text-white overflow-x-hidden relative">
        <div className="relative  h-[300px] sm:h-[100%] overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: `-${currentIndex * 100}vw`, // Move by 100% viewport width per section
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition
            style={{
              width: `${sections.length * 100}vw`, // Total width for all sections
            }}
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                className="min-w-[100vw] h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {section.component}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <MyHome />
      </div>
    </>
  );
};

export default HomePage;
