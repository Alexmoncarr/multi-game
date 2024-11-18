import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GuessNumber from './GuessNumber';

test('renders GuessNumber component', () => {
  const { getByText } = render(<GuessNumber onBackToHome={() => {}} />);
  expect(getByText(/Adivina el Número/i)).toBeInTheDocument();
});

test('handles guess input correctly', () => {
  const { getByText, getByRole } = render(<GuessNumber onBackToHome={() => {}} />);
  const input = getByRole('spinbutton');
  fireEvent.change(input, { target: { value: '50' } });
  fireEvent.click(getByText('Adivinar'));
  expect(getByText(/Demasiado/i)).toBeInTheDocument();
});