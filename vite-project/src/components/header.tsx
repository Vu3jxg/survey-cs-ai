import React from "react";
import { Link } from "react-router-dom";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import whiteLogo from "../assets/logos/NITK_white.png"; // White logo for dark mode
import blackLogo from "../assets/logos/NITK_black.png"; // Black logo for light mode
import FlyoutNav from "./FlyOutNav";
import FlyoutContent from "./FlyOutContent";

interface HeaderProps {
  willReadScreen: boolean;
  setWillReadScreen: (value: boolean) => void;
  isLightMode: boolean;
  setLightMode: () => void;
}

export default function Header({ willReadScreen, setWillReadScreen, isLightMode, setLightMode }: HeaderProps) {
  return (
    <header
      className={`top-0 w-full flex items-center justify-between p-4 border-b border-gray-300 z-50 ${
        isLightMode ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-200'
      }`}
    >
      {/* Left Section: Logo and Name */}
      <div className="flex items-center space-x-4">
        {/* Logo with link to App.tsx */}
        <Link to="/">
          <img
            src={isLightMode ? blackLogo : whiteLogo}
            alt="NITK Logo"
            className="h-10 mr-3"
          />
        </Link>
        <div className="flex flex-col">
          <div className="text-2xl font-semibold text-purple-500">
            Cyber Security Research Laboratory
          </div>
          <Link to="/" className="text-2xl font-semibold hover:underline cursor-pointer">
            National Institute of Technology Karnataka
          </Link>
        </div>
      </div>
      {/* Right Section: Light Mode Toggle and FlyoutNav */}
      <div className="flex items-center space-x-6">
        <button 
          onClick={setLightMode} 
          className={`p-2 rounded-md ${isLightMode ? 'hover:bg-blue-600 text-black' : 'hover:bg-green-600 text-red-500'}`}
        >
          {isLightMode ? <FaRegMoon className="text-2xl" /> : <FaRegSun className="text-2xl" />}
        </button>
        <FlyoutNav FlyoutContent={FlyoutContent} />
      </div>
    </header>
  );
}
