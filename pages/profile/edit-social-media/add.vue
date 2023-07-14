<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <nuxt-link class="arrow-back" to="/profile/edit-social-media" v-if="!toggleNext">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </nuxt-link>
        <button class="arrow-back bg-transparent border-0" @click="toggleNext = false" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>
        <h1>{{ !toggleNext ? 'Select social network' : 'Enter URL' }}</h1>
        <input type="text" v-model="searchTxt" v-if="!toggleNext" />
      </div>
      <div class="col-md-12" v-if="filteredSocial.length && !toggleNext">
        <div v-for="social in filteredSocial" :key="`social-${social.id}`">
          <div
            class="d-flex p-2 rounded w-50"
            :class="{ 'highlight': social.id === selectedSocial.id}"
            style="cursor: pointer"
            @click="selectedSocial = social"
          >
            <img :src="social.icon" :alt="social.icon" class="h-auto d-block" style="max-width: 20px; margin-right: 18px" />
            <p class="mb-0">{{ social.name }}</p>
          </div>
        </div>
        <div style="position: sticky; bottom: 0px">
          <button
            class="next-btn border-0 px-5 py-2 rounded"
            :class="{ 'disabled': !selectedSocial }"
            @click="nextStep()"
          >
            Next
          </button>
        </div>
      </div>
      <div class="d-flex flex-column w-50" v-if="selected && toggleNext">
        <div class="highlight d-flex p-2 rounded" style="cursor: pointer">
          <img :src="selected.icon" :alt="selected.icon" class="h-auto d-block" style="max-width: 20px; margin-right: 18px" />
          <p class="mb-0">{{ selected.name }}</p>
        </div>
        <small>Paste URL here</small>
        <input type="text" v-model="socialUrl" />
        <button
          class="next-btn border-0 px-5 py-2 rounded"
          :class="{ 'disabled': !socialUrl }"
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
  const socialUrl = ref('');
  const searchTxt = ref('');
  const liveProfile = ref();
  const currentUser = ref();
  const socialNetwork = ref([]);
  const toggleNext = ref(false);
  const selectedSocial = ref({});
  const selected = ref();

  const filteredSocial = computed(() => {
    if (!socialNetwork.value) return [];
    return socialNetwork.value.filter((social) => {
      const name = social.name.toLowerCase();
      const search = searchTxt.value.toLowerCase();
      return name.includes(search);
    })
  })

  onMounted(() => {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));

    const socialRef = doc(nuxtApp.$firestore, 'social_network', 'social_doc');
    onSnapshot(socialRef, (snap) => {
      socialNetwork.value = snap.data().data;
    })
  })

  function nextStep() {
    toggleNext.value = true;
    selected.value = socialNetwork.value.find((social) => {
      return social.id === selectedSocial.value.id;
    });
  }

  const maxOrderCount = computed({
    get() {
      if (!liveProfile.value.socialNetwork.length) return;
      return liveProfile.value.socialNetwork.sort((a, b) => b.order - a.order)[0].order;
    },
    set(newVal) {
      return newVal
    }
  })

  async function addSocialNetwork() {
    const profile = currentUser.value.profile;
    const index = profile.findIndex(item => item.id === liveProfile.value.id);
    profile[index].socialNetwork.push({
      id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())), // generate random id
      socialId: selectedSocial.value.id,
      socialName: selectedSocial.value.name,
      socialIcon: selectedSocial.value.icon,
      url: socialUrl.value,
      order: maxOrderCount.value ? maxOrderCount.value += 1 : 1
    })

    const res = await update(currentUser.value.uid, profile);
    if (res === 'ok') {
      return navigateTo('/profile/edit-social-media');
    }
  }
</script>
<style lang="scss">
</style>
