# I-Ching Lab | CONTEXT

## Project Overview
**I-Ching Lab** is an immersive, high-end digital divination tool designed for modern practitioners and enthusiasts of the *I Ching* (Book of Changes). The application combines traditional wisdom with cutting-edge web technologies to provide a philosophical and aesthetic experience.

## Key Features
- **3D Divination Tabletop**: A physics-aware casting environment using Three.js where users can virtually throw coins or shake their device to generate hexagrams.
- **Najia Analysis (術數大師)**: Professional-grade integration of the Najia method, including Palace information, Five Elements (Wuxing), and the Six Relatives (Liuqin).
- **Comprehensive Library**: Access to all 64 hexagrams with classical texts (卦辭/爻辭) and modern AI-driven interpretations.
- **AI Philosopher Mentor**: A custom LLM-powered chat interface that acts as a mentor, guiding users through the deeper meanings of their specific readings.
- **Personal Journal & Energy Analytics**: Track divination history and visualize energy distributions through interactive radar charts (Chart.js), showing the frequency of different "Relatives" in your life over time.

## Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Glassmorphism design system).
- **3D Engine**: Three.js for the tabletop and casting physics.
- **Data Visualization**: Chart.js for energy analytics in the journal.
- **Backend/AI**: Integrated AI Service for real-time divination insights and chat.
- **Data Management**: Structured JSON-based hexagram library (`yi_data_library`) and enhanced analytical data (`yi_data_enhanced`).

## Architecture Highlights
- **Engine Layer**: 
    - `HexagramEngine.js`: Core logic for calculating hexagrams, changing lines, and binary mappings.
    - `CastingManager.js`: Orchestrates the 3D scene and user interactions during the toss.
- **Service Layer**:
    - `ManifestService.js`: Efficiently loads and manages the large library of hexagram data.
    - `JournalService.js`: Handles local persistence of user history and chat logs.
    - `AIService.js`: Manages streaming responses from the AI mentor.
- **UI Components**:
    - Modular view-based system (`tabletop`, `library`, `history`).
    - Robust modal system for deep-dives into specific hexagrams.

## Design Philosophy
The app follows a **"Mystic Dark"** aesthetic, utilizing glassmorphism, golden accents (#d4af37), and smooth cubic-bezier transitions to create a sense of premium calmness and focus.

## How to Contribute / Update
1. **Data Updates**: Hexagram texts and analyses are stored in `yi_data_library/` and `yi_data_enhanced/`.
2. **Logic Updates**: Core divination rules are in `src/engine/`.
3. **Styling**: All design tokens and component styles are centralized in `src/styles/main.css`.
