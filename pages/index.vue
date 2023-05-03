<template>
  <div class="text-center">
    <h1 v-show="currentUser">Hello {{ currentUser ? currentUser.displayName : 'World' }}!</h1>
    <div v-show="currentUser">
      <nuxt-link to="/profile">View Profile</nuxt-link>
    </div>
    <div v-show="!currentUser">
      <UserSignIn v-if="!getQuery"></UserSignIn>
      <UserSignUp v-if="getQuery"></UserSignUp>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";

  const currentUser = ref();
  const nuxtApp = useNuxtApp();
  const route = useRoute();

  const getQuery = computed(() => {
    if (!route && !route.query) return false;
    return route.query.signup;
  });

  onMounted(async () => {
    onAuthStateChanged(nuxtApp.$auth, (user) => {
      if (user) {
        const docRef = doc(nuxtApp.$firestore, 'users', user.uid);
        onSnapshot(docRef,
          (snap) => {
            currentUser.value = {
              uid: user.uid,
              ...snap.data()
            }
          },
          (error) => {
            //
          },
        );
      }
    });
  })
</script>