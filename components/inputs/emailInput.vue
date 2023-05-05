<template>
  <div>
    <div class="form-group" v-for="(field, index) in model" :key="index">
      <div class="d-flex justify-content-between">
        <label class="my-1 mr-2">Email</label>
        <button @click.prevent="deleteField(index)">Delete X</button>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Email"
        v-model="field.email"
      >
    </div>
    <button class="mt-4 w-100 bg-transparent rounded" @click.prevent="addField">
      + Add Email
    </button>
  </div>
</template>
<script setup>

  const emits = defineEmits(['input'])
  const props = defineProps({
    modelValue: Array,
  })
  
  const model = computed({
    get() {
      return props.modelValue
    },
    set(modelVal) {
      emits('input', modelVal)
    }
  })

  function addField() {
    model.value.push({ id: model.value.length + 1, email: '' })
  }

  function deleteField(index) {
    model.value.splice(index, 1)
  }
</script>

