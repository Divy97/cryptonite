"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, cacheDuration = 120000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(url);
      const currentTime = Date.now();

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (currentTime - parsedData.timestamp < cacheDuration) {
          console.log("From cache", parsedData.data);
          setData(parsedData.data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get(url);
        const result = response.data;
        localStorage.setItem(
          url,
          JSON.stringify({ data: result, timestamp: currentTime })
        );
        setData(result);
      } catch (err) {
        setError(err.message); // Store only the error message
        console.error("Error fetching data:", err.message); // Log the error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, cacheDuration]);

  return { data, loading, error };
};

export default useFetch;
