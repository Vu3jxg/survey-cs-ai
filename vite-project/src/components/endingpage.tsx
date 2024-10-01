import React from 'react';
import background from '../assets/logos/Circle-pattern-on-purple-abstract-background.-scaled.jpg'; 
import bgCharacter from '../assets/logos/BG_character.png';  // Import the background image and character

export default function ThankYouPage() {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}  // Corrected the background image path
        >
            <h1 className="text-center text-4xl font-bold text-white mb-8">
                Thank you for your response.
            </h1>

            {/* Thumbs-up character PNG */}
            <img 
                src={bgCharacter}  // Corrected the character image path
                alt="Character giving thumbs-up"
                className="w-80 h-80"  // Adjust the size of the character
            />
        </div>
    );
}
