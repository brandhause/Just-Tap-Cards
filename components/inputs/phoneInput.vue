<template>
  <div class="form-group">
    <label class="my-1 mr-2" for="phoneType">Phone</label>
    <div class="d-flex">
      <select class="form-control w-50" id="phoneType" v-model="modelValue.type">
        <option :value="phone.id" v-for="phone in phoneType" :key="phone.id">
          {{ phone.name }}
        </option>
      </select>
      <input class="form-control" type="text" v-model="modelValue.value"  />
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    modelValue: Object,
    phoneType: Array,
  })
</script>

