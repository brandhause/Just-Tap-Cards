<template>
  <div class="my-4">
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>Links</h3>
                <nuxt-link v-show="preview" to="/profile/edit-links">edit</nuxt-link>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <ul class="link-items p-0 m-0 d-flex flex-column">
                <li class="link-item mb-4" v-for="link in sortLinks" :key="`link-${link.id}`">
                    <a :href="link.url" target="_blank">
                        <div>
                            <a class="d-flex align-items-center" style="gap: 30px" :href="link.linkURL" target="_blank">
                              <div class="d-flex" style="height: 4rem; width: 4rem">
                                <img class="rounded" :src="link.linkThumbnail" :alt="link.linkThumbnail" />
                              </div>
                              <p class="m-0">{{ link.linktext }}</p>
                            </a>
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
    currentUser: [Array, Object],
    preview: {
      type: Boolean,
      default: true
    }
  });

  const sortLinks = computed(() => {
    if (!props.currentUser || !props.currentUser.profileLinks) return [];
    return props.currentUser.profileLinks.sort((a, b) => a.order - b.order);
  });

</script>
<style lang="scss" scoped>
  .link-items {
    a {
      color: #1a202c;
    }
    img {
      object-fit: cover;
      height: auto;
    }
  }
</style>