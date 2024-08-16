"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'];
const POURING_SOUND = '/pouring.mp3'; // Path to your pouring sound file

const JuiceJar = ({ fillLevel, label, data, index }:any) => {
  const [currentFillLevel, setCurrentFillLevel] = useState(0);
  const color = colors[index % colors.length];

  useEffect(() => {
    if (fillLevel > 0) {
      const duration = 12000; // Duration of pouring sound in milliseconds (12 seconds)
      const intervalDuration = 120; // Interval for smoothness
      const steps = 100 / (duration / intervalDuration); // Number of steps to fill the jar

      let currentLevel = 0;

      // Play pouring sound
      const audio = new Audio(POURING_SOUND);
      audio.play();

      const interval = setInterval(() => {
        if (currentLevel >= fillLevel) {
          clearInterval(interval);
          audio.pause(); // Stop the audio when filling is complete
        } else {
          currentLevel += steps;
          setCurrentFillLevel(Math.min(currentLevel, fillLevel));
        }
      }, intervalDuration);

      return () => {
        clearInterval(interval);
        audio.pause(); // Clean up the audio on unmount
      };
    } else {
      setCurrentFillLevel(0); // Reset fill level if fillLevel is 0
    }
  }, [fillLevel]);

  return (
    <div className="relative flex items-end justify-center w-32 h-32">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" className="w-full h-full">
        {/* Cylinder Body */}
        <path
          d="
            M10,30
            A40,10 0 0,0 90,30
            A40,10 0 0,0 10,30
            L10,120
            A40,10 0 0,0 90,120
            L90,30
          "
          fill={color} // Background color of the jar
          stroke="#666"
          strokeWidth="2"
        />
        
        {/* Liquid Fill Animation */}
        <motion.path
          d={`
            M10,30
            A40,10 0 0,0 90,30
            A40,10 0 0,0 10,30
            L10,${120 - (90 * currentFillLevel) / 100}
            A40,10 0 0,0 90,${120 - (90 * currentFillLevel) / 100}
            L90,30
          `}
          fill={color}
          initial={{ height: 0, fill: "#ddd" }}
          animate={{ height: `${currentFillLevel}%` }}
          transition={{ duration: 12 }} // Matches the duration of pouring sound
        />
        
        {/* Label and Data */}
        {currentFillLevel >= 100 && (
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="white">
            {data}
          </text>
        )}
      </svg>
    </div>
  );
};

export default JuiceJar;
