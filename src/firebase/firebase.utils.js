import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCl5zrEX39F0PHlNLi6ANQTWZiHQ9HMlpk",
    authDomain: "crwn-db-604c0.firebaseapp.com",
    projectId: "crwn-db-604c0",
    storageBucket: "crwn-db-604c0.appspot.com",
    messagingSenderId: "599371818917",
    appId: "1:599371818917:web:4691b25b1b25a45a182a4c",
    measurementId: "G-WRCQVE4YGC"
};

export const createUserProfileDocument = async (userAuth, ...additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

