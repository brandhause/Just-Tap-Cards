<template>
  <div>
    <div>Hello user!</div>
    <div>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>
<script setup>

  onMounted(async () => {
    console.log(await initUser());
  })

  async function logout() {
    const res = await signOutUser();
    console.log(res);
  }
</script>
