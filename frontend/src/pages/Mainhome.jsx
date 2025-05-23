import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const sectionVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const Mainhome = () => {
  const navigate = useNavigate();

  const handleCardClick = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-20 px-4 sm:px-6 md:px-10 pb-10 text-white overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      
      {/* Starfield background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 mb-14 sm:mb-16 z-10 drop-shadow-lg px-4"
      >
        🌟 Welcome to SafeSpace
      </motion.h1>

      {/* Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
        {[
          {
            icon: "🎧",
            title: "Listener",
            text: "Talk to a listener. We're here to provide mentel suport to u 💖.",
            page: "list",
          },
          {
            icon: "📞",
            title: "Call",
            text: "Randomly connect with any user through call.",
            page: "call",
          },
          {
            icon: "💬",
            title: "Chat",
            text: "Safe place for open dialog.",
            page: "home",
          },
        ].map((section, i) => (
          <motion.div
            key={section.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            whileHover={{
              scale: 1.05,
              rotate: [0, 1, -1, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-gray-800 p-6 rounded-2xl shadow-2xl cursor-pointer transition-all text-center"
            onClick={() => handleCardClick(section.page)}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 flex items-center justify-center gap-2">
              {section.icon} {section.title}
            </h2>
            <p className="text-base sm:text-lg">{section.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mainhome;
