import { createRouter, createWebHistory } from "vue-router";
import QuizView from "../views/QuizView.vue";
import ResultView from "@/views/ResultView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "quiz",
      component: QuizView,
    },
    {
      path: "/result/",
      name: "result",
      component: ResultView,
    },
  ],
});

export default router;
