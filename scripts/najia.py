import json
import os

# ==========================================
# 1. 核心術數數據庫 (不可省略)
# ==========================================

# 八宮及其五行
PALACE_WUXING = {
    "乾": "金", "兌": "金", "離": "火", "震": "木", 
    "巽": "木", "坎": "水", "艮": "土", "坤": "土"
}

# 地支五行
DIZHI_WUXING = {
    "子": "水", "亥": "水", "寅": "木", "卯": "木", 
    "巳": "火", "午": "火", "申": "金", "酉": "金", 
    "辰": "土", "戌": "土", "丑": "土", "未": "土"
}

# 納甲規則 (內卦, 外卦)
NAJIA_MAP = {
    "乾": (["子", "寅", "辰"], ["午", "申", "戌"]),
    "坎": (["寅", "辰", "午"], ["申", "戌", "子"]),
    "艮": (["辰", "午", "申"], ["戌", "子", "寅"]),
    "震": (["子", "寅", "辰"], ["午", "申", "戌"]),
    "巽": (["丑", "亥", "酉"], ["未", "巳", "卯"]),
    "離": (["卯", "丑", "亥"], ["酉", "未", "巳"]),
    "坤": (["未", "巳", "卯"], ["丑", "亥", "酉"]),
    "兌": (["巳", "卯", "丑"], ["亥", "酉", "未"]),
}

# 64 卦對應宮位 (尋宮完成版)
HEX_PALACE_MAP = {
    "111111": "乾", "111110": "乾", "111100": "乾", "111000": "乾", "110000": "乾", "100000": "乾", "101000": "乾", "101111": "乾",
    "000000": "坤", "000001": "坤", "000011": "坤", "000111": "坤", "001111": "坤", "011111": "坤", "010111": "坤", "010000": "坤",
    "100100": "震", "100101": "震", "100111": "震", "100011": "震", "101011": "震", "111011": "震", "110011": "震", "110100": "震",
    "011011": "巽", "011010": "巽", "011000": "巽", "011100": "巽", "010100": "巽", "000100": "巽", "001100": "巽", "001011": "巽", "100001": "巽",
    "010010": "坎", "010011": "坎", "010001": "坎", "010101": "坎", "011101": "坎", "001101": "坎", "000101": "坎", "000010": "坎",
    "101101": "離", "101100": "離", "101110": "離", "101010": "離", "100010": "離", "110010": "離", "111010": "離", "111101": "離",
    "001001": "艮", "001000": "艮", "001010": "艮", "001110": "艮", "000110": "艮", "100110": "艮", "101110": "艮", "101001": "艮",
    "110110": "兌", "110111": "兌", "110101": "兌", "110001": "兌", "111001": "兌", "011001": "兌", "010001": "兌", "010110": "兌", "011110": "震"
}

# --- 2. 輔助運算邏輯 ---

def get_relative(palace_wx, line_wx):
    """計算六親關係"""
    # 循環順序：水 -> 木 -> 火 -> 土 -> 金 -> 水
    order = ["水", "木", "火", "土", "金"]
    p_idx = order.index(palace_wx)
    l_idx = order.index(line_wx)
    diff = (l_idx - p_idx) % 5
    # 0:同我(兄弟), 1:我生(子孫), 2:我剋(妻財), 3:剋我(官鬼), 4:生我(父母)
    rel_map = {0: "兄弟", 1: "子孫", 2: "妻財", 3: "官鬼", 4: "父母"}
    return rel_map[diff]

def get_trigram_name(bin_3):
    """二進位轉八卦名"""
    mapping = {"111":"乾", "000":"坤", "100":"震", "010":"坎", "001":"艮", "110":"巽", "101":"離", "011":"兌"}
    return mapping.get(bin_3)

# --- 3. 執行主腳本 ---

def run_append_najia():
    # ⚠️ 請確保資料夾名稱與你的路徑一致
    FOLDER_PATH = "yi_data_enhanced" 
    
    if not os.path.exists(FOLDER_PATH):
        print(f"❌ 找不到資料夾: {FOLDER_PATH}")
        return

    files = [f for f in os.listdir(FOLDER_PATH) if f.endswith('.json')]
    print(f"🚀 開始為 {len(files)} 個檔案注入納甲與六親資訊...")

    success_count = 0
    for filename in files:
        path = os.path.join(FOLDER_PATH, filename)
        
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            binary = data.get('binary')
            if not binary:
                print(f"⚠️ {filename} 缺少 binary 欄位，跳過。")
                continue

            # 1. 判定宮位與五行
            palace_name = HEX_PALACE_MAP.get(binary)
            if not palace_name:
                print(f"⚠️ {filename} 的二進位 {binary} 無法匹配宮位。")
                continue
            
            p_wx = PALACE_WUXING[palace_name]

            # 2. 判定納甲地支
            # 易經由下往上，binary[3:] 是內卦, binary[:3] 是外卦
            upper_name = get_trigram_name(binary[:3])
            lower_name = get_trigram_name(binary[3:])
            
            lower_dz_list = NAJIA_MAP[lower_name][0] # 內卦三爻
            upper_dz_list = NAJIA_MAP[upper_name][1] # 外卦三爻
            all_dz = lower_dz_list + upper_dz_list

            # 3. 計算每一爻的詳細資訊
            lines_data = []
            for i, dz in enumerate(all_dz):
                wx = DIZHI_WUXING[dz]
                relative = get_relative(p_wx, wx)
                lines_data.append({
                    "line_number": i + 1,
                    "dizhi": dz,
                    "wuxing": wx,
                    "relative": relative
                })

            # 4. 寫入 JSON
            data["najia_analysis"] = {
                "palace": palace_name,
                "palace_wuxing": p_wx,
                "lines": lines_data
            }

            with open(path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            
            success_count += 1
            if success_count % 10 == 0:
                print(f"已處理 {success_count} 個...")

        except Exception as e:
            print(f"❌ 處理 {filename} 時出錯: {e}")

    print(f"\n✅ 任務完成！共成功更新 {success_count} 個檔案。")
    print(f"📂 存檔路徑: {os.path.abspath(FOLDER_PATH)}")

if __name__ == "__main__":
    run_append_najia()