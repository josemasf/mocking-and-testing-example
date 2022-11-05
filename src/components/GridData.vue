<template>
  <div>
    <DataTable
      :value="props.data"
      :paginator="true"
      class="p-datatable-customers"
      :rows="10"
      dataKey="id"
      :rowHover="true"
      v-model:selection="selectedCustomers"
      v-model:filters="filters"
      filterDisplay="menu"
      :loading="props.loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 25, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      :globalFilterFields="[
        'name',
        'country.name',
        'representative.name',
        'status',
      ]"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="flex justify-content-center align-items-center">
          <h5 class="m-0">Customers</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <ColumnTable
        selectionMode="multiple"
        headerStyle="width: 3rem"
      ></ColumnTable>
      <ColumnTable field="name" header="Name" sortable style="min-width: 14rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-ColumnTable-filter"
            placeholder="Search by name"
          />
        </template>
      </ColumnTable>
      <ColumnTable
        field="country.name"
        header="Country"
        sortable
        filterMatchMode="contains"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          <img
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            width="30"
            style="vertical-align: middle"
          />
          <span class="image-text">{{ data.country.name }}</span>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-ColumnTable-filter"
            placeholder="Search by country"
          />
        </template>
      </ColumnTable>
      <ColumnTable
        header="Agent"
        sortable
        filterField="representative"
        sortField="representative.name"
        :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          <img
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            width="30"
            style="vertical-align: middle"
          />
          <span class="image-text">{{ data.representative.name }}</span>
        </template>
        <template #filter="{ filterModel }">
          <div class="mb-3 font-bold">Agent Picker</div>
          <MultiSelect
            v-model="filterModel.value"
            :options="representatives"
            optionLabel="name"
            placeholder="Any"
            class="p-ColumnTable-filter"
          >
            <template #option="slotProps">
              <div class="p-multiselect-representative-option">
                <img
                  src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                  width="30"
                  style="vertical-align: middle"
                />
                <span class="image-text">{{ slotProps.option.name }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </ColumnTable>
      <ColumnTable
        field="date"
        header="Date"
        sortable
        dataType="date"
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          {{ formatDate(data.date) }}
        </template>
        <template #filter="{ filterModel }">
          <Calendar
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
        </template>
      </ColumnTable>
      <ColumnTable
        field="balance"
        header="Balance"
        sortable
        dataType="numeric"
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          {{ formatCurrency(data.balance) }}
        </template>
        <template #filter="{ filterModel }">
          <InputNumber
            v-model="filterModel.value"
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </template>
      </ColumnTable>
      <ColumnTable
        field="status"
        header="Status"
        sortable
        :filterMenuStyle="{ width: '14rem' }"
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          <span :class="'customer-badge status-' + data.status">{{
            data.status
          }}</span>
        </template>
        <template #filter="{ filterModel }">
          <Dropdown
            v-model="filterModel.value"
            :options="statuses"
            placeholder="Any"
            class="p-ColumnTable-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span :class="'customer-badge status-' + slotProps.value">{{
                slotProps.value
              }}</span>
            </template>
            <template #option="slotProps">
              <span :class="'customer-badge status-' + slotProps.option">{{
                slotProps.option
              }}</span>
            </template>
          </Dropdown>
        </template>
      </ColumnTable>
      <ColumnTable
        field="activity"
        header="Activity"
        sortable
        :showFilterMatchModes="false"
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          <ProgressBar :value="data.activity" :showValue="false" />
        </template>
        <template #filter="{ filterModel }">
          <Slider v-model="filterModel.value" range class="m-3"></Slider>
          <div class="flex align-items-center justify-content-between px-2">
            <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
            <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
          </div>
        </template>
      </ColumnTable>
      <ColumnTable
        headerStyle="width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body>
          <ButtonPrime type="button" icon="pi pi-cog"></ButtonPrime>
        </template>
      </ColumnTable>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { FilterMatchMode, FilterOperator } from "primevue/api";

const props = defineProps({
  data: [],
  loading: Boolean,
});

/*onMounted(() => {
  customerService.value.getCustomersLarge().then((data) => {
    customers.value = data;
    customers.value.forEach(
      (customer) => (customer.date = new Date(customer.date))
    );
    loading.value = false;
  });
});*/

const customers = ref(props.data);
const selectedCustomers = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  "country.name": {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  balance: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const loading = ref(true);
const representatives = [
  { name: "Amy Elsner", image: "amyelsner.png" },
  { name: "Anna Fali", image: "annafali.png" },
  { name: "Asiya Javayant", image: "asiyajavayant.png" },
  { name: "Bernardo Dominic", image: "bernardodominic.png" },
  { name: "Elwin Sharvill", image: "elwinsharvill.png" },
  { name: "Ioni Bowcher", image: "ionibowcher.png" },
  { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
  { name: "Onyama Limba", image: "onyamalimba.png" },
  { name: "Stephen Shaw", image: "stephenshaw.png" },
  { name: "XuXue Feng", image: "xuxuefeng.png" },
];
const statuses = ref([
  "unqualified",
  "qualified",
  "new",
  "negotiation",
  "renewal",
  "proposal",
]);
const formatDate = (value) => {
  return value.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
</script>
