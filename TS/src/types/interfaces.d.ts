export interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface QuizStoreState {
  router: ReturnType<typeof useRouter>;
  showResults: boolean;
  currentQuestionIndex: number;
  numberOfCorrectAnswers: number;
  userAnswers: string[];
  selectedOption: string | null;
  quiz: Question[];
}
