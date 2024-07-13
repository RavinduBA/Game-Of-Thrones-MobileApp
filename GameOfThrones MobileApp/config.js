import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // This imports Firebase Authentication.
import 'firebase/compat/firestore'; // This imports Firebase Firestore, a NoSQL database.



// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfKAwUVMLGuCK_FYcQBCpgngID6hgUVz0",
    authDomain: "gameofthronesapp-795aa.firebaseapp.com",
    projectId: "gameofthronesapp-795aa",
    storageBucket: "gameofthronesapp-795aa.appspot.com",
    messagingSenderId: "718177068508",
    appId: "1:718177068508:web:2250bd2c1308eab2409b19",
    measurementId: "G-X5652KD371"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}



export { firebase }; // Export the initialized Firebase instances
