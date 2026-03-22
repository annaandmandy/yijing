/**
 * app.js
 * Main entry point for I-Ching Lab.
 */

import { HexagramEngine } from './engine/HexagramEngine.js';
import { ManifestService } from './services/ManifestService.js';
import { JournalService } from './services/JournalService.js';
import { CastingManager } from './engine/CastingManager.js';

import { AIService } from './services/AIService.js';
import { TimeService } from './services/TimeService.js';

import { HEXAGRAM_ELEMENTS, HEXAGRAM_PHONETICS } from './constants.js';

class App {
    constructor() {
        this.library = [];
        this.currentView = 'tabletop';
        this.currentTosses = [];
        this.currentHexData = null;
        this.chart = null; // Radar chart instance
        this.currentRecordId = null;
        this.chatMessages = [];

        // Calendar State
        this.calendarDate = new Date();
        this.calendarMonth = this.calendarDate.getMonth();
        this.calendarYear = this.calendarDate.getFullYear();
        this.radarChart = null;
        this.resultSource = 'tabletop';
        this.librarySubpage = 'grid'; // Sub-view within library

        window.app = this; // Global reference for inline oncilcks
        this.init();
    }

    async init() {
        console.log("Initializing I-Ching Lab...");

        // Load data
        this.library = await ManifestService.loadAllHexagrams();
        console.log(`Loaded ${this.library.length} hexagrams.`);
        if (this.library.length > 0) console.log("Sample Hexagram Data:", this.library[0]);

        this.setupNavigation();
        this.setupCastingManager();
        this.setupEventListeners();
        this.setupCalendarNav();
        this.setupLibraryNav();

        // Initial view render
        this.renderView();

        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        console.log("%c☯ I-Ching Lab ☯", "color: #d4af37; font-size: 20px; font-weight: bold;");
        console.log("歡迎來到易經實驗室。請點擊畫面，開始您的第一卦。");
    }

    setupCastingManager() {
        this.caster = new CastingManager('canvas-container');
        this.caster.onResult = (sum) => this.handleTossResult(sum);
    }

    handleTossResult(sum) {
        this.currentTosses.push(sum);
        console.log(`Toss ${this.currentTosses.length}: Sum = ${sum}`);
        this.renderCastingProgress();

        if (this.currentTosses.length < 6) {
            // Update UI to show progress
            this.updateTossProgress();
            // Allow next toss after a short delay
            setTimeout(() => {
                const instruction = document.querySelector('.instruction');
                instruction.innerText = `第 ${this.currentTosses.length + 1} 次投擲 (已完成 ${this.currentTosses.length}/6)`;
            }, 1000);
        } else {
            this.finishDivination();
        }
    }

    renderCastingProgress() {
        const container = document.getElementById('casting-progress');
        if (!container) return;
        container.innerHTML = '';

        this.currentTosses.forEach(sum => {
            const line = document.createElement('div');
            line.className = 'hex-line ' + this.getLineClass(sum);
            container.appendChild(line);
        });
    }

    getLineClass(sum) {
        if (sum === 9) return 'yang old-yang';
        if (sum === 8) return 'yin';
        if (sum === 7) return 'yang';
        if (sum === 6) return 'yin old-yin';
        return '';
    }

    updateTossProgress() {
        // Simple visual feedback in instruction text
        const instruction = document.querySelector('.instruction');
        instruction.innerText = `計算中...`;
    }

    finishDivination() {
        const result = HexagramEngine.calculateHexagram(this.currentTosses);
        const originalHex = this.library.find(h => h.binary === result.originalBinary);
        const futureHex = result.hasChange ? this.library.find(h => h.binary === result.futureBinary) : null;

        if (!originalHex) {
            console.error("Critical Error: Hexagram data not found in library for binary", result.originalBinary);
            alert("抱歉，卦象資料載入失敗，請重新整理頁面。");
            return;
        }

        // Calculate Advanced Theory for AI Context
        const relations = HexagramEngine.getRelatedHexagrams(result.originalBinary);
        const gZ = TimeService.getGanZhi(new Date());
        const beasts = HexagramEngine.getSixBeasts(gZ.dayStem);
        const strengthMap = TimeService.getWuxingStrength(gZ.monthBranch);

        const advancedTheory = {
            relations: {
                nuclear: this.library.find(h => h.binary === relations.nuclearBinary)?.name,
                inverted: this.library.find(h => h.binary === relations.invertedBinary)?.name,
                opposite: this.library.find(h => h.binary === relations.oppositeBinary)?.name
            },
            beasts: beasts,
            chronoEnergy: {
                ganzhi: `${gZ.day}日 ${gZ.month}月`,
                strength: strengthMap
            }
        };

        // Save to Journal first to get ID for chat session
        const recordId = JournalService.saveRecord({
            question: document.getElementById('user-question')?.value || "隨喜求卦",
            originalId: originalHex.id,
            originalBinary: result.originalBinary,
            originalName: originalHex.name,
            futureId: futureHex?.id,
            futureName: futureHex?.name,
            changingLines: result.changingLines,
            hasChange: result.hasChange,
            advancedTheory: advancedTheory
        });
        this.currentRecordId = recordId;
        this.chatMessages = []; // Reset chat for new session

        this.showResultOverlay(originalHex, futureHex, result, recordId);

        // Proactive: Highlight detail button to encourage AI interaction
        const detailBtn = document.getElementById('ask-mentor-result');
        if (detailBtn) detailBtn.classList.add('pulse-gold');
    }

    getSolarTime() {
        return new Date().toLocaleString('zh-TW', { timeZone: 'America/New_York' }) + " (波士頓真太陽時)";
    }

