<template>
  <div>
    <div class="profile-details">
      <div class="profile-cover" style="background: #222222">
        <div></div>
      </div>
      <div class="position-relative d-flex mx-3" style="background: rgb(41, 41, 41); border-radius: 35px; top: -65px">
        <div class="position-relative" style="flex: 0 0 275px">
          <div class="profile-img mx-auto d-flex">
            <img v-if="false" src="" />
            <span v-else class="w-100 mt-auto">
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
            <input id="uploadProfileImg" type="file" hidden />
          </label>
        </div>
        <div class="profile-info" style="background: #222222">
          <h2>
            {{ detail.firstName }}
            <br />
            {{ detail.lastName }}
            <span class="job-title mt-3">{{ detail.jobTitle }}</span>
            <span v-if="details.company"> At {{ detail.company }}</span>
          </h2>
        </div>
      </div>
    </div>
    <div>
      <h4>Change your profile design</h4>
      <div class="d-flex">
        <label for="">
          1
          <input type="radio" />
        </label>
        <label for="">
          2
          <input type="radio" />
        </label>
        <label for="">
          3
          <input type="radio" />
        </label>
        <label for="">
          4
          <input type="radio" />
        </label>
        <label for="">
          5
          <input type="radio" />
        </label>
        <label for="">
          6
          <input type="radio" />
        </label>
        <label for="">
          7
          <input type="radio" />
        </label>
      </div>
    </div>
    <div>
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
  const props = defineProps({
    details: Object
  })

  const detail = computed({
    get() {
      return props.details;
    },
    set(newVal) {
      props.details = newVal;
    }
  })

</script>
<style lang="scss" scoped>
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
