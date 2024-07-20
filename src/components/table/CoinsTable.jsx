"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ITEMS_PER_PAGE = 20;

const CoinsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const coins = useSelector((state) => state.coins.items);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = coins.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(coins.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className={`h-auto p-4 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div>
        <h2
          className={`mb-2 text-2xl font-semibold leading-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Coins
        </h2>
      </div>
      <div
        className={`h-[450px] w-full overflow-y-auto overflow-x-auto min-w-full shadow-md rounded-lg ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <table className="min-w-full leading-normal">
          <thead
            className={`sticky top-0 ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <tr>
              {[
                "Name",
                "Current Price",
                "Market Cap",
                "High in 24h",
                "Low in 24h",
                "Price Change in 24h",
              ].map((header) => (
                <th
                  key={header}
                  className={`px-3 py-3 border-b-2 ${
                    darkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  } text-left text-xs font-semibold uppercase tracking-wider`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((coin) => (
              <DraggableCoinRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            darkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            darkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const DraggableCoinRow = ({ coin }) => {
  const router = useRouter();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COIN",
    item: { coin },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <tr
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`w-full cursor-pointer ${
        darkMode
          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
          : "bg-white text-gray-900 hover:bg-gray-100"
      }`}
      onClick={() => router.push(`/explore/${coin.name.toLowerCase()}`)}
    >
      <td className="px-3 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
        <div className="flex">
          <div className="flex-shrink-0 w-10 h-10">
            <Image
              width={100}
              height={100}
              className="w-full h-full rounded-full"
              src={coin?.image}
              alt={coin.name}
            />
          </div>
          <div className="ml-3 mt-2">
            <p className="font-semibold whitespace-no-wrap text-center">
              {coin.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
        <p className="whitespace-no-wrap">
          $ {coin.current_price?.toLocaleString()}
        </p>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
        <p className="whitespace-no-wrap">
          $ {coin.market_cap?.toLocaleString()}
        </p>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
        <p className="whitespace-no-wrap">$ {coin.high_24h}</p>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
        <p className="whitespace-no-wrap">$ {coin.low_24h}</p>
      </td>
      <td
        className={`flex justify-center px-3 py-5 border-b border-gray-200 dark:border-gray-700 ${
          darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
        } text-sm`}
      >
        {coin.price_change_24h > 0 ? (
          <span className="relative inline-block px-3 py-3 font-semibold leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-green-100 dark:bg-green-200 opacity-75 rounded-full"
            ></span>
            <span className="relative flex justify-center align-middle gap-1">
              <IoIosArrowUp
                className="text-green-600 dark:text-green-500"
                size={15}
              />
              <span className="text-green-600 dark:text-green-500">
                $ {coin.price_change_24h.toFixed(2)}
              </span>
            </span>
          </span>
        ) : (
          <span className="relative inline-block px-3 py-3 font-semibold leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-red-100 dark:bg-red-100 opacity-75 rounded-full"
            ></span>
            <span className="relative flex justify-center align-middle gap-1">
              <IoIosArrowDown
                className="text-red-600 dark:text-red-500"
                size={15}
              />
              <span className="text-red-600 dark:text-red-500">
                $ {coin.price_change_24h.toFixed(2)}
              </span>
            </span>
          </span>
        )}
      </td>
    </tr>
  );
};

export default CoinsTable;
