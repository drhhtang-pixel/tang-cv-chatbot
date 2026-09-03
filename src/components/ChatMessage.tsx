"use client";

import React, { useState } from "react";
import { Message } from "@/lib/gemini";
import { Copy, Check, ArrowUpRight } from "lucide-react";

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
      className={`flex w-full my-4 ${
        isUser ? "justify-end" : "justify-start"
      } animate-fade-in-slide`}
    >
      <div
        className={`flex max-w-[92%] md:max-w-[82%] items-start gap-3.5 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-7 h-7 rounded-xl bg-neutral-200 text-neutral-700 flex items-center justify-center text-[10px] font-bold tracking-wider">
              YOU
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center shadow-xs border border-neutral-800">
              <span className="font-serif-title text-xs font-bold tracking-wider text-neutral-100">
                唐
              </span>
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`relative group rounded-2xl px-5 py-4 text-[13.5px] leading-relaxed transition-all ${
            isUser
              ? "bg-neutral-900 text-neutral-100 rounded-tr-xs shadow-xs font-sans"
              : "bg-white text-neutral-800 border border-neutral-200/80 rounded-tl-xs shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-neutral-300"
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
              <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-neutral-900 animate-pulse" />
            )}
          </div>

          {/* Copy Button for Assistant */}
          {!isUser && message.content && (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
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
 * Editorial Markdown formatting
 */
function FormattedMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2 text-neutral-800">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Header 3: ### Title
        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={idx}
              className="font-serif-title text-base font-bold text-neutral-900 mt-3 mb-1"
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
              className="font-serif-title text-lg font-bold text-neutral-900 mt-4 mb-1.5"
            >
              {parseInlineText(trimmed.slice(3))}
            </h3>
          );
        }

        // Bullet point: - or *
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 mt-2 flex-shrink-0" />
              <div className="flex-1 leading-relaxed">
                {parseInlineText(trimmed.slice(2))}
              </div>
            </div>
          );
        }

        // Numbered list: 1. 2. etc
        const matchNumber = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (matchNumber) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1">
              <span className="font-mono text-xs font-bold text-neutral-500 mt-0.5 min-w-[16px]">
                {matchNumber[1]}.
              </span>
              <div className="flex-1 leading-relaxed">
                {parseInlineText(matchNumber[2])}
              </div>
            </div>
          );
        }

        // Regular paragraph line
        return (
          <p key={idx} className="leading-relaxed">
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
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-neutral-950">
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
          className="inline-flex items-center gap-0.5 font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-4 hover:decoration-neutral-950 transition-colors"
        >
          {linkText}
          <ArrowUpRight className="w-3 h-3 inline ml-0.5 opacity-60" />
        </a>
      );
    }
    return part;
  });
}
