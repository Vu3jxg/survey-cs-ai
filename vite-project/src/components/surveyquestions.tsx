import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/Questions.json';
import { QuestionsInterface } from '../types/Data';
import { RecordType } from '../types/Record';
import axios from '../axiosconfig';
import { FaStar } from 'react-icons/fa';

interface SurveyQuestionsProps {
  db_name: string;
  record: RecordType | undefined;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SurveyQuestions = ({
  db_name,
  record,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: SurveyQuestionsProps) => {
  const navigateToFinish = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Ensure this is a string or null
  const [responses, setResponses] = useState<Record<string, string | null>>({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
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
      setQuestionsData(questions);
      setSelectedAnswer(responses[`q${currentQuestionIndex + 1}`] || null);
    } else {
      console.error('Record is not available.');
      setQuestionsData([]);
    }

    const currentQuestionKey = `q${currentQuestionIndex + 1}`;
    setSelectedAnswer(responses[currentQuestionKey] || null);
  }, [currentQuestionIndex, record, responses]);

  const currentQuestion = questionsData[currentQuestionIndex] || { eng: '', hin: '', kan: '', eng_options: [], hin_options: [], kan_options: [], multiselect: 'No' };

  const handleNext = () => {
    if (selectedAnswer || selectedRating !== null) {
      const questionKey = `q${currentQuestionIndex + 1}`;
      setResponses((prevResponses) => ({
        ...prevResponses,
        [questionKey]: selectedAnswer,
        rating: selectedRating,
      }));

      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex((index) => index + 1);
      } else {
        const updatedRecord = { ...record, ...responses, rating: selectedRating };
        axios
          .put(`/${db_name}/${record?.id}`, updatedRecord)
          .then((res) => {
            console.log('PUT request success', res.data);
            navigateToFinish('/finish');
          })
          .catch((error) => {
            console.error('There was an error with the PUT request!', error);
          });
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      const questionKey = `q${currentQuestionIndex + 1}`;
      setResponses((prevResponses) => ({
        ...prevResponses,
        [questionKey]: selectedAnswer,
      }));

      setCurrentQuestionIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        const prevQuestionKey = `q${newIndex + 1}`;
        setSelectedAnswer(responses[prevQuestionKey] || null);
        return newIndex;
      });
    } else {
      alert("Can't go back!");
    }
  };

  const handleAnswerSelect = (index: number) => {
    const option = String.fromCharCode(index + 65);
    if (currentQuestion.multiselect === 'No') {
      setSelectedAnswer(option);
    } else {
      setSelectedAnswer((prevSelection) => {
        const selection = (prevSelection || '') as string; // Ensure it's treated as a string
        return selection.includes(option)
          ? selection.replace(option, '').trim()
          : `${selection}, ${option}`;
      });
    }
  };

  const renderQuestion = () => {
    if (record?.lang === 'English') return currentQuestion.eng;
    else if (record?.lang === 'Hindi') return currentQuestion.hin;
    else return currentQuestion.kan;
  };

  const options: (string | number)[] = (() => {
    if (record?.lang === 'English') return currentQuestion.eng_options || [];
    if (record?.lang === 'Hindi') return currentQuestion.hin_options || [];
    return currentQuestion.kan_options || [];
  })();

  const renderStarRating = () => (
    <div className="star-rating mb-4">
      <h3 className="text-lg font-semibold mb-2">Rate your experience:</h3>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={48}
            className={`cursor-pointer ${
              hoveredStar && star <= hoveredStar
                ? 'text-yellow-400'
                : star <= (selectedRating || 0)
                ? 'text-yellow-500'
                : 'text-gray-400'
            }`}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => setSelectedRating(star)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-10 flex flex-col justify-start mt-0">
      <h2 className="text-2xl mt-4 mb-6 font-semibold text-center">{renderQuestion()}</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {currentQuestionIndex === questionsData.length - 1
          ? null
          : options.map((option, index) => (
              <button
                key={index}
                className={`p-2 border rounded shadow-md ${
                  selectedAnswer?.includes(String.fromCharCode(index + 65))
                    ? 'bg-blue-500 text-white'
                    : 'bg-purple-600 text-white border-white hover:bg-purple-900'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </button>
            ))}
      </div>

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
          <button className="ml-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleNext}>
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`p-2 ml-4 text-white rounded ${
              selectedAnswer || selectedRating !== null ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedAnswer && selectedRating === null}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SurveyQuestions;
