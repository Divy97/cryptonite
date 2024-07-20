"use client";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchList } from "@/redux/features/watchListSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const WatchList = ({ coins }) => {
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.watchList.items);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COIN",
    drop: (item) => dispatch(addToWatchList(item.coin)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`${isOver ? "border-2 border-dashed border-green-500" : ""}  `}
    >
      <div>
        <h2
          className={`text-2xl font-semibold leading-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          WatchList
        </h2>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="h-[410px] overflow-y-auto inline-block min-w-full shadow-md rounded-lg scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          <table className="min-w-full leading-normal">
            <thead className="sticky top-0">
              <tr>
                <th
                  className={`px-3 py-3 border-b-2 ${
                    darkMode
                      ? "border-gray-700 bg-gray-900 text-gray-300"
                      : "border-gray-200 bg-gray-100 text-gray-700"
                  } text-left text-xs font-semibold uppercase tracking-wider`}
                >
                  Name
                </th>
                <th
                  className={`px-3 py-3 border-b-2 ${
                    darkMode
                      ? "border-gray-700 bg-gray-900 text-gray-300"
                      : "border-gray-200 bg-gray-100 text-gray-700"
                  } text-left text-xs font-semibold uppercase tracking-wider`}
                >
                  Current Price
                </th>
                <th
                  className={`px-3 py-3 border-b-2 ${
                    darkMode
                      ? "border-gray-700 bg-gray-900 text-gray-300"
                      : "border-gray-200 bg-gray-100 text-gray-700"
                  } text-left text-xs font-semibold uppercase tracking-wider`}
                >
                  Price Change in 24h
                </th>
              </tr>
            </thead>
            <tbody>
              {watchList.map((coin) => (
                <tr key={coin.id} className="cursor-pointer">
                  <td
                    className={`px-3 py-5 border-b ${
                      darkMode
                        ? "border-gray-700 bg-gray-800 text-gray-300"
                        : "border-gray-200 bg-white text-gray-900"
                    } text-sm`}
                  >
                    <div className="flex">
                      <div className="ml-3 mt-2">
                        <p className="font-semibold whitespace-no-wrap text-center">
                          {coin.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`px-3 py-5 border-b ${
                      darkMode
                        ? "border-gray-700 bg-gray-800 text-gray-300"
                        : "border-gray-200 bg-white text-gray-900"
                    } text-sm`}
                  >
                    <p className="whitespace-no-wrap">
                      $ {coin.current_price?.toLocaleString()}
                    </p>
                  </td>
                  <td className="flex justify-center px-3 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
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
                          className="absolute inset-0 bg-red-100 opacity-75 rounded-full dark:bg-red-100"
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WatchList;
