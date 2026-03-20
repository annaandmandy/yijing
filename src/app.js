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

        this.showResultOverlay(originalHex, futureHex, result);
        
        // Save to Journal and keep ID for chat session
        this.currentRecordId = JournalService.saveRecord({
            question: document.getElementById('user-question')?.value || "隨喜求卦",
            originalId: originalHex.id,
            originalBinary: result.originalBinary,
            originalName: originalHex.name,
            futureId: futureHex?.id,
            futureName: futureHex?.name,
            changingLines: result.changingLines,
            hasChange: result.hasChange
        });

        this.chatMessages = []; // Reset chat for new session
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

        // Link View Details button
        const detailBtn = overlay.querySelector('#view-details');
        detailBtn.onclick = () => {
            this.showHexagramDetail(original, true, recordId);
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
                            hasChange: item.hasChange
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
            <h2>${hex.name || '未知'}卦 (#${hex.id || '??'})</h2>
            <div class="detail-section">
                <h4>卦辭</h4>
                <p>${hex.original_classic?.hexagram_text || '尚無文獻'}</p>
            </div>
            <div class="detail-section">
                <h4>現代解析</h4>
                <p>${hex.llm_analysis?.general || '正在研讀中...'}</p>
            </div>
            <div class="detail-section">
                <h4>結構與邏輯</h4>
                <p>${hex.logic_teaching || '術數推演中...'}</p>
            </div>
            <div class="detail-section">
                <h4>視覺意象</h4>
                <p>${hex.visual_vibe || '意象捕捉中...'}</p>
            </div>
            <div class="detail-section">
                <h4>記憶竅門</h4>
                <ul>
                    ${(hex.memory_hacks || []).map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
        `;

        // Reset and Prepare Chat
        const chatContainer = document.getElementById('ai-chat-container');
        const chatHistory = document.getElementById('chat-history');
        const askAiBtn = document.getElementById('ask-ai');
        
        chatContainer.classList.add('hidden');
        chatHistory.innerHTML = '';
        askAiBtn.classList.remove('hidden');

        // Load messages if they exist for this record
        const record = JournalService.getRecord(this.currentRecordId);
        this.chatMessages = record?.messages || [];
        
        if (this.chatMessages.length > 0) {
            chatContainer.classList.remove('hidden');
            askAiBtn.classList.add('hidden');
            this.chatMessages.forEach(msg => this.appendMessageToUI(msg.role, msg.content));
        }

        modal.classList.add('active');
        
        askAiBtn.onclick = () => {
            chatContainer.classList.remove('hidden');
            askAiBtn.classList.add('hidden');
            if (this.chatMessages.length === 0) {
                const firstQuestion = document.getElementById('user-question')?.value || "請導師針對此卦給予建議";
                this.handleSendChat(firstQuestion);
            }
        };

        // Chat Input Event
        const sendBtn = document.getElementById('send-chat');
        const chatInput = document.getElementById('chat-input');
        
        sendBtn.onclick = () => this.handleSendChat();
        chatInput.onkeypress = (e) => { if (e.key === 'Enter') this.handleSendChat(); };

        // Auto-run AI if requested
        if (isAutoAsk && this.chatMessages.length === 0) {
            askAiBtn.click();
        }

        // Close modal
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.onclick = () => modal.classList.remove('active');
    }

    async handleSendChat(forcedText = null) {
        const input = document.getElementById('chat-input');
        const text = forcedText || input.value.trim();
        if (!text) return;

        if (!forcedText) input.value = '';

        // User Message
        this.chatMessages.push({ role: 'user', content: text });
        this.appendMessageToUI('user', text);
        
        // AI Response placeholder
        const status = document.querySelector('.chat-status');
        status.innerText = '感應中...';
        
        // Create an empty AI message bubble for streaming
        const aiMsgEl = this.appendMessageToUI('ai', '');
        let fullResponse = '';

        try {
            console.log("App: Requesting stream from AIService...");
            const stream = AIService.streamChat(this.chatMessages, this.currentHexData);
            for await (const chunk of stream) {
                console.log("App: received chunk:", chunk);
                fullResponse += chunk;
                aiMsgEl.innerText = fullResponse;
                const history = document.getElementById('chat-history');
                history.scrollTop = history.scrollHeight;
            }
            
            console.log("App: Stream completed.");
            console.log("App: Full AI Answer:", fullResponse);
            
            this.chatMessages.push({ role: 'assistant', content: fullResponse });
            
            // Persist
            if (this.currentRecordId) {
                JournalService.updateMessages(this.currentRecordId, this.chatMessages);
            }
        } catch (error) {
            console.error("AI Stream Error:", error);
            aiMsgEl.innerText = "導師目前無法感應（連線異常），請稍後再試。";
        } finally {
            status.innerText = '在線';
        }
    }

    appendMessageToUI(role, content) {
        const history = document.getElementById('chat-history');
        const msg = document.createElement('div');
        msg.className = `chat-msg ${role === 'user' ? 'user' : 'ai'}`;
        msg.innerText = content;
        history.appendChild(msg);
        history.scrollTop = history.scrollHeight;
        return msg; // Return element for updates
    }
}

// Start the app
window.addEventListener('DOMContentLoaded', () => {
    window.ichingApp = new App();
});
