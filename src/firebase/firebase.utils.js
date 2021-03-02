import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var config = {
    apiKey: "AIzaSyBtVff75D_EaJDev_g4pxRMzjVJSzhyR6Q",
    authDomain: "crwn-db2-c433c.firebaseapp.com",
    projectId: "crwn-db2-c433c",
    storageBucket: "crwn-db2-c433c.appspot.com",
    messagingSenderId: "1066148447742",
    appId: "1:1066148447742:web:2508d898fb8675575d6caf",
    measurementId: "G-VZWLBEJC8Y"
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // console.log(collectionRef);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        // console.log(newDocRef); (doc.title)
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(docSnapshot => {
        const {title, items} = docSnapshot.data();
        // console.log(docSnapshot.data());
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        }
    });
    // console.log(transformedCollection);

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

firebase.initializeApp(config);

// check user session
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google sign in
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase; 