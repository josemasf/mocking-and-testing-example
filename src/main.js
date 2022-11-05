/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "./assets/main.css";
import "primevue/resources/themes/saga-blue/theme.css"; //theme"
import "primevue/resources/primevue.min.css"; //theme"
import "primeicons/primeicons.css"; //theme"

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Slider from "primevue/slider";
import ButtonPrime from "primevue/button";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component("DataTable", DataTable);
app.component("ColumnTable", Column);
app.component("InputText", InputText);
app.component("MultiSelect", MultiSelect);
app.component("Calendar", Calendar);
app.component("InputNumber", InputNumber);
app.component("Dropdown", Dropdown);
app.component("Slider", Slider);
app.component("ButtonPrime", ButtonPrime);

app.mount("#app");
