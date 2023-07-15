<template>
  <div v-if="currentUser">
    <div>
      <nuxt-link class="arrow-back" to="/profile">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
      </nuxt-link>
        <draggable
          class="list-group"
          :component-data="{
            tag: 'ul',
            type: 'transition-group',
            name: !drag ? 'flip-list' : null
          }"
          v-model="itemList"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <li class="list-group-item d-flex">
              <div>
                <img :src="element.linkThumbnail" alt="">
              </div>
              <div class="d-flex flex-column">
                <!-- <strong>{{ matchSocial('name', element) }}</strong> -->
                <a :href="element.linkURL"><small>{{ element.linktext }}</small></a>
                <div class="d-flex">
                  <nuxt-link class="px-3" :to="`/profile/edit-links/${element.id}`">Edit</nuxt-link>
                  <button class="bg-transparent border-0 px-3" @click="deleteLink(element)">Delete</button>
                </div>
              </div>
            </li>
          </template>
        </draggable>
        <nuxt-link to="/profile/edit-links/add">Add Link</nuxt-link>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import useFirestore from '~/composables/useFirestore.ts';
  
  const { update } = useFirestore();
  const drag = ref(false);
  const liveProfile = ref();
  const currentUser = ref();
  const toggleEdit = ref(false);
  const errCode = ref();
  const socialNetworks = ref([]);

  const dragOptions = computed(() => {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost"
    };
  });

  function refresh() {
    currentUser.value = JSON.parse(localStorage.getItem('profiles'));
    liveProfile.value = JSON.parse(localStorage.getItem('live-profile'));
  }

  onMounted(() => {
    refresh();
  })

  const itemList = computed({
    get() {
      return liveProfile.value.profileLinks.sort((a, b) => a.order - b.order);
    },
    set(newVal) {
      updateOrder(newVal);
    }
  })

  async function updateOrder(newVal) {
    const items = newVal;
    items.forEach((item, index) => {
      return item.order = index += 1
    })
    
    const profile = currentUser.value.profile;
    const index = profile.findIndex(item => item.id === liveProfile.value.id);

    profile[index].profileLinks = items

    await update(currentUser.value.uid, profile)
  }

  async function deleteLink(link) {
    const profile = currentUser.value.profile;
    const index = profile.findIndex(item => item.id === liveProfile.value.id);
    const toDelete = profile[index].profileLinks.findIndex(s => s.id === link.id);

    if (toDelete !== -1) {
      profile[index].profileLinks.splice(toDelete, 1)
    }

    const res = await update(currentUser.value.uid, profile);
    if (res === 'ok') {
      refresh();
    }
  }

</script>
<style lang="scss">
.ghost {
  opacity: 0.5;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: pointer;
}
</style>
