export interface RecordType {
    id?: number; // Optional, since it might not be available when creating a new item
    school_code: number; 
    class_name: number;
    section: string;
    board: string;
    gender: string;
    lang: string;
    rollno: string;
    q1?: string;
    q2?: string;
    q3?: string;
    q4?: string;
    q5?: string;
    q6?: string;
    q7?: string;
    q8?: string;
    q9?: string;
    q10?: string;
    q11?: string;
    q12?: string;
    q13?: string;
    q14?: string;
    q15?: string;
  }