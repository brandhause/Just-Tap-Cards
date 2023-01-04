<script setup>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fireAuth } from "../../server/lib/firebase";

const currentUser = fireAuth.currentUser;

onMounted(() => {
  onAuthStateChanged(fireAuth, (user) => {
    if (!user) {
      return navigateTo({
        path: '/login'
      });
    }
  });
});

function logout() {
  signOut(fireAuth).then(() => {
    alert('Successfully signed out!');
  }).catch((err) => {
    console.log(err);
  })
}

</script>
<template>
  <div>
    <div>{{ currentUser.email }}</div>
    <div>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>