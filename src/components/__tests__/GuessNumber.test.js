/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GuessNumber from '../GuessNumber';

describe('GuessNumber Component', () => {
  let onBackToHomeMock;

  beforeEach(() => {
    onBackToHomeMock = jest.fn();
    render(<GuessNumber onBackToHome={onBackToHomeMock} />);
  });

  test('renders correctly', () => {
    expect(screen.getByText(/Adivina el Número/i)).toBeInTheDocument();
    expect(screen.getByText(/Introduce un número entre 1 y 100:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adivinar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reiniciar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back to Home/i })).toBeInTheDocument();
  });

  test('handles correct guess', () => {
    const targetNumber = 50; // This value would ideally be set via a mock or by controlling the random number generator.
    jest.spyOn(Math, 'random').mockReturnValue(0.5); // Mocking the random number generation for predictability
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /Adivinar/i }));
    expect(screen.getByText('¡Correcto! Has adivinado el número.')).toBeInTheDocument();
  });

  test('handles too low guess', () => {
    const targetNumber = 50;
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '30' } });
    fireEvent.click(screen.getByRole('button', { name: /Adivinar/i }));
    expect(screen.getByText('Demasiado bajo')).toBeInTheDocument();
  });

  test('handles too high guess', () => {
    const targetNumber = 50;
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '70' } });
    fireEvent.click(screen.getByRole('button', { name: /Adivinar/i }));
    expect(screen.getByText('Demasiado alto')).toBeInTheDocument();
  });

  test('resets the game correctly', () => {
    const targetNumber = 50;
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /Adivinar/i }));
    expect(screen.getByText('¡Correcto! Has adivinado el número.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Reiniciar/i }));
    expect(screen.getByRole('textbox').value).toBe('');
    expect(screen.queryByText('¡Correcto! Has adivinado el número.')).not.toBeInTheDocument();
  });

  test('calls onBackToHome when Back to Home button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Back to Home/i }));
    expect(onBackToHomeMock).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
