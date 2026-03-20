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
        const systemPrompt = `你是易經導師，請結合資料庫中的『古文原文』與『現代解析』，針對用戶問的『${question}』給予一段白話心法。`;
        const context = `
            卦名：${hexagramData.name}
            卦辭：${hexagramData.original_classic.hexagram_text}
            現代解析：${hexagramData.llm_analysis.general}
        `;

        console.log("AI Interpreting with prompt:", systemPrompt);
        
        // In a real scenario, this would call a backend or an edge function.
        // For this demo/tool, we'll simulate a thoughtful response.
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`【導師開示】
針對您所問的「${question}」，今日得到「${hexagramData.name}」卦。
卦辭云：『${hexagramData.original_classic.hexagram_text}』。
這意味著目前的狀況正處於一個${hexagramData.summary.substring(0, 50)}的階段。
建議您：${hexagramData.llm_analysis.career.substring(0, 100)}。
心法：順應時勢，剛健中正。`);
            }, 1500);
        });
    }
}
