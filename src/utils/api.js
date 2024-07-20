"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const cache = new Map();

const useFetch = (url, cacheDuration = 120000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = cache.get(url);

      if (cachedData && Date.now() - cachedData.timestamp < cacheDuration) {
        console.log("from cache");
        setData(cachedData.data);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(url);
        const result = response.data;

        cache.set(url, {
          data: result,
          timestamp: Date.now(),
        });

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
