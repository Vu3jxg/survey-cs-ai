import SurveyQuestions from "./surveyquestions";
import AnimAvatar from './animavatar';
import { RecordType } from '../types/Record';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import Header from "./header";

interface ElemSurveyProps {
    willReadScreen: boolean;
    setWillReadScreen: (value: boolean) => void;
}

export default function ElementarySurvey({ willReadScreen, setWillReadScreen }: ElemSurveyProps) {
    const location = useLocation();

    // Extract record from location state
    const record = location.state as RecordType | undefined;

    // State for current question index
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    // Theme management logic (moved inside the component)
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
            <Header
                willReadScreen={willReadScreen}
                setWillReadScreen={setWillReadScreen}
                isLightMode={isLightMode}
                setLightMode={toggleLightMode} // Pass toggle function for light mode
                className="fixed top-0 left-0 w-full z-50" // Fixing header at the top
            />
            <div className='flex flex-col w-full items-center justify-center min-h-screen dark:bg-black dark:text-purple-900'>

                {/* Add top margin to prevent content overlap with the fixed header */}
                <div className='flex flex-row w-full items-center justify-center mt-24'>
                    <div className="mr-8">
                        <SurveyQuestions
                            db_name="elementary"
                            record={record}
                            currentQuestionIndex={currentQuestionIndex}
                            setCurrentQuestionIndex={setCurrentQuestionIndex} />
                    </div>

                    <div className="relative p-1 rounded-lg">
                        {/* Gradient border using background-clip */}
                        <div className="rounded-lg border-4 border-transparent bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 p-1">
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                                <AnimAvatar
                                    willReadScreen={willReadScreen}
                                    lang={record?.lang}
                                    currentQuestionIndex={currentQuestionIndex}
                                    schoolLevel={"elementary"}
                                    videoRef={videoRef} // Pass videoRef for control
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
