import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { motion } from 'motion/react'

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0}}
    transition={{duration: 0.6, ease: 'easeOut'}}
     className="fixed z-5 w-full backdrop:blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-12 sm:w-18 cursor-pointer"
      />

      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-10 py-2.5"
        >
          Get Started <ArrowRight className="w-4 h-4" />{" "}
        </button>
      )}
    </motion.div>
  );
};

export default Navbar;
