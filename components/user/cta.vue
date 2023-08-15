<template>
  <div class="my-4">
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-between align-items-center">
          <h3>Call To Action</h3>
          <nuxt-link class="text-accent" to="/profile/edit-call-to-action">edit</nuxt-link>
        </div>
      </div>
    </div>
    <div class="row" v-if="!currentUser.cta || currentUser.cta.action == 'distinct'">
      <div class="col-12 col-md-6" style="padding-right: 2px">
        <button class="default-btn border rounded px-5 w-100">
          <small><strong>Save Contact</strong></small>
        </button>
      </div>
      <div class="col-12 col-md-6" style="padding-left: 2px">
        <button
          class="cta-btn border rounded px-5 w-100"
          :style="{ background: currentUser.theme?.secondary, color: currentUser.theme?.color }"
        >
          <small><strong>Exchange</strong></small>
        </button>
      </div>
    </div>
    <div class="row" v-else-if="currentUser.cta.action == 'combined'">
      <div class="col-12">
        <button
          class="cta-btn border rounded px-5 w-100"
          :style="{ background: currentUser.theme?.secondary, color: currentUser.theme?.color }"
        >
          <small><strong>Save Contact</strong></small>
        </button>
      </div>
    </div>
    <div class="row" v-else-if="currentUser.cta.action.includes('custom')">
      <div class="col-12 col-md-6" style="padding-right: 2px">
        <button class="default-btn border rounded px-5 w-100">
          <small><strong>Save Contact</strong></small>
        </button>
      </div>
      <div class="col-12 col-md-6" style="padding-left: 2px">
        <button
          v-if="!custom.link"
          class="cta-btn border rounded px-5 w-100"
          :style="{ background: currentUser.theme?.secondary, color: currentUser.theme?.color }"
        >
          <small style="text-transform: capitalize"><strong>{{ custom.action }}</strong></small>
        </button>
        <a
          v-else
          class="cta-btn d-flex justify-content-center align-items-center border rounded px-5 w-100 h-100"
          :style="{ background: currentUser.theme?.secondary, color: currentUser.theme?.color }"
          :href="custom.link"
          target="_blank"
        >
          <small><strong>{{ custom.action }}</strong></small>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  currentUser: Object
})

const custom = computed(() => {
  const text = props.currentUser.cta.action.split('.')[1];
  const link = props.currentUser.cta.link;
  
  return {
    action: text,
    link: link
  };
})
</script>
<style lang="scss" scoped>

button, a {
  padding: 12px;
}

.default-btn {
  background: transparent;
  &:hover {
    color: #fff;
    background: #000;
  }
}

.cta-btn {
  opacity: 0.9;
  background: #FF643A;
  color: #FFFFFF;
  &:hover {
    opacity: 1;
  }
}
</style>
