<template>
  <div>
    <div class="profile-details">
      <div class="profile-cover" style="background: #f5f5f5; height: 54%">
        <div></div>
      </div>
      <div class="position-relative d-flex mx-3" style="background: rgb(41, 41, 41); border-radius: 35px; top: -65px">
        <div class="position-relative" style="flex: 0 0 275px">
          <div class="profile-img mx-auto d-flex">
            <img id="imageCrop" ref="imageCrop" :src="uploadedFiles.croppedUrl" crossorigin />
            <span class="w-100 mt-auto">
              <svg width="100%" height="227.33333333333331" viewBox="0 0 122 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M61.0005 79C79.2248 79 94 61.3154 94 39.5002C94 17.6846 89.1491 0 61.0005 0C32.8518 0 28 17.6846 28 39.5002C28 61.3154 42.7752 79 61.0005 79Z" fill="#686868"></path><path opacity="0.4" d="M121.932 138.151C121.334 99.8308 116.405 88.9117 78.6861 82C78.6861 82 73.3766 88.8694 61.0014 88.8694C48.6261 88.8694 43.3157 82 43.3157 82C6.00888 88.8363 0.7801 99.5934 0.0925852 136.906C0.036209 139.953 0.0100836 140.113 0 139.759C0.00229172 140.422 0.0925852 160 0.0925852 160H61H122C122 160 121.999 141.457 122 140.807C121.99 141.026 121.97 140.602 121.932 138.151Z" fill="#686868"></path>
              </svg>
            </span>
          </div>
          <label for="uploadProfileImg" class="camera-icon position-absolute">
            <span class="d-flex justify-content-center align-items-center">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="var(--chakra-colors-contrast)" height="24" width="24" xmlns="http://www.w3.org/2000/svg" style="color: var(--chakra-colors-contrast);">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </span>
            <input id="uploadProfileImg" type="file" accept="image/jpeg, image/jpg, image/png" @change="uploadProfile" hidden />
          </label>
          <button v-if="uploadedFiles.file" class="camera-icon position-absolute" @click="cropImage">
            <span class="d-flex justify-content-center align-items-center">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#fff" height="24" width="24" xmlns="http://www.w3.org/2000/svg" style="color: #fff">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </button>
        </div>
        <div class="profile-info" :style="{ background: detail.theme.background }">
          <h2 :style="{ color: detail.theme.color }">
            {{ detail.firstName }}
            <br />
            {{ detail.lastName }}
            <span class="job-title mt-3" :style="{ color: detail.theme.altColor }">
              {{ detail.jobTitle }}
            </span>
            <span v-if="details.company" :style="{ color: detail.theme.altColor }">
              At {{ detail.company }}
            </span>
          </h2>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h4>Change your profile design</h4>
      <div class="color-picker d-flex" style="gap: 0.5rem">
        <label for="1">
          <div class="picker-main"></div>
          <div class="picker-icon" :class="{ checked: themeValue.id === 1 }">
            <svg v-if="themeValue.id === 1" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#fff" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: #fff">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p v-else class="mb-0">1</p>
          </div>
          <div class="picker-alt"></div>
          <input
            type="radio"
            id="1"
            value="1"
            v-model="radioSelect"
            hidden
          />
        </label>
        <label for="2">
          <div class="picker-main" style="background: 0% 0% / cover rgb(35, 81, 164)"></div>
          <div class="picker-icon" :class="{ checked: themeValue.id === 2 }">
            <svg v-if="themeValue.id === 2" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#fff" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: #fff">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p v-else class="mb-0">2</p>
          </div>
          <div class="picker-alt" style="background: 0% 0% / cover rgb(16, 52, 116)"></div>
          <input
            type="radio"
            id="2"
            value="2"
            v-model="radioSelect"
            hidden
          />
        </label>
        <label for="3">
          <div class="picker-main" style="background: 0% 0% / cover rgb(255, 255, 255)"></div>
          <div class="picker-icon" :class="{ checked: themeValue.id === 3 }">
            <svg v-if="themeValue.id === 3" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#fff" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: #fff">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p v-else class="mb-0">3</p>
          </div>
          <div class="picker-alt" style="background: 0% 0% / cover rgb(0, 0, 0)"></div>
          <input
            type="radio"
            id="3"
            value="3"
            v-model="radioSelect"
            hidden
          />
        </label>
        <label for="4">
          <div class="picker-main" style="background: linear-gradient(135deg, rgb(217, 220, 202) 0%, rgb(145, 203, 202) 100%) 0% 0% / cover"></div>
          <div class="picker-icon" :class="{ checked: themeValue.id === 4 }">
            <svg v-if="themeValue.id === 4" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#fff" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: #fff">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p v-else class="mb-0">4</p>
          </div>
          <div class="picker-alt" style="background: 0% 0% / cover rgb(147, 204, 202)"></div>
          <input
            type="radio"
            id="4"
            value="4"
            v-model="radioSelect"
            hidden
          />
        </label>
        <label for="5">
          <div class="picker-main" style="background: linear-gradient(135deg, rgb(255, 92, 36) 10%, rgb(242, 10, 36) 70%, rgb(199, 18, 101) 100%) 0% 0% / cover"></div>
          <div class="picker-icon" :class="{ checked: themeValue.id === 5 }">
            <svg v-if="themeValue.id === 5" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#fff" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: #fff">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p v-else class="mb-0">5</p>
          </div>
          <div class="picker-alt" style="background: 0% 0% / cover rgb(113, 13, 107)"></div>
          <input
            type="radio"
            id="5"
            value="5"
            v-model="radioSelect"
            hidden
          />
        </label>
        <label for="6">
          <div class="picker-main" style="background: linear-gradient(135deg, rgb(247, 211, 242) 0%, rgb(219, 248, 254) 30%, rgb(198, 223, 251) 100%) 0% 0% / cover"></div>
          <div class="picker-icon" :class="{ checked: themeValue.id === 6 }">
            <svg v-if="themeValue.id === 6" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#fff" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: #fff">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p v-else class="mb-0">6</p>
          </div>
          <div class="picker-alt" style="background: 0% 0% / cover rgb(175, 181, 188)"></div>
          <input
            type="radio"
            id="6"
            value="6"
            v-model="radioSelect"
            hidden
          />
        </label>
        <label for="7">
          <div class="picker-main" style="background: linear-gradient(135deg, rgb(41, 109, 54) 0%, rgb(62, 176, 68) 100%) 0% 0% / cover"></div>
          <div class="picker-icon" :class="{ checked: themeValue.id === 7 }">
            <svg v-if="themeValue.id === 7" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" color="#fff" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: #fff">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p v-else class="mb-0">7</p>
          </div>
          <div class="picker-alt" style="background: 0% 0% / cover rgb(50, 69, 57)"></div>
          <input
            type="radio"
            id="7"
            value="7"
            v-model="radioSelect"
            hidden
          />
        </label>
      </div>
    </div>
    <div class="mt-4">
      <div class="py-3">
        <input class="w-100 border-bottom" v-model="detail.firstName" type="text" placeholder="First Name" />
      </div>
      <div class="py-3">
        <input class="w-100 border-bottom" v-model="detail.lastName" type="text" placeholder="Last Name" />
      </div>
      <div class="py-3">
        <input class="w-100 border-bottom" v-model="detail.jobTitle" type="text" placeholder="Job title" />
      </div>
      <div class="py-3">
        <input class="w-100 border-bottom" v-model="detail.company" type="text" placeholder="Company" />
      </div>
      <div class="py-3">
        <textarea v-model="detail.bio" class="w-100 border-bottom" placeholder="Bio" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Cropper from 'cropperjs';

  const props = defineProps({
    details: Object
  })

  const uploadedFiles = ref({});
  let imageCrop = ref();
  let cropper = '';
  let croppable = false;

  const detail = computed({
    get() {
      return props.details;
    },
    set(newVal) {
      props.details = newVal;
    }
  })
  const radioSelect = ref(0)
  const theme = ref([
    {
      id: 1,
      background: '#010101',
      color: '#ffffff',
      altColor: '#a1a1a1',
      secondary: '#ff643a'
    },
    {
      id: 2,
      background: '#2351a4',
      color: '#ffffff',
      altColor: '#e3e3e3',
      secondary: '#103474'
    },
    {
      id: 3,
      background: '#ffffff',
      color: '#000000',
      altColor: '#686868',
      secondary: '#000000'
    },
    {
      id: 4,
      background: 'linear-gradient(135deg, rgb(217, 220, 202) 0%, rgb(145, 203, 202) 100%)',
      color: '#000000',
      altColor: '#686868',
      secondary: '#93ccca'
    },
    {
      id: 5,
      background: 'linear-gradient(135deg, rgb(255, 92, 36) 10%, rgb(242, 10, 36) 70%, rgb(199, 18, 101) 100%)',
      color: '#ffffff',
      altColor: '#ffffff',
      secondary: '#710d6b'
    },
    {
      id: 6,
      background: 'linear-gradient(135deg, rgb(247, 211, 242) 0%, rgb(219, 248, 254) 30%, rgb(198, 223, 251) 100%)',
      color: '#000000',
      altColor: '#686868',
      secondary: '#afb5bc'
    },
    {
      id: 7,
      background: 'linear-gradient(135deg, rgb(41, 109, 54) 0%, rgb(62, 176, 68) 100%)',
      color: '#ffffff',
      altColor: '#e3e3e3',
      secondary: '#324539'
    }
  ])

  const themeValue = computed(() => {
    if (radioSelect.value == 0) return {};
    const selected = theme.value.find(t => t.id === +radioSelect.value);
    detail.value.theme = selected;
    return selected;
  })

  function uploadProfile(e) {
		const file = e.target.files[0];
    uploadedFiles.value.file = file;

		const reader = new FileReader();
		reader.onload = () => {
      imageCrop.value.src = reader.result;
      enableCropper();
		};
		reader.readAsDataURL(file);
  }

  function cropImage() {
    if (!croppable) {
      return;
    }
		const canvas = cropper.getCroppedCanvas();
		const roundedCanvas = getRoundedCanvas(canvas);

    const dataUrl = canvas.toDataURL('image/jpeg');
    uploadedFiles.value.croppedUrl = dataUrl;
    cropper.destroy();
    document.querySelector('#uploadProfileImg').value = ''
    uploadedFiles.value.file = ''
	}

  function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }

  function enableCropper() {
    const image = imageCrop.value;
    if (image) {
      cropper = new Cropper(image, {
        dragMode: 'move',
        dragCrop: false,
        zoomable: true,
        minContainerWidth: 300,
        minContainerHeight: 300,
        minCropBoxWidth: 500,
        minCropBoxHeight: 500,
        cropBoxMovable: false,
        guides: true,
        center: true,
        checkCrossOrigin: false,
        viewMode: 3,
        autoCropArea: 1,
        restore: false,
        modal: false,
        highlight: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        ready: function () {
          croppable = true;
        },
        crop(event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
        }
      })
    }else {
      console.log('please upload a file');
    }
	}
