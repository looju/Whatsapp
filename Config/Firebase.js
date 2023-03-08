import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2kLJzfkhc7Y2q3BAA2SB_xWm8Bg5zUvE",
  authDomain: "whatsapp-bdd11.firebaseapp.com",
  projectId: "whatsapp-bdd11",
  storageBucket: "whatsapp-bdd11.appspot.com",
  messagingSenderId: "620086478424",
  appId: "1:620086478424:web:1dd38149aa32085593ac2d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function SignOut() {
  return signOut(auth);
}
