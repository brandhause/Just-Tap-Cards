<template>
  <div>
    <form @submit.prevent="edit(user)">
      <div>
        <input type="text" @change="dataChanged = true" placeholder="First Name" v-model="user.fname" />
      </div>
      <div>
        <input type="text" @change="dataChanged = true" placeholder="Last Name" v-model="user.lname" />
      </div>
      <div v-if="dataChanged">
        <button type="submit" @click="hideSave">Save</button>
      </div>
    </form>
  </div>
</template>
<script setup>

  const props = defineProps({
    edit: Function,
    currentUser: [Array, Object],
  });

  const user = ref({});
  const dataChanged = ref(false);

  const fullName = computed(() => {
    if (!props.currentUser && !props.currentUser.displayName) return [];
    return props.currentUser.displayName.split(' ');
  })

  function hideSave() {
    setTimeout(() => {
      dataChanged.value = false;
    }, 500);
  }

  onMounted(() => {
    user.value = {
      fname: fullName.value[0],
      lname: fullName.value[1],
    };
  });
  
</script>
