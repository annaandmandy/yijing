export class AIService {
    /**
     * Non-streaming version of chat for quick insights.
     */
    static async ask(prompt) {
        const backendBaseUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
        const apiUrl = `${backendBaseUrl}/chat`;

        const isTarotMode = prompt.includes("塔羅") || prompt.includes("牌陣");
        let persona = isTarotMode
            ? "你現在是一位精通「塔羅牌」與「神祕學」的塔羅宗師。"
            : "你現在是一位精通「六爻」與「術數」的易經導師。";

        const systemInstruction = `${persona} 請以此身份提供精簡、專業且富有啟發性的解析（約 100 字）。請使用繁體中文。`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: prompt }],
                    system_instruction: systemInstruction
                })
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let result = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += decoder.decode(value);
            }
            return result;
        } catch (error) {
            console.error("AIService.ask failed:", error);
            throw error;
        }
    }

    /**
     * Handles multi-turn streaming chat with the AI Mentor via Python Backend.
     * @param {Array} messages - Array of {role: 'user'|'assistant', content: string}
     * @param {Object} hexagramData - Static JSON data of the hexagram.
     * @param {Object} record - The specific divination record { question, date, changingLines, futureHexName, ... }
     * @param {Function} onChunk - Callback for streaming chunks.
     * @param {Object} tarotCard - Optional single tarot card data for library study.
     * @yields {string} - Chunks of the AI generated response.
     */
    static async * streamChat(messages, hexagramData, record = {}, onChunk, tarotCard = null) {
        // Automatically switch between local and production backend
        const backendBaseUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
        const apiUrl = `${backendBaseUrl}/chat`;

        const isTarotMode = !!tarotCard || record?.type === 'tarot' || messages.some(m =>
            m.content?.includes("塔羅") ||
            m.content?.includes("牌陣") ||
            m.content?.includes("西洋神祕學") ||
            m.content?.toLowerCase().includes("tarot")
        );

        if (!hexagramData && !isTarotMode) {
            yield "導師目前不知您問的是哪一卦，請先選擇卦象。";
            return;
        }
        const isDivinationMode = !!record.question;

        // Dynamic System Instruction based on context
        let persona = `你現在是一位精通「六爻」與「術數」的易經導師。
當前卦象：${hexagramData?.name}卦 (#${hexagramData?.id})
宮位：${hexagramData?.najia_analysis?.palace}宮 [${hexagramData?.najia_analysis?.palace_wuxing}]
納甲數據：${JSON.stringify(hexagramData?.najia_analysis?.lines)}`;

        if (isTarotMode) {
            const spreadStrs = [];
            if (record && record.spread) {
                const spreadCards = Array.isArray(record.spread) ? record.spread : record.spread.split(',');
                spreadCards.forEach(c => {
                    if (typeof c === 'string') spreadStrs.push(c);
                    else spreadStrs.push(`${c.id} (${c.isReversed ? '逆位' : '正位'})`);
                });
            } else if (tarotCard) {
                spreadStrs.push(`${tarotCard.name_zh} (${tarotCard.name_en})`);
            }
            persona = `你現在是一位精通「塔羅牌」與「神祕學」的塔羅宗師。
你擅長從托特或偉特牌義中，為學生解讀內在的潛意識連結與未來的啟示，並深入剖析牌陣的轉折。
${spreadStrs.length > 0 ? `\n當前探討的牌為：${spreadStrs.join(', ')}。請隨時銘記這些內容來回答學生的問題。` : ''}`;
        }

        const adv = record.advancedTheory || {};
        const relations = adv.relations ? `
- 互卦 (Nuclear)：${adv.relations.nuclear}卦
- 綜卦 (Inverted)：${adv.relations.inverted}卦
- 錯卦 (Opposite)：${adv.relations.opposite}卦` : "待分析";

        const beasts = adv.beasts ? `由初爻至上爻分別為：${adv.beasts.join('、')}` : "待分析";
        const strength = adv.chronoEnergy ? `日辰：${adv.chronoEnergy.ganzhi}，當前五行旺衰：${JSON.stringify(adv.chronoEnergy.strength)}` : "待分析";

        const systemInstruction = `${persona}

${!isTarotMode ? `[進階分析數據 (Advanced Insights)]
1. 卦象關係：${relations}
2. 六神配置：${beasts}
3. 時空能量：${strength}` : ""}

[教學方針]
1. 將學生視為「初學者」，語氣要平易近人、循循善誘。
2. 避免過於晦澀的專業術語，若必須使用，請附帶簡單的白話解釋。
3. 語氣保持導師的威嚴與慈愛感。
4. ${isTarotMode ? '著重於「正位」與「逆位」的身心靈啟示，風格要帶一點神祕學色彩。' : '結合五行生剋與納甲理論進行語義演繹。'}

${isDivinationMode ? `
[占卜占斷模式]
學生提問：${record.question}
占卜時間：${record.date} ${isTarotMode ? "" : "(真太陽時)"}
${isTarotMode ? `
請以「塔羅宗師」的身份，針對學生的具體問題進行深度剖析。${record.spread ? '特別是當學生「隨喜占卜」時，請主動解釋這些牌卡對當前局勢的啟示。' : ''}` : `動爻狀態：${record.changingLines && record.changingLines.length > 0 ? `第 ${record.changingLines.join(', ')} 爻發動` : "靜卦無動爻"}
之卦（變卦）：${record.futureHexName ? record.futureHexName + "卦" : "無變卦"}

請以「占卜大師」的身份，結合「進階分析數據」中提到的「綜卦/錯卦」演變、當前「五行旺衰」以及「六神」的含義，針對具體問題進行深度剖析。`}
`
                : `
[學術研究模式]
當前處於純${isTarotMode ? '牌面' : '卦象'}研究模式，無具體占卜問題。

請以「${isTarotMode ? '塔羅研究者' : '儒家學者'}」與「${isTarotMode ? '象徵學大師' : '術數教授'}」的身份，深入淺出地為初學者解說此${isTarotMode ? '塔羅牌' : '卦'}的${isTarotMode ? '象徵符號、神話原型' : '哲學意涵、卦序邏輯'}以及基礎術語，啟發智慧。`}

請注意：
1. ${isTarotMode ? '專注於塔羅牌義與神祕學。' : '結合日辰與卦中五行的生剋進行專業但易懂的演繹。'}
2. 請務必使用「繁體中文」來回覆。
3. 回覆必須精簡，總字數請嚴格限制在 800 字以內，直取核心。`;

        console.log(`AIService: Calling backend at ${apiUrl}...`);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages,
                    system_instruction: systemInstruction
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                yield `導師連線中斷 (Backend Error ${response.status}: ${errorData.error || 'Unknown Error'})`;
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                yield chunk;
            }
        } catch (error) {
            console.error("AIService Backend Error:", error);
            yield `無法連接到 AI 導師伺服器。如果是本地運行，請確保 'python3 server.py' 已啟動。 (${error.message})`;
        }
    }
}
