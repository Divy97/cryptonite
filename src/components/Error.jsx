"use client";
import React from "react";
import { useSelector } from "react-redux";

const Error = ({ error }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`shadow-md rounded-lg p-6 text-center ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-800"
        }`}
      >
        <svg
          className={`h-12 w-12 mb-4 mx-auto ${
            darkMode ? "text-red-500" : "text-red-600"
          }`}
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
        <p className="text-lg mb-4">{error}</p>
      </div>
    </div>
  );
};

export default Error;
