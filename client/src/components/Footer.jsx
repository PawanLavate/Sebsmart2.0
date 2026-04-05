import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const Footer = () => {
  const navigate = useNavigate();

  // Parent container animation (controls staggering)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // smooth stagger between sections
      },
    },
  };

  // Each child animation
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20"
    >
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">

        {/* Logo + Intro */}
        <motion.div
          variants={itemVariants}
          className="md:max-w-96"
        >
          <img
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            className="h-9 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
          <p className="mt-6 text-sm">
            Empowering apple farming with intelligent solutions. <br />
            Our system helps farmers predict and control pests, estimate apple yields using machine learning,
            and track growth patterns with a GDD-based phenological model. <br />
            Smarter insights for healthier orchards and better harvests.
          </p>
        </motion.div>

        {/* Links Section */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex items-start md:justify-end gap-16"
        >
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Project</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About the Project</a></li>
              <li><a href="#" className="hover:underline">Pest Prediction & Control</a></li>
              <li><a href="#" className="hover:underline">Yield Estimation (ML)</a></li>
              <li><a href="#" className="hover:underline">Growth Modeling (GDD)</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Resources</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Research & Publications</a></li>
              <li><a href="#" className="hover:underline">Contact / Collaborate</a></li>
              <li><a href="#" className="hover:underline">Data & Privacy Policy</a></li>
            </ul>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={itemVariants}
          className="max-w-sm"
        >
          <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
          <div className="text-sm space-y-2">
            <p>The latest research, updates, and tools for smarter apple farming — delivered weekly.</p>
            <div className="flex items-center gap-2 pt-4">
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: "#16a34a" }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-green-600 outline-none w-full max-w-64 h-9 rounded px-2"
                type="email"
                placeholder="Enter your email"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-green-600 w-24 h-9 text-white rounded cursor-pointer"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.p
        variants={itemVariants}
        className="pt-4 text-center text-xs md:text-sm pb-5"
      >
        © 2025 SebSmart. Advancing Apple Farming with AI, ML & Phenological Models.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
