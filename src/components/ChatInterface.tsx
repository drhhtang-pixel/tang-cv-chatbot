"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message } from "@/lib/gemini";
import ChatMessage from "./ChatMessage";
import SuggestedPrompts from "./SuggestedPrompts";
import {
  ArrowUp,
  RotateCcw,
  AlertCircle,
  Loader2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface ChatInterfaceProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: `您好！我是國立臺灣科技大學設計系主任兼教授、設計創新思考研究室（DITL）總監 **唐玄輝教授（Prof. Hsien-Hui Tang）** 的 AI 數位特使。\n\n我能代表唐老師向您介紹他在**體驗戰略、服務創新、AI 應用**的 22 年實踐與教育成果：\n- 🏆 **累計 20+ 座國際頂尖大獎**（包含亞洲首度奪得 ACM CHI SDC 金獎與 SDN 服務設計金獎紀錄）\n- 🎓 **頂尖企業校友網絡**（遍佈 Google、微軟、台積電、阿里巴巴等頂尖機構）\n- 💼 **百場企業內訓與產學合作**（涵蓋 P&G、富邦銀行、大潤發、公部門公共服務改革等）\n- 💡 **2026 前瞻觀點**（《人工智慧浪潮中 創新的改變及 設計的消逝與重生》）\n\n您可以點擊下方的精選問題，或隨時在輸入框中提問！`,
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
    if (window.confirm("確定要重置並清空對話紀錄嗎？")) {
      setMessages([INITIAL_MESSAGE]);
      setErrorMessage(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#fafaf9] relative overflow-hidden">
      {/* Top Floating Bar */}
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-neutral-200/70 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              title={isSidebarOpen ? "收合左側經歷" : "展開左側經歷"}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4" />
              )}
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div>
              <h2 className="text-sm font-bold text-neutral-900 leading-tight">
                唐玄輝教授 AI 數位特使
              </h2>
              <p className="text-[11px] text-neutral-400 font-medium">
                National Taiwan University of Science and Technology • DITL
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <button
              onClick={handleClearHistory}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              title="重新對話"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">重置對話</span>
            </button>
          )}
        </div>
      </header>

      {/* Messages List Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 space-y-4">
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
            <div className="my-8 animate-fade-in-slide">
              <SuggestedPrompts
                onSelectPrompt={(p) => handleSend(p)}
                disabled={isLoading}
              />
            </div>
          )}

          {/* Error Message Box */}
          {errorMessage && (
            <div className="my-4 p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-red-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Bottom Input Area */}
      <footer className="bg-gradient-to-t from-[#fafaf9] via-[#fafaf9] to-transparent p-4 md:p-6 z-10">
        <div className="max-w-3xl mx-auto w-full">
          <div className="relative rounded-2xl border border-neutral-300/80 bg-white shadow-sm focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              placeholder="詢問唐老師的研究領域、國際大獎、學生出路或 2026 AI 設計觀點..."
              className="w-full resize-none bg-transparent py-3.5 pl-4 pr-24 text-[13.5px] text-neutral-900 placeholder-neutral-400 focus:outline-none disabled:opacity-50"
            />

            <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
              <span className="text-[10px] font-mono text-neutral-400 select-none">
                {input.length}/{MAX_CHARS}
              </span>

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-200 text-white flex items-center justify-center transition-colors shadow-xs"
                title="發送提問"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-[10px] text-neutral-400 tracking-wider mt-2.5">
            PROF. HSIEN-HUI TANG • DESIGN INNOVATION & THINKING LAB (DITL) • AI AMBASSADOR
          </p>
        </div>
      </footer>
    </div>
  );
}
