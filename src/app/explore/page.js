"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoinsTable from "@/components/table/CoinsTable";
import WatchListTable from "@/components/table/WatchList";
import useFetch from "@/utils/api";
import { setCoins } from "@/redux/features/coinSlice";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const Explore = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.items);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data: coinData,
    loading,
    error,
  } = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );

  useEffect(() => {
    if (coinData && coins.length === 0) {
      dispatch(setCoins(coinData));
    }
  }, [coinData, coins.length, dispatch]);

  return (
    <div
      className={`h-full w-full pt-5 container mx-auto px-2 sm:px-8 flex flex-wrap gap-4 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <div className="py-8 w-full md:w-[70%]">
        {loading && <Loading />}
        {error && <Error error={error} />}
        <CoinsTable coins={coins} />
      </div>
      <div className="py-8 w-full md:w-[27%]">
        <WatchListTable />
      </div>
    </div>
  );
};

export default Explore;
