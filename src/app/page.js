"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import simulatePriceUpdates from "@/utils/priceSimulator";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CoinsTable from "@/components/table/CoinsTable";
import WatchListTable from "@/components/table/WatchList";
import Ticker from "@/components/Ticker";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import PublicCompaniesHoldings from "@/components/PublicHoldings";

const Home = () => {
  const coins = useSelector((state) => state.coins.items);
  const loading = useSelector((state) => state.coins.loading);
  const error = useSelector((state) => state.coins.error);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    simulatePriceUpdates();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const marketCapInfo = coins.slice(0, 10).map((data) => ({
    currency: data.id,
    marketCap: data.market_cap,
  }));

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1e12) return `${(tickItem / 1e12).toFixed(1)}T`;
    if (tickItem >= 1e9) return `${(tickItem / 1e9).toFixed(1)}B`;
    if (tickItem >= 1e6) return `${(tickItem / 1e6).toFixed(1)}M`;
    if (tickItem >= 1e3) return `${(tickItem / 1e3).toFixed(1)}K`;
    return tickItem;
  };

  return (
    <div
      className={`h-auto p-4 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">
              <Ticker />
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Price Ticker (Update in 1 min)
            </p>
          </div>
          <button
            className={`px-4 py-2 shadow rounded-lg ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
            }`}
          >
            Portfolio
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className={`shadow p-6 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="h-[100%] rounded-lg">
              <div>
                <h2 className="text-2xl font-semibold leading-tight mb-2">
                  Market Caps
                </h2>
                <CustomLineChart
                  data={marketCapInfo}
                  xKey="currency"
                  yKey="marketCap"
                  height={300}
                  formatYAxis={formatYAxis}
                />
              </div>
            </div>
          </div>

          <div
            className={`shadow rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <PublicCompaniesHoldings formatYAxis={formatYAxis} />
          </div>
        </div>

        <div className={`mt-6 flex flex-col lg:flex-row gap-6`}>
          <CoinsTable coins={coins} />

          <div
            className={`rounded-lg  shadow p-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <WatchListTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
