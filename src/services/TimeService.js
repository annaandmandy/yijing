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
        // TODO: year changes at 立春, not Jan 1 — dates before ~Feb 4 get next year's GanZhi.
        const yearBase = year - 1984; // 1984 was 甲子
        const yearStem = this.STEMS[((yearBase % 10) + 10) % 10];
        const yearBranch = this.BRANCHES[((yearBase % 12) + 12) % 12];

        // Monthly Branch (Approx based on Solar Terms)
        // Tiger (寅) is usually Feb (approx start of Spring), so Jan is 丑 and Dec is 子
        // TODO: month boundary is the 節 (e.g. 立春 ~Feb 4), not the 1st of the Gregorian month.
        const monthlyBranch = this.BRANCHES[month % 12];

        // Daily GanZhi: whole days since 1900-01-01, which was 甲戌 (Stem 0, Branch 10).
        // Counting in UTC keeps the result independent of time of day and DST.
        const dayMs = 24 * 60 * 60 * 1000;
        const diffDays = (Date.UTC(year, month - 1, day) - Date.UTC(1900, 0, 1)) / dayMs;

        const dayStem = this.STEMS[((diffDays % 10) + 10) % 10];
        const dayBranch = this.BRANCHES[(((diffDays + 10) % 12) + 12) % 12];

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

        // TODO: 囚/死 are swapped — textbook rule is 剋令者囚, 令剋者死 (e.g. spring: 金囚 土死). Fix together with wuxing_energy.md.
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
