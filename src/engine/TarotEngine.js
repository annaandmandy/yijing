/**
 * TarotEngine.js
 * Handles deck shuffling and spreading logic for Tarot divination.
 */

export class TarotEngine {
    static TOTAL_CARDS = 78;

    /**
     * Shuffles the 78-card deck and assigns random orientations.
     * @returns {Array} - Array of objects {id, isReversed}
     */
    static shuffleDeck() {
        // Define all IDs (Major: 00-21, Minor: suit_01-14)
        const major = Array.from({ length: 22 }, (_, i) => i.toString().padStart(2, '0'));
        const suits = ['wands', 'cups', 'swords', 'pentacles'];
        const minor = suits.flatMap(suit =>
            Array.from({ length: 14 }, (_, i) => `${suit}_${(i + 1).toString().padStart(2, '0')}`)
        );

        let deck = [...major, ...minor].map(id => ({
            id,
            isReversed: Math.random() > 0.5 // 50% chance for reversal
        }));

        // Fisher-Yates Shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck;
    }

    /**
     * Draws a 3-card spread (Past, Present, Future).
     * @param {Array} shuffledDeck 
     */
    static drawThreeCardSpread(shuffledDeck) {
        if (shuffledDeck.length < 3) throw new Error("Deck too small");
        return {
            past: shuffledDeck[0],
            present: shuffledDeck[1],
            future: shuffledDeck[2]
        };
    }
}
