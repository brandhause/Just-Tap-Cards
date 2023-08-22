<template>
  <div v-if="liveProfile">
    <div class="position-relative">
      <div class="dialog border-top px-3 py-4" v-if="dialog">
        <div class="dialog-header p-3 rounded">
          <small>{{ email }}</small>
          <span>PLUS+</span>
        </div>
        <div class="row mx-0 col-12 px-0">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <nuxt-link class="d-flex w-100" to="/">
              <span class="d-flex align-items-center justify-content-center" style="height: 4rem; width: 4rem">
                <svg stroke="#a1a1a1" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-118pdk6" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <h6 class="d-flex w-100 align-items-center m-0" style="font-weight: 600">Change Email</h6>
            </nuxt-link>
            <svg stroke="#d4d4d4" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#D4D4D4" height="24" width="24" xmlns="http://www.w3.org/2000/svg" style="">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <div class="col-12 d-flex justify-content-between align-items-center border-bottom">
            <nuxt-link class="d-flex w-100" to="/">
              <span class="d-flex align-items-center justify-content-center" style="height: 4rem; width: 4rem">
                <svg stroke="#a1a1a1" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-118pdk6" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
              </span>
              <h6 class="d-flex w-100 align-items-center m-0" style="font-weight: 600">Change Password</h6>
            </nuxt-link>
            <svg stroke="#d4d4d4" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#D4D4D4" height="24" width="24" xmlns="http://www.w3.org/2000/svg" style="">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
        <div class="row mx-0 col-12 px-0 mt-auto">
          <button
            class="dialog-header logout-btn d-flex justify-content-center align-items-center text-center p-3 border rounded"
            style="gap: 12px"
            @click="logout"
          >
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
              <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
            </svg>
            <small><strong>Log Out</strong></small>
          </button>
        </div>
        <div class="row mx-0 col-12 px-0 mt-5">
          <button
            class="d-flex justify-content-start align-items-center text-left p-3 border-0 bg-transparent"
            style="gap: 12px; color: red"
          >
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
            </svg>
            Delete Account
          </button>
        </div>
      </div>
      <div class="hamburger position-absolute" style="top: -35px; left: 0">
        <button class="bg-transparent border-0" @click="dialog = !dialog">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
          </svg>
        </button>
      </div>
      <div class="position-absolute" style="top: -35px; right: 0">
        <nuxt-link :to="`/preview/${liveProfile.slug}`" class="d-flex align-items-center text-black px-4 py-1 border rounded" style="gap: 7px">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <small><strong>Public View</strong></small>
        </nuxt-link>
      </div>
      <div v-if="!dialog">
        <div class="text-center">
          <button
            class="d-flex align-items-center border-0 bg-transparent mx-auto"
            @click="toggleSwitchProfile"
          >
            Switch Profile
            <svg width="16" height="8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
              <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
            </svg>
          </button>
        </div>
        <div class="welcome-text">
          <h1 v-show="fullName[0]">Hi {{ fullName[0] }}!</h1>
          <p>This is your profile where you can make changes anytime. Enjoy making new connections!</p>
        </div>
        
        <div class="profile-details">
          <nuxt-link class="edit-profile-link" to="/profile/edit-card-details">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
          </nuxt-link>
          <div
            class="profile-cover"
            :style="{ background: liveProfile.theme ? liveProfile.theme.secondary : 'rgb(34, 34, 34)' }"
          >
            <div></div>
          </div>
          <div class="position-relative d-flex mx-3" style="background: rgb(41, 41, 41); border-radius: 35px; top: -65px">
            <div class="profile-img mx-auto d-flex">
              <img v-if="liveProfile.profileImage" :src="liveProfile.profileImage" />
              <span v-else class="w-100 mt-auto">
                <svg width="100%" height="227.33333333333331" viewBox="0 0 122 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M61.0005 79C79.2248 79 94 61.3154 94 39.5002C94 17.6846 89.1491 0 61.0005 0C32.8518 0 28 17.6846 28 39.5002C28 61.3154 42.7752 79 61.0005 79Z" fill="#686868"></path><path opacity="0.4" d="M121.932 138.151C121.334 99.8308 116.405 88.9117 78.6861 82C78.6861 82 73.3766 88.8694 61.0014 88.8694C48.6261 88.8694 43.3157 82 43.3157 82C6.00888 88.8363 0.7801 99.5934 0.0925852 136.906C0.036209 139.953 0.0100836 140.113 0 139.759C0.00229172 140.422 0.0925852 160 0.0925852 160H61H122C122 160 121.999 141.457 122 140.807C121.99 141.026 121.97 140.602 121.932 138.151Z" fill="#686868"></path>
                </svg>
              </span>
            </div>
            <div
              class="profile-info"
              :style="{ background: liveProfile.theme ? liveProfile.theme.background : '#000000' }"
            >
              <h2 :style="{ color: liveProfile.theme ? liveProfile.theme.color : '#ffffff' }">
                {{ fullName[0] }}
                <br />
                {{ fullName[1] }}
                <span class="job-title" :style="{ color: liveProfile.theme ? liveProfile.theme.altColor : '#ffffff' }">
                  {{ liveProfile.jobTitle }}
                </span>
                <span v-if="liveProfile.company" :style="{ color: liveProfile.theme ? liveProfile.theme.altColor : '#ffffff' }">
                  At {{ liveProfile.company }}
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div>
          <UserCta :currentUser="liveProfile" />
        </div>
        <hr />
        <div class="user-bio">
          <UserBio :currentUser="liveProfile" />
        </div>
        <hr />
        <div class="social-media">
          <UserSocialMedia :currentUser="liveProfile" />
        </div>
        <hr />
        <div class="links">
          <UserLinks :currentUser="liveProfile" />
        </div>
        <hr />
        <div class="video">
          <UserVideo :currentUser="liveProfile" />
        </div>
        <hr />
        <div class="contact">
          <UserContact :currentUser="liveProfile" :contactInfo="contactInfo" />
        </div>
      </div>
    </div>
    <Modal radius="8px 8px 0 0" align="end" v-if="modal" @closeModal="closeSwitchProfile">
      <div class="d-flex flex-column h-100">
        <h4 class="mb-0 mt-3" style="font-weight: 900">Switch Profile</h4>
        <small>Your cards are linked to your LIVE profile. To switch your LIVE profile, select a profile below.</small>
        <div
          class="d-flex align-items-center mt-3"
          style="gap: 10px; cursor: pointer"
          v-for="profile in currentUser.profile"
          :key="profile.id"
          @click="updateProfile(profile.id)"
        >
          <div style="width: 40px; height: 40px">
            <img
              :src="profile.profileImage"
              width="40"
              height="40"
              style="object-fit: cover; max-width: 100%; border-radius: 4px"
              v-if="profile.profileImage"
            />
            <svg v-else width="100%" height="100%" viewBox="0 0 122 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M61.0005 79C79.2248 79 94 61.3154 94 39.5002C94 17.6846 89.1491 0 61.0005 0C32.8518 0 28 17.6846 28 39.5002C28 61.3154 42.7752 79 61.0005 79Z" fill="#686868"></path><path opacity="0.4" d="M121.932 138.151C121.334 99.8308 116.405 88.9117 78.6861 82C78.6861 82 73.3766 88.8694 61.0014 88.8694C48.6261 88.8694 43.3157 82 43.3157 82C6.00888 88.8363 0.7801 99.5934 0.0925852 136.906C0.036209 139.953 0.0100836 140.113 0 139.759C0.00229172 140.422 0.0925852 160 0.0925852 160H61H122C122 160 121.999 141.457 122 140.807C121.99 141.026 121.97 140.602 121.932 138.151Z" fill="#686868"></path>
            </svg>
          </div>
          <div>
            <small><strong>/{{ profile.slug }}</strong></small>
            <div class="text-capitalize">{{ profile.displayName }}</div>
          </div>
          <div v-show="profile.live" class="text-white px-2 rounded" style="background: #3EB244; margin-left: auto">
            <small class="text-uppercase">Live</small>
          </div>
        </div>
        <nuxt-link
          to="/profile/manage-profiles"
          class="border w-100 bg-transparent rounded py-2 mt-auto text-center"
          style="font-weight: 900"
        >
          <small>Manage Profiles</small>
        </nuxt-link>
      </div>
    </Modal>
    <Alert :state="success"></Alert>
  </div>
