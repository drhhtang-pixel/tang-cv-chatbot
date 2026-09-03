"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message } from "@/lib/gemini";
import ChatMessage from "./ChatMessage";
import SuggestedPrompts from "./SuggestedPrompts";
import {
  Send,
  Trash2,
  AlertCircle,
  Loader2,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface ChatInterfaceProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: `您好！我是國立臺灣科技大學設計系主任兼教授、設計創新思考研究室（DITL）總監 **唐玄輝教授（Prof. Hsien-Hui Tang）** 的 AI 數位特使。\n\n我能代表唐老師為您介紹他在**體驗戰略、服務創新、AI 創新應用**的 22 年實踐與教育成就，包含：\n- 🏆 **累計 20+ 座國際大獎**（包含亞洲首度奪得 ACM CHI SDC 金獎與 SDN 服務設計金獎紀錄）\n- 🎓 **頂尖企業畢業生網絡**（遍佈 Google、微軟、台積電、阿里巴巴等）\n- 💼 **百場企業培訓與產學合作**（包含 P&G、富邦銀行、大潤發、公部門公共服務改革等）\n- 💡 **2026 前瞻洞見**（《人工智慧浪潮中 創新的改變及 設計的消逝與重生》）\n\n您可以點擊下方的常見問題，或直接在對話框中輸入您想了解的內容！`,
};

const MAX_CHARS = 500;

export default function ChatInterface({
  onToggleSidebar,
  isSidebarOpen,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Adjust textarea height automatically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  }, [input]);

  const handleSend = async (userPrompt?: string) => {
    const textToSend = (userPrompt || input).trim();
    if (!textToSend || isLoading) return;

    setErrorMessage(null);
    setInput("");

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: textToSend },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    // Placeholder for assistant stream
    const assistantIndex = newMessages.length;
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `連線錯誤 (${response.status})，請稍後再試。`
        );
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("無法讀取回應串流");

      const decoder = new TextDecoder();
      let streamedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          if (updated[assistantIndex]) {
            updated[assistantIndex] = {
              ...updated[assistantIndex],
              content: streamedContent,
            };
          }
          return updated;
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "發生未知錯誤";
      setErrorMessage(msg);
      // Remove empty assistant placeholder if failed completely
      setMessages((prev) => {
        if (
          prev[assistantIndex] &&
          prev[assistantIndex].content.trim() === ""
        ) {
          return prev.slice(0, assistantIndex);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("確定要重置並清空當前對話紀錄嗎？")) {
      setMessages([INITIAL_MESSAGE]);
      setErrorMessage(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title={isSidebarOpen ? "收合履歷資訊" : "展開履歷資訊"}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeftOpen className="w-5 h-5" />
              )}
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                唐玄輝教授 AI 數位特使
              </h2>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                台科大設計系 • DITL 創新思考研究室 • 線上即時問答
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <button
              onClick={handleClearHistory}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="重新對話"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">清除對話</span>
            </button>
          )}
        </div>
      </header>

      {/* Messages List Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-4">
        <div className="max-w-3xl mx-auto w-full">
          {messages.map((message, index) => {
            const isLastAssistant =
              isLoading &&
              message.role === "assistant" &&
              index === messages.length - 1;
            return (
              <ChatMessage
                key={index}
                message={message}
                isStreaming={isLastAssistant}
              />
            );
          })}

          {/* Show Suggested Prompts when only initial message exists */}
          {messages.length === 1 && (
            <div className="my-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <SuggestedPrompts
                onSelectPrompt={(p) => handleSend(p)}
                disabled={isLoading}
              />
            </div>
          )}

          {/* Error Message Box */}
          {errorMessage && (
            <div className="my-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Bottom Input Area */}
      <footer className="bg-white border-t border-slate-200/80 p-3 md:p-4 z-10">
        <div className="max-w-3xl mx-auto w-full">
          {/* Input Box Container */}
          <div className="relative rounded-2xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              placeholder="詢問唐老師的研究領域、國際獲獎、學生出路或 2026 AI 觀點..."
              className="w-full resize-none bg-transparent py-3 pl-4 pr-24 text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:opacity-50"
            />

            {/* Right Action Buttons */}
            <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400 select-none mr-1">
                {input.length}/{MAX_CHARS}
              </span>

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white flex items-center justify-center transition-colors shadow-xs"
                title="發送訊息 (Enter)"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-2">
            AI 生成內容依據唐玄輝教授公開之學術與產學經歷資料庫整理，具備對話防護機制。
          </p>
        </div>
      </footer>
    </div>
  );
}
