"use client";
import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`flex items-center justify-center h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-200"
      }`}
    >
      <div className="flex flex-col items-center">
        <svg
          className={`animate-spin h-12 w-12 mb-4 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <p
          className={`text-lg ${darkMode ? "text-gray-100" : "text-gray-800"}`}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
