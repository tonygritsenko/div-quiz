import { useQuizStore } from "../store/quizStore";
import { Option } from "../types/interfaces";

export const isCorrect = (index: number): boolean | undefined => {
  const store = useQuizStore();

  const options: Option[] = store.quiz[index].options;

  for (const element of options) {
    if (element.isCorrect && element.text === store.userAnswers[index]) {
      return true;
    }
  }

  return false;
};
