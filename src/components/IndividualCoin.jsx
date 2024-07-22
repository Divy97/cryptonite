"use client";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import useFetch from "@/utils/api";
import FluctuationChart from "@/components/charts/CustomLineChart";
import { FaPlusSquare } from "react-icons/fa";
import Loading from "./common/Loading";
import Error from "./common/Error";

const IndividualCoin = ({ coinId }) => {
  const [coinInfo, setCoinInfo] = useState(null);
  const coinDetails = useSelector((state) =>
    state.coins.items.find((coin) => coin.id === coinId)
  );
  const darkMode = useSelector((state) => state.theme.darkMode);

  const historicalDataUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=365`;

  const { data: historicalData, loading, error } = useFetch(historicalDataUrl);

  useEffect(() => {
    if (coinDetails) {
      setCoinInfo(coinDetails);
    }
  }, [coinDetails]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const formattedData =
    historicalData?.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      price,
    })) || [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div
      className={`container mx-auto px-2 sm:px-8 ${
        darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
      }`}
    >
      {coinInfo && (
        <div className="py-8">
          <div>
            <h2
              className={`text-2xl font-semibold leading-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {coinId.charAt(0).toUpperCase() + coinId.slice(1)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div
              className={`col-span-2 p-4 shadow-md rounded-lg ${
                darkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-white text-gray-900"
              }`}
            >
              <div className="flex justify-between align-middle">
                <h3 className="text-2xl font-semibold mb-2">Current Price</h3>
                <FaPlusSquare
                  size={25}
                  className={darkMode ? "text-white" : "text-black"}
                  cursor="pointer"
                />
              </div>
              <div className="text-3xl font-bold">
                $ {coinInfo?.current_price?.toLocaleString() || "-"}
              </div>
              <div className="text-sm text-gray-500">
                Fluctuation in last one year
              </div>
              <div
                className={`h-35 mt-4 rounded ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <FluctuationChart
                  data={formattedData}
                  xKey="date"
                  yKey="price"
                  height={250}
                  formatYAxis="undefined"
                />
              </div>
            </div>
            <div
              className={`h-[400px] flex justify-between flex-col p-4 shadow-md rounded-lg ${
                darkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-white text-gray-900"
              }`}
            >
              <h3 className="text-2xl font-semibold">Fundamentals</h3>
              <div className="flex flex-col gap-2 mb-10">
                <div className="flex justify-between">
                  <span className="text-md text-gray-400">Market Cap</span>
                  <span className="font-bold">
                    {coinInfo?.market_cap?.toLocaleString() || "-"}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-md text-gray-400">
                    Fully Diluted Valuation
                  </span>
                  <span className="font-bold">
                    {coinInfo?.fully_diluted_valuation?.toLocaleString() || "-"}
                  </span>
                </div>
                <hr />

                <div className="flex justify-between">
                  <span className="text-md text-gray-400">
                    Circulating Supply
                  </span>
                  <span className="font-bold">
                    {coinInfo?.circulating_supply?.toLocaleString() || "-"}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-md text-gray-400">Total Supply</span>
                  <span className="font-bold">
                    {coinInfo?.total_supply?.toLocaleString() || "-"}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-md text-gray-400">Max Supply</span>
                  <span className="font-bold">
                    {coinInfo?.max_supply?.toLocaleString() || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-4">
            <h3
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Most Valuable
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 shadow-md rounded-lg ${
                  darkMode
                    ? "bg-yellow-900 text-yellow-100"
                    : "bg-yellow-100 text-gray-900"
                }`}
              >
                <h4 className="text-lg font-semibold mb-2">Ethereum</h4>
                <div className="text-2xl font-bold">$4,234.34</div>
                <div className="text-sm text-gray-500">20.32% Today</div>
              </div>
              <div
                className={`p-4 shadow-md rounded-lg ${
                  darkMode
                    ? "bg-pink-900 text-pink-100"
                    : "bg-pink-100 text-gray-900"
                }`}
              >
                <h4 className="text-lg font-semibold mb-2">Bitcoin</h4>
                <div className="text-2xl font-bold">$234.34</div>
                <div className="text-sm text-gray-500">6.34% Today</div>
              </div>
              <div
                className={`p-4 shadow-md rounded-lg ${
                  darkMode
                    ? "bg-purple-900 text-purple-100"
                    : "bg-purple-100 text-gray-900"
                }`}
              >
                <h4 className="text-lg font-semibold mb-2">Solana</h4>
                <div className="text-2xl font-bold">$1,575.35</div>
                <div className="text-sm text-gray-500">0.45% Today</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualCoin;
