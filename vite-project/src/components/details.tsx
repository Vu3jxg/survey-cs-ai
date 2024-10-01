import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import videoSrcKannada from '../assets/intro/WhatsApp Video 2024-09-27 at 22.01.18_6328378a.mp4';
import videoSrcHindi from '../assets/intro/Hindi_intro.mp4';
import videoSrcEnglish from '../assets/intro/Kannada_intro.mp4';

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
    const navigate = useNavigate(); // Use navigate to redirect

    // Get the correct video source based on selected language
    const getVideoSrc = (language: string) => {
        switch (language) {
            case 'Kannada':
                return videoSrcKannada;
            case 'Hindi':
                return videoSrcHindi;
            case 'English':
                return videoSrcEnglish;
            default:
                return videoSrcEnglish; // Fallback to English
        }
    };

    const handleSelect = (selectedOption: string) => {
        setLang({
            isSet: true,
            name: selectedOption,
        });
        setVideoEnded(false); // Reset video ended state
    };

    const handleVideoEnd = () => {
        setVideoEnded(true);
        navigate("/about"); // Redirect to /about route when the video ends
    };

    return (
        <div className="p-6 max-w-screen-md mx-auto bg-white bg-opacity-100 dark:bg-gray-900 dark:bg-opacity-90 rounded-xl shadow-lg dark:shadow-gray-700">

            <center>
                <p className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    Choose your language
                </p>
            </center>
            <div className="flex flex-row px-12 py-3 items-center justify-between">
                <button
                    className="px-12 py-4 text-3xl text-purple-500 font-bold bg-white border-4 border-purple-700 rounded-lg shadow-neon-purple hover:bg-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:border-purple-600 dark:bg-purple-500 dark:hover:bg-purple-700 dark:focus:ring-purple-700 dark:shadow-neon-purple"
                    onClick={() => handleSelect('Kannada')}
                >
                    ಕನ್ನಡ
                </button>
                <button
                    className="px-12 py-4 text-3xl text-purple-500 font-bold bg-white border-4 border-purple-700 rounded-lg shadow-neon-purple hover:bg-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:border-purple-600 dark:bg-purple-500 dark:hover:bg-purple-700 dark:focus:ring-purple-700 dark:shadow-neon-purple"
                    onClick={() => handleSelect('Hindi')}
                >
                    हिंदी
                </button>
                <button
                    className="px-12 py-4 text-3xl text-purple-500 font-bold bg-white border-4 border-purple-700 rounded-lg shadow-neon-purple hover:bg-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:border-purple-600 dark:bg-purple-500 dark:hover:bg-purple-700 dark:focus:ring-purple-700 dark:shadow-neon-purple"
                    onClick={() => handleSelect('English')}
                >
                    English
                </button>
            </div>

            {/* Show video modal if a language is selected and video hasn't ended */}
            {lang.isSet && !hasVideoEnded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-gray-800 opacity-50" />
                    
                    {/* Modal Content */}
                    <div className="bg-black text-white p-32 rounded-lg shadow-lg z-10 dark:bg-white dark:text-black">
                        <video
                            ref={videoRef}
                            width="350"
                            height="350"
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
