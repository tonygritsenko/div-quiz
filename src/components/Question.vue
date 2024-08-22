<script setup lang="ts">
import { useQuizStore } from "../store/quizStore";
import { toggleTimeline } from "../gsap/toggleTimeline";
import { Question } from "../types/interfaces";

defineProps<{
  question: Question;
}>();

const store = useQuizStore();
</script>

<template>
  <div class="question">
    <p class="question__text">{{ question.text }}</p>
    <form class="options">
      <div
        v-for="option in question.options"
        :key="option.id"
        class="options__item"
      >
        <input
          class="options__radio"
          :id="`option-${question.id}-${option.id}`"
          type="radio"
          :value="option.text"
          v-model="store.selectedOption"
          @click="
            store.onOptionSelected(option.isCorrect, option.text);
            toggleTimeline();
          "
        />
        <label
          :for="`option-${question.id}-${option.id}`"
          class="options__label"
        >
          {{ option.text }}
        </label>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  padding: 40px;
  gap: 20px;
  min-height: 528px;
  background-color: #f7f7f7;
  border-radius: 20px;

  &__text {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }
}

.options {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__item {
    display: flex;
    gap: 20px;
  }

  &__radio,
  &__label {
    cursor: pointer;
  }

  &__radio {
    position: relative;
    margin-right: var(--gap);
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &__radio[type="radio"]:before {
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
  }

  &__radio[type="radio"]:after {
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    background: #3300ff;
    border-radius: 100%;
    opacity: 0;
  }

  &__radio[type="radio"]:checked:after {
    opacity: 1;
  }

  &__label {
    line-height: 150%;
  }
}
</style>
