<template>
  <div class="position-relative">
    <div class="row mx-0 col-12 px-0" style="color: #686868">
      <div class="col-12 px-0">
        <BackHeader />
      </div>
      <div class="col-12 px-0">
        <h2 class="edit-heading mb-3">Change Email</h2>
        <p>Please verify the new email address. Cards linked to unverified accounts are temporarily deactivated.</p>
      </div>
      <div class="col-12 mt-4">
        <div class="d-flex flex-column">
          <small class="px-0" style="font-weight: 600">Current email</small>
          <input class="border-0 border-bottom" style="cursor: not-allowed" type="text" :placeholder="currentUser.email" readonly disabled />
        </div>
      </div>
      <div class="col-12 mt-4 pt-3">
        <div class="d-flex flex-column">
          <small class="px-0" style="font-weight: 600" v-if="user.providedPassword">Current password</small>
          <input
            class="border-0 border-bottom"
            type="password"
            placeholder="Current password"
            v-model="user.providedPassword"
            @blur="passwordErr"
          />
          <small>Password is required.</small>
        </div>
      </div>
      <div class="col-12 mt-4 pt-3">
        <div class="d-flex flex-column">
          <small class="px-0" style="font-weight: 600" v-if="user.providedEmail">New email</small>
          <input
            class="border-0 border-bottom"
            type="email"
            placeholder="New email"
            v-model="user.providedEmail"
            @blur="emailErr"
          />
          <small>{{ emailError }}</small>
        </div>
      </div>
      <div class="col-12 mt-5 px-0">
        <div>
          <button
            class="accent-btn border rounded px-5 py-2 w-100"
            :class="{'disabled': emailError || invalidate}"
            :disabled="emailError || invalidate"
            @click="reAuthenticate"
          >
            <small>
              <strong>Change</strong>
            </small>
          </button>
        </div>
      </div>
    </div>
    <Toast :alert="alert" />
  </div>
</template>
<script setup>
import { onAuthStateChanged, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

  const nuxtApp = useNuxtApp();
  const currentUser = ref([]);
  const user = ref({});
  const alert = ref({});
  const emailError = ref(null);
  const invalidate = ref(true);

  onMounted(() => {
    onAuthStateChanged(nuxtApp.$auth, (user) => {
      currentUser.value = user;
      
    });
  })

  function passwordErr(e) {
    const value = e.target.value;
    if (!value) {
      e.target.classList.add('invalid');
      invalidate.value = true;
    } else {
      e.target.classList.remove('invalid');
      invalidate.value = false;
    }
  }

  function emailErr(e) {
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = e.target.value;
    if (!value) {
      e.target.classList.add('invalid');
      emailError.value = 'Email is required.'
      invalidate.value = true;
    } else if (!regEx.test(value)) {
      e.target.classList.add('invalid');
      emailError.value = 'Email format is wrong.'
      invalidate.value = true;
    } else {
      e.target.classList.remove('invalid');
      emailError.value = null;
      invalidate.value = false;
    }
  }

  function reAuthenticate() {
    const authUser = nuxtApp.$auth.currentUser;
    const credential = EmailAuthProvider.credential(
      currentUser.value.email,
      user.value.providedPassword
    );
    
    reauthenticateWithCredential(authUser, credential)
      .then((res) => {
        // check email
        if (JSON.stringify(res.user.email) === JSON.stringify(user.value.providedEmail)) {
          alert.value.state = 'error';
          alert.value.title = 'Something went Wrong!'
          alert.value.message = 'The new email is the same as your current email!';
          setTimeout(() => {
            alert.value.state = null;
          }, 3000);
        } else {
          // update email
          updateEmail(authUser, user.value.providedEmail)
            .then((res) => {
              alert.value.state = 'success';
              alert.value.title = 'success';
              alert.value.message = 'Email successfully Updated!';
              setTimeout(() => {
                alert.value.state = null;
              }, 3000);
            })
            .catch((error) => {
              alert.value.state = 'error';
              alert.value.title = 'Something went Wrong!'
              alert.value.message = error;
              setTimeout(() => {
                alert.value.state = null;
              }, 3000);
            })
        }
      }).catch((error) => {
        alert.value.state = 'error';
        alert.value.title = 'Something went Wrong!'
        alert.value.message = error;
        setTimeout(() => {
          alert.value.state = null;
        }, 3000);
      });
  }
</script>
<style lang="scss" scoped>
.accent-btn {
  opacity: 0.9;
  background: #FF643A;
  color: #FFFFFF;
  &:hover {
    opacity: 1;
  }
  &.invalid {
    background: #D4D4D4;
  }
}
input {
  &:focus {
    outline: none;
    border-color: #FF643A !important;
    &::placeholder {
      color: #FF643A;
    }
  }

  ~ small {
    display: none;
    color: red;
  }

  &.invalid {
    border-color: red !important;

    &::placeholder {
      color: red;
    }

    ~ small {
      display: block;
    }
  }
}
</style>
