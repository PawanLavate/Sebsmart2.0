import React from "react";
import { motion } from "motion/react";

const FeedbackVision = () => {
  const feedbackData = [
    {
      quote: "This idea has the potential to support apple farmers in tackling pest issues with technology.",
      author: "Professor (College Mentor)",
    },
    {
      quote: "If implemented, such a system could really help us in estimating yield and planning better.",
      author: "Farmer (Interview Feedback)",
    },
    {
      quote: "Innovative approach — combining AI with phenological models is a promising research direction.",
      author: "Research Scholar",
    },
  ];

  const visionPoints = [
    "Assist farmers with early pest detection and control",
    "Enable better yield forecasting through machine learning",
    "Leverage GDD-based phenological models for apple growth insights",
  ];

  return (
    <motion.div
     initial={{ opacity: 0, y: 30}}
    whileInView={{ opacity: 1, y: 0}}
    transition={{ duration: 0.6}}
    viewport={{ once : true}}
     className="px-4 sm:px-20 xl:px-32 my-24">
      {/* Title */}
      <div className="text-center mb-12">
        <motion.h2
         initial={{ opacity:0, y: 20}}
      whileInView={{ opacity: 1, y: 0}}
      transition={{ duration: 0.5}}
      viewport={{ once: true }}
         className="text-slate-700 text-[36px] font-semibold">
          Feedback & Vision
        </motion.h2>
        <motion.p
         initial={{ opacity: 0, y: 30}}
     whileInView={{ opacity: 1, y: 0}}
     transition={{ duration: 0.5 , delay: 0.2 }}
     viewport={{ once: true }}
         className="text-gray-500 max-w-2xl mx-auto">
          Early thoughts from mentors and potential users, and our vision for
          SebSmart in supporting apple farming.
        </motion.p>
      </div>

      {/* Feedback Section */}
      <div className="grid gap-6 md:grid-cols-3 mb-16">
        {feedbackData.map((item, index) => (
          <motion.div
           initial={{ opacity: 0, y: 20}}
                whileInView={{ opacity: 1, y:0}}
                transition={{ duration: 0.4, delay: index*0.3}}
                viewport={{ once: true }}
            key={index}
            className="p-6 rounded-lg shadow-lg border border-gray-100 bg-white"
          >
            <p className="text-gray-600 italic">“{item.quote}”</p>
            <p className="mt-4 text-sm font-medium text-gray-800">
              — {item.author}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Vision Section */}
      <motion.div
       initial={{ opacity: 0, y: 40}}
    whileInView={{ opacity: 1, y: 0}}
    transition={{ duration: 0.7, delay:0.4}}
    viewport={{ once : true}}
       className="bg-green-50 p-8 rounded-xl border border-green-100 shadow-sm">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          Our Vision
        </h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          {visionPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackVision;
