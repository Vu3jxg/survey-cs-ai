import { Link } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute, FaRegSun, FaRegMoon, FaBars } from "react-icons/fa";
import Toggle from "./toggle";
import whiteLogo from "../assets/logos/NITK_white.png"; // White logo for dark mode
import blackLogo from "../assets/logos/NITK_black.png"; // Black logo for light mode

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
            alt="Logo" 
            className="w-12 h-12 cursor-pointer" 
          />
        </Link>

        {/* Text container with link to App.tsx */}
        <div className="flex flex-col">
          <div className="text-2xl font-semibold text-purple-500">
            Cyber Security Research Laboratory
          </div>
          <Link to="/" className="text-2xl font-semibold hover:underline cursor-pointer">
            National Institute of Technology Karnataka
          </Link>
        </div>
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center space-x-6">
        <FaVolumeMute className={`text-2xl ${isLightMode ? '' : 'text-red-500'}`} />
        <Toggle willReadScreen={willReadScreen} setWillReadScreen={setWillReadScreen} />
        <FaVolumeUp className={`text-2xl ${isLightMode ? '' : 'text-red-500'}`} />
        <button 
          onClick={setLightMode} 
          className={`p-2 rounded-md ${isLightMode ? 'hover:bg-blue-600 text-black' : 'hover:bg-green-600 text-red-500'}`}
        >
          {isLightMode ? <FaRegMoon className="text-2xl" /> : <FaRegSun className="text-2xl" />}
        </button>
        <a href="https://www.nitk.ac.in/" target="_blank" rel="noopener noreferrer">
          <FaBars className={`text-2xl rounded-md ${isLightMode ? 'hover:bg-blue-600' : 'hover:bg-green-600'}`} />
        </a>
      </div>
    </header>
  );
}
