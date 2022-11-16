<template>
  <div>
    <p class="label-display" v-if="props.label">{{ props.label }}</p>
    <InputText
      type="text"
      v-model="input"
      :disabled="props.disabled"
      class="input input-width"
      :placeholder="props.placeholder"
      @keydown.enter="$emit('keydown.enter', $event)"
      @update:modelValue="$emit('update:modelValue', $event)"
      role="textbox"
    />
  </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import { ref, watch, computed } from "vue";

const props = defineProps<{
  value: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  width?: string;
  inlineLabel?: boolean;
}>();

const input = ref();

const width = computed(() => props.width || "100%");
const labelDisplay = computed(() => (props.inlineLabel ? "inline" : "block"));

watch(
  () => props.value,
  (value) => {
    input.value = value;
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.input-width {
  width: v-bind(width);
}

.label-display {
  display: v-bind(labelDisplay);
  margin-right: 10px;
}

p {
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  color: #333;
  font-size: 1rem;
  font-family: var(--font-family);
}
.input {
  border: #9e9e9e solid 1px;
}
.input:hover {
  border-color: #f5f5f5;
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%), 0 2px 3px rgb(0 0 0 / 5%);
}
</style>
