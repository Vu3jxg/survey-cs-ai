import SurveyQuestions from "./surveyquestions";
import { RecordType } from '../types/Record';
import { useLocation } from 'react-router-dom';
import { useState } from "react";

interface MiddleSurveyProps {
    willReadScreen: boolean;
}

export default function MiddleSurvey ({willReadScreen}: MiddleSurveyProps) {
    const location = useLocation();
    // Extract record from location state
    const record = location.state as RecordType | undefined;
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    
    return (
        <div>
            <div>
                <SurveyQuestions db_name="middle" record={record} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex}/>
            </div>
        </div>
    )
}