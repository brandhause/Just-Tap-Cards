<template>
  <div>
    <form @submit.prevent="editBio(user)">
    <div>
        <div class="d-flex text-counter justify-content-between mb-1">
        <p>bio</p>
        </div>
        
        <textarea id="user-bio" class="form-control" name="user-bio" rows="4" cols="50" v-model="user.bio">
        </textarea>
    </div>
    <button class="save-btn mt-4" type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
  const props = defineProps({
    editBio: Function,
    currentUser: [Array, Object],
  });

  const user = ref({});

  onMounted(() => {
    user.value = {
      bio: props.currentUser.bio
    };
  });
</script>