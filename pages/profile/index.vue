<template>
  <div v-if="liveProfile">
    <div>
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
        <h2 v-show="fullName[0]">Hi {{ fullName[0] }}!</h2>
        <p>This is your profile where you can make changes anytime. Enjoy making new connections!</p>
      </div>
      
      <div class="profile-details">
        <nuxt-link class="edit-profile-link" to="/profile/edit-card-details">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
          </svg>
        </nuxt-link>
        <div class="profile-cover" style="background: rgb(34, 34, 34)">
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
          <div class="profile-info">
            <h2>
              {{ fullName[0] }}
              <br />
              {{ fullName[1] }}
              <span class="job-title">{{ liveProfile.jobTitle }}</span>
              <span v-if="liveProfile.company"> At {{ liveProfile.company }}</span>
            </h2>
          </div>
        </div>
      </div>
      <div class="user-bio">
        <UserBio :currentUser="liveProfile" />
      </div>
      <div class="social-media">
        <UserSocialMedia :currentUser="liveProfile" />
      </div>
      <div class="links">
        <UserLinks :currentUser="liveProfile" />
      </div>
      <div class="video">
        <UserVideo :currentUser="liveProfile" />
      </div>
      <div class="contact">
        <UserContact :currentUser="liveProfile" :contactInfo="contactInfo" />
      </div>
      <div>
        <button @click="logout">Logout</button>
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
            />
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

  const fullName = computed(() => {
    if (liveProfile.value.length === 0 || !liveProfile.value.displayName) return [];
    return liveProfile.value.displayName.split(' ');
  });

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

  async function edit(user) {
    // const { firestore } = useFirebase();
    // const fullName = `${user.fname} ${user.lname}`;
    // await updateDoc(doc(firestore, 'users', currentUser.value.uid), {
    //   displayName: fullName,
    // }).catch((err) => errCode.value = err.message);
  }
</script>
