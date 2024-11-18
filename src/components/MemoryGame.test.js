import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MemoryGame from './MemoryGame';

test('renders MemoryGame component', () => {
  const { getByText } = render(<MemoryGame onBackToHome={() => {}} />);
  expect(getByText(/Memoria/i)).toBeInTheDocument();
});

test('handles card click correctly', () => {
  const { container } = render(<MemoryGame onBackToHome={() => {}} />);
  const cards = container.querySelectorAll('.card');
  fireEvent.click(cards[0]);
  expect(cards[0]).toHaveClass('flipped');
});