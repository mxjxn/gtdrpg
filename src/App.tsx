import { useGameState } from './useGameState'
import { CharacterCreation } from './CharacterCreation'
import { GoalCapture } from './GoalCapture'
import { QuestProcessing } from './QuestProcessing'
import { Dashboard } from './Dashboard'
import './App.css'

function App() {
  const {
    state,
    createCharacter,
    addQuest,
    processQuest,
    completeQuest,
    navigateTo,
    completeOnboarding,
    resetGame,
  } = useGameState()

  // Render appropriate screen based on state
  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'character-creation':
        return <CharacterCreation onCreateCharacter={createCharacter} />

      case 'goal-capture':
        return (
          <GoalCapture
            player={state.player}
            quests={state.quests}
            onAddQuest={addQuest}
            onContinue={() => navigateTo('quest-processing')}
          />
        )

      case 'quest-processing':
        return (
          <QuestProcessing
            quests={state.quests}
            onProcessQuest={processQuest}
            onComplete={completeOnboarding}
          />
        )

      case 'dashboard':
        return (
          <Dashboard
            player={state.player}
            quests={state.quests}
            onCompleteQuest={completeQuest}
          />
        )

      default:
        return <div>Unknown screen</div>
    }
  }

  return (
    <div className="app">
      {renderScreen()}

      {/* Debug reset button - remove in production */}
      {state.currentScreen === 'dashboard' && (
        <button
          onClick={resetGame}
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 0, 0, 0.2)',
            border: '1px solid rgba(255, 0, 0, 0.5)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            color: '#fff',
          }}
        >
          Reset Game
        </button>
      )}
    </div>
  )
}

export default App
