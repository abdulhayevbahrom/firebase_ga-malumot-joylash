import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGZ_PM-tPHOEjNXbAYH97Jt-ZgoFg9Cmw",
  authDomain: "review-64557.firebaseapp.com",
  projectId: "review-64557",
  storageBucket: "review-64557.appspot.com",
  messagingSenderId: "762170106635",
  appId: "1:762170106635:web:6e97122a5130ad39eb780e",
  measurementId: "G-DV7BDLVHTR"
};

const app = firebase.initializeApp(firebaseConfig);
const db  = app.firestore();
export {db, firebase}


