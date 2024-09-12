import SurveyQuestions from "./surveyquestions";

export default function MiddleSurvey () {
    return (
        <div className='bg-black text-white min-h-screen z-10 dark:bg-white dark:text-black'>
            <SurveyQuestions db_name="middle"/>
        </div>
    )
}