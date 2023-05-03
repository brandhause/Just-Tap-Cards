import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, arrayUnion } from "firebase/firestore"
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from "firebase/storage"

export default function() {
  const { $auth, $firestore, $storage } = useNuxtApp()

  const registerUser = async (user: object): Promise<boolean> => {
    try {
      const credentials = await createUserWithEmailAndPassword($auth, user.email, user.password)
      if (credentials) {
        const metadata = {
          contentType: user.file.type,
        };

        const imgRef = storageRef($storage, `images/${credentials.user.uid}/${user.file.name}`);
        const uploadTask = uploadBytesResumable(imgRef, user.file, metadata);
        
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is' + progress + '% done')
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
                await setDoc(doc($firestore, 'users', credentials.user.uid), {
                  displayName: user.fname + ' ' + user.lname,
                  email: credentials.user.email,
                  emailVerified: credentials.user.emailVerified,
                  profileImage: downloadURL,
                  socialNetwork: arrayUnion({}),
                }).catch((error) => {
                  console.log(error.message);
                });
              // Set data to contact info collection
                await setDoc(doc($firestore, 'contact_info', credentials.user.uid), {
                  address: arrayUnion({}),
                  email: arrayUnion({
                    id: 1,
                    email: credentials.user.email
                  }),
                  phone: arrayUnion({}),
                  website: arrayUnion({}),
                }).catch((error) => {
                  console.log(error.message);
                });
            });
          }
        )
        return true
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // handle error
      }
      return false
    }
    return false
  }

  return {
    registerUser
  }
}