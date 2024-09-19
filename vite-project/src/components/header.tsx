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
      className={`flex items-center justify-between p-4 border-b border-gray-300 ${
        isLightMode ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-200'
      }`} // Dark background and text color for dark mode
    >
      {/* Left Section: Logo and Name */}
      <div className="flex items-center space-x-4">
        {/* Conditionally render the logo based on theme */}
        <img 
          src={isLightMode ? blackLogo : whiteLogo}  
          alt="Logo" 
          className="w-12 h-12" 
        />
        <div className="text-2xl font-semibold">National Institute of Technology Karnataka</div> {/* Logo Name */}
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center space-x-6">
        <FaVolumeMute className={`text-2xl ${isLightMode ? '' : 'text-red-500'}`} />
        <Toggle willReadScreen={willReadScreen} setWillReadScreen={setWillReadScreen} />
        <FaVolumeUp className={`text-2xl ${isLightMode ? '' : 'text-red-500'}`} />
        <button 
          onClick={setLightMode} 
          className={`p-2 rounded-md ${
            isLightMode ? ' hover:bg-blue-600 text-black' : 'hover:bg-green-600 text-white'
          }`}
        >
          {isLightMode ? <FaRegMoon className="text-2xl" /> : <FaRegSun className="text-2xl" />}
        </button>
        <FaBars className={`text-2xl ${isLightMode ? '' : 'text-red-500'}`} />
      </div>
    </header>
  );
}
