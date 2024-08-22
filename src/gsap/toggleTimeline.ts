import { ref } from 'vue';

export const tl = ref<any>(null);

export function toggleTimeline(): void {
  if (tl.value && tl.value.paused()) {
    tl.value.play();
  } else if (tl.value) {
    tl.value.reverse().then(() => {
      tl.value.pause(0);
    });
  }
}
