import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';




const firebaseConfig = {
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
  