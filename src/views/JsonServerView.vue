<template>
  <main>
    <GridData :data="customers" :loading="loading" />
  </main>
</template>

<script setup>
import GridData from "../components/GridData.vue";
import { ref, onMounted } from "vue";
import CustomerService from "../service/CustomerService";

onMounted(() => {
  customerService.value.getCustomersLarge().then((data) => {
    console.log(customers.value, "customers");
    customers.value = data;
    customers.value.forEach(
      (customer) => (customer.date = new Date(customer.date))
    );
    loading.value = false;
  });
});
const customers = ref();
//const selectedCustomers = ref();

const customerService = ref(new CustomerService());
const loading = ref(true);
</script>
