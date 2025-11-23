import { useState, useEffect } from 'react'
import type {
  GameState,
  Player,
  Quest,
  CharacterClass,
  Screen,
  Difficulty,
  Context,
  QuestStatus,
} from './types'
import { calculateXpToNextLevel, calculateXpForQuest, calculateGoldForQuest } from './types'

const STORAGE_KEY = 'gtdrpg-save'

function createInitialState(): GameState {
  return {
    player: {
      name: '',
      class: 'builder',
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      gold: 0,
      stats: {
        productivity: 5,
        focus: 5,
        energy: 100,
        willpower: 100,
      },
    },
    quests: [],
    currentScreen: 'character-creation',
    onboardingComplete: false,
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : createInitialState()
  })

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Create character
  const createCharacter = (name: string, characterClass: CharacterClass) => {
    setState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        name,
        class: characterClass,
      },
      currentScreen: 'goal-capture',
    }))
  }

  // Add quest to inbox
  const addQuest = (title: string, description?: string) => {
    const quest: Quest = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'inbox',
      xpReward: 0,
      goldReward: 0,
      createdAt: new Date(),
    }
    setState((prev) => ({
      ...prev,
      quests: [...prev.quests, quest],
    }))
  }

  // Process quest (categorize it)
  const processQuest = (
    questId: string,
    updates: {
      status: QuestStatus
      context?: Context
      difficulty?: Difficulty
    }
  ) => {
    setState((prev) => ({
      ...prev,
      quests: prev.quests.map((q) => {
        if (q.id === questId) {
          const xpReward = updates.difficulty ? calculateXpForQuest(updates.difficulty) : 0
          const goldReward = updates.difficulty ? calculateGoldForQuest(updates.difficulty) : 0
          return {
            ...q,
            ...updates,
            xpReward,
            goldReward,
          }
        }
        return q
      }),
    }))
  }

  // Complete quest
  const completeQuest = (questId: string) => {
    const quest = state.quests.find((q) => q.id === questId)
    if (!quest) return

    let newXp = state.player.xp + quest.xpReward
    let newLevel = state.player.level
    let newXpToNextLevel = state.player.xpToNextLevel

    // Check for level up
    while (newXp >= newXpToNextLevel) {
      newXp -= newXpToNextLevel
      newLevel++
      newXpToNextLevel = calculateXpToNextLevel(newLevel)
    }

    setState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: newXpToNextLevel,
        gold: prev.player.gold + quest.goldReward,
      },
      quests: prev.quests.map((q) =>
        q.id === questId
          ? {
              ...q,
              status: 'completed' as QuestStatus,
              completedAt: new Date(),
            }
          : q
      ),
    }))
  }

  // Navigate between screens
  const navigateTo = (screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }))
  }

  // Complete onboarding
  const completeOnboarding = () => {
    setState((prev) => ({
      ...prev,
      onboardingComplete: true,
      currentScreen: 'dashboard',
    }))
  }

  // Reset game
  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY)
    setState(createInitialState())
  }

  return {
    state,
    createCharacter,
    addQuest,
    processQuest,
    completeQuest,
    navigateTo,
    completeOnboarding,
    resetGame,
  }
}
