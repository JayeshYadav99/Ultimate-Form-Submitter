"use client";
import axios from 'axios';
import FilledJar from './FilledJar'; 
import { useState, useEffect } from 'react';

const Box = ({ jars, isClosed,setShowDeliveryGif,setAddress ,address,showDeliveryGif,handleDeliveryStart,setSavedData}:any) => {
  const [method, setMethod] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [animationClass, setAnimationClass] = useState('');



  useEffect(() => {
    if (isClosed) {
      // Trigger packing animation when the box is closed
      setAnimationClass('pack-animation');
    }
  }, [isClosed]);

  const handleSubmit = async() => {
    setIsSubmitting(true);
    // setAnimationClass('delivery-animation'); // Start delivery animation
const formData = new FormData();
    // Simulate delivery process
    jars.forEach((jar:any, index:any) => {
      formData.append(`${jar.field}`, jar.data);
    });

    try {
      const response = await axios.post('/api', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Optional, axios sets this automatically
        },
      });

      if (response.status===200) {
        const data = await response.data;
        console.log(data);
        setSavedData(data.project);
        setDeliveryMessage(`Delivery Protocol: ${method}, Address: ${address}`);
        handleDeliveryStart();
        setShowDeliveryGif(true); // Show delivery GIF after message
      } else {
        const errorData = await response?.data;
        setDeliveryMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setDeliveryMessage('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
 // Simulate delivery time of 3 seconds

    // Here you can also send data to a server
    // fetch('/api/deliver', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ method, address }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setDeliveryMessage(`Delivery Protocol: ${method}, Address: ${address}`);
    //   setShowDeliveryGif(true);
    //   setIsSubmitting(false);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    //   setIsSubmitting(false);
    // });
  };

  return (
    <div className={`relative w-96 h-96 border border-gray-400 rounded-lg shadow-lg overflow-hidden ${animationClass}`}>
      {/* Box lid */}
      <div className={`absolute top-0 left-0 right-0 h-10 bg-gray-300 border-b-2 border-gray-400 rounded-t-lg ${isClosed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 z-10`}>
        <span className="block text-center py-2 font-semibold text-gray-700">Form Data Box</span>
      </div>

      {/* Jars inside the box */}
      <div className="absolute top-10 left-0 right-0 bottom-0 p-2 flex flex-wrap items-end justify-center overflow-auto z-20">
  {jars.map((jar: any, index: number) => (

<FilledJar
fillLevel={jar.fillLevel}
level={100}

label={jar.label}
data={jar.data}
index={index}
/>
    // <div key={index} className="w-20 h-32 flex items-end justify-center p-1">
    //   {/* Render jar */}
    //   <div className="w-full h-full flex items-end justify-center relative">
    //     <div
    //       className={`w-full h-full ${jar.color} transition-all duration-500 flex items-end justify-center`}
    //       style={{ height: `${jar.fillLevel}%`, borderRadius: '0 0 8px 8px' }}
    //     >
    //       {/* Ensure data is visible and positioned correctly */}
    //       <div className="flex items-center justify-center absolute bottom-0 w-full h-full p-1 text-center text-white">
    //         {jar.data}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  ))}
</div>


      {/* Conditional Background Image */}
      <div
        className={`absolute inset-0 w-full  bg-no-repeat transition-opacity duration-500 ${isClosed ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: "url('/download.jpg')",
          backgroundSize: 'cover'
        }}
      />


      {/* Box Packed Text Area */}
      {isClosed && !isSubmitting && !showDeliveryGif && (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-30">
    <div className="relative w-full h-full flex items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/box.jpg')", backgroundSize: "cover" }}>
      {/* Form Container */}
      <div className="relative bg-transparent p-16 rounded-lg shadow-lg w-full max-w-lg z-10">
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Box Packed</h3>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-semibold">Method:</label>
          <input
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="block w-full p-3  bg-transparent placeholder-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter method (e.g., HTTP)"
          />
        </div>
        <div className="mb-24">
          <label className="block mb-2 text-gray-700 font-semibold mb-4">Server Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full p-3  bg-transparent placeholder-black   rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter server address"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}


      {/* Delivery Message */}
      {deliveryMessage && !showDeliveryGif && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-600 bg-opacity-70 z-30">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full text-center">
            <h3 className="text-lg text-black font-semibold mb-2">Delivery Status</h3>
            <p>{deliveryMessage}</p>
          </div>
        </div>
      )}

 
    </div>
  );
};

export default Box;
