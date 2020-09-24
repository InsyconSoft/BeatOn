import Firebase from 'firebase';
import 'firebase/storage';

let config = {
    apiKey: "AIzaSyAfMBiCWyMnPGuejJxbxxrhbfH9ovzfhIM",
    authDomain: "beaton-68687.firebaseapp.com",
    databaseURL: "https://beaton-68687.firebaseio.com",
    projectId: "beaton-68687",
    storageBucket: "beaton-68687.appspot.com",
    messagingSenderId: "213969279565",
    appId: "1:213969279565:web:fe7185a194669e8a2a5a04",
    measurementId: "G-PE44ZX7E2V"
};
let app = Firebase.initializeApp(config);
export const db = app.database(); 


