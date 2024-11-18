import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

test('renders Board component', () => {
  const { getByText } = render(<Board isSinglePlayer={false} difficulty="medium" onBackToHome={() => {}} />);
  expect(getByText(/Next player/i)).toBeInTheDocument();
});

test('handles square click correctly', () => {
  const { getAllByRole } = render(<Board isSinglePlayer={false} difficulty="medium" onBackToHome={() => {}} />);
  const squares = getAllByRole('button');
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent('X');
});