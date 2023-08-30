<template>
  <div class="alert-modal" v-if="alert.state" :class="alert.state">
    <div class="alert-body d-flex px-3 py-3 rounded" :class="alert.state" style="gap: 16px">
      <span>
        <svg v-if="alert.state == 'success'" fill="#fff" width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero" />
        </svg>
        <svg v-else width="24" height="24" fill="#fff" viewBox="0 0 24 24" focusable="false">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path>
        </svg>
      </span>
      <div class="text-white">
        <div class="text-capitalize"><strong>{{ alert.title }}</strong></div>
        <div>{{ alert.message }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    alert: {
      type: Object
    }
  })
</script>
<style lang="scss" scoped>
.alert-modal {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  transition: all 0.5s ease;
  opacity: 0;
  pointer-events: none;

  &.success,
  &.error {
    opacity: 1;
  }

  .alert-body {
    width: 500px;

    &.success {
      background: #38A169;
    }

    &.error {
      background: #e53e3e;
    }

    span {
      color: #fff;
    }
  }
}
</style>
