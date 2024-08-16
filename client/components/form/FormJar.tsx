"use client"
import { useState, useEffect } from 'react';
import JuiceJar from './Jar'; // Adjust the path based on your project structure
import Box from './Box'; // Adjust the path based on your project structure
import { motion } from 'framer-motion';
import { FaUserAlt, FaServer } from 'react-icons/fa';
import ResponseBox from './ResponseBox'; // Adjust the path as needed
import { toast } from "react-hot-toast";
//
import { useToast } from "@/components/ui/use-toast"

const initialJars = [
  { label: 'Project Name', data: '', fillLevel: 0,field:'projectName', color: 'bg-blue-600', id: 1 },
  { label: 'Technology Stack', data: '', fillLevel: 0,field:'technologyStack', color: 'bg-gray-600', id: 2 },
  { label: 'Development Stage', data: '', fillLevel: 0,field:'developmentStage', color: 'bg-green-600', id: 3 },
  { label: 'Team Size', data: '', fillLevel: 0, field:'teamSize',color: 'bg-teal-600', id: 4 },
  // { label: 'Project Goals', data: '', fillLevel: 0, color: 'bg-orange-600', id: 5 },
  // { label: 'Challenges Faced', data: '', fillLevel: 0, color: 'bg-red-600', id: 6 },
  // { label: 'Version Control System', data: '', fillLevel: 0, color: 'bg-purple-600', id: 7 },
  // { label: 'Deployment Environment', data: '', fillLevel: 0, color: 'bg-indigo-600', id: 8 },
  // { label: 'Code Quality Tools', data: '', fillLevel: 0, color: 'bg-yellow-600', id: 9 },
  // { label: 'Documentation', data: '', fillLevel: 0, color: 'bg-pink-600', id: 10 },
];



