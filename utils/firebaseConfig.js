import Constants from "expo-constants";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseApiKey = Constants.expoConfig.extra.firebaseApiKey;

const firebaseConfig = {
  apiKey: firebaseApiKey,

  authDomain: "erzaehlmirwas-8301e.firebaseapp.com",

  projectId: "erzaehlmirwas-8301e",

  storageBucket: "erzaehlmirwas-8301e.appspot.com",

  messagingSenderId: "858448686654",

  appId: "1:858448686654:web:87e7c90ac09707219e6b6f",

  measurementId: "G-ZPEX705915",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { app, auth };
