<template>
  <div v-if="currentUser">
    <div class="position-sticky bg-white" style="top: 0">
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
          <input id="url-input" class="w-100 border-0 border-bottom py-2" v-model="profileSlug" type="text" @click="handleClick($event)" />
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
      <DigitalCard :details="details" />
      <div class="my-4">
        <button
          :disabled="details.firstName === '' || details.lastName === ''"
          :class="{ disabled: details.firstName === '' || details.lastName === ''}"
          class="next-btn d-flex align-items-center text-white w-100 justify-content-between border rounded-3 py-2 px-3"
          style="font-weight: 900; background: #FF643A"
          @click="toggleLastStep"
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
    <div v-if="step === 3" class="mt-4">
      <h3 style="font-weight: 900">
        <span class="position-relative">
        Step 3
        <svg class="position-absolute" style="bottom: 8px" width="8" height="8" fill="#FF643A" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11.998" cy="11.998" fill-rule="nonzero" r="9.998" />
        </svg>
        </span>
        <br />
        Add contact information
      </h3>
      <div>
        <InputsPhoneInput v-model="contact.phone" :types="phoneType" />
      </div>
      <div>
        <h5>Email</h5>
        <InputsEmailInput v-model="contact.email" />
      </div>
      <div>
        <h5>Website</h5>
        <InputsWebsiteInput v-model="contact.website" />
      </div>
      <div>
        <h5>Address</h5>
        <InputsAddressInput v-model="contact.address" :types="addressType" />
      </div>
      <div class="mt-5 mb-4">
        <button
          class="d-flex align-items-center text-white w-100 justify-content-center border rounded-3 py-2 px-3"
          style="font-weight: 900; background: #FF643A"
          @click="createNewProfile"
        >
          <small>Done!</small>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { doc, arrayUnion, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { uploadString, getDownloadURL, ref as storageRef } from "firebase/storage";

  definePageMeta({
    layout: "preview",
  });

  const nuxtApp = useNuxtApp()
  const currentUser = ref()
  const liveProfile = ref()
  const step = ref(1)
  const currentUrl = ref()
  const profileSlug = ref()
  const phoneType = ref([])
  const addressType = ref([])
  const details = ref({
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    bio: '',
    industryOrCategoryOfWork: '',
    theme: '',
    cropped: {}
  })
  const contact = ref({
    address: [
      {
        id: 1,
        order: 1,
        type: 'Location',
        streetLine1: '',
        streetLine2: '',
        city: '',
        state: '',
        postCode: '',
        country: '',
      },
    ],
    email: [
      { id: 1, order: 1, email: ''},
    ],
    website: [
      { id: 1, order: 1, url: ''},
    ],
    phone: [
      { id: 1, order: 1, type: 1, value: '' },
    ]
  })

  onUpdated(() => {
    if (step.value === 1) {
      handleClick()
    }
  })

  onMounted(() => {
    currentUrl.value = window.location.origin;
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));
    profileSlug.value = generateRandomSlug();

    const phoneRef = doc(nuxtApp.$firestore, 'phone', 'data')
    const addressRef = doc(nuxtApp.$firestore, 'address_type', 'data')

    onSnapshot(phoneRef,
      (snap) => {
        phoneType.value = snap.data().data
      },
      (error) => {
        //
      },
    );

    onSnapshot(addressRef,
      (snap) => {
        addressType.value = snap.data().data
      },
      (error) => {
        //
      },
    );
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
    const imgRef = storageRef(nuxtApp.$storage, `images/${currentUser.value.uid}/${details.value.cropped.file.name}`);
    // upload cropped url
    uploadString(imgRef, details.value.cropped.url, 'data_url').then(() => {
      // download url from firebase
      getDownloadURL(imgRef).then(async (url) => {
        // update profile document
        await updateDoc(doc(nuxtApp.$firestore, 'users', currentUser.value.uid), {
          profile: arrayUnion({
            id: currentUser.value.profile.length += 1,
            displayName: details.value.firstName + ' ' + details.value.lastName,
            profileImage: url,
            company: details.value.company,
            jobTitle: details.value.jobTitle,
            bio: details.value.bio,
            industryOrCategoryOfWork: details.value.industryOrCategoryOfWork,
            theme: details.value.theme,
            live: false,
            slug: profileSlug.value,
            profileLinks: [],
            socialNetwork: [],
          })
        }).then(async () => {
          const contactRef = doc(nuxtApp.$firestore, 'contact_info', profileSlug.value)
          await setDoc(contactRef, contact.value, { merge: true })
            .then(() => {
              return navigateTo('/profile');
            });
        })
      })
    })
    
  }

  function toggleNextStep() {
    const input = document.querySelector('#url-input')

    if (input.value !== '' || input.value !== null) {
      step.value = 2
    }
  }

  function toggleLastStep() {
    if (details.value.firstName !== '' && details.value.lastName !== '') {
      step.value = 3
    }
  }

  function handleClick(e) {
    const input = document.querySelector('#url-input')
    const el = document.querySelector('#default-input')
    const rec = el.getBoundingClientRect()
    
    input.style.paddingLeft = rec.width + 4 + 'px'
  }

</script>
<style lang="scss" scoped>
#default-input {
  pointer-events: none;
}
.next-btn {
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
