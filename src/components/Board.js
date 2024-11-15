import React, { useState, useEffect, useCallback } from 'react';
import Square from './Square';

function Board({ isSinglePlayer, difficulty, onBackToHome }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = useCallback((i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }, [squares, xIsNext]);

  const findBestMove = useCallback((squares) => {
    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        let moveVal = minimax(squares, 0, false);
        squares[i] = null;

        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;
  }, []);

  useEffect(() => {
    if (isSinglePlayer && !xIsNext) {
      const bestMove = difficulty === 'hard' ? findBestMove(squares) : findRandomMove(squares);
      handleClick(bestMove);
    }
  }, [xIsNext, isSinglePlayer, difficulty, squares, findBestMove, handleClick]);

  useEffect(() => {
    if (!calculateWinner(squares) && !isMovesLeft(squares)) {
      setTimeout(resetBoard, 2000); // Reinicia el tablero después de 2 segundos
    }
  }, [squares]);

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!isMovesLeft(squares)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function minimax(squares, depth, isMax) {
    let score = evaluate(squares);

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (isMovesLeft(squares) === false) return 0;

    if (isMax) {
      let best = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          best = Math.max(best, minimax(squares, depth + 1, !isMax));
          squares[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          best = Math.min(best, minimax(squares, depth + 1, !isMax));
          squares[i] = null;
        }
      }
      return best;
    }
  }

  function evaluate(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] === 'O') return 10;
        else if (squares[a] === 'X') return -10;
      }
    }
    return 0;
  }

  function isMovesLeft(squares) {
    return squares.includes(null);
  }

  function findRandomMove(squares) {
    const emptySquares = squares.map((square, index) => square === null ? index : null).filter(val => val !== null);
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }
}

export default Board;