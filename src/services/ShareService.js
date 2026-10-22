/**
 * ShareService.js
 * Builds the plain-text summary of a reading for the copy button.
 */

export class ShareService {
    static TIME_ZONE = 'America/New_York';

    /**
     * Formats a date as Boston solar time.
     * @param {Date} date
     */
    static formatSolarTime(date) {
        return date.toLocaleString('zh-TW', { timeZone: this.TIME_ZONE }) + " (波士頓真太陽時)";
    }

    /**
     * Builds the copy text from the reading's saved question and cast date.
     * @param {Object} reading - { question, date, original, future, hasChange }
     */
    static buildCopyText({ question, date, original, future, hasChange }) {
        const changeText = hasChange && future ? " 之 " + future.name : "";
        return `【I-Ching Lab】\n問題：${question || "隨喜求卦"}\n時間：${this.formatSolarTime(date)}\n本卦：${original.name}${changeText}\n解義：${original.summary}`;
    }
}
