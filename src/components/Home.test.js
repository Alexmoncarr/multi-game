import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from './Home';

test('renders Home component', () => {
  const { getByText } = render(<Home setGame={() => {}} />);
  expect(getByText(/Selecciona un Juego/i)).toBeInTheDocument();
});

test('handles button click correctly', () => {
  const setGame = jest.fn();
  const { getByText } = render(<Home setGame={setGame} />);
  fireEvent.click(getByText('Calculadora'));
  expect(setGame).toHaveBeenCalledWith('calculator');
});