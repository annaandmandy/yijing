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
   VITE_GOOGLE_API_KEY=您的_GOOGLE_API_KEY
   GOOGLE_API_KEY=您的_GOOGLE_API_KEY
   ```
   *註：`VITE_` 前綴用於前端 Vite 加載，不帶前綴的則是供 Python 腳本使用。*

---

### 3. 如何運行 (Running)

#### **啟動開發伺服器 (Frontend)**
```bash
npm run dev
```
啟動後，開啟瀏覽器並訪問 `http://localhost:3000` 即可進入 3D 抽爻桌面。

#### **如何「泡」數據 (Data Generation)**
如果您需要重新生成 64 卦的 AI 增強數據：
```bash
# 安裝 Python 依賴
pip install google-generativeai python-dotenv

# 執行生成腳本
npm run generate
# 或者直接執行：python3 yijing_generate.py
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
詳情請參閱：[部署指南 (Deployment Guide)](file:///home/annaandmandy/.gemini/antigravity/brain/e58cbc9b-4cf6-40f7-b998-99303baccee5/deployment_guide.md)

---

## 📂 專案結構
- `src/`: 前端原始碼 (Engine, Services, Styles)。
- `docs/`: 專案設計文件與上下文 (`CONTEXT.md`)。
- `yi_data_library/`: 儲存 64 卦基礎 JSON。
- `yi_data_enhanced/`: 儲存 AI 增強後的深度解析數據。

*祝您在易經的世界中找到屬於您的靈感。* ☯
