import React, { useState } from 'react';
import Game from './Game';
import Home from './HomeTic';

function TicTacToe({ onBackToHome }) {
  const [gameMode, setGameMode] = useState(null);

  const handleBackToHome = () => {
    setGameMode(null);
    onBackToHome();
  };

  return (
    <div className="App">
      {gameMode ? (
        <Game mode={gameMode.mode} difficulty={gameMode.difficulty} onBackToHome={handleBackToHome} />
      ) : (
        <Home setGameMode={setGameMode} />
      )}
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default TicTacToe;