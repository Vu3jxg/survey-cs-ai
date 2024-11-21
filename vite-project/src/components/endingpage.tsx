import { useEffect, useState } from 'react';
import background from '../assets/logos/Circle-pattern-on-purple-abstract-background.-scaled.jpg'; 
import bgCharacter from '../assets/logos/BG_character.png';  // Import the background image and character
import Header from './header';  // Import the header component

interface endPageProps {
    willReadScreen: boolean;
    setWillReadScreen: (value: boolean) => void;
}

export default function ThankYouPage({ willReadScreen, setWillReadScreen }: endPageProps) {

    const [isLightMode, setLightMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'light' : true; // Default to light mode if not set
    });

    useEffect(() => {
        if (isLightMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLightMode]);

    const toggleLightMode = () => {
        setLightMode(prevMode => !prevMode);
    };

    return (
        <>
        <div
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-normal bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}  // Corrected the background image path
        >
            <Header
                willReadScreen={willReadScreen}
                setWillReadScreen={setWillReadScreen}
                isLightMode={isLightMode}
                setLightMode={toggleLightMode} // Pass toggle function for light mode
                className="fixed top-0 left-0 w-full z-50 bg-opacity-75 bg-gray-900" // Fixing header at the top with background blend
            />
            <div className="mt-20 flex flex-col items-center">
                <h1 className="text-center text-4xl font-bold text-white mb-8">
                    Thank you for your response.
                </h1>

                {/* Thumbs-up character PNG */}
                <img 
                    src={bgCharacter}  // Corrected the character image path
                    alt="Character giving thumbs-up"
                    className="w-90 h-90"  // Adjust the size of the character
                />
            </div>
        </div>
        </>
    );
}
