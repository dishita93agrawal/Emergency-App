import  firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBN4mqUYGH-BiNUgJev5FoQGESfxDU4Euw",
  authDomain: "emergency-helpline-app-f7746.firebaseapp.com",
  projectId: "emergency-helpline-app-f7746",
  storageBucket: "emergency-helpline-app-f7746.appspot.com",
  messagingSenderId: "1090794114936",
  appId: "1:1090794114936:web:78f02a5fac8d0fc14a028d"
};
// Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}else{
  firebase.app()
}
export default firebase.firestore();