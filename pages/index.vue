<template>
  <div class="text-center">
    <h1>Hello {{ currentUser ? currentUser.displayName : 'World' }}!</h1>
    <div>
      <nuxt-link to="/login" v-if="!currentUser">Login</nuxt-link>
      <nuxt-link to="/profile" v-if="currentUser">Go to profile</nuxt-link>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";

  const currentUser = ref();

  onMounted(async () => {
    const { auth, firestore } = useFirebase();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
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