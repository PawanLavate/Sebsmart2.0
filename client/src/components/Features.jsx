import React from 'react';
import { useNavigate } from 'react-router-dom';
import { features } from '../assets/assets';
import { useClerk, useSignIn, useUser } from '@clerk/clerk-react';
import { motion } from 'motion/react';

const Features = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <motion.div
      initial="hidden"
      whileInView={'visible'}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      className="px-4 sm:px-20 xl:px-32 my-24"
    >
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-slate-700 text-[42px] font-semibold"
        >
          SebSmart Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-500 max-w-lg mx-auto"
        >
          Exploring innovative ideas to support apple farming with AI & ML.
        </motion.p>
      </div>

      <div className="flex flex-wrap mt-10 gap-6 justify-center">
        {features.map((feature, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            viewport={{ once: true }}
            key={index}
            className="p-8 max-w-xs rounded-lg bg-[#FDFDFE]
              shadow-lg border border-gray-100 hover:-translate-y-1 transition-all
              duration-300 cursor-pointer"
            onClick={() => {
              user ? navigate(feature.path) : openSignIn();
            }}
          >
            <feature.icon
              className="w-12 h-12 p-3 text-white rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${feature.bg.from}, ${feature.bg.to})`,
              }}
            />
            <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Features;
