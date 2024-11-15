import React from 'react';

function HomeRock({ setGameMode, onBackToHome }) {
  return (
    <div className="home">
      <h1>Piedra, Papel, Tijera</h1>
      <button onClick={() => setGameMode('single')}>Un Jugador</button>
      <button onClick={() => setGameMode('multi')}>Dos Jugadores</button>
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default HomeRock;