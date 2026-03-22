/**
 * TimeService.js
 * Calculates Heavenly Stems (天干) and Earthly Branches (地支) for I-Ching analysis.
 */

export class TimeService {
    static STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    static BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

    /**
     * Gets the GanZhi for a specific date.
     * Note: This is an approximation suitable for historical divination context.
     * @param {Date} date 
     */
    static getGanZhi(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // Year GanZhi (simplified)
        // 2024 is Jia-Chen (甲辰)
        const yearBase = year - 1984; // 1984 was 甲子
        const yearStem = this.STEMS[((yearBase % 10) + 10) % 10];
        const yearBranch = this.BRANCHES[((yearBase % 12) + 12) % 12];

        // Monthly Branch (Approx based on Solar Terms)
        // Tiger (寅) is usually Feb (approx start of Spring)
        const monthlyBranch = this.BRANCHES[(month + 1) % 12];

        // Daily GanZhi (High Precision Epoch Calculation)
        // Based on Jan 1, 1900 being 甲戌 (Stem 0, Branch 10)
        // Total days since 1900-01-01
        const epoch = new Date(1900, 0, 1);
        const diffDays = Math.floor((date.getTime() - epoch.getTime()) / (24 * 60 * 60 * 1000));

        // Jan 1, 1900 was actually 甲戌 (But different systems use different offsets)
        // Let's use 1900-01-31 as 甲子 (Stem 0, Branch 0) for easier math
        const anchor = new Date(1900, 0, 31);
        const daysFromAnchor = Math.floor((date.getTime() - anchor.getTime()) / (24 * 60 * 60 * 1000));

        const dayStem = this.STEMS[((daysFromAnchor % 10) + 10) % 10];
        const dayBranch = this.BRANCHES[((daysFromAnchor % 12) + 12) % 12];

        return {
            year: `${yearStem}${yearBranch}`,
            month: `${monthlyBranch}`,
            day: `${dayStem}${dayBranch}`,
            dayStem,
            dayBranch,
            monthBranch: monthlyBranch
        };
    }

    /**
     * Determines the Five Elements Strength (旺相休囚死)
     * based on the current Month Branch.
     */
    static getWuxingStrength(monthBranch) {
        const seasonElements = {
            "寅": "木", "卯": "木", "辰": "土", // Spring
            "巳": "火", "午": "火", "未": "土", // Summer
            "申": "金", "酉": "金", "戌": "土", // Autumn
            "亥": "水", "子": "水", "丑": "土"  // Winter
        };
        const currentElement = seasonElements[monthBranch];

        // Rules of Strength:
        // Wang (旺): Season matches
        // Xiang (相): Season produces
        // Xiu (休): Matches produces season
        // Qiu (囚): Matches overcomes season
        // Si (死): Season overcomes matches

        const relationships = {
            "木": { "木": "旺", "火": "相", "水": "休", "土": "囚", "金": "死" },
            "火": { "火": "旺", "土": "相", "木": "休", "金": "囚", "水": "死" },
            "土": { "土": "旺", "金": "相", "火": "休", "水": "囚", "木": "死" },
            "金": { "金": "旺", "水": "相", "土": "休", "木": "囚", "火": "死" },
            "水": { "水": "旺", "木": "相", "金": "休", "火": "囚", "土": "死" }
        };

        return relationships[currentElement];
    }
}
