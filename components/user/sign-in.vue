<template>
  <div class="form-sign-in d-flex vh-100 align-items-center">
	  <div class="container">
			<div class="row align-items-center">
				<div class="col-md-6">
					<div class="featured-img">
						<img src="~/assets/images/Just-Tap-Graphics.webp" alt="">
					</div>
				</div>
				<div class="col-md-6">
					<div class="site-logo">
						<img src="~/assets/images/Just-Tap-Logo.webp" alt="">
					</div>
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
							<button type="submit" class="login-btn">
								Log in
							</button>
						</div>
						<div class="text-center">
							<nuxt-link class="get-card-cta" :to="{ name: 'index', query: { signup: true } }">Get card</nuxt-link>
						</div>
						<div class="clearfix text-center">
							<span class="text-danger">{{ errorCode }}</span>
						</div>
					</form>
				</div>
			</div>
		</div>
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
.site-logo {
	img {
		max-width: 93px;
		height: auto;
	}
}

.featured-img {
	img {
		max-width: 400px;
	}
}

#login-form {
	max-width: 325px;

	.get-card-cta {
		font-size: 20px;
		color: #27AAE1;
		text-decoration: none;

		&:hover {
			color: #1c7ea8;
		}
	}
}

.form-sign-in {
	position: relative;

	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100%;
		background-color: #f5f5f6;
		z-index: -20;
	}
}
</style>
