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
     */
    static async * streamChat(messages, hexagramData, record = {}, onChunk, tarotCard = null, futureHexData = null) {
        const backendBaseUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
        const apiUrl = `${backendBaseUrl}/chat`;

        const isTarotMode = !!tarotCard || record?.type === 'tarot' || messages.some(m =>
            m.content?.includes("塔羅") || m.content?.includes("牌陣") || m.content?.toLowerCase().includes("tarot")
        );

        if (!hexagramData && !isTarotMode) {
            yield "導師目前不知您問的是哪一卦，請先選擇卦象。";
            return;
        }

        const analysisMode = window.app?.ichingAnalysisMode || 'classic';
        
        // 1. Define Persona
        let persona = "";
        if (isTarotMode) {
            persona = "你現在是一位精通「塔羅牌」與「神祕學」的塔羅宗師。你擅長從托特或偉特牌義中，為學生解讀內在的潛意識連結與未來的啟示。";
            if (record?.spread) persona += `\n當前牌陣數據：${JSON.stringify(record.spread)}`;
        } else {
            if (analysisMode === 'liu-yao') {
                persona = "你現在是一位精通「六爻預測」與「象數術數」的易經大師。請重點結合「納甲」、「六親」、「世應關係」以及「五行生剋」進行深度數理分析。";
            } else if (analysisMode === 'plum') {
                persona = "你現在是一位精通「梅花易數」與「體用生剋」的易經大師。請重點分析「體卦」與「用卦」的五行互動、以及環境中的「外應」啟發。";
            } else {
                persona = "你現在是一位精通「周易義理」與「人文哲學」的易經導師。請重點解析卦辭、爻辭與人文哲學建議。";
            }
        }

        // 2. Build Context Info
        let contextInfo = `
當前卦象（本卦）：${hexagramData?.name}卦 (#${hexagramData?.id})
${futureHexData ? `之卦（變卦）：${futureHexData.name}卦 (#${futureHexData.id})` : ""}
`;

        if (analysisMode === 'liu-yao' && hexagramData?.najia_analysis) {
            contextInfo += `
宮位：${hexagramData.najia_analysis.palace}宮 [${hexagramData.najia_analysis.palace_wuxing}]
納甲數據：${JSON.stringify(hexagramData.najia_analysis.lines)}
`;
        }

        if (analysisMode === 'plum' && record?.plumResult) {
            contextInfo += `
梅花體用分析：${JSON.stringify(record.plumResult.analysis)}
`;
        }

        if (record.question) {
            contextInfo += `\n學生提問：${record.question}`;
        }
        if (record.changingLines && record.changingLines.length > 0) {
            contextInfo += `\n動爻發動：第 ${record.changingLines.join(', ')} 爻`;
        }

        // 3. Construct Final System Instruction
        const systemInstruction = `${persona}

[當前探討內容]
${contextInfo}

請以此身份與探討內容提供富有啟發性且專業的對話引導。請使用繁體中文。`;

        try {
            const body = {
                messages: messages.map(m => ({ role: m.role, content: m.content })),
                system_instruction: systemInstruction
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                if (onChunk) onChunk(chunk);
                yield chunk;
            }
        } catch (error) {
            console.error("AIService.streamChat failed:", error);
            yield "抱歉，分析過程中發生技術故障，請稍後再試。";
        }
    }
}
