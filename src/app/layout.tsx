import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "唐玄輝教授 AI 數位特使 | Prof. Hsien-Hui Tang CV Chatbot",
  description: "國立臺灣科技大學設計系主任兼教授、設計創新思考研究室 (DITL) 總監 唐玄輝教授專屬互動問答 Chatbot。探索體驗戰略、服務創新、AI 應用與學術成就。",
  keywords: ["唐玄輝", "Hsien-Hui Tang", "台科大設計系", "DITL", "體驗戰略", "服務設計", "AI 創新", "設計思考", "CHI SDC", "SDN"],
  authors: [{ name: "Prof. Hsien-Hui Tang", url: "http://www.ditldesign.com" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className="h-full">
      <body className="h-full antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
