<template>
  <div class="my-4">
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>Links</h3>
                <nuxt-link to="/profile/edit-links">edit</nuxt-link>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <ul class="link-items p-0 m-0 d-flex">
                <li class="link-item" v-for="link in currentUser.profileLinks" :key="`link-${link.id}`">
                    <a :href="link.url" target="_blank">
                        <div>
                            <!-- <img :src="link.socialIcon" :alt="social.socialName" /> -->
                            <a href="{{ link.linkURL }}">
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
  });
</script>
