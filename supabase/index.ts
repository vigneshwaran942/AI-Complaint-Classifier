// @ts-nocheck
import { serve } from "https://deno.land/std@0.208.0/http/server.ts"

serve(async (req: Request) => {
  const { text } = await req.json()

  let category = "General"
  let priority = "Low"
  let solution = "Our support team will contact you."

  const lower = text.toLowerCase()

  // Classification + Solutions
  if (lower.includes("internet") || lower.includes("network")) {
    category = "Network Issue"
    priority = "High"
    solution = "Restart your router. If the issue continues, contact technical support."
  } 
  else if (lower.includes("bill") || lower.includes("payment")) {
    category = "Billing Issue"
    priority = "Medium"
    solution = "Check your billing details. If incorrect, raise a complaint in billing support."
  } 
  else if (lower.includes("account") || lower.includes("login")) {
    category = "Account Problem"
    priority = "Medium"
    solution = "Try resetting your password or contact support."
  } 
  else if (lower.includes("upgrade") || lower.includes("plan")) {
    category = "Service Request"
    priority = "Low"
    solution = "Go to your dashboard → My Plans → Upgrade."
  }

  // Critical detection
  if (lower.includes("urgent") || lower.includes("not working") || lower.includes("down")) {
    priority = "Critical"
    solution = "Critical issue detected. Please contact support immediately."
  }

  // Question handling
  if (lower.includes("how") || lower.includes("what") || lower.includes("why")) {
    solution = "Answer: " + solution
  }

  return new Response(
    JSON.stringify({ category, priority, solution }),
    { headers: { "Content-Type": "application/json" } }
  )
})