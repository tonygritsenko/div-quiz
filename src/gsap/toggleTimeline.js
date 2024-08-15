import { ref } from 'vue';

export const tl = ref();

export function toggleTimeline() {
  if (tl.value.paused()) {
    tl.value.play();
  } else {
    tl.value.reverse().then(() => {
      tl.value.pause(0);
    });
  }
}
