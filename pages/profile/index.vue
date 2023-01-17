<template>
  <div class="text-center" v-if="currentUser">
    <div>
      <nuxt-link to="/">Home</nuxt-link>
    </div>
    <div>
      Hello {{ currentUser.displayName }}!
      <button @click="toggleEdit = !toggleEdit">
        {{ toggleEdit ? 'Cancel' : 'Edit' }}
      </button>
    </div>
    <div v-if="toggleEdit">
      <UserEdit :edit="edit" :currentUser="currentUser" />
      <span>{{ errCode }}</span>
    </div>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

  const currentUser = ref();
  const toggleEdit = ref(false);
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
