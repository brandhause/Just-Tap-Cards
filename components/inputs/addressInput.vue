<template>
  <div>
    <div class="mb-3" v-for="(field, index) in model" :key="index">
      <div class="form-group">
        <div class="d-flex justify-content-between">
          <label class="my-1 mr-2">Address type</label>
          <button @click.prevent="deleteField(index)">Delete X</button>
        </div>
        <select class="form-control" v-model="field.type">
          <option :value="type.name" v-for="type in types" :key="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="form-group" v-show="field.type !== 'Location'">
        <label for="street1">Street line one</label>
        <input type="text" class="form-control" id="street1" placeholder="Street line one" v-model="field.streetLine1">
      </div>
      <div class="form-group" v-show="field.type !== 'Location'">
        <label for="street2">Street line two</label>
        <input type="text" class="form-control" id="street2" placeholder="Street line two" v-model="field.streetLine2">
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input type="text" class="form-control" id="city" placeholder="City" v-model="field.city">
      </div>
      <div class="form-group">
        <label for="state">State / Province</label>
        <input type="text" class="form-control" id="state" placeholder="State / Province" v-model="field.state">
      </div>
      <div class="form-group">
        <label for="postCode">Postal Code</label>
        <input type="text" class="form-control" id="postCode" placeholder="Postal Code" v-model="field.postCode">
      </div>
      <div class="form-group">
        <label for="country">Country</label>
        <input type="text" class="form-control" id="country" placeholder="Country" v-model="field.country">
      </div>
    </div>
    <button class="mt-4 w-100 bg-transparent rounded" @click.prevent="addField">
      + Add Location
    </button>
  </div>
</template>
<script setup>
  
  const props = defineProps({
    modelValue: Object,
    types: Array
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
    model.value.push({
      id: model.value.length + 1,
      type: 'Location',
      streetLine1: '',
      streetLine2: '',
      city: '',
      state: '',
      postCode: '',
      country: '',
    })
  }

  function deleteField(index) {
    model.value.splice(index, 1)
  }
</script>