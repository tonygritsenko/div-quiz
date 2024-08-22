<script lang="ts" setup>
import { useQuizStore } from "../store/quizStore";
import Question from "../components/Question.vue";
import QuizTop from "../components/QuizTop.vue";
import QuizProgress from "../components/QuizProgress.vue";

const store = useQuizStore();
</script>

<template>
  <main class="main">
    <section v-if="!store.showResults" class="quiz">
      <div class="container">
        <QuizTop />
        <Question :question="store.quiz[store.currentQuestionIndex]" />
        <QuizProgress />
      </div>
    </section>
  </main>
</template>
