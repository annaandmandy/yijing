/**
 * ManifestService.js
 * Handles loading of all 64 hexagram JSON files.
 */

export class ManifestService {
  static DATA_PATH = "./yi_data_enhanced/";
  static HEXAGRAM_COUNT = 64;

  /**
   * Loads all hexagrams into a clinical array.
   * Returns a promise that resolves when all are loaded.
   */
  static async loadAllHexagrams() {
    const promises = [];
    for (let i = 1; i <= this.HEXAGRAM_COUNT; i++) {
        // Assuming file format is hexagram_{id}.json
      promises.push(
        fetch(`${this.DATA_PATH}hexagram_${i}.json`)
          .then(res => res.json())
          .catch(err => {
            console.error(`Failed to load hexagram ${i}:`, err);
            return null;
          })
      );
    }
    const results = await Promise.all(promises);
    return results.filter(h => h !== null);
  }

  /**
   * Get a single hexagram by ID.
   */
  static async getHexagram(id) {
    try {
      const response = await fetch(`${this.DATA_PATH}hexagram_${id}.json`);
      return await response.json();
    } catch (err) {
      console.error(`Error loading hexagram ${id}:`, err);
      return null;
    }
  }
}
