import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import { GameMode } from './types/game';
import './App.css';

function App() {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const handleStartGame = (mode: GameMode, diff: 'easy' | 'medium' | 'hard') => {
    setGameMode(mode);
    setDifficulty(diff);
  };

  const handleBackToMenu = () => {
    setGameMode(null);
  };

  return (
    <div className="app">
      {gameMode === null ? (
        <MainMenu onStartGame={handleStartGame} />
      ) : (
        <Game
          mode={gameMode}
          difficulty={difficulty}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;

