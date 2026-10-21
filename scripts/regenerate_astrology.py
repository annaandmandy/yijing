import os
import asyncio
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("VITE_GOOGLE_API_KEY") or os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash")

OUTPUT_DIR = "./public/tarot_data/study"
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def generate_markdown():
    topic = "塔羅與占星對應 (Astrology Correspondences)"
    print(f"Generating content for: {topic} - Part 1 (Major Arcana)...")
    try:
        response_major = model.generate_content(
            f"你是一位精通西方神祕學與塔羅牌的學者。請以繁體中文撰寫一份關於「{topic}」的學習指南。\n"
            f"這是第一部分，要求：\n"
            f"介紹塔羅大阿爾克那（Major Arcana）與星座、行星的對應關係。\n"
            f"請用簡單緊湊的 Markdown 表格列出 22 張大牌的對應，並簡短說明為什麼有這樣的對應（例如黃金黎明協會設定）。\n"
            f"極度重要：不要在表格中使用大量的空格來對齊欄位，保持緊湊格式即可，以免超出字數限制！例如 `|牌名|行星|說明|` 即可。\n"
            f"直接輸出 Markdown 內容，不要有開場白或結束語、不要使用 ```markdown 包裝。"
        )
        content_major = response_major.text.replace("```markdown", "").replace("```", "")
        
        print(f"Generating content for: {topic} - Part 2 (Minor Arcana)...")
        response_minor = model.generate_content(
            f"你是一位精通西方神祕學與塔羅牌的學者。請以繁體中文撰寫關於「塔羅小阿爾克那與占星對應」的概覽。\n"
            f"這是第二部分，要求：\n"
            f"介紹小阿爾克那（Minor Arcana）四元素與四個星座特質（火水風土）的對應，以及宮廷牌的占星對照。\n"
            f"如果使用表格，極度重要：不要在表格中使用大量的空格來對齊欄位，保持緊湊格式即可！\n"
            f"直接輸出 Markdown 內容，不要有開場白或結束語、不要使用 ```markdown 包裝。"
        )
        content_minor = response_minor.text.replace("```markdown", "").replace("```", "")
        
        final_content = f"{content_major}\n\n{content_minor}"
        
        filename = "astrology_correspondences.md"
        with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
            f.write(final_content)
        print(f"Saved {topic} to {filename} successfully.")
    except Exception as e:
        print(f"Error generating {topic}: {e}")

if __name__ == "__main__":
    asyncio.run(generate_markdown())
