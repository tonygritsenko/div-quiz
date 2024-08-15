<script setup>
import { useQuizStore } from "../store/quizStore";
import QuizTop from "../components/QuizTop.vue";
import { redirect } from "../utils/redirect";
import { resetResults } from "../utils/resetResults";
import { isCorrect } from "../utils/isCorrect";

const store = useQuizStore();

redirect();
</script>

<template>
  <main class="main">
    <section class="results">
      <div class="container">
        <div class="results__wrapper">
          <QuizTop />
          <ul class="results__list">
            <li
              v-for="(question, index) in store.quiz"
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
    position: relative;
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
    border-radius: 10px;   
    cursor: pointer;

    &:after {
      position: absolute;
      content: "";
      top: -4%;
      left: -4%;
      width: 108%;
      height: 108%;
      background-color: #3300ff;
      border-radius: 10px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
    }

    &:hover:not(:focus-visible):after {
      opacity: 1;
    }
  }
}
</style>
