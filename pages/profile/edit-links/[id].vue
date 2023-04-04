<template>
  <div class="container">
    <div class="row" v-if="currentUser">
      <div class="col-md-12">
        <nuxt-link class="arrow-back" to="/profile/edit-links">
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
          :class="{ 'disabled': !socialUrl }"
          @click="addSocialNetwork(social)"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

  const route = useRoute();
  const id = ref();
  const socialUrl = ref('');
  const socialNetworks = ref([]);
  const currentUser = ref();

  const social = computed(() => {
    if (!socialNetworks.value && !filteredSocial.value) return [];
    return socialNetworks.value.find((s) => {
      return s.id === filteredSocial.value.socialId;
    })
  })

  const filteredSocial = computed(() => {
    if (!currentUser.value) return [];
    return currentUser.value.socialNetwork.find((s) => {
      return s.id === +route.params.id; // convert to number
    });
  })

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
              socialUrl.value = filteredSocial.value.url;
            },
            (error) => {
              //
            },
        );
        
        const socialRef = doc(firestore, 'social_network', 'social_doc');
        onSnapshot(socialRef, (snap) => {
          socialNetworks.value = snap.data().data;
        })
      }
    });

  })

  async function addSocialNetwork(social) {
    const { firestore } = useFirebase();
    const socialRef = doc(firestore, 'users', currentUser.value.uid);

    const existingSocial = JSON.stringify({
      id: +route.params.id,
      socialId: +social.id,
      socialName: social.name,
      socialIcon: social.icon,
      url: filteredSocial.value.url
    });

    const newSocial = JSON.stringify({
      id: +route.params.id,
      socialId: +social.id,
      socialName: social.name,
      socialIcon: social.icon,
      url: socialUrl.value
    });

    // add new object to array with the same id
    await updateDoc(socialRef, {
      profileLinks: arrayUnion({
        id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())), // generate random id
        linkThumbnail: linkThumbnail.value,
        linktext: textLink.value,
        linkURL: linkURL.value 
      }),
    }).then(() => {
      return navigateTo('/profile/edit-links');
    })
    .catch((err) => console.log(err.message));

    // remove existing array object
    if (existingSocial !== newSocial) {
      await updateDoc(socialRef, {
        profileLinks: arrayUnion({
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())), // generate random id
          linkThumbnail: linkThumbnail.value,
          linktext: textLink.value,
          linkURL: linkURL.value 
        }),
      })
    }
  }
</script>
