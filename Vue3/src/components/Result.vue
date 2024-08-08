<script setup>
const {
  shuffledQuestions,
  quizQuestionsLength,
  numberOfCorrectAnswers,
  userAnswers,
} = defineProps([
  "shuffledQuestions",
  "quizQuestionsLength",
  "numberOfCorrectAnswers",
  "userAnswers",
]);

const isCorrect = (index) => {
  const options = shuffledQuestions[index].options;
  for (const element of options) {
    if (element.isCorrect && element.text === userAnswers[index]) {
      return true;
    }
  }
};

const refreshPage = () => {
  location.reload();
};
</script>

<template>
  <div class="results">
    <div class="results__wrapper">
      <div
        v-for="(question, index) in shuffledQuestions"
        :key="index"
        :class="{
          'results__content--correct': isCorrect(index),
        }"
        class="results__content"
      >
        <p class="results__title">{{ question.text }}</p>
        <p class="results__text">
          {{ userAnswers[index] }}
        </p>
      </div>
    </div>
    <button
      v-if="numberOfCorrectAnswers < quizQuestionsLength"
      class="results__button"
      @click="refreshPage"
    >
      Пройти еще раз
    </button>
  </div>
</template>

<style lang="scss" scoped>
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    gap: 20px;
  }

  &__content {
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

  &__button {
    padding: 16px;
    max-width: 220px;
    width: 100%;
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
