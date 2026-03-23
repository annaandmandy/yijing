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
import { TarotEngine } from './engine/TarotEngine.js';
import { TarotService } from './services/TarotService.js';
import { SettingsService } from './services/SettingsService.js';
import { PlumBlossomEngine } from './engine/PlumBlossomEngine.js';

class App {
    constructor() {
        this.library = [];
        this.currentView = 'tabletop';
        this.currentTosses = [];
        this.currentHexData = null;
        this.chart = null; // Radar chart instance
        this.currentRecordId = null;
        this.chatMessages = [];

        // Load persisted settings
        this.settings = SettingsService.getSettings();

        // Calendar State
        this.calendarDate = new Date();
        this.calendarMonth = this.calendarDate.getMonth();
        this.calendarYear = this.calendarDate.getFullYear();
        this.radarChart = null;
        this.resultSource = 'tabletop';
        this.librarySubpage = 'grid'; // Sub-view within library
        this.currentMode = this.settings.mode; // 'iching' or 'tarot'
        this.tarotSpread = null;
        this.tarotStep = 'intro'; // 'intro', 'shuffling', 'selection', 'result'
        this.tarotPickedCards = [];
        this.tarotShuffleCount = 0;
        this.ichingMode = 'coin'; // 'coin' or 'plum'

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
        this.setupModeSwitcher();
        this.setupSettingsListeners();
        this.setupTarotEvents();
        this.setupPlumBlossomEvents();

        this.updateNavLabels();

        // Initial view render
        this.switchView(this.currentView);

        // Sync UI with settings
        this.applySettingsToUI();

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
                if (instruction) {
                    instruction.innerText = `第 ${this.currentTosses.length + 1} 次投擲 (已完成 ${this.currentTosses.length}/6)`;
                }
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
            isPlum: false,
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

    showResultOverlay(original, future, meta, recordId = null, isHistoricalView = false) {
        this.currentRecordId = recordId || this.currentRecordId;
        const isHistory = isHistoricalView || this.resultSource === 'history';
        // Don't override resultSource if it's already 'history'
        if (this.currentRecordId && !this.resultSource) this.resultSource = 'history';

        // Get AI insight if available
        let quickInsight = "";
        if (this.currentRecordId) {
            const record = JournalService.getRecord(this.currentRecordId);
            if (record && record.quickInsight) {
                quickInsight = record.quickInsight;
            }
        }

        const overlay = document.getElementById('result-overlay');
        
        // Hide inputs to prevent overlap/distraction
        const qContainer = document.querySelector('.question-container');
        const plumZone = document.getElementById('plum-blossom-input');
        if (qContainer) qContainer.style.display = 'none';
        if (plumZone) plumZone.style.display = 'none';

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

            ${meta.isPlum && meta.plumResult ? `
            <div class="plum-analysis-box glass-panel" style="margin: 20px 0; border: 1px solid var(--accent-gold);">
                <h4 style="color: var(--accent-gold); margin-bottom: 10px;">梅花易數：體用分析</h4>
                <div style="display: flex; justify-content: space-around; margin-bottom: 10px; font-size: 0.9rem;">
                    <div style="text-align: center;">
                        <strong>體卦：</strong>${meta.plumResult.analysis.bodyTrigram.name} (${meta.plumResult.analysis.bodyTrigram.wuxing})
                        <div style="margin-top: 5px;">${this.renderTrigramSymbol(meta.plumResult.analysis.bodyTrigram.binary)}</div>
                    </div>
                    <div style="text-align: center;">
                        <strong>用卦：</strong>${meta.plumResult.analysis.guestTrigram.name} (${meta.plumResult.analysis.guestTrigram.wuxing})
                        <div style="margin-top: 5px;">${this.renderTrigramSymbol(meta.plumResult.analysis.guestTrigram.binary)}</div>
                    </div>
                </div>
                <div style="padding: 10px; background: rgba(212, 175, 55, 0.1); border-radius: 10px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">關係：${meta.plumResult.analysis.interaction}</div>
                    <p style="font-size: 0.9rem; margin: 0;">${meta.plumResult.analysis.result}</p>
                </div>
                <div style="margin-top: 10px; text-align: center;">
                    <button class="btn-secondary" style="font-size: 0.75rem; padding: 4px 10px;" onclick="window.app.showPlumTheory()">
                        <i class="fas fa-book-open"></i> 進階說明：梅花易數原理
                    </button>
                </div>
            </div>
            ` : ''}
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
                        <div class="rel-item" onclick="app.showHexDetail(app.library.find(h=>h.id==='${nuclearHex?.id}'), false, '${recordId || ''}')">
                            <span class="rel-label">互卦 (內在)</span>
                            <span class="rel-name">${nuclearHex?.name || "無"}卦</span>
                        </div>
                        <div class="rel-item" onclick="app.showHexDetail(app.library.find(h=>h.id==='${invertedHex?.id}'), false, '${recordId || ''}')">
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
            ${quickInsight ? `
                <div class="ai-quick-insight glass-panel" style="margin-top: 20px; padding: 15px; border: 1px solid var(--accent-gold);">
                    <h4 style="color: var(--accent-gold); margin-bottom: 10px;"><i class="fas fa-magic"></i> AI 初步解析</h4>
                    <div style="font-size: 0.95rem; line-height: 1.6;">${quickInsight}</div>
                </div>
            ` : ""}
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

        overlay.classList.remove('history-mode');

        // Link Consult Mentor button directly to AI view with record
        const askAiBtn = overlay.querySelector('#ask-mentor-result');
        const reTossBtn = overlay.querySelector('#re-toss');

        // USER CLARIFICATION: Always show buttons in the result overlay.
        // They are only hidden in the "Day Selection" list view.
        if (askAiBtn) {
            askAiBtn.style.setProperty('display', 'block', 'important');
        }
        if (reTossBtn) {
            reTossBtn.style.setProperty('display', isHistory ? 'none' : 'block', 'important');
        }

        if (askAiBtn) {
            askAiBtn.onclick = () => {
                const question = document.getElementById('user-question')?.value || "隨喜求卦";
                this.switchView('ai-mentor');
                this.prepareAIMentorView(original, this.currentRecordId);

                // Hide overlay and restore inputs if needed (though switching view hides it too)
                this.hideResultOverlay();

                // Auto-send first message if empty
                if (this.chatMessages.length === 0) {
                    this.handleSendChat(`針對在此次「${question}」的占卜中，請導師為我開示此卦。`);
                }
            };
        }

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
                `解義：${original.summary}\n\n` +
                (quickInsight ? `[AI 初步解析]\n${quickInsight.replace(/<[^>]*>/g, '')}\n\n` : "") +
                `#IChingLab #易經 #術數`;

            navigator.clipboard.writeText(text).then(() => {
                const oldText = copyBtn.innerText;
                copyBtn.innerText = "已複製資訊！";
                setTimeout(() => copyBtn.innerText = oldText, 2000);
            });
        };

        const closeOverlayBtn = overlay.querySelector('#close-result-overlay');
        if (closeOverlayBtn) {
            closeOverlayBtn.onclick = (e) => {
                if (e) e.stopPropagation();
                this.hideResultOverlay();
            };
        }

        // Failsafe: Background click to close overlay
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                this.hideResultOverlay();
            }
        };
    }

    hideResultOverlay() {
        const overlay = document.getElementById('result-overlay');
        if (overlay) overlay.classList.add('hidden');
        
        // Restore input and mode switcher
        const qContainer = document.querySelector('.question-container');
        const plumZone = document.getElementById('plum-blossom-input');
        
        if (qContainer) qContainer.style.display = 'flex';
        // Only show plum zone if we are in plum mode
        if (this.ichingMode === 'plum' && plumZone) {
            plumZone.style.display = 'block';
        }

        this.resultSource = null;
        document.querySelector('.instruction').classList.remove('hidden');

        // If we came from AI Mentor, return there instead of being on Tabletop
        if (this.previousView === 'ai-mentor') {
            this.switchView('ai-mentor');
            this.previousView = null; // Reset
        }
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

        const isTarot = this.currentMode === 'tarot';

        if (subId === 'grid') {
            if (isTarot) this.renderTarotLibrary();
            else this.renderLibrary();
        }
        if (subId === 'bagua') {
            if (isTarot) {
                const container = document.getElementById('bagua-diagram-container');
                if (container) {
                    container.innerHTML = '<div id="tarot-bagua-content"></div>';
                    this.fetchAndRenderMarkdown('/tarot_data/study/four_elements.md', 'tarot-bagua-content');
                }
            } else {
                this.renderBaguaDiagram();
            }
        }
        if (subId === 'lookup') {
            if (isTarot) {
                const container = document.querySelector('#subpage-lookup .lookup-tables');
                if (container) {
                    container.innerHTML = '<div id="tarot-lookup-content" class="glass-panel"></div>';
                    this.fetchAndRenderMarkdown('/tarot_data/study/astrology_correspondences.md', 'tarot-lookup-content');
                }
            } else {
                this.renderLookupTables();
            }
        }
        if (subId === 'learn') {
            if (isTarot) {
                const container = document.querySelector('#subpage-learn .learn-content');
                if (container) {
                    container.innerHTML = '<div id="tarot-learn-content"></div>';
                    this.fetchAndRenderMarkdown('/tarot_data/study/mysticism_intro.md', 'tarot-learn-content');
                }
            } else {
                this.renderLearnContent();
            }
        }

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
                    <div class="trigram-node t-${i}" onclick="window.app.showTrigramDetail('${t.name}')">
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
            <div class="lookup-card glass-panel" id="plum-theory-section">
                <h3>梅花易數原理 (Plum Blossom Theory)</h3>
                <div id="plum-theory-library-content" style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                    正在載入理論資料...
                </div>
            </div>
        `;
        
        // Auto-load the theory content
        this.fetchAndRenderMarkdown('/yi_data_library/plum_blossom_theory.md', 'plum-theory-library-content');
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
            resEl.innerHTML = `卦象結果：<strong>${hex.name}卦</strong> <button class="nav-btn" onclick="app.showHexDetail(app.library.find(h=>h.id===${hex.id}))">查看詳解</button>`;
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
                const targetView = e.currentTarget.getAttribute('href').substring(1);
                this.switchView(targetView);
            });
        });
    }

    switchView(viewId) {
        // Map 'tabletop' to 'tarot' if we are in tarot mode
        let activeViewId = viewId;
        if (viewId === 'tabletop' && this.currentMode === 'tarot') {
            activeViewId = 'tarot';
        } else if (viewId === 'tarot' && this.currentMode === 'iching') {
            activeViewId = 'tabletop';
        }

        this.currentView = viewId;

        // Update Nav UI
        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href').substring(1);
            // Tabletop nav link should be active for both 'tabletop' and 'tarot' views
            const isActive = (href === 'tabletop' && (activeViewId === 'tabletop' || activeViewId === 'tarot')) || (href === activeViewId);
            link.classList.toggle('active', isActive);
        });

        // Update View Visibility
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === activeViewId);
        });

        // Update History Title based on Mode
        const historyTitle = document.getElementById('history-main-title');
        if (historyTitle) {
            historyTitle.innerText = this.currentMode === 'tarot' ? '每日抽卡紀錄' : '每日抽爻紀錄';
        }

        if (activeViewId === 'tabletop') {
            this.restoreCastingInputs();
        }

        this.renderView();
    }

    restoreCastingInputs() {
        const qContainer = document.querySelector('.question-container');
        const plumZone = document.getElementById('plum-blossom-input');
        const coinZone = document.getElementById('canvas-container');
        const instruction = document.querySelector('.instruction');

        if (qContainer) qContainer.style.display = 'flex';
        
        if (this.ichingMode === 'plum') {
            if (plumZone) {
                plumZone.style.display = 'block';
                plumZone.classList.remove('hidden');
            }
            if (coinZone) coinZone.classList.add('hidden');
        } else {
            if (plumZone) {
                plumZone.classList.add('hidden');
                plumZone.style.display = 'none';
            }
            if (coinZone) coinZone.classList.remove('hidden');
        }

        if (instruction) instruction.classList.remove('hidden');
    }

    setupModeSwitcher() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            // Set active state initially
            if (btn.dataset.mode === this.currentMode) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        // Restore initial tarot-mode class if applicable
        if (this.currentMode === 'tarot') {
            document.body.classList.add('tarot-mode');
        } else {
            document.body.classList.remove('tarot-mode');
        }

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.onclick = (e) => {
                const mode = e.target.dataset.mode;
                this.currentMode = mode;

                // Persist
                SettingsService.setSetting('mode', mode);

                // Update UI Active State
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Toggle Body Class for Theme
                if (mode === 'tarot') {
                    document.body.classList.add('tarot-mode');
                } else {
                    document.body.classList.remove('tarot-mode');
                }

                this.updateNavLabels();

                // Force switch to Tabletop view when changing mode
                this.currentView = 'tabletop';
                this.switchView('tabletop');
            };
        });
    }

    updateNavLabels() {
        const isTarot = this.currentMode === 'tarot';
        const navMap = {
            'tabletop': isTarot ? '抽牌' : '抽爻',
            'ai-mentor': '導師',
            'library': isTarot ? '塔羅牌大全' : '圖書館',
            'history': '每日紀錄',
            'settings': '設定'
        };

        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (navMap[href]) {
                link.innerText = navMap[href];
            }
        });

        this.updateLibraryLabels();
    }

    updateLibraryLabels() {
        const isTarot = this.currentMode === 'tarot';
        const selectors = [
            { sub: 'grid', iching: '卦象', tarot: '牌卡圖鑑' },
            { sub: 'bagua', iching: '八卦圖', tarot: '四大元素' },
            { sub: 'lookup', iching: '進階', tarot: '占星對應' },
            { sub: 'learn', iching: '自學', tarot: '神祕學入門' }
        ];

        selectors.forEach(sel => {
            const btn = document.querySelector(`.sub-nav-btn[data-sub="${sel.sub}"]`);
            if (btn) btn.innerText = isTarot ? sel.tarot : sel.iching;
        });

        const gridH2 = document.querySelector('#subpage-grid .header h2');
        if (gridH2) gridH2.innerText = isTarot ? '塔羅牌卡圖鑑' : '全卦圖書館';

        const baguaH2 = document.querySelector('#subpage-bagua .header h2');
        if (baguaH2) baguaH2.innerText = isTarot ? '四大元素對應' : '八卦示意圖';

        const lookupH2 = document.querySelector('#subpage-lookup .header h2');
        if (lookupH2) lookupH2.innerText = isTarot ? '牌卡占星對應' : '進階對照工具';

        const learnH2 = document.querySelector('#subpage-learn .header h2');
        if (learnH2) learnH2.innerText = isTarot ? '神祕學入門指南' : '自學與導航';
    }

    async fetchAndRenderMarkdown(url, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '<div class="loading" style="padding: 20px; text-align: center; color: var(--accent-gold);">加載知識庫中...</div>';
        try {
            // Append timestamp to prevent caching during dev
            const res = await fetch(`${url}?t=${new Date().getTime()}`);
            if (!res.ok) throw new Error('無法讀取知識庫文件');
            const text = await res.text();
            if (window.marked) {
                container.innerHTML = `<div class="markdown-body learn-article" style="line-height: 1.6; color: var(--text-primary); padding: 15px;">${window.marked.parse(text)}</div>`;
            } else {
                container.innerText = text;
            }
        } catch (e) {
            container.innerHTML = `<div class="error" style="color: red; padding: 20px; text-align: center;">加載失敗：${e.message}</div>`;
        }
    }

    setupSettingsListeners() {
        const spreadSelect = document.getElementById('setting-tarot-spread');
        if (spreadSelect) {
            spreadSelect.value = this.settings.tarotSpread;
            spreadSelect.onchange = (e) => {
                SettingsService.setSetting('tarotSpread', e.target.value);
                this.settings.tarotSpread = e.target.value;
            };
        }
    }

    applySettingsToUI() {
        // Mode buttons already handled in setupModeSwitcher
        const spreadSelect = document.getElementById('setting-tarot-spread');
        if (spreadSelect) spreadSelect.value = this.settings.tarotSpread;
    }

    renderView() {
        // Dynamic Nav Labels
        // This is now handled by updateNavLabels()
        // const navLibLink = document.getElementById('nav-library-link');
        // if (navLibLink) {
        //     navLibLink.innerText = this.currentMode === 'tarot' ? '卡片圖鑑 Cards' : '圖書館 Library';
        // }

        // Tarot Step Visibility
        if (this.currentMode === 'tarot' && (this.currentView === 'tabletop' || this.currentView === 'tarot')) {
            const zone = document.getElementById('tarot-interaction-zone');
            const deck = document.getElementById('tarot-deck');
            const selection = document.getElementById('tarot-selection-container');
            const result = document.getElementById('tarot-result-container');
            const actions = document.getElementById('tarot-actions');
            const controls = document.querySelector('.tarot-controls-row');

            if (zone) zone.classList.toggle('hidden', this.tarotStep === 'intro' || this.tarotStep === 'result');
            if (deck) deck.classList.toggle('hidden', this.tarotStep !== 'shuffling');
            if (selection) selection.classList.toggle('hidden', this.tarotStep !== 'selection');
            if (result) result.classList.toggle('hidden', this.tarotStep !== 'result');
            if (actions) actions.classList.toggle('hidden', this.tarotStep !== 'result');
            if (controls) controls.classList.toggle('hidden', this.tarotStep === 'shuffling' || this.tarotStep === 'selection');
        }

        if (this.currentView === 'library') {
            this.switchLibrarySubpage(this.librarySubpage);
        } else if (this.currentView === 'history') {
            this.renderCalendar();
        } else if (this.currentView === 'ai-mentor') {
            if (this.currentRecordId && !this.currentHexData) {
                const record = JournalService.getRecord(this.currentRecordId);
                if (record && (!record.type || record.type === 'iching') && record.originalId) {
                    const hex = this.library.find(h => h.id === record.originalId);
                    this.prepareAIMentorView(hex, this.currentRecordId);
                } else if (record && record.type === 'tarot') {
                    this.prepareAIMentorView(null, this.currentRecordId);
                } else {
                    const history = document.getElementById('chat-history-main');
                    if (history) {
                        history.innerHTML = `<div class="empty-state">
                            <h3>尚未選擇卦象或塔羅牌陣</h3>
                            <p>請先前往「全卦圖書館」選擇一卦，或從「每日紀錄」中開啟先前的對話。</p>
                        </div>`;
                        document.getElementById('mentor-current-hex').innerText = "等待導引...";
                    }
                }
            } else if (this.currentHexData || this.currentRecordId) {
                this.prepareAIMentorView(this.currentHexData, this.currentRecordId);
            } else {
                const history = document.getElementById('chat-history-main');
                if (history) {
                    history.innerHTML = `<div class="empty-state">
                        <h3>尚未選擇卦象或塔羅牌陣</h3>
                        <p>請先前往「全卦圖書館」選擇一卦，或從「每日紀錄」中開啟先前的對話。</p>
                    </div>`;
                    document.getElementById('mentor-current-hex').innerText = "等待導引...";
                }
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
            // We reverse it to render from top to bottom visually (6th line at top, 1st line at bottom).
            hex.binary.split('').reverse().forEach(char => {
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
            card.onclick = () => this.showHexDetail(hex);
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

        // Get Records for the month based on current mode
        const currentMode = this.currentMode || 'iching';
        const records = JournalService.getMonthlyHistory(this.calendarYear, this.calendarMonth, currentMode);
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
        const currentMode = this.currentMode || 'iching';

        const statsCard = document.querySelector('.stats-card');
        if (currentMode === 'tarot') {
            if (statsCard) statsCard.style.display = 'none';
            return;
        } else {
            if (statsCard) statsCard.style.display = 'block';
        }

        const stats = JournalService.getMonthlyStats(this.calendarYear, this.calendarMonth, this.library, currentMode);
        const ctx = document.getElementById('radar-chart').getContext('2d');
        const summaryEl = document.getElementById('stats-summary');

        const labels = Object.keys(stats.wuxing);
        const values = Object.values(stats.wuxing);

        if (this.radarChart) this.radarChart.destroy();

        if (stats.total === 0) {
            summaryEl.innerHTML = currentMode === 'tarot'
                ? "<p>本月尚無紀錄，快去開啟您的塔羅探索吧！</p>"
                : "<p>本月尚無紀錄，快去開啟您的易經探索吧！</p>";
            // Empty Chart
            this.radarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: currentMode === 'tarot' ? ['權杖(火)', '聖杯(水)', '寶劍(風)', '金幣(土)', '大序'] : ['金', '木', '水', '火', '土'],
                    datasets: []
                },
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

        const ichingDesc = {
            "木": "木氣充盈，代表本月您的能量集中在「成長」與「開拓」上。",
            "火": "火氣旺盛，顯示本月生活節奏快且充滿熱情。注意情緒管理。",
            "土": "土氣沈穩，象徵著安定與收穫。適合守成、反思。",
            "金": "金氣銳利，代表果斷與原則。決策力和執行力極佳。",
            "水": "水氣靈動，象徵智慧與變化。直覺敏銳，適合深度思考。"
        };
        const tarotDesc = {
            "權杖(火)": "火元素豐盛，充滿創造力與行動力，是適合衝刺與展現熱情的時期。",
            "聖杯(水)": "水元素豐盛，情感與直覺強烈，適合關注內心世界與人際關係。",
            "寶劍(風)": "風元素豐盛，理智與思考主導，可能會面臨決策或溝通上的挑戰與突破。",
            "金幣(土)": "土元素豐盛，關注現實與基礎，適合累積財富、規劃事業或享受生活。",
            "大序": "大阿爾克那出現頻繁，代表本月面臨重大的靈魂課題或人生轉折點。"
        };
        const descriptions = currentMode === 'tarot' ? tarotDesc : ichingDesc;

        summaryEl.innerHTML = `
            <p>本月共計 <strong>${stats.total}</strong> 次${currentMode === 'tarot' ? '塔羅占卜' : '易經占卜'}。</p>
            <p>主導能量：<strong>${dominant}</strong></p>
            <p>${descriptions[dominant] || ''}</p>
        `;

        this.radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: currentMode === 'tarot' ? '塔羅牌元素' : '五行強度',
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
        // I-Ching lines are read from bottom to top. 
        // Our binary is index 0 = line 1 (bottom).
        // So we reverse it before rendering to stack from top-down visually.
        return `
            <div class="mini-hex-symbol">
                ${binary.split('').reverse().map(b => `<div class="line ${b === '0' ? 'yin' : 'yang'}"></div>`).join('')}
            </div>
        `;
    }

    renderTrigramSymbol(binary) {
        if (!binary || binary.length !== 3) return '';
        // Same as hexagram: bottom to top rendering
        return `
            <div class="mini-hex-symbol trigram" style="height: auto; gap: 3px; width: 40px;">
                ${binary.split('').reverse().map(b => `<div class="line ${b === '0' ? 'yin' : 'yang'}" style="height: 4px;"></div>`).join('')}
            </div>
        `;
    }

    showHexDetail(hex, isAutoAsk = false, recordId = null, skipContextUpdate = false) {
        if (!hex) {
            console.error("showHexDetail: hex is undefined");
            return;
        }
        console.log("Showing detail for hex:", hex.id, hex.name);

        if (!skipContextUpdate) {
            this.currentHexData = hex;
            this.currentRecordId = recordId;
        }

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

        // Switch button logic to point to main AI View
        const askAiBtn = document.getElementById('ask-ai');
        const isHistory = !!(recordId && recordId !== "null" && recordId !== "");

        if (askAiBtn) {
            modal.classList.toggle('history-mode', isHistory);
            askAiBtn.style.display = isHistory ? 'none' : 'block';

            if (!isHistory && !skipContextUpdate) {
                askAiBtn.onclick = () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    this.switchView('ai-mentor');
                };
            } else {
                askAiBtn.style.display = 'none';
            }
        }

        this.bindModalEvents(modal);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scroll

        // Automatically prepare AI view with this hex ONLY if not in skip mode
        if (!skipContextUpdate) {
            this.prepareAIMentorView(hex, recordId);
        }
    }

    prepareAIMentorView(hex, recordId) {
        const header = document.getElementById('mentor-current-hex');
        const chatHistory = document.getElementById('chat-history-main');
        chatHistory.innerHTML = ''; // Clear history

        const currentRecord = JournalService.getRecord(recordId || this.currentRecordId);

        if (currentRecord && currentRecord.type === 'tarot') {
            header.innerText = `塔羅占卜回顧`;
            this.currentHexData = null;
            this.currentTarotCard = null;
        } else if (this.currentTarotCard) {
            header.innerHTML = `${this.currentTarotCard.name_zh} (${this.currentTarotCard.name_en}) <a href="#" class="view-detail-link" style="font-size: 0.75rem; margin-left: 10px; color: var(--accent-gold); text-decoration: underline;" onclick="event.preventDefault(); ichingApp.previousView = 'ai-mentor'; ichingApp.showTarotDetail(ichingApp.currentTarotCard, ichingApp.currentTarotCard.id, true)">🔎 查看詳解</a>`;
            this.currentHexData = null;
        } else if (hex) {
            header.innerHTML = `${hex.name}卦 (#${hex.id}) <a href="#" class="view-detail-link" style="font-size: 0.75rem; margin-left: 10px; color: var(--accent-gold); text-decoration: underline;" onclick="event.preventDefault(); ichingApp.previousView = 'ai-mentor'; ichingApp.showHexDetail(ichingApp.library.find(h => h.id === ${hex.id}), false, null, true)">🔎 查看詳解</a>`;
            this.currentHexData = hex;
            this.currentTarotCard = null;
        } else if (currentRecord && (currentRecord.type === 'iching' || !currentRecord.type) && currentRecord.originalId) {
            const recordHex = this.library.find(h => h.id === currentRecord.originalId);
            if (recordHex) {
                header.innerHTML = `${recordHex.name}卦 (#${recordHex.id}) <a href="#" class="view-detail-link" style="font-size: 0.75rem; margin-left: 10px; color: var(--accent-gold); text-decoration: underline;" onclick="event.preventDefault(); ichingApp.previousView = 'ai-mentor'; ichingApp.showHexDetail(ichingApp.library.find(h => h.id === ${recordHex.id}), false, null, true)">🔎 查看詳解</a>`;
                this.currentHexData = recordHex;
            } else {
                header.innerText = "未知卦象 - 導師對話中";
                this.currentHexData = null;
            }
            this.currentTarotCard = null;
        } else {
            header.innerText = "等待導引...";
            this.currentHexData = null;
            this.currentTarotCard = null;
        }

        this.currentRecordId = recordId;

        // Add "Check Result" button to header if record exists
        const actionContainer = document.getElementById('mentor-result-action');
        if (actionContainer) {
            actionContainer.innerHTML = '';
            if (this.currentRecordId) {
                const btn = document.createElement('button');
                btn.className = 'btn-mini gold-glow';
                btn.innerHTML = '<i class="fas fa-eye"></i> 顯示結果';
                btn.onclick = () => {
                    const record = JournalService.getRecord(this.currentRecordId);
                    if (record) {
                        this.previousView = 'ai-mentor'; // Remember where we came from
                        this.resultSource = 'history';
                        if (record.type === 'tarot') {
                            this.showTarotResultOverlay(record); // Pop up modal for Tarot
                        } else {
                            this.previousView = 'ai-mentor';
                            this.switchView('tabletop');
                            const hex = this.library.find(h => h.id === record.originalId);
                            const future = record.futureId ? this.library.find(h => h.id === record.futureId) : null;
                            this.showResultOverlay(hex, future, {
                                originalBinary: record.originalBinary,
                                hasChange: record.hasChange,
                                changingLines: record.changingLines,
                                isPlum: record.isPlum,
                                plumResult: record.plumResult
                            }, record.id);
                        }
                    }
                };
                actionContainer.appendChild(btn);
            }
        }

        // Load messages if they exist
        this.chatMessages = currentRecord?.messages || [];

        if (this.chatMessages.length > 0) {
            this.chatMessages.forEach(msg => this.appendMessageToUI(msg.role, msg.content));
        } else {
            let emptyHint = '點擊發送按鈕或輸入疑問。';
            if (currentRecord?.type === 'tarot') emptyHint = '與導師探討此次塔羅占卜的深層意涵。';
            else if (this.currentTarotCard) emptyHint = `與導師深度探討「${this.currentTarotCard.name_zh}」牌的象徵意涵與啟示。`;
            else if (hex || this.currentHexData) emptyHint = `與導師探討「${(hex || this.currentHexData).name}卦」的深層意涵。`;

            chatHistory.innerHTML = `<p class="empty-state">${emptyHint}</p>`;
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
            const stream = AIService.streamChat(
                this.chatMessages,
                this.currentHexData,
                record || {},
                null,
                this.currentTarotCard
            );

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

        if (window.marked && content !== '導師思考中...') {
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
        modal.classList.add('history-mode');
        const askAiBtn = document.getElementById('ask-ai');
        if (askAiBtn) askAiBtn.style.display = 'none';

        const body = modal.querySelector('.modal-body');

        body.innerHTML = `
            <div class="modal-header-flex">
                <div class="calendar-icon-header" style="font-size: 1.5rem;">📅</div>
                <h2>${this.calendarYear}年${this.calendarMonth + 1}月${day}日 的每日抽卡紀錄</h2>
            </div>
            
            <div class="day-selection-list" style="margin-top: 20px; display: flex; flex-direction: column; gap: 15px;">
                <p class="selection-hint" style="color: var(--text-secondary); font-size: 0.9rem;">當天共有 ${records.length} 筆紀錄，請選擇欲查看的項目：</p>
                ${records.map(record => {
            const time = new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            if (record.type === 'tarot') {
                const spreadCards = record.spread || [];
                let cardCount = 0;
                let cardsDisplayStr = '';

                if (Array.isArray(spreadCards)) {
                    cardCount = spreadCards.length;
                    const majorMap = {
                        "00": "愚者", "01": "魔術師", "02": "女祭司", "03": "皇后", "04": "皇帝",
                        "05": "教宗", "06": "戀人", "07": "戰車", "08": "力量", "09": "隱者",
                        "10": "命運之輪", "11": "正義", "12": "倒吊人", "13": "死神", "14": "節制",
                        "15": "惡魔", "16": "塔", "17": "星星", "18": "月亮", "19": "太陽",
                        "20": "審判", "21": "世界"
                    };
                    const suitsMap = { wands: '權杖', cups: '聖杯', swords: '寶劍', pentacles: '金幣' };
                    const rankMap = { "01": "王牌", "11": "侍者", "12": "騎士", "13": "皇后", "14": "國王" };

                    const cardNames = spreadCards.map(c => {
                        const id = typeof c === 'string' ? c : c.id;
                        const reversed = typeof c === 'string' ? false : c.isReversed;

                        let name = id;
                        if (!id.includes('_')) {
                            name = majorMap[id] || id;
                        } else {
                            const parts = id.split('_');
                            const suit = suitsMap[parts[0]] || parts[0];
                            const rankNum = parts[1];
                            const rank = rankMap[rankNum] || parseInt(rankNum).toString();
                            name = suit + rank;
                        }
                        return name + (reversed ? '(逆)' : '(正)');
                    }).join(', ');
                    cardsDisplayStr = `<div style="font-size: 0.8rem; color: var(--accent-gold); margin-top: 5px;">${cardNames}</div>`;
                } else {
                    cardCount = spreadCards.split(',').length;
                }

                return `
                    <div class="selection-item glass-panel" style="padding: 15px; border-radius: 12px; border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: space-between; gap: 15px;">
                        <div class="item-info" style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                <span style="font-size: 0.8rem; background: rgba(212, 175, 55, 0.2); color: var(--accent-gold); padding: 2px 8px; border-radius: 4px;">${time}</span>
                                <strong style="color: var(--text-primary);">每日抽卡紀錄 (${cardCount} 牌)</strong>
                            </div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">${record.question || '每日抽卡紀錄'}</div>
                            ${cardsDisplayStr}
                        </div>
                        <div class="item-actions" style="display: flex; gap: 8px;">
                            <button class="nav-btn gold" onclick="window.app.showHistoryTarotResult('${record.id}')" style="white-space: nowrap; font-size: 0.8rem;">查看解析</button>
                        </div>
                    </div>
                `;
            }

            const hex = this.library.find(h => h.id === record.originalId);
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
                                <button class="nav-btn gold" onclick="window.app.showHexDetailById('${hex?.id}', '${record.id}')" style="white-space: nowrap; font-size: 0.8rem;">詳解</button>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;

        this.bindModalEvents(modal);
        modal.classList.add('active');
    }

    showModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    bindModalEvents(modal) {
        const closeBtns = modal.querySelectorAll('.close-modal, .close-btn');
        const handleClose = (e) => {
            if (e) e.preventDefault();
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            if (this.previousView === 'ai-mentor') {
                this.switchView('ai-mentor');
                this.previousView = null;
            }
        };

        closeBtns.forEach(btn => {
            btn.onclick = handleClose;
        });

        modal.onclick = (e) => {
            if (e.target === modal) {
                handleClose(e);
            }
        };
    }

    async showHistoryTarotResult(recordId) {
        const record = JournalService.getRecord(recordId);
        if (!record) return;

        const modal = document.getElementById('detail-modal');
        await this.renderTarotHistoryDetail(record);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    async renderTarotHistoryDetail(record) {
        const modal = document.getElementById('detail-modal');
        modal.classList.add('history-mode'); // Hide floating Ask AI button

        const askAiBtn = document.getElementById('ask-ai');
        if (askAiBtn) askAiBtn.style.display = 'none';

        const body = modal.querySelector('.modal-body');

        const spreadCards = record.spread || [];
        const isOneCard = record.spreadType === 'one-card';
        const labels = isOneCard ? ['今日啟示 Daily Insight'] : ['過去 Past', '現在 Present', '未來 Future'];

        let cardsHtml = '';
        for (let i = 0; i < spreadCards.length; i++) {
            const c = spreadCards[i];
            const id = typeof c === 'string' ? c : c.id;
            const reversed = typeof c === 'string' ? false : c.isReversed;
            const cardInfo = await TarotService.getCard(id);

            cardsHtml += `
                <div class="tarot-history-card">
                    <div class="tarot-card-mini ${reversed ? 'reversed' : ''}">
                        <img src="${TarotService.getImageUrl(id)}" alt="${cardInfo?.name_zh}">
                    </div>
                    <div class="card-meta">
                        <span class="label">${labels[i] || ''}</span>
                        <span class="name">${cardInfo?.name_zh || id}</span>
                    </div>
                </div>
            `;
        }

        body.innerHTML = `
            <div class="tarot-history-detail">
                <div class="modal-header-flex">
                    <div class="tarot-icon-header">🔮</div>
                    <h2>塔羅占卜回顧</h2>
                </div>
                
                <div class="history-question glass-panel">
                    <span class="hint">問卜內容：</span>
                    <p>${record.question || '（未輸入問題）'}</p>
                </div>

                <div class="history-spread-grid">
                    ${cardsHtml}
                </div>

                <div class="history-insight glass-panel">
                    <h3>導師初步解析</h3>
                    <div class="insight-content">
                        ${record.quickInsight ? record.quickInsight : '<p class="hint">此紀錄尚無初步解析內容。</p>'}
                    </div>
                </div>

                <div class="history-actions">
                    <button class="btn-primary purple-btn" id="history-go-chat">進入深度對話</button>
                    <button class="btn-secondary close-modal">關閉視窗</button>
                </div>
            </div>
        `;

        const goChatBtn = document.getElementById('history-go-chat');
        if (goChatBtn) {
            goChatBtn.onclick = () => {
                modal.classList.remove('active');
                this.switchView('ai-mentor');
                this.prepareAIMentorView(null, record.id);
            };
        }

        this.bindModalEvents(modal);
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
        }, recordId, true);
    }

    showHexDetailById(hexId, recordId) {
        const hex = this.library.find(h => h.id === parseInt(hexId));
        if (hex) this.showHexDetail(hex, false, recordId);
    }

    // --- Tarot Interactive Methods ---

    setupTarotEvents() {
        const startBtn = document.getElementById('start-tarot');
        if (startBtn) startBtn.onclick = () => this.handleTarotStart();

        const deck = document.getElementById('tarot-deck');
        if (deck) {
            deck.onmousedown = () => this.startTarotShuffle();
            deck.onmousemove = (e) => this.handleTarotShuffling(e);
            window.addEventListener('mouseup', () => this.stopTarotShuffle());

            deck.ontouchstart = () => this.startTarotShuffle();
            deck.ontouchmove = (e) => this.handleTarotShuffling(e);
            window.addEventListener('touchend', () => this.stopTarotShuffle());
        }

        const interpretBtn = document.getElementById('interpret-tarot');
        if (interpretBtn) interpretBtn.onclick = () => this.handleTarotInterpret();

        const resetBtn = document.getElementById('reset-tarot');
        if (resetBtn) resetBtn.onclick = () => this.resetTarot();
    }

    getTarotSpreadConfig(type) {
        switch (type) {
            case 'one-card':
                return {
                    name: '每日指引單牌占',
                    count: 1,
                    labels: ['今日啟示 Daily Insight'],
                    keys: ['daily']
                };
            case 'relationship':
                return {
                    name: '雙人關係陣',
                    count: 7,
                    labels: ['我的現狀', '對方的現狀', '過去的連結', '現在的互動', '潛在因素', '指引建議', '未來發展'],
                    keys: ['querent_state', 'partner_state', 'past_connection', 'present_dynamics', 'hidden_factors', 'advice', 'potential_outcome']
                };
            case 'celtic-cross':
                return {
                    name: '賽爾特十字陣',
                    count: 10,
                    labels: ['現狀', '挑戰', '目標', '基礎', '過去', '未來', '自我核心', '環境因素', '希望與恐懼', '最終結果'],
                    keys: ['present', 'challenge', 'goal', 'foundation', 'past', 'future', 'self_image', 'external_factors', 'hopes_fears', 'outcome']
                };
            case 'three-card':
            default:
                return {
                    name: '過去現在未來三牌陣',
                    count: 3,
                    labels: ['過去 Past', '現在 Present', '未來 Future'],
                    keys: ['past', 'present', 'future']
                };
        }
    }

    resetTarot() {
        this.tarotStep = 'intro';
        this.tarotPickedCards = [];
        this.tarotSpread = {};
        const analysisCont = document.getElementById('tarot-quick-analysis');
        if (analysisCont) analysisCont.classList.add('hidden');
        this.renderView();
    }

    handleTarotInterpret() {
        const spreadType = SettingsService.getSetting('tarotSpread') || 'three-card';
        const config = this.getTarotSpreadConfig(spreadType);
        const context = config.name;

        if (!this.tarotSpread) this.tarotSpread = {};
        const cardsStr = Object.entries(this.tarotSpread || {}).map(([pos, card]) =>
            card ? `${pos}: ${card.id} (${card.isReversed ? '逆位' : '正位'})` : `${pos}: 未抽牌`
        ).join(', ');

        const questionEl = document.getElementById('tarot-question');
        const question = questionEl ? questionEl.value.trim() : '';
        const questionText = question ? `我的問題是：「${question}」。\n` : '';

        const prompt = `你是一位精通西洋神祕學的塔羅導師。我剛在${context}中抽到了：${cardsStr}。\n${questionText}請以神祕、優雅且富有深度洞察力的語氣，為我揭示這些卡片背後的宇宙訊息與心靈啟示。`;

        this.switchView('ai-mentor');
        this.handleSendChat(prompt);
    }

    handleTarotStart() {
        this.tarotStep = 'shuffling';
        this.tarotShuffleCount = 0;
        if (this.shuffleInterval) clearInterval(this.shuffleInterval);
        const analysisCont = document.getElementById('tarot-quick-analysis');
        if (analysisCont) analysisCont.classList.add('hidden');

        this.renderView();
        this.renderTarotDeck();
    }

    renderTarotDeck() {
        const container = document.querySelector('.deck-cards-logic');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const card = document.createElement('div');
            card.className = 'deck-card-visual';
            card.style.transform = `translate(${i * 2}px, ${-i * 2}px)`;
            container.appendChild(card);
        }
    }

    startTarotShuffle() {
        if (this.tarotStep !== 'shuffling') return;
        this.isTarotShuffling = true;
        document.querySelector('.deck-pile')?.classList.add('active');

        if (this.shuffleInterval) clearInterval(this.shuffleInterval);
        this.shuffleInterval = setInterval(() => {
            this.handleTarotShuffling();
        }, 50);
    }

    handleTarotShuffling(e) {
        if (!this.isTarotShuffling) return;
        this.tarotShuffleCount++;

        const cards = document.querySelectorAll('.deck-card-visual');
        cards.forEach((card, i) => {
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;
            const rotate = (Math.random() - 0.5) * 20;
            card.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`;
        });

        if (this.tarotShuffleCount > 30) {
            this.stopTarotShuffle();
        }
    }

    stopTarotShuffle() {
        this.isTarotShuffling = false;
        if (this.shuffleInterval) clearInterval(this.shuffleInterval);
        document.querySelector('.deck-pile')?.classList.remove('active');

        if (this.tarotStep === 'shuffling') {
            this.finishTarotShuffle();
        }
    }

    async finishTarotShuffle() {
        this.tarotDeck = TarotEngine.shuffleDeck();
        this.tarotStep = 'selection';

        // Hide deck and show selection in the same interaction zone
        document.getElementById('tarot-deck').classList.add('hidden');
        const selectionCont = document.getElementById('tarot-selection-container');
        if (selectionCont) {
            selectionCont.classList.remove('hidden');
            selectionCont.style.opacity = '0';
            setTimeout(() => {
                selectionCont.style.transition = 'opacity 0.6s ease';
                selectionCont.style.opacity = '1';
            }, 50);
        }

        const spreadType = SettingsService.getSetting('tarotSpread') || 'three-card';
        const config = this.getTarotSpreadConfig(spreadType);
        const count = config.count;
        const pickEl = document.getElementById('cards-to-pick');
        if (pickEl) pickEl.innerText = count;

        this.renderTarotFan();
    }

    renderTarotFan() {
        const fan = document.getElementById('tarot-fan');
        if (!fan) return;
        fan.innerHTML = '';

        const cardCount = 78;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // "Double Arch" for mobile to prevent overflow
            const groupSize = 39;
            const arcSpread = 120;

            for (let i = 0; i < cardCount; i++) {
                const card = document.createElement('div');
                card.className = 'fan-card';

                const isTopRow = i >= groupSize;
                const localIdx = i % groupSize;
                const radius = isTopRow ? 140 : 180;
                const yShift = isTopRow ? 0 : 160;

                const angle = ((localIdx / (groupSize - 1)) - 0.5) * arcSpread;
                const radian = (angle - 90) * (Math.PI / 180);
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius + radius + yShift;

                card.style.setProperty('--base-x', `${x}px`);
                card.style.setProperty('--base-y', `${y}px`);
                card.style.setProperty('--base-angle', `${angle}deg`);
                card.style.zIndex = i;
                card.dataset.index = i; // Store index for touch retrieval

                // Mobile Touch Optimization
                const handleTouchMove = (e) => {
                    const touch = e.touches[0];
                    const target = document.elementFromPoint(touch.clientX, touch.clientY);

                    // Clear previous hover
                    const allCards = fan.querySelectorAll('.fan-card');
                    allCards.forEach(c => c.classList.remove('hover-touch'));

                    if (target && target.classList.contains('fan-card')) {
                        target.classList.add('hover-touch');
                        this.lastTouchedCard = target;
                    }
                };

                const handleTouchEnd = () => {
                    if (this.lastTouchedCard) {
                        const idx = parseInt(this.lastTouchedCard.dataset.index);
                        this.handleTarotPickCard(this.lastTouchedCard, idx);
                        this.lastTouchedCard.classList.remove('hover-touch');
                        this.lastTouchedCard = null;
                    }
                    fan.removeEventListener('touchmove', handleTouchMove);
                    fan.removeEventListener('touchend', handleTouchEnd);
                };

                card.addEventListener('touchstart', (e) => {
                    e.preventDefault(); // Prevent ghost clicks
                    // Start tracking on fan container to avoid event bubbling issues
                    fan.addEventListener('touchmove', handleTouchMove, { passive: true });
                    fan.addEventListener('touchend', handleTouchEnd, { once: true });

                    // Clear other hovers first
                    fan.querySelectorAll('.fan-card').forEach(c => c.classList.remove('hover-touch'));
                    card.classList.add('hover-touch');
                    this.lastTouchedCard = card;
                });

                card.onclick = (e) => {
                    if (e.pointerType === 'touch') return; // Handled by touchend
                    this.handleTarotPickCard(card, i);
                };
                fan.appendChild(card);
            }
        } else {
            // Standard Single Arch for Desktop
            const radius = 550;
            const arcSpread = 140;

            for (let i = 0; i < cardCount; i++) {
                const card = document.createElement('div');
                card.className = 'fan-card';
                card.dataset.index = i;

                const angle = ((i / (cardCount - 1)) - 0.5) * arcSpread;
                const radian = (angle - 90) * (Math.PI / 180);
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius + radius - 100;

                card.style.setProperty('--base-x', `${x}px`);
                card.style.setProperty('--base-y', `${y}px`);
                card.style.setProperty('--base-angle', `${angle}deg`);
                card.style.zIndex = i;

                card.onclick = () => this.handleTarotPickCard(card, i);
                fan.appendChild(card);
            }
        }
    }

    async handleTarotPickCard(cardEl, index) {
        if (cardEl.classList.contains('picked')) return;

        const spreadType = SettingsService.getSetting('tarotSpread') || 'three-card';
        const config = this.getTarotSpreadConfig(spreadType);
        const max = config.count;

        if (this.tarotPickedCards.length >= max) return;

        // Visual "fly out" effect
        cardEl.classList.add('picked');

        // Pick card from the pre-shuffled deck using the fan index
        const cardData = this.tarotDeck[index];
        this.tarotPickedCards.push(cardData);

        // Update UI counter
        const pickEl = document.getElementById('cards-to-pick');
        if (pickEl) pickEl.innerText = max - this.tarotPickedCards.length;

        if (this.tarotPickedCards.length === max) {
            setTimeout(() => this.showTarotResults(), 800);
        }
    }

    async showTarotResults(manualSpread = null, manualPickedCards = null, recordId = null) {
        this.tarotStep = 'result';
        if (recordId) this.currentRecordId = recordId;

        // Hide interaction zone and show results
        document.getElementById('tarot-interaction-zone').classList.add('hidden');
        const resultCont = document.getElementById('tarot-result-container');
        if (resultCont) {
            resultCont.classList.remove('hidden');
            resultCont.scrollIntoView({ behavior: 'smooth' });
        }

        const renderLogic = async () => {
            document.getElementById('tarot-selection-container')?.classList.add('hidden');
            document.getElementById('tarot-result-container')?.classList.remove('hidden');
            document.getElementById('tarot-actions')?.classList.remove('hidden');

            if (manualSpread && Array.isArray(manualSpread)) {
                // If we get an array from history, we need to map it back to a spread object
                const count = manualSpread.length;
                let spreadType = 'three-card';
                if (count === 1) spreadType = 'one-card';
                else if (count === 7) spreadType = 'relationship';
                else if (count === 10) spreadType = 'celtic-cross';

                const config = this.getTarotSpreadConfig(spreadType);
                this.tarotSpread = {};
                config.keys.forEach((key, index) => {
                    if (manualSpread[index]) {
                        this.tarotSpread[key] = manualSpread[index];
                    }
                });
            } else {
                const spreadType = SettingsService.getSetting('tarotSpread') || 'three-card';
                const config = this.getTarotSpreadConfig(spreadType);
                this.tarotSpread = {};
                config.keys.forEach((key, index) => {
                    if (this.tarotPickedCards[index]) {
                        this.tarotSpread[key] = this.tarotPickedCards[index];
                    }
                });
            }

            await this.renderTarotSpread();

            if (!recordId) {
                // Save only if it's a new reading
                const spreadType = SettingsService.getSetting('tarotSpread') || 'three-card';
                const recordId = JournalService.saveRecord({
                    type: 'tarot',
                    question: document.getElementById('tarot-question')?.value || "塔羅占卜",
                    spread: Object.values(this.tarotSpread).map(c => ({ id: c.id, isReversed: c.isReversed })),
                    spreadType: spreadType
                });
                this.currentRecordId = recordId;
                this.chatMessages = [];
            }
        };

        if (manualSpread) await renderLogic();
        else setTimeout(async () => await renderLogic(), 800);
    }

    showTarotDetail(cardInfo, id) {
        if (!cardInfo) return;
        const modal = document.getElementById('detail-modal');
        const body = modal.querySelector('.modal-body');

        body.innerHTML = `
            <div class="tarot-detail-view" style="padding: 20px;">
                <div class="tarot-detail-header" style="margin-bottom: 20px; text-align: center;">
                    <h2 style="color: var(--accent-gold);">${cardInfo.name_zh} <small style="color: var(--text-secondary); font-size: 1rem;">${cardInfo.name_en}</small></h2>
                    <span class="arcana-badge" style="background: rgba(212,175,55,0.2); color: var(--accent-gold); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem;">${cardInfo.arcana} Arcana</span>
                </div>
                <div class="tarot-detail-main" style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <div class="tarot-detail-img" style="flex: 1; min-width: 200px;">
                        <img src="${TarotService.getImageUrl(id)}" alt="${cardInfo.name_zh}" style="width:100%; border-radius:10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    </div>
                    <div class="tarot-detail-text" style="flex: 2; min-width: 300px;">
                        <p class="summary" style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;"><strong>概述：</strong>${cardInfo.summary}</p>
                        <div class="meaning-section" style="margin-bottom: 15px;">
                            <h4 style="color: var(--success); margin-bottom: 5px;">正位牌義</h4>
                            <p style="font-size: 0.95rem; opacity: 0.9;">${cardInfo.llm_analysis.general_upright}</p>
                        </div>
                        <div class="meaning-section" style="margin-bottom: 15px;">
                            <h4 style="color: var(--error); margin-bottom: 5px;">逆位牌義</h4>
                            <p style="font-size: 0.95rem; opacity: 0.9;">${cardInfo.llm_analysis.general_reversed}</p>
                        </div>
                        <blockquote style="border-left: 4px solid var(--accent-gold); padding-left: 15px; font-style: italic; color: var(--text-secondary); margin: 20px 0;">
                            ${cardInfo.advice}
                        </blockquote>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modal);
    }

    async renderTarotLibrary() {
        const container = document.getElementById('hex-grid');
        if (!container) return;

        container.className = 'tarot-grid';
        container.innerHTML = '<div class="loading">加載卡片中...</div>';

        // major 00-21, minor suit_01-14
        const major = Array.from({ length: 22 }, (_, i) => i.toString().padStart(2, '0'));
        const suits = ['wands', 'cups', 'swords', 'pentacles'];
        const minor = suits.flatMap(suit =>
            Array.from({ length: 14 }, (_, i) => `${suit}_${(i + 1).toString().padStart(2, '0')}`)
        );

        const allCards = [...major, ...minor];
        container.innerHTML = '';

        for (const id of allCards) {
            const cardInfo = await TarotService.getCard(id);
            const cardItem = document.createElement('div');
            cardItem.className = 'tarot-card-item';
            cardItem.innerHTML = `
                <div class="tarot-card-thumb">
                    <img src="${TarotService.getImageUrl(id)}" alt="${cardInfo?.name_zh}">
                </div>
                <span>${cardInfo?.name_zh || id}</span>
            `;
            cardItem.onclick = () => this.showTarotDetail(cardInfo, id);
            container.appendChild(cardItem);
        }
    }

    showTarotDetail(cardInfo, id, skipContextUpdate = false) {
        if (!cardInfo) {
            console.error(`Cannot show detail for card ${id}: data is null`);
            return;
        }
        if (!skipContextUpdate) {
            this.currentTarotCard = { ...cardInfo, id: id };
        }
        const modal = document.getElementById('detail-modal');
        const body = modal.querySelector('.modal-body');

        body.innerHTML = `
            <div class="tarot-detail-view" style="padding: 20px;">
                <div class="tarot-detail-header" style="margin-bottom: 20px; text-align: center;">
                    <h2 style="color: var(--accent-gold);">${cardInfo.name_zh} <small style="color: var(--text-secondary); font-size: 1rem;">${cardInfo.name_en}</small></h2>
                    <span class="arcana-badge" style="background: rgba(212,175,55,0.2); color: var(--accent-gold); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem;">${cardInfo.arcana} Arcana</span>
                </div>
                <div class="tarot-detail-main" style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <div class="tarot-detail-img" style="flex: 1; min-width: 200px;">
                        <img src="${TarotService.getImageUrl(id)}" alt="${cardInfo.name_zh}" style="width:100%; border-radius:10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    </div>
                    <div class="tarot-detail-text" style="flex: 2; min-width: 300px;">
                        <p class="summary" style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;"><strong>概述：</strong>${cardInfo.summary}</p>
                        <div class="meaning-section" style="margin-bottom: 15px;">
                            <h4 style="color: var(--success); margin-bottom: 5px;">正位牌義</h4>
                            <p style="font-size: 0.95rem; opacity: 0.9;">${cardInfo.llm_analysis.general_upright}</p>
                        </div>
                        <div class="meaning-section" style="margin-bottom: 15px;">
                            <h4 style="color: var(--error); margin-bottom: 5px;">逆位牌義</h4>
                            <p style="font-size: 0.95rem; opacity: 0.9;">${cardInfo.llm_analysis.general_reversed}</p>
                        </div>
                        <blockquote style="border-left: 4px solid var(--accent-gold); padding-left: 15px; font-style: italic; color: var(--text-secondary); margin: 20px 0;">
                            ${cardInfo.advice}
                        </blockquote>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        modal.style.display = 'flex'; // Explicitly show if hidden by other logic
        modal.scrollTop = 0; // Reset scroll
        document.body.style.overflow = 'hidden'; // Stop background scroll

        // Ensure close button works
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.classList.remove('active');
                modal.style.display = 'none';
                document.body.style.overflow = '';
            };
        }

        // Background click to close
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };

        const askAiBtn = document.getElementById('ask-ai');
        if (askAiBtn) {
            askAiBtn.style.setProperty('display', 'block', 'important');
            modal.classList.remove('history-mode'); // Ensure button is visible

            askAiBtn.onclick = () => {
                modal.classList.remove('active');
                modal.style.display = 'none';
                document.body.style.overflow = '';
                this.currentTarotCard = { ...cardInfo, id: id };
                this.switchView('ai-mentor');
                this.prepareAIMentorView(null, null);
            };
        }
    }

    async showTarotResultOverlay(record) {
        if (!record || !record.spread) return;
        const modal = document.getElementById('detail-modal');
        const body = modal.querySelector('.modal-body');
        
        let cardsHtml = '';
        for (const card of record.spread) {
            const cardInfo = await TarotService.getCard(card.id);
            cardsHtml += `
                <div class="tarot-result-card-mini" style="text-align: center; margin-bottom: 20px;">
                    <img src="${TarotService.getImageUrl(card.id)}" alt="${cardInfo?.name_zh}" style="width: 100px; border-radius: 5px; ${card.isReversed ? 'transform: rotate(180deg);' : ''}">
                    <div style="font-size: 0.9rem; margin-top: 5px; color: var(--accent-gold);">${cardInfo?.name_zh || card.id} ${card.isReversed ? '(逆位)' : '(正位)'}</div>
                </div>
            `;
        }

        body.innerHTML = `
            <div class="tarot-history-popup" style="padding: 20px;">
                <h3 style="color: var(--accent-gold); margin-bottom: 20px; text-align: center;">塔羅牌陣回顧</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; justify-items: center;">
                    ${cardsHtml}
                </div>
                ${record.quickInsight ? `
                <div class="ai-insight-box" style="margin-top: 20px; padding: 15px; background: rgba(212, 175, 55, 0.1); border: 1px solid var(--accent-gold); border-radius: 10px;">
                    <h4 style="color: var(--accent-gold); margin-bottom: 5px;"><i class="fas fa-sparkles"></i> 導師初解</h4>
                    <p style="font-size: 0.95rem; line-height: 1.6;">${record.quickInsight}</p>
                </div>
                ` : ''}
            </div>
        `;
        
        this.showModal(modal);
    }
    async renderTarotSpread() {
        const spreadContainer = document.getElementById('tarot-result-container');
        const actions = document.getElementById('tarot-actions');
        if (!spreadContainer) return;

        spreadContainer.classList.remove('hidden');
        if (actions) actions.classList.remove('hidden');

        spreadContainer.innerHTML = '';

        const count = Object.keys(this.tarotSpread).length;
        let spreadType = 'three-card';
        if (count === 1) spreadType = 'one-card';
        else if (count === 7) spreadType = 'relationship';
        else if (count === 10) spreadType = 'celtic-cross';
        else {
            // Fallback to setting if count is 0 or unknown
            spreadType = SettingsService.getSetting('tarotSpread') || 'three-card';
        }

        const config = this.getTarotSpreadConfig(spreadType);

        for (let i = 0; i < config.keys.length; i++) {
            const cardData = this.tarotSpread[config.keys[i]];
            const cardInfo = await TarotService.getCard(cardData.id);

            const wrapper = document.createElement('div');
            wrapper.className = 'tarot-card-wrapper';
            wrapper.innerHTML = `
                <div class="tarot-card ${cardData.isReversed ? 'reversed' : ''}" id="card-result-${i}">
                    <div class="tarot-card-back"></div>
                    <div class="tarot-card-front">
                        <img src="${TarotService.getImageUrl(cardData.id)}" alt="${cardInfo?.name_zh}">
                    </div>
                </div>
                <div class="card-info">
                    <span class="spread-label">${config.labels[i]}</span>
                    <span class="tarot-card-name">${cardInfo?.name_zh || cardData.id}</span>
                </div>
            `;

            spreadContainer.appendChild(wrapper);
        }

        // Return promise that resolves when all cards have finished flipping
        return new Promise((resolve) => {
            const count = config.keys.length;
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const el = document.getElementById(`card-result-${i}`);
                    if (el) el.classList.add('flipped');
                    // Resolve after the last card finishes its flip (approx 600ms transition)
                    if (i === count - 1) {
                        setTimeout(resolve, 800);
                    }
                }, 400 * (i + 1));
            }
        });
    }

    async autoInterpretTarot() {
        const analysisCont = document.getElementById('tarot-quick-analysis');
        const analysisText = document.getElementById('tarot-analysis-text');
        if (!analysisCont || !analysisText) return;

        analysisCont.classList.remove('hidden');
        analysisText.innerHTML = '<span class="sparkle">🔮</span> 正在感應星象與牌面結構...';

        try {
            const spreadType = SettingsService.getSetting('tarotSpread') || 'three-card';
            const config = this.getTarotSpreadConfig(spreadType);
            const context = config.name;
            const cardsStr = Object.entries(this.tarotSpread || {}).map(([pos, card]) =>
                card ? `${pos}: ${card.id} (${card.isReversed ? '逆位' : '正位'})` : `${pos}: 未抽牌`
            ).join(', ');

            const questionEl = document.getElementById('tarot-question');
            const question = questionEl ? questionEl.value.trim() : '';
            const questionText = question ? `\n            用戶提問：${question}` : '';

            const prompt = `你是一位神祕的塔羅占卜導師。請根據以下抽牌結果提供一段簡短（約 100 字）、充滿靈性且精確的初步解析。
            占卜情境：${context}
            牌面：${cardsStr}${questionText}
            請直接開始解析，語氣要富有神祕感與詩意，精準點出核心能量。不要有開場白或自我介紹。`;

            const interpretation = await AIService.ask(prompt);
            analysisText.innerText = interpretation;

            // Persist the interpretation for history
            if (this.currentRecordId) {
                JournalService.updateRecord(this.currentRecordId, { quickInsight: interpretation });
            }
        } catch (error) {
            console.error("Auto interpretation failed:", error);
            analysisText.innerText = "星象觀測受阻，請點選「詳細解牌」按鈕。";
        }
    }
    setupPlumBlossomEvents() {
        const modeBtns = document.querySelectorAll('.casting-mode-switcher .mode-btn');
        const coinZone = document.getElementById('canvas-container');
        const plumZone = document.getElementById('plum-blossom-input');

        modeBtns.forEach(btn => {
            btn.onclick = () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.ichingMode = btn.dataset.mode;

                if (this.ichingMode === 'plum') {
                    if (coinZone) coinZone.classList.add('hidden');
                    if (plumZone) plumZone.classList.remove('hidden');
                } else {
                    if (plumZone) plumZone.classList.add('hidden');
                    if (coinZone) coinZone.classList.remove('hidden');
                }
            };
        });

        const submitBtn = document.getElementById('plum-submit');
        if (submitBtn) {
            submitBtn.onclick = () => this.handlePlumBlossomSubmit();
        }
    }

    async handlePlumBlossomSubmit() {
        const n1 = parseInt(document.getElementById('plum-n1').value);
        const n2 = parseInt(document.getElementById('plum-n2').value);
        const n3 = parseInt(document.getElementById('plum-n3').value);

        if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            alert('請輸入三個有效的數字');
            return;
        }

        console.log(`Generating Plum Blossom for: ${n1}, ${n2}, ${n3}`);
        const result = PlumBlossomEngine.calculateFromNumbers(n1, n2, n3);
        
        // Match with library to get hexagram details
        const hex = this.library.find(h => h.binary === result.binary);
        if (!hex) {
            console.error("Could not find hexagram for binary:", result.binary);
            return;
        }

        this.currentHexData = hex;
        // Inject Plum Blossom analysis for AI context
        this.currentHexData.plumAnalysis = result;

        // Save to Journal
        const recordId = JournalService.saveRecord({
            question: document.getElementById('user-question')?.value || "梅花易數求卦",
            originalId: hex.id,
            originalBinary: result.binary,
            originalName: hex.name,
            movingLine: result.movingLine,
            isPlum: true,
            plumResult: result,
            advancedTheory: {
                relations: PlumBlossomEngine.calculateFromNumbers(n1, n2, n3), // Reuse for theory
                plum: result
            }
        });
        this.currentRecordId = recordId;
        this.chatMessages = [];

        // Show result overlay (reusing Iching result UI)
        this.showResultOverlay(hex, null, {
            originalBinary: result.binary,
            hasChange: false, 
            movingLine: result.movingLine,
            isPlum: true,
            plumResult: result
        }, recordId);
    }
    showPlumTheory() {
        // Switch to library view
        this.switchView('library');
        // Switch to lookup/theory subpage
        this.switchLibrarySubpage('lookup');
        
        // Wait for render, then fetch specific markdown
        setTimeout(() => {
            const container = document.getElementById('tarot-lookup-content') || 
                            document.querySelector('#subpage-lookup .lookup-tables');
            if (container) {
                container.innerHTML = '<div id="plum-theory-content" class="glass-panel"></div>';
                this.fetchAndRenderMarkdown('/yi_data_library/plum_blossom_theory.md', 'plum-theory-content');
            }
        }, 100);

        // Hide overlay
        this.hideResultOverlay();
    }
}

// Start the app
window.addEventListener('DOMContentLoaded', () => {
    window.ichingApp = new App();
    window.app = window.ichingApp; // Compatibility for inline onclick
});
