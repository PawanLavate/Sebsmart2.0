import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full
      justify-center bg-[url(/gradientBackground_green_soft.png)] bg-cover bg-no-repeat min-h-screen"
    >
      {/* Intro Text */}
      <div className="text-center mb-6">
        <motion.h1
         initial={{opacity:0, y: 40}}
        whileInView={{ opacity: 1, y:0}}
        transition={{ duration:0.5, delay:0.7}}
        viewport={{ once: true}}
          className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
          font-semibold mx-auto leading-[1.2]"
        >
          Smarter Apple Farming <br />
          with <span className="text-primary">SebSmart</span>
        </motion.h1>
        <motion.p
         initial={{opacity:0, y: 30}}
        whileInView={{ opacity: 1, y:0}}
        transition={{ duration:0.6, delay:0.8}}
        viewport={{ once: true}}
          className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto
          max-sm:text-xs text-gray-600"
        >
          SebSmart empowers apple growers with AI-driven tools — from{" "}
          <strong>pest prediction & control</strong>, to{" "}
          <strong>yield estimation using ML</strong>, and{" "}
          <strong>growth tracking with GDD models</strong>. Smarter insights for
          healthier orchards and better harvests.
        </motion.p>
      </div>

      {/* Buttons */}
      <motion.div
       initial={{opacity:0, y: 20}}
        whileInView={{ opacity: 1, y:0}}
        transition={{ duration:0.5, delay:0.7}}
        viewport={{ once: true}}
       className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-green-600 text-white px-10 py-3 rounded-lg
          hover:scale-102 active:scale-95"
        >
          Explore Features
        </button>
        <button
          className="bg-white px-10 py-3 rounded-lg border
          border-gray-300 hover:scale-102 active:scale-95 transition
          cursor-pointer"
        >
          Learn More
        </button>
      </motion.div>

      {/* Project Tagline */}
      <motion.div
       initial={{opacity:0, y: 20}}
        whileInView={{ opacity: 1, y:0}}
        transition={{ duration:0.5, delay:0.8}}
        viewport={{ once: true}}
       className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="Innovation" className="h-8" />
        An Innovative Idea for Smarter Apple Farming
      </motion.div>
    </div>
  );
};

export default Hero;
