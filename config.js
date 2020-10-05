import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyAfMBiCWyMnPGuejJxbxxrhbfH9ovzfhIM",
  authDomain: "beaton-68687.firebaseapp.com",
  databaseURL: "https://beaton-68687.firebaseio.com",
  projectId: "beaton-68687",
  storageBucket: "beaton-68687.appspot.com",
  messagingSenderId: "213969279565",
  appId: "1:213969279565:web:fe7185a194669e8a2a5a04",
  measurementId: "G-PE44ZX7E2V"
};

firebase.initializeApp(config)

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth(); 
export const storage = firebase.storage();