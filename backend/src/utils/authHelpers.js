import { auth } from "../firebase"; // Path relative to src/utils
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// Register a new user
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User Registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error Registering User:", error.message);
    throw error;
  }
};

// Log in an existing user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User Logged In:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error Logging In User:", error.message);
    throw error;
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password Reset Email Sent");
  } catch (error) {
    console.error("Error Sending Reset Email:", error.message);
    throw error;
  }
};

// Log out the user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User Logged Out");
  } catch (error) {
    console.error("Error Logging Out User:", error.message);
    throw error;
  }
};
