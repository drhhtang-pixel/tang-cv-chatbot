"use client";

import React from "react";
import tangProfile from "@/data/tang_profile.json";
import {
  ArrowUpRight,
  Sparkles,
  Globe,
  BookOpen,
  FileText,
  Award,
  ChevronRight,
} from "lucide-react";

interface ProfileSidebarProps {
  onCloseMobile?: () => void;
}

export default function ProfileSidebar({ onCloseMobile }: ProfileSidebarProps) {
  return (
    <aside className="w-full h-full flex flex-col bg-[#fbfbfa] border-r border-neutral-200/80 overflow-y-auto selection:bg-neutral-900 selection:text-white">
      {/* Editorial Profile Header */}
      <div className="p-7 pb-6 border-b border-neutral-200/70 bg-white">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shadow-lg shadow-neutral-950/10 border border-neutral-800">
            <span className="font-serif-title text-xl font-bold tracking-wider text-neutral-100">
              唐
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-medium text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            AI 數位特使在線
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-baseline gap-2">
            <h1 className="font-serif-title text-2xl font-black tracking-tight text-neutral-900">
              {tangProfile.name.zh}
            </h1>
            <span className="text-xs font-semibold text-neutral-400 tracking-wider font-sans uppercase">
              {tangProfile.name.en}
            </span>
          </div>

          <p className="text-xs font-medium text-neutral-700 mt-1.5 leading-snug">
            國立臺灣科技大學 設計系主任兼教授
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            設計創新思考研究室 (DITL) 總監
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-neutral-600 bg-neutral-50/80 p-3.5 rounded-xl border border-neutral-200/60 font-sans">
          {tangProfile.shortBio40Words}
        </p>

        {/* Minimalist Key Metric Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-3 text-left">
            <div className="text-lg font-black tracking-tight text-neutral-900 font-sans">
              22<span className="text-xs font-normal text-neutral-500 ml-0.5">年</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mt-0.5">
              設計教育與產學實踐
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-3 text-left">
            <div className="text-lg font-black tracking-tight text-neutral-900 font-sans">
              20+<span className="text-xs font-normal text-neutral-500 ml-0.5">座</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mt-0.5">
              國際頂尖設計大獎
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-3 text-left">
            <div className="text-lg font-black tracking-tight text-neutral-900 font-sans">
              100+<span className="text-xs font-normal text-neutral-500 ml-0.5">場</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mt-0.5">
              企業創新培訓與工作坊
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-3 text-left">
            <div className="text-lg font-black tracking-tight text-neutral-900 font-sans">
              亞洲首度
            </div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mt-0.5">
              CHI SDC & SDN 金獎
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="p-6 space-y-6 flex-1">
        {/* 2026 Keynote Spotlight Card */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
              2026 最新前瞻演講
            </span>
          </div>

          <a
            href={tangProfile.latestInsights2026.slideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 rounded-2xl bg-neutral-900 text-white shadow-md hover:shadow-xl hover:bg-neutral-950 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-neutral-100 group-hover:text-white leading-snug">
                {tangProfile.latestInsights2026.title}
              </span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white flex-shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
              {tangProfile.latestInsights2026.summary}
            </p>
            <div className="flex items-center gap-1 mt-3 pt-2.5 border-t border-neutral-800 text-[10px] font-semibold text-neutral-300 group-hover:text-white">
              <span>線上閱讀完整投影片</span>
            </div>
          </a>
        </div>

        {/* Core Domains */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5">
            核心研究與實踐領域
          </div>
          <div className="space-y-2">
            {tangProfile.coreDomains.map((domain, idx) => (
              <div
                key={idx}
                className="group p-3 rounded-xl bg-white border border-neutral-200/70 hover:border-neutral-400/80 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-400">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-800">
                    {domain.title}
                  </h4>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed pl-5">
                  {domain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Awards */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-neutral-700" />
            指標大獎紀錄
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-white border border-neutral-200/70">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-neutral-900">
                  ACM CHI SDC Gold Award
                </span>
                <span className="text-[10px] font-semibold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded">
                  亞洲歷史首獲
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                國際人機互動大會學生設計競賽全球金獎
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-neutral-200/70">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-neutral-900">
                  SDN Service Design Gold
                </span>
                <span className="text-[10px] font-semibold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded">
                  亞洲歷史首獲
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                全球服務設計網絡大獎最高金獎
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/50 text-[11px] text-neutral-600 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-neutral-400" />
              <span>累計獲得 Red Dot Best of Best、iF、UXPA 等 20+ 座大獎</span>
            </div>
          </div>
        </div>

        {/* Alumni Placements */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5">
            指導畢業生任職企業
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tangProfile.mentorshipAndAlumni.alumniCompanies.map((company, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200/70 font-medium transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Clean Link Bar */}
      <div className="p-5 border-t border-neutral-200/70 bg-white">
        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">
          相關資源與連結
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href={tangProfile.officialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-transparent hover:border-neutral-200 transition-all"
          >
            <span className="font-medium truncate">DITL 官網</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
          <a
            href={tangProfile.officialLinks.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-transparent hover:border-neutral-200 transition-all"
          >
            <span className="font-medium truncate">Google Scholar</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
          <a
            href={tangProfile.officialLinks.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-transparent hover:border-neutral-200 transition-all"
          >
            <span className="font-medium truncate">Medium 專欄</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
          <a
            href={tangProfile.officialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-transparent hover:border-neutral-200 transition-all"
          >
            <span className="font-medium truncate">FB 粉絲專頁</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </div>
    </aside>
  );
}
