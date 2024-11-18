import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RockPaperScissors from './RockPaperScissors';

test('renders RockPaperScissors component', () => {
  const { getByText } = render(<RockPaperScissors mode="single" onBackToHome={() => {}} />);
  expect(getByText(/Piedra/i)).toBeInTheDocument();
});

test('handles choice click correctly', () => {
  const { getByText } = render(<RockPaperScissors mode="single" onBackToHome={() => {}} />);
  fireEvent.click(getByText('Piedra'));
  expect(getByText(/Jugador 1/i)).toBeInTheDocument();
});