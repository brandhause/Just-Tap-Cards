dd<template>
  <div>
    <form id="signup-form" class="mx-auto my-5" @submit.prevent="signUp(user)">
      <h2 class="text-center">Sign up</h2>
      <ImageUpload :uploadImage="uploadImage" />
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
        <button type="submit" class="login-btn">
          Sign Up
        </button>
      </div>
      <div class="text-center">
          <nuxt-link class="login-link" to="/">Login</nuxt-link>
      </div>
      <div class="clearfix text-center">
        <span class="text-danger">{{ errorCode }}</span>
      </div>
    </form>
  </div>
</template>
<script setup>
import useFirebaseAuth from '~/composables/useFirebaseAuth.ts';

  const errorCode = ref(null);
  const user = ref({
    fname: '',
    lname: '',
    email: null,
    password: null,
    file: [],
    profileImage: null,
  });
  const { registerUser } = useFirebaseAuth()

  function uploadImage(e) {
		user.value.file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			document.querySelector('#image-display').style.backgroundImage = `url(${reader.result})`
		};
		reader.readAsDataURL(user.value.file);
	}

  async function signUp(user) {
    await registerUser(user)
  };
  
</script>
<style lang="scss">
  #signup-form {
    max-width: 340px;
  }
  .login-link {
      font-size: 18px;
      color: #42abe0;
      text-decoration: none;
  }
</style>
