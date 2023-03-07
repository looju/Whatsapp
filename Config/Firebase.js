import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA2kLJzfkhc7Y2q3BAA2SB_xWm8Bg5zUvE",
  authDomain: "whatsapp-bdd11.firebaseapp.com",
  projectId: "whatsapp-bdd11",
  storageBucket: "whatsapp-bdd11.appspot.com",
  messagingSenderId: "620086478424",
  appId: "1:620086478424:web:1dd38149aa32085593ac2d"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);