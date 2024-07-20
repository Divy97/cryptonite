"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCoins, setLoading, setError } from "@/redux/features/coinSlice";
import useFetch from "@/utils/api";

const DataFetcher = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );

  useEffect(() => {
    if (loading) {
      dispatch(setLoading(true));
    } else if (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    } else if (data) {
      dispatch(setLoading(false));
      dispatch(setCoins(data));
    }
  }, [data, loading, error, dispatch]);

  return null;
};

export default DataFetcher;
