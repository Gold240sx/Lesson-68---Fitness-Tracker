// imports
import { initializeApp } from 'firebase/firebase-app'
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firebase-firestore'
import { firebaseConfig } from './config.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// init firebase app
const db = getFirestore(app)

// // collection ref
// export const colRef = collection(db, 'workouts')

// getDocs(colRef)
//     .then((snapshot) => {
//         console.log(snapshot.docs)
//     })


console.log('ello fire')