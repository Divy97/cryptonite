"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCoinNames } from "@/redux/features/coinNamesSlice";
import { toggleDarkMode } from "@/redux/features/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const coinNames = useSelector((state) => state.coinNames.items);
  const allCoins = useSelector((state) => state.coins.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (allCoins.length > 0) {
      dispatch(setCoinNames(allCoins));
    }
  }, [allCoins, dispatch]);

  useEffect(() => {
    if (searchTerm.length > 0 && coinNames.length > 0) {
      const filteredCoins = coinNames.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredCoins);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, coinNames]);

  const handleSearchClick = (coinName) => {
    router.push(`/explore/${coinName.toLowerCase()}`);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } shadow-lg z-50 sm:px-8 sticky top-0`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-semibold cursor-pointer">
            <Link href="/">Cryptonite</Link>
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="relative hover:text-blue-500">
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
          </Link>
          <Link href="/explore" className="relative hover:text-blue-500">
            Explore
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
          </Link>
          <Link href="/" className="relative hover:text-blue-500">
            Contact
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={handleToggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className={`border-2 rounded-full py-2 px-4 w-full md:w-auto ${
                darkMode
                  ? "bg-gray-800 text-gray-100 border-gray-700"
                  : "bg-white text-gray-600 border-gray-300"
              } focus:outline-none focus:shadow-md transition`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-2 right-4 md:top-4 md:right-4 cursor-pointer" />
            {suggestions.length > 0 && (
              <div
                className={`absolute top-12 left-0 ${
                  darkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                } shadow-lg rounded-lg z-10 w-full`}
              >
                <ul>
                  {suggestions.map((coin) => (
                    <li
                      key={coin.id}
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => handleSearchClick(coin.name)}
                    >
                      {coin.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <FaUserCircle className="text-2xl" />
          <button onClick={handleToggleDarkMode} className="focus:outline-none">
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className={`border-2 rounded-full py-2 px-4 w-full ${
                darkMode
                  ? "bg-gray-800 text-gray-100 border-gray-700"
                  : "bg-white text-gray-600 border-gray-300"
              } focus:outline-none focus:shadow-md transition`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="cursor-pointer" />
          </div>
          {suggestions.length > 0 && (
            <div
              className={`bg-white text-gray-900 shadow-lg rounded-lg z-10 w-full ${
                darkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            >
              <ul>
                {suggestions.map((coin) => (
                  <li
                    key={coin.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSearchClick(coin.name)}
                  >
                    {coin.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link href="/" className="block hover:text-blue-500">
            Home
          </Link>
          <Link href="/explore" className="block hover:text-blue-500">
            Explore
          </Link>
          <Link href="/" className="block hover:text-blue-500">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
