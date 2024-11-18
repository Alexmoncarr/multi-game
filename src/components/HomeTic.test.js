import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomeTic from './HomeTic';

test('renders HomeTic component', () => {
  const { getByText } = render(<HomeTic setGameMode={() => {}} />);
  expect(getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test('handles button click correctly', () => {
  const setGameMode = jest.fn();
  const { getByText } = render(<HomeTic setGameMode={setGameMode} />);
  fireEvent.click(getByText('Single Player (Medium)'));
  expect(setGameMode).toHaveBeenCalledWith({ mode: 'single', difficulty: 'medium' });
});