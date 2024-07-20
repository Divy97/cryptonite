"use client";
import React from "react";
import { useSelector } from "react-redux";
import CoinsTable from "@/components/table/CoinsTable";
import WatchListTable from "@/components/table/WatchList";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";

const Explore = () => {
  const coins = useSelector((state) => state.coins.items);
  const loading = useSelector((state) => state.coins.loading);
  const error = useSelector((state) => state.coins.error);
  const darkMode = useSelector((state) => state.theme.darkMode);

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
