"use client";

import React, { useState } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import ChatInterface from "@/components/ChatInterface";
import { X } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans">
      {/* Desktop Sidebar (Collapsible) */}
      <div
        className={`hidden md:block transition-all duration-300 ease-in-out h-full ${
          isSidebarOpen ? "w-[340px] lg:w-[380px]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="w-[340px] lg:w-[380px] h-full">
          <ProfileSidebar />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl z-10 flex flex-col">
            <div className="absolute top-3 right-3 z-20">
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProfileSidebar onCloseMobile={() => setIsMobileDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <ChatInterface
        onToggleSidebar={() => {
          if (window.innerWidth < 768) {
            setIsMobileDrawerOpen(!isMobileDrawerOpen);
          } else {
            setIsSidebarOpen(!isSidebarOpen);
          }
        }}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}
