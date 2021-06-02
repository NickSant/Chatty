import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCWmN-D9PLYtH7FZk4wb4rguxbJt75Qbks",
    authDomain: "chatty-27400.firebaseapp.com",
    projectId: "chatty-27400",
    storageBucket: "chatty-27400.appspot.com",
    messagingSenderId: "608604169274",
    appId: "1:608604169274:web:b633ce74b199560e448103"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }

