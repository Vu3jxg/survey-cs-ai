import SurveyQuestions from "./surveyquestions";
import { SurveyProps } from "./elementarysurvey";

export default function HighSurvey ({willReadScreen}: SurveyProps) {
    return (
        <SurveyQuestions db_name="high" willReadScreen={willReadScreen}/>
    )
}