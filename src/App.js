import React, { useState } from 'react';
import Home from './components/Home';
import HomeRock from './components/HomeRock';
import GuessNumber from './components/GuessNumber';
import MemoryGame from './components/MemoryGame';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import RockPaperScissors from './components/RockPaperScissors';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [gameMode, setGameMode] = useState(null);

  const handleBackToHome = () => {
    setGame(null);
    setGameMode(null);
  };

  return (
    <div className="App">
      {!game && <Home setGame={setGame} />}
      {game === 'calculator' && <Calculator onBackToHome={handleBackToHome} />}
      {game === 'tic-tac-toe' && <TicTacToe onBackToHome={handleBackToHome} />}
      {game === 'rock-paper-scissors' && !gameMode && <HomeRock setGameMode={setGameMode} onBackToHome={handleBackToHome} />}
      {game === 'rock-paper-scissors' && gameMode && <RockPaperScissors mode={gameMode} onBackToHome={handleBackToHome} />}
      {game === 'guess-number' && <GuessNumber onBackToHome={handleBackToHome} />}
      {game === 'memory-game' && <MemoryGame onBackToHome={handleBackToHome} />}
    </div>
  );
}

export default App;