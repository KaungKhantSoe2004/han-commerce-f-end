import {
  FiCreditCard,
  FiRefreshCcw,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
const featureItems = [
  {
    icon: FiTruck,
    title: "Fast Delivery",
    description: "Get your items delivered in 24 hours",
  },
  {
    icon: FiCreditCard,
    title: "Secure Payment",
    description: "Multiple safe payment options",
  },
  {
    icon: FiShoppingBag,
    title: "Shop with Confidence",
    description: "30 day money-back guarantee",
  },
  {
    icon: FiRefreshCcw,
    title: "Easy Returns",
    description: "Hassle-free return process",
  },
];
const WhyUs = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % featureItems.length);
      controls.start({
        x: `-${currentFeature * 200}px`,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [controls, currentFeature]);
  return (
    <section className="max-w-7xl mx-auto md:mt-10 mt-5 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
      <div className="bg-gradient-to-t from-black to-gray-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-red-500">
              Our Features
            </h3>
            <p className="text-gray-300">
              Experience the best in online shopping with our premium services
              designed to make your journey smooth and enjoyable.
            </p>
            <div className="flex space-x-2">
              {featureItems.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentFeature ? "bg-red-500" : "bg-gray-500"
                  }`}
                  animate={{ scale: index === currentFeature ? 1.5 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              ))}
            </div>
          </div>
          <div className="relative h-64">
            {featureItems.map((feature, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: currentFeature === index ? 1 : 0,
                  y: currentFeature === index ? 0 : 50,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: currentFeature === index ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {React.createElement(feature.icon, {
                    className: "w-16 h-16 mb-4 text-red-500",
                  })}
                </motion.div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-300 max-w-xs">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyUs;
