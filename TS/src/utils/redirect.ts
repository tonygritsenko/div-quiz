import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from "vue-router";

export const redirect = (): void => {
  const router = useRouter();

  const redirectOnReload = (): void => {
    sessionStorage.setItem('shouldRedirect', 'true');
  };

  const checkRedirect = (): void => {
    if (sessionStorage.getItem('shouldRedirect')) {
      sessionStorage.removeItem('shouldRedirect');
      router.push("/");
    }
  };

  onMounted(() => {
    window.addEventListener('beforeunload', redirectOnReload);
    checkRedirect();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', redirectOnReload);
  });
};
