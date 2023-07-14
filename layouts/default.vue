<template>
  <div class="container my-5">
    <main class="row justify-content-center">
      <div class="col-md-6 col-12">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";

const nuxtApp = useNuxtApp()
const route = useRoute()

onBeforeMount(() => {
  onAuthStateChanged(nuxtApp.$auth, (user) => {
    if (user) {
      const docRef = doc(nuxtApp.$firestore, 'users', user.uid)
      onSnapshot(docRef,
        (snap) => {
          const data = snap.data();
          const liveProfile = data.profile.find(profile => profile.live);
          localStorage.setItem('profiles', JSON.stringify({ uid: user.uid, ...data }))
          localStorage.setItem('live-profile', JSON.stringify(liveProfile))
        },
        (error) => {
          //
        },
      );
    }
  })
})
</script>
