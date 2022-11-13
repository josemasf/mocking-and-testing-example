<template>
  <main>
    <div class="url-api">
      URL API: {{ urlApi }} <br />Selected customers:
      {{ customersSelected.length }}
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <GridData
      :data="customers"
      :loading="loading"
      @selected-rows="selectedHander"
    />
  </main>
</template>

<script setup lang="ts">
import GridData from "../components/GridData.vue";
import { ref, onMounted } from "vue";
import CustomerService from "../service/CustomerService";

const customers = ref();
const error = ref();
const customersSelected = ref([]);
const urlApi = ref(import.meta.env.VITE_API_URL);
const customerService = ref(new CustomerService());
const loading = ref(true);

const selectedHander = (payload: never[]) =>
  (customersSelected.value = payload);

onMounted(() => {
  customerService.value
    .getCustomers()
    .then((data) => {
      customers.value = data;
      customers.value.forEach(
        (customer: { date: string | number | Date }) =>
          (customer.date = new Date(customer.date))
      );
    })
    .catch((error) => {
      error.value = error;
    })
    .finally(() => (loading.value = false));
});
</script>

<style>
.url-api {
  text-align: center;
  padding: 2rem;
  background-color: beige;
  color: black;
}
</style>
