/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "./assets/main.css";
import "primevue/resources/themes/saga-blue/theme.css"; //theme"
import "primevue/resources/primevue.min.css"; //theme"
import "primeicons/primeicons.css"; //theme"

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.mount("#app");
