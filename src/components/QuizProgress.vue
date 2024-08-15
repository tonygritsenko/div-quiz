<script setup>
import { useQuizStore } from "../store/quizStore";
import { onMounted, onUnmounted, ref } from "vue";
import { tl } from "../gsap/toggleTimeline";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const store = useQuizStore();

const main = ref();

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const boxes = gsap.utils.toArray(".num");
    const statusElement = document.querySelector(".status");
    tl.value = gsap
      .timeline({
        paused: true,
      })
      .to(statusElement, {
        duration: 1,
        rotationY: 360,
      })
      .to(boxes[0], {
        duration: 1,
        motionPath: {
          path: [
            { x: 0, y: 0, z: 360 },
            { x: 0, y: 48, z: 0 },
          ],
        },
        rotationX: 360,
      })
      .to(
        boxes[1],
        {
          duration: 1,
          motionPath: {
            path: [
              { x: 0, y: 0, z: 360 },
              { x: 0, y: 48, z: 0 },
            ],
          },
          rotationX: 360,
        },
        "<"
      );
  }, main.value);
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<template>
  <div class="progress">
    <div class="progress__info">
      <span class="num">0</span
      ><span class="num">
        {{ store.quiz.length }}
      </span>
    </div>
    <div class="bar">
      <span class="status" :style="{ left: store.barPercentage }">{{
        store.currentQuestionIndex
      }}</span>
      <div class="completion" :style="{ width: store.barPercentage }"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 700;

  &__info {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
}

.bar {
  position: relative;
  width: 100%;
  height: 12px;
  background-color: #f7f7f7;
  border-radius: 99px;
}

.status {
  position: absolute;
  bottom: -28px;
  transition: left 0.5s ease-out;
}

.completion {
  height: 100%;
  background-color: #3300ff;
  border-radius: 99px;
  transition: width 0.5s ease-out;
}
</style>
