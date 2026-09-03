"use client";

import React from "react";
import tangProfile from "@/data/tang_profile.json";
import { ArrowRight, Sparkles } from "lucide-react";

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
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
        <span>精選探索問題</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            disabled={disabled}
            onClick={() => onSelectPrompt(prompt)}
            className="group flex items-start justify-between p-3.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/80 hover:border-neutral-400 text-left text-xs text-neutral-700 hover:text-neutral-950 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="leading-relaxed font-medium pr-2">{prompt}</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
