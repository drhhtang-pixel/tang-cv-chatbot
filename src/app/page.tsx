"use client";

import React, { useState } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import ChatInterface from "@/components/ChatInterface";
import { X } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fafaf9] font-sans">
      {/* Desktop Sidebar (Collapsible) */}
      <div
        className={`hidden md:block transition-all duration-300 ease-in-out h-full ${
          isSidebarOpen ? "w-[360px] lg:w-[400px]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="w-[360px] lg:w-[400px] h-full">
          <ProfileSidebar />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl z-10 flex flex-col">
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
              >
                <X className="w-4 h-4" />
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
