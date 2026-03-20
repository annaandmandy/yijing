import google.generativeai as genai
import json
import time
import re
import os
from dotenv import load_dotenv

# 1. 配置 API Key
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("❌ 找不到 GOOGLE_API_KEY，請在 .env 檔案中設定。")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

# 2. 建立存檔資料夾
OUTPUT_FOLDER = "yi_data_library"
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)
    print(f"📁 已建立資料夾：{OUTPUT_FOLDER}")

# 2. 完整的 64 卦基礎資料表
yi_list = [
    {"id": 1, "name": "乾", "binary": "111111"}, {"id": 2, "name": "坤", "binary": "000000"},
    {"id": 3, "name": "屯", "binary": "100010"}, {"id": 4, "name": "蒙", "binary": "010001"},
    {"id": 5, "name": "需", "binary": "111010"}, {"id": 6, "name": "訟", "binary": "010111"},
    {"id": 7, "name": "師", "binary": "010000"}, {"id": 8, "name": "比", "binary": "000010"},
    {"id": 9, "name": "小畜", "binary": "111011"}, {"id": 10, "name": "履", "binary": "110111"},
    {"id": 11, "name": "泰", "binary": "111000"}, {"id": 12, "name": "否", "binary": "000111"},
    {"id": 13, "name": "同人", "binary": "101111"}, {"id": 14, "name": "大有", "binary": "111101"},
    {"id": 15, "name": "謙", "binary": "000100"}, {"id": 16, "name": "豫", "binary": "001000"},
    {"id": 17, "name": "隨", "binary": "100110"}, {"id": 18, "name": "蠱", "binary": "011001"},
    {"id": 19, "name": "臨", "binary": "110000"}, {"id": 20, "name": "觀", "binary": "000011"},
    {"id": 21, "name": "噬嗑", "binary": "100101"}, {"id": 22, "name": "賁", "binary": "101001"},
    {"id": 23, "name": "剝", "binary": "000001"}, {"id": 24, "name": "復", "binary": "100000"},
    {"id": 25, "name": "無妄", "binary": "100111"}, {"id": 26, "name": "大畜", "binary": "111001"},
    {"id": 27, "name": "頤", "binary": "100001"}, {"id": 28, "name": "大過", "binary": "011110"},
    {"id": 29, "name": "坎", "binary": "010010"}, {"id": 30, "name": "離", "binary": "101101"},
    {"id": 31, "name": "咸", "binary": "001110"}, {"id": 32, "name": "恆", "binary": "011100"},
    {"id": 33, "name": "遁", "binary": "001111"}, {"id": 34, "name": "大壯", "binary": "111100"},
    {"id": 35, "name": "晉", "binary": "000101"}, {"id": 36, "name": "明夷", "binary": "101000"},
    {"id": 37, "name": "家人", "binary": "101011"}, {"id": 38, "name": "睽", "binary": "110101"},
    {"id": 39, "name": "蹇", "binary": "001010"}, {"id": 40, "name": "解", "binary": "010100"},
    {"id": 41, "name": "損", "binary": "110001"}, {"id": 42, "name": "益", "binary": "100011"},
    {"id": 43, "name": "夬", "binary": "111110"}, {"id": 44, "name": "姤", "binary": "011111"},
    {"id": 45, "name": "萃", "binary": "000110"}, {"id": 46, "name": "升", "binary": "011000"},
    {"id": 47, "name": "困", "binary": "010110"}, {"id": 48, "name": "井", "binary": "011010"},
    {"id": 49, "name": "革", "binary": "101110"}, {"id": 50, "name": "鼎", "binary": "011101"},
    {"id": 51, "name": "震", "binary": "100100"}, {"id": 52, "name": "艮", "binary": "001001"},
    {"id": 53, "name": "漸", "binary": "001011"}, {"id": 54, "name": "歸妹", "binary": "110100"},
    {"id": 55, "name": "豐", "binary": "101100"}, {"id": 56, "name": "旅", "binary": "001101"},
    {"id": 57, "name": "巽", "binary": "011011"}, {"id": 58, "name": "兌", "binary": "110110"},
    {"id": 59, "name": "渙", "binary": "010011"}, {"id": 60, "name": "節", "binary": "110010"},
    {"id": 61, "name": "中孚", "binary": "110011"}, {"id": 62, "name": "小過", "binary": "001100"},
    {"id": 63, "name": "既濟", "binary": "101010"}, {"id": 64, "name": "未濟", "binary": "010101"}
]

# 3. 定義教學型 Prompt
PROMPT_TEMPLATE = """
你是一位精通《易經》的導師。請針對第 {id} 卦：{name} 卦（卦象：{binary}），生成以下 JSON 內容：
1. "summary": 用一句話概括此卦的現代哲學。
2. "original_classic": {{
    "hexagram_text": "原始卦辭全文。",
    "tuan_zhuan": "彖傳核心原文（解卦靈魂）。"
}}
3. "logic_teaching": "解釋此卦結構（如：內卦與外卦的組合）如何推導出其含義，這部分請針對學習解卦逻辑撰寫。"
4. "ancient_story": {{
    "title": "對應的經典歷史典故名稱。",
    "content": "詳細且生動的白話故事敘述。"
}}
5. "llm_analysis": {{
    "general": "整體的白話解析。",
    "career": "職場建議（進、退、守、攻）。",
    "love": "感情與人際建議。",
    "finance": "財務風險與建議。"
}}
6. "visual_vibe": "描述一個適合此卦的新中式視覺場景，供 UI 設計參考。"
7. "tags": ["關鍵字1", "關鍵字2", "關鍵字3"]

請僅回傳標準 JSON 格式，不要包含 Markdown 代碼塊標記或額外文字。
"""

def clean_json_text(text):
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```', '', text)
    return text.strip()

def build_individual_database():
    print("🚀 啟動易經 64 卦數據煉金術（逐一存檔模式）...")
    
    for hexagram in yi_list:
        file_path = os.path.join(OUTPUT_FOLDER, f"hexagram_{hexagram['id']}.json")
        
        # 檢查是否已經存在（斷點續傳功能）
        if os.path.exists(file_path):
            print(f"⏩ 第 {hexagram['id']} 卦已存在，跳過。")
            continue

        print(f"正在分析 第 {hexagram['id']} 卦：{hexagram['name']}...")
        retry_count = 0
        while retry_count < 3:
            try:
                prompt = PROMPT_TEMPLATE.format(**hexagram)
                response = model.generate_content(prompt)
                
                clean_data = json.loads(clean_json_text(response.text))
                
                # 確保基礎資訊
                clean_data["id"] = hexagram["id"]
                clean_data["binary"] = hexagram["binary"]
                clean_data["name"] = hexagram["name"]
                
                # *** 關鍵修改：每生成一個就存一個檔案 ***
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(clean_data, f, ensure_ascii=False, indent=4)
                
                print(f"💾 已存檔：{file_path}")
                break 
                
            except Exception as e:
                print(f"⚠️ 第 {hexagram['id']} 卦失敗，重試中... ({e})")
                retry_count += 1
                time.sleep(5)
        
        # 建議間隔 2-3 秒，Gemini Flash 有免費額度頻率限制
        time.sleep(3) 

    print(f"\n✅ 任務完成！所有資料已保存在 '{OUTPUT_FOLDER}' 資料夾中。")

if __name__ == "__main__":
    build_individual_database()