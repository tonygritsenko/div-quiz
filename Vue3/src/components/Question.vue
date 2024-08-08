<script setup>
const emit = defineEmits(["selectOption"]);

const { question } = defineProps(["question"]);

const emitSelectedOption = (isCorrect, selectedAnswer) => {
  emit("selectOption", isCorrect, selectedAnswer);
};
</script>

<template>
  <div class="question">
    <p class="question__text">{{ question.text }}</p>
    <div class="options">
      <button
        v-for="option in question.options"
        :key="option.id"
        class="options__button"
        @click="emitSelectedOption(option.isCorrect, option.text)"
      >
        {{ option.text }}
      </button>
    </div>
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
  background-color: #F7F7F7;
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

  &__button {
    position: relative;
    padding-left: 40px;
    text-align: left;
    background-color: inherit;
    border: none;
    cursor: pointer;

    &::before {
      position: absolute;
      content: "";
      left: 0;
      width: 20px;
      height: 20px;
      border: 1px solid #000000;
      border-radius: 100%;
    }
  }
}

.options__button:active::before {
  background-color: #3300ff;
  border-color: transparent;
}
</style>
