import type { Player, Quest } from './types'
import './Dashboard.css'

interface Props {
  player: Player
  quests: Quest[]
  onCompleteQuest: (questId: string) => void
}

export function Dashboard({ player, quests, onCompleteQuest }: Props) {
  const activeQuests = quests.filter((q) => q.status === 'next')
  const completedQuests = quests.filter((q) => q.status === 'completed')
  const somedayQuests = quests.filter((q) => q.status === 'someday')

  const xpPercentage = (player.xp / player.xpToNextLevel) * 100

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* Player Stats Header */}
        <div className="player-header">
          <div className="player-info">
            <h1>{player.name}</h1>
            <p className="player-class">
              Level {player.level} {player.class.charAt(0).toUpperCase() + player.class.slice(1)}
            </p>
          </div>
          <div className="player-stats">
            <div className="stat-item">
              <span className="stat-icon">💰</span>
              <span className="stat-value">{player.gold}</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="xp-section">
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${xpPercentage}%` }} />
          </div>
          <p className="xp-text">
            {player.xp} / {player.xpToNextLevel} XP
          </p>
        </div>

        {/* Active Quests */}
        <section className="quest-section">
          <h2>Active Quests ({activeQuests.length})</h2>
          {activeQuests.length === 0 ? (
            <div className="empty-state">
              <p>No active quests! Time to add some goals to conquer.</p>
            </div>
          ) : (
            <div className="quest-grid">
              {activeQuests.map((quest) => (
                <div key={quest.id} className="quest-item">
                  <div className="quest-header">
                    <h3>{quest.title}</h3>
                    {quest.context && (
                      <span className="quest-context">
                        {quest.context === 'home' && '🏠'}
                        {quest.context === 'work' && '💼'}
                        {quest.context === 'errands' && '🏃'}
                        {quest.context === 'computer' && '💻'}
                        {quest.context === 'anywhere' && '🌍'}
                      </span>
                    )}
                  </div>
                  <div className="quest-footer">
                    <div className="quest-rewards">
                      <span className="reward-item">⭐ {quest.xpReward} XP</span>
                      <span className="reward-item">💰 {quest.goldReward} Gold</span>
                    </div>
                    <button
                      className="btn-complete"
                      onClick={() => onCompleteQuest(quest.id)}
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Completed Quests */}
        {completedQuests.length > 0 && (
          <section className="quest-section">
            <h2>Completed Quests ({completedQuests.length})</h2>
            <div className="completed-list">
              {completedQuests.slice(0, 5).map((quest) => (
                <div key={quest.id} className="completed-item">
                  <span className="check-icon">✓</span>
                  <span className="completed-title">{quest.title}</span>
                  <span className="completed-xp">+{quest.xpReward} XP</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Someday/Maybe */}
        {somedayQuests.length > 0 && (
          <section className="quest-section">
            <details>
              <summary>Someday/Maybe ({somedayQuests.length})</summary>
              <div className="someday-list">
                {somedayQuests.map((quest) => (
                  <div key={quest.id} className="someday-item">
                    {quest.title}
                  </div>
                ))}
              </div>
            </details>
          </section>
        )}
      </div>
    </div>
  )
}
