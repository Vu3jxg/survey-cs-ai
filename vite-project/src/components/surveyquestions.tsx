import { useState } from 'react';
import data from '../data/Questions.json';
import { RecordType } from '../types/Record';
import { QuestionsInterface } from '../types/Data'; //I deeply apologize for not using the i18 library
import { useLocation, useNavigate } from 'react-router-dom';

const SurveyQuestions = () => {

  const location = useLocation();
  const { state } = location;
  const navigateToFinish = useNavigate();

  // Access the `class_name` property from the state
  const record = state as RecordType;

  // Determine the correct set of questions based on `class_name`
  let questionsData: QuestionsInterface[] = [];

  if (record.class_name <= 5) {
    questionsData = data.questions_elementary;
  } else if (record.class_name <= 8) {
    questionsData = data.questions_middle;
  } else {
    questionsData = data.questions_high;
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentQuestion = questionsData[currentQuestionIndex];
  
  const handleNext = () => {
    if(selectedAnswer) {
      // Dynamically set the property in the record based on currentQuestionIndex
      const questionKey = `q${currentQuestionIndex + 1}` as keyof RecordType;

      // Create a new record object with the updated answer
      const updatedRecord = { ...record, [questionKey]: selectedAnswer };

      // Update record in the state or send it back to the server if needed
      // For example, send updatedRecord to a server
      // axios.post('http://server-endpoint', updatedRecord)
      //   .then(response => console.log('Record updated:', response.data))
      //   .catch(error => console.error('Error updating record:', error));

      if(currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
      else {
        navigateToFinish('/finish');
      }
    }
  };

  const handlePrev = () => {
    if(currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      //fetch value from db, setSelectedAnswer to that value.
    }
    else {
      alert('Can\'t go back!')
    }
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  }

  const renderQuestion = () => {
    if(record.lang === "English") return currentQuestion.eng;
    else if(record.lang === "Hindi") return currentQuestion.hin;
    else return currentQuestion.kan;
  };

  return (
      <div className='bg-black text-white p-32 rounded-lg shadow-lg z-10 dark:bg-white dark:text-black'>
        <h2 className='text-2xl mb-4'>{renderQuestion()}</h2>

        <div className='flex flex-row gap-4 mb-4'>
        {questionsData[currentQuestionIndex]?.options.map((option, index) => (
            <button
              key={index}
              className={`p-2 border rounded ${selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className='flex items-center justify-center mt-16'>
          <button onClick={handlePrev} className='p-2 text-white rounded bg-orange-400'
            disabled={currentQuestionIndex === 0}
            > Prev
          </button>
          
          {(currentQuestionIndex === questionsData.length - 1)? 
            <button
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleNext}
            > Submit
            </button> :
            <button onClick={handleNext} className={`p-2 ml-4 text-white rounded ${selectedAnswer ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'}`}
              disabled={!selectedAnswer} //disables next button until answer is selected
            > Next
            </button>
          }
        </div>
      </div>
  );
};

export default SurveyQuestions;