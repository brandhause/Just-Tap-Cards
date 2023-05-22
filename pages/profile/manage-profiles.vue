<template>
  <div v-if="currentUser">
    <div class="container my-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
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
                <select name="" id="" class="w-100 py-2 border-0 border-bottom">
                  <option value="" v-for="profile in currentUser.profile" :key="profile.id">
                    {{ profile.slug }}
                  </option>
                </select>
                <div v-for="profile in currentUser.profile" :key="profile.id" class="mt-3">
                  <div
                    class="d-flex align-items-stretch position-relative"
                    style="border-radius: 20px"
                  >
                    <div
                      class="profile-img mx-auto"
                      style="flex: 0 0 275px; height: 375px; border-radius: 20px 0 0 20px"
                    >
                      <img :src="profile.profileImage" class="h-100 w-100" style="border-radius: 20px 0 0 20px" />
                    </div>
                    <div
                      class="profile-info d-flex align-items-center text-white"
                      style="flex: 1; padding: 0 20px; background-color: #000; border-radius: 0 20px 20px 0"
                    >
                      <h2>
                        {{ profile.displayName }}
                        <span class="job-title">{{ profile.jobTitle }}</span>
                        <span v-if="profile.company"> At {{ profile.company }}</span>
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
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm-14-2.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5h-14v16.5zm5-18.5h4v-1h-4v1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

  const nuxtApp = useNuxtApp();
  const currentUser = ref();

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
</script>
