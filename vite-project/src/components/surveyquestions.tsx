import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/Questions.json';
import { QuestionsInterface } from '../types/Data';
import { RecordType } from '../types/Record';
import axios from 'axios';

interface SurveyQuestionsProps {
  db_name: string;
  record: RecordType | undefined;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SurveyQuestions = ({ db_name, record, currentQuestionIndex, setCurrentQuestionIndex }: SurveyQuestionsProps) => {
  
  const navigateToFinish = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  //to store the user's choices for the survey questions. 
  const [responses, setResponses] = useState<Record<string, string>>({});

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
      setQuestionsData(questions); //set QuestionsData which is an array of type QuestionsInterface (Basically the structure of Questions.json) depending on class_name)
      setSelectedAnswer(responses[`q${currentQuestionIndex + 1}`] || null); // Initialize selectedAnswer for the first question
    } else {
      // Handle the case where record is not available
      console.error('Record is not available.');
      setQuestionsData([]);
    }

    // Update selectedAnswer when currentQuestionIndex or responses change
    const currentQuestionKey = `q${currentQuestionIndex + 1}`;
    setSelectedAnswer(responses[currentQuestionKey] || null);
  }, [currentQuestionIndex, record, responses]);

  const currentQuestion = questionsData[currentQuestionIndex] || { eng: '', hin: '', kan: '', options: [], multiselect: 'No' };

  const handleNext = () => {
    if (selectedAnswer) {
      const questionKey = `q${currentQuestionIndex + 1}`;

      //store selectedAnswer in responses array every time handleNext is called and an answer is selected
      setResponses(prevResponses => ({
        ...prevResponses,
        [questionKey]: selectedAnswer
      }));

      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(index => index + 1); //increment index
      } else {
        // runs after user clicks submit, i.e. when currentQuestionIndex = questionsData.length - 1
        const updatedRecord = { ...record, ...responses, [`q${currentQuestionIndex + 1}`]: selectedAnswer };
        axios.put(`http://127.0.0.1:8000/${db_name}/${record?.id}`, updatedRecord)
          .then(res => {
            console.log('PUT request success', res.data);
            navigateToFinish('/finish'); // navigating to the finish page
          })
          .catch(error => {
            console.error('There was an error with the PUT request!', error);
          });
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      // Save the current answer to responses before moving to the previous question
      if (selectedAnswer) {
        const questionKey = `q${currentQuestionIndex + 1}`;
        setResponses(prevResponses => ({
          ...prevResponses,
          [questionKey]: selectedAnswer
        }));
      }

      // Move to the previous question
      setCurrentQuestionIndex(prevIndex => {
        const newIndex = prevIndex - 1;
        const prevQuestionKey = `q${newIndex + 1}`;
        setSelectedAnswer(responses[prevQuestionKey] || null); // Set the answer for the previous question
        return newIndex;
      });
    } else {
      alert('Can\'t go back!');
    }
  };

  const handleAnswerSelect = (index: number) => {
    if(questionsData[currentQuestionIndex].multiselect === 'No')
      setSelectedAnswer(String.fromCharCode(index + 65)); //Converts index to ascii (0 -> 'A', 1 -> 'B', etc)
    else {
      //check if answer is already in selectedAnswer, remove if already present
      setSelectedAnswer(prevSelection => {
        if(prevSelection == null)
          return String.fromCharCode(index + 65)
        else {
          if(selectedAnswer?.includes(String.fromCharCode(index + 65)))
            return prevSelection.replace(', '+String.fromCharCode(index + 65), '') // removes the option from selectedAnswer
          else
            return prevSelection + ', ' + String.fromCharCode(index + 65)
        }
      })
    }
  };

  const renderQuestion = () => {
    if (record?.lang === "English") return currentQuestion.eng;
    else if (record?.lang === "Hindi") return currentQuestion.hin;
    else return currentQuestion.kan;
  };

  //set options language
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

  return (
    <div>
      <h2 className='text-2xl mb-4 font-semibold'>{renderQuestion()}</h2>
  
      {/* Options section with a grid layout */}
      <div className='grid grid-cols-2 gap-4 mb-4'>
        {questionsData[currentQuestionIndex]?.multiselect.toLowerCase() === 'no'
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
        }
      </div>
  
      <div className='flex items-center justify-center mt-8'>
        <button onClick={handlePrev} className='p-2 text-white rounded bg-orange-400'
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
            className={`p-2 ml-4 text-white rounded ${selectedAnswer ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'}`}
            disabled={selectedAnswer == null} // disables next button until an answer is selected
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
  
};

export default SurveyQuestions;