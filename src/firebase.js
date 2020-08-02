import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyAgshCLLXOR0PFvt06cCdLtypkR8_PzC5E",
    authDomain: "vladtodo.firebaseapp.com",
    databaseURL: "https://vladtodo.firebaseio.com",
    projectId: "vladtodo",
    storageBucket: "vladtodo.appspot.com",
    messagingSenderId: "277826515008",
    appId: "1:277826515008:web:c6db229600b7af2ee22fa5"
  });
  
  const  db = firebase.firestore();
  const  auth = firebase.auth();


export { db, auth };