</script>
<style lang="scss" scoped>
.color-picker {
  label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    cursor: pointer;

    .picker-main {
      position: absolute;
      clip-path: polygon(100% 0px, 0px 0px, 0px 100%);
      inset: 0px;
      background:  0% 0% / cover rgb(1, 1, 1);
      border-radius: 10px;
    }
    .picker-icon {
      display: flex;
      position: absolute;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      box-shadow: 0px 8px 36px rgba(0, 0, 0, 0.05);
      background: rgb(255, 255, 255);
      border-radius: 9999px;
      width: 1.5rem;
      height: 1.5rem;
      z-index: 2;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;

      &.checked {
        background: #ff643a;
      }
    }
    .picker-alt {
      position: absolute;
      clip-path: polygon(100% 0px, 100% 100%, 0px 100%);
      inset: 0px;
      background:  0% 0% / cover rgb(255, 100, 58);
      border-radius: 10px;
    }
  }
}
input,
textarea {
  resize: none;
  border: none;
  &::placeholder {
    font-weight: 600;
  }
  &:focus {
    outline: none;
    border-color: #FF643A !important;
    &::placeholder {
      color: #FF643A;
    }
  }
}
.camera-icon {
  bottom: -27.5px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: #fff;
  overflow: hidden;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #FF643A;
  cursor: pointer;
}
</style>
