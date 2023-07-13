<template>
  <div>
    <div class="row">
        <nuxt-link class="arrow-back" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></nuxt-link>
      <div class="d-flex flex-column w-50" v-if="filteredLink">
        <input type="text" v-model="textLink"/>
        <small>Paste URL here</small>
        <input type="text" v-model="linkURL" />
        <img :src="croppedImage" alt="">
        <label for="file-upload" class="custom-file-upload">
            Custom Upload
        </label>
        <input id="file-upload" @change="addImage" type="file"/>
        <button
          class="next-btn border-0 px-5 py-2 rounded"
          :class="{
            'disabled': filteredLink.linkURL === linkURL &&
            filteredLink.linkThumbnail === croppedImage &&
            filteredLink.linktext === textLink
          }"
          @click="editLink"
        >
          Done
        </button>
      </div>
    </div>
      <transition name="modal">
        <div v-if="isOpen" class="modal-wrapper">
          <div class="modal-overlay" @click="closeModal"></div>
          <div class="modal-content">
            <ModalsLinks @imageCropped="imageCropped" :close="closeModal" :imageUploadFile="imageUploadFile" ></ModalsLinks>
          </div>
        </div>
      </transition>
  </div>
</template>
<script setup>
import useFirestore from '~/composables/useFirestore.ts';
import { uploadString, getDownloadURL, ref as storageRef } from "firebase/storage";

  const { update } = useFirestore();
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const id = ref();
  const liveProfile = ref();
  const currentUser = ref();
  const linkURL = ref('');
  const textLink = ref('');
  const linkThumbnail = ref('');
  const selected = ref();
  const imageFile = ref();
  const imageUploadFile = ref([]);
  const isOpen = ref(false);
  const imageCrop = ref();
  const croppedImage = ref();
  let cropper = '';
  let croppable = false;

  const filteredLink = computed(() => {
    if (!liveProfile.value) return [];
    const filtered = liveProfile.value.profileLinks.find((links) => {
      return links.id === +route.params.id;
    });
    return filtered;
  })

  onMounted(() => {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));

    croppedImage.value = croppedImage.value || filteredLink.value.linkThumbnail;
    linkURL.value = linkURL.value || filteredLink.value.linkURL;
    textLink.value = textLink.value || filteredLink.value.linktext;
  })

  function addImage(e) {
    imageFile.value = e.target.files[0];
    imageUploadFile.value = e.target.files[0];

		const reader = new FileReader();

		reader.onload = () => {
			imageUploadFile.value = reader.result
      isOpen.value = true;
		};

    reader.readAsDataURL(imageUploadFile.value);
  }

  function imageCropped(image) {
    croppedImage.value = image;
    isOpen.value = false;
  }

  const closeModal = () => {
    const uploader = document.querySelector('#file-upload');
    uploader.value = null;
    imageFile.value = null;
    isOpen.value = false;
  };

  async function editLink(link) {
    if (imageFile.value) {
      const imgRef = storageRef(nuxtApp.$storage, `images/${currentUser.value.uid}/links/${imageFile.value.name}`);
      uploadString(imgRef, croppedImage.value, 'data_url').then((snap) => {
        getDownloadURL(imgRef).then(async (url) => {
          const profile = currentUser.value.profile;
          const index = profile.findIndex(item => item.id === liveProfile.value.id);
          const obj = profile[index].profileLinks.find(link => link.id === +route.params.id)
          obj.linkThumbnail = url;
          obj.linkURL = linkURL.value;
          obj.linktext = textLink.value;
          
          // add new object to array with the same id but new value
          const res = await update(currentUser.value.uid, profile);
          if (res === 'ok') {
            return navigateTo('/profile/edit-links');
          }
        })
      })
    } else {
      const profile = currentUser.value.profile;
      const index = profile.findIndex(item => item.id === liveProfile.value.id);
      const obj = profile[index].profileLinks.find(link => link.id === +route.params.id)
      obj.linkURL = linkURL.value;
      obj.linktext = textLink.value;
      
      // add new object to array with the same id but new value
      const res = await update(currentUser.value.uid, profile);
      if (res === 'ok') {
        return navigateTo('/profile/edit-links');
      }
    }
  }
</script>
<style lang="scss">
input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  max-width: 600px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
