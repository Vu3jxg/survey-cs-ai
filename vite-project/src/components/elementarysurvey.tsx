import SurveyQuestions from "./surveyquestions";

interface ElementarySurveyProps {
    willReadScreen: boolean;
}

export default function ElementarySurvey ({ willReadScreen }: ElementarySurveyProps) {
    return (
        <SurveyQuestions db_name="elementary" willReadScreen={willReadScreen}/>
    )
}