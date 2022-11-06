<template>
  <main>
    <div class="url-api">URL API: {{ urlApi }}</div>
    <GridData :data="customers" :loading="loading" />
  </main>
</template>

<script setup>
import GridData from "../components/GridData.vue";
import { ref, onMounted } from "vue";
import CustomerService from "../service/CustomerService";

onMounted(() => {
  customerService.value.getCustomers().then((data) => {
    customers.value = data;
    customers.value.forEach(
      (customer) => (customer.date = new Date(customer.date))
    );
    loading.value = false;
  });
});
const customers = ref();
const urlApi = ref(import.meta.env.VITE_API_URL);
const customerService = ref(new CustomerService());
const loading = ref(true);
</script>

<style>
.url-api {
  text-align: center;
  padding: 2rem;
  background-color: beige;
  color: black;
}
</style>
