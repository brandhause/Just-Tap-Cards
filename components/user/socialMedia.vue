<template>
  <div class="my-4">
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="heading-">Social networks</h3>
                <nuxt-link v-show="preview" to="/profile/edit-social-media">edit</nuxt-link>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <ul class="social-media-items p-0 m-0 d-flex">
                <li class="social-media-item" v-for="social in sortSocial" :key="`social-${social.id}`">
                    <a :href="social.url" target="_blank">
                        <div>
                            <img :src="social.socialIcon" :alt="social.socialName" />
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script setup>

  const props = defineProps({
    currentUser: Object,
    preview: {
      type: Boolean,
      default: true
    }
  });

  const sortSocial = computed(() => {
    if (!props.currentUser || !props.currentUser.socialNetwork) return [];
    return props.currentUser.socialNetwork.sort((a, b) => a.order - b.order);
  });
  
</script>