    showResultOverlay(original, future, meta, recordId = null) {
        this.currentRecordId = recordId || this.currentRecordId;
        // Don't override resultSource if it's already 'history'
        if (this.currentRecordId && !this.resultSource) this.resultSource = 'history';

        const overlay = document.getElementById('result-overlay');
        const nameEl = overlay.querySelector('.hex-name');
        const binaryEl = overlay.querySelector('.binary-display');
        const summaryEl = overlay.querySelector('.hex-summary');
        const origPhonetics = HEXAGRAM_PHONETICS[original.id];
        const origPhoneticStr = origPhonetics ? `
            <div class="result-phonetic-stack">
                <span class="zhuyin">${origPhonetics.bopomofo}</span>
                <span class="pinyin">${origPhonetics.pinyin}</span>
            </div>
        ` : '';

        const futurePhonetics = future ? HEXAGRAM_PHONETICS[future.id] : null;
        const futurePhoneticStr = futurePhonetics ? `
            <div class="result-phonetic-stack">
                <span class="zhuyin">${futurePhonetics.bopomofo}</span>
                <span class="pinyin">${futurePhonetics.pinyin}</span>
            </div>
        ` : '';

        // Advanced Theory Logic
        const relations = HexagramEngine.getRelatedHexagrams(original.binary);
        const nuclearHex = this.library.find(h => h.binary === relations.nuclearBinary);
        const invertedHex = this.library.find(h => h.binary === relations.invertedBinary);

        const gZ = TimeService.getGanZhi(new Date());
        const beasts = HexagramEngine.getSixBeasts(gZ.dayStem);
        const strength = TimeService.getWuxingStrength(gZ.monthBranch);

        // Update Radar Chart if available
        if (this.radarChart) {
            // Future extension: Update chart with line strength
        }

        nameEl.innerHTML = `
            <div class="result-hex-display">
                <div class="hex-block original">
                    <span class="hex-label">本卦 (當前)</span>
                    ${this.renderMiniHexSymbol(original.binary)}
                    <div class="hex-name-wrap">
                        <span class="hex-name-text">${original.name}</span>
                        ${origPhoneticStr}
                    </div>
                </div>
                ${meta.hasChange ? `
                <div class="hex-arrow">→</div>
                <div class="hex-block future">
                    <span class="hex-label">之卦 (演變)</span>
                    ${this.renderMiniHexSymbol(future.binary)}
                    <div class="hex-name-wrap">
                        <span class="hex-name-text">${future.name}</span>
                        ${futurePhoneticStr}
                    </div>
                </div>
                ` : ''}
            </div>
        `;

        binaryEl.innerText = meta.originalBinary;

        if (meta.hasChange) {
            summaryEl.innerHTML = `
                <div class="change-info">
                    <p><strong>現狀：</strong>${original.name}卦 — ${original.summary}</p>
                    <p><strong>趨勢：</strong>變爻引發向 ${future.name}卦 的演進。這代表了事態未來的發展方向。</p>
                </div>
            `;
        } else {
            summaryEl.innerText = original.summary;
        }

        // Professional Najia Rendering
        const najiaBox = document.getElementById('najia-info');
        if (original.najia_analysis) {
            najiaBox.classList.remove('hidden');
            najiaBox.querySelector('.palace-info').innerText = `${original.najia_analysis.palace}宮 [${original.najia_analysis.palace_wuxing}]`;

            const linesContainer = najiaBox.querySelector('.lines-najia');
            linesContainer.innerHTML = '';

            // Reversed to show lines from top (6) to bottom (1) or bottom-up?
            // Usually I-Ching UI is bottom-up, let's keep it bottom-up (1 to 6)
            original.najia_analysis.lines.forEach(line => {
                const lineEl = document.createElement('div');
                lineEl.className = 'najia-line';
                lineEl.dataset.line = line.line_number;
                lineEl.dataset.relative = line.relative;
                lineEl.innerHTML = `
                    <span class="line-rel">${line.relative}</span>
                    <span class="line-dz">${line.dizhi}</span>
                    <span class="line-wx">${line.wuxing}</span>
                `;
                linesContainer.appendChild(lineEl);
            });
        }
        // Insert Advanced Panel
        const advancedPanel = document.createElement('div');
        advancedPanel.className = 'advanced-insights-panel hidden';
        advancedPanel.id = 'advanced-panel';

        const palaceWuxing = original.najia_analysis?.palace_wuxing || "金";
        const relatives = (original.najia_analysis?.lines || []).map(line => line.relative);

        advancedPanel.innerHTML = `
            <div class="advanced-grid">
                <div class="insight-col">
                    <h4><i class="fas fa-link"></i> 關聯卦象</h4>
                    <div class="related-hexes">
                        <div class="rel-item" onclick="app.showHexagramDetail(app.library.find(h=>h.id==='${nuclearHex?.id}'))">
                            <span class="rel-label">互卦 (內在)</span>
                            <span class="rel-name">${nuclearHex?.name || "無"}卦</span>
                        </div>
                        <div class="rel-item" onclick="app.showHexagramDetail(app.library.find(h=>h.id==='${invertedHex?.id}'))">
                            <span class="rel-label">綜卦 (視角)</span>
                            <span class="rel-name">${invertedHex?.name || "無"}卦</span>
                        </div>
                    </div>
                </div>
                <div class="insight-col">
                    <h4><i class="fas fa-dragon"></i> 六親與六神</h4>
                    <ul class="beast-list">
                        ${relatives.slice().reverse().map((rel, i) => `
                            <li>
                                <span class="beast-name">${beasts[5 - i]}</span>
                                <span class="relative-name">${rel}</span>
                                <span class="line-idx">爻 ${6 - i}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="insight-col">
                    <h4><i class="fas fa-bolt"></i> 今日能量 (${gZ.day})</h4>
                    <div class="strength-tags">
                        ${Object.entries(strength).map(([el, st]) => `
                            <span class="strength-tag ${st}">${el}:${st}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const existingPanel = overlay.querySelector('.advanced-insights-panel');
        if (existingPanel) existingPanel.remove();
        overlay.querySelector('.result-actions').before(advancedPanel);

        // Toggle Button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn-secondary toggle-advanced';
        toggleBtn.innerHTML = '<i class="fas fa-flask"></i> 顯示深層分析';
        toggleBtn.onclick = () => {
            advancedPanel.classList.toggle('hidden');
            toggleBtn.innerHTML = advancedPanel.classList.contains('hidden') ?
                '<i class="fas fa-flask"></i> 顯示深層分析' : '<i class="fas fa-times"></i> 隱藏分析';
        };

        const actionArea = overlay.querySelector('.result-actions');
        const existingToggle = actionArea.querySelector('.toggle-advanced');
        if (existingToggle) existingToggle.remove();
        actionArea.prepend(toggleBtn);

        overlay.classList.remove('hidden');
        document.querySelector('.instruction').classList.add('hidden');

        // Setup Focus Buttons
        const focusBtns = overlay.querySelectorAll('.btn-focus');
        focusBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.onclick = () => {
                focusBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.highlightYongShen(btn.dataset.type, original);
            };
        });

        // Link Consult Mentor button directly to AI view with record
        const askAiBtn = overlay.querySelector('#ask-mentor-result');
        askAiBtn.onclick = () => {
            const question = document.getElementById('user-question')?.value || "隨喜求卦";
            overlay.classList.add('hidden');

            // CRITICAL: Set state before switching/sending
            this.currentHexData = original;
            this.currentRecordId = recordId;

            this.switchView('ai-mentor');
            this.prepareAIMentorView(original, recordId);

            // Auto-send first message if empty
            if (this.chatMessages.length === 0) {
                this.handleSendChat(`針對在此次「${question}」的占卜中，請導師為我開示此卦。`);
            }
        };

        // Link Copy button
        const copyBtn = overlay.querySelector('#copy-result');
        copyBtn.onclick = () => {
            const question = document.getElementById('user-question')?.value || "隨喜求卦";
            const solarTime = this.getSolarTime();

            // Generate Hexagram Lines Text
            let linesText = "";
            if (original.najia_analysis) {
                // Formatting Najia lines
                linesText = original.najia_analysis.lines.map(l => {
                    const isMoving = meta.changingLines.includes(l.line_number);
                    return `L${l.line_number}: [${l.relative}] ${l.dizhi}${l.wuxing}${isMoving ? ' (動)' : ''}`;
                }).reverse().join("\n");
            }

            const text = `【I-Ching Lab 卦象紀錄】\n` +
                `問題：${question}\n` +
                `時間：${solarTime}\n` +
                `本卦：${original.name}${meta.hasChange ? " 之 " + future.name : ""}\n` +
                `二进制：${meta.originalBinary}\n\n` +
                `[納甲資訊]\n${original.najia_analysis?.palace}宮 [${original.najia_analysis?.palace_wuxing}]\n${linesText}\n\n` +
                `解義：${original.summary}\n` +
                `#IChingLab #易經 #術數`;

            navigator.clipboard.writeText(text).then(() => {
                const oldText = copyBtn.innerText;
                copyBtn.innerText = "已複製資訊！";
                setTimeout(() => copyBtn.innerText = oldText, 2000);
            });
        };
    }

    highlightYongShen(type, hex) {
        if (!hex.najia_analysis) return;

        // Define Target Six Relatives for each focus
        const targetMap = {
            "career": ["官鬼"],
            "wealth": ["妻財"],
            "love": ["妻財", "官鬼"] // Usually Wealth for men, Official for women
        };

        const targets = targetMap[type];
        const lines = document.querySelectorAll('.najia-line');

        lines.forEach(line => {
            const isMatch = targets.includes(line.dataset.relative);
            line.classList.toggle('highlight', isMatch);

            // Proactive: Highlight corresponding 3D/2D segments if possible
            // This would require CastingManager to support selective highlighting
            // For now, we highlight the UI list
        });

        console.log(`Highlighted YongShen for ${type}:`, targets);
    }

    setupLibraryNav() {
        const btns = document.querySelectorAll('.sub-nav-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const subId = btn.dataset.sub;
                this.switchLibrarySubpage(subId);
            });
        });
    }

    switchLibrarySubpage(subId) {
        this.librarySubpage = subId;

        // Update Buttons
        document.querySelectorAll('.sub-nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sub === subId);
        });

        // Update Subpages
        document.querySelectorAll('.library-subpage').forEach(page => {
            page.classList.toggle('active', page.id === `subpage-${subId}`);
        });

        if (subId === 'grid') this.renderLibrary();
        if (subId === 'bagua') this.renderBaguaDiagram();
        if (subId === 'lookup') this.renderLookupTables();
        if (subId === 'learn') this.renderLearnContent();

        console.log(`Switched Library to subpage: ${subId}`);
    }

    renderBaguaDiagram() {
        const container = document.getElementById('bagua-diagram-container');
        if (!container) return;

        const trigrams = [
            { name: "離", phonetic: "ㄌㄧˊ (Lí)", symbol: "☲", nature: "火", dir: "南 (Top)" },
            { name: "坤", phonetic: "ㄎㄨㄣ (Kūn)", symbol: "☷", nature: "地", dir: "西南" },
            { name: "兌", phonetic: "ㄉㄨㄟˋ (Duì)", symbol: "☱", nature: "澤", dir: "西 (Right)" },
            { name: "乾", phonetic: "ㄑㄧㄢˊ (Qián)", symbol: "☰", nature: "天", dir: "西北" },
            { name: "坎", phonetic: "ㄎㄢˇ (Kǎn)", symbol: "☵", nature: "水", dir: "北 (Bottom)" },
            { name: "艮", phonetic: "ㄍㄣˋ (Gèn)", symbol: "☶", nature: "山", dir: "東北" },
            { name: "震", phonetic: "ㄓㄣˋ (Zhèn)", symbol: "☳", nature: "雷", dir: "東 (Left)" },
            { name: "巽", phonetic: "ㄒㄩㄣˋ (Xùn)", symbol: "☴", nature: "風", dir: "東南" }
        ];

        // Let's use a simpler Grid-based circle for better mobile responsiveness than pure SVG math
        container.innerHTML = `
            <div class="bagua-circle">
                <div class="bagua-center">☯</div>
                ${trigrams.map((t, i) => `
                    <div class="trigram-node t-${i}" onclick="app.showTrigramDetail('${t.name}')">
                        <span class="t-symbol">${t.symbol}</span>
                        <span class="t-name">${t.name}</span>
                    </div>
                `).join('')}
            </div>
            <div id="trigram-detail-panel" class="trigram-info-panel">
                <p>點擊卦象查看詳細資訊</p>
            </div>
        `;
    }

    showTrigramDetail(name) {
        const data = {
            "乾": { nature: "天", attribute: "健", element: "金", animal: "馬", family: "父", body: "首", color: "大赤、金", season: "秋冬之交", zhuyin: "ㄑㄧㄢˊ", pinyin: "Qián" },
            "坤": { nature: "地", attribute: "順", element: "土", animal: "牛", family: "母", body: "腹", color: "黃、黑", season: "夏秋之交", zhuyin: "ㄎㄨㄣ", pinyin: "Kūn" },
            "震": { nature: "雷", attribute: "動", element: "木", animal: "龍", family: "長男", body: "足", color: "青、綠", season: "春", zhuyin: "ㄓㄣˋ", pinyin: "Zhèn" },
            "巽": { nature: "風", attribute: "入", element: "木", animal: "雞", family: "長女", body: "股 (大腿)", color: "白", season: "春夏之交", zhuyin: "ㄒㄩㄣˋ", pinyin: "Xùn" },
            "坎": { nature: "水", attribute: "陷", element: "水", animal: "豕 (豬)", family: "中男", body: "耳", color: "黑、藍", season: "冬", zhuyin: "ㄎㄢˇ", pinyin: "Kǎn" },
            "離": { nature: "火", attribute: "麗", element: "火", animal: "雉 (雉雞)", family: "中女", body: "目", color: "紅、紫", season: "夏", zhuyin: "ㄌㄧˊ", pinyin: "Lí" },
            "艮": { nature: "山", attribute: "止", element: "土", animal: "狗", family: "少男", body: "手", color: "黃", season: "冬春之交", zhuyin: "ㄍㄣˋ", pinyin: "Gèn" },
            "兌": { nature: "澤", attribute: "說 (悅)", element: "金", animal: "羊", family: "少女", body: "口", color: "白", season: "秋", zhuyin: "ㄉㄨㄟˋ", pinyin: "Duì" }
        };
        const t = data[name];
        const panel = document.getElementById('trigram-detail-panel');
        if (!panel) return;

        panel.innerHTML = `
            <h3>${name} 卦 <small>${t.zhuyin} | ${t.pinyin}</small></h3>
            <div class="t-detail-grid">
                <span><strong>自然：</strong>${t.nature}</span>
                <span><strong>五行：</strong>${t.element}</span>
                <span><strong>動物：</strong>${t.animal}</span>
                <span><strong>特性：</strong>${t.attribute}</span>
                <span><strong>家族：</strong>${t.family}</span>
                <span><strong>人體：</strong>${t.body}</span>
                <span><strong>代表色：</strong>${t.color}</span>
                <span><strong>時令：</strong>${t.season}</span>
            </div>
        `;
    }

    renderLookupTables() {
        const container = document.querySelector('#subpage-lookup .lookup-tables');
        if (!container) return;

        container.innerHTML = `
            <div class="lookup-card glass-panel">
                <h3>五行對應表 (Five Elements)</h3>
                <table class="data-table">
                    <thead>
                        <tr><th>五行</th><th>方位</th><th>季節</th><th>顏色</th><th>五官</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>木</td><td>東</td><td>春</td><td>青</td><td>目</td></tr>
                        <tr><td>火</td><td>南</td><td>夏</td><td>赤</td><td>舌</td></tr>
                        <tr><td>土</td><td>中</td><td>四季</td><td>黃</td><td>口</td></tr>
                        <tr><td>金</td><td>西</td><td>秋</td><td>白</td><td>鼻</td></tr>
                        <tr><td>水</td><td>北</td><td>冬</td><td>黑</td><td>耳</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="lookup-card glass-panel">
                <h3>納甲地支對應 (Najia Reference - Full)</h3>
                <table class="data-table">
                    <thead>
                        <tr><th>八宮屬性</th><th>內卦 (Bottom)</th><th>外卦 (Top)</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>乾宮 (金) / 震宮 (木)</td><td>子、寅、辰</td><td>午、申、戌</td></tr>
                        <tr><td>坤宮 (土)</td><td>未、巳、卯</td><td>丑、亥、酉</td></tr>
                        <tr><td>坎宮 (水)</td><td>寅、辰、午</td><td>申、戌、子</td></tr>
                        <tr><td>離宮 (火)</td><td>卯、丑、亥</td><td>酉、未、巳</td></tr>
                        <tr><td>巽宮 (木)</td><td>丑、亥、酉</td><td>未、巳、卯</td></tr>
                        <tr><td>兌宮 (金)</td><td>巳、卯、丑</td><td>亥、酉、未</td></tr>
                        <tr><td>艮宮 (土)</td><td>辰、午、申</td><td>戌、子、寅</td></tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    renderLearnContent() {
        const container = document.querySelector('#subpage-learn .learn-content');
        if (!container) return;

        container.innerHTML = `
            <article class="learn-article">
                <h2>☯ 如何開始學習易經？</h2>
                <p>易經並非單純的迷信，而是一套古代的「符號邏輯系統」，用來解釋萬物變化的規律。</p>
                
                <section>
                    <h3>1. 認識符號 (陰陽與八卦)</h3>
                    <p>一長橫「⚊」代表陽，兩個短橫「⚋」代表陰。三爻組成一個「經卦」（八卦），六爻組成一個「別卦」（六十四卦）。</p>
                </section>

                <section>
                    <h3>2. 掌握「變爻」</h3>
                    <p>本占卜系統使用 6, 7, 8, 9 數字法。<strong>6 為老陰，9 為老陽</strong>，這兩個數字代表「變動」，會演變成相反的符號。這就是「易」——變化的真諦。</p>
                </section>

                <section>
                    <h3>3. 術數進階：梅花易數 (Plum Blossom)</h3>
                    <p>這是一種靈活的起卦法，不需要硬幣，只需「數」與「象」。</p>
                    <div class="plum-blossom-tool glass-panel" style="padding:15px; margin-top:10px; border:1px solid rgba(212,175,55,0.3);">
                        <p style="font-size:0.85rem; margin-bottom:10px; color:var(--accent-gold);">體驗數位起卦：輸入兩個數字（如日期、手機尾數）</p>
                        <div style="display:flex; gap:10px;">
                            <input type="number" id="pb-num1" placeholder="數字 1" style="width:70px; background:rgba(0,0,0,0.3); border:1px solid var(--glass-border); color:white; padding:5px; border-radius:5px;">
                            <input type="number" id="pb-num2" placeholder="數字 2" style="width:70px; background:rgba(0,0,0,0.3); border:1px solid var(--glass-border); color:white; padding:5px; border-radius:5px;">
                            <button class="nav-btn gold" onclick="app.calculatePlumBlossom()" style="padding:5px 12px; font-size:0.85rem;">生成卦象</button>
                        </div>
                        <div id="pb-result" style="margin-top:10px; font-size:0.9rem;"></div>
                    </div>
                </section>

                <section>
                    <h3>4. 易經成語與智慧</h3>
                    <ul>
                        <li><strong>「君子豹變」</strong>（革卦）：指君子隨時代而變，自我革新。</li>
                        <li><strong>「同聲相應」</strong>（乾卦）：指志同道合的人會互相感召。</li>
                        <li><strong>「三陽開泰」</strong>（泰卦）：意為好運降臨，萬象更新。</li>
                    </ul>
                </section>

                <section>
                    <h3>5. 推薦資源</h3>
                    <ul>
                        <li>《易經今註今譯》- 基礎入門首選</li>
                        <li>《增刪卜易》- 進階六爻占卜必讀</li>
                        <li>本應用 AI 導師：隨時對話請教，是您最好的領路人。</li>
                    </ul>
                </section>
            </article>
        `;
    }

    calculatePlumBlossom() {
        const n1 = parseInt(document.getElementById('pb-num1').value);
        const n2 = parseInt(document.getElementById('pb-num2').value);
        if (isNaN(n1) || isNaN(n2)) return;

        const standard = ["111", "011", "101", "001", "110", "010", "100", "000"];
        const lowerIdx = (n1 % 8) || 8;
        const upperIdx = (n2 % 8) || 8;

        const lowerBin = standard[lowerIdx - 1];
        const upperBin = standard[upperIdx - 1];
        const finalBinary = lowerBin + upperBin;

        const hex = this.library.find(h => h.binary === finalBinary);
        const resEl = document.getElementById('pb-result');
        if (hex) {
            resEl.innerHTML = `卦象結果：<strong>${hex.name}卦</strong> <button class="nav-btn" onclick="app.showHexagramDetail(app.library.find(h=>h.id===${hex.id}))">查看詳解</button>`;
        }
    }

    setupEventListeners() {
        // Manual toss button/click on canvas
        const container = document.getElementById('canvas-container');
        container.addEventListener('click', () => {
            if (!this.caster.isCasting && this.currentTosses.length < 6) {
                this.caster.cast();
            }
        });

        // Close result overlay
        document.getElementById('close-result-overlay').addEventListener('click', () => {
            document.getElementById('result-overlay').classList.add('hidden');
            if (this.resultSource === 'history') {
                this.switchView('history');
                this.resultSource = 'tabletop'; // Reset
            }
        });

        // Re-toss button
        document.getElementById('re-toss').addEventListener('click', () => {
            document.getElementById('result-overlay').classList.add('hidden');
            document.querySelector('.instruction').classList.remove('hidden');
            document.querySelector('.instruction').innerText = "點擊畫面開始第 1 次投擲";
            this.currentTosses = [];
            this.currentRecordId = null;
            this.chatMessages = [];
            this.resultSource = 'tabletop'; // Reset source to tabletop
            document.getElementById('casting-progress').innerHTML = ''; // Clear progress
        });

        // Device Orientation for mobile
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
                const totalAcceleration = Math.abs(event.beta) + Math.abs(event.gamma);
                if (totalAcceleration > 60 && !this.caster.isCasting) {
                    this.caster.cast();
                }
            }, true);
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetView = e.target.getAttribute('href').substring(1);
                this.switchView(targetView);
            });
        });
    }

    switchView(viewId) {
        this.currentView = viewId;

        // Update Nav UI
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${viewId}`);
        });

        // Update View Visibility
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === viewId);
        });

        this.renderView();
    }

    renderView() {
        if (this.currentView === 'library') {
            this.switchLibrarySubpage(this.librarySubpage); // This handles both grid and other subpages
        } else if (this.currentView === 'history') {
            this.renderCalendar(); // Call renderCalendar for history view
        } else if (this.currentView === 'ai-mentor') {
            if (this.currentHexData) {
                this.prepareAIMentorView(this.currentHexData, this.currentRecordId);
            } else {
                const history = document.getElementById('chat-history-main');
                history.innerHTML = `<div class="empty-state">
                    <h3>尚未選擇卦象</h3>
                    <p>請先前往「全卦圖書館」選擇一卦，或從「每日紀錄」中開啟先前的對話。</p>
                </div>`;
                document.getElementById('mentor-current-hex').innerText = "等待導引...";
            }
        }
    }

    renderLibrary() {
        const grid = document.getElementById('hex-grid');
        grid.innerHTML = '';

        this.library.forEach(hex => {
            const card = document.createElement('div');
            card.className = 'hex-card glass-panel';

            // Generate symbol for card
            let symbolHtml = '<div class="card-symbol">';
            // In our data, binary string "111000" where index 0 is line 1 (bottom).
            // Our CSS uses flex-direction: column-reverse, so appending lines in order 0-5 will show them 1-6 from bottom up.
            hex.binary.split('').forEach(char => {
                symbolHtml += `<div class="hex-line ${char === '1' ? 'yang' : 'yin'}"></div>`;
            });
            symbolHtml += '</div>';

            const phonetics = HEXAGRAM_PHONETICS[hex.id];
            const phoneticHtml = phonetics ? `
                <div class="card-phonetic">
                    <span class="zhuyin">${phonetics.bopomofo}</span>
                    <span class="pinyin">${phonetics.pinyin}</span>
                </div>
            ` : '';

            card.innerHTML = `
                ${symbolHtml}
                <div class="card-id">#${hex.id}</div>
                <div class="card-name">${hex.name}卦</div>
                ${phoneticHtml}
                <div class="card-binary">${hex.binary}</div>
            `;
            card.onclick = () => this.showHexagramDetail(hex);
            grid.appendChild(card);
        });
    }

    setupCalendarNav() {
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');
        if (prevBtn) prevBtn.onclick = () => this.changeCalendarMonth(-1);
        if (nextBtn) nextBtn.onclick = () => this.changeCalendarMonth(1);
    }

    changeCalendarMonth(delta) {
        this.calendarMonth += delta;
        if (this.calendarMonth < 0) {
            this.calendarMonth = 11;
            this.calendarYear--;
        } else if (this.calendarMonth > 11) {
            this.calendarMonth = 0;
            this.calendarYear++;
        }
        this.renderCalendar();
    }

    renderCalendar() {
        if (this.currentView !== 'history') return;

        const grid = document.getElementById('calendar-grid');
        const display = document.getElementById('current-month-display');
        if (!grid || !display) return;

        display.innerText = `${this.calendarYear}年 ${this.calendarMonth + 1}月`;
        grid.innerHTML = '';

        // Day Headers
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        days.forEach(d => {
            const el = document.createElement('div');
            el.className = 'calendar-day-head';
            el.innerText = d;
            grid.appendChild(el);
        });

        // Calendar Logic
        const firstDay = new Date(this.calendarYear, this.calendarMonth, 1).getDay();
        const daysInMonth = new Date(this.calendarYear, this.calendarMonth + 1, 0).getDate();
        const prevMonthDays = new Date(this.calendarYear, this.calendarMonth, 0).getDate();

        // Get Records for the month
        const records = JournalService.getMonthlyHistory(this.calendarYear, this.calendarMonth);
        const recordMap = {};
        records.forEach(r => {
            const day = new Date(r.date).getDate();
            if (!recordMap[day]) recordMap[day] = [];
            recordMap[day].push(r);
        });

        // Fill empty days from prev month
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.innerHTML = `<span class="day-number">${prevMonthDays - i}</span>`;
            grid.appendChild(day);
        }

        // Fill current month days
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            const isToday = today.getDate() === i && today.getMonth() === this.calendarMonth && today.getFullYear() === this.calendarYear;
            day.className = `calendar-day current-month ${isToday ? 'today' : ''}`;

            const dayRecords = recordMap[i] || [];
            if (dayRecords.length > 0) {
                day.classList.add('has-record');
                let dotsHtml = '<div class="records-preview">';
                dayRecords.forEach(() => dotsHtml += '<div class="record-dot"></div>');
                dotsHtml += '</div>';

                day.innerHTML = `<span class="day-number">${i}</span>${dotsHtml}`;
                day.onclick = () => {
                    this.showDaySelectionModal(i, dayRecords);
                };
            } else {
                day.innerHTML = `<span class="day-number">${i}</span>`;
            }
            grid.appendChild(day);
        }

        this.updateMonthlyStats();
    }

    updateMonthlyStats() {
        const stats = JournalService.getMonthlyStats(this.calendarYear, this.calendarMonth, this.library);
        const ctx = document.getElementById('radar-chart').getContext('2d');
        const summaryEl = document.getElementById('stats-summary');

        const labels = Object.keys(stats.wuxing);
        const values = Object.values(stats.wuxing);

        if (this.radarChart) this.radarChart.destroy();

        if (stats.total === 0) {
            summaryEl.innerHTML = "<p>本月尚無紀錄，快去開啟您的易經探索吧！</p>";
            // Empty Chart
            this.radarChart = new Chart(ctx, {
                type: 'radar',
                data: { labels: ['金', '木', '水', '火', '土'], datasets: [] },
                options: { scales: { r: { display: false } } }
            });
            return;
        }

        // Find dominant element
        let maxVal = -1;
        let dominant = "";
        for (let key in stats.wuxing) {
            if (stats.wuxing[key] > maxVal) {
                maxVal = stats.wuxing[key];
                dominant = key;
            }
        }

        const descriptions = {
            "木": "木氣充盈，代表本月您的能量集中在「成長」與「開拓」上。適合啟動新計畫或自我提升。",
            "火": "火氣旺盛，顯示本月生活節奏快且充滿熱情。注意情緒管理，轉化衝動為行動力。",
            "土": "土氣沈穩，象徵著安定與收穫。本月適合守成、反思或處理與家庭、根基相關的事宜。",
            "金": "金氣銳利，代表果斷與原則。本月您的決策力和執行力極佳，適合解決積壓已久的難題。",
            "水": "水氣靈動，象徵智慧與變化。本月您的直覺敏銳，適合深度思考與人際交流的柔性處理。"
        };

        summaryEl.innerHTML = `
            <p>本月共計 <strong>${stats.total}</strong> 次占卜。</p>
            <p>主導能量：<strong>${dominant}</strong> 元素</p>
            <p>${descriptions[dominant] || ''}</p>
        `;

        this.radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: '五行強度',
                    data: values,
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                    borderColor: '#d4af37',
                    borderWidth: 2,
                    pointBackgroundColor: '#d4af37'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: { display: false },
                        suggestedMax: Math.max(...values) + 1,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#f0f0f0', font: { size: 12 } }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }


    renderMiniHexSymbol(binary) {
        if (!binary || binary.length !== 6) return '';
        return `
            <div class="mini-hex-symbol">
                ${binary.split('').map(b => `<div class="line ${b === '0' ? 'yin' : 'yang'}"></div>`).join('')}
            </div>
        `;
    }

    showHexagramDetail(hex, isAutoAsk = false, recordId = null) {
        if (!hex) {
            console.error("showHexagramDetail: hex is undefined");
            return;
        }
        console.log("Showing detail for hex:", hex.id, hex.name);

        this.currentHexData = hex;
        this.currentRecordId = recordId;

        const modal = document.getElementById('detail-modal');
        const body = modal.querySelector('.modal-body');
        const phonetics = HEXAGRAM_PHONETICS[hex.id];
        const phoneticHtml = phonetics ? `
            <div class="header-phonetic-stack">
                <span class="zhuyin">${phonetics.bopomofo}</span>
                <span class="pinyin">${phonetics.pinyin}</span>
            </div>
        ` : '';

        body.innerHTML = `
            <div class="modal-header">
                <div class="modal-header-flex">
                    <div class="header-main-title">
                        <h2>第${hex.id}卦 ${hex.name}卦</h2>
                        ${phoneticHtml}
                    </div>
                    <div class="hex-badges">
                        ${this.renderMiniHexSymbol(hex.binary)}
                    </div>
                </div>
            </div>

            <details class="detail-section" open>
                <summary>卦象綜述</summary>
                <div class="detail-content">
                    <p><strong>概括：</strong>${hex.summary || '尚無總結'}</p>
                    <p><strong>卦辭：</strong>${hex.original_classic?.hexagram_text || '尚聯文獻'}</p>
                    <p><strong>彖傳：</strong>${hex.original_classic?.tuan_zhuan || '尚聯文獻'}</p>
                </div>
            </details>

            <details class="detail-section">
                <summary>結構與邏輯</summary>
                <div class="detail-content">
                    <p>${hex.logic_teaching || hex.structure?.interaction_logic || '術數推演中...'}</p>
                    ${hex.structure?.upper_trigram_attr ? `<p><strong>上卦：</strong>${hex.structure.upper_trigram_attr}</p>` : ''}
                    ${hex.structure?.lower_trigram_attr ? `<p><strong>下卦：</strong>${hex.structure.lower_trigram_attr}</p>` : ''}
                </div>
            </details>

            <details class="detail-section">
                <summary>六爻詳解</summary>
                <div class="detail-content">
                    <div class="yao-details">
                        ${(hex.line_details || []).map(l => `
                            <div class="yao-item">
                                <strong>第 ${l.line} 爻：${l.classic_text}</strong>
                                <p>${l.modern_interpretation}</p>
                            </div>
                        `).join('') || '<p>正在整理爻辭中...</p>'}
                    </div>
                </div>
            </details>

            <details class="detail-section">
                <summary>現代解析 (事業/感情/財運)</summary>
                <div class="detail-content">
                    <div class="analysis-grid">
                        <div class="analysis-item"><strong>總體：</strong>${hex.llm_analysis?.general || '正在研讀中...'}</div>
                        <div class="analysis-item"><strong>事業：</strong>${hex.llm_analysis?.career || '正在研讀中...'}</div>
                        <div class="analysis-item"><strong>感情：</strong>${hex.llm_analysis?.love || '正在研讀中...'}</div>
                        <div class="analysis-item"><strong>財運：</strong>${hex.llm_analysis?.finance || '正在研讀中...'}</div>
                    </div>
                </div>
            </details>

            <details class="detail-section">
                <summary>象徵、陰暗面與典故</summary>
                <div class="detail-content">
                    <p><strong>原型意象：</strong>${(hex.archetypes || []).join('、') || '尚無資料'}</p>
                    <p><strong>陰暗面：</strong>${hex.shadow_side || '尚無資料'}</p>
                    <hr style="opacity:0.1; margin:15px 0;">
                    <p style="color:var(--accent-gold); font-weight:600; margin-bottom:5px;">【典故】${hex.ancient_story?.title || ''}</p>
                    <p style="font-style:italic; border-left: 2px solid var(--glass-border); padding-left: 10px;">${hex.ancient_story?.content || '尚無內容'}</p>
                </div>
            </details>

            <details class="detail-section">
                <summary>視覺意象與記憶竅門</summary>
                <div class="detail-content">
                    <p><strong>視覺場景：</strong>${hex.visual_vibe || '意象捕捉中...'}</p>
                    <ul style="margin-top:10px; padding-left:20px;">
                        ${(hex.memory_hacks || []).map(h => `<li style="margin-bottom:5px;">${h}</li>`).join('')}
                    </ul>
                </div>
            </details>
        `;

        // Switch button logic to point to main AI View (Defensive check for missing button)
        const askAiBtn = document.getElementById('ask-ai');
        if (askAiBtn) {
            // Hide if viewing from history (recordId exists)
            askAiBtn.style.display = recordId ? 'none' : 'block';

            askAiBtn.onclick = () => {
                modal.classList.remove('active');
                this.switchView('ai-mentor');
            };
        }

        // Close modal
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.onclick = () => modal.classList.remove('active');

        modal.classList.add('active');

        // Automatically prepare AI view with this hex
        this.prepareAIMentorView(hex, recordId);
    }

    prepareAIMentorView(hex, recordId) {
        const header = document.getElementById('mentor-current-hex');
        header.innerText = `${hex.name}卦 (#${hex.id}) - 導師對話中`;

        const chatHistory = document.getElementById('chat-history-main');
        chatHistory.innerHTML = '';

        // Load messages if they exist
        const record = JournalService.getRecord(recordId || this.currentRecordId);
        this.chatMessages = record?.messages || [];

        if (this.chatMessages.length > 0) {
            this.chatMessages.forEach(msg => this.appendMessageToUI(msg.role, msg.content));
        } else {
            chatHistory.innerHTML = `<p class="empty-state">點擊發送按鈕或輸入疑問，與導師探討「${hex.name}卦」的深層意涵。</p>`;
        }

        // Setup send click
        document.getElementById('send-chat-main').onclick = () => this.handleSendChat();
        document.getElementById('chat-input-main').onkeypress = (e) => { if (e.key === 'Enter') this.handleSendChat(); };
    }

    async handleSendChat(forcedText = null) {
        const input = document.getElementById('chat-input-main');
        const text = forcedText || input.value.trim();
        if (!text && !forcedText) return;

        if (!forcedText) input.value = '';

        // Clear empty state if any
        const history = document.getElementById('chat-history-main');
        const empty = history.querySelector('.empty-state');
        if (empty) empty.remove();

        // User Message
        this.chatMessages.push({ role: 'user', content: text });
        this.appendMessageToUI('user', text);

        const status = document.querySelector('.chat-status');
        status.innerText = '導師沈思中...';

        // Show placeholder instead of empty bubble
        const aiMsgEl = this.appendMessageToUI('ai', '導師思考中...');
        let fullResponse = '';

        try {
            // Get the full record context for the AI
            const record = JournalService.getRecord(this.currentRecordId);
            const stream = AIService.streamChat(this.chatMessages, this.currentHexData, record || {});

            for await (const chunk of stream) {
                if (fullResponse === '') aiMsgEl.innerText = ''; // Clear placeholder on first chunk
                fullResponse += chunk;

                // Use marked for markdown rendering if available
                if (window.marked) {
                    aiMsgEl.innerHTML = window.marked.parse(fullResponse);
                } else {
                    aiMsgEl.innerText = fullResponse;
                }

                history.scrollTop = history.scrollHeight;
            }
            this.chatMessages.push({ role: 'assistant', content: fullResponse });
            if (this.currentRecordId) {
                JournalService.updateMessages(this.currentRecordId, this.chatMessages);
            }
        } catch (error) {
            aiMsgEl.innerText = `導師連線中斷：${error.message}`;
            console.error("Chat Error:", error);
        } finally {
            status.innerText = '在線';
        }
    }

    appendMessageToUI(role, content) {
        const history = document.getElementById('chat-history-main');
        const msg = document.createElement('div');
        msg.className = `chat-msg ${role === 'user' ? 'user' : 'ai'}`;

        if (role === 'ai' && window.marked && content !== '導師思考中...') {
            msg.innerHTML = window.marked.parse(content);
        } else {
            msg.innerText = content;
        }

        history.appendChild(msg);
        history.scrollTop = history.scrollHeight;
        return msg;
    }

    showDaySelectionModal(day, records) {
        const modal = document.getElementById('detail-modal');
        const body = modal.querySelector('.modal-body');

        body.innerHTML = `
            <div class="modal-header-flex">
                <div class="calendar-icon-header" style="font-size: 1.5rem;">📅</div>
                <h2>${this.calendarYear}年${this.calendarMonth + 1}月${day}日 的占卜紀錄</h2>
            </div>
            
            <div class="day-selection-list" style="margin-top: 20px; display: flex; flex-direction: column; gap: 15px;">
                <p class="selection-hint" style="color: var(--text-secondary); font-size: 0.9rem;">當天共有 ${records.length} 筆紀錄，請選擇欲查看的項目：</p>
                ${records.map(record => {
            const hex = this.library.find(h => h.id === record.originalId);
            const time = new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `
                        <div class="selection-item glass-panel" style="padding: 15px; border-radius: 12px; border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: space-between; gap: 15px;">
                            <div class="item-info" style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                    <span style="font-size: 0.8rem; background: rgba(212, 175, 55, 0.2); color: var(--accent-gold); padding: 2px 8px; border-radius: 4px;">${time}</span>
                                    <strong style="color: var(--text-primary);">${hex?.name || '未知'}卦</strong>
                                </div>
                                <div style="font-size: 0.9rem; color: var(--text-secondary);">${record.question || '隨喜求卦'}</div>
                            </div>
                            <div class="item-actions" style="display: flex; gap: 8px;">
                                <button class="nav-btn" onclick="window.app.showHistoryResultOverlay('${record.id}')" style="white-space: nowrap; font-size: 0.8rem;">查看斷語</button>
                                <button class="nav-btn gold" onclick="window.app.showHexagramDetailById('${hex?.id}', '${record.id}')" style="white-space: nowrap; font-size: 0.8rem;">詳解</button>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;

        modal.classList.add('active');
    }

    showHistoryResultOverlay(recordId) {
        const record = JournalService.getRecord(recordId);
        if (!record) return;

        const original = this.library.find(h => h.id === record.originalId);
        const future = record.futureId ? this.library.find(h => h.id === record.futureId) : null;

        if (!original) return;

        // Close selection modal
        const modal = document.getElementById('detail-modal');
        modal.classList.remove('active');

        // Restore overlay view
        this.resultSource = 'history';
        this.switchView('tabletop');
        this.showResultOverlay(original, future, {
            originalBinary: record.originalBinary || "000000",
            hasChange: record.hasChange,
            changingLines: record.changingLines || []
        }, recordId);
    }

    showHexagramDetailById(hexId, recordId) {
        const hex = this.library.find(h => h.id === parseInt(hexId));
        if (hex) this.showHexagramDetail(hex, false, recordId);
    }
}

// Start the app
window.addEventListener('DOMContentLoaded', () => {
    window.ichingApp = new App();
});
