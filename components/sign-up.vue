<template>
  <div>
    <form id="signup-form" class="mx-auto my-5" @submit.prevent="signUp(user)">
      <h2 class="text-center">Sign up</h2>
      <div class="form-group pb-3">
        <input
          type="text"
          class="form-control"
          placeholder="First Name"
          required="required"
          v-model="user.fname"
        />
      </div>
      <div class="form-group pb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Last Name"
          required="required"
          v-model="user.lname"
        />
      </div>    
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
          Sign Up
        </button>
      </div>
      <div class="text-center">
          <nuxt-link to="/login">login</nuxt-link>
      </div>
      <div class="clearfix text-center">
        <span class="text-danger">{{ errorCode }}</span>
      </div>
    </form>
  </div>
</template>
<script setup>

  const user = ref({
    fname: '',
    lname: '',
    email: null,
    password: null,
  });
  const errorCode = ref(null);
  
  const fullName = computed({
    get() {
      return user.value.fname + ' ' + user.value.lname;
    },
    set(newVal) {
      newVal;
    }
  })

  async function signUp(user) {
    const credentials = await createUser(user.email, user.password, fullName.value);
  };
</script>
<style lang="scss">
#signup-form {
  max-width: 340px;
}
</style>
