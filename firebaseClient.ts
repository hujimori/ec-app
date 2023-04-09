// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCd0zkX5dwe17R_CUjcoMeuLzi3CJi3-pg',
  authDomain: 'ec-app-b9e3f.firebaseapp.com',
  projectId: 'ec-app-b9e3f',
  storageBucket: 'ec-app-b9e3f.appspot.com',
  messagingSenderId: '966916761202',
  appId: '1:966916761202:web:25f86996d6c548a92604eb',
  measurementId: 'G-G7XBVPN0DR',
};

let app: FirebaseApp | null;
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
} else {
  app = null;
  analytics = undefined;
}
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};
