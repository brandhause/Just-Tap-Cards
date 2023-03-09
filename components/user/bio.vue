<template>
  <div class="my-4">
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>About</h3>
                <nuxt-link to="/profile/edit-bio">edit</nuxt-link>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <p>{{ currentUser.bio }}</p>
        </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    currentUser: [Array, Object],
  });
</script>
