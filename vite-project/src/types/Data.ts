import { RecordType } from "./Record";

export interface QuestionsInterface {
  eng: string;
  hin: string;
  kan: string;
  eng_options: (string | number)[]; // Allow both strings and numbers
  hin_options: (string | number)[];
  kan_options: (string | number)[];
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