<script setup>
import { useQuizStore } from "../store/quizStore";
import { ref } from "vue";

const props = defineProps({
  question: Object,
});

const store = useQuizStore();
const checkedRadio = ref(false);

const check = () => {
  checkedRadio = true;
};


const selectedOption = (isCorrect, selectedAnswer) => {
  store.onOptionSelected(isCorrect, selectedAnswer);
};
</script>

<template>
  <a-radio-group v-model:value="value" class="options">
    <a-radio
      v-for="option in question.options"
      :key="option.id"
      :value="option.text"
      v-model="check"
      @click="
        selectedOption(option.isCorrect, option.text);
        check();
      "
    >
      {{ option.text }}</a-radio
    >
  </a-radio-group>
</template>