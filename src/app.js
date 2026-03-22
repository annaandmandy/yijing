/**
 * app.js
 * Main entry point for I-Ching Lab.
 */

import { HexagramEngine } from './engine/HexagramEngine.js';
import { ManifestService } from './services/ManifestService.js';
import { JournalService } from './services/JournalService.js';
import { CastingManager } from './engine/CastingManager.js';

import { AIService } from './services/AIService.js';

import { HEXAGRAM_ELEMENTS } from './constants.js';

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
        this.calendarYear = this.calendarDate.getFullYear();
        this.calendarMonth = this.calendarDate.getMonth();
        this.radarChart = null;

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
        this.setupCalendarNav(); // Added calendar navigation setup

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

        // Save to Journal first to get ID for chat session
        const recordId = JournalService.saveRecord({
            question: document.getElementById('user-question')?.value || "隨喜求卦",
            originalId: originalHex.id,
            originalBinary: result.originalBinary,
            originalName: originalHex.name,
            futureId: futureHex?.id,
            futureName: futureHex?.name,
            changingLines: result.changingLines,
            hasChange: result.hasChange
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
        const overlay = document.getElementById('result-overlay');
        const nameEl = overlay.querySelector('.hex-name');
        const binaryEl = overlay.querySelector('.binary-display');
        const summaryEl = overlay.querySelector('.hex-summary');

        nameEl.innerHTML = `
            <div class="result-hex-display">
                <div class="hex-block original">
                    <span class="hex-label">本卦 (當前)</span>
                    ${this.renderMiniHexSymbol(original.binary)}
                    <span class="hex-name-text">${original.name}</span>
                </div>
                ${meta.hasChange ? `
                <div class="hex-arrow">→</div>
                <div class="hex-block future">
                    <span class="hex-label">之卦 (演變)</span>
                    ${this.renderMiniHexSymbol(future.binary)}
                    <span class="hex-name-text">${future.name}</span>
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

    setupEventListeners() {
        // Manual toss button/click on canvas
        const container = document.getElementById('canvas-container');
        container.addEventListener('click', () => {
            if (!this.caster.isCasting && this.currentTosses.length < 6) {
                this.caster.cast();
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
            this.renderLibrary();
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

            card.innerHTML = `
                ${symbolHtml}
                <div class="card-id">#${hex.id}</div>
                <div class="card-name">${hex.name}卦</div>
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

        body.innerHTML = `
            <div class="modal-header-flex">
                ${this.renderMiniHexSymbol(hex.binary)}
                <h2>${hex.name || '未知'}卦 (#${hex.id || '??'})</h2>
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

        // Switch button logic to point to main AI View
        const askAiBtn = document.getElementById('ask-ai');
        askAiBtn.onclick = () => {
            modal.classList.remove('active');
            this.switchView('ai-mentor');
        };

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
