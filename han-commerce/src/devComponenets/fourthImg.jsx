import { motion } from "framer-motion";

const FourthImgSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <div className="relative w-full h-[300px] sm:h-[100%] bg-gradient-to-b from-black/50 to-transparent overflow-hidden">
        {/* Background Image with Zoom Animation */}
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5, ease: "easeOut" }}
        >
          <img
            src="../imgs/hat.jpg"
            className="w-full h-full object-cover"
            alt="Hat Banner"
            style={{ width: "100%", height: "100%" }} // Ensure image covers the container
          />
        </motion.div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex justify-start items-center px-4 sm:px-6 md:px-12 lg:px-16 text-white z-10">
          {/* Text Content */}
          <motion.div
            className="text-left space-y-2 sm:space-y-4 md:space-y-6"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
              variants={textVariants}
            >
              UNLEASH YOUR STRENGTH
            </motion.h1>
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic font-bold flex items-center"
              variants={textVariants}
            >
              <span className="text-white mr-2">___</span> RISE TO GREATNESS
            </motion.h2>
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200"
              variants={textVariants}
            >
              EVERY STEP COUNTS
            </motion.h3>
          </motion.div>
        </div>
      </div>

      {/* Inline CSS for Mobile Responsiveness */}
      <style>{`
        @media (max-width: 640px) {
          h1 {
            font-size: 1.5rem; /* 24px */
          }
          h2 {
            font-size: 1.25rem; /* 20px */
          }
          h3 {
            font-size: 1rem; /* 16px */
          }
        }
      `}</style>
    </>
  );
};

export default FourthImgSection;
