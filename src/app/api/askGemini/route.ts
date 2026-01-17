import OpenAI from "openai"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
})

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            process.env.EQ_SYSTEM_PROMPT ||
            "You are a supportive, non-clinical emotional support assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    })

    return NextResponse.json({
      reply: response.choices[0].message,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    )
  }
}
