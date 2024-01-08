// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrVk_F8AD-1-nO6Y3BhTqKBDm-O7q4IRU",
  authDomain: "singin-signon.firebaseapp.com",
  projectId: "singin-signon",
  storageBucket: "singin-signon.appspot.com",
  messagingSenderId: "314145854314",
  appId: "1:314145854314:web:31ad9fe231733bdc8d4b13",
  measurementId: "G-MTXEZ70023",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = getAnalytics(app);

export default firebase;
