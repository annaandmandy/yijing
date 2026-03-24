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
      type: record.type || 'iching', // Default to iching for legacy
      ...record
    };
    history.unshift(newRecord);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    return newRecord.id;
  }

  /**
   * Updates any fields for a specific record.
   * @param {string} id - Record ID.
   * @param {Object} updates - Object containing fields to update.
   */
  static updateRecord(id, updates) {
    const history = this.getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
      history[index] = { ...history[index], ...updates };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    }
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
  static getMonthlyHistory(year, month, type = null) {
    const history = this.getHistory();
    return history.filter(record => {
      const d = new Date(record.date);
      const isMonthMatch = d.getFullYear() === year && d.getMonth() === month;
      const recType = record.type || 'iching'; // Legacy records are iching
      return isMonthMatch && (type ? recType === type : true);
    });
  }

  /**
   * Gets statistics for a specific month (Five Elements distribution).
   */
  static getMonthlyStats(year, month, library, type = 'iching') {
    const records = this.getMonthlyHistory(year, month, type);

    if (type === 'tarot') {
      const suits = { "權杖(火)": 0, "聖杯(水)": 0, "寶劍(風)": 0, "金幣(土)": 0, "大序": 0 };
      records.forEach(r => {
        if (r.spread) {
          const cardsStr = typeof r.spread === 'string' ? r.spread : r.spread.join(',');
          const cardIds = cardsStr.split(',').map(s => parseInt(s));
          cardIds.forEach(id => {
            if (id >= 0 && id <= 21) suits['大序']++;
            else if (id >= 22 && id <= 35) suits['權杖(火)']++;
            else if (id >= 36 && id <= 49) suits['聖杯(水)']++;
            else if (id >= 50 && id <= 63) suits['寶劍(風)']++;
            else if (id >= 64 && id <= 77) suits['金幣(土)']++;
          });
        }
      });
      return { total: records.length, wuxing: suits };
    }

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
  
  /**
   * Deletes a specific record by ID.
   */
  static deleteRecord(id) {
    const history = this.getHistory();
    const filtered = history.filter(item => item.id !== id);
    if (history.length !== filtered.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  }
}
