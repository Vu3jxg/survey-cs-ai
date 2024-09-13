import SurveyQuestions from "./surveyquestions";

export interface SurveyProps {
    willReadScreen: boolean;
}

export default function ElementarySurvey ({ willReadScreen }: SurveyProps) {
    return (
        <SurveyQuestions db_name="elementary" willReadScreen={willReadScreen}/>
    )
}