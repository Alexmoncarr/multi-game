import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Board from '../Board';

describe('Board Component', () => {
  const mockOnBackToHome = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the board with initial status', () => {
    render(<Board isSinglePlayer={false} difficulty="easy" onBackToHome={mockOnBackToHome} />);
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });

  test('handles square click and updates state', () => {
    render(<Board isSinglePlayer={false} difficulty="easy" onBackToHome={mockOnBackToHome} />);
    const firstSquare = screen.getAllByRole('button')[0];
    fireEvent.click(firstSquare);
    expect(screen.getByText(/Next player: O/i)).toBeInTheDocument();
  });

  test('does not allow clicking on already filled squares', () => {
    render(<Board isSinglePlayer={false} difficulty="easy" onBackToHome={mockOnBackToHome} />);
    const firstSquare = screen.getAllByRole('button')[0];
    fireEvent.click(firstSquare);
    fireEvent.click(firstSquare); // Click again on the same square
    expect(screen.getByText(/Next player: O/i)).toBeInTheDocument();
  });

  test('declares winner when player X wins', () => {
    const { rerender } = render(<Board isSinglePlayer={false} difficulty="easy" onBackToHome={mockOnBackToHome} />);
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[3]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[6]); // X
    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  });

  test('declares a draw when all squares are filled without a winner', () => {
    const { rerender } = render(<Board isSinglePlayer={false} difficulty="easy" onBackToHome={mockOnBackToHome} />);
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[2]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[4]); // X
    fireEvent.click(squares[5]); // O
    fireEvent.click(squares[6]); // X
    fireEvent.click(squares[7]); // O
    fireEvent.click(squares[8]); // X
    expect(screen.getByText(/Draw!/i)).toBeInTheDocument();
  });

  test('calls onBackToHome when back button is clicked', () => {
    render(<Board isSinglePlayer={false} difficulty="easy" onBackToHome={mockOnBackToHome} />);
    const backButton = screen.getByRole('button', { name: /Back to Home/i });
    fireEvent.click(backButton);
    expect(mockOnBackToHome).toHaveBeenCalledTimes(1);
  });

  test('computes the best move in single player mode', () => {
    render(<Board isSinglePlayer={true} difficulty="hard" onBackToHome={mockOnBackToHome} />);
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]); // X
    expect(screen.getByText(/Next player: O/i)).toBeInTheDocument(); // O should take a turn
  });

  test('handles reset after a draw', async () => {
    jest.useFakeTimers();
    const { rerender } = render(<Board isSinglePlayer={false} difficulty="easy" onBackToHome={mockOnBackToHome} />);
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[2]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[4]); // X
    fireEvent.click(squares[5]); // O
    fireEvent.click(squares[6]); // X
    fireEvent.click(squares[7]); // O
    fireEvent.click(squares[8]); // X
    expect(screen.getByText(/Draw!/i)).toBeInTheDocument();
    jest.advanceTimersByTime(2000); // Advance time to trigger reset
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument(); // Board resets
    jest.useRealTimers();
  });

  test('does not allow player to click after game over', () => {
    render(<Board isSinglePlayer={false} difficulty="easy" onBackToHome={mockOnBackToHome} />);
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[3]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[6]); // X
    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
    fireEvent.click(squares[2]); // Attempt to click on a square after game over
    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument(); // Should still show the winner
  });

  test('correctly evaluates the squares', () => {
    const squares = [null, 'X', 'X', 'O', 'O', 'X', 'X', null, null];
    const board = new Board({ isSinglePlayer: false, difficulty: 'easy', onBackToHome: mockOnBackToHome });
    expect(board.evaluate(squares)).toBe(-10); // X is winning
  });

  test('finds a random move', () => {
    const squares = [null, 'X', 'O', null, 'O', null, 'X', null, null];
    const board = new Board({ isSinglePlayer: true, difficulty: 'easy', onBackToHome: mockOnBackToHome });
    const randomMove = board.findRandomMove(squares);
    expect([0, 3, 5, 7, 8]).toContain(randomMove); // Should return one of the empty squares
  });
});
