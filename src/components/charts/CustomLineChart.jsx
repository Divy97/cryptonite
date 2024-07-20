"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ data, xKey, yKey, height, formatYAxis }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <ResponsiveContainer
      width="100%"
      height={height}
      style={{
        background: darkMode ? "#1F2937" : "white", // Tailwind's gray-800 for dark mode
      }}
    >
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#374151" : "#ccc"}
        />{" "}
        {/* Tailwind's gray-700 for dark mode */}
        <XAxis dataKey={xKey} stroke={darkMode ? "#D1D5DB" : "#000"} />{" "}
        {/* Tailwind's gray-300 for dark mode */}
        <YAxis
          stroke={darkMode ? "#D1D5DB" : "#000"}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          contentStyle={{ backgroundColor: darkMode ? "#374151" : "white" }}
        />{" "}
        {/* Tailwind's gray-700 for dark mode */}
        <Line type="monotone" dataKey={yKey} stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
