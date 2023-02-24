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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from "firebase/storage";

  const user = ref({
    fname: '',
    lname: '',
    email: null,
    password: null,
    file: [],
    profileImage: null,
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

  function uploadImage(e) {
		user.value.file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			document.querySelector('#image-display').style.backgroundImage = `url(${reader.result})`
		};
		reader.readAsDataURL(user.value.file);
	}

  async function signUp(user) {
    const { auth, firestore, storage } = useFirebase();

    // create user auth
    const credentials = await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((error) => {
        errorCode.value = error.message;
      });
    
    // upload image to firebase storage
    const metadata = {
        contentType: user.file.type,
      };

    const imgRef = storageRef(storage, `images/${user.file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, user.file, metadata);
    
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          
          // Set data to users collection
          if (credentials) {
            await setDoc(doc(firestore, 'users', credentials.user.uid), {
              displayName: fullName.value,
              email: credentials.user.email,
              emailVerified: credentials.user.emailVerified,
              profileImage: downloadURL,
            }).catch((error) => {
              console.log(error.message);
            });
          }

        });
      }
    );
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
