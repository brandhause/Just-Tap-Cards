<template>
  <div v-if="currentUser">
    <div>
      <nuxt-link class="arrow-back" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></nuxt-link>
      <h2 class="edit-heading">Edit about</h2>
      <UserEditBio :editBio="editBio" :currentUser="liveProfile" />
    </div>
  </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

  const currentUser = ref();
  const toggleEdit = ref(false);
  const errCode = ref();

  const nuxtApp = useNuxtApp();

  const liveProfile = computed(() => {
    if (!currentUser.value || !currentUser.value.profile) return [];
    return currentUser.value.profile.find((u) => u.live);
  })

  onMounted(async () => {
    onAuthStateChanged(nuxtApp.$auth, (user) => {
      if (!user) {
        return navigateTo({
          path: '/'
        });
      } else {
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

  async function editBio(user) {
    const profile = currentUser.value.profile;
    const index = profile.findIndex(item => item.id === liveProfile.value.id);
    profile[index].bio = user.bio;
    await updateDoc(doc(nuxtApp.$firestore, 'users', currentUser.value.uid), {
      profile: profile,
    }).catch((err) => errCode.value = err.message);
  }
</script>