<template>
  <div v-if="currentUser">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div>
            <nuxt-link to="/">Home</nuxt-link>
          </div>
          Hello {{ currentUser.displayName }}!
          <div class="profile-details">
            <div class="profile-img mx-auto" style="width: 100%; height: auto">
              <img :src="currentUser.profileImage" />
            </div>
            <div class="profile-info">
              <h2>{{ currentUser.displayName }}</h2>
              <p>
                <span class="job-title">{{ currentUser.jobTitle }}</span>
                <span v-if="currentUser.company"> At {{ currentUser.company }}</span>
                </p>
            </div>
          </div>
          <div>
            <nuxt-link to="/profile/edit-card-details">Edit profile</nuxt-link>
          </div>
          <div class="user-bio">
            <UserBio :currentUser="currentUser" />
          </div>
          <div class="social-media">
            <UserSocialMedia />
          </div>
          <div>
            <button @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

  const currentUser = ref();
  const errCode = ref();

  onMounted(async () => {
    const { auth, firestore } = useFirebase();

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigateTo({
          path: '/'
        });
      } else {
        const docRef = doc(firestore, 'users', user.uid);
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

  async function logout() {
    const { auth } = useFirebase();
    await auth.signOut();
  }

  async function edit(user) {
    const { firestore } = useFirebase();
    const fullName = `${user.fname} ${user.lname}`;
    await updateDoc(doc(firestore, 'users', currentUser.value.uid), {
      displayName: fullName,
    }).catch((err) => errCode.value = err.message);
  }
</script>
