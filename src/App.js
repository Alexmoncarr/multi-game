import React, { useState } from 'react';
import Home from './components/Home';
import HomeRock from './components/HomeRock';
import GuessNumber from './components/GuessNumber';
import MemoryGame from './components/MemoryGame';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  const [game, setGame] = useState(null);

  const handleBackToHome = () => {
    setGame(null);
  };

  return (
    <div className="App">
      {!game && <Home setGame={setGame} />}
      {game === 'calculator' && <Calculator onBackToHome={handleBackToHome} />}
      {game === 'tic-tac-toe' && <TicTacToe onBackToHome={handleBackToHome} />}
      {game === 'rock-paper-scissors' && <HomeRock onBackToHome={handleBackToHome} />}
      {game === 'guess-number' && <GuessNumber onBackToHome={handleBackToHome} />}
      {game === 'memory-game' && <MemoryGame onBackToHome={handleBackToHome} />}
    </div>
  );
}

export default App;