export class AIService {
    /**
     * Handles multi-turn streaming chat with the AI Mentor.
     * @param {Array} messages - Array of {role: 'user'|'assistant', content: string}
     * @param {Object} hexagramData - The JSON data of the hexagram.
     * @yields {string} - Chunks of the AI generated response.
     */
    static async *streamChat(messages, hexagramData) {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        if (!apiKey) {
            yield "抱歉，導師連線失敗。請確認 .env 檔案包含 VITE_GOOGLE_API_KEY。";
            return;
        }

        const currentDate = new Date().toLocaleString('zh-TW', { timeZone: 'America/New_York' });

        const history = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));
        const lastUserContent = messages[messages.length - 1].content;

        const systemInstruction = `你現在是一位精通「六爻」與「術數」的易經導師。
        當前卦象：${hexagramData.name}卦 (#${hexagramData.id})
        宮位：${hexagramData.najia_analysis?.palace}宮 [${hexagramData.najia_analysis?.palace_wuxing}]
        納甲數據：${JSON.stringify(hexagramData.najia_analysis?.lines)}
        今日日期：${currentDate} (波士頓真太陽時校準)。
        
        請根據導師身分與上述數據進行深度術數對話。
        請注意：
        1. 保持導師的威嚴與慈悲感。
        2. 結合日辰與卦中五行的生剋進行專業演繹。
        3. 請務必使用「白話文」來解籤，確保學生能聽懂微言大義。
        4. 回覆要簡潔且具備啟發性。`;

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
