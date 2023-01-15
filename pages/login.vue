<template>
  <div>
    <div class="text-center">
      <nuxt-link to="/">home</nuxt-link>
    </div>
    <SignIn v-if="!getQuery"></SignIn>
    <SignUp v-if="getQuery"></SignUp>
  </div>
</template>
<script setup>
  const route = useRoute();

  const getQuery = computed(() => {
    if (!route && !route.query) return false;
    return route.query.signup;
  });
</script>
