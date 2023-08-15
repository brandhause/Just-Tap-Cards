<template>
  <div>
    <nuxt-link class="arrow-back" to="/profile">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
    </nuxt-link>
    <h2 class="edit-heading">Edit Call To Action</h2>
    <div>
      <div class="d-flex justify-content-center align-items-center w-100 rounded" style="background: #f5f5f5">
        <div class="image-preview d-flex">
          <img class="mt-auto" :src="`/images/${imageSrc}.webp`" alt="" />
        </div>
      </div>
    </div>
    <div class="mt-3" style="height: 84px">
      <p
        class="description"
        v-for="des in description.filter((d) => selectedAction.includes(d.cta))"
        :key="des.id"
      >
        <small>{{ des.description }}</small>
      </p>
    </div>
    <div class="selection mt-4 description">
      <label
        class="d-flex align-items-center"
        :for="cta.value"
        v-for="cta in actions"
        :key="cta.id"
      >
        <input :id="cta.value" type="radio" :value="cta.value == 'custom' ? selectedCustom : cta.value" v-model="selectedAction" hidden />
        <span class="radio" :class="{ checked: selectedAction == cta.value || (selectedAction.includes('custom') && cta.value == 'custom' ) }"></span>
        <span style="font-size: 18px; margin-left: 8px">{{ cta.name }}</span>
      </label>
      <div class="custom-action" :class="{ active: selectedAction.includes('custom') }">
        <label for="action">Action</label>
        <select class="form-select" name="action" id="action" v-model="selectedCustom" @change="updateAction">
          <option :value="custom.value" v-for="custom in customActions" :key="custom.id">
            {{ custom.name }}
          </option>
        </select>
        <input class="link" type="text" placeholder="Add link" v-model="link" required />
      </div>
    </div>
    <div style="margin-top: 32px">
      <button class="cta-btn border rounded px-5 w-100" @click="saveAction">
        <small><strong>Save</strong></small>
      </button>
    </div>
  </div>
</template>
<script setup>
import useFirestore from '~/composables/useFirestore.ts';
  
const { update } = useFirestore();
const currentUser = ref();
const liveProfile = ref();
const selectedAction = ref('distinct');
const selectedCustom = ref('custom.apply');
const link = ref('');
const actions = ref([
  {
    id: 1,
    name: 'Distinct',
    value: 'distinct'
  },
  {
    id: 2,
    name: 'Combined',
    value: 'combined'
  },
  {
    id: 3,
    name: 'Custom Call To Action',
    value: 'custom'
  },
])
const customActions = ref([
  {
    id: 1,
    name: 'Apply Now',
    value: 'custom.apply'
  },
  {
    id: 2,
    name: 'Learn More',
    value: 'custom.learn'
  },
  {
    id: 3,
    name: 'Book Now',
    value: 'custom.book'
  },
])
const description = ref([
  {
    id: 1,
    cta: 'distinct',
    description: 'Two distinct call to actions. "Save Contact" downloads your VCard file directly into their phone. "Exchange Contact" lets others share their information back with you.'
  },
  {
    id: 2,
    cta: 'combined',
    description: 'Clicking on "Save Contact" downloads VCard file directly into their phone. Right after saving your contact, pop-up appears to capture their information.'
  },
  {
    id: 3,
    cta: 'custom',
    description: 'Save Contact" button works just like "Combined" option. You can customize secondary button below.'
  },
])

watch(() => selectedAction.value, (newVal) => {
  if (!newVal.includes('custom')) {
    link.value = '';
  }
})

onMounted(() => {
  currentUser.value = JSON.parse(localStorage.getItem('profiles'));
  liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));
})

const imageSrc = computed(() => {
  const src = [
    { id: 1, cta: 'distinct', val: 'distinct-cta-image' },
    { id: 2, cta: 'combined', val: 'combined-cta-image' },
    { id: 3, cta: 'custom.apply', val: 'applynow-cta-image' },
    { id: 4, cta: 'custom.learn', val: 'learnmore-cta-image' },
    { id: 5, cta: 'custom.book', val: 'booknow-cta-image' },
  ];
  
  const img = src.find((s) => s.cta.includes(selectedAction.value));
  if (!img) return 'distinct-cta-image';
  return img.val;
})

function updateAction() {
  selectedAction.value = selectedCustom.value;
}

async function saveAction() {
  const profile = currentUser.value.profile;
  const index = profile.findIndex(item => item.id === liveProfile.value.id);
  profile[index].cta = {
    action: selectedAction.value,
    link: link.value
  }
  
  await update(currentUser.value.uid, profile)
    .then(() => {
      return navigateTo('/profile');
    });
}
</script>
<style lang="scss" scoped>
.cta-btn {
  background: #FF643A;
  color: #FFFFFF;
}
button {
  padding: 12px;
}
.selection {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .radio {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-width: 2px;
    border-style: solid;
    border-image: initial;
    border-color: #e2e8f0;
    border-radius: 100px;

    &.checked {
      background: #FF643A;
      border-color: #FF643A;
      color: #FFFFFF;
    }
    
    &.checked::before {
      content: "";
      display: inline-block;
      position: relative;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: currentcolor;
    }
  }
}
.image-preview {
  width: 170px;
  height: 210px;
}
.description {
  color: #686868;
}
.custom-action {
  transition: all 0.3s ease;
  max-height: 0;
  opacity: 0;
  overflow: hidden;

  &.active {
    max-height: 114px;
    opacity: 1;
  }
}
.link {
  width: 100%;
  padding: 6px 12px;
  margin-top: 16px
}
.form-select,
.link {
  color: inherit;
  border-radius: unset;
  border: none;
  border-bottom: 1px solid #ced4da;
  &:focus {
    border-color: #FF643A;
    outline: unset;
    box-shadow: unset;
  }
}
</style>
