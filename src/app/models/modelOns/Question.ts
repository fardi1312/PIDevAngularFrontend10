export interface Question {
    id?: number;
    question: string;
    options?: Option[];
}


export interface Option {
    id?: number;
    answer: string;
    correct: boolean;
    question?: Question;
    isSelected?: boolean; // New isSelected property


}

