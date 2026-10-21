import os
import json
import asyncio
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Use the API key provided
api_key = os.getenv("VITE_GOOGLE_API_KEY") or os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash")

OUTPUT_DIR = "./public/tarot_data/study"
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def generate_markdown(topic, prompt, filename):
    print(f"Generating content for: {topic}...")
    try:
        response = model.generate_content(
            f"你是一位精通西方神祕學與塔羅牌的學者。請以繁體中文撰寫一份關於「{topic}」的學習指南，格式為 Markdown。\n"
            f"要求：\n{prompt}\n"
            f"不要有開場白，直接輸出 Markdown 內容。"
        )
        content = response.text
        
        with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Saved {topic} to {filename}")
    except Exception as e:
        print(f"Error generating {topic}: {e}")

async def main():
    tasks = [
        generate_markdown(
            "四大元素 (Four Elements)",
            "請詳細解釋西方神祕學中的四大元素（火、水、風、土）。\n"
            "包含它們的核心特徵、對應的塔羅牌花色（權杖、聖杯、寶劍、金幣）、星座對應（如火象牡羊等），以及它們在占卜或性格上的象徵意義。",
            "four_elements.md"
        ),
        generate_markdown(
            "塔羅與占星對應 (Astrology Correspondences)",
            "介紹塔羅大阿爾克那（Major Arcana）與星座、行星的對應關係（例如：皇帝-白羊座，女祭司-月亮）。\n"
            "請用清晰的表格 (Markdown table) 列出 22 張大牌的對應，並簡短說明為甚麼有這樣的對應（例如占星學派的金色黎明協會設定）。\n"
            "同時提供小阿爾克那與十二星座的對照概覽。",
            "astrology_correspondences.md"
        ),
        generate_markdown(
            "神祕學入門與塔羅自學指南",
            "撰寫給初學者的神祕學與塔羅自學導航。\n"
            "涵蓋：\n"
            "1. 塔羅牌的起源與演變（簡短版）。\n"
            "2. 榮格心理學與塔羅原型的連結。\n"
            "3. 如何培養直覺與解牌的正確心態。\n"
            "4. 常見的牌陣介紹（如三牌陣、塞爾特十字）。",
            "mysticism_intro.md"
        )
    ]
    
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(main())
