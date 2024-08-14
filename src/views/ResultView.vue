<script setup>
import { useQuizStore } from "../store/quizStore";
import { useRouter } from "vue-router";
import QuizTop from "../components/QuizTop.vue";
import { onMounted, onBeforeUnmount } from 'vue';

const store = useQuizStore();
const router = useRouter();
const quiz = store.quiz;

const isCorrect = (index) => {
  const options = quiz[index].options;
  for (const element of options) {
    if (element.isCorrect && element.text === store.userAnswers[index]) {
      return true;
    }
  }
};

const resetResults = () => {
  store.showResults = false;
  store.currentQuestionIndex = 0;
  store.numberOfCorrectAnswers = 0;
  store.userAnswers = [];
};

const redirectOnReload = () => {
  sessionStorage.setItem('shouldRedirect', 'true');
};

const checkRedirect = () => {
  if (sessionStorage.getItem('shouldRedirect')) {
    sessionStorage.removeItem('shouldRedirect');
    router.push("/");
  }
};

onMounted(() => {
  window.addEventListener('beforeunload', redirectOnReload);
  checkRedirect();
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', redirectOnReload);
});
</script>

<template>
  <main class="main">
    <section class="results">
      <div class="container">
        <div class="results__wrapper">
          <QuizTop />
          <ul class="results__list">
            <li
              v-for="(question, index) in quiz"
              :key="index"
              :class="{
                'results__item--correct': isCorrect(index),
              }"
              class="results__item"
            >
              <p class="results__title">{{ question.text }}</p>
              <p class="results__text">
                {{ store.userAnswers[index] }}
              </p>
            </li>
          </ul>
          <RouterLink to="/" class="results__link" @click="resetResults"
            >Пройти еще раз</RouterLink
          >
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.results {
  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-bottom: 40px;
    padding: 0;
    gap: 20px;
    list-style: none;
  }

  &__item {
    padding: 40px;
    background-color: #ffe0e0;
    border-radius: 20px;

    &--correct {
      background-color: #e5f5e1;
    }
  }

  &__title {
    margin-bottom: 15px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  &__text {
    line-height: 22px;
  }

  &__link {
    align-self: center;
    padding: 16px;
    max-width: 220px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    background-color: #3300ff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
