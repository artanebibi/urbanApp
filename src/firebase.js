import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {GoogleAuthProvider, signInWithPopup, GithubAuthProvider} from "firebase/auth"


import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCv8UUs0Gk3VoAdUMtuk3RCP9viopS9fEU",
    authDomain: "urban-app-92c07.firebaseapp.com",
    projectId: "urban-app-92c07",
    storageBucket: "urban-app-92c07.appspot.com",
    messagingSenderId: "1011588780692",
    appId: "1:1011588780692:web:e3ef0765fb5f8754b91a81",
    measurementId: "G-WFMP5T1KB4"
})

export const auth = app.auth()
export default app;
export const db = firebase.firestore();

const providerGoogle = new GoogleAuthProvider()
const providerGitHub = new GithubAuthProvider()



export const singInGoogle = () => {
    signInWithPopup(auth, providerGoogle)
        .then((result) => {

            console.log(result)
    })
        .catch((error) => {
        console.log(error)
    });
}



export const singInGitHub = () =>  {
    signInWithPopup(auth, providerGitHub)
        .then((result) => {
            console.log(result)
    })
        .catch((error) => {
        console.log(error)
    });
}