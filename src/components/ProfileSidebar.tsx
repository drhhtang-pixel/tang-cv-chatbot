"use client";

import React from "react";
import tangProfile from "@/data/tang_profile.json";
import {
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Users,
  Sparkles,
  Globe,
  FileText,
  Presentation,
} from "lucide-react";

interface ProfileSidebarProps {
  onCloseMobile?: () => void;
}

export default function ProfileSidebar({ onCloseMobile }: ProfileSidebarProps) {
  return (
    <aside className="w-full h-full flex flex-col bg-white border-r border-slate-200 overflow-y-auto">
      {/* Header Profile Info */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-blue-500/20">
              唐
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              {tangProfile.name.zh}
              <span className="text-xs font-normal text-slate-500 font-sans">
                {tangProfile.name.en}
              </span>
            </h1>
            <p className="text-xs font-medium text-blue-600 mt-0.5">
              臺科大設計系主任兼教授
            </p>
            <p className="text-xs text-slate-500">
              設計創新思考研究室 (DITL) 總監
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
          {tangProfile.shortBio40Words}
        </p>

        {/* Quick Badges */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-blue-50/70 border border-blue-100/80 rounded-lg p-2 text-center">
            <span className="block text-base font-bold text-blue-700">22+ 年</span>
            <span className="text-[10px] text-blue-600/80 font-medium">設計教育與實踐</span>
          </div>
          <div className="bg-amber-50/70 border border-amber-100/80 rounded-lg p-2 text-center">
            <span className="block text-base font-bold text-amber-700">20+ 座</span>
            <span className="text-[10px] text-amber-600/80 font-medium">國際設計大獎</span>
          </div>
          <div className="bg-purple-50/70 border border-purple-100/80 rounded-lg p-2 text-center">
            <span className="block text-base font-bold text-purple-700">100+ 場</span>
            <span className="text-[10px] text-purple-600/80 font-medium">企業培訓與工作坊</span>
          </div>
          <div className="bg-emerald-50/70 border border-emerald-100/80 rounded-lg p-2 text-center">
            <span className="block text-base font-bold text-emerald-700">亞洲首度</span>
            <span className="text-[10px] text-emerald-600/80 font-medium">CHI & SDN 金獎</span>
          </div>
        </div>
      </div>

      {/* Highlights Sections */}
      <div className="p-6 space-y-6 flex-1">
        {/* 2026 Latest Thought */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>2026 最新前瞻演講</span>
          </div>
          <a
            href={tangProfile.latestInsights2026.slideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-3 rounded-xl bg-gradient-to-r from-indigo-50/80 to-blue-50/80 border border-indigo-100/80 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-indigo-900 group-hover:text-indigo-700">
                {tangProfile.latestInsights2026.title}
              </span>
              <Presentation className="w-4 h-4 text-indigo-500 flex-shrink-0 ml-2 mt-0.5 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-[11px] text-indigo-800/80 mt-1.5 line-clamp-2">
              {tangProfile.latestInsights2026.summary}
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-600 mt-2">
              查看線上投影片 <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </a>
        </div>

        {/* Core Domains */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-500" />
            <span>核心研究與實踐領域</span>
          </div>
          <div className="space-y-1.5">
            {tangProfile.coreDomains.slice(0, 4).map((domain, idx) => (
              <div
                key={idx}
                className="text-xs px-2.5 py-1.5 bg-slate-50 rounded-lg text-slate-700 border border-slate-100/80 flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="font-medium truncate">{domain.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Awards */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>重要指標大獎紀錄</span>
          </div>
          <div className="space-y-2">
            <div className="text-xs bg-amber-50/50 p-2 rounded-lg border border-amber-100">
              <span className="font-semibold text-slate-800 block">
                ACM CHI SDC Gold Award
              </span>
              <span className="text-[11px] text-amber-700">亞洲歷史首度獲獎紀錄</span>
            </div>
            <div className="text-xs bg-amber-50/50 p-2 rounded-lg border border-amber-100">
              <span className="font-semibold text-slate-800 block">
                SDN Service Design Award Gold
              </span>
              <span className="text-[11px] text-amber-700">亞洲歷史首度獲獎紀錄</span>
            </div>
            <div className="text-xs bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-600">
              <span>Red Dot Best of Best、iF、UXPA Gold 等 20 餘項大獎</span>
            </div>
          </div>
        </div>

        {/* Alumni Placements */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            <span>指導畢業生遍佈企業</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tangProfile.mentorshipAndAlumni.alumniCompanies.map((company, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Official Links Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70">
        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          官方連結與專欄
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href={tangProfile.officialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 py-1"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">DITL 官網</span>
          </a>
          <a
            href={tangProfile.officialLinks.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 py-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Google Scholar</span>
          </a>
          <a
            href={tangProfile.officialLinks.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 py-1"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Medium 專欄</span>
          </a>
          <a
            href={tangProfile.officialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 py-1"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">FB 粉絲專頁</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
