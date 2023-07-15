<template>
  <div>
    <draggable
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null
      }"
      v-model="model"
      v-bind="dragOptions"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element, index }">
        <li class="mb-3 d-flex" style="gap: 12px">
          <span
            class="handle d-flex py-4"
            style="cursor: grab; height: min-content"
            v-if="model && model.length >= 2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L12 3L15 6" stroke="var(--chakra-colors-brand-gray-400,#A1A1A1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 18L12 21L9 18" stroke="var(--chakra-colors-brand-gray-400,#A1A1A1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 3V9" stroke="var(--chakra-colors-brand-gray-400,#A1A1A1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 15V21" stroke="var(--chakra-colors-brand-gray-400,#A1A1A1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <div class="w-100">
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <label class="my-1 mr-2">Address type</label>
                <button @click.prevent="deleteField(index)">Delete X</button>
              </div>
              <select class="form-control" v-model="element.type">
                <option :value="type.name" v-for="type in types" :key="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
            <div class="form-group" v-show="element.type !== 'Location'">
              <label for="street1">Street line one</label>
              <input type="text" class="form-control" id="street1" placeholder="Street line one" v-model="element.streetLine1">
            </div>
            <div class="form-group" v-show="element.type !== 'Location'">
              <label for="street2">Street line two</label>
              <input type="text" class="form-control" id="street2" placeholder="Street line two" v-model="element.streetLine2">
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" class="form-control" id="city" placeholder="City" v-model="element.city">
            </div>
            <div class="form-group">
              <label for="state">State / Province</label>
              <input type="text" class="form-control" id="state" placeholder="State / Province" v-model="element.state">
            </div>
            <div class="form-group">
              <label for="postCode">Postal Code</label>
              <input type="text" class="form-control" id="postCode" placeholder="Postal Code" v-model="element.postCode">
            </div>
            <div class="form-group">
              <label for="country">Country</label>
              <input type="text" class="form-control" id="country" placeholder="Country" v-model="element.country">
            </div>
          </div>
        </li>
      </template>
    </draggable>
    <button class="mt-4 w-100 bg-transparent rounded" @click.prevent="addField">
      + Add Location
    </button>
  </div>
</template>
<script setup>
import draggable from 'vuedraggable';

  const emits = defineEmits(['input'])
  const props = defineProps({
    modelValue: Object,
    types: Array
  })
  const drag = ref(false)

  const dragOptions = computed(() => {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost"
    };
  });

  const model = computed({
    get() {
      return props.modelValue.sort((a, b) => a.order - b.order);
    },
    set(modelVal) {
      emits('input', updateOrder(modelVal))
    }
  })

  function updateOrder(newVal) {
    const items = newVal;
    items.forEach((item, index) => {
      return item.order = index += 1
    })
    return items;
  }

  function addField() {
    model.value.push({
      id: model.value.length + 1,
      order: model.value.length + 1 || 1,
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