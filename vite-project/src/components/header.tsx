import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import Toggle from "./toggle";


interface HeaderProps {
  willReadScreen: boolean;
  setWillReadScreen: (value: boolean) => void;
  isLightMode: boolean;
  setLightMode: () => void;
}

export default function Header({ willReadScreen, setWillReadScreen, isLightMode, setLightMode}: HeaderProps){
  return (
    <header className="flex items-center justify-between p-4">
        <div className='text-xl font-semibold'>
            Placeholder
        </div>
        <div className='flex items-center space-x-6'>
            <FaVolumeMute className="text-2xl" />
            <Toggle willReadScreen={willReadScreen} setWillReadScreen={setWillReadScreen}/>
            <FaVolumeUp className="text-2xl"/>
            <button onClick={setLightMode}>
              {isLightMode? <FaRegMoon className="text-2xl"/>: <FaRegSun className="text-2xl"/>}
            </button>
            <FaBars className="text-2xl"/>
        </div>
    </header>
  );
};