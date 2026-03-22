/**
 * HexagramEngine.js
 * Handles the logic of converting physical coin toss results to I-Ching hexagrams.
 */

export class HexagramEngine {
  /**
   * Calculates original and future hexagrams from 6 rounds of coin tosses.
   * @param {number[]} tosses - Array of 6 numbers (sums of 3 coins: 6, 7, 8, or 9).
   *                            Ordered from bottom (1st line) to top (6th line).
   * @returns {Object} - Result containing original binary, future binary, and changing line indices.
   */
  static calculateHexagram(tosses) {
    if (tosses.length !== 6) {
      throw new Error("6 tosses are required for a complete hexagram.");
    }

    let originalBinaryArray = [];
    let futureBinaryArray = [];
    let changingLines = []; // 1-indexed (1: bottom, 6: top)

    tosses.forEach((sum, index) => {
      let originalBit;
      let futureBit;
      let isChanging = false;

      switch (sum) {
        case 6: // Old Yin (Changing)
          originalBit = "0";
          futureBit = "1";
          isChanging = true;
          break;
        case 7: // Young Yang (Stable)
          originalBit = "1";
          futureBit = "1";
          break;
        case 8: // Young Yin (Stable)
          originalBit = "0";
          futureBit = "0";
          break;
        case 9: // Old Yang (Changing)
          originalBit = "1";
          futureBit = "0";
          isChanging = true;
          break;
        default:
          throw new Error(`Invalid coin sum: ${sum}. Must be 6, 7, 8, or 9.`);
      }

      originalBinaryArray.push(originalBit);
      futureBinaryArray.push(futureBit);
      if (isChanging) {
        changingLines.push(index + 1);
      }
    });

    // The binary string for primary_id/id matching in I-Ching 
    // Usually, we store them as strings like "111000" (top-to-bottom or bottom-to-top)
    // Based on yi_data_enhanced, "111111" is Chien (all Yang).
    // Let's assume the string is ordered [line1, line2, ..., line6]

    return {
      originalBinary: originalBinaryArray.join(""),
      futureBinary: futureBinaryArray.join(""),
      changingLines: changingLines,
      hasChange: changingLines.length > 0
    };
  }

  /**
   * Helper to get hexagram ID from binary string.
   * Note: This requires a pre-loaded mapping or a search through the 64 JSONs.
   * @param {string} binary 
   * @param {Array} library - Optional pre-loaded list of 64 hexagram summaries.
   */
  static findHexagramIdByBinary(binary, library) {
    if (!library) return null;
    const hex = library.find(h => h.binary === binary);
    return hex ? hex.id : null;
  }
  /**
   * Derives related hexagrams.
   */
  static getRelatedHexagrams(binary) {
    // Nuclear: lines 2,3,4 (lower) and 3,4,5 (upper)
    const nuclearLower = binary.substring(1, 4);
    const nuclearUpper = binary.substring(2, 5);
    const nuclearBinary = nuclearLower + nuclearUpper;

    // Inverted: reverse binary
    const invertedBinary = binary.split("").reverse().join("");

    // Opposite: flip bits
    const oppositeBinary = binary.split("").map(b => b === "1" ? "0" : "1").join("");

    return { nuclearBinary, invertedBinary, oppositeBinary };
  }

  /**
   * Calculates Six Relatives (六親) based on Palace and Line elements.
   */
  static getRelation(palaceWuxing, lineWuxing) {
    const relationships = {
      // Self produces -> Child
      "金": { "金": "兄弟", "水": "子孫", "木": "妻財", "火": "官鬼", "土": "父母" },
      "木": { "木": "兄弟", "火": "子孫", "土": "妻財", "金": "官鬼", "水": "父母" },
      "水": { "水": "兄弟", "木": "子孫", "火": "妻財", "土": "官鬼", "金": "父母" },
      "火": { "火": "兄弟", "土": "子孫", "金": "妻財", "水": "官鬼", "木": "父母" },
      "土": { "土": "兄弟", "金": "子孫", "水": "妻財", "木": "官鬼", "火": "父母" }
    };
    return relationships[palaceWuxing]?.[lineWuxing] || "未知";
  }

  /**
   * Calculates Six Beasts (六神) based on Day Stem.
   * Day Stem governs the starting beast of the bottom line.
   */
  static getSixBeasts(dayStem) {
    const beastOrder = ["青龍", "朱雀", "勾陳", "騰蛇", "白虎", "玄武"];
    let startIdx = 0;
    if (["甲", "乙"].includes(dayStem)) startIdx = 0;
    else if (["丙", "丁"].includes(dayStem)) startIdx = 1;
    else if (["戊"].includes(dayStem)) startIdx = 2;
    else if (["己"].includes(dayStem)) startIdx = 3;
    else if (["庚", "辛"].includes(dayStem)) startIdx = 4;
    else if (["壬", "癸"].includes(dayStem)) startIdx = 5;

    let results = [];
    for (let i = 0; i < 6; i++) {
      results.push(beastOrder[(startIdx + i) % 6]);
    }
    return results; // Return from bottom up
  }
}
