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
                            <a class="d-flex align-items-center" :href="link.linkURL" target="_blank">
                              <img :src="link.linkThumbnail" :alt="link.linkThumbnail" />
                              <p>{{ link.linktext }}</p>
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
<style lang="scss">
  .link-items {
    img {
      object-fit: cover;
      height: auto;
      width: 100px;
      margin-right: 30px;
    }
  }
</style>