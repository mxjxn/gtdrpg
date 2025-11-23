// Character classes
export type CharacterClass = 'builder' | 'warrior' | 'explorer' | 'healer'

// Quest difficulty
export type Difficulty = 'trivial' | 'easy' | 'medium' | 'hard' | 'epic'

// Quest status
export type QuestStatus = 'inbox' | 'next' | 'waiting' | 'someday' | 'completed'

// Context (GTD contexts)
export type Context = 'home' | 'work' | 'errands' | 'computer' | 'anywhere'

// Player stats
export interface PlayerStats {
  productivity: number
  focus: number
  energy: number
  willpower: number
}

// Player data
export interface Player {
  name: string
  class: CharacterClass
  level: number
  xp: number
  xpToNextLevel: number
  gold: number
  stats: PlayerStats
}

// Quest data
export interface Quest {
  id: string
  title: string
  description?: string
  status: QuestStatus
  context?: Context
  difficulty?: Difficulty
  xpReward: number
  goldReward: number
  createdAt: Date
  completedAt?: Date
}

// Game state
export interface GameState {
  player: Player
  quests: Quest[]
  currentScreen: Screen
  onboardingComplete: boolean
}

// Screen types
export type Screen =
  | 'character-creation'
  | 'goal-capture'
  | 'quest-processing'
  | 'dashboard'
  | 'quest-complete'

// XP calculation helpers
export function calculateXpForQuest(difficulty: Difficulty): number {
  const xpMap: Record<Difficulty, number> = {
    trivial: 10,
    easy: 25,
    medium: 50,
    hard: 100,
    epic: 250,
  }
  return xpMap[difficulty]
}

export function calculateXpToNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

export function calculateGoldForQuest(difficulty: Difficulty): number {
  const goldMap: Record<Difficulty, number> = {
    trivial: 5,
    easy: 10,
    medium: 25,
    hard: 50,
    epic: 100,
  }
  return goldMap[difficulty]
}
