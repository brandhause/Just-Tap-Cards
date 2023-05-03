<template>
  <div class="container">
    <form class="row justify-content-center" @submit.prevent="submitForm(contact)">
      <div class="col-12">
        <nuxt-link class="arrow-back" to="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </nuxt-link>
      </div>
      <div class="col-12">
        <h3>Edit contact info</h3>
        <InputsPhoneInput v-model="contact.phone" :phoneType="phoneType" />
      </div>
      <div class="col-12">
        <div>
          <h4>Email</h4>
        </div>
        <div>
          <InputsKeyValue id="email" placeholder="Email" type="email" v-model="contact.email" />
        </div>
      </div>
      <div class="col-12">
        <div>
          <h4>Website</h4>
        </div>
        <div>
          <InputsKeyValue id="website" placeholder="Website URL" v-model="contact.website" />
        </div>
      </div>
      <div class="col-12">
        <div>
          <h4>Address</h4>
        </div>
        <div>
          <InputsAddressInput v-model="contact.address" :addressType="addressType" />
        </div>
      </div>
      <div class="col-12">
        <button>Save</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore"

  const phoneType = ref([])
  const addressType = ref([])
  const currentUser = ref([])
  const nuxtApp = useNuxtApp();

  const contact = ref({
    address: {
      type: 1,
    },
    email: '',
    website: '',
    phone: {
      type: 1,
    }
  })

  onMounted(() => {
    const phoneRef = doc(nuxtApp.$firestore, 'phone', 'data')
    const addressRef = doc(nuxtApp.$firestore, 'address_type', 'data')

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
  
  async function submitForm(contact) {
    const contactRef = doc(nuxtApp.$firestore, 'contact_info', currentUser.value.uid)
    
    await updateDoc(contactRef, {
      address: arrayUnion(contact.address),
      email: arrayUnion(contact.email),
      website: arrayUnion(contact.email),
      phone: arrayUnion(contact.phone)
    })
    // await updateDoc(doc(firestore, 'contact_info', currentUser.value.uid), contact.value)
  }
</script>
