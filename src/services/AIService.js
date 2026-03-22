export class AIService {
    /**
     * Handles multi-turn streaming chat with the AI Mentor.
     * @param {Array} messages - Array of {role: 'user'|'assistant', content: string}
     * @param {Object} hexagramData - Static JSON data of the hexagram.
     * @param {Object} record - The specific divination record { question, date, changingLines, futureHexName, ... }
     * @yields {string} - Chunks of the AI generated response.
     */
    static async *streamChat(messages, hexagramData, record = {}) {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        if (!apiKey) {
            yield "抱歉，導師連線失敗。請確認 .env 檔案包含 VITE_GOOGLE_API_KEY。";
            return;
        }

        if (!hexagramData) {
            yield "導師目前不知您問的是哪一卦，請先選擇卦象。";
            return;
        }

        const history = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));
        const lastUserContent = messages[messages.length - 1].content;

        const isDivinationMode = !!record.question;

        // Dynamic System Instruction based on context
        const systemInstruction = `你現在是一位精通「六爻」與「術數」的易經導師。
        當前卦象：${hexagramData.name}卦 (#${hexagramData.id})
        宮位：${hexagramData.najia_analysis?.palace}宮 [${hexagramData.najia_analysis?.palace_wuxing}]
        納甲數據：${JSON.stringify(hexagramData.najia_analysis?.lines)}
        
        ${isDivinationMode ? `
        [占卜占斷模式]
        學生提問：${record.question}
        占卜時間：${record.date} (真太陽時)
        動爻狀態：${record.changingLines && record.changingLines.length > 0 ? `第 ${record.changingLines.join(', ')} 爻發動` : "靜卦無動爻"}
        之卦（變卦）：${record.futureHexName ? record.futureHexName + "卦" : "無變卦"}
        
        請以「占卜大師」的身份，針對具體問題、動爻演變與日辰生剋進行剖析，給予學生明確的趨吉避凶建議。`
                : `
        [學術研究模式]
        當前處於純卦象研究模式，無具體占卜問題。
        
        請以「儒家學者」與「術數教授」的身份，深入淺出地解說此卦的哲學意涵、卦序邏輯以及納甲基礎知識，啟發學生的智慧。`}
        
        請注意：
        1. 保持導師的威嚴與慈愛感。
        2. 結合日辰與卦中五行的生剋進行專業演繹。
        3. 請務必使用「普通話」來解籤，確保學生能聽懂微言大義。
        4. 回覆必須精簡，總字數請嚴格限制在 500 字以內，直取核心。`;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

        console.log("AIService: Attempting streamChat with model gemini-2.5-flash...");
        // Log partially masked API key for debugging without exposure
        console.log(`AIService: API key starting with: ${apiKey.substring(0, 5)}...`);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: 'user', parts: [{ text: systemInstruction }] },
                        { role: 'model', parts: [{ text: "學生受教。我已準備好用平實的白話文，結合當下卦象與日辰氣機為您解惑。請說出您的疑問。" }] },
                        ...history,
                        { role: 'user', parts: [{ text: lastUserContent }] }
                    ]
                })
            });

            if (!response.ok) {
                yield `導師感應中斷 (API Error ${response.status})`;
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            console.log("AIService: Fetch successful, starting reader...");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue;

                    const jsonString = trimmedLine.substring(6);
                    try {
                        const json = JSON.parse(jsonString);
                        const chunk = json.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (chunk) yield chunk;
                    } catch (e) {
                        console.error("AIService: JSON Parse Error:", e, "on string:", jsonString);
                    }
                }
            }
        } catch (error) {
            console.error("AIService: Stream Error:", error);
            yield `導師目前無法感應（網路連線異常：${error.message}）。`;
        }
    }
}
