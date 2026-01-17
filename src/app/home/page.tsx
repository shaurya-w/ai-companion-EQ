"use client"

import { useState } from "react"
import ChatInput from "@/components/ChatInput"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebaseAuth"
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai"
  content: string
}

export default function Home() {
  const router = useRouter();

  //array of messages in state
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "What's been on your mind?" },
  ])

  function addMessage(message: Message) {
    setMessages((prev) => [...prev, message])
  }
  //“Take the previous messages array, copy everything in it, and add the new message at the end.”
  //because you dont append in arrays in react state directly

  const logout = async () => {
    await signOut(auth);
      router.push("/");
  };
  
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex justify-between border-b px-6 py-4 text-lg font-semibold">
        <h1>EQ Lens</h1>
        <Button onClick={logout}>Logout</Button>
      </header>
      

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xl rounded-lg p-4 ${
                msg.role === "ai"
                  ? "bg-muted"
                  : "ml-auto bg-primary text-primary-foreground"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </main>

      {/* Input */}
      <footer className="border-t p-4">
        <ChatInput addMessage={addMessage} />
      </footer>
    </div>
  )
}
