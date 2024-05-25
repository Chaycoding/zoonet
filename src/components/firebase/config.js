import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyC1VB2bpqeQKAlxuuVMiHbSw-URrq4zm_U",
  authDomain: "zoonetweb-8676b.firebaseapp.com",
  projectId: "zoonetweb-8676b",
  storageBucket: "zoonetweb-8676b.appspot.com",
  messagingSenderId: "424622970497",
  appId: "1:424622970497:web:b838e2205f5d9efd769f80",
  measurementId: "G-LYGQTPXSJ4",
});

// Initialize Firebase

const projectStorage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { projectStorage, auth, provider, analytics, db };
