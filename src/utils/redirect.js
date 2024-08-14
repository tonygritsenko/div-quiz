import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from "vue-router";

export const redirect = () => {
  const router = useRouter();
  
  const redirectOnReload = () => {
    sessionStorage.setItem('shouldRedirect', 'true');
  };
  
  const checkRedirect = () => {
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