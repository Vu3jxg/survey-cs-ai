import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function Ending() {
    const [rating, setRating] = useState(0);  // Store the integer rating
    const [hover, setHover] = useState(null); // Store hover state for stars

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl font-bold text-white mb-8">
                Thank you for answering the survey.
            </h1>

            {/* Star Rating Section */}
            <div className="flex items-center mb-4">
                {[...Array(5)].map((star, index) => {
                    const starValue = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={starValue}
                                className="hidden"
                                onClick={() => setRating(starValue)}
                            />
                            <FaStar
                                className={`cursor-pointer transition-colors duration-200 ${
                                    starValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
                                }`}
                                size={50}
                                onMouseEnter={() => setHover(starValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
            </div>

            {/* Display the selected rating as an integer */}
            <div className="text-2xl text-white mt-2">
                Your rating: <span className="font-bold">{rating}</span>
            </div>

            {/* Optional: Add submit or finish button */}
            <button
                className="mt-6 px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-200"
                onClick={() => alert(`Thank you! Your rating is ${rating}.`)}
            >
                Submit Rating
            </button>
        </div>
    );
}
