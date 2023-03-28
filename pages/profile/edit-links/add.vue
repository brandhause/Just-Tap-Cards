<template>
  <div class="container">
    <div class="row">
        <nuxt-link class="arrow-back" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></nuxt-link>
      <div class="d-flex flex-column w-50">
        <input type="text" v-model="textLink"/>
        <small>Paste URL here</small>
        <input type="text" v-model="linkURL" />
        <button
          class="next-btn border-0 px-5 py-2 rounded"
          :class="{ 'disabled': !linkURL }"
          @click="addLink"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

  const linkURL = ref('');
  const textLink = ref('');
  const linkThumbnail = ref('');
  const currentUser = ref();
  const selected = ref();

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

        // const docRef = doc(firestore, 'users', user.uid);
        // onSnapshot(docRef, (snap) => {
        //   profileLinks.value = snap.data().data;
        // })
      }
    });
  })

  async function addLink() {
    const { firestore } = useFirebase();
    await updateDoc(doc(firestore, 'users', currentUser.value.uid), {
      profileLinks: arrayUnion({
        id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())), // generate random id
        linkThumbnail: linkThumbnail.value,
        linktext: textLink.value,
        linkURL: linkURL.value 
      }),
    })
    .then(() => {
      return navigateTo('/profile/edit-links');
    })
    .catch((err) => console.log(err.message));
  }
</script>
<style lang="scss">
.highlight {
  font-weight: 700;
  color: #ff643a;
  background: #f5f5f5;
}

.disabled {
  background: #d4d4d4 !important;
  pointer-events: none;
}

.next-btn {
  font-weight: 700;
  color: #ffffff;
  background: #ff643a;
}
</style>
