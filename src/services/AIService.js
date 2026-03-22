export class AIService {
    /**
     * Handles multi-turn streaming chat with the AI Mentor via Python Backend.
     * @param {Array} messages - Array of {role: 'user'|'assistant', content: string}
     * @param {Object} hexagramData - Static JSON data of the hexagram.
     * @param {Object} record - The specific divination record { question, date, changingLines, futureHexName, ... }
     * @yields {string} - Chunks of the AI generated response.
     */
    static async *streamChat(messages, hexagramData, record = {}) {
        // Automatically switch between local and production backend
        const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
        const apiUrl = `${backendBaseUrl}/chat`;

        if (!hexagramData) {
            yield "導師目前不知您問的是哪一卦，請先選擇卦象。";
            return;
        }

        const isDivinationMode = !!record.question;

        // Dynamic System Instruction based on context
        const adv = record.advancedTheory || {};
        const relations = adv.relations ? `
- 互卦 (Nuclear)：${adv.relations.nuclear}卦
- 綜卦 (Inverted)：${adv.relations.inverted}卦
- 錯卦 (Opposite)：${adv.relations.opposite}卦` : "待分析";

        const beasts = adv.beasts ? `由初爻至上爻分別為：${adv.beasts.join('、')}` : "待分析";
        const strength = adv.chronoEnergy ? `日辰：${adv.chronoEnergy.ganzhi}，當前五行旺衰：${JSON.stringify(adv.chronoEnergy.strength)}` : "待分析";

        const systemInstruction = `你現在是一位精通「六爻」與「術數」的易經導師。
當前卦象：${hexagramData.name}卦 (#${hexagramData.id})
宮位：${hexagramData.najia_analysis?.palace}宮 [${hexagramData.najia_analysis?.palace_wuxing}]
納甲數據：${JSON.stringify(hexagramData.najia_analysis?.lines)}

[進階分析數據 (Advanced Insights)]
1. 卦象關係：${relations}
2. 六神配置：${beasts}
3. 時空能量：${strength}

[教學方針]
1. 將學生視為「易學初學者」，語氣要平易近人、循循善誘。
2. 避免過於晦澀的專業術語，若必須使用（如「勾陳」、「螣蛇」），請附帶簡單的白話解釋。
3. 語氣保持導師的威嚴與慈愛感。

${isDivinationMode ? `
[占卜占斷模式]
學生提問：${record.question}
占卜時間：${record.date} (真太陽時)
動爻狀態：${record.changingLines && record.changingLines.length > 0 ? `第 ${record.changingLines.join(', ')} 爻發動` : "靜卦無動爻"}
之卦（變卦）：${record.futureHexName ? record.futureHexName + "卦" : "無變卦"}

請以「占卜大師」的身份，結合「進階分析數據」中提到的「綜卦/錯卦」演變、當前「五行旺衰」以及「六神」的含義，針對具體問題進行深度剖析。特別是當學生「隨喜求卦」時，請主動解釋這些進階數據對當前局勢的啟示。`
                : `
[學術研究模式]
當前處於純卦象研究模式，無具體占卜問題。

請以「儒家學者」與「術數教授」的身份，結合卦象關係（互綜錯），深入淺出地為初學者解說此卦的哲學意涵、卦序邏輯以及基礎術語，啟發智慧。`}

請注意：
1. 結合日辰與卦中五行的生剋進行專業但易懂的演繹。
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
