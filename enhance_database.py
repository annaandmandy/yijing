import google.generativeai as genai
import json
import time
import os
import re
from dotenv import load_dotenv

# 1. Config
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("❌ Missing GOOGLE_API_KEY in .env")

genai.configure(api_key=GOOGLE_API_KEY)
# We use the version specified by the user
model = genai.GenerativeModel('gemini-2.5-flash')

DATA_FOLDER = "yi_data_enhanced"

# 2. Prompt Template for Enhancement
ENHANCE_PROMPT = """
你是一位精通《易經》與「六爻」術數的專業導師。
目前正在對數據庫進行升級。請針對第 {id} 卦：{name} 卦，提供缺失的資料。

現有資料摘要：
- 卦辭：{original_text}
- 結構邏輯：{interaction_logic}

請生成以下 JSON 內容（補全缺失部分）：
1. "logic_teaching": "深入淺出地解釋此卦的組成結構與其核心含義的邏輯推導（約 200-300 字）。"
2. "line_details": [
    {{
        "line": 1,
        "classic_text": "初爻的原始爻辭",
        "modern_interpretation": "白話解析與對現代生活的啟發"
    }},
    ...（以此類推，直到第 6 爻）
]

請僅回傳標準 JSON 格式，不要包含 Markdown 代碼塊標記。
"""

def clean_json_text(text):
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```', '', text)
    return text.strip()

def enhance_files():
    print(f"🚀 Starting database enhancement in '{DATA_FOLDER}'...")
    
    files = [f for f in os.listdir(DATA_FOLDER) if f.endswith('.json') and f.startswith('hexagram_')]
    files.sort(key=lambda x: int(re.search(r'\d+', x).group()))

    for filename in files:
        file_path = os.path.join(DATA_FOLDER, filename)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Check if enhancement is needed
        needs_logic = not data.get("logic_teaching") or data.get("logic_teaching") == "術數推演中..."
        needs_lines = "line_details" not in data

        if not needs_logic and not needs_lines:
            print(f"✅ {filename} looks already enhanced. Skipping.")
            continue

        print(f"🛠 Enhancing {filename} (Logic: {needs_logic}, Lines: {needs_lines})...")
        
        prompt = ENHANCE_PROMPT.format(
            id=data.get("id", "??"),
            name=data.get("name", "??"),
            original_text=data.get("original_classic", {}).get("hexagram_text", "無"),
            interaction_logic=data.get("structure", {}).get("interaction_logic", "無")
        )

        retry = 0
        while retry < 3:
            try:
                response = model.generate_content(prompt)
                enhanced_part = json.loads(clean_json_text(response.text))
                
                # Merge data
                if needs_logic:
                    data["logic_teaching"] = enhanced_part.get("logic_teaching")
                if needs_lines:
                    data["line_details"] = enhanced_part.get("line_details")

                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)
                
                print(f"✨ {filename} updated.")
                break
            except Exception as e:
                print(f"⚠️ Error on {filename}: {e}. Retrying...")
                retry += 1
                time.sleep(5)
        
        # Rate limit safety
        time.sleep(2)

if __name__ == "__main__":
    enhance_files()
