import { useState } from 'react'
import type { CharacterClass } from './types'
import './CharacterCreation.css'

interface Props {
  onCreateCharacter: (name: string, characterClass: CharacterClass) => void
}

const classes: Array<{
  id: CharacterClass
  name: string
  description: string
  icon: string
}> = [
  {
    id: 'builder',
    name: 'The Builder',
    description: 'Masters of long-term projects and creating lasting impact',
    icon: '🏗️',
  },
  {
    id: 'warrior',
    name: 'The Warrior',
    description: 'Conquers daily battles and maintains powerful habits',
    icon: '⚔️',
  },
  {
    id: 'explorer',
    name: 'The Explorer',
    description: 'Seeks knowledge, growth, and new experiences',
    icon: '🧭',
  },
  {
    id: 'healer',
    name: 'The Healer',
    description: 'Prioritizes wellness, balance, and self-care',
    icon: '💚',
  },
]

export function CharacterCreation({ onCreateCharacter }: Props) {
  const [name, setName] = useState('')
  const [selectedClass, setSelectedClass] = useState<CharacterClass>('builder')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onCreateCharacter(name.trim(), selectedClass)
    }
  }

  return (
    <div className="character-creation">
      <div className="creation-content">
        <h1>Begin Your Quest</h1>
        <p className="subtitle">
          Welcome, hero! Your journey to mastering productivity begins here.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label htmlFor="hero-name">What shall we call you?</label>
            <input
              id="hero-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your hero name..."
              autoFocus
              required
            />
          </div>

          <div className="form-section">
            <label>Choose your path:</label>
            <div className="class-grid">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  type="button"
                  className={`class-card ${selectedClass === cls.id ? 'selected' : ''}`}
                  onClick={() => setSelectedClass(cls.id)}
                >
                  <div className="class-icon">{cls.icon}</div>
                  <div className="class-name">{cls.name}</div>
                  <div className="class-description">{cls.description}</div>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={!name.trim()}>
            Begin Your Journey
          </button>
        </form>
      </div>
    </div>
  )
}
