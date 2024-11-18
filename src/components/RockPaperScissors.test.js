import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RockPaperScissors from './RockPaperScissors';

test('renders RockPaperScissors component', () => {
  const { getByText } = render(<RockPaperScissors mode="single" onBackToHome={() => {}} />);
  expect(getByText(/Piedra/i)).toBeInTheDocument();
});

test('handles choice click correctly', () => {
  const { getByText, getAllByText } = render(<RockPaperScissors mode="single" onBackToHome={() => {}} />);
  fireEvent.click(getByText('Piedra'));
  const player1Elements = getAllByText(/Jugador 1/i);
  expect(player1Elements.length).toBeGreaterThan(0);
});