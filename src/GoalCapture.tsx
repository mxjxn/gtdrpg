import { useState } from 'react'
import type { Player, Quest } from './types'
import './GoalCapture.css'

interface Props {
  player: Player
  quests: Quest[]
  onAddQuest: (title: string, description?: string) => void
  onContinue: () => void
}

export function GoalCapture({ player, quests, onAddQuest, onContinue }: Props) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAddQuest(input.trim())
      setInput('')
    }
  }

  const inboxQuests = quests.filter((q) => q.status === 'inbox')

  return (
    <div className="goal-capture">
      <div className="capture-content">
        <h1>What quests await you, {player.name}?</h1>
        <p className="subtitle">
          Brain dump everything on your mind. Every task, every goal, every idea.
          <br />
          Don't worry about organizing yet - just get it all out!
        </p>

        <form onSubmit={handleSubmit} className="capture-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's on your mind?"
            autoFocus
          />
          <button type="submit" disabled={!input.trim()}>
            Add Quest
          </button>
        </form>

        {inboxQuests.length > 0 && (
          <div className="quest-list">
            <h3>Captured Quests ({inboxQuests.length})</h3>
            <ul>
              {inboxQuests.map((quest) => (
                <li key={quest.id}>
                  <span className="quest-icon">📝</span>
                  {quest.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {inboxQuests.length > 0 && (
          <div className="action-section">
            <p className="hint">
              Got everything? Great! Let's organize these into epic quests.
            </p>
            <button className="btn-primary" onClick={onContinue}>
              Continue to Quest Processing ({inboxQuests.length} quests)
            </button>
          </div>
        )}

        {inboxQuests.length === 0 && (
          <div className="empty-state">
            <p>Your quest log is empty. Start by adding your first quest above!</p>
          </div>
        )}
      </div>
    </div>
  )
}
