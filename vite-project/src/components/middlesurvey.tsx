import SurveyQuestions from "./surveyquestions";
import { SurveyProps } from "./elementarysurvey";

export default function MiddleSurvey ({willReadScreen}: SurveyProps) {
    return (
        <SurveyQuestions db_name="middle" willReadScreen={willReadScreen}/>
    )
}