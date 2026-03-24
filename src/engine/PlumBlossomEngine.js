/**
 * PlumBlossomEngine.js
 * Logic for Plum Blossom Divination (梅花易數).
 * Handles number-to-trigram conversion, Body/Guest analysis, and Five Elements interaction.
 */

export class PlumBlossomEngine {
    static TRIGRAMS = [
        { id: 1, name: "乾", nature: "天", wuxing: "金" },
        { id: 2, name: "兌", nature: "澤", wuxing: "金" },
        { id: 3, name: "離", nature: "火", wuxing: "火" },
        { id: 4, name: "震", nature: "雷", wuxing: "木" },
        { id: 5, name: "巽", nature: "風", wuxing: "木" },
        { id: 6, name: "坎", nature: "水", wuxing: "水" },
        { id: 7, name: "艮", nature: "山", wuxing: "土" },
        { id: 8, name: "坤", nature: "地", wuxing: "土" }
    ];

    /**
     * Calculates Upper, Lower trigrams and Moving Line from three numbers.
     * Traditionally: 
     * Upper = Num1 % 8 (8 is Kun)
     * Lower = Num2 % 8
     * Moving Line = (Num1 + Num2 + Num3) % 6 (6 is Top)
     */
    static calculateFromNumbers(n1, n2, n3) {
        const upperIdx = n1 % 8 || 8;
        const lowerIdx = n2 % 8 || 8;
        const movingLine = (n1 + n2 + n3) % 6 || 6;

        const upperTrigram = this.TRIGRAMS.find(t => t.id === upperIdx);
        const lowerTrigram = this.TRIGRAMS.find(t => t.id === lowerIdx);

        const binary = this.getHexBinary(upperTrigram.id, lowerTrigram.id);

        return {
            upperTrigram,
            lowerTrigram,
            movingLine,
            binary,
            analysis: this.analyzeBodyGuest(upperTrigram, lowerTrigram, movingLine)
        };
    }

    /**
     * Converts trigram IDs to 6-bit binary string (bottom-up).
     * Trigram binary mapping (Top to Bottom):
     * 1 (乾): 111
     * 2 (兌): 011
     * 3 (離): 101
     * 4 (震): 001
     * 5 (巽): 110
     * 6 (坎): 010
     * 7 (艮): 100
     * 0 (坤): 000
     */
    static getTrigramBinary(id) {
        const map = {
            1: "111", 2: "011", 3: "101", 4: "001",
            5: "110", 6: "010", 7: "100", 8: "000"
        };
        return map[id];
    }

    static getHexBinary(upperId, lowerId) {
        // App expects bottom-to-top order [line1, line2, ..., line6]
        const upper = this.getTrigramBinary(upperId).split("").reverse().join("");
        const lower = this.getTrigramBinary(lowerId).split("").reverse().join("");
        return lower + upper;
    }

    /**
     * Body/Guest Analysis (體用分析)
     * The trigram WITHOUT the moving line is the "Body" (體).
     * The trigram WITH the moving line is the "Guest" (用).
     */
    static analyzeBodyGuest(upper, lower, movingLine) {
        const isUpperBody = movingLine > 3 ? false : true;
        
        const bodyTrigram = movingLine > 3 ? lower : upper;
        const origGuestTrigram = movingLine > 3 ? upper : lower;

        // Nuclear Analysis
        const binary = this.getHexBinary(upper.id, lower.id);
        const nuclearBinary = this.getNuclearBinary(binary);
        const nuclearLowerBin = nuclearBinary.substring(0, 3);
        const nuclearUpperBin = nuclearBinary.substring(3, 6);
        
        const nuclearLower = this.getTrigramByBinary(nuclearLowerBin);
        const nuclearUpper = this.getTrigramByBinary(nuclearUpperBin);

        // Future Analysis (The Guest Trigram changes)
        const futureGuestTrigram = this.getChangedTrigram(origGuestTrigram, movingLine);

        const interactions = {
            original: this.getWuxingInteraction(bodyTrigram.wuxing, origGuestTrigram.wuxing),
            nuclearLower: this.getWuxingInteraction(bodyTrigram.wuxing, nuclearLower.wuxing),
            nuclearUpper: this.getWuxingInteraction(bodyTrigram.wuxing, nuclearUpper.wuxing),
            future: this.getWuxingInteraction(bodyTrigram.wuxing, futureGuestTrigram.wuxing)
        };

        return {
            isUpperBody,
            bodyTrigram,
            origGuestTrigram,
            nuclearLower,
            nuclearUpper,
            futureGuestTrigram,
            interactions,
            result: this.getInteractionResult(interactions.original)
        };
    }

    static getNuclearBinary(binary) {
        // App expects bottom-to-top [L1, L2, L3, L4, L5, L6]
        // Nuclear (互卦): 
        // Lower nuclear = Lines 2,3,4
        // Upper nuclear = Lines 3,4,5
        const nL = binary.substring(1, 4);
        const nU = binary.substring(2, 5);
        return nL + nU;
    }

    static getTrigramByBinary(bin) {
        // App standard for hexagram binary is Bottom-to-Top [L1, L2, L3]
        const map = {
            "111": "乾", "110": "兌", "101": "離", "100": "震",
            "011": "巽", "010": "坎", "001": "艮", "000": "坤"
        };
        const name = map[bin];
        return this.TRIGRAMS.find(t => t.name === name) || this.TRIGRAMS[7]; // Fallback to Kun
    }

    static getChangedTrigram(trigram, movingLine) {
        // line 1,2,3 -> index 0,1,2 of lower
        // line 4,5,6 -> index 0,1,2 of upper
        const bitIndex = (movingLine - 1) % 3;
        // getTrigramBinary returns Top-to-Bottom
        const bin = this.getTrigramBinary(trigram.id).split("");
        // Top is index 0. Bottom is index 2.
        const flipIdx = 2 - bitIndex;
        bin[flipIdx] = (bin[flipIdx] === "1" ? "0" : "1");
        // Convert back to Bottom-to-Top for getTrigramByBinary
        const newBin = bin.reverse().join("");
        return this.getTrigramByBinary(newBin);
    }

    static getWuxingInteraction(body, guest) {
        const cycle = {
            "金": { produce: "水", restrict: "木", resist: "火", support: "土" },
            "木": { produce: "火", restrict: "土", resist: "金", support: "水" },
            "水": { produce: "木", restrict: "火", resist: "土", support: "金" },
            "火": { produce: "土", restrict: "金", resist: "水", support: "木" },
            "土": { produce: "金", restrict: "水", resist: "木", support: "火" }
        };

        if (body === guest) return "比和"; // Same element
        if (cycle[guest].produce === body) return "用生體"; // Guest produces Body (Lucky)
        if (cycle[body].produce === guest) return "體生用"; // Body produces Guest (Leak)
        if (cycle[guest].restrict === body) return "用剋體"; // Guest restricts Body (Unlucky)
        if (cycle[body].restrict === guest) return "體剋用"; // Body restricts Guest (Control/Small Luck)
        
        return "未知";
    }

    static getInteractionResult(interaction) {
        const results = {
            "用生體": "大吉：用生體，事半功倍，得貴人助。",
            "比和": "吉：體用比和，和諧穩定，順利前行。",
            "體剋用": "小吉：體剋用，雖有阻礙但可克服，終有所獲。",
            "體生用": "凶：體生用，能量洩漏，多勞少得，防損財。",
            "用剋體": "大凶：用剋體，壓力重大，防意外挫折。"
        };
        return results[interaction] || "需結合同爻詳細分析。";
    }
}
