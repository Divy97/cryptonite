import React from "react";

const Error = ({ error }) => {
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="bg-gray-700 shadow-md rounded-lg p-6 text-center">
        <svg
          className="h-12 w-12 text-red-600 mb-4 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M12 17a1 1 0 100-2 1 1 0 000 2zm0 6a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>
        <p className="text-lg text-gray-800 mb-4">{error}</p>
      </div>
    </div>
  );
};

export default Error;
