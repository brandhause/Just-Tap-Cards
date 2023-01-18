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
      <div class="text-center">
        <nuxt-link :to="{ name: 'index', query: { signup: true } }">Get card</nuxt-link>
      </div>
      <div class="clearfix text-center">
        <span class="text-danger">{{ errorCode }}</span>
      </div>
    </form>
  </div>
</template>
<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';

  const user = ref({
    email: null,
    password: null,
  });
  const errorCode = ref(null);

  async function signIn(user) {
    const { auth } = useFirebase();
    const cred = await signInWithEmailAndPassword(auth, user.email, user.password)
      .catch((err) => {
        errorCode.value = err.message;
      });
    if (cred) return navigateTo({ path: '/profile' });
  };
</script>
<style lang="scss">
#login-form {
  max-width: 340px;
}
</style>
