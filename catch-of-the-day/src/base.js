import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBg8w6bmzIaiMT2ey0sFTbFMCpzYxO4fCQ",
  authDomain: "catch-of-the-day-jina.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jina.firebaseio.com",
  projectId: "catch-of-the-day-jina",
  storageBucket: "catch-of-the-day-jina.appspot.com",
  messagingSenderId: "613593917428",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
