import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from '../TicTacToe';
import Game from '../Game';
import Home from '../HomeTic';

jest.mock('./Game', () => jest.fn(() => <div>Game Component</div>));
jest.mock('./HomeTic', () => jest.fn(({ setGameMode }) => (
  <div>
    <button onClick={() => setGameMode({ mode: 'singleplayer', difficulty: 'easy' })}>Start Singleplayer</button>
  </div>
)));

describe('TicTacToe Component', () => {
  const mockOnBackToHome = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component when gameMode is null', () => {
    render(<TicTacToe onBackToHome={mockOnBackToHome} />);
    expect(screen.getByText('Start Singleplayer')).toBeInTheDocument();
  });

  test('renders Game component when gameMode is set', () => {
    render(<TicTacToe onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Start Singleplayer'));

    expect(Game).toHaveBeenCalledWith(
      { mode: 'singleplayer', difficulty: 'easy', onBackToHome: expect.any(Function) },
      {}
    );
    expect(screen.getByText('Game Component')).toBeInTheDocument();
  });

  test('calls onBackToHome when back button is clicked', () => {
    render(<TicTacToe onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Start Singleplayer'));

    fireEvent.click(screen.getByText('Back to Home'));

    expect(mockOnBackToHome).toHaveBeenCalledTimes(1);
  });

  test('resets gameMode when back button is clicked', () => {
    render(<TicTacToe onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Start Singleplayer'));

    fireEvent.click(screen.getByText('Back to Home'));

    // After going back, Home component should be rendered again
    expect(screen.getByText('Start Singleplayer')).toBeInTheDocument();
    expect(Game).toHaveBeenCalledTimes(1);
  });

  test('handles multiple back button clicks', () => {
    render(<TicTacToe onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Start Singleplayer'));

    fireEvent.click(screen.getByText('Back to Home'));
    fireEvent.click(screen.getByText('Back to Home'));

    expect(mockOnBackToHome).toHaveBeenCalledTimes(2);
  });
});
