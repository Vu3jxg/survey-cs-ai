import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import videoSrcEnglish from '../assets/intro/WhatsApp Video 2024-09-27 at 22.01.18_6328378a.mp4';
import videoSrcHindi from '../assets/intro/Hindi_intro.mp4';
import videoSrcKannada from '../assets/intro/Kannada_intro.mp4';

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
    const navigate = useNavigate();

    const getVideoSrc = (language: string) => {
        switch (language) {
            case 'Kannada':
                return videoSrcKannada;
            case 'Hindi':
                return videoSrcHindi;
            case 'English':
                return videoSrcEnglish;
            default:
                return videoSrcEnglish; 
        }
    };

    const handleSelect = (selectedOption: string) => {
        setLang({
            isSet: true,
            name: selectedOption,
        });
        setVideoEnded(false); 
    };

    const handleVideoEnd = () => {
        setVideoEnded(true);
        navigate("/about"); 
    };

    return (
        <div className="relative w-full h-[30vh] max-w-[90vw] mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-700">

            <center>
                <p className="text-[2vw] font-bold mb-1 text-gray-800 dark:text-gray-200">
                    CHOOSE YOUR LANGUAGE
                </p>
            </center>

            <div className="flex flex-wrap gap-6 justify-center items-center px-4 py-6">
                <button
                    className="w-[10vw] h-[10vh] text-[vw] font-bold text-purple-600 bg-white border-4 border-purple-700 rounded-lg shadow-lg hover:bg-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500 dark:bg-purple-500 dark:hover:bg-purple-700 dark:focus:ring-purple-700 dark:text-white dark:border-purple-500"
                    onClick={() => handleSelect('Kannada')}
                >
                    ಕನ್ನಡ
                </button>
                <button
                    className="w-[10vw] h-[10vh] text-[vw] font-bold text-purple-600 bg-white border-4 border-purple-700 rounded-lg shadow-lg hover:bg-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500 dark:bg-purple-500 dark:hover:bg-purple-700 dark:focus:ring-purple-700 dark:text-white dark:border-purple-500"
                    onClick={() => handleSelect('Hindi')}
                >
                    हिंदी
                </button>
                <button
                    className="w-[10vw] h-[10vh] text-[vw] font-bold text-purple-600 bg-white border-4 border-purple-700 rounded-lg shadow-lg hover:bg-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500 dark:bg-purple-500 dark:hover:bg-purple-700 dark:focus:ring-purple-700 dark:text-white dark:border-purple-500"
                    onClick={() => handleSelect('English')}
                >
                    English
                </button>
            </div>

            {lang.isSet && !hasVideoEnded && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-800 opacity-50" />
                    <div className="bg-black text-white p-1 rounded-lg shadow-lg z-10 dark:bg-white dark:text-black">
                        <video
                            ref={videoRef}
                            className="w-[50vw] h-[50vh]"
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
        </div>
    );
}
