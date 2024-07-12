// firebase config key setup

// This code snippet sets up and initializes Firebase for a React Native
// allowing you to use Firebase services like Authentication and Firestore.

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';            //This imports Firebase Authentication.
import 'firebase/compat/firestore';      //his imports Firebase Firestore, a NoSQL database.

//Web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyDfKAwUVMLGuCK_FYcQBCpgngID6hgUVz0", //A unique key that identifies your Firebase project and allows you to connect to Firebase services.
    authDomain: "gameofthronesapp-795aa.firebaseapp.com",
    projectId: "gameofthronesapp-795aa",
    storageBucket: "gameofthronesapp-795aa.appspot.com",
    messagingSenderId: "718177068508",
    appId: "1:718177068508:web:2250bd2c1308eab2409b19",
    measurementId: "G-X5652KD371"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase};  //xports the initialized Firebase instance so it can be used in other parts of your application.