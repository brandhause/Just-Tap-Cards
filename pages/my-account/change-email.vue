<template>
  <div>
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
          <input class="border-0 border-bottom" style="cursor: not-allowed" type="text" :placeholder="currentUser.email" readonly />
        </div>
      </div>
      <div class="col-12 mt-4 pt-3">
        <div class="d-flex flex-column">
          <input class="border-0 border-bottom" type="text" placeholder="Current password" />
        </div>
      </div>
      <div class="col-12 mt-4 pt-3">
        <div class="d-flex flex-column">
          <input class="border-0 border-bottom" type="text" placeholder="New email" />
        </div>
      </div>
      <div class="col-12 mt-5 px-0">
        <div>
          <button class="accent-btn border rounded px-5 py-2 w-100" disabled>
            <small>
              <strong>Change</strong>
            </small>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";

  const nuxtApp = useNuxtApp();
  const currentUser = ref([]);

  onMounted(() => {
    onAuthStateChanged(nuxtApp.$auth, (user) => {
      currentUser.value = user;
    });
  })
</script>
<style lang="scss" scoped>
.accent-btn {
  opacity: 0.9;
  background: #FF643A;
  color: #FFFFFF;
  &:hover {
    opacity: 1;
  }
}
</style>
