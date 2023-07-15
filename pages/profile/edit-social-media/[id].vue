<template>
  <div class="container">
    <div class="row" v-if="currentUser">
      <div class="col-md-12">
        <nuxt-link class="arrow-back" to="/profile/edit-social-media">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </nuxt-link>
        <h1>Enter URL</h1>
      </div>
      <div class="d-flex flex-column w-50" v-if="social">
        <div class="highlight d-flex p-2 rounded" style="cursor: pointer">
          <img :src="social.icon" :alt="social.icon" class="h-auto d-block" style="max-width: 20px; margin-right: 18px" />
          <p class="mb-0">{{ social.name }}</p>
        </div>
        <small>Paste URL here</small>
        <input type="text" v-model="socialUrl" />
        <button
          class="next-btn border-0 px-5 py-2 rounded"
          :class="{ 'disabled': socialUrl === filteredSocial.url }"
          @click="addSocialNetwork"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { doc, onSnapshot } from "firebase/firestore";
import useFirestore from '~/composables/useFirestore.ts';

  definePageMeta({
    middleware: ['auth']
  });
  
  const { update } = useFirestore();
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const id = ref();
  const socialUrl = ref();
  const socialNetworks = ref([]);
  const liveProfile = ref();
  const currentUser = ref();

  const social = computed(() => {
    if (!socialNetworks.value && !filteredSocial.value) return [];
    return socialNetworks.value.find((s) => {
      return s.id === filteredSocial.value.socialId;
    })
  })

  const filteredSocial = computed(() => {
    if (!liveProfile.value) return [];
    return liveProfile.value.socialNetwork.find((s) => {
      return s.id === +route.params.id; // convert to number
    });
  })

  onMounted(() => {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));

    const socialRef = doc(nuxtApp.$firestore, 'social_network', 'social_doc');
    onSnapshot(socialRef, (snap) => {
      socialNetworks.value = snap.data().data;
    })

    socialUrl.value = socialUrl.value || filteredSocial.value.url;
  })

  async function addSocialNetwork() {
    const profile = currentUser.value.profile;
    const index = profile.findIndex(item => item.id === liveProfile.value.id);
    profile[index].socialNetwork.find(social => social.id === +route.params.id).url = socialUrl.value;
    
    const res = await update(currentUser.value.uid, profile);
    if (res === 'ok') {
      return navigateTo('/profile/edit-social-media');
    }
  }
</script>
