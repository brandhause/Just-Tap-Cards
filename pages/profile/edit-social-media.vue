<template>
    <div class="container" v-if="currentUser">
        <div class="row">
            <div class="col-md-6">
                <nuxt-link class="arrow-back" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></nuxt-link>
                <button @click="uploadImage">Add Social Media</button>
                <div v-for="(socialNetwork, index) in socialNetworks" :key="index">
                    <input type="text" v-model="socialNetwork.value">
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

    const currentUser = ref();
    const toggleEdit = ref(false);
    const errCode = ref();
    const socialNetworks = ref([]);

    onMounted(async () => {
        const { auth, firestore } = useFirebase();

        onAuthStateChanged(auth, (user) => {
        if (!user) {
            return navigateTo({
            path: '/'
            });
        } else {
            const docRef = doc(firestore, 'users', user.uid);
            onSnapshot(docRef,
            (snap) => {
                currentUser.value = {
                uid: user.uid,
                ...snap.data()
                }
            },
            (error) => {
                //
            },
            );
        }
        });
    })

    function uploadImage(e) {
        socialNetworks.value.push({ value: '' });
	}
</script>