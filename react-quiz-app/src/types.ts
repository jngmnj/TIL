export interface IUserAnswer {
    answer: string;
    correct: boolean;
    question: string;
}

export interface IQuestion {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    totalQeustions: number;
    questionNumber: number;
}

