<template>
  <div v-if="liveProfile">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
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
            <div class="profile-img mx-auto">
              <img :src="liveProfile.profileImage" />
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
import { onAuthStateChanged } from 'firebase/auth'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'

  const nuxtApp = useNuxtApp();
  const errCode = ref();
  const currentUser = ref();
  const contactInfo = ref();
  const modal = ref(false);
  const success = ref();

  const fullName = computed(() => {
    if (liveProfile.value.length === 0) return [];
    return liveProfile.value.displayName.split(' ');
  });

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
        const contactRef = doc(nuxtApp.$firestore, 'contact_info', user.uid)

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

        onSnapshot(contactRef,
          (snap) => {
            contactInfo.value = snap.data()
          },
          (error) => {
            //
          },
        );
      }
    });
  })

  async function logout() {
    await nuxtApp.$auth.signOut()
  }

  function toggleSwitchProfile() {
    modal.value = !modal.value;
  }

  function closeSwitchProfile() {
    modal.value = false;
  }

  async function updateProfile(id) {
    currentUser.value.profile.forEach(async (p) => {
      const existing = p;
      modal.value = false;
      await updateDoc(doc(nuxtApp.$firestore, 'users', currentUser.value.uid), {
        profile: arrayUnion({ ...p, live: p.id === id })
      })
      .then(async () => {
        success.value = 'success';
        setTimeout(() => {
          success.value = null;
        }, 5000);
        await updateDoc(doc(nuxtApp.$firestore, 'users', currentUser.value.uid), {
          profile: arrayRemove(existing)
        })
      })
      .catch((err) => console.log(err));
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
