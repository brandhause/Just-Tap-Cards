<template>
  <div v-if="currentUser">  
    <nuxt-link class="arrow-back" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></nuxt-link>
    <h2 class="edit-heading">Edit Card</h2>
    <digital-card edit :details="details"></digital-card>
    <div class="mt-5 mb-4">
      <button
        class="next-btn d-flex align-items-center text-white w-100 justify-content-center border rounded-3 py-2 px-3"
        :disabled="details.firstName === '' || details.lastName === ''"
        :class="{ disabled: details.firstName === '' || details.lastName === ''}"
        style="font-weight: 900; background: #FF643A"
        @click="saveProfile"
      >
        <small>Save</small>
      </button>
    </div>
    <!-- <UserEdit :edit="edit" v-if="currentUser" :currentUser="liveProfile" /> -->
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
  const details = ref({
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    industryOrCategoryOfWork: '',
    theme: '',
    cropped: {}
  });

  onMounted(() => {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));

    const name = liveProfile.value.displayName.split(' ');
    details.value = {
      firstName: name[0] || '',
      lastName: name[1] || '',
      jobTitle: liveProfile.value.jobTitle || '',
      company: liveProfile.value.company || '',
      industryOrCategoryOfWork: liveProfile.value.industryOrCategoryOfWork || '',
      theme: liveProfile.value.theme || '',
      cropped: {
        url: liveProfile.value.profileImage
      }
    }
  })

  async function saveProfile() {
    const profile = currentUser.value.profile;
    const index = profile.findIndex(item => item.id === liveProfile.value.id);

    profile[index].displayName = details.value.firstName + ' ' + details.value.lastName;
    profile[index].jobTitle = details.value.jobTitle;
    profile[index].company = details.value.company;
    profile[index].industryOrCategoryOfWork = details.value.industryOrCategoryOfWork;
    profile[index].theme = details.value.theme;

    if (details.value.cropped.file) {
      const imgRef = storageRef(nuxtApp.$storage, `images/${currentUser.value.uid}/${details.value.cropped.file.name}`);
      uploadString(imgRef, details.value.cropped.url, 'data_url').then(() => {
        getDownloadURL(imgRef).then(async (url) => {
          profile[index].profileImage = url;
          
          await update(currentUser.value.uid, profile)
          .then((res) => {
            if (res !== 'ok') {
              errCode.value = res;
            }
          })
        })
      })
    } else {
      await update(currentUser.value.uid, profile)
        .then((res) => {
          if (res !== 'ok') {
            errCode.value = res;
          }
        })
    }
  }
</script>
