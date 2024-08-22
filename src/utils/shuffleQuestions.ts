import { Question } from "../types/interfaces";


const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


export const shuffleQuestions = (questions: Question[]): Question[] => {

  const shuffledQuestions = shuffleArray(questions);

  shuffledQuestions.forEach((question) => {
    question.options = shuffleArray(question.options);
  });

  return shuffledQuestions;
};
