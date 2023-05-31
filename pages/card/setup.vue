<template>
  <div class="container" v-if="currentUser">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="d-flex justify-content-center position-relative py-3 border-bottom">
          <span
            class="position-absolute"
            style="color: #A1A1A1; cursor: pointer; top: 50%; transform:translateY(-50%); left: 0"
            v-if="step != 1"
            @click="step -= 1"
          >
            <svg width="24" height="24" fill="currentColor" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero" />
            </svg>
          </span>
          <div class="d-flex" style="gap: 6px">
            <span v-for="n in 3" :key="n" :style="{color: step === n ? '#FF643A' : '#E3E3E3'}">
              <svg width="10" height="10" fill="currentColor" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11.998" cy="11.998" fill-rule="nonzero" r="9.998" />
              </svg>
            </span>
          </div>
        </div>
        <div v-if="step === 1" class="mt-4">
          <h3 style="font-weight: 900">
            <span class="position-relative">
            Step 1
            <svg class="position-absolute" style="bottom: 8px" width="8" height="8" fill="#FF643A" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11.998" cy="11.998" fill-rule="nonzero" r="9.998" />
            </svg>
            </span>
            <br />
            Customize your profile link
          </h3>
          <div>
            <label for="profile-link" class="d-block">Profile URL</label>
            <div class="position-relative">
              <span id="default-input" class="position-absolute" style="left: 4px; top: 50%; transform: translateY(-50%); color: #A1A1A1">
                {{ currentUrl + '/' }}
              </span>
              <input id="url-input" class="w-100 border-0 border-bottom py-2" :value="generateRandomSlug()" type="text" @click="handleClick($event)" />
            </div>
          </div>
          <div class="mt-4">
            <button
              class="d-flex align-items-center text-white w-100 justify-content-between border rounded-3 py-2 px-3"
              style="font-weight: 900; background: #FF643A"
              @click="toggleNextStep"
            >
              <small>Next</small>
              <span>
                <svg width="24" height="24" fill="currentColor" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div v-if="step === 2" class="mt-4">
          <h3 style="font-weight: 900">
            <span class="position-relative">
            Step 2
            <svg class="position-absolute" style="bottom: 8px" width="8" height="8" fill="#FF643A" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11.998" cy="11.998" fill-rule="nonzero" r="9.998" />
            </svg>
            </span>
            <br />
            Let’s create your digital card
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, arrayUnion, updateDoc } from 'firebase/firestore';

  const nuxtApp = useNuxtApp()
  const currentUser = ref()
  const step = ref(1)
  const currentUrl = ref()

  onUpdated(() => {
    if (step.value === 1) handleClick()
  })

  onMounted(() => {
    currentUrl.value = window.location.origin

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

  function generateRandomSlug() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const slugLength = 16;
    let slug = '';
  
    for (let i = 0; i < slugLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      slug += characters[randomIndex];
    }
  
    return slug;
  }

  async function createNewProfile() {
    let idCount = currentUser.value.length
    if (idCount === 3) return;

    await updateDoc(doc(nuxtApp.$firestore, 'users', currentUser.value.uid), {
      profile: arrayUnion({
        id: idCount + 1,
        live: false,
        slug: generateRandomSlug(),
        profileLinks: [],
        socialNetwork: [],
      })
    })
  }

  function toggleNextStep() {
    const input = document.querySelector('#url-input')

    if (input.value !== '' || input.value !== null) {
      step.value = 2
    }
  }

  function handleClick(e) {
    const input = document.querySelector('#url-input')
    const el = document.querySelector('#default-input')
    const rec = el.getBoundingClientRect()
    
    input.style.paddingLeft = rec.width + 4 + 'px'
  }

</script>
<style scoped>
#default-input {
  pointer-events: none;
}
</style>
