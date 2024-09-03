import { useState } from 'react';
import data from '../data/Questions.json';
import { QuestionsInterface } from '../types/Data'; //I deeply apologize for not using the i18 library
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

const Modal = ({ isOpen, onClose, lang }: ModalProps) => {

  const questionsData: QuestionsInterface[] = data.questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentQuestion = questionsData[currentQuestionIndex];

  const navigate = useNavigate();

  if (!isOpen) return null;
  
  const handleNext = () => {
    if(selectedAnswer) {
      if(currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
      else {
        onClose();
        navigate('/finish');
      }
    }
  }

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
    if(lang === "English") return currentQuestion.eng;
    else if(lang === "Hindi") return currentQuestion.hin;
    else return currentQuestion.kan;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-800 opacity-50" />
      
      {/* Modal Content */}
      <div className='bg-black text-white p-32 rounded-lg shadow-lg z-10 dark:bg-white dark:text-black'>
        <h2 className='text-2xl mb-4'>{renderQuestion()}</h2>

        <div className='flex flex-row gap-4 mb-4'>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`p-2 border rounded ${selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className='flex items-center justify-center'>
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
    </div>
  );
};

export default Modal;