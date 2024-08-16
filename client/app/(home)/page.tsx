import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8 bg-blue-500 text-white text-center">
          <h1 className="text-4xl font-bold">Welcome to the Ultimate Form Submitter!</h1>
          <p className="mt-2 text-xl">The only form submitter you'll ever need!</p>
        </div>

        <div className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside mb-8 text-lg">
              <li className="mb-2">🚀 Super Fast Form Submission (Not really, but it sounds cool!)</li>
              <li className="mb-2">🔒 Secure (We pretend to be secure, but don't store anything!)</li>
              <li className="mb-2">🎉 Amazing Features (Well, we have buttons at least!)</li>
              <li className="mb-2">😜 Totally Not DYSFUNCTIONAL (Or is it?)</li>
            </ul>

            <p className="text-xl mb-4">Ready to experience the best form submission ever? Click below!</p>
            <a
              href="/form"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Submit Form Now!
            </a>
          </div>
        </div>

        <div className="bg-gray-200 p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Did You Know?</h3>
          <p className="text-lg">We once processed 100 forms in an hour... on a good day. 😅</p>
          <p className="mt-2 text-lg">Our server? It’s just a cat meme on a Raspberry Pi.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
