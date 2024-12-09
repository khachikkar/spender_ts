
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDiM8AWV54S0YKlc8mJOAenAIZT3b7b2UQ",
    authDomain: "spender-db17c.firebaseapp.com",
    projectId: "spender-db17c",
    storageBucket: "spender-db17c.firebasestorage.app",
    messagingSenderId: "829018044292",
    appId: "1:829018044292:web:1310fd4e634cc06bd80fd1",
    measurementId: "G-9CKEXKVMWK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {
    auth,
    db
}


