/**
 * PlumBlossomEngine.js
 * Logic for Plum Blossom Divination (梅花易數).
 * Handles number-to-trigram conversion, Body/Guest analysis, and Five Elements interaction.
 */
import { HKO_LUNAR_YEARS, HKO_RANGE } from "./hkoLunarMonths.js";
import { TimeService } from "../services/TimeService.js";

// Midnight UTC of a civil date as ms. Unlike Date.UTC, years 0–99 stay as they are (not 1900–1999).
const utcDay = (year, monthIndex, day) => new Date(0).setUTCFullYear(year, monthIndex, day);
const isoDay = (iso) => { const [y, m, d] = iso.split("-").map(Number); return utcDay(y, m - 1, d); };

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
        return this.#buildResult(n1, n2, n1 + n2 + n3);
    }

    /**
     * 年月日時起卦 (《梅花易數》卷一):
     * 「年月日為上卦。年月日加時總數為下卦。又以年月日時總數取爻。」
     * Year and hour are branch numbers (子 = 1 … 亥 = 12), month and day the lunar ones.
     */
    static calculateFromTimeNumbers(yearNum, month, day, hourNum) {
        const dateSum = yearNum + month + day;
        return this.#buildResult(dateSum, dateSum + hourNum, dateSum + hourNum);
    }

    /**
     * Time cast for a moment, read as local wall-clock time.
     * Throws RangeError when the lunar date can't be worked out (see toLunarMoment).
     */
    static calculateFromTime(date) {
        const moment = this.toLunarMoment(date);
        const result = this.calculateFromTimeNumbers(moment.yearNum, moment.month, moment.day, moment.hourNum);
        return { ...result, timeCast: moment };
    }

    // Upper = upperNum % 8, lower = lowerNum % 8 (8 is 坤), moving line = lineNum % 6 (6 is the top)
    static #buildResult(upperNum, lowerNum, lineNum) {
        const upperTrigram = this.TRIGRAMS.find(t => t.id === (upperNum % 8 || 8));
        const lowerTrigram = this.TRIGRAMS.find(t => t.id === (lowerNum % 8 || 8));
        const movingLine = lineNum % 6 || 6;

        const binary = this.getHexBinary(upperTrigram.id, lowerTrigram.id);
        const flipped = binary[movingLine - 1] === "1" ? "0" : "1";
        const changedBinary = binary.slice(0, movingLine - 1) + flipped + binary.slice(movingLine);

        return {
            upperTrigram,
            lowerTrigram,
            movingLine,
            binary,
            changedBinary,
            analysis: this.analyzeBodyGuest(upperTrigram, lowerTrigram, movingLine)
        };
    }

    // The dates hkoLunarMonths.js covers (lunar 1901 正月初一 to the end of 2100), written by its generator
    static LUNAR_RANGE = { first: isoDay(HKO_RANGE.first), last: isoDay(HKO_RANGE.last) };
    static #monthStarts = null;

    /**
     * Reads a moment as local wall-clock time and gives the lunar numbers the time cast needs.
     * - Hours: 子時 is 23:00–00:59, 丑時 01:00–02:59, …; from 23:00 the day counts as the next day (子初換日).
     * - The (rolled-over) local civil date is looked up in the HKO month table, so the lunar date is
     *   HKO's date for that civil date whatever the device's time zone.
     * - A leap month (閏月) counts as the month it repeats.
     * Throws RangeError outside 1901-02-19 … 2100-12-31 (checked on the rolled-over date).
     */
    static toLunarMoment(date) {
        const hour = date.getHours();
        const hourIdx = Math.floor(((hour + 1) % 24) / 2);
        // The day overflow is normalized (e.g. Jan 32 → Feb 1)
        const civil = utcDay(date.getFullYear(), date.getMonth(), date.getDate() + (hour >= 23 ? 1 : 0));

        if (isNaN(civil) || civil < this.LUNAR_RANGE.first || civil > this.LUNAR_RANGE.last) {
            throw new RangeError("此日期超出農曆換算範圍（1901–2100）");
        }

        // Last month start on or before the date
        const starts = this.#lunarMonthStarts();
        let lo = 0, hi = starts.length - 1;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            if (starts[mid].time <= civil) lo = mid; else hi = mid - 1;
        }
        const { lunarYear, month, isLeapMonth, time } = starts[lo];

        const yearIdx = (((lunarYear - 4) % 12) + 12) % 12; // 4 CE was a 子 year
        return {
            lunarYear,
            yearBranch: TimeService.BRANCHES[yearIdx],
            yearNum: yearIdx + 1,
            month,
            isLeapMonth,
            day: Math.round((civil - time) / 86400000) + 1,
            hourBranch: TimeService.BRANCHES[hourIdx],
            hourNum: hourIdx + 1
        };
    }

    // Parses HKO_LUNAR_YEARS ("1901 02-19 03-20 … 01-10", * = leap month) into sorted month starts
    static #lunarMonthStarts() {
        if (!this.#monthStarts) {
            this.#monthStarts = HKO_LUNAR_YEARS.flatMap(line => {
                const [yearText, ...cells] = line.split(" ");
                const lunarYear = Number(yearText);
                let gregorianYear = lunarYear;
                let month = 0;
                let prev = "";
                return cells.map(cell => {
                    const isLeapMonth = cell.endsWith("*");
                    const monthDay = cell.replace("*", "");
                    if (monthDay < prev) gregorianYear++;
                    prev = monthDay;
                    if (!isLeapMonth) month++;
                    const [m, d] = monthDay.split("-").map(Number);
                    return { time: utcDay(gregorianYear, m - 1, d), lunarYear, month, isLeapMonth };
                });
            });
        }
        return this.#monthStarts;
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
