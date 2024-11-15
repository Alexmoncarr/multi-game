import React, { useState } from 'react';

function GuessNumber({ onBackToHome }) {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const guessNumber = parseInt(guess, 10);
    if (guessNumber < targetNumber) {
      setMessage('Demasiado bajo');
    } else if (guessNumber > targetNumber) {
      setMessage('Demasiado alto');
    } else {
      setMessage('¡Correcto! Has adivinado el número.');
    }
  };

  const handleReset = () => {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setMessage('');
  };

  return (
    <div className="game">
      <h2>Adivina el Número</h2>
      <p>Introduce un número entre 1 y 100:</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleGuess}>Adivinar</button>
      <p>{message}</p>
      <button onClick={handleReset}>Reiniciar</button>
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default GuessNumber;