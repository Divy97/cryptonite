"use client";
import React from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const CoinRow = ({ coin, ref }) => {
  return (
    <tr ref={ref}>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
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
            <p className="text-gray-950 font-semibold whitespace-no-wrap text-center">
              {coin.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          $ {coin.current_price?.toLocaleString()}
        </p>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          $ {coin.market_cap?.toLocaleString()}
        </p>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">$ {coin.high_24h}</p>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">$ {coin.low_24h}</p>
      </td>
      <td className="flex justify-center px-3 py-5 border-b border-gray-200 bg-white text-sm">
        {coin.price_change_24h > 0 ? (
          <span className="relative inline-block px-3 py-3 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative flex justify-center align-middle gap-1">
              <IoIosArrowUp color="green" size={15} />
              <span className="text-green-900">
                $ {coin.price_change_24h.toFixed(2)}
              </span>
            </span>
          </span>
        ) : (
          <span className="relative inline-block px-3 py-3 font-semibold text-red-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative flex justify-center align-middle gap-1">
              <IoIosArrowDown color="red" size={15} />
              <span className="text-red-900">
                $ {coin.price_change_24h.toFixed(2)}
              </span>
            </span>
          </span>
        )}
      </td>
    </tr>
  );
};

export default CoinRow;
