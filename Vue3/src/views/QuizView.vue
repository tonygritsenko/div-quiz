<script setup>
import Question from "../components/Question.vue";
import QuizTop from "../components/QuizTop.vue";
import { ref, computed } from "vue";
import quiz from "../data/quiz.json";
import QuizProgress from "@/components/QuizProgress.vue";
import Result from "../components/Result.vue";

const showResults = ref(false);
const currentQuestionIndex = ref(0);
const numberOfCorrectAnswers = ref(0);
const userAnswers = ref([]);

const questionStatus = computed(
  () => currentQuestionIndex.value
);

const barPercentage = computed(
  () => `${(currentQuestionIndex.value / quiz.length) * 100}%`
);

const onOptionSelected = (isCorrect, selectedAnswer) => {
  userAnswers.value.push(selectedAnswer);

  if (isCorrect) {
    numberOfCorrectAnswers.value++;
  }

  if (quiz.length - 1 === currentQuestionIndex.value) {
    showResults.value = true;
  }

  currentQuestionIndex.value++;
};

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

const shuffledQuestions = shuffleQuestions(quiz);
</script>

<template>
  <main class="main">
    <section class="quiz">
      <div class="container">
        <QuizTop
          :showResults="showResults"
          :numberOfCorrectAnswers="numberOfCorrectAnswers"
          :quizQuestionsLength="quiz.length"
        />
        <Question
          v-if="!showResults"
          :question="shuffledQuestions[currentQuestionIndex]"
          @selectOption="onOptionSelected"
        />
        <Result
          v-else
          :quizQuestionsLength="quiz.length"
          :numberOfCorrectAnswers="numberOfCorrectAnswers"
          :userAnswers="userAnswers"
          :shuffledQuestions="shuffledQuestions"
        />
        <QuizProgress
          v-if="!showResults"
          :questionStatus="questionStatus"
          :barPercentage="barPercentage"
          :quizQuestionsLength="quiz.length"
        />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.quiz {
  padding: 80px 0;
}
</style>
