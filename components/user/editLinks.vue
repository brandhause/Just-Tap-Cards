<template>
  <div>
    <form @submit.prevent="editBio(user)">
        <div>
            <label for="first-name">Title:</label>
            <input type="text" id="first-name" name="first-name" class="form-control mb-3" v-model="user.fname" />
        </div>
        <div>
            <label for="last-name">Insert URL here:</label>
            <input type="text" id="last-name" name="last-name" class="form-control mb-3" v-model="user.lname" />
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