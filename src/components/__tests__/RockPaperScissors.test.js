import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RockPaperScissors from '../RockPaperScissors';

describe('RockPaperScissors Component', () => {
  const mockOnBackToHome = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly in single player mode', () => {
    render(<RockPaperScissors mode="single" onBackToHome={mockOnBackToHome} />);
    expect(screen.getByText('Un Jugador')).toBeInTheDocument();
    expect(screen.getByText('Piedra')).toBeInTheDocument();
    expect(screen.getByText('Papel')).toBeInTheDocument();
    expect(screen.getByText('Tijera')).toBeInTheDocument();
  });

  test('renders correctly in two player mode', () => {
    render(<RockPaperScissors mode="multi" onBackToHome={mockOnBackToHome} />);
    expect(screen.getByText('Dos Jugadores')).toBeInTheDocument();
  });

  test('handles player choice in single player mode', () => {
    render(<RockPaperScissors mode="single" onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Piedra'));

    expect(screen.getByText('Jugador 1: Piedra')).toBeInTheDocument();
    expect(screen.getByText('Resultado:')).toBeInTheDocument();
  });

  test('handles player choices in two player mode', () => {
    render(<RockPaperScissors mode="multi" onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Piedra'));
    fireEvent.click(screen.getByText('Papel'));

    expect(screen.getByText('Jugador 1: Piedra')).toBeInTheDocument();
    expect(screen.getByText('Jugador 2: Papel')).toBeInTheDocument();
    expect(screen.getByText('Resultado: Jugador 2 Gana')).toBeInTheDocument();
  });

  test('resets game state on reset button click', () => {
    render(<RockPaperScissors mode="multi" onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Piedra'));
    fireEvent.click(screen.getByText('Papel'));

    expect(screen.getByText('Resultado: Jugador 2 Gana')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Jugar de Nuevo'));

    expect(screen.queryByText('Resultado: Jugador 2 Gana')).not.toBeInTheDocument();
    expect(screen.queryByText('Jugador 1:')).not.toBeInTheDocument();
    expect(screen.queryByText('Jugador 2:')).not.toBeInTheDocument();
  });

  test('calls onBackToHome when back button is clicked', () => {
    render(<RockPaperScissors mode="single" onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Back to Home'));

    expect(mockOnBackToHome).toHaveBeenCalled();
  });

  test('handles tie situation in multi-player mode', () => {
    render(<RockPaperScissors mode="multi" onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Piedra'));
    fireEvent.click(screen.getByText('Piedra'));

    expect(screen.getByText('Resultado: Empate')).toBeInTheDocument();

    // Wait for the reset after 2 seconds
    jest.advanceTimersByTime(2000);

    expect(screen.queryByText('Resultado: Empate')).not.toBeInTheDocument();
  });

  test('handles tie situation in single-player mode', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // Mocking AI choice to be 'Piedra'

    render(<RockPaperScissors mode="single" onBackToHome={mockOnBackToHome} />);

    fireEvent.click(screen.getByText('Piedra'));

    expect(screen.getByText('Resultado: Empate')).toBeInTheDocument();

    // Wait for the reset after 2 seconds
    jest.advanceTimersByTime(2000);

    expect(screen.queryByText('Resultado: Empate')).not.toBeInTheDocument();

    global.Math.random.mockRestore();
  });
});
