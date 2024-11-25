/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomeRock from '../HomeRock';

describe('HomeRock Component', () => {
  let setGameModeMock;
  let onBackToHomeMock;

  beforeEach(() => {
    setGameModeMock = jest.fn();
    onBackToHomeMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component correctly', () => {
    const { getByText } = render(<HomeRock setGameMode={setGameModeMock} onBackToHome={onBackToHomeMock} />);

    expect(getByText('Piedra, Papel, Tijera')).toBeInTheDocument();
    expect(getByText('Un Jugador')).toBeInTheDocument();
    expect(getByText('Dos Jugadores')).toBeInTheDocument();
    expect(getByText('Back to Home')).toBeInTheDocument();
  });

  test('calls setGameMode with "single" when Un Jugador button is clicked', () => {
    const { getByText } = render(<HomeRock setGameMode={setGameModeMock} onBackToHome={onBackToHomeMock} />);

    fireEvent.click(getByText('Un Jugador'));

    expect(setGameModeMock).toHaveBeenCalledWith('single');
    expect(setGameModeMock).toHaveBeenCalledTimes(1);
  });

  test('calls setGameMode with "multi" when Dos Jugadores button is clicked', () => {
    const { getByText } = render(<HomeRock setGameMode={setGameModeMock} onBackToHome={onBackToHomeMock} />);

    fireEvent.click(getByText('Dos Jugadores'));

    expect(setGameModeMock).toHaveBeenCalledWith('multi');
    expect(setGameModeMock).toHaveBeenCalledTimes(1);
  });

  test('calls onBackToHome when Back to Home button is clicked', () => {
    const { getByText } = render(<HomeRock setGameMode={setGameModeMock} onBackToHome={onBackToHomeMock} />);

    fireEvent.click(getByText('Back to Home'));

    expect(onBackToHomeMock).toHaveBeenCalledTimes(1);
  });

  test('does not call setGameMode or onBackToHome when other areas are clicked', () => {
    const { container } = render(<HomeRock setGameMode={setGameModeMock} onBackToHome={onBackToHomeMock} />);

    fireEvent.click(container); // Clicking on the container, not a button

    expect(setGameModeMock).not.toHaveBeenCalled();
    expect(onBackToHomeMock).not.toHaveBeenCalled();
  });
});
