import os
import json
import google.generativeai as genai
import time
import re
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')

TRIGRAMS = {
    "111": "乾 (天)", "000": "坤 (地)",
    "010": "坎 (水)", "101": "離 (火)",
    "100": "震 (雷)", "001": "艮 (山)",
    "011": "巽 (風)", "110": "兌 (澤)"
}

# Standardized Trigram Attributes for UI/Prompt consistency
ATTRS = {
    "乾 (天)": "天、剛健、君王、首、父親。",
    "坤 (地)": "地、柔順、承載、眾多、母親。",
    "坎 (水)": "水、險難、深陷、陷阱、次男。",
    "離 (火)": "火、明亮、依附、文化、中女。",
    "震 (雷)": "雷、動盪、生機、發動、長男。",
    "艮 (山)": "山、止步、穩固、沉靜、少男。",
    "巽 (風)": "風、木、滲透、進入、長女。",
    "兌 (澤)": "澤、平民、喜悅、和解、少女。"
}

def get_trigrams(binary):
    # binary is bottom-to-top [L1, L2, L3, L4, L5, L6]
    lower_bin = binary[0:3]
    upper_bin = binary[3:6]
    return TRIGRAMS.get(lower_bin), TRIGRAMS.get(upper_bin)

FIX_PROMPT = """
你是一款高階《易經》修復機器人。
請根據以下正確的結構邏輯，撰寫一段專業的「logic_teaching」文字。

卦名：{name}
二進位（初爻到上爻）：{binary}
【正確結構】：
- 下卦（內）：{lower}
- 上卦（外）：{upper}

請生成 JSON：
{{
  "logic_teaching": "請詳細解釋「{upper}在{lower}之上」的象徵意涵，以及內外卦互動如何推導出此卦的核心哲學。避免反轉上下卦。中文需專業且平易近人（約 200 字）。"
}}
"""

def clean_json_text(text):
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```', '', text)
    return text.strip()

def run_fix(folder):
    print(f"🚀 Fixing folder: {folder}")
    if not os.path.exists(folder): return

    files = [f for f in os.listdir(folder) if f.endswith('.json')]
    for filename in files:
        path = os.path.join(folder, filename)
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        binary = data.get("binary")
        name = data.get("name")
        lower, upper = get_trigrams(binary)

        print(f"🔧 Processing {name} ({binary}) Lower={lower}, Upper={upper}")

        # 1. Surgical Fix for structure attributes
        if "structure" in data:
            data["structure"]["upper_trigram_attr"] = f"{upper}: {ATTRS.get(upper)}"
            data["structure"]["lower_trigram_attr"] = f"{lower}: {ATTRS.get(lower)}"
            # Trigger regen for logic_teaching later
        
        # 2. Regen logic_teaching to ensure it reflects the CORRECT trigrams
        try:
            prompt = FIX_PROMPT.format(name=name, binary=binary, lower=lower, upper=upper)
            response = model.generate_content(prompt)
            new_logic = json.loads(clean_json_text(response.text)).get("logic_teaching")
            data["logic_teaching"] = new_logic
            
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            print(f"✅ {filename} fixed.")
            time.sleep(1) # Flash safety
        except Exception as e:
            print(f"❌ Failed to fix {filename}: {e}")

if __name__ == "__main__":
    # We only fix enhanced folder for now as it contains the structure object and most complex text
    run_fix("public/yi_data_enhanced")
    # Also sync logic_teaching back to library if needed
    run_fix("public/yi_data_library")
