# I-Ching Lab | 沉浸式 3D 抽爻與術數分析 ☯

**I-Ching Lab** 是一個結合了 3D 物理模擬、六爻納甲術數分析與 AI 語言模型的現代易經實驗室。它能讓使用者在數位環境中體驗傳統的抽爻過程，並提供專業的術數解讀。

---

## 網站:
https://yijing-ebon.vercel.app/

## 🚀 快速開始

請按照以下步驟來「泡」這個專案：

### 1. 前置準備 (Prerequisites)
確保您的電腦已安裝：
- [Node.js](https://nodejs.org/) (建議 v18 以上)
- [npm](https://www.npmjs.com/)
- [Python 3](https://www.python.org/) (用於數據生成與分析)

---

### 2. 安裝步驟 (Installation)

1. **複製專案：**
   ```bash
   git clone <專案 URL>
   cd yijing
   ```

2. **安裝前端依賴：**
   此專案使用 Vite 作為建構工具。
   ```bash
   npm install
   ```

3. **配置環境變數 (API Key)：**
   在根目錄下建立一個 `.env` 檔案，並填入您的 Gemini API Key：
   ```env
   GOOGLE_API_KEY=您的_GOOGLE_API_KEY
   ```
   *註：API Key 只由後端 (`server.py`) 與 `scripts/` 中的 Python 數據腳本讀取，前端不會接觸到金鑰。前端透過 `VITE_BACKEND_URL` 連接後端（預設為 `http://localhost:8000`）。*

---

### 3. 如何運行 (Running)

#### **啟動開發伺服器 (Frontend)**
```bash
npm run dev
```
啟動後，開啟瀏覽器並訪問 `http://localhost:3000` 即可進入 3D 抽爻桌面。

#### **啟動 AI 後端 (Backend)**
AI 導師對話需要後端伺服器（FastAPI），請另開一個終端機執行：
```bash
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python server.py
# 或者：uvicorn server:app --reload --port 8000
```
後端預設運行於 `http://localhost:8000`，並從 `.env` 讀取 `GOOGLE_API_KEY`。若後端位於其他網址，請在前端設定 `VITE_BACKEND_URL`。

#### **如何「泡」數據 (Data Generation)**
如果您需要重新生成 64 卦的 AI 增強數據：
```bash
# 安裝 Python 依賴
pip install google-generativeai python-dotenv

# 執行生成腳本
npm run generate
# 或者直接執行：python3 scripts/yijing_generate.py
```

---

## 🛠 功能亮點
- **3D 物理抽爻**：使用 Three.js 與 Cannon.js 實現的真實硬幣投擲。
- **納甲深度分析**：整合宮位、五行、六親等專業預測邏輯。
- **AI 導師對話**：即時分析卦象並給予現代化的白話建議。
- **每日能量分析**：透過 Chart.js 將您的抽爻歷史可視化。

---

## 🌐 部署至雲端 (Deployment)

本專案支援快速部署至 **Railway (後端)** 與 **Vercel (前端)**。

---

## 📂 專案結構
- `src/`: 前端原始碼 (Engine, Services, Styles)。
- `CLAUDE.md`: 架構說明與開發指令（前端、後端）。
- `server.py`: FastAPI 後端，代理 Gemini AI 導師對話 (`POST /chat`)。
- `scripts/`: 數據生成與增強用的 Python 腳本。
- `scripts/archive/`: 已執行過的一次性數據修正腳本。
- `public/yi_data_enhanced/`: 64 卦 JSON 數據（經文、納甲、AI 增強解析），前端主要數據來源。
- `public/yi_data_library/`: 「自學與導航」頁面的 Markdown 理論文章。
- `public/tarot_data/`, `public/tarot/`: 塔羅牌 JSON 數據與牌面圖片。

*祝您在易經的世界中找到屬於您的靈感。* ☯
