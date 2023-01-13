import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const createUser = async (email, password, name) => {
  const auth = getAuth();
  const firestore = getFirestore();

  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).then(async (res) => {
    // set data to collection users using firebase auth uid
    await setDoc(doc(firestore, 'users', res.user.uid), {
      displayName: name,
      email: res.user.email,
      emailVerified: res.user.emailVerified,
    }).catch((err) => console.log('setDoc: ', err.code, err.message));
  }).catch((err) => console.log('createUser', err.code, err.message));
  
  return credentials;
}

export const signInUser = async (email, password) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((err) => {
    console.log('signInUser', err.code, err.message)
  });
  return credentials;
}

export const initUser = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    }
  });
}

export const signOutUser = async () => {
  const auth = getAuth();
  await auth.signOut();
}
