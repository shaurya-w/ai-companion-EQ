"use client"

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { app } from "./firebase"

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()

// Google sign-in
export async function signInWithGoogle() {
  return await signInWithPopup(auth, googleProvider)
}

// Sign out
export async function logout() {
  return await signOut(auth)
}
