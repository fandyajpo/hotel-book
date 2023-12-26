import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const app: FirebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});

export const auth = getAuth(app);

export const FirebaseAuthError = (e: string) => {
  switch (e) {
    case "auth/email-already-in-use":
      return "Email already use";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/admin-restricted-operation":
      return "Restricted operation";
    case "auth/wrong-password":
      return "Wrong password";
    case "auth/weak-password":
      return "Password too weak";
    case "auth/popup-closed-by-user":
      return "Authentication canceled";
  }
};
