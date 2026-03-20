/**
 * AIService.js
 * Handles AI-based interpretation of hexagrams.
 */

export class AIService {
    /**
     * Get an interpretation for a specific hexagram and user question.
     * @param {string} question - User's question.
     * @param {Object} hexagramData - The JSON data of the hexagram.
     * @returns {Promise<string>} - The AI generated text.
     */
    static async interpret(question, hexagramData) {
        const currentDate = new Date().toLocaleString('zh-TW', { timeZone: 'America/New_York' });
        const systemPrompt = `你現在是一位精通「六爻」與「術數」的導師。
        請根據用戶所問的『${question}』，並優先參考以下【納甲數據】進行推演。
        如果你能判定當日日辰（今天日期：${currentDate}），請結合日辰對爻位五行的生剋進行專業分析。
        結合『llm_analysis』與『najia_analysis』給出數據與理論並重的回覆。`;

        const context = `
            卦名：${hexagramData.name}
            宮位：${hexagramData.najia_analysis?.palace}宮 [${hexagramData.najia_analysis?.palace_wuxing}]
            六爻納甲：${JSON.stringify(hexagramData.najia_analysis?.lines)}
            現代解析：${hexagramData.llm_analysis.general}
        `;

        console.log("AI Interpreting with professional Liu Yao prompt:", systemPrompt);
        
        // Simulated professional response
        return new Promise((resolve) => {
            setTimeout(() => {
                const lines = hexagramData.najia_analysis?.lines || [];
                const careerLine = lines.find(l => l.relative === "官鬼");
                const wealthLine = lines.find(l => l.relative === "妻財");
                
                resolve(`【六爻導師專業推演】
針對您所問的「${question}」，今日得「${hexagramData.name}」卦。

【術數數據分析】
- 宮位基準：${hexagramData.najia_analysis?.palace}宮（五行：${hexagramData.najia_analysis?.palace_wuxing}）。
- 關鍵爻位：${careerLine ? `官鬼爻位於第 ${careerLine.line_number} 爻（${careerLine.dizhi}${careerLine.wuxing}），代表目前壓力與責任並存。` : ''}
${wealthLine ? `- 財運展望：妻財爻位於第 ${wealthLine.line_number} 爻（${wealthLine.dizhi}${wealthLine.wuxing}），目前氣機尚可。` : ''}

【時空校準】
今日日期為 ${currentDate.split(' ')[0]}，請注意日辰對${hexagramData.najia_analysis?.palace_wuxing}氣的引動。

【建議心法】
${hexagramData.llm_analysis.career}
結合卦辭，目前建議穩重求進，不可急躁。`);
            }, 2000);
        });
    }
}
