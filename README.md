# 唐玄輝教授個人 CV 專屬 AI 互動問答 Chatbot (Prof. Hsien-Hui Tang AI Ambassador)

> 國立臺灣科技大學設計系主任兼教授、設計創新思考研究室 (DITL) 總監 **唐玄輝教授（Prof. Hsien-Hui Tang）** 的個人數位特使問答系統。

本專案使用 **Next.js 15 (App Router)**、**Tailwind CSS** 與 **Google Gemini API** 打造，專為公開部署於網路設計，具備**自然語言串流打字機體驗**、**知識庫邊界守門防護**、**防止濫用之頻率限制 (Rate Limiting)** 與 **現代化設計學院美學介面**。

---

## ✨ 核心特色

1. **精準知識庫注入（100% 掌握經歷與成就）**
   - 涵蓋唐教授 22 年產學資歷、體驗戰略、服務創新、AI 創新應用。
   - 完整收錄 ACM CHI SDC 金獎、SDN 服務設計金獎等 20 餘座國際大獎。
   - 記錄百場企業內訓名單（阿里巴巴、騰訊、台積電、微軟、P&G 等）與頂尖企業校友網絡。
   - 深度結合 2026 最新前瞻演講：《人工智慧浪潮中 創新的改變及 設計的消逝與重生》。

2. **流暢的對話體驗**
   - 實時 Server-Sent Events (SSE) 串流打字機效果。
   - 繁體中文與英文自適應。
   - 內建 6 組精選快捷提問（Prompt Chips），引導訪客快速探索亮點。

3. **公開部署防護機制 (Production Guardrails)**
   - **Rate Limiting**：以 IP 為單位的記憶體頻率限制，防止單一使用者惡意刷爆 API 額度。
   - **長度限制與輸入過濾**：前後端強制截斷過長輸入，防範 Prompt Injection。
   - **守門員人設 (Boundary Guardrail)**：嚴格限定只能回答與唐教授相關之專業議題，遇到寫代碼、與主題無關的日常閒聊會禮貌婉拒。

4. **自帶 Mock 預覽模式**
   - 即使尚未設定 `GEMINI_API_KEY`，本系統亦內建智慧 Fallback 模式，依然可正常展示與流暢體驗。

---

## 🚀 本地開發與執行

### 1. 安裝相依套件
```bash
npm install
```

### 2. 設定環境變數
複製 `.env.example` 為 `.env.local`：
```bash
cp .env.example .env.local
```
編輯 `.env.local` 並填入您的 Google Gemini API Key：
```env
GEMINI_API_KEY=你的_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash
```
> 💡 若尚未有 API Key，可至 [Google AI Studio](https://aistudio.google.com/) 免費申請。若未填寫，系統會以內建知識庫以 Mock 模式運作。

### 3. 啟動本機開發伺服器
```bash
npm run dev
```
開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000) 即可開始互動。

---

## 🌐 如何公開部署到網路上（推薦 Vercel）

### 方式一：透過 Vercel 網頁一鍵部署（最推薦、最簡單）
1. 將此專案上傳至您的 GitHub 倉庫（例如 `tang-cv-chatbot`）。
2. 前往 [Vercel](https://vercel.com/)，點擊 **Add New Project** 並選擇您的 GitHub 倉庫。
3. 在 **Environment Variables** 區塊新增環境變數：
   - `GEMINI_API_KEY`：填入您的 Gemini API Key
   - `GEMINI_MODEL`：`gemini-2.5-flash`
4. 點擊 **Deploy**，約 1 分鐘後即可取得公開網址（例如 `https://tang-cv-chatbot.vercel.app`），任何人皆可透過網路訪問！

### 方式二：使用 Vercel CLI 部署
```bash
npx vercel
```
照著終端機提示登入與確認專案設定即可完成發佈。

---

## 📁 專案檔案結構

```
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts      # 後端對話 API (含 IP Rate Limit 與串流)
│   │   ├── globals.css            # 全域樣式與字型設定
│   │   ├── layout.tsx             # 網站 Metadata 與 SEO 設定
│   │   └── page.tsx               # 首頁排版 (RWD 側欄與聊天介面)
│   ├── components/
│   │   ├── ChatInterface.tsx      # 核心聊天室元件
│   │   ├── ChatMessage.tsx        # 訊息氣泡與 Markdown 渲染
│   │   ├── ProfileSidebar.tsx     # 唐老師經歷、大獎與社群側欄卡片
│   │   └── SuggestedPrompts.tsx   # 快速推薦提問按鈕群
│   ├── data/
│   │   └── tang_profile.json      # 唐玄輝教授結構化知識庫 (可隨時更新)
│   └── lib/
│       ├── gemini.ts              # Gemini API 呼叫與 System Prompt 守門防護
│       └── rate-limiter.ts        # IP 頻率限制防護器
├── .env.example
├── package.json
└── README.md
```

---

## 📝 未來如何更新 CV 資料？
只要修改 `src/data/tang_profile.json` 中的欄位（例如新增獲獎、更新最新演講或著作），系統提示詞與前台資訊皆會自動同步更新！
