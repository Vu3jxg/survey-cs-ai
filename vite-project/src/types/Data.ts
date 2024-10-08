import { RecordType } from "./Record";

export interface QuestionsInterface {
    eng: string;
    hin: string;
    kan: string;
    eng_options: string[];
    hin_options: string[];
    kan_options: string[];
    multiselect: string;
  }

  export interface Translations {
    [key: string]: {
      [lang: string]: string;
    };
  }

  export type LanguageCode = 'eng' | 'hin' | 'kan';
  
  export interface SchoolInterface {
    schoolCode: string;
    schoolName: string;
  }

  export interface SurveyQuestionsProps {
    lang: string;
    record: RecordType;
  } 