const FormData = () => {
  const { toast } = useToast()
  const [availableJars, setAvailableJars] = useState(initialJars);
  const [selectedJars, setSelectedJars] = useState<{ label: string, data: string, fillLevel: number, color: string, id: number }[]>([]);
  const [selectedJarId, setSelectedJarId] = useState<number | null>(null);
  const [isBoxClosed, setIsBoxClosed] = useState(false);
  const [showDeliveryGif, setShowDeliveryGif] = useState(false);
  const [address, setAddress] = useState('');
  const [startAnimation, setStartAnimation] = useState(false);
  const [showServerResponse, setShowServerResponse] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResponseBox, setShowResponseBox] = useState(false);
  const[savedData,setSavedData]=useState<any>(null);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newJars = [...availableJars];
    newJars[index].data = event.target.value;
    setAvailableJars(newJars);
  };

  const fillJar = (index: number) => {
    const newJars = [...availableJars];
    newJars[index].fillLevel = 100; // Set fill level to 100
    setAvailableJars(newJars);
  };

  const selectJar = (id: number) => {
    setSelectedJarId(id);
  };

  const addJarToBox = () => {
    const jarToAdd = availableJars.find(jar => jar.id === selectedJarId);
    if (jarToAdd && !selectedJars.find(jar => jar.id === selectedJarId)) {
console.log("jarToAdd",jarToAdd);
      setSelectedJars([...selectedJars, jarToAdd]);
      setAvailableJars(availableJars.filter(jar => jar.id !== selectedJarId));
      setSelectedJarId(null); // Clear selection after adding
    }
    toast(
      {
       
        title: `🎉 ${jarToAdd?.field} Appended`,
        description: `Field has been appended to the FormData.`,
      }
    )
  };

  const closeBox = () => {
    setIsBoxClosed(true);
  };

  const handleDeliveryStart = () => {
    setStartAnimation(true);
    setShowDeliveryGif(true);
  };
  const handleDeliveryComplete = () => {
    setShowDeliveryGif(false);
    setShowServerResponse(true);
  };

  const handleServerResponseComplete = () => {
    // Optional: Perform any action after the server response animation completes
    setShowServerResponse(false);
    setShowResponseBox(true);
  };



  useEffect(() => {
    if (availableJars.length === 0) {
      closeBox();
    }
  }, [availableJars]);

  const clientPosition = { left: '5%', top: '50%' };
  const serverPosition = { right: '5%', top: '50%' };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Available Jars */}
      {availableJars.length > 0 && (
        <div className="w-full  p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-100 mb-8">
          <h2 className="text-2xl font-bold mb-4">Available Fields</h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {availableJars.map((jar, index) => (
              <div
                key={jar.id}
                className={`flex flex-col items-center border ${jar.id === selectedJarId ? 'border-blue-500' : 'border-gray-300'} p-2 rounded-md`}
                onClick={() => selectJar(jar.id)}
              >
                <JuiceJar
                  fillLevel={jar.fillLevel}
                  label={jar.label}
                  data={jar.data}
                  index={index}
                />
                <input
                  type="text"
                  value={jar.data}
                  onChange={(e) => handleInputChange(index, e)}
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  placeholder={`Enter ${jar.label} `}
                />
                <button
                  type="button"
                  onClick={() => fillJar(index)}
                  className="px-6 py-2 bg-green-500 text-white rounded-md mt-2"
                >
                  Fill Data
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addJarToBox}
            disabled={selectedJarId === null}
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            Append Field to FormData
          </button>
        </div>
      )}

      {/* Delivery Animation */}
      {showDeliveryGif && (
        <>
           {/* Client Section */}
      <div className="absolute flex flex-col items-start" style={clientPosition}>
        <FaUserAlt className="w-16 h-16 text-blue-500 mb-2" />
        <h3 className="text-lg font-semibold">Client</h3>
      </div>

      {/* Server Section */}
      <div className="absolute flex flex-col items-center" style={serverPosition}>
        <FaServer className="w-16 h-16 text-green-500 mb-2" />
        <h3 className="text-lg font-semibold">Server</h3>
      </div>
          <motion.div
          initial={{ x: '-100%', y: 0 }}
          animate={{ x: '100%' }}
          transition={{ duration: 5, ease: 'easeInOut' }}
          className="absolute bg-transparent rounded-lg shadow-lg max-w-xs w-full text-center"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          onAnimationComplete={handleDeliveryComplete}
        >
          <h3 className="text-lg font-semibold mb-2">Delivering... to {address}</h3>
          <img
            src="/mail.gif"
            alt="Delivery Boy"
            className="w-32 h-32 object-cover mx-auto"
          />
        </motion.div></>
      
      )}
{showServerResponse && (
  <>
    <div className="absolute flex flex-col items-start" style={clientPosition}>
        <FaUserAlt className="w-16 h-16 text-blue-500 mb-2" />
        <h3 className="text-lg font-semibold">Client</h3>
      </div>

      {/* Server Section */}
      <div className="absolute flex flex-col items-center" style={serverPosition}>
        <FaServer className="w-16 h-16 text-green-500 mb-2" />
        <h3 className="text-lg font-semibold">Server</h3>
        </div>
        <motion.div
          initial={{ x: '350%', y: 0 }}
          animate={{ x: '-100%' }}
          exit={{ x: '-90%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute bg-transparent p-4 rounded-lg shadow-lg max-w-xs w-full text-center"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          onAnimationComplete={handleServerResponseComplete}
        >
          <h3 className="text-lg font-semibold mb-2">Server Response</h3>
          <img
            src="/love-you.gif"
            alt="Delivery Boy"
            className="w-32 h-32 object-cover mx-auto"
          />
          <p>Your request has been processed successfully.</p>
        </motion.div>
        </>
       
      )}
   
   {showResponseBox && (
        <ResponseBox
          jars={initialJars}
          savedData={savedData}
          onClose={() => setShowResponseBox(false)} // Hide ResponseBox after closing
        />
      )}

      {/* Box Component */}
      {!showDeliveryGif &&  !showServerResponse && !showResponseBox && (
        <Box
          jars={selectedJars}
          isClosed={isBoxClosed}
          setShowDeliveryGif={setShowDeliveryGif}
          setAddress={setAddress}
          address={address}
          handleDeliveryStart={handleDeliveryStart}
          setSavedData={setSavedData}
        />
      )}
    </div>
  );
};

export default FormData;
