"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const cache = new Map();
const pendingRequests = new Map();

const useFetch = (url, cacheDuration = 120000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchInitiated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const fetchData = async () => {
      const now = Date.now();
      const cachedData = cache.get(url);
      const storedData = JSON.parse(localStorage.getItem(url));

      if (cachedData && now - cachedData.timestamp < cacheDuration) {
        console.log("Fetching from in-memory cache");
        setData(cachedData.data);
        setLoading(false);
        return;
      }

      if (storedData && now - storedData.timestamp < cacheDuration) {
        console.log("Fetching from localStorage");
        setData(storedData.data);
        setLoading(false);
        return;
      } else {
        localStorage.removeItem(url);
      }

      if (pendingRequests.has(url)) {
        console.log("Pending request exists. Waiting...");
        await pendingRequests.get(url);
        const refreshedCachedData = cache.get(url);
        if (
          refreshedCachedData &&
          now - refreshedCachedData.timestamp < cacheDuration
        ) {
          setData(refreshedCachedData.data);
        }
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching from API");
        const requestPromise = axios.get(url);
        pendingRequests.set(url, requestPromise);

        const response = await requestPromise;
        const result = response.data;

        const newCacheData = { data: result, timestamp: now };
        cache.set(url, newCacheData);
        localStorage.setItem(url, JSON.stringify(newCacheData));

        setData(result);
      } catch (err) {
        let errorMessage = "An unknown error occurred.";
        if (err.response) {
          if (err.response.status === 429) {
            errorMessage =
              "Too many requests. Please wait a minute and try again.";
          } else if (err.response.status === 403) {
            errorMessage = "Access forbidden due to CORS policy.";
          }
        } else if (err.request) {
          errorMessage = "Network error. Please check your connection.";
        }
        setError(errorMessage);
      } finally {
        pendingRequests.delete(url);
        setLoading(false);
      }
    };

    if (!fetchInitiated.current) {
      fetchInitiated.current = true;
      fetchData();
    }
  }, [url, cacheDuration]);

  return { data, loading, error };
};

export default useFetch;
