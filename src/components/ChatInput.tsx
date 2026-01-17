//child component for home
"use client"

import { useState } from "react"
import { Button } from "./ui/button";

type Props = {
  addMessage: (message: { role: "user" | "ai"; content: string }) => void
}

export default function ChatInput({ addMessage }: Props) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!message.trim()) return

    //fn call to add user message in parent component
    addMessage({ role: "user", content: message })

    setLoading(true)

    const res = await fetch("/api/askGemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    const data = await res.json()
    const aiReply = data.reply.content

    //fn call to add ai message in parent component
    addMessage({ role: "ai", content: aiReply })

    //clear input box and stop loading
    setMessage("")
    setLoading(false)
  }

  return (
    <div className="flex gap-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Gemini..."
        className="w-full rounded-md border bg-background p-3 outline-none focus:ring-2"
        disabled={loading}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="rounded-md bg-primary px-4 text-primary-foreground"
      >
        Send
      </button>
    </div>
  )
}
