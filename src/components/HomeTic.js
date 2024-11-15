import React from 'react';

function Home({ setGameMode }) {
  return (
    <div className="home">
      <h1>Tic Tac Toe</h1>
      <button onClick={() => setGameMode({ mode: 'single', difficulty: 'medium' })}>Single Player (Medium)</button>
      <button onClick={() => setGameMode({ mode: 'single', difficulty: 'hard' })}>Single Player (Hard)</button>
      <button onClick={() => setGameMode({ mode: 'multi' })}>Two Players</button>
    </div>
  );
}

export default Home;