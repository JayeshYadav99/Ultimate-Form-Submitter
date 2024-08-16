"use client";
import { useState, useEffect } from 'react';
import Jar from './Jar';

const Card = ({ label, initialData, initialFillLevel, onUpdateData, index }:any) => {
  const [data, setData] = useState(initialData);
  const [fillLevel, setFillLevel] = useState(initialFillLevel);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handlePourData = () => {
    // Play pouring sound
    const sound = new Audio('/pouring.mp3');
    sound.play();

    // Set fill level to 100% and notify parent
    setFillLevel(100);
    onUpdateData(label, data);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-4 border border-gray-200">
      <Jar fillLevel={fillLevel} label={label} data={data} index={index} />
      <div className="w-full flex flex-col items-center space-y-4">
        <input
          type="text"
          value={data}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`Enter ${label} data`}
        />
        <button
          type="button"
          onClick={handlePourData}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Fill data
        </button>
      </div>
   
    </div>
  );
};

export default Card;
