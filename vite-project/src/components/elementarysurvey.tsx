import SurveyQuestions from "./surveyquestions";
import AnimAvatar from './animavatar';
import { RecordType } from '../types/Record';
import { useLocation } from 'react-router-dom';
import { useState } from "react";

interface ElemSurveyProps {
    willReadScreen: boolean;
}

export default function ElementarySurvey ({ willReadScreen }: ElemSurveyProps) {
    const location = useLocation();
  
    // Extract record from location state
    const record = location.state as RecordType | undefined;
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    
    return (
        <div className='flex flex-row w-full items-center justify-center min-h-screen dark:bg-black dark:text-white'>
            <div>
            <SurveyQuestions db_name="elementary" record={record} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex}/>
            </div>
            <div className="pl-16">
            <AnimAvatar willReadScreen={willReadScreen} lang={record?.lang} currentQuestionIndex={currentQuestionIndex} />
            </div>
        </div>
    )
}