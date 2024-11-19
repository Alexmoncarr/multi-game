import React from 'react';

function Home({ setGame }) {
  return (
    <div className="home">
      <h1>Selecciona un Juego</h1>
      <button onClick={() => setGame('calculator')}>Calculadora</button>
      <button onClick={() => setGame('tic-tac-toe')}>Tic-Tac-Toe</button>
      <button onClick={() => setGame('rock-paper-scissors')}>Piedra, Papel, Tijera</button>
      <button onClick={() => setGame('guess-number')}>Adivina el Número</button>
      <button onClick={() => setGame('memory-game')}>Memoria</button>
    </div>
  );
}

export default Home;