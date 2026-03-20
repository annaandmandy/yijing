import { EnvService } from './EnvService.js';

export class AIService {
    /**
     * Handles multi-turn chat with the AI Mentor using Gemini 1.5 Flash.
     * @param {Array} messages - Array of {role: 'user'|'assistant', content: string}
     * @param {Object} hexagramData - The JSON data of the hexagram.
     * @returns {Promise<string>} - The AI generated response.
     */
    static async chat(messages, hexagramData) {
        const apiKey = await EnvService.get('GOOGLE_API_KEY');
        if (!apiKey) {
            console.error("Missing Gemini API Key in .env");
            return "抱歉，導師連線失敗。請確認根目錄下的 .env 檔案包含 GOOGLE_API_KEY。";
        }

        const currentDate = new Date().toLocaleString('zh-TW', { timeZone: 'America/New_York' });

        // Map messages to Gemini API format
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
        3. 回覆要簡潔且具備啟發性。`;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        try {
            console.log("Fetching Gemini API...");
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: 'user', parts: [{ text: systemInstruction }] },
                        { role: 'model', parts: [{ text: "學生受教。我已準備好結合當下卦象與日辰氣機進行推演。請說出您的疑惑。" }] },
                        ...history,
                        { role: 'user', parts: [{ text: lastUserContent }] }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Gemini API Error Response:", errorData);
                return `導師感應中斷 (API Error ${response.status}): ${errorData.error?.message || '未知錯誤'}`;
            }

            const data = await response.json();
            if (data.candidates && data.candidates.length > 0) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.error("No candidates in response:", data);
                return "導師暫無所應（未返回解析內容），請換個方式請教。";
            }
        } catch (error) {
            console.error("Network Error during Gemini fetch:", error);
            return `導師目前無法感應（網路連線異常：${error.message}），請檢查連線或 API Key。`;
        }
    }
}
