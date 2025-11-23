import { useState } from 'react'
import type { Quest, Context, Difficulty, QuestStatus } from './types'
import './QuestProcessing.css'

interface Props {
  quests: Quest[]
  onProcessQuest: (
    questId: string,
    updates: { status: QuestStatus; context?: Context; difficulty?: Difficulty }
  ) => void
  onComplete: () => void
}

const contexts: Array<{ id: Context; name: string; icon: string }> = [
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'work', name: 'Work', icon: '💼' },
  { id: 'errands', name: 'Errands', icon: '🏃' },
  { id: 'computer', name: 'Computer', icon: '💻' },
  { id: 'anywhere', name: 'Anywhere', icon: '🌍' },
]

const difficulties: Array<{ id: Difficulty; name: string; xp: number }> = [
  { id: 'trivial', name: 'Trivial', xp: 10 },
  { id: 'easy', name: 'Easy', xp: 25 },
  { id: 'medium', name: 'Medium', xp: 50 },
  { id: 'hard', name: 'Hard', xp: 100 },
  { id: 'epic', name: 'Epic', xp: 250 },
]

export function QuestProcessing({ quests, onProcessQuest, onComplete }: Props) {
  const inboxQuests = quests.filter((q) => q.status === 'inbox')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedContext, setSelectedContext] = useState<Context>('anywhere')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy')

  if (inboxQuests.length === 0) {
    return (
      <div className="quest-processing">
        <div className="processing-content">
          <h1>Quest Processing Complete!</h1>
          <p>All quests have been organized. Ready to begin your adventure?</p>
          <button className="btn-primary" onClick={onComplete}>
            Continue to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const currentQuest = inboxQuests[currentIndex]
  const progress = ((currentIndex + 1) / inboxQuests.length) * 100

  const handleAction = (action: 'next' | 'someday' | 'skip') => {
    if (action === 'next') {
      onProcessQuest(currentQuest.id, {
        status: 'next',
        context: selectedContext,
        difficulty: selectedDifficulty,
      })
    } else if (action === 'someday') {
      onProcessQuest(currentQuest.id, {
        status: 'someday',
      })
    }

    // Move to next quest or complete
    if (currentIndex < inboxQuests.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedContext('anywhere')
      setSelectedDifficulty('easy')
    } else {
      onComplete()
    }
  }

  return (
    <div className="quest-processing">
      <div className="processing-content">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-text">
          Quest {currentIndex + 1} of {inboxQuests.length}
        </p>

        <div className="quest-card">
          <h2>{currentQuest.title}</h2>

          <div className="processing-section">
            <h3>Where will you tackle this quest?</h3>
            <div className="context-grid">
              {contexts.map((ctx) => (
                <button
                  key={ctx.id}
                  className={`context-btn ${selectedContext === ctx.id ? 'selected' : ''}`}
                  onClick={() => setSelectedContext(ctx.id)}
                >
                  <span className="ctx-icon">{ctx.icon}</span>
                  <span>{ctx.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="processing-section">
            <h3>How challenging is this quest?</h3>
            <div className="difficulty-grid">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  className={`difficulty-btn ${selectedDifficulty === diff.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDifficulty(diff.id)}
                >
                  <span className="diff-name">{diff.name}</span>
                  <span className="diff-xp">{diff.xp} XP</span>
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-primary" onClick={() => handleAction('next')}>
              Add to Quest Log
            </button>
            <button className="btn-secondary" onClick={() => handleAction('someday')}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
