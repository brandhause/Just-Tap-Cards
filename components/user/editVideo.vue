<template>
  <div>
    <form @submit.prevent="editVideo(user)">
    <div>
        <div class="d-flex text-counter justify-content-between mb-1">
        <p>Video URL</p>
        </div>
        <input id="user-video" class="form-control" name="user-video" v-model="user.video">
        <input id="user-video-description" class="form-control" name="user-video-description" v-model="user.videoDescription">
    </div>
    <button class="save-btn mt-4" type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
  const props = defineProps({
    editVideo: Function,
    currentUser: [Array, Object],
  });

  const user = ref({});

  onMounted(() => {
    user.value = {
      video: props.currentUser.video,
      videoDescription: props.currentUser.videoDescription
    };
  });
</script>