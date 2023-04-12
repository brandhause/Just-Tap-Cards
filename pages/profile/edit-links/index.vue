<template>
    <div class="container" v-if="currentUser">
        <div class="row">
            <div class="col-md-6">
                <nuxt-link class="arrow-back" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></nuxt-link>
                <!-- <div
                    class="drop-zone"
                    @drop="onDrop($event, 1)"
                >
                    <div
                        class="d-flex border-bottom"
                        v-for="(social, index) in getList(1)"
                        :key="index"
                        draggable="true"
                        @dragstart="startDrag($event, social)"
                    >
                        <div>
                            <img :src="matchSocial('icon', social)" :alt="matchSocial('icon', social)">
                        </div>
                        <div class="d-flex flex-column">
                            <strong>{{ matchSocial('name', social) }}</strong>
                            <small>{{ social.url }}</small>
                            <div class="d-flex">
                                <nuxt-link class="px-3" :to="`/profile/edit-social-media/${social.id}`">Edit</nuxt-link>
                                <button class="bg-transparent border-0 px-3" @click="deleteSocial(social)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div> -->
                <draggable
                  class="list-group"
                  :component-data="{
                    tag: 'ul',
                    type: 'transition-group',
                    name: !drag ? 'flip-list' : null
                  }"
                  v-model="newItems"
                  v-bind="dragOptions"
                  @start="drag = true"
                  @end="drag = false"
                  item-key="order"
                >
                  <template #item="{ element }">
                    <li class="list-group-item d-flex">
                      <div>
                        <img :src="element.linkThumbnail" alt="">
                      </div>
                      <div class="d-flex flex-column">
                        <!-- <strong>{{ matchSocial('name', element) }}</strong> -->
                        <a href="{{ element.linkURL }}"><small>{{ element.linktext }}</small></a>
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
    </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
  const drag = ref(false);
  const currentUser = ref();
  const toggleEdit = ref(false);
  const errCode = ref();
  const socialNetworks = ref([]);
  const dragItems = ref([]);
  const items = ref([]);

  const dragOptions = computed(() => {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost"
    };
  });

  watch(() => dragItems.value, async (newItem, oldItem) => {
    const { firestore } = useFirebase();
    const docRef = doc(firestore, 'users', currentUser.value.uid);
    await updateDoc(docRef, {
      profileLinks: newItem
    })
  })

  onMounted(async () => {
    const { auth, firestore } = useFirebase();

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigateTo({
          path: '/'
        });
      } else {
        const docRef = doc(firestore, 'users', user.uid);
        onSnapshot(docRef,
          (snap) => {
            currentUser.value = {
            uid: user.uid,
            ...snap.data()
            }
            items.value = currentUser.value.profileLinks;
          },
          (error) => {
            //
          },
        );
        
        // const socialRef = doc(firestore, 'social_network', 'social_doc');
        // onSnapshot(socialRef, (snap) => {
        //   socialNetworks.value = snap.data().data;
        // })
      }
    });
  })

  const newItems = computed({
    get() {
      return items.value
    },
    set(newVal) {
      dragItems.value = newVal;
    }
  })

  async function deleteLink(link) {
    const { firestore } = useFirebase();
    const linkRef = doc(firestore, 'users', currentUser.value.uid);

    await updateDoc(linkRef, {
      profileLinks: arrayRemove(link)
    })
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