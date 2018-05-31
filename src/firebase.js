import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyBA8VepbZusr68oUNVOOZ3k9L3ZOj7H7-k",
    authDomain: "react-posts-cf3c3.firebaseapp.com",
    databaseURL: "https://react-posts-cf3c3.firebaseio.com",
    projectId: "react-posts-cf3c3",
    storageBucket: "react-posts-cf3c3.appspot.com",
    messagingSenderId: "875536077479"
}

firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase;