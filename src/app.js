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
        this.init();
    }

    async init() {
        console.log("Initializing I-Ching Lab...");
        
        // Load data
        this.library = await ManifestService.loadAllHexagrams();
        console.log(`Loaded ${this.library.length} hexagrams.`);

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
        
        // Save to Journal
        JournalService.saveRecord({
            question: document.getElementById('user-question')?.value || "隨喜求卦",
            originalId: originalHex.id,
            originalName: originalHex.name,
            futureId: futureHex?.id,
            futureName: futureHex?.name,
            changingLines: result.changingLines,
            hasChange: result.hasChange
        });

        // Reset for next time (after view)
        this.currentTosses = [];
    }

    showResultOverlay(original, future, meta) {
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

        overlay.classList.remove('hidden');
        document.querySelector('.instruction').classList.add('hidden');

        // Link View Details button
        const detailBtn = overlay.querySelector('#view-details');
        detailBtn.onclick = () => {
            this.showHexagramDetail(original, true);
        };
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
            card.innerHTML = `
                <div class="card-binary">${hex.binary}</div>
                <h3>${hex.name}</h3>
                <p>${hex.summary.substring(0, 30)}...</p>
            `;
            card.onclick = () => this.showHexagramDetail(hex);
            grid.appendChild(card);
        });
    }

    renderHistory() {
        const historyList = document.querySelector('.history-list');
        const history = JournalService.getHistory();
        historyList.innerHTML = history.length === 0 ? '<p>尚無任何紀錄</p>' : '';
        
        const elementStats = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 };

        history.forEach(item => {
            const el = document.createElement('div');
            el.className = 'history-item glass-panel';
            el.innerHTML = `
                <div class="item-date">${new Date(item.date).toLocaleDateString()}</div>
                <div class="item-content">
                    <strong>問：${item.question || '未設定'}</strong>
                    <p>卦象：${item.originalName} ${item.hasChange ? '變' : ''} ${item.futureName || ''}</p>
                </div>
            `;
            historyList.appendChild(el);

            // Accumulate element stats
            const element = HEXAGRAM_ELEMENTS[item.originalId];
            if (element) elementStats[element]++;
        });

        this.renderRadarChart(elementStats);
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
                    label: '能量分佈',
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
                        pointLabels: { color: '#f0f0f0' },
                        ticks: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    showHexagramDetail(hex, isAutoAsk = false) {
        const modal = document.getElementById('detail-modal');
        const body = modal.querySelector('.modal-body');
        
        body.innerHTML = `
            <h2>${hex.name}卦 (${hex.binary})</h2>
            <div class="detail-section">
                <h4>卦辭</h4>
                <p>${hex.original_classic.hexagram_text}</p>
            </div>
            <div class="detail-section">
                <h4>現代解析</h4>
                <p>${hex.llm_analysis.general}</p>
            </div>
            <div class="detail-section">
                <h4>結構與邏輯</h4>
                <p>${hex.logic_teaching}</p>
            </div>
            <div class="detail-section">
                <h4>視覺意象</h4>
                <p>${hex.visual_vibe}</p>
            </div>
            <div class="detail-section">
                <h4>記憶竅門</h4>
                <ul>
                    ${hex.memory_hacks.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
        `;

        modal.classList.add('active');
        
        // AI Integration
        const askAiBtn = document.getElementById('ask-ai');
        const aiResponse = document.getElementById('ai-response');
        aiResponse.classList.add('hidden'); // Reset

        const handleAskAI = async () => {
            const questionInput = document.getElementById('user-question');
            const question = questionInput ? questionInput.value : "隨喜求卦";
            aiResponse.classList.remove('hidden');
            aiResponse.querySelector('.ai-text').innerText = "導師正在感應天機，請稍候...";
            
            const interpretation = await AIService.interpret(question, hex);
            aiResponse.querySelector('.ai-text').innerText = interpretation;
        };

        askAiBtn.onclick = handleAskAI;

        // Auto-run AI if question is pre-filled
        if (isAutoAsk) {
            const questionInput = document.getElementById('user-question');
            if (questionInput && questionInput.value.trim() !== "") {
                handleAskAI();
            }
        }

        // Close modal event
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => {
            if (e.target === modal) modal.classList.remove('active');
        };
    }
}

// Start the app
window.addEventListener('DOMContentLoaded', () => {
    window.ichingApp = new App();
});
