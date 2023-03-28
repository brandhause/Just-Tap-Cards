<template>
  <div>
    <div class="form-group">
      <label class="my-1 mr-2" for="addresType">Address type</label>
      <select class="form-control" id="addresType" v-model="modelValue.type">
        <option :value="address.id" v-for="address in addressType" :key="address.id">
          {{ address.name }}
        </option>
      </select>
    </div>
    <div class="form-group" v-show="modelValue.type !== 1">
      <label for="street1">Street line one</label>
      <input type="text" class="form-control" id="street1" placeholder="Street line one" v-model="modelValue.streetLine1">
    </div>
    <div class="form-group" v-show="modelValue.type !== 1">
      <label for="street2">Street line two</label>
      <input type="text" class="form-control" id="street2" placeholder="Street line two" v-model="modelValue.streetLine2">
    </div>
    <div class="form-group">
      <label for="city">City</label>
      <input type="text" class="form-control" id="city" placeholder="City" v-model="modelValue.city">
    </div>
    <div class="form-group">
      <label for="state">State / Province</label>
      <input type="text" class="form-control" id="state" placeholder="State / Province" v-model="modelValue.state">
    </div>
    <div class="form-group">
      <label for="postCode">Postal Code</label>
      <input type="text" class="form-control" id="postCode" placeholder="Postal Code" v-model="modelValue.postCode">
    </div>
    <div class="form-group">
      <label for="country">Country</label>
      <input type="text" class="form-control" id="country" placeholder="Country" v-model="modelValue.country">
    </div>
  </div>
</template>
<script setup>
  // const addressType = ref([
  //   {
  //     id: 1,
  //     name: 'Location'
  //   },
  //   {
  //     id: 2,
  //     name: 'Office'
  //   },
  //   {
  //     id: 3,
  //     name: 'Store'
  //   },
  // ])
  
  const props = defineProps({
    modelValue: Object,
    addressType: Array
  })

  onMounted(() => {
    // props.modelValue.type = props.addressType.value[0].id
  })
  
</script>