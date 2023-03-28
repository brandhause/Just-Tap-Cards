<template>
  <div class="form-group">
    <label :for="id">{{ placeholder }}</label>
    <input
      :type="type"
      class="form-control"
      :id="id"
      :placeholder="placeholder"
      v-model="model"
    >
  </div>
</template>
<script setup>
  const props = defineProps({
    modelValue: String,
    id: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const model = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      return emit('update:modelValue', val)
    }
  })
</script>

