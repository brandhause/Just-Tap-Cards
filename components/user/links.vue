<template>
  <div class="my-4">
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>Links</h3>
                <nuxt-link to="/profile/edit-links">edit</nuxt-link>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            
        </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    currentUser: [Array, Object],
  });
</script>
