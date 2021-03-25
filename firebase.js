import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCfRLAa14RrN6QQZNFOaNS3VEf_jGd6xEA",
    authDomain: "nextjsblog-50c9f.firebaseapp.com",
    projectId: "nextjsblog-50c9f",
    storageBucket: "nextjsblog-50c9f.appspot.com",
    messagingSenderId: "968067246305",
    appId: "1:968067246305:web:1fc61dad716ece73a1afa0"
  };


if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth  = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}


