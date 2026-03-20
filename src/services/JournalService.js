/**
 * JournalService.js
 * Manages the persistence of I-Ching divination records in local storage.
 */

export class JournalService {
  static STORAGE_KEY = "iching_journal_history";

  /**
   * Saves a new divination record.
   * @param {Object} record - { timestamp, question, originalId, futureId, changingLines, messages }
   */
  static saveRecord(record) {
    const history = this.getHistory();
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      messages: [], // Initialize empty chat
      ...record
    };
    history.unshift(newRecord);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    return newRecord.id;
  }

  /**
   * Updates messages for a specific record.
   * @param {string} id - Record ID.
   * @param {Array} messages - Message history.
   */
  static updateMessages(id, messages) {
    const history = this.getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
      history[index].messages = messages;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    }
  }

  /**
   * Gets a specific record by ID.
   */
  static getRecord(id) {
    const history = this.getHistory();
    return history.find(item => item.id === id);
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
