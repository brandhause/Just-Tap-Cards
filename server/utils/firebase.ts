import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

export const app = initializeApp({
    credential: cert('./just-tap-cards-firebase-adminsdk.json'),
})

export const firestore = getFirestore();
export const auth = getAuth();
