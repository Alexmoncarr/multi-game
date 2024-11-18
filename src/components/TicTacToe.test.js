import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';

test('renders TicTacToe component', () => {
  const { getByText } = render(<TicTacToe onBackToHome={() => {}} />);
  expect(getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test('handles square click correctly', () => {
  const { getByText, getAllByRole } = render(<TicTacToe onBackToHome={() => {}} />);
  fireEvent.click(getByText('Single Player (Medium)'));
  const squares = getAllByRole('button');
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent('X');
});