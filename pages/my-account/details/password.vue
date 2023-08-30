<template>
  <div class="position-relative">
    <div class="row mx-0 col-12 px-0" style="color: #686868">
      <div class="col-12 px-0">
        <BackHeader />
      </div>
      <div class="col-12 px-0">
        <h2 class="edit-heading mb-3">Edit your account password</h2>
      </div>
      <div class="col-12 mt-4 pt-3">
        <div class="d-flex flex-column">
          <small class="px-0" style="font-weight: 600" v-if="user.currentPassword">
            Current password
          </small>
          <input
            class="border-0 border-bottom"
            type="password"
            placeholder="Current password"
            v-model="user.currentPassword"
            @blur="validate"
          />
          <small>Password is required.</small>
        </div>
      </div>
      <div class="col-12 mt-4 pt-3">
        <div class="d-flex flex-column">
          <small class="px-0" style="font-weight: 600" v-if="user.providedPassword">
            New password
          </small>
          <input
            class="border-0 border-bottom"
            type="password"
            placeholder="New password"
            v-model="user.providedPassword"
            @blur="passwordErr"
            @keyup="passwordErr"
          />
          <small>{{ passwordError }}</small>
        </div>
      </div>
      <div class="col-12 mt-5 px-0">
        <div>
          <button
            class="accent-btn border rounded px-5 py-2 w-100"
            :class="{'disabled': passwordError || invalidate}"
            :disabled="passwordError || invalidate"
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
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

  const nuxtApp = useNuxtApp()
  const user = ref({})
  const alert = ref({})
  const invalidate = ref(true)
  const passwordError = ref(null)
  
  function validate(e) {
    const value = e.target.value;
    if (!value) {
      e.target.classList.add('invalid');
      invalidate.value = true;
    } else {
      e.target.classList.remove('invalid');
      invalidate.value = false;
    }
  }

  function passwordErr(e) {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const value = e.target.value;
    if (!value) {
      e.target.classList.add('invalid');
      passwordError.value = 'Password is required.'
    } else if (!pattern.test(value)) {
      e.target.classList.add('invalid');
      passwordError.value = 'Password at least should be 8 characters and contain one number and one letter and one special character.';
    } else {
      e.target.classList.remove('invalid');
      passwordError.value = null
    }
  }

  function reAuthenticate() {
    const authUser = nuxtApp.$auth.currentUser
    const credential = EmailAuthProvider.credential(
      authUser.email,
      user.value.currentPassword
    )
    reauthenticateWithCredential(authUser, credential)
      .then((res) => {
        // check password
        if (JSON.stringify(user.value.currentPassword) == JSON.stringify(user.value.providedPassword)) {
          alert.value.state = 'error';
          alert.value.title = 'Something went Wrong!'
          alert.value.message = 'The new password is the same as your current password!';
          setTimeout(() => {
            alert.value.state = null;
          }, 3000);
        } else {
          updatePassword(authUser, user.value.providedPassword).then(() => {
            alert.value.state = 'success';
            alert.value.title = 'success';
            alert.value.message = 'Password successfully Updated!';
            setTimeout(() => {
              alert.value.state = null;
            }, 3000);
          }).catch((error) => {
            alert.value.state = 'error';
            alert.value.title = 'Something went Wrong!'
            alert.value.message = error;
            setTimeout(() => {
              alert.value.state = null;
            }, 3000);
          });
        }
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
