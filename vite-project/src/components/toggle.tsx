interface ToggleProps{
    willReadScreen: boolean;
    setWillReadScreen: (value: boolean) => void;
}

export default function Toggle({willReadScreen, setWillReadScreen}: ToggleProps) {
    return (
        <div className="flex items-center">
            <span onClick={() => setWillReadScreen(!willReadScreen)}
                className="relative inline-flex items-center cursor-pointer">
                <span className={`block w-11 h-6 rounded-full shadow-xl transform transition-all duration-600 ${
                willReadScreen? 'bg-blue-500': 'bg-gray-600'}`}></span>
                <span className={`absolute left-0.5 top-0.5 block w-5 h-5 bg-white rounded-full transform transition-all duration-600 ${
                  willReadScreen ? 'ml-5' : ''}`}></span>
            </span>
        </div>
    );
}