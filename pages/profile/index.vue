<template>
  <div class="text-center" v-if="currentUser">
    <div>
      <nuxt-link to="/">home</nuxt-link>
    </div>
    <div>Hello {{ currentUser.displayName }}!</div>
    <div>
      <button @click="logout">logout</button>
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
      if (!user) {
        return navigateTo({
          path: '/login'
        });
      } else {
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

  async function logout() {
    const { auth } = useFirebase();
    await auth.signOut();
  }
</script>
