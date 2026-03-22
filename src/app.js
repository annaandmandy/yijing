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

        nameEl.innerText = original.name;
        binaryEl.innerText = meta.originalBinary;
        summaryEl.innerText = original.summary;

        if (meta.hasChange) {
            nameEl.innerText += ` 之 ${future.name}`;
            summaryEl.innerText = `本卦：${original.name}\n之卦：${future.name}\n${original.summary}`;
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
            this.renderHistory();
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

    renderHistory() {
        const historyList = document.querySelector('.history-list');
        const history = JournalService.getHistory();
        historyList.innerHTML = history.length === 0 ? '<p>尚無任何紀錄</p>' : '';

        const relativeStats = { "官鬼": 0, "父母": 0, "兄弟": 0, "子孫": 0, "妻財": 0 };
        const groups = {};

        history.forEach(item => {
            const dateStr = new Date(item.date).toLocaleDateString();
            if (!groups[dateStr]) groups[dateStr] = [];
            groups[dateStr].push(item);

            const hex = this.library.find(h => h.id === item.originalId);
            if (hex && hex.najia_analysis) {
                hex.najia_analysis.lines.forEach(l => {
                    if (relativeStats[l.relative] !== undefined) relativeStats[l.relative]++;
                });
            }
        });

        // Render date groups
        Object.keys(groups).forEach(date => {
            const header = document.createElement('div');
            header.className = 'date-header';
            header.innerText = date;
            historyList.appendChild(header);

            groups[date].forEach(item => {
                const el = document.createElement('div');
                el.className = 'history-item glass-panel';

                const lastMsg = item.messages?.length > 0 ? item.messages[item.messages.length - 1].content.substring(0, 40) + '...' : '點擊與導師深入對話';

                el.innerHTML = `
                    <div class="item-main">
                        <strong>問：${item.question || '未設定'}</strong>
                        <div class="item-summary">${lastMsg}</div>
                        <small class="chat-hint">引發自：${item.originalName}卦</small>
                    </div>
                    <button class="result-action">查看當時卦象</button>
                `;

                // Open Chat on main area click
                el.onclick = (e) => {
                    if (e.target.closest('.result-action')) return;
                    const hex = this.library.find(h => h.id === item.originalId);
                    if (hex) this.showHexagramDetail(hex, false, item.id);
                };

                // Open Result Overlay on button click
                const resBtn = el.querySelector('.result-action');
                resBtn.onclick = (e) => {
                    e.stopPropagation();
                    const hex = this.library.find(h => h.id === item.originalId);
                    const future = item.futureId ? this.library.find(h => h.id === item.futureId) : null;
                    if (hex) {
                        this.switchView('tabletop');
                        this.showResultOverlay(hex, future, {
                            originalBinary: item.originalBinary || "------",
                            hasChange: item.hasChange,
                            changingLines: item.changingLines // Make sure changingLines is passed
                        }, item.id);
                    }
                };

                historyList.appendChild(el);
            });
        });

        this.renderRadarChart(relativeStats);
    }

    renderRadarChart(stats) {
        const ctx = document.getElementById('radar-chart').getContext('2d');
        if (this.chart) this.chart.destroy();

        const labels = Object.keys(stats);
        const data = Object.values(stats);

        this.chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: '六親能量分佈',
                    data: data,
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                    borderColor: '#d4af37',
                    pointBackgroundColor: '#d4af37',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#f0f0f0', font: { size: 14 } },
                        ticks: { display: false },
                        suggestedMin: 0
                    }
                },
                plugins: {
                    legend: { display: false }
                }
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
}

// Start the app
window.addEventListener('DOMContentLoaded', () => {
    window.ichingApp = new App();
});
