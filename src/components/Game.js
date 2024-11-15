import React from 'react';
import Board from './Board';

function Game({ mode, difficulty, onBackToHome }) {
  const isSinglePlayer = mode === 'single';

  return (
    <div className="game">
      <h2>{isSinglePlayer ? `Single Player (${difficulty})` : 'Two Players'}</h2>
      <Board isSinglePlayer={isSinglePlayer} difficulty={difficulty} onBackToHome={onBackToHome} />
    </div>
  );
}

export default Game;