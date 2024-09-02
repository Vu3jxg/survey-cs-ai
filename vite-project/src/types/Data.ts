export interface QuestionsInterface {
    eng: string;
    hin: string;
    kan: string;
    options: string[];
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