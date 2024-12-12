// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add Authentication service

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7BwRfi9XdroGIQ2EgFmWNNzXVtUiAueA",
  authDomain: "xander-global-scholars.firebaseapp.com",
  projectId: "xander-global-scholars",
  storageBucket: "xander-global-scholars.appspot.com",
  messagingSenderId: "671586365503",
  appId: "1:671586365503:web:0767840e3a062724c1088a",
  measurementId: "G-TBH2K4NZB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Authentication

// Log Firebase initialization
console.log("Firebase App Initialized:", app);

// Export modules for use in other files
export { app, analytics, auth };
