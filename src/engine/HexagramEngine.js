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
}
