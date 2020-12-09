import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var config = {
    apiKey: "AIzaSyAIQm0So0JKUPHOXdbLluXyBoLFnutSr0k",
    authDomain: "crwn-db-a85a0.firebaseapp.com",
    databaseURL: "https://crwn-db-a85a0.firebaseio.com",
    projectId: "crwn-db-a85a0",
    storageBucket: "crwn-db-a85a0.appspot.com",
    messagingSenderId: "550904705536",
    appId: "1:550904705536:web:55d1562b92871748b21ee5",
    measurementId: "G-XZN3V1CHM3"
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