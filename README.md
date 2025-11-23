# GTD RPG

A Getting Things Done (GTD) methodology todo app with RPG game mechanics to gamify productivity and task management.

## 🎮 Overview

GTD RPG transforms your todo list into an engaging role-playing game. Create a character, capture your goals as quests, process them using GTD principles, and earn XP and gold as you complete tasks. Level up your character while getting things done!

## ✨ Features

- **Character Creation**: Choose from different character classes (Builder, Warrior, Explorer, Healer)
- **Quest Management**: Capture and organize tasks using GTD methodology
- **GTD Contexts**: Organize quests by context (home, work, errands, computer, anywhere)
- **Quest Statuses**: Track progress with inbox, next, waiting, someday, and completed states
- **Difficulty Levels**: Assign quest difficulty (trivial, easy, medium, hard, epic) with corresponding XP/gold rewards
- **RPG Progression**: Earn XP and gold, level up your character
- **Interactive Dashboard**: View active quests, completed achievements, and character stats

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🚀 Development

```bash
# Start development server (runs on port 5173)
npm run dev
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
gtdrpg/
├── src/                    # React/TypeScript source files
│   ├── App.tsx            # Main application component
│   ├── CharacterCreation.tsx
│   ├── GoalCapture.tsx
│   ├── QuestProcessing.tsx
│   ├── Dashboard.tsx
│   ├── types.ts           # TypeScript type definitions
│   └── useGameState.ts    # Game state management hook
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies
```

## 🎯 Current Status

**Version**: 0.2.0

The project is in active development with a fully functional React/TypeScript implementation featuring:
- Complete character creation flow
- GTD-based quest capture and processing
- Working dashboard with quest management
- XP and leveling system
- Quest completion and rewards

## 📄 License

MIT License

