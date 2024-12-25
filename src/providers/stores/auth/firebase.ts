import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2iDwpA-cy6e4hxkgzBTdg4o3HFBxh6RY",
  authDomain: "share-korbo-af4b5.firebaseapp.com",
  projectId: "share-korbo-af4b5",
  storageBucket: "share-korbo-af4b5.appspot.com",
  messagingSenderId: "207921008244",
  appId: "1:207921008244:web:3c53323f7f3f6fd090cb21",
  measurementId: "G-J7FPQ64521",
};

export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
