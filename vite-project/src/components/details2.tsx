import { useState, useRef } from "react";
import DetailsEntry from "./detailsentry";
import videoSrcKannada from '../assets/intro/WhatsApp Video 2024-09-27 at 22.01.18_6328378a.mp4';
import videoSrcHindi from '../assets/intro/WhatsApp Video 2024-09-27 at 22.01.18_6328378a.mp4';
import videoSrcEnglish from '../assets/intro/WhatsApp Video 2024-09-27 at 22.01.18_6328378a.mp4';

interface DetailsProps {
    lang: {
        isSet: boolean;
        name: string;
    };
    setLang: (value: { isSet: boolean; name?: string }) => void;
}

export default function Details({ lang, setLang }: DetailsProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasVideoEnded, setVideoEnded] = useState(false);

    // Define video source based on the selected language
    const getVideoSrc = (language: string) => {
        switch (language) {
            case 'Kannada':
                return videoSrcKannada;
            case 'Hindi':
                return videoSrcHindi;
            case 'English':
                return videoSrcEnglish;
            default:
                return videoSrcKannada; // default to Kannada video
        }
    };

    const handleSelect = (selectedOption: string) => {
        setLang({
            isSet: true,
            name: selectedOption,
        });
        setVideoEnded(false); // Reset video state when a new language is selected
    };

    const handleVideoEnd = () => {
        setVideoEnded(true);
    };

    return (
        <div className="relative p-6 max-w-screen-md mx-auto bg-gray-200 dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-700 bg-opacity-95">

            <center>
                <p className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    Choose your language
                </p>
            </center>
            <div className="flex flex-row px-12 py-3 items-center justify-between">
                <button
                    className="px-12 py-4 text-white bg-blue-400 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
                    onClick={() => handleSelect('Kannada')}
                >
                    Kannada
                </button>
                <button
                    className="px-12 py-4 text-white bg-green-400 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500"
                    onClick={() => handleSelect('Hindi')}
                >
                    Hindi
                </button>
                <button
                    className="px-12 py-4 text-white bg-red-400 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500"
                    onClick={() => handleSelect('English')}
                >
                    English
                </button>
            </div>

            {/* Show video if a language is selected but the video hasn't ended */}
            {lang.isSet && !hasVideoEnded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-gray-800 opacity-50" />
                    
                    {/* Modal Content */}
                    <div className="bg-black text-white p-8 rounded-lg shadow-lg z-10 dark:bg-white dark:text-black">
                        <video
                            ref={videoRef}
                            width="600"
                            height="600"
                            autoPlay
                            onEnded={handleVideoEnd}
                            onError={(e) => console.error('Error loading video:', e)}
                        >
                            <source src={getVideoSrc(lang.name)} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

            {/* Show DetailsEntry component after the video ends */}
            {hasVideoEnded && (
                <div className="mt-8 text-center">
                    <DetailsEntry
    selectedlang={lang.name ?? ''}
    willReadScreen={false}
    setWillReadScreen={(value: boolean) => {
        console.log("Will read screen:", value);
        
    }}
/>

                </div>
            )}
        </div>
    );
}
