"use client";
import { useEffect, useState } from 'react';

const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'];

const FilledJar = ({ fillLevel = 100, label, data, index }: any) => {
  const [currentFillLevel, setCurrentFillLevel] = useState(100); // Set default fillLevel to 100
  const color = colors[index % colors.length];

  useEffect(() => {
    setCurrentFillLevel(fillLevel);
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
          fill="#ddd" // Background color of the jar
          stroke="#666"
          strokeWidth="2"
        />
        
        {/* Liquid Fill */}
        {currentFillLevel > 0 && currentFillLevel < 100 && (
          <path
            d={`
              M10,30
              A40,10 0 0,0 90,30
              A40,10 0 0,0 10,30
              L10,${120 - (90 * currentFillLevel) / 100}
              A40,10 0 0,0 90,${120 - (90 * currentFillLevel) / 100}
              L90,30
            `}
            fill={color}
          />
        )}

        {/* Full Fill Special Case */}
        {currentFillLevel >= 100 && (
          <path
            d="
              M10,30
              A40,10 0 0,0 90,30
              A40,10 0 0,0 10,30
              L10,120
              A40,10 0 0,0 90,120
              L90,30
            "
            fill={color} // Fill the entire cylinder with color
          />
        )}
        
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

export default FilledJar;
