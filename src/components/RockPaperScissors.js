import React, { useState, useEffect } from 'react';

function RockPaperScissors({ mode, onBackToHome }) {
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = ['Piedra', 'Papel', 'Tijera'];

  const handleChoice = (choice) => {
    if (mode === 'single') {
      const aiChoice = choices[Math.floor(Math.random() * choices.length)];
      setPlayer1Choice(choice);
      setPlayer2Choice(aiChoice);
      setResult(determineWinner(choice, aiChoice));
    } else {
      if (!player1Choice) {
        setPlayer1Choice(choice);
      } else {
        setPlayer2Choice(choice);
        setResult(determineWinner(player1Choice, choice));
      }
    }
  };

  const determineWinner = (choice1, choice2) => {
    if (choice1 === choice2) return 'Empate';
    if (
      (choice1 === 'Piedra' && choice2 === 'Tijera') ||
      (choice1 === 'Papel' && choice2 === 'Piedra') ||
      (choice1 === 'Tijera' && choice2 === 'Papel')
    ) {
      return 'Jugador 1 Gana';
    } else {
      return 'Jugador 2 Gana';
    }
  };

  const resetGame = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult(null);
  };

  useEffect(() => {
    if (result === 'Empate') {
      const timer = setTimeout(resetGame, 2000); // Reinicia el juego después de 2 segundos
      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [result]);

  return (
    <div className="game">
      <h2>{mode === 'single' ? 'Un Jugador' : 'Dos Jugadores'}</h2>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {result && (
        <div className="result">
          <p>Jugador 1: {player1Choice}</p>
          <p>Jugador 2: {player2Choice}</p>
          <p>Resultado: {result}</p>
          <button onClick={resetGame}>Jugar de Nuevo</button>
        </div>
      )}
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default RockPaperScissors;