import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import quiz from "../data/quiz.json";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const shuffleQuestions = (questions) => {
  shuffleArray(questions).forEach((question) => {
    question.options = shuffleArray(question.options);
  });

  return questions;
};

const shuffledQuiz = shuffleQuestions(quiz);

export const useQuizStore = defineStore({
  id: "quizStore",

  state: () => ({
    router: useRouter(),
    showResults: false,
    currentQuestionIndex: 0,
    numberOfCorrectAnswers: 0,
    userAnswers: [],
    selectedOption: null,
    quiz: shuffledQuiz,
  }),

  getters: {
    barPercentage: (state) =>
      `${(state.currentQuestionIndex / state.quiz.length) * 100}%`,
  },

  actions: {
    onOptionSelected(isCorrect, selectedAnswer) {
      this.selectedOption = selectedAnswer;

      setTimeout(() => {
        this.userAnswers.push(selectedAnswer);

        if (isCorrect) {
          this.numberOfCorrectAnswers++;
        }

        if (this.quiz.length - 1 === this.currentQuestionIndex) {
          this.showResults = true;
          this.router.push("/result/");
        }

        this.currentQuestionIndex++;
        this.selectedOption = null;
      }, 1000);
    },
  },
});
