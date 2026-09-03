"use client";

import React, { useState } from "react";
import { Message } from "@/lib/gemini";
import { Copy, Check, ExternalLink } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export default function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex w-full my-3 ${
        isUser ? "justify-end" : "justify-start"
      } animate-in fade-in duration-300`}
    >
      <div
        className={`flex max-w-[90%] md:max-w-[80%] items-start gap-3 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          {isUser ? (
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
              訪客
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-blue-500/10">
              唐
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`relative group rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all shadow-sm ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-none font-sans"
              : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none hover:border-slate-300"
          }`}
        >
          {/* Content renderer */}
          <div className="whitespace-pre-wrap break-words">
            {isUser ? (
              message.content
            ) : (
              <FormattedMarkdown text={message.content} />
            )}
            {isStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-blue-600 animate-pulse" />
            )}
          </div>

          {/* Copy Button for Assistant */}
          {!isUser && message.content && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="複製內容"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Lightweight formatting for bold, bullets, links, and headers without heavy dependencies
 */
function FormattedMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty line
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Header 3: ### Title
        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={idx}
              className="text-base font-bold text-slate-900 mt-2 mb-1"
            >
              {parseInlineText(trimmed.slice(4))}
            </h4>
          );
        }

        // Header 2: ## Title
        if (trimmed.startsWith("## ")) {
          return (
            <h3
              key={idx}
              className="text-lg font-bold text-slate-900 mt-2.5 mb-1.5"
            >
              {parseInlineText(trimmed.slice(3))}
            </h3>
          );
        }

        // Bullet point: - or *
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-blue-500 font-bold mt-1 text-xs">•</span>
              <span className="flex-1">{parseInlineText(trimmed.slice(2))}</span>
            </div>
          );
        }

        // Numbered list: 1. 2. etc
        const matchNumber = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (matchNumber) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-blue-600 font-semibold text-xs mt-0.5 min-w-[16px]">
                {matchNumber[1]}.
              </span>
              <span className="flex-1">{parseInlineText(matchNumber[2])}</span>
            </div>
          );
        }

        // Regular paragraph line
        return (
          <p key={idx} className="text-slate-800">
            {parseInlineText(line)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Inline parser for **bold** and [links](url)
 */
function parseInlineText(text: string): React.ReactNode[] {
  // Regex to match **bold** or [text](url)
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const closeBracket = part.indexOf("](");
      const linkText = part.slice(1, closeBracket);
      const linkUrl = part.slice(closeBracket + 2, -1);
      return (
        <a
          key={index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-blue-600 hover:text-blue-800 underline font-medium"
        >
          {linkText}
          <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline" />
        </a>
      );
    }
    return part;
  });
}
