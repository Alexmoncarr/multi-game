/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Home from './components/Home';
import HomeRock from './components/HomeRock';
import GuessNumber from './components/GuessNumber';
import MemoryGame from './components/MemoryGame';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import RockPaperScissors from './components/RockPaperScissors';
import './App.css';
import Welcome from './components/Welcome';

function App() {
  const [game, setGame] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [started, setStarted] = useState(false);

  const handleBackToHome = () => {
    setGame(null);
    setGameMode(null);
  };

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="App">
      {!started ? (
        <Welcome onStart={handleStart} />
      ) : (
        <>
          {!game ? (
            <Home setGame={setGame} />
          ) : game === 'calculator' ? (
            <Calculator onBackToHome={handleBackToHome} />
          ) : game === 'tic-tac-toe' ? (
            <TicTacToe onBackToHome={handleBackToHome} />
          ) : game === 'rock-paper-scissors' ? (
            <RockPaperScissors onBackToHome={handleBackToHome} />
          ) : game === 'guess-number' ? (
            <GuessNumber onBackToHome={handleBackToHome} />
          ) : game === 'memory-game' ? (
            <MemoryGame onBackToHome={handleBackToHome} />
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;