"use client"; 
//Firebase creates the user first, then uses email verification to control access — not existence.

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth"; 
import { auth} from "../lib/firebaseAuth";


const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // =========================
  // SIGN UP (EMAIL + PASSWORD)
  // =========================
  const signUp = async () => {
    setMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);

      setMessage(
        "Verification email sent. Please verify your email before logging in."
      );
    } catch (error: any) {
      setMessage("User already exists, please login.");
    }
  };

  // =========================
  // SIGN IN (EMAIL + PASSWORD)
  // =========================
  const signIn = async () => {
    setMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // IMPORTANT: refresh user data
      await user.reload();

      if (user.emailVerified) {
        router.push("/home");
      } else {
        await signOut(auth);
        setMessage("Please verify your email before continuing.");
      }
    } catch (error : any) {
      setMessage(error.message);
    }
  };

  // =========================
  // GOOGLE SIGN IN
  // =========================
  const signInWithGoogle = async () => {
    setMessage("");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      // Google accounts are verified by default
      if (user.emailVerified) {
        router.push("/home");
      } else {
        await signOut(auth);
        setMessage("Google account not verified.");
      }
    } catch (error : any) {
      setMessage(error.message);
    }
  };

//   // =========================
//   // LOG OUT
//   // =========================
//   const logout = async () => {
//     await signOut(auth);
//     router.push("/login");
//   };

  return (
    <div
  style={{
    maxWidth: 420,
    margin: "60px auto",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
    backgroundColor: "#fff",
  }}
>
  <h2 style={{ textAlign: "center", marginBottom: 10, fontSize: 24 }}>
    Sign in to <span style={{ color: "#4f46e5", fontWeight: "bold" }}>EQ</span>
  </h2>

  <p style={{
    color: "gray", textAlign: "center", marginBottom: 24
  }}
>Your account is only used to manage access. Chat messages are not saved and are deleted when your session ends.</p>

  <input
    type="email"
    placeholder="Email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={{
      width: "100%",
      padding: "12px 14px",
      marginBottom: 12,
      borderRadius: 8,
      border: "1px solid #d1d5db",
      fontSize: 14,
    }}
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "12px 14px",
      marginBottom: 16,
      borderRadius: 8,
      border: "1px solid #d1d5db",
      fontSize: 14,
    }}
  />

  <div style={{ display: "flex", gap: 10 }}>
    <button
      onClick={signUp}
      style={{
        flex: 1,
        padding: "12px",
        borderRadius: 8,
        border: "1px solid #4f46e5",
        backgroundColor: "#fff",
        color: "#4f46e5",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Sign Up
    </button>

    <button
      onClick={signIn}
      style={{
        flex: 1,
        padding: "12px",
        borderRadius: 8,
        border: "none",
        backgroundColor: "#4f46e5",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Login
    </button>
  </div>

  <button
    onClick={signInWithGoogle}
    style={{
      width: "100%",
      marginTop: 14,
      padding: "12px",
      borderRadius: 8,
      border: "1px solid #d1d5db",
      backgroundColor: "#fff",
      fontWeight: 500,
      cursor: "pointer",
    }}
  >
    Continue with Google
  </button>

  {/* <button
    onClick={logout}
    style={{
      width: "100%",
      marginTop: 10,
      padding: "10px",
      borderRadius: 8,
      border: "none",
      backgroundColor: "#f3f4f6",
      color: "#374151",
      fontSize: 13,
      cursor: "pointer",
    }}
  >
    Logout
  </button> */}

  {message && (
    <p
      style={{
        marginTop: 14,
        textAlign: "center",
        color: "#dc2626",
        fontSize: 14,
      }}
    >
      {message}
    </p>

  )}
</div>

     
  );
};

export default Auth;
