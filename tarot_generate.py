import google.generativeai as genai
import json
import time
import re
import os
from dotenv import load_dotenv

# 1. Configure AI
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("❌ Missing GOOGLE_API_KEY in .env file.")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

# 2. Output Folder
OUTPUT_FOLDER = "public/tarot_data"
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)
    print(f"📁 Created directory: {OUTPUT_FOLDER}")

# 3. Tarot Card List (78 Cards)
tarot_list = [
    # Major Arcana
    {"id": "00", "name": "The Fool", "arcana": "Major"},
    {"id": "01", "name": "The Magician", "arcana": "Major"},
    {"id": "02", "name": "The High Priestess", "arcana": "Major"},
    {"id": "03", "name": "The Empress", "arcana": "Major"},
    {"id": "04", "name": "The Emperor", "arcana": "Major"},
    {"id": "05", "name": "The Hierophant", "arcana": "Major"},
    {"id": "06", "name": "The Lovers", "arcana": "Major"},
    {"id": "07", "name": "The Chariot", "arcana": "Major"},
    {"id": "08", "name": "Strength", "arcana": "Major"},
    {"id": "09", "name": "The Hermit", "arcana": "Major"},
    {"id": "10", "name": "Wheel of Fortune", "arcana": "Major"},
    {"id": "11", "name": "Justice", "arcana": "Major"},
    {"id": "12", "name": "The Hanged Man", "arcana": "Major"},
    {"id": "13", "name": "Death", "arcana": "Major"},
    {"id": "14", "name": "Temperance", "arcana": "Major"},
    {"id": "15", "name": "The Devil", "arcana": "Major"},
    {"id": "16", "name": "The Tower", "arcana": "Major"},
    {"id": "17", "name": "The Star", "arcana": "Major"},
    {"id": "18", "name": "The Moon", "arcana": "Major"},
    {"id": "19", "name": "The Sun", "arcana": "Major"},
    {"id": "20", "name": "Judgement", "arcana": "Major"},
    {"id": "21", "name": "The World", "arcana": "Major"},
    
    # Wands (Action, Fire)
    *[{"id": f"wands_{i:02d}", "name": f"{n} of Wands", "arcana": "Minor", "suit": "Wands"} for i, n in enumerate(["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"], 1)],
    
    # Cups (Emotion, Water)
    *[{"id": f"cups_{i:02d}", "name": f"{n} of Cups", "arcana": "Minor", "suit": "Cups"} for i, n in enumerate(["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"], 1)],
    
    # Swords (Intellect, Air)
    *[{"id": f"swords_{i:02d}", "name": f"{n} of Swords", "arcana": "Minor", "suit": "Swords"} for i, n in enumerate(["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"], 1)],
    
    # Pentacles (Material, Earth)
    *[{"id": f"pentacles_{i:02d}", "name": f"{n} of Pentacles", "arcana": "Minor", "suit": "Pentacles"} for i, n in enumerate(["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"], 1)],
]

# 4. Prompt Template
PROMPT_TEMPLATE = """
You are a Tarot Grandmaster and Sage. Generate a detailed analysis for the card: "{name}" ({arcana} Arcana).
Please provide the content in Traditional Chinese (繁體中文) following this JSON structure:

{{
    "id": "{id}",
    "name_en": "{name}",
    "name_zh": "中文名稱",
    "arcana": "{arcana}",
    "suit": "Suit Name if any",
    "element": "對應元素 (火/水/風/土)",
    "astrology": "對應星座或行星",
    "summary": "一句話揭示此牌的核心靈魂。",
    "meanings": {{
        "upright": ["關鍵字1", "關鍵字2", "關鍵字3"],
        "reversed": ["反向關鍵字1", "反向關鍵字2", "反向關鍵字3"]
    }},
    "deep_interpretation": "對此牌圖像學與神祕學意義的深入淺出解說。",
    "llm_analysis": {{
        "general_upright": "正位綜合解析。",
        "general_reversed": "逆位綜合解析。",
        "career": "職場建議。",
        "love": "感情建議。",
        "finance": "財務建議。"
    }},
    "advice": "導師寫給學生的智慧贈言。",
    "visual_vibe": "描述一種神祕且優美的視覺氛圍，配合黑色背景與紫色燈光。"
}}

Respond ONLY with valid JSON. No markdown blocks.
"""

def clean_json_text(text):
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```', '', text)
    return text.strip()

def generate_tarot_db():
    print(f"🔮 Starting Tarot Alchemy for {len(tarot_list)} cards...")
    
    for card in tarot_list:
        file_path = os.path.join(OUTPUT_FOLDER, f"card_{card['id']}.json")
        
        if os.path.exists(file_path):
            print(f"⏩ Card {card['id']} already exists, skipping.")
            continue

        print(f"✨ Interpreting {card['name']}...")
        retry_count = 0
        while retry_count < 3:
            try:
                prompt = PROMPT_TEMPLATE.format(**card)
                response = model.generate_content(prompt)
                
                clean_data = json.loads(clean_json_text(response.text))
                
                # Ensure basic fields match
                clean_data["id"] = card["id"]
                clean_data["name_en"] = card["name"]
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(clean_data, f, ensure_ascii=False, indent=4)
                
                print(f"💾 Saved: {file_path}")
                break 
                
            except Exception as e:
                print(f"⚠️ Error for {card['id']}, retrying... ({e})")
                retry_count += 1
                time.sleep(5)
        
        time.sleep(2) # Avoid rate limits

    print(f"\n✅ Mission Accomplished! All tarot data saved in '{OUTPUT_FOLDER}'.")

if __name__ == "__main__":
    generate_tarot_db()
