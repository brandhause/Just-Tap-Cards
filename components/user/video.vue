<template>
  <div class="my-4">
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>Video</h3>
                <nuxt-link to="/profile/edit-video">edit</nuxt-link>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div ref="playerContainerDiv"></div>
        </div>
        <div class="col-md-12">
            {{ currentUser.videoDescription }}
        </div>
    </div>
  </div>
</template>
<script setup>
import Player from '@vimeo/player'
import { ref, onMounted } from "vue";

  const props = defineProps({
    currentUser: [Array, Object],
  });

  const playerContainerDiv = ref();

  onMounted(() => {
    const playerContainer = playerContainerDiv.value;
    const videoUrl = props.currentUser.video;
    
    if (videoUrl) {
      const videoId = videoUrl.substring(videoUrl.lastIndexOf('/') + 1)
      const player = new Player(playerContainer, {
      id: videoId,
      autoplay: false,
      controls: true,
      loop: false,
      muted: false,
      })
    }
  });
</script>
