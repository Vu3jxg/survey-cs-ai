import SurveyQuestions from "./surveyquestions";
import { RecordType } from '../types/Record';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import AnimAvatar from "./animavatar";

interface HighSurveyProps {
    willReadScreen: boolean;
}

export default function HighSurvey ({willReadScreen}: HighSurveyProps) {
    const location = useLocation();
    // Extract record from location state
    const record = location.state as RecordType | undefined;
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    
    return (
        <div>
            <div className="flex flex-row w-full items-center justify-center min-h-screen dark:bg-black dark:text-white">
                <SurveyQuestions db_name="high" record={record} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex}/>
            </div>
            <div className="rounded-lg border-4 border-transparent bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 p-1">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                    <AnimAvatar
                             willReadScreen={willReadScreen}
                        lang={record?.lang}
                        currentQuestionIndex={currentQuestionIndex}
                        schoolLevel={"high"}
                    />
                </div>
            </div>
        </div>
    )
}