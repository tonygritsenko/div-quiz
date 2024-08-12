<script setup>
const props = defineProps({
  questionStatus: Number,
  barPercentage: String,
  quizQuestionsLength: Number,
});
</script>

<template>
  <div class="progress">
    <div class="bar">
      <span class="status" :style="{ paddingLeft: barPercentage }">{{
        questionStatus
      }}</span>
      <div class="completion" :style="{ width: barPercentage }"></div>
    </div>
    <div class="progress__bottom">
      <span>0</span
      ><span>
        {{ quizQuestionsLength }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  font-weight: 700;

  &__bottom {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
}

.bar {
  position: relative;
  margin-bottom: 8px;
  width: 100%;
  height: 12px;
  background-color: #f7f7f7;
  border-radius: 99px;
}

.status {
  position: absolute;
  bottom: -28px;
}

.completion {
  height: 100%;
  background-color: #3300ff;
  border-radius: 99px;
}
</style>
