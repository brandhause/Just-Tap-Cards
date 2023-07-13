<template>
  <div v-if="currentUser">
    <nuxt-link class="arrow-back" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></nuxt-link>
    <h2 class="edit-heading">Edit Video</h2>
    <UserEditVideo :editVideo="editVideo" :currentUser="liveProfile" />
  </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import useFirestore from '~/composables/useFirestore.ts';

  const { update } = useFirestore();
  const liveProfile = ref();
  const currentUser = ref();
  const toggleEdit = ref(false);
  const errCode = ref();
  const nuxtApp = useNuxtApp();

  onMounted(async () => {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));
  })

  async function logout() {
    await nuxtApp.$auth.signOut();
  }

  async function editVideo(user) {
    const profile = currentUser.value.profile;
    const index = profile.findIndex(item => item.id === liveProfile.value.id);
    profile[index].video = user.video;
    profile[index].videoDescription = user.videoDescription

    await update(currentUser.value.uid, profile)
  }
</script>