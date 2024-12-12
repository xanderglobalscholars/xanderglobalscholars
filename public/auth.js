// Import Firebase authentication from firebase.js
import { auth } from "../firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

// Sign Up Functionality
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign up successful! Welcome " + userCredential.user.email);
    document.getElementById("signup-form").reset();
  } catch (error) {
    console.error("Error signing up:", error);
    alert(error.message);
  }
});

// Sign In Functionality
document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Welcome back, " + userCredential.user.email);
    document.getElementById("signin-form").reset();
  } catch (error) {
    console.error("Error signing in:", error);
    alert(error.message);
  }
});

// Sign Out Functionality
document.getElementById("signout-btn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("You have signed out successfully!");
  } catch (error) {
    console.error("Error signing out:", error);
    alert(error.message);
  }
});
