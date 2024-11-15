import React, { useState, useEffect } from 'react';

const generateCards = () => {
  const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍑', '🍍'];
  const cards = [...symbols, ...symbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({ id: index, symbol, flipped: false, matched: false }));
  return cards;
};

function MemoryGame({ onBackToHome }) {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.symbol === secondCard.symbol) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.symbol === firstCard.symbol ? { ...card, matched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !card.flipped && !card.matched) {
      setCards((prevCards) =>
        prevCards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
      );
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  return (
    <div className="game">
      <h2>Memoria</h2>
      <div className="board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            {card.flipped || card.matched ? card.symbol : '❓'}
          </div>
        ))}
      </div>
      {matchedPairs === cards.length / 2 && (
        <div className="result">
          <p>¡Has encontrado todas las parejas!</p>
          <button onClick={resetGame}>Jugar de Nuevo</button>
        </div>
      )}
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default MemoryGame;