</template>
<script setup>
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import useFirestore from '~/composables/useFirestore.ts';

  const { update } = useFirestore();
  const nuxtApp = useNuxtApp();
  const errCode = ref();
  const currentUser = ref();
  const contactInfo = ref();
  const modal = ref(false);
  const success = ref();
  const liveProfile = ref();
  const dialog = ref(false);

  const fullName = computed(() => {
    if (liveProfile.value.length === 0 || !liveProfile.value.displayName) return [];
    return liveProfile.value.displayName.split(' ');
  });

  const email = computed(() => {
    return getAuth().currentUser.email;
  })

  function refresh() {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));
    
    const contactRef = doc(nuxtApp.$firestore, 'contact_info', liveProfile.value.slug);

    onSnapshot(contactRef,
      (snap) => {
        contactInfo.value = snap.data()
      },
      (error) => {
        //
      },
    );
  }

  onMounted(async () => {
    refresh();
  })

  async function logout() {
    await nuxtApp.$auth.signOut()
    localStorage.removeItem('profiles')
    localStorage.removeItem('live-profile')
    return navigateTo('/')
  }

  function toggleSwitchProfile() {
    modal.value = !modal.value;
  }

  function closeSwitchProfile() {
    modal.value = false;
  }

  async function updateProfile(id) {
    const profile = currentUser.value;
    profile.profile.forEach(async (p) => {
      p.live = p.id === id;
    })

    await update(currentUser.value.uid, profile.profile)
      .then((res) => {
        if (res === 'ok') {
          refresh();
          modal.value = false;
          success.value = 'success';
          
          setTimeout(() => {
            success.value = null;
          }, 5000);
        }
      })
  }
</script>
<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 109vh;
  background: #FFFFFF;
  z-index: 2;

  a {
    color: #1a202c;
  }

  .dialog-header {
    background: #f5f5f5;
    color: #686868;
    display: flex;
    justify-content: space-between;

    span,
    small {
      line-height: 1.5;
    }

    span {
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 500;
      color: #000000;
    }
  }

  .logout-btn {
    transition: all 0.3s ease;
    color: #000;
    background: transparent;

    &:hover {
      color: #fff;
      background: #000;
    }
  }
}
hr {
  border-width: 6px;
  border-image: initial;
  border-color: inherit;
  border-style: solid;
  width: 100%;
  opacity: 0.6;
  color: #f5f5f5;
}
</style>
