// GoogleGeminiEffect.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from "../utils";

const transition = {
  duration: 0,
  ease: 'linear',
};

const GoogleGeminiEffect = ({ title, description, className }) => {
  const ref = useRef(null); // Reference to the scrollable container
  const { scrollYProgress } = useScroll({
    target: ref, // Track scroll within this container
    offset: ["start end", "end start"], // Start and end points of the animation
  });

  const pathLengths = [
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    useTransform(scrollYProgress, [0, 1], [0, 1]),
  ];

  return (
    <div
      className={cn(
        "relative w-full h-[500px] flex flex-col items-center bg-indigo-900 text-white",
        className
      )}
    >
      <div className="sticky top-0 w-full max-w-4xl mx-auto text-center py-6">
        <p className="text-2xl font-semibold">{title || 'Build with Aceternity UI'}</p>
        <p className="text-sm text-gray-300">{description || 'Scroll to see the magic happen!'}</p>
      </div>

      <div
        ref={ref}
        className="relative w-full h-[300px] overflow-hidden flex items-center justify-center"
      >
        <svg
          width="1440"
          height="300"
          viewBox="0 0 1440 300"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-full h-full"
        >
          {pathLengths.map((pathLength, index) => (
            <motion.path
              key={index}
              d="M0 150C100 150 200 200 300 150C400 100 500 200 600 150C700 100 800 200 900 150C1000 100 1100 200 1200 150C1300 100 1400 200 1500 150"
              stroke="#FFB7C5"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              style={{ pathLength }}
              transition={transition}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default GoogleGeminiEffect;
