import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { RecordType } from '../types/Record'; // Import RecordType from types

interface EndingProps {
    db_name: string;
    record: RecordType | undefined;  // Assuming RecordType is defined elsewhere in your types
}

export default function Ending({ db_name, record }: EndingProps) {
    const [rating, setRating] = useState<number | null>(null);  // Store the integer rating
    const [hover, setHover] = useState<number | null>(null); // Store hover state for stars

    const handleSubmit = () => {
        if (record) {
            // Create a new object with the updated rating if it is provided
            const updatedRecord = { ...record };
            if (rating !== null) {
                updatedRecord.rating = rating;
            }
    
            // Send PUT request to the API to update the rating
            axios.put(`http://127.0.0.1:8000/${db_name}/${record.id}/${rating}`, updatedRecord)
                .then(res => {
                    console.log('PUT request success', res.data);
                    alert(`Thank you! Your rating of ${rating} has been submitted.`);
                })
                .catch(error => {
                    console.error('There was an error updating the rating!', error);
                    alert('Failed to submit your rating. Please try again.');
                });
        } else {
            alert('Please select a rating before submitting.');
        }
    };

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
                                    starValue <= ((hover ?? rating) ?? 0) ? 'text-yellow-500' : 'text-gray-300'
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

            {/* Submit button to send the rating */}
            <button
                className={`mt-6 px-6 py-2 font-bold rounded-lg ${
                    (rating ?? 0) > 0 ? 'bg-red-500 text-white hover:bg-gray-200' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
                onClick={handleSubmit}
                disabled={rating === 0}
            >
                Submit 
            </button>
        </div>
    );
}