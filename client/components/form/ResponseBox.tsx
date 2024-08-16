import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const ResponseBox = ({ jars, onClose ,savedData}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBox = () => {
    setIsOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60">
      {/* Confetti Animation */}
      {isOpen && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Clickable Gift Image */}
      {!isOpen && (
        <div className="relative cursor-pointer flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
          <img
            src="/chronopost-delivery.gif" // Replace with the path to your gift image
            alt="Gift"
            className="w-64 h-64 object-cover mb-4 rounded-lg shadow-md"
            onClick={handleOpenBox}
          />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Open the Box!</h2>
            <p className="text-lg text-gray-600">Click the gift box to reveal your data and enjoy a little surprise!</p>
          </div>
        </div>
      )}

      {/* Response Box */}
      {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
    <div className="relative max-w-4xl max-h-4xl w-full h-auto p-6 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Box Content */}
      <motion.div
        className="relative w-full h-full bg-gray-100 border-t border-gray-300 rounded-lg shadow-md overflow-auto"
        initial={{ opacity: 0, translateY: '100%' }}
        animate={{ opacity: isOpen ? 1 : 0, translateY: isOpen ? 0 : '100%' }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">Your Data in Database saved in N seconds </h1>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words bg-gray-200 p-4 rounded-lg border border-gray-300">
            {JSON.stringify(savedData, null, 4)}
          </pre>
        </div>
      </motion.div>
    </div>
  </div>
)}

    </div>
  );
};

export default ResponseBox;
