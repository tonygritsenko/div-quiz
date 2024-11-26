import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import quiz from "../data/quiz.json";
import { shuffleQuestions } from "../utils/shuffleQuestions";
import { QuizStoreState } from "../types/interfaces";

const shuffledQuiz = shuffleQuestions(quiz);

const time = 700;

export const useQuizStore = defineStore({
  id: "quizStore",

  state: (): QuizStoreState => ({
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
    onOptionSelected(isCorrect: boolean, selectedAnswer: string): void {
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
      }, time);
    },
  },
});
