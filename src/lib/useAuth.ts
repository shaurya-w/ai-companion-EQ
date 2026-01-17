//custom hook to check auth state when user logs in or out
//returns user object (could be null or returns username) and loading state

"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "./firebaseAuth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}
