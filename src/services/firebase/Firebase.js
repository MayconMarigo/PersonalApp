import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrgV-_fC4A8mEjQjNPpRd_DAOQAXHBkYY",
  authDomain: "apppersonal-1a1e1.firebaseapp.com",
  projectId: "apppersonal-1a1e1",
  storageBucket: "apppersonal-1a1e1.appspot.com",
  messagingSenderId: "58828748722",
  appId: "1:58828748722:web:63d77c9fe8f32c004a16ab",
  measurementId: "G-Z9W15X2GSC",
};

const app = initializeApp(firebaseConfig);

const LoginWithGoogle = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  try {
    signInWithRedirect(auth, provider)
  } catch (error) {
    console.warn(error)
    return error;
  }
};

export default LoginWithGoogle