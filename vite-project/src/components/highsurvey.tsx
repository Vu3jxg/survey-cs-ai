import SurveyQuestions from "./surveyquestions";
import AnimAvatar from './animavatar';
import { RecordType } from '../types/Record';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import Header from "./header";

interface HighSurveyProps {
    willReadScreen: boolean;
    setWillReadScreen: (value: boolean) => void;
}

export default function HighSurvey({ willReadScreen }: HighSurveyProps) {
    const location = useLocation();

    // Extract record from location state
    const record = location.state as RecordType | undefined;

    // State for current question index
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    // Theme management logic
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

    // Reference for controlling the video
    const videoRef = useRef<HTMLVideoElement | null>(null);


    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-lg z-50">
        <Header
        //   willReadScreen={willReadScreen}
        //  setWillReadScreen={setWillReadScreen}
         isLightMode={isLightMode}
          setLightMode={toggleLightMode} // Pass toggle function for light mode
        //   className="fixed top-0 left-0 w-full z-50" // Fixing header at the top
            />
        </header>
  <div className='flex flex-col w-full items-center justify-center mt-14 min-h-screen dark:bg-gray-800 dark:text-white'>

      {/* Add top margin to prevent content overlap with the fixed header */}
      <div className='mt-0'>
          {/* Video and Survey Questions side by side */}
          <div className='flex justify-center items-start gap-8'>
              {/* Video Section */}
              <div className='rounded-lg border-4 border-transparent bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 p-1 shadow-lg'>
                  <AnimAvatar
                      willReadScreen={willReadScreen}
                      lang={record?.lang}
                      currentQuestionIndex={currentQuestionIndex}
                      schoolLevel={"high"}
                      videoRef={videoRef} // Pass videoRef for control
                  />
              </div>

              {/* Survey Questions Section */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto mb-8">
    <SurveyQuestions
        db_name="high"
        record={record}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
    />
    {/* <p className="text-purple-500 text-sm font-semibold mt-4">
        Each survey question will have either a single choice or multiple choices. Please read the question carefully and select the appropriate option(s).
    </p> */}
</div>
          </div>
      </div>
  </div>
</>
    );
}
