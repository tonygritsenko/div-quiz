<script setup>
const { quizQuestionsLength, showResults, numberOfCorrectAnswers } =
  defineProps(["quizQuestionsLength", "showResults", "numberOfCorrectAnswers"]);
</script>

<template>
  <div class="quiz__top">
    <div class="quiz__top-content">
      <h2 class="quiz__title" v-if="!showResults">Тестирование</h2>

      <div
        v-if="showResults && numberOfCorrectAnswers === quizQuestionsLength"
        class="quiz__top-wrapper"
      >
        <span class="quiz__title">Поздравляем!</span>
        <p class="quiz__top-text">
          Вы&nbsp;правильно ответили на&nbsp;все вопросы. Вы&nbsp;действительно
          отлично разбираетесь в&nbsp;IT.
        </p>
      </div>
      <div
        v-if="
          showResults &&
          numberOfCorrectAnswers > 0 &&
          numberOfCorrectAnswers !== quizQuestionsLength
        "
        class="quiz__top-wrapper"
      >
        <span class="quiz__title">Хороший результат!</span>
        <p class="quiz__top-text">
          Вы&nbsp;ответили правильно на&nbsp;{{
            numberOfCorrectAnswers
          }}&nbsp;вопросов. Так держать!
        </p>
      </div>
      <div
        v-if="showResults && numberOfCorrectAnswers === 0"
        class="quiz__top-wrapper"
      >
        <span class="quiz__title">Упс :(</span>
        <p class="quiz__top-text">
          Вы&nbsp;неправильно ответили на&nbsp;все вопросы. Нужно подучить
          теорию.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quiz {
  &__top {
    display: flex;
    align-items: center;
    gap: 30px;

    &-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
    }

    &-text {
      max-width: 530px;
      font-size: 24px;
      line-height: 140%;
    }
  }

  &__title {
    margin: 0;
    margin-bottom: 20px;
    font-weight: 800;
    font-size: 48px;
    line-height: 59px;
  }
}
</style>
