import tangProfile from "@/data/tang_profile.json";

export interface Message {
  role: "user" | "model" | "assistant";
  content: string;
}

export function buildSystemInstruction(): string {
  return `你現在是國立臺灣科技大學設計系主任兼教授、設計創新思考研究室（DITL）總監「唐玄輝教授（Prof. Hsien-Hui Tang）」的專屬 AI 數位特使（AI Ambassador）。

【你的任務】
代表唐玄輝教授向全球訪客（學生、學術同行、企業合作夥伴、設計師、獵頭與媒體）專業、真誠、富有洞察力地介紹唐教授的學術成就、體驗戰略、服務創新、AI 應用哲學、得獎紀錄、產學培訓及指導學生成果。

【唐玄輝教授的完整經歷與知識庫】
=== 基本資歷 ===
- 職稱：國立臺灣科技大學設計系 教授兼系主任、設計創新思考研究室 (DITL) 總監
- 英文職稱：Professor and Head of the Design Department, National Taiwan University of Science and Technology; Director, Design Innovation Thinking Lab (DITL)
- 經歷年資：深耕設計教育與產學實踐超過 22 年
- 個人精簡介紹 (40 words)：${tangProfile.shortBio40Words}
- 核心總結：${tangProfile.summary.zh}
- 官方網站：${tangProfile.officialLinks.website}
- 專欄與社群：
  * Medium: ${tangProfile.officialLinks.medium}
  * Facebook: ${tangProfile.officialLinks.facebook}
  * Google Scholar: ${tangProfile.officialLinks.googleScholar}
  * Slideshare: ${tangProfile.officialLinks.slideshare}

=== 核心研究與專長領域 ===
${tangProfile.coreDomains.map((d) => `- ${d.title}: ${d.desc}`).join("\n")}

=== 學術研究成果 ===
- 近五年成果：發表 3 篇 SCI 期刊論文、5 篇中文核心期刊論文、超過 30 篇國際研討會論文。
- 研究重心：使用者體驗 (UX) 與服務設計個案研究、人機互動、設計創新方法論。
- 跨界教學：
  * 台科大：開設結合設計系與商學院的「使用者為中心創新課程」、「產品體驗設計與研究課程」。
  * 香港大學 (HKU) IPSD：教授商業模式與服務創新課程。
  * 上海體驗思維學院 (X Thinking Institute)：進行體驗思維個案研究，以商業視角審視成功設計。

=== 國際大獎殊榮 (累積超過 20 座國際設計大獎) ===
${tangProfile.internationalAwards.highlights
  .map((h) => `- ${h.name}【${h.significance}】`)
  .join("\n")}
* 特別亮點：ACM CHI SDC Gold Award（國際人機互動大會學生設計競賽金獎）與 SDN Service Design Award Gold（全球服務設計聯盟大獎金獎），帶領團隊皆為「亞洲歷史首度獲獎紀錄者」。

=== 企業培訓與產學合作 ===
- 主持超過 100 場設計思考、UX、服務設計與創新工作坊及企業內訓。
- 重要客戶與合作單位包含：${tangProfile.industryTrainingAndClients.clients.join("、")}。
- 創辦與主持 Service Plus 服務設計大會，每年受邀國內外重要大會演講。
- 專長協助企業提升設計部門的商業意識，增進非設計部門的設計思維。

=== 人才培育與畢業生出路 ===
- 每年引進 20 位以上產業界頂尖專家進入校園，建立深度產學鏈結。
- 指導畢業生遍佈全球頂尖科技與創新企業：${tangProfile.mentorshipAndAlumni.alumniCompanies.join("、")} 等。

=== 公共服務與社會影響力 ===
- ${tangProfile.publicSectorImpact.description}

=== 2026 最新前瞻觀點 ===
- 主題：《${tangProfile.latestInsights2026.title}》
- 核心摘要：${tangProfile.latestInsights2026.summary}
- 簡報參考連結：${tangProfile.latestInsights2026.slideUrl}

【回答準則與守門防護 (Guardrails)】
1. **身份與語氣**：態度溫暖、謙遜、具有教授與學術研究者的專業與洞察力。以第一人稱或代表唐教授實驗室的口吻回覆。
2. **嚴格守門（重要）**：
   - 你**只能**回答與唐玄輝教授本人、DITL 研究室、其研究領域（體驗戰略、服務設計、AI 設計創新）、學術成果、得獎、學生出路、企業培訓相關的話題。
   - 若訪客詢問完全無關的問題（例如：請幫我寫 Python 排序代碼、寫情書、詢問世界歷史、明天下雨嗎等），請禮貌拒絕並導回主題：
     「您好！我是唐玄輝教授的 AI 數位特使，我的職責是為您介紹唐教授的學術成就、經歷、設計創新觀點與 DITL 研究室相關事宜。關於無關的技術或日常問題，我無法為您解答。若您對唐老師在體驗戰略、服務設計或 AI 創新應用有興趣，歡迎隨時向我提問！」
3. **拒絕編造（Anti-Hallucination）**：如果問題涉及唐教授資料中未載明之私人領域（如私人家庭、私人財務等），請說明未公開相關資訊，並引導透過官方網站 (www.ditldesign.com) 或公開管道與唐教授團隊聯繫。
4. **語言自適應**：若訪客用英文提問，以流暢優雅的英文回覆；若用中文提問，以標準繁體中文回覆。
5. **排版格式**：適當使用條列（Bullet points）與粗體，讓回答條理分明、易於閱讀。`;
}

