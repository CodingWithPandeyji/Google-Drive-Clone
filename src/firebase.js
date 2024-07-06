import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    // apiKey: "AIzaSyA4T3TSMBUBwTIE6Y2dqPdMMQqOqBqzZCI",
    // authDomain: "drive-clone-7333a.firebaseapp.com",
    // projectId: "drive-clone-7333a",
    // storageBucket: "drive-clone-7333a.appspot.com",
    // messagingSenderId: "24378395176",
    // appId: "1:24378395176:web:de7053e8bbcd73cfa8c31d"
    apiKey: "AIzaSyALQXJqceayhBWitf6jPc0GNxsr_K8WSrc",
    authDomain: "drive-clone-ac53c.firebaseapp.com",
    projectId: "drive-clone-ac53c",
    storageBucket: "drive-clone-ac53c.appspot.com",
    messagingSenderId: "242572578653",
    appId: "1:242572578653:web:b8012b0319a3ee088be2b4"
  

};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider, signInWithPopup };
