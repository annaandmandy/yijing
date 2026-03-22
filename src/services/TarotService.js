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
            if (!response.ok) throw new Error("Card data not found");
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
        // Assuming images are named 00.png, 01.png, wands_01.png etc.
        return `${this.IMAGE_PATH}${id}.png`;
    }
}
