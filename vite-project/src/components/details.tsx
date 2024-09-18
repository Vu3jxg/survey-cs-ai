import { useState, useRef } from "react";
import DetailsEntry from "./detailsentry";
import videoSrc from '../assets/elementary/hin/animq1.mp4';

interface DetailsProps {
    lang: {
        isSet: boolean,
        name: string,
    };
    setLang: (value: {isSet: boolean; name?: string}) => void;
}

export default function Details({lang, setLang}: DetailsProps) { 

    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasVideoEnded, setVideoEnded] = useState(false);
    const handleSelect = (selectedOption: string) => {
        setLang({
            isSet: true,
            name: selectedOption,
        });
      };

    const handleVideoEnd = () => {
        setVideoEnded(true);
        setLang({isSet: false})
    }

    return (
        <div className="p-6 max-w-screen-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-700">
                <p className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    Choose your language
                </p>
                <div className="flex flex-row px-12 py-3 items-center justify-between">
                    <button 
                        className="px-12 py-4 text-white bg-blue-400 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
                        onClick={() => handleSelect('Kannada')}>Kannada</button>
                    <button 
                        className="px-12 py-4 text-white bg-green-400 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500"
                        onClick={() => handleSelect('Hindi')}>Hindi</button>
                    <button 
                        className="px-12 py-4 text-white bg-red-400 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500"
                        onClick={() => handleSelect('English')}>English</button>
                </div>
                {lang.isSet && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <div className="fixed inset-0 bg-gray-800 opacity-50" />
                    
                        {/* Modal Content */}
                        <div className='bg-black text-white p-32 rounded-lg shadow-lg z-10 dark:bg-white dark:text-black'>
                        <video ref={videoRef} width='350' height='350' autoPlay onEnded={handleVideoEnd} onError={(e) => console.error('Error loading video:', e)}>
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        </div>
                    </div>
                )}
                {hasVideoEnded && (
                    <div className="mt-8 text-center">
                    <DetailsEntry selectedlang={lang.name} />
                    </div>
                )}
        </div>
    );
}