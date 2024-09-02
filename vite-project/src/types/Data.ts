export interface QuestionsInterface {
    eng: string;
    hin: string;
    kan: string;
  }

  export interface Translations {
    [key: string]: {
      [lang: string]: string;
    };
  }

  export type LanguageCode = 'eng' | 'hin' | 'kan';
  