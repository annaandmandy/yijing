/**
 * JournalService.js
 * Manages the persistence of I-Ching divination records in local storage.
 */

export class JournalService {
  static STORAGE_KEY = "iching_journal_history";

  /**
   * Saves a new divination record.
   * @param {Object} record - { timestamp, question, originalId, futureId, changingLines }
   */
  static saveRecord(record) {
    const history = this.getHistory();
    history.unshift({
      id: Date.now(),
      date: new Date().toISOString(),
      ...record
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  /**
   * Retrieves full history.
   */
  static getHistory() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Clears all history.
   */
  static clearHistory() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Gets statistics for trends (e.g., Five Elements distribution).
   * This would be expanded as we integrate more data.
   */
  static getStats() {
    const history = this.getHistory();
    // Logic for radar chart data generation goes here
    return {
      total: history.length,
      // ... stats
    };
  }
}
