/**
 * SettingsService.js
 * Manages application-wide settings and persistence.
 */

export class SettingsService {
    static STORAGE_KEY = "iching_lab_settings";

    static DEFAULT_SETTINGS = {
        mode: 'iching', // 'iching' or 'tarot'
        tarotSpread: 'three-card', // 'one-card' or 'three-card'
        persona: 'professional' // 'professional', 'sage', 'coach', 'mystic'
    };

    /**
     * Retrieves all settings, merging with defaults.
     */
    static getSettings() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        try {
            return stored ? { ...this.DEFAULT_SETTINGS, ...JSON.parse(stored) } : { ...this.DEFAULT_SETTINGS };
        } catch (e) {
            console.error("Failed to parse settings:", e);
            return { ...this.DEFAULT_SETTINGS };
        }
    }

    /**
     * Saves a specific setting key.
     * @param {string} key 
     * @param {any} value 
     */
    static setSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    }

    /**
     * Gets a specific setting value.
     * @param {string} key 
     */
    static getSetting(key) {
        return this.getSettings()[key];
    }
}
