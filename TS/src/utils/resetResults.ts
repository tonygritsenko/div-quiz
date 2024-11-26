import { useQuizStore } from "../store/quizStore";

export const resetResults = (): void => {
  const store = useQuizStore();
  
  store.showResults = false;
  store.currentQuestionIndex = 0;
  store.numberOfCorrectAnswers = 0;
  store.userAnswers = [];
};
