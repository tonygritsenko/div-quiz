import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import QuizView from "../views/QuizView.vue";
import ResultView from "../views/ResultView.vue";

const routes: Array<RouteRecordRaw> = [
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

