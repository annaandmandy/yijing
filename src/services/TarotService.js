/**
 * TarotService.js
 * Handles fetching Tarot card data and images.
 */

export class TarotService {
    static DATA_PATH = "/tarot_data/";
    static IMAGE_PATH = "/tarot/";

    /**
     * Fetches details for a specific card by its ID.
     */
    static async getCard(id) {
        try {
            const response = await fetch(`${this.DATA_PATH}card_${id}.json`);
            if (!response.ok) {
                console.error(`Tarot card ${id} not found: ${response.status}`);
                return null;
            }
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error(`Tarot card ${id} returned non-JSON content: ${contentType}`);
                return null;
            }
            return await response.json();
        } catch (err) {
            console.error(`Error loading Tarot card ${id}:`, err);
            return null;
        }
    }

    /**
     * Gets the image URL for a card.
     */
    static getImageUrl(id) {
        const mapping = this.getCardImageMapping(id);
        return `${this.IMAGE_PATH}${mapping}.jpg`;
    }

    /**
     * Maps JSON IDs to renamed image IDs (00-78 skipping 01).
     */
    static getCardImageMapping(id) {
        // Major Arcana: 00-21 -> Image 00, 02-22
        if (!id.includes('_')) {
            const num = parseInt(id);
            if (num === 0) return "00";
            return (num + 1).toString().padStart(2, '0');
        }

        // Minor Arcana: wands, cups, swords, pentacles
        const suits = ['wands', 'cups', 'swords', 'pentacles'];
        const parts = id.split('_');
        const suit = parts[0];
        const rank = parts[1];
        const suitIdx = suits.indexOf(suit);
        const rankNum = parseInt(rank);

        // Base is 23 (after Major Arcana 0..22)
        const base = 23 + (suitIdx * 14);
        const finalNum = base + rankNum - 1;
        return finalNum.toString().padStart(2, '0');
    }
}
