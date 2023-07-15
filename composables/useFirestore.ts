import { doc, updateDoc } from "firebase/firestore"

export default function() {
  const { $auth, $firestore, $storage } = useNuxtApp()

  const update = async (uid, profile) => {
    let response = ''
    
    await updateDoc(doc($firestore, 'users', uid), { profile: profile })
    .then(() => response = 'ok')
    .catch((err) => {
      console.log(err.message)
      response = err.message
    });

    return response
  }

  return {
    update
  }
}