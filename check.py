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
# 建議使用 pro 模型進行邏輯校對，效果最佳
model = genai.GenerativeModel('gemini-2.5-flash') 

# 2. 設定路徑
INPUT_FOLDER = "yi_data_library"
OUTPUT_FOLDER = "yi_data_enhanced"
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)

# 3. 終極增強版 Prompt (包含結構化拆解與底層邏輯)
REVIEW_PROMPT = """
你是一位精通《易經》、認知心理學與數據邏輯的首席校對官。請審閱並增強以下 JSON 內容，目標是建立一套具備「教育深度」與「趣味性」的學習資料庫：

1. **核對古文**：確保卦辭、彖傳文字準確，並標註正確的斷句。
2. **結構化拆解 (Foundation)**：新增 "structure" 欄位：
   - "upper_trigram_attr": 上卦的自然屬性與性格（如：坎/水/險陷）。
   - "lower_trigram_attr": 下卦的自然屬性與性格（如：震/雷/動）。
   - "interaction_logic": 描述這兩者結合的物理動態感，並解釋為何產生此卦義。
3. **類象記憶 (Visual Memory)**：新增 "archetypes" 欄位，列出 3 個此卦代表的具體圖像或符號（如：老馬、枯木、金鼎）。
4. **辯證思考 (Balance)**：新增 "shadow_side" 欄位，描述如果過度沈溺於此卦的能量，會產生什麼負面風險。
5. **互動內容 (Add-on)**：
   - "memory_hacks": 提供 3 個圖像化的記憶口訣或小撇步。
   - "quick_check": 提供一個具體情境的「是非題」或「選擇題」，並附帶解析，測試用戶是否掌握核心。
6. **語氣優化**：讓「白話故事」更具渲染力，並在「現代解析」中加入 1 個心理學或管理學概念（如：過度補償、邊際效應）。

請嚴格回傳修正後的完整 JSON 格式，確保 Key 名稱與結構統一，不要包含 Markdown 標記（如 ```json）。

待審核內容：
{json_content}
"""

def clean_json_text(text):
    """清理 AI 回傳的雜訊"""
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```', '', text)
    return text.strip()

def run_enhancement():
    print("🧠 啟動易經知識庫增強工程...")
    
    # 取得所有原始 JSON 並排序
    if not os.path.exists(INPUT_FOLDER):
        print(f"❌ 找不到來源資料夾 {INPUT_FOLDER}，請先運行第一個生成腳本。")
        return

    files = [f for f in os.listdir(INPUT_FOLDER) if f.endswith('.json')]
    files.sort(key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0)

    for filename in files:
        input_path = os.path.join(INPUT_FOLDER, filename)
        output_path = os.path.join(OUTPUT_FOLDER, filename)

        # 斷點續傳邏輯
        if os.path.exists(output_path):
            print(f"⏩ {filename} 已存在增強版本，跳過。")
            continue

        print(f"🧐 正在處理增強：{filename}...")

        with open(input_path, 'r', encoding='utf-8') as f:
            original_data = json.load(f)

        retry_count = 0
        while retry_count < 3:
            try:
                # 呼叫 Pro 模型進行深度處理
                response = model.generate_content(
                    REVIEW_PROMPT.format(json_content=json.dumps(original_data, ensure_ascii=False))
                )
                
                enhanced_json_str = clean_json_text(response.text)
                enhanced_data = json.loads(enhanced_json_str)

                # 確保原始 ID 和名稱不丟失
                enhanced_data["id"] = original_data.get("id")
                enhanced_data["name"] = original_data.get("name")
                enhanced_data["binary"] = original_data.get("binary")

                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(enhanced_data, f, ensure_ascii=False, indent=4)
                
                print(f"✨ {filename} 校對並增強完成！")
                break

            except Exception as e:
                print(f"⚠️ {filename} 處理出錯，重試中... ({e})")
                retry_count += 1
                time.sleep(5)
        
        # Pro 模型建議保留較長的間隔 (Rate Limit)
        time.sleep(5)

    print(f"\n🏆 全數增強完畢！資料存放在：'{OUTPUT_FOLDER}'")

if __name__ == "__main__":
    run_enhancement()