import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/Questions.json';
import { QuestionsInterface } from '../types/Data';
import { RecordType } from '../types/Record';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';  // Import FaStar from react-icons

interface SurveyQuestionsProps {
  db_name: string;
  record: RecordType | undefined;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SurveyQuestions = ({ db_name, record, currentQuestionIndex, setCurrentQuestionIndex }: SurveyQuestionsProps) => {

  const navigateToFinish = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  // To store the user's choices for the survey questions.
  const [responses, setResponses] = useState<Record<string, string | number>>({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // Star rating state
  const [hoveredStar, setHoveredStar] = useState<number | null>(null); // For hover effect on stars

  // Determine questionsData based on record.class_name
  const [questionsData, setQuestionsData] = useState<QuestionsInterface[]>([]);

  useEffect(() => {
    if (record) {
      let questions: QuestionsInterface[] = [];
      if (record.class_name <= 5) {
        questions = data.questions_elementary;
      } else if (record.class_name <= 8) {
        questions = data.questions_middle;
      } else {
        questions = data.questions_high;
      }
      setQuestionsData(questions); // Set QuestionsData
      setSelectedAnswer(responses[`q${currentQuestionIndex + 1}`] || null); // Initialize selectedAnswer
    } else {
      console.error('Record is not available.');
      setQuestionsData([]);
    }

    // Update selectedAnswer when currentQuestionIndex or responses change
    const currentQuestionKey = `q${currentQuestionIndex + 1}`;
    setSelectedAnswer(responses[currentQuestionKey] || null);
  }, [currentQuestionIndex, record, responses]);

  const currentQuestion = questionsData[currentQuestionIndex] || { eng: '', hin: '', kan: '', options: [], multiselect: 'No' };

  const handleNext = () => {
    if (selectedAnswer || selectedRating !== null) {
      const questionKey = `q${currentQuestionIndex + 1}`;

      setResponses(prevResponses => ({
        ...prevResponses,
        [questionKey]: selectedAnswer,
        rating: selectedRating // Store the selected rating as well
      }));

      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(index => index + 1); // Increment index
      } else {
        // Submit the final answers and rating
        const updatedRecord = { ...record, ...responses, rating: selectedRating };
        axios.put(`http://127.0.0.1:8000/${db_name}/${record?.id}`, updatedRecord)
          .then(res => {
            console.log('PUT request success', res.data);
            navigateToFinish('/finish'); // Navigate to the finish page
          })
          .catch(error => {
            console.error('There was an error with the PUT request!', error);
          });
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      if (selectedAnswer) {
        const questionKey = `q${currentQuestionIndex + 1}`;
        setResponses(prevResponses => ({
          ...prevResponses,
          [questionKey]: selectedAnswer
        }));
      }

      setCurrentQuestionIndex(prevIndex => {
        const newIndex = prevIndex - 1;
        const prevQuestionKey = `q${newIndex + 1}`;
        setSelectedAnswer(responses[prevQuestionKey] || null);
        return newIndex;
      });
    } else {
      alert('Can\'t go back!');
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (questionsData[currentQuestionIndex].multiselect === 'No')
      setSelectedAnswer(String.fromCharCode(index + 65)); // Converts index to ASCII (0 -> 'A', 1 -> 'B', etc)
    else {
      setSelectedAnswer(prevSelection => {
        if (prevSelection == null)
          return String.fromCharCode(index + 65)
        else {
          if (selectedAnswer?.includes(String.fromCharCode(index + 65)))
            return prevSelection.replace(', ' + String.fromCharCode(index + 65), '') // Remove option from selectedAnswer
          else
            return prevSelection + ', ' + String.fromCharCode(index + 65)
        }
      });
    }
  };

  const renderQuestion = () => {
    if (record?.lang === "English") return currentQuestion.eng;
    else if (record?.lang === "Hindi") return currentQuestion.hin;
    else return currentQuestion.kan;
  };

  const options: string[] = (() => {
    const currentQuestion = questionsData[currentQuestionIndex];
    if (currentQuestion) {
      switch (record?.lang) {
        case "English":
          return currentQuestion.eng_options || [];
        case "Hindi":
          return currentQuestion.hin_options || [];
        default:
          return currentQuestion.kan_options || [];
      }
    }
    return [];
  })();

  // Star rating system for the last page
  const renderStarRating = () => {
    return (
      <div className="star-rating mb-4">
        <h3 className="text-lg font-semibold mb-2">Rate your experience:</h3>
        <div className='flex space-x-1'>
        {[1, 2, 3, 4, 5].map(star => ( 
          <FaStar
            key={star}
            size={48} // Make stars bigger
            className={`cursor-pointer ${hoveredStar && star <= hoveredStar ? 'text-yellow-400' : star <= (selectedRating || 0) ? 'text-yellow-500' : 'text-gray-400'}`}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => setSelectedRating(star)}
          />
        ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-start mt-0"> {/* Ensure the container spans the full height */}
    <h2 className="text-2xl mt-4 mb-6 font-semibold text-center">{renderQuestion()}</h2> {/* Added margin-top to move it to the top */}
  
    {/* Options section with a grid layout */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      {currentQuestionIndex === questionsData.length - 1 ? null : (
        questionsData[currentQuestionIndex]?.multiselect.toLowerCase() === 'no'
          ? options.map((option, index) => (
              <button
                key={index}
                className={`p-2 border rounded shadow-md ${selectedAnswer?.includes(String.fromCharCode(index + 65)) 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-purple-600 text-white border-white hover:bg-purple-900 shadow-lg hover:shadow-xl'}`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </button>
            ))
          : options.map((option, index) => (
              <button
                key={index}
                className={`p-2 border rounded shadow-md ${selectedAnswer?.includes(String.fromCharCode(index + 65)) 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-purple-600 text-white border-white hover:bg-purple-900 shadow-lg hover:shadow-xl'}`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </button>
            ))
      )}
    </div>
  
    {/* Render star rating on the last question page */}
    {currentQuestionIndex === questionsData.length - 1 && renderStarRating()}
  
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={handlePrev}
        className="p-2 text-white rounded bg-orange-400"
        disabled={currentQuestionIndex === 0}
      >
        Prev
      </button>
  
      {currentQuestionIndex === questionsData.length - 1 ? (
        <button
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleNext}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={handleNext}
          className={`p-2 ml-4 text-white rounded ${selectedAnswer || selectedRating !== null ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'}`}
          disabled={selectedAnswer == null && selectedRating == null} // Disables next button until an answer is selected or rating is provided
        >
          Next
        </button>
      )}
    </div>
  </div>
  
  );
};

export default SurveyQuestions;
