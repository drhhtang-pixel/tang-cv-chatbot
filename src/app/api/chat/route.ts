import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";
import { streamGeminiChat, Message } from "@/lib/gemini";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp =
      forwardedFor?.split(",")[0]?.trim() || realIp || "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp, 12, 60 * 1000); // 12 requests per minute
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `請求太過頻繁，為保護系統資源，請於 ${rateLimit.resetSeconds} 秒後再試。`,
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    const body = await req.json();
    const rawMessages: Message[] = body.messages;

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json(
        { error: "無效的訊息格式 (Invalid message format)" },
        { status: 400 }
      );
    }

    // 3. Message Length & Conversation Length Restrictions (Anti-Abuse)
    const MAX_CHARS_PER_MSG = 600;
    const MAX_HISTORY_TURNS = 10;

    const recentMessages = rawMessages.slice(-MAX_HISTORY_TURNS);
    const sanitizedMessages: Message[] = recentMessages.map((m) => {
      const trimmed = (m.content || "").slice(0, MAX_CHARS_PER_MSG).trim();
      return {
        role: m.role === "assistant" ? "assistant" : "user",
        content: trimmed,
      };
    });

    const lastMsg = sanitizedMessages[sanitizedMessages.length - 1];
    if (!lastMsg || !lastMsg.content) {
      return NextResponse.json(
        { error: "提問內容不能為空" },
        { status: 400 }
      );
    }

    // 4. Stream response from Gemini
    const stream = await streamGeminiChat(
      sanitizedMessages,
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_MODEL || "gemini-2.5-flash"
    );

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "伺服器內部錯誤";
    console.error("Chat API Route Error:", err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