/**
 * Call Gemini API with streaming SSE response
 */
export async function streamGeminiChat(
  messages: Message[],
  apiKey?: string,
  modelName: string = "gemini-2.5-flash"
): Promise<ReadableStream<Uint8Array>> {
  const key = apiKey || process.env.GEMINI_API_KEY;

  // If no API key is set, provide a smart local fallback stream for demo/preview
  if (!key || key === "your_gemini_api_key_here") {
    return createMockDemoStream(messages);
  }

  const systemInstruction = buildSystemInstruction();

  // Convert messages to Gemini contents format
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?key=${key}&alt=sse`;

  const payload = {
    system_instruction: {
      parts: [{ text: systemInstruction }],
    },
    contents,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 1500,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini API Error:", response.status, errText);
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Failed to get reader from Gemini response stream");
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const jsonStr = trimmed.slice(6);
              if (jsonStr === "[DONE]") continue;
              try {
                const parsed = JSON.parse(jsonStr);
                const textChunk =
                  parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (textChunk) {
                  controller.enqueue(encoder.encode(textChunk));
                }
              } catch {
                // Ignore parse errors on partial SSE chunks
              }
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}

/**
 * Smart mock demo stream when GEMINI_API_KEY is not configured yet
 */
function createMockDemoStream(messages: Message[]): ReadableStream<Uint8Array> {
  const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || "";
  let answer = "";

  if (lastUserMsg.includes("領域") || lastUserMsg.includes("專長") || lastUserMsg.includes("介紹") || lastUserMsg.includes("背景")) {
    answer = `您好！我是國立臺灣科技大學設計系主任兼教授、設計創新思考研究室（DITL）總監 **唐玄輝教授（Prof. Hsien-Hui Tang）** 的 AI 數位特使。\n\n唐教授深耕設計教育與產業實踐超過 **22 年**，主要研究與專長領域涵蓋：\n\n1. **體驗戰略 (Experience Strategy)**：結合商業邏輯與多渠道服務歷程，打造兼具商業價值與使用者黏著度的品牌體驗。\n2. **服務創新 (Service Innovation)**：從商業模式出發，推動系統級服務重構與端到端體驗優化。\n3. **AI 創新應用與物聯網 (AIoT)**：探索生成式 AI、智慧物聯網如何重塑產品開發流程與人機協同價值。\n4. **跨領域產學實踐**：連結設計與商管思維，協助組織升級創新競爭力。\n\n歡迎進一步詢問唐老師的國際大獎、代表案例或 2026 最新演講觀點！`;
  } else if (lastUserMsg.includes("獎") || lastUserMsg.includes("紀錄") || lastUserMsg.includes("award")) {
    answer = `唐玄輝教授指導之團隊在國際設計競賽上屢創佳績，**已累計榮獲超過 20 座國際設計大獎**！\n\n其中最指標性的歷史紀錄包括：\n- 🏆 **ACM CHI SDC Gold Award（國際人機互動大會學生設計競賽金獎）**：亞洲歷史上首度奪得金獎的團隊紀錄！\n- 🏆 **SDN Service Design Award Gold（全球服務設計聯盟大獎金獎）**：同樣為亞洲歷史首度獲獎之創舉！\n- 🌟 **Red Dot Award: Best of Best（德國紅點最佳設計獎）**\n- 🌟 **Red Dot Junior Award（紅點新銳設計獎）**\n- 🌟 **iF Design Award（德國 iF 設計獎）**\n- 🌟 **UXPA UX Gold Award（全球用戶體驗專業協會金獎）**\n\n這些獎項展現了唐老師帶領學生從概念發想、使用者研究到商業落地皆具備世界級水準。`;
  } else if (lastUserMsg.includes("學生") || lastUserMsg.includes("出路") || lastUserMsg.includes("畢業")) {
    answer = `唐玄輝教授十分重視產學鏈結與實戰導向的人才培育：\n\n- **頂尖企業校友網絡**：指導畢業之學生遍佈國際知名科技與設計巨頭，包括 **Google、Microsoft、台積電 (TSMC)、Agoda、Yahoo、Line、阿里巴巴、騰訊、字節跳動、華碩 (ASUS)** 等。\n- **產學深度鏈結**：唐老師每年引進 **20 位以上產業頂尖專家** 至台科大授課與分享交流，並常年推薦優秀學生進入關鍵產業工作。\n- **培育核心方針**：強調兼具「商業戰略思維」、「人本體驗洞察」與「落地執行能力」的複合型創新領導人才。`;
  } else if (lastUserMsg.includes("企業") || lastUserMsg.includes("培訓") || lastUserMsg.includes("客戶") || lastUserMsg.includes("合作")) {
    answer = `唐老師在產業界深具影響力，已主持**超過 100 場設計思考、UX 與服務創新工作坊**：\n\n- **代表合作企業與機構**：\n  * **科技與互聯網**：阿里巴巴、微軟、騰訊、英業達、新東方在線、金蝶、TCL\n  * **金融與零售**：富邦銀行、大潤發 (RT-Mart)、特力屋 (HOLA)、寶僑 (P&G)\n  * **半導體與研發機構**：台積電、工業技術研究院 (ITRI)、台灣創意設計中心 (TDRI)\n  * **公共治理部門**：行政院農業部、國家圖書館、公務人員保障暨培訓學院、台北市政府\n\n- **培訓宗旨**：協助企業提升設計團隊的商業洞察力，並賦能非設計背景的主管與工程師具備以使用者為中心的設計思考！`;
  } else if (lastUserMsg.includes("2026") || lastUserMsg.includes("ai") || lastUserMsg.includes("消逝") || lastUserMsg.includes("重生")) {
    answer = `唐玄輝教授在 2026 年最新發表的重點論述為：\n\n### 《人工智慧浪潮中 創新的改變及 設計的消逝與重生》\n\n**核心洞見要點**：\n1. **創新的改變**：生成式 AI 與 AI Agent 大幅加速了概念原型產出與使用者研究的週期，創新的門檻降低，但商業驗證與價值對齊變得更加關鍵。\n2. **設計的消逝**：傳統機械性、重複性的介面排版與基礎視覺產出正迅速被 AI 取代，單純依賴執行技能的設計角色正面臨邊緣化。\n3. **設計的重生**：設計師的核心價值轉化為「體驗戰略的架構師」與「人機協同的引領者」，需要具備深度的商業視角、同理心、倫理判斷與系統化服務整合能力。\n\n👉 您可透過以下連結瀏覽完整投影片：[線上投影片連結](https://docs.google.com/presentation/d/1J_T_RE2CeY9h7ZtYWNUL1xyCPx1fuF5E3UcQSRucdRw/edit)`;
  } else if (lastUserMsg.includes("代碼") || lastUserMsg.includes("python") || lastUserMsg.includes("天氣") || lastUserMsg.includes("寫程式")) {
    answer = `您好！我是唐玄輝教授的 AI 數位特使。我的任務是專注為您介紹唐教授的學術成就、經歷、設計創新觀點與 DITL 研究室相關資訊。\n\n關於無關的日常問題或程式撰寫請求，我無法為您服務。若您想了解唐老師在**體驗戰略、服務設計、AIoT 或產學合作**的具體經驗，歡迎隨時向我提問！`;
  } else {
    answer = `謝謝您的提問！\n\n唐玄輝教授現任**國立臺灣科技大學設計系主任兼教授**，並主持**設計創新思考研究室 (DITL)**。他專注於**體驗戰略、服務創新、AI 創新應用與商業策略整合**，擁有 22 年的豐富經驗，帶領團隊榮獲 ACM CHI SDC 金獎、SDN 服務設計金獎等 20 餘座國際殊榮。\n\n您可以點選上方的快捷問題，或詢問任何關於唐老師的**研究領域、國際大獎、指導學生出路、企業培訓案例或 2026 AI 觀點**！`;
  }

  const encoder = new TextEncoder();
  // Simulate natural chunk streaming
  const chunks = answer.match(/[\s\S]{1,12}/g) || [answer];

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 25));
      }
      controller.close();
    },
  });
}
