"use client";
import React from "react";
import CustomLineChart from "@/components/charts/CustomLineChart";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import useFetch from "@/utils/api";
import { useSelector } from "react-redux";

const PublicCompaniesHoldings = ({ formatYAxis }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data, loading, error } = useFetch(
    "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin"
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const chartData = data.companies.map((company) => ({
    name: company.name,
    holdings: company.total_holdings,
    currentValue: company.total_current_value_usd,
  }));

  return (
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className="text-2xl font-semibold leading-tight mb-2">
        Public Companies Holdings (Bitcoin)
      </h2>
      <CustomLineChart
        data={chartData}
        xKey="name"
        yKey="currentValue"
        height={300}
        formatYAxis={formatYAxis}
      />
    </div>
  );
};

export default PublicCompaniesHoldings;
