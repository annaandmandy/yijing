# I-Ching Lab

Immersive I Ching (and tarot) divination app: 3D coin casting, Najia / plum-blossom analysis, and an AI mentor chat. UI text is Traditional Chinese.

## Run

Frontend (Vite, http://localhost:3000):
```bash
npm install
npm run dev        # npm run build -> dist/, npm run preview, npm test
```

Backend (FastAPI AI proxy, http://localhost:8000):
```bash
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python server.py   # or: uvicorn server:app --reload --port 8000
```
Needs `GOOGLE_API_KEY` in `.env` (root). Frontend finds the backend through `VITE_BACKEND_URL` (default `http://localhost:8000`). `ALLOWED_ORIGINS` (comma-separated, default `*`) controls CORS.

Data generation (Gemini, needs the same key): `npm run generate` → `scripts/yijing_generate.py`.

## Architecture

Vanilla JS ES modules, no framework. Entry point: `index.html` → `src/app.js`.

- `src/app.js` — the single App class: all views, modals, rendering and event wiring (~3000 lines). Views are `<section class="view">` in `index.html`: `tabletop`, `tarot`, `library`, `history`, `ai-mentor`, `settings`.
- `src/engine/`
  - `HexagramEngine.js` — line values, changing lines, binary ↔ hexagram mapping.
  - `CastingManager.js` — Three.js scene + cannon-es physics for the coin toss.
  - `PlumBlossomEngine.js` — 梅花易數 casting and 體/用 analysis.
  - `TarotEngine.js` — tarot draws.
- `src/services/`
  - `ManifestService.js` — fetches `/yi_data_enhanced/hexagram_{1..64}.json`.
  - `TarotService.js` — fetches `/tarot_data/card_XX.json`.
  - `AIService.js` — streams plain-text responses from backend `POST /chat` (`{messages, system_instruction}`).
  - `JournalService.js`, `SettingsService.js` — localStorage persistence.
  - `TimeService.js` — 天干地支 (GanZhi) for the cast date.
- `src/constants.js` — hexagram elements, phonetics, element colors.
- `src/styles/main.css` — all styles; "Mystic Dark" glassmorphism, gold accent `#d4af37`.
- Chart.js (journal radar chart), marked, and Font Awesome load from CDN `<script>`/`<link>` tags in `index.html`, not npm.

Backend: `server.py` — FastAPI, one `POST /chat` route that streams Gemini `gemini-2.5-flash`. API key stays server-side.

Static data (served from `public/`):
- `yi_data_enhanced/` — 64 hexagram JSONs (classical texts, Najia, AI interpretations). Primary data.
- `yi_data_library/` — Markdown theory articles for the Learn page.
- `tarot_data/`, `tarot/`, `assets/` — tarot JSON, card images, coin textures.

`scripts/` — offline Python generators and checkers for the data above; `scripts/archive/` holds one-off fixes that have already run.

## Coding Standards
- Don't add npm dependencies without asking first.
- Never hand-edit `public/yi_data_enhanced/`, `public/yi_data_library/` or `public/tarot_data/`; change the generator in `scripts/` and regenerate.
- Keep `GOOGLE_API_KEY` server-side (`server.py`, `scripts/`); never expose it via a `VITE_*` variable or frontend code.
- Run `npm run build` and confirm it succeeds before saying a change is done.
- Every domain expected value in a test (GanZhi, solar terms, hexagrams, Six Spirits, five-element strength, classical text) needs a source comment naming the outside reference it came from (e.g. `// source: HKO 2024 農曆對照表`), not our own code's output. Run `domain-checker` on diffs that add or change such values.
- Before presenting a plan, run the `plan-reviewer` agent (issue number + plan text only), revise, at most two rounds, and append a Review log to the plan.

## Deploy
Frontend → Vercel (`vercel.json`, SPA rewrite). Backend → Railway (`Procfile`: gunicorn + uvicorn workers on `$PORT`).
