/**
 * Constants.js
 * Theoretical data for I-Ching (Five Elements, Palaces, etc.)
 */

export const HEXAGRAM_ELEMENTS = {
    1: "金", 2: "土", 3: "水", 4: "土", 5: "水", 6: "金", 7: "水", 8: "水",
    9: "木", 10: "金", 11: "土", 12: "金", 13: "火", 14: "金", 15: "木", 16: "木",
    17: "金", 18: "火", 19: "土", 20: "金", 21: "火", 22: "土", 23: "金", 24: "木",
    25: "金", 26: "土", 27: "木", 28: "木", 29: "水", 30: "火", 31: "金", 32: "木",
    33: "金", 34: "金", 35: "金", 36: "水", 37: "木", 38: "火", 39: "水", 40: "水",
    41: "土", 42: "木", 43: "金", 44: "金", 45: "金", 46: "木", 47: "金", 48: "水",
    49: "水", 50: "火", 51: "木", 52: "土", 53: "木", 54: "土", 55: "水", 56: "火",
    57: "木", 58: "金", 59: "火", 60: "水", 61: "土", 62: "土", 63: "水", 64: "火"
};

export const ELEMENT_COLORS = {
    "金": "#e0e0e0", // White/Gold
    "木": "#4caf50", // Green
    "水": "#2196f3", // Blue
    "火": "#f44336", // Red
    "土": "#795548"  // Brown
};
export const HEXAGRAM_PHONETICS = {
    1: { bopomofo: "ㄑㄧㄢˊ", pinyin: "Qián" }, 2: { bopomofo: "ㄎㄨㄣ", pinyin: "Kūn" },
    3: { bopomofo: "ㄓㄨㄣ", pinyin: "Zhūn" }, 4: { bopomofo: "ㄇㄥˊ", pinyin: "Méng" },
    5: { bopomofo: "ㄒㄩ", pinyin: "Xū" }, 6: { bopomofo: "ㄙㄨㄥˋ", pinyin: "Sòng" },
    7: { bopomofo: "ㄕ", pinyin: "Shī" }, 8: { bopomofo: "ㄅㄧˇ", pinyin: "Bǐ" },
    9: { bopomofo: "ㄒㄧㄠˇ ㄒㄩˋ", pinyin: "Xiǎo Xù" }, 10: { bopomofo: "ㄌㄩˇ", pinyin: "Lǚ" },
    11: { bopomofo: "ㄊㄞˋ", pinyin: "Tài" }, 12: { bopomofo: "ㄆㄧˇ", pinyin: "Pǐ" },
    13: { bopomofo: "ㄊㄨㄥˊ ㄖㄣˊ", pinyin: "Tóng Rén" }, 14: { bopomofo: "ㄉㄚˋ ㄧㄡˇ", pinyin: "Dà Yǒu" },
    15: { bopomofo: "ㄑㄧㄢ", pinyin: "Qiān" }, 16: { bopomofo: "ㄩˋ", pinyin: "Yù" },
    17: { bopomofo: "ㄙㄨㄟˊ", pinyin: "Suí" }, 18: { bopomofo: "ㄍㄨˇ", pinyin: "Gǔ" },
    19: { bopomofo: "ㄌㄧㄣˊ", pinyin: "Lín" }, 20: { bopomofo: "ㄍㄨㄢ", pinyin: "Guān" },
    21: { bopomofo: "ㄕˋ ㄏㄜˊ", pinyin: "Shì Hé" }, 22: { bopomofo: "ㄅㄧˋ", pinyin: "Bì" },
    23: { bopomofo: "ㄅㄛ", pinyin: "Bō" }, 24: { bopomofo: "ㄈㄨˋ", pinyin: "Fù" },
    25: { bopomofo: "ㄨˊ ㄨㄤˋ", pinyin: "Wú Wàng" }, 26: { bopomofo: "ㄉㄚˋ ㄒㄩˋ", pinyin: "Dà Xù" },
    27: { bopomofo: "ㄧˊ", pinyin: "Yí" }, 28: { bopomofo: "ㄉㄚˋ ㄍㄨㄛˋ", pinyin: "Dà Guò" },
    29: { bopomofo: "ㄎㄢˇ", pinyin: "Kǎn" }, 30: { bopomofo: "ㄌㄧˊ", pinyin: "Lí" },
    31: { bopomofo: "ㄒㄧㄢˊ", pinyin: "Xián" }, 32: { bopomofo: "ㄏㄥˊ", pinyin: "Héng" },
    33: { bopomofo: "ㄉㄨㄣˋ", pinyin: "Dùn" }, 34: { bopomofo: "ㄉㄚˋ ㄓㄨㄤˋ", pinyin: "Dà Zhuàng" },
    35: { bopomofo: "ㄐㄧㄣˋ", pinyin: "Jìn" }, 36: { bopomofo: "ㄇㄧㄥˊ ㄧˊ", pinyin: "Míng Yí" },
    37: { bopomofo: "ㄐㄧㄚ ㄖㄣˊ", pinyin: "Jiā Rén" }, 38: { bopomofo: "ㄎㄨㄟˊ", pinyin: "Kuí" },
    39: { bopomofo: "ㄐㄧㄢˇ", pinyin: "Jiǎn" }, 40: { bopomofo: "ㄒㄧㄝˋ", pinyin: "Xiè" },
    41: { bopomofo: "ㄙㄨㄣˇ", pinyin: "Sǔn" }, 42: { bopomofo: "ㄧˋ", pinyin: "Yì" },
    43: { bopomofo: "ㄍㄨㄞˋ", pinyin: "Guài" }, 44: { bopomofo: "ㄍㄡˋ", pinyin: "Gòu" },
    45: { bopomofo: "ㄘㄨㄟˋ", pinyin: "Cuì" }, 46: { bopomofo: "ㄕㄥ", pinyin: "Shēng" },
    47: { bopomofo: "ㄎㄨㄣˋ", pinyin: "Kùn" }, 48: { bopomofo: "ㄐㄧㄥˇ", pinyin: "Jǐng" },
    49: { bopomofo: "ㄍㄜˊ", pinyin: "Gé" }, 50: { bopomofo: "ㄉㄧㄥˇ", pinyin: "Dǐng" },
    51: { bopomofo: "ㄓㄣˋ", pinyin: "Zhèn" }, 52: { bopomofo: "ㄍㄣˋ", pinyin: "Gèn" },
    53: { bopomofo: "ㄐㄧㄢˋ", pinyin: "Jiàn" }, 54: { bopomofo: "ㄍㄨㄟ ㄇㄟˋ", pinyin: "Guī Mèi" },
    55: { bopomofo: "ㄈㄥ", pinyin: "Fēng" }, 56: { bopomofo: "ㄌㄩˇ", pinyin: "Lǚ" },
    57: { bopomofo: "ㄒㄩㄣˋ", pinyin: "Xùn" }, 58: { bopomofo: "ㄉㄨㄟˋ", pinyin: "Duì" },
    59: { bopomofo: "ㄏㄨㄢˋ", pinyin: "Huàn" }, 60: { bopomofo: "ㄐㄧㄝˊ", pinyin: "Jié" },
    61: { bopomofo: "ㄓㄨㄥ ㄈㄨˊ", pinyin: "Zhōng Fú" }, 62: { bopomofo: "ㄒㄧㄠˇ ㄍㄨㄛˋ", pinyin: "Xiǎo Guò" },
    63: { bopomofo: "ㄐㄧˋ ㄐㄧˋ", pinyin: "Jì Jì" }, 64: { bopomofo: "ㄨㄟˋ ㄐㄧˋ", pinyin: "Wèi Jì" }
};
