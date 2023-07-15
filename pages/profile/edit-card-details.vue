<template>
  <div v-if="currentUser">  
    <nuxt-link class="arrow-back" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></nuxt-link>
    <h2 class="edit-heading">Edit Card</h2>
    <UserEdit :edit="edit" v-if="currentUser" :currentUser="liveProfile" />
    <span>{{ errCode }}</span>
  </div>
</template>
<script setup>
import { uploadString, getDownloadURL, ref as storageRef } from "firebase/storage";
import useFirestore from '~/composables/useFirestore.ts';
  
  const { update } = useFirestore();
  const liveProfile = ref();
  const currentUser = ref();
  const toggleEdit = ref(false);
  const errCode = ref();

  const nuxtApp = useNuxtApp();

  onMounted(() => {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));
  })

  async function edit(user, file) {
    const profile = currentUser.value.profile;
    const index = profile.findIndex(item => item.id === liveProfile.value.id);

    profile[index].displayName = user.fname + ' ' + user.lname;
    profile[index].jobTitle = user.jobTitle;
    profile[index].company = user.company;
    profile[index].industryOrCategoryOfWork = user.industryOrCategoryOfWork;

    await update(currentUser.value.uid, profile)
      .then((res) => {
        if (res !== 'ok') {
          errCode.value = res;
        }
      })
  }
</script>
