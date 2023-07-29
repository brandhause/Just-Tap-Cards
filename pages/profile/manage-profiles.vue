<template>
  <div v-if="currentUser">
    <div>
      <nuxt-link class="arrow-back" to="/profile">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </nuxt-link>
      <div>
        <h3 style="font-weight: 900">Manage Profiles</h3>
        <div class="row mx-0 col-12 px-0 border-bottom">
          <div class="col-3 px-0 py-2">
            <h4 style="font-weight: 900">Individual</h4>
          </div>
        </div>
        <div>
          <div>
            <small><strong>Live card now</strong></small>
          </div>
          <select class="w-100 py-2 border-0 border-bottom" v-model="profileId">
            <option :value="profile.id" v-for="profile in currentUser.profile" :key="profile.id">
              {{ profile.slug }}
            </option>
          </select>
          <div v-for="profile in currentUser.profile" :key="profile.id" class="mt-4">
            <div
              class="d-flex align-items-stretch position-relative"
              style="border-radius: 20px"
              @click="changeProfile(profile.id)"
            >
              <div
                class="profile-img mx-auto d-flex"
                style="flex: 0 0 275px; height: 375px; border-radius: 20px 0 0 20px"
              >
                <img v-if="profile.profileImage" :src="profile.profileImage" />
                <span v-else class="w-100 mt-auto">
                  <svg width="100%" height="227.33333333333331" viewBox="0 0 122 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M61.0005 79C79.2248 79 94 61.3154 94 39.5002C94 17.6846 89.1491 0 61.0005 0C32.8518 0 28 17.6846 28 39.5002C28 61.3154 42.7752 79 61.0005 79Z" fill="#686868"></path><path opacity="0.4" d="M121.932 138.151C121.334 99.8308 116.405 88.9117 78.6861 82C78.6861 82 73.3766 88.8694 61.0014 88.8694C48.6261 88.8694 43.3157 82 43.3157 82C6.00888 88.8363 0.7801 99.5934 0.0925852 136.906C0.036209 139.953 0.0100836 140.113 0 139.759C0.00229172 140.422 0.0925852 160 0.0925852 160H61H122C122 160 121.999 141.457 122 140.807C121.99 141.026 121.97 140.602 121.932 138.151Z" fill="#686868"></path>
                  </svg>
                </span>
              </div>
              <div
                class="profile-info d-flex align-items-center text-white"
                style="flex: 1; padding: 0 20px; border-radius: 0 20px 20px 0"
                :style="{ background: profile.theme ? profile.theme.background : '#000' }"
              >
                <h2 :style="{ color: profile.theme ? profile.theme.color : '#fff' }">
                  {{ profile.displayName }}
                  <br />
                  <span
                    style="font-weight: 400; font-size: 21px; line-height: 23px"
                    :style="{ color: profile.theme ? profile.theme.altColor : '#fff' }"
                  >
                    {{ profile.jobTitle }}
                  </span>
                  <span
                    style="font-weight: 400; font-size: 21px; line-height: 23px"
                    :style="{ color: profile.theme ? profile.theme.altColor : '#fff' }"
                    v-if="profile.company"
                  >
                    At {{ profile.company }}
                  </span>
                </h2>
              </div>
              <div
                v-if="profile.live"
                class="position-absolute text-white px-2 rounded"
                style="right: 16px; top: 16px; background: #3EB244"
              >
                <small class="text-uppercase">Live</small>
              </div>
              <div
                v-if="!profile.live"
                class="position-absolute d-flex align-items-center justify-content-center text-white rounded-circle"
                style="right: -20px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: #686868; cursor: pointer"
                @click.stop="removeProfile(profile)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                  <path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm-14-2.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5h-14v16.5zm5-18.5h4v-1h-4v1z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <nuxt-link
              v-if="currentUser.profile.length < 3"
              to="/card/setup"
              class="d-flex w-100 justify-content-between border rounded"
              style="padding: 30px 16px; box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.12); font-weight: 900"
            >
              Create New Profile
              <span style="color: #FF643A">
                <svg height="20" width="20" fill="currentColor" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero" />
                </svg>
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore';
import useFirestore from '~/composables/useFirestore.ts';

  const { update } = useFirestore();  
  const nuxtApp = useNuxtApp();
  const currentUser = ref();
  const liveProfile = ref();
  const profileId = ref();

  watch(() => profileId.value, (newVal, oldVal) => {
    if (oldVal !== undefined && newVal !== oldVal) {
      changeProfile(newVal)
    }
  })

  onMounted(async () => {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));
    profileId.value = liveProfile.value.id;
  })

  async function changeProfile(id) {
    const profile = currentUser.value;
    profile.profile.forEach(async (p) => {
      p.live = p.id === id;
    })

    await update(currentUser.value.uid, profile.profile)
      .then((res) => {
        if (res === 'ok') {
          return navigateTo('/profile');
        }
      })
  }

  async function removeProfile(profile) {
    try {
      await updateDoc(doc(nuxtApp.$firestore, 'users', currentUser.value.uid), {
        profile: arrayRemove(profile)
      }).then(async () => {
        const contactRef = doc(nuxtApp.$firestore, 'contact_info', profile.slug)
        await deleteDoc(contactRef)
          .then(() => {
            return navigateTo('/profile');
          });
      })
    } catch (error) {
      console.log(error)
    }
  }
</script>
