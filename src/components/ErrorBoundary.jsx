"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleError = (error) => {
      setHasError(true);
      setError(error);
    };

    window.addEventListener("error", (event) => handleError(event.error));
    window.addEventListener("unhandledrejection", (event) =>
      handleError(event.reason)
    );

    return () => {
      window.removeEventListener("error", (event) => handleError(event.error));
      window.removeEventListener("unhandledrejection", (event) =>
        handleError(event.reason)
      );
    };
  }, []);

  const handleRedirect = () => {
    window.location.href = "/";
  };

  if (hasError) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
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
          <p className="text-lg text-gray-100 mb-4">Something went wrong.</p>
          <p className="text-gray-400">{error && error.toString()}</p>
          <button
            onClick={handleRedirect}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
