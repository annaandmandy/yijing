/**
 * JournalService.js
 * Manages the persistence of I-Ching divination records in local storage.
 */

/**
 * Thrown when a backup file can't be imported. The message is shown to the user.
 */
export class BackupError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BackupError';
  }
}

export class JournalService {
  static STORAGE_KEY = "iching_journal_history";

  // Backup file format. Bump BACKUP_VERSION when the record shape changes and add
  // MIGRATIONS[oldVersion] = data => data in the next version's shape.
  static BACKUP_FORMAT = "iching-lab-journal";
  static BACKUP_VERSION = 1;
  static MIGRATIONS = {};

  /**
   * Record ids as one type. The first saveRecord stored ids as numbers and the History
   * modal passes them back as strings, so ids are compared by this key.
   */
  static idKey(id) {
    return String(id);
  }

  /**
   * True when two record ids name the same record.
   */
  static sameId(a, b) {
    return a != null && b != null && this.idKey(a) === this.idKey(b);
  }

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
   * @param {string|number} id - Record ID.
   * @param {Object} updates - Object containing fields to update.
   */
  static updateRecord(id, updates) {
    const history = this.getHistory();
    const index = history.findIndex(item => this.sameId(item.id, id));
    if (index !== -1) {
      history[index] = { ...history[index], ...updates };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    }
  }

  /**
   * Updates messages for a specific record.
   * @param {string|number} id - Record ID.
   * @param {Array} messages - Message history.
   */
  static updateMessages(id, messages) {
    const history = this.getHistory();
    const index = history.findIndex(item => this.sameId(item.id, id));
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
    return history.find(item => this.sameId(item.id, id));
  }

  /**
   * Gets the date a record was cast, so its GanZhi stays fixed when reopened.
   * Falls back to now for records without a valid date.
   */
  static getCastDate(record) {
    const date = new Date(record?.date);
    return isNaN(date.getTime()) ? new Date() : date;
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
    const filtered = history.filter(item => !this.sameId(item.id, id));
    if (history.length !== filtered.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  /**
   * Builds the backup object: every record exactly as stored.
   */
  static exportBackup() {
    return {
      format: this.BACKUP_FORMAT,
      version: this.BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      records: this.getHistory()
    };
  }

  /**
   * Backup as the text written to the downloaded file.
   */
  static serializeBackup() {
    return JSON.stringify(this.exportBackup(), null, 2);
  }

  /**
   * Parses, validates and migrates a backup file. Throws BackupError on any problem.
   * @returns {Array} records in the current shape.
   */
  static parseBackup(text, { version = this.BACKUP_VERSION, migrations = this.MIGRATIONS } = {}) {
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new BackupError("檔案不是有效的 JSON，可能已損毀。");
    }
    if (!data || typeof data !== 'object' || Array.isArray(data) || data.format !== this.BACKUP_FORMAT) {
      throw new BackupError("這不是 I-Ching Lab 的日誌備份檔。");
    }
    if (!Number.isInteger(data.version) || data.version < 1) {
      throw new BackupError("備份檔的版本號無效。");
    }
    if (data.version > version) {
      throw new BackupError("此備份來自較新版本，請先更新 App。");
    }
    while (data.version < version) {
      const migrate = migrations[data.version];
      if (!migrate) throw new BackupError(`無法轉換第 ${data.version} 版的備份檔。`);
      data = migrate(data);
    }
    if (!Array.isArray(data.records)) {
      throw new BackupError("備份檔缺少紀錄清單。");
    }
    data.records.forEach((record, i) => {
      const problem = this.#recordProblem(record);
      if (problem) throw new BackupError(`第 ${i + 1} 筆紀錄${problem}。`);
    });
    return data.records;
  }

  /**
   * Only checks what every stored record has, so any journal the app wrote passes.
   * Ids, spreads and messages are also checked because the UI puts them into HTML
   * and onclick attributes, or calls string/array methods on them.
   */
  static #recordProblem(record) {
    const isObject = v => !!v && typeof v === 'object' && !Array.isArray(v);
    if (!isObject(record)) return "格式不正確";
    const { id, date, messages, type, spread } = record;
    // saveRecord ids are Date.now(), as a digit string (or a number in the first version)
    const validId = (typeof id === 'string' && /^\d+$/.test(id)) || (Number.isInteger(id) && id >= 0);
    if (!validId) return "缺少 id 或 id 格式不正確";
    if (typeof date !== 'string' || Number.isNaN(new Date(date).getTime())) return "的日期無法辨識";
    if (messages !== undefined && !(Array.isArray(messages) && messages.every(m =>
        isObject(m) && typeof m.role === 'string' && typeof m.content === 'string'))) {
      return "的對話紀錄格式不正確";
    }
    if (type !== undefined && type !== 'iching' && type !== 'tarot') return "的類型不明";
    // Both spread shapes getMonthlyStats reads: [{id, isReversed}] or a "0,22,77" string
    if (spread !== undefined) {
      const validSpread = Array.isArray(spread)
        ? spread.every(c => isObject(c) && Number.isInteger(c.id) &&
            (c.isReversed === undefined || typeof c.isReversed === 'boolean'))
        : typeof spread === 'string' && /^[\d,\s]*$/.test(spread);
      if (!validSpread) return "的牌陣格式不正確";
    }
    return null;
  }

  /**
   * Merges a backup into the journal. Same id = same reading; the copy with the longer
   * chat wins, local wins a tie. Nothing is written unless the whole file is valid.
   * @returns {{added: number, updated: number, skipped: number}}
   */
  static importBackup(text) {
    const imported = this.parseBackup(text);
    const merged = this.getHistory();

    // Each local record can be matched once, so same-millisecond duplicates survive.
    const unmatched = new Map();
    merged.forEach((record, index) => {
      const key = this.idKey(record.id);
      if (!unmatched.has(key)) unmatched.set(key, []);
      unmatched.get(key).push(index);
    });

    const counts = { added: 0, updated: 0, skipped: 0 };
    for (const record of imported) {
      const index = unmatched.get(this.idKey(record.id))?.shift();
      if (index === undefined) {
        merged.push(record);
        counts.added++;
      } else if ((record.messages?.length || 0) > (merged[index].messages?.length || 0)) {
        // Keep fields only the local copy has (e.g. a later quickInsight) and its id type
        merged[index] = { ...merged[index], ...record, id: merged[index].id };
        counts.updated++;
      } else {
        counts.skipped++;
      }
    }

    // Stable sort keeps same-date records in their stored order.
    merged.sort((a, b) => new Date(b.date) - new Date(a.date));

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(merged));
    } catch {
      throw new BackupError("儲存空間不足，日誌未變更。");
    }
    return counts;
  }
}
