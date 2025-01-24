// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9bzOM0qbVjxNxxRv_2WNwc5ns7vipGEs",
  authDomain: "todo-app-7045c.firebaseapp.com",
  projectId: "todo-app-7045c",
  storageBucket: "todo-app-7045c.firebasestorage.app",
  messagingSenderId: "1016655881692",
  appId: "1:1016655881692:web:1141f6b58741ee800a5b19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
