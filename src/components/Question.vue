<script setup>
import { ref } from "vue";

const props = defineProps({
  question: Object,
});

const emit = defineEmits(["selectOption"]);

let selectedOption = ref("");

const emitSelectedOption = (isCorrect, selectedAnswer) => {
  selectedOption.value = selectedAnswer;
  emit("selectOption", isCorrect, selectedAnswer);
};

const generateID = () => {
  return crypto.randomUUID();
};

let itemID = generateID();
</script>

<template>
  <div class="question">
    <p class="question__text">{{ question.text }}</p>
    <div class="options">
      <div
        v-for="option in question.options"
        :key="option.id"
        class="options__item"
        @click="itemID = generateID(); selectedOption = option.text"
      >
        <!-- <input
          type="radio"
          :id="itemID + option.id"
          class="options__radio"
          :checked="selectedOption === option.text"
          @click="emitSelectedOption(option.isCorrect, option.text)"
        /> -->
        <input
          type="radio"
          :id="itemID + option.id"
          class="options__radio"
          @click="emitSelectedOption(option.isCorrect, option.text)"
        />
        <label class="options__radio"> {{ option.text }} </label>
      </div>
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
    position: relative;
    padding-left: 40px;
    text-align: left;
    background-color: inherit;
    border: none;
    cursor: pointer;

    // &::before {
    //   position: absolute;
    //   content: "";
    //   left: 0;
    //   width: 20px;
    //   height: 20px;
    //   border: 1px solid #000000;
    //   border-radius: 100%;
    // }
  }
}

// .options__button:active::before {
//   background-color: #3300ff;
//   border-color: transparent;
// }
</style>
