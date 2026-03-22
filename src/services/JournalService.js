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
   * Gets records for a specific month.
   */
  static getMonthlyHistory(year, month) {
    const history = this.getHistory();
    return history.filter(record => {
      const d = new Date(record.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  /**
   * Gets statistics for a specific month (Five Elements distribution).
   */
  static getMonthlyStats(year, month, library) {
    const records = this.getMonthlyHistory(year, month);
    const wuxingCounters = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 };

    records.forEach(record => {
      const hex = library.find(h => h.id === record.originalId);
      if (hex && hex.najia_analysis?.palace_wuxing) {
        const wx = hex.najia_analysis.palace_wuxing;
        if (wuxingCounters[wx] !== undefined) wuxingCounters[wx]++;
      }
    });

    return {
      total: records.length,
      wuxing: wuxingCounters
    };
  }
}
