<template>
  <div>
    <form @submit.prevent="edit(user)">
      <div>
        <label for="first-name">First name:</label>
        <input type="text" id="first-name" name="first-name" class="form-control mb-3" v-model="user.fname" />
      </div>
      <div>
        <label for="last-name">Last name:</label>
        <input type="text" id="last-name" name="last-name" class="form-control mb-3" v-model="user.lname" />
      </div>
      <div>
        <label for="job-title">Job title:</label>
        <input type="text" id="job-title" name="job-title" class="form-control mb-3" v-model="user.jobTitle" />
      </div>
      <div>
        <label for="company">Company:</label>
        <input type="text" id="company" name="company" class="form-control mb-3" v-model="user.company" />
      </div>
      <div>
        <label for="category-work">Industry or Category of work:</label>
        <input type="text" id="category-work" name="category-work" class="form-control mb-3" v-model="user.categoryOfWork" />
      </div>
      <button class="save-btn" type="submit" @click="hideSave">Save</button>
    </form>
  </div>
</template>
<script setup>

  const props = defineProps({
    edit: Function,
    currentUser: [Array, Object],
  });

  const user = ref({});

  const fullName = computed(() => {
    if (!props.currentUser && !props.currentUser.displayName) return [];
    return props.currentUser.displayName.split(' ');
  })

  onMounted(() => {
    user.value = {
      fname: fullName.value[0],
      lname: fullName.value[1],
      jobTitle: props.currentUser.jobTitle,
      company: props.currentUser.company,
      categoryOfWork: props.currentUser.categoryOfWork
    };
  });
  
</script>
