import { useQuizStore } from "../store/quizStore";

export const isCorrect = (index) => {
  const store = useQuizStore();

  const options = store.quiz[index].options;

  for (const element of options) {
    if (element.isCorrect && element.text === store.userAnswers[index]) {
      return true;
    }
  }
};
