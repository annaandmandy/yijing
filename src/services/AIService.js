/**
 * AIService.js
 * Handles AI-based interpretation of hexagrams.
 */

export class AIService {
    /**
     * Handles multi-turn chat with the AI Mentor.
     * @param {Array} messages - Array of {role: 'user'|'assistant', content: string}
     * @param {Object} hexagramData - The JSON data of the hexagram.
     * @returns {Promise<string>} - The AI generated response.
     */
    static async chat(messages, hexagramData) {
        const currentDate = new Date().toLocaleString('zh-TW', { timeZone: 'America/New_York' });
        const systemPrompt = `你現在是一位精通「六爻」與「術數」的導師。
        當前卦象：${hexagramData.name} (${hexagramData.najia_analysis?.palace}宮 [${hexagramData.najia_analysis?.palace_wuxing}])
        納甲數據：${JSON.stringify(hexagramData.najia_analysis?.lines)}
        今日日期：${currentDate} (波士頓真太陽時校準)。
        
        請根據導師身分，結合上述專業數據與用戶進行深度對話。
        當前對話歷史如下：`;

        console.log("AI Chatting with context:", systemPrompt);
        
        // In a real implementation, we would send the full message array to Gemini.
        // For simulation, we'll respond based on the last user message.
        const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || "";

        return new Promise((resolve) => {
            setTimeout(() => {
                if (messages.length === 1) {
                    // Initial interpretation (first turn)
                    resolve(`【導師感應】
目前得到「${hexagramData.name}」卦。從六爻來看，第 ${hexagramData.najia_analysis?.lines[0].line_number} 爻的 ${hexagramData.najia_analysis?.lines[0].relative} 動向值得關注。
針對您問的「${lastUserMsg}」，我建議您從「${hexagramData.llm_analysis.general.substring(0, 20)}」的角度切入思考。
您還有什麼想深入了解的嗎？`);
                } else {
                    // Follow-up responses
                    resolve(`針對您剛才提到的「${lastUserMsg.substring(0, 15)}...」，
在術數中這對應到「${hexagramData.najia_analysis?.palace_wuxing}」氣的流轉。
從專業角度看，這意味著「${hexagramData.summary.substring(0, 30)}」。
您是否感覺到這股能量的影響？`);
                }
            }, 1500);
        });
    }
}
