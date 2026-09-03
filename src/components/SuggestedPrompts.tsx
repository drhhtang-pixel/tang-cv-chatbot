"use client";

import React from "react";
import tangProfile from "@/data/tang_profile.json";
import { Sparkles, MessageCircleQuestion } from "lucide-react";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export default function SuggestedPrompts({
  onSelectPrompt,
  disabled,
}: SuggestedPromptsProps) {
  const prompts = tangProfile.suggestedPrompts || [
    "請介紹唐玄輝老師的核心專業領域與背景",
    "唐老師曾獲哪些國際大獎？指導團隊的歷史紀錄是什麼？",
    "學生畢業後的出路與指導特色如何？",
    "唐老師進行過哪些企業培訓與產學合作？",
    "唐老師近期對 2026 AI 浪潮中「設計的消逝與重生」有何觀點？",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2.5">
        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        <span>您可以點選常見問題快速開始：</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            disabled={disabled}
            onClick={() => onSelectPrompt(prompt)}
            className="flex items-start gap-2 text-left p-2.5 rounded-xl bg-white hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-200 text-xs text-slate-700 hover:text-blue-900 transition-all shadow-xs group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageCircleQuestion className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="leading-snug">{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
