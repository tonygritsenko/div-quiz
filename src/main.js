import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Antd);
app.mount("#app");
