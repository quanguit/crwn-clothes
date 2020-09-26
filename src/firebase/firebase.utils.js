import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var config = {
    apiKey: "AIzaSyAh_Pfcc_S-CaLOlpwUz9ND4NKHgtd0v4w",
    authDomain: "crwn-db-75efe.firebaseapp.com",
    databaseURL: "https://crwn-db-75efe.firebaseio.com",
    projectId: "crwn-db-75efe",
    storageBucket: "crwn-db-75efe.appspot.com",
    messagingSenderId: "1007961993881",
    appId: "1:1007961993881:web:4ce916712c6b003a3a3e08",
    measurementId: "G-9MREL7VRHL"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
      
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch(error) {
            console.log("error creating user", error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 