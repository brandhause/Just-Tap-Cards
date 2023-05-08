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
        <li class="form-group d-flex align-items-center" style="gap: 12px">
          <span
            class="handle d-flex pr-3"
            style="cursor: grab; width: min-content"
            v-if="model && model.length >= 2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L12 3L15 6" stroke="var(--chakra-colors-brand-gray-400,#A1A1A1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 18L12 21L9 18" stroke="var(--chakra-colors-brand-gray-400,#A1A1A1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 3V9" stroke="var(--chakra-colors-brand-gray-400,#A1A1A1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 15V21" stroke="var(--chakra-colors-brand-gray-400,#A1A1A1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <div class="w-100">
            <div class="d-flex justify-content-between">
              <label class="my-1 mr-2">Email</label>
              <button @click.prevent="deleteField(index)">Delete X</button>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              v-model="element.email"
            >
          </div>
        </li>
      </template>
    </draggable>
    <button class="mt-4 w-100 bg-transparent rounded" @click.prevent="addField">
      + Add Email
    </button>
  </div>
</template>
<script setup>
import draggable from 'vuedraggable';

  const emits = defineEmits(['input'])
  const props = defineProps({
    modelValue: Array,
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
      id: model.value.length + 1 || 1,
      email: '',
      order: model.value.length + 1 || 1
    })
  }

  function deleteField(index) {
    model.value.splice(index, 1)
  }
</script>

