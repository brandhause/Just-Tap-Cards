<script setup>
import { signInWithEmailAndPassword  } from "firebase/auth";
import { fireAuth } from "../server/lib/firebase";

const user = ref({
  email: null,
  password: null,
});
const errorCode = ref(null);

function signIn(userData) {
  signInWithEmailAndPassword(fireAuth, userData.email, userData.password)
  .then((userCredential) => {
    if (userCredential) {
      return navigateTo({
        path: '/profile'
      });
    }
  })
  .catch((error) => {
    errorCode.value = error.code;
  });
}

</script>
<template>
  <div>
    <form id="login-form" class="mx-auto my-5" @submit.prevent="signIn(user)">
      <h2 class="text-center">Log in</h2>       
      <div class="form-group pb-3">
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          required="required"
          v-model="user.email"
        />
      </div>
      <div class="form-group pb-3">
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          required="required"
          v-model="user.password"
        />
      </div>
      <div class="form-group pb-3 text-center">
        <button type="submit" class="btn btn-primary btn-block">
          Log in
        </button>
      </div>
      <div class="clearfix text-center">
        <span class="text-danger">{{ errorCode }}</span>
      </div>
    </form>
  </div>
</template>
<style lang="scss">
#login-form {
  max-width: 340px;
}
</style>
