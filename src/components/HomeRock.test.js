import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomeRock from './HomeRock';

test('renders HomeRock component', () => {
  const { getByText } = render(<HomeRock setGameMode={() => {}} onBackToHome={() => {}} />);
  expect(getByText(/Piedra, Papel, Tijera/i)).toBeInTheDocument();
});

test('handles button click correctly', () => {
  const setGameMode = jest.fn();
  const { getByText } = render(<HomeRock setGameMode={setGameMode} onBackToHome={() => {}} />);
  fireEvent.click(getByText('Un Jugador'));
  expect(setGameMode).toHaveBeenCalledWith('single');
});