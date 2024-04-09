// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCYGY67NH6iyiG2m3WpTtHwjlmuubMYEy0",

  authDomain: "erzaehlmirwas-8301e.firebaseapp.com",

  projectId: "erzaehlmirwas-8301e",

  storageBucket: "erzaehlmirwas-8301e.appspot.com",

  messagingSenderId: "858448686654",

  appId: "1:858448686654:web:87e7c90ac09707219e6b6f",

  measurementId: "G-ZPEX705915"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);