"use client"
{/* reusable main component to handle authentication and routing */}

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/useAuth"

type Props = {
  children: React.ReactNode
}

export default function Main({ children }: Props) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/home")
    }
  }, [user, loading, router])

  // While checking auth, render nothing or loader
  if (loading) return null
  //This prevents flashing login UI for logged-in users

  // If logged in, redirecting… don’t render children
  if (user) return null

  // If NOT logged in, show whatever is inside <Main>
  return <>{children}</>
  //runs if User is NOT logged in Show whatever was wrapped inside <Main> (login component in this case)
}
