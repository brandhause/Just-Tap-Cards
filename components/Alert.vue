<template>
  <div class="alert-modal" v-if="state" :class="state">
    <div class="alert-body d-flex px-3 py-3 rounded" style="gap: 16px">
      <span>
        <svg fill="#fff" width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero" />
        </svg>
      </span>
      <div class="text-white">
        <div><strong>Success</strong></div>
        <div>Live profile has been changed successfully</div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    state: {
      type: String,
    },
  })
</script>
<style lang="scss">
.alert-modal {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  transition: all 0.5s ease;
  opacity: 0;

  &.success {
    opacity: 1;
  }

  .alert-body {
    background: #38A169;
    width: 500px
  }
}
</style>
