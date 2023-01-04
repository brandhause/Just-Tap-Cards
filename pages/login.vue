<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "../server/lib/firebase";

onMounted(() => {
  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log('Not logged In');
    }
  });
});

</script>
<template>
  <div>
    <SignIn></SignIn>
  </div>
</template>
