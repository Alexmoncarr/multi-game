import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

test('renders Calculator component', () => {
  const { getByText } = render(<Calculator onBackToHome={() => {}} />);
  expect(getByText(/Calculadora/i)).toBeInTheDocument();
});

test('performs addition correctly', () => {
  const { getByText, container } = render(<Calculator onBackToHome={() => {}} />);
  fireEvent.click(getByText('1'));
  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('2'));
  fireEvent.click(getByText('='));
  const result = container.querySelector('.result');
  expect(result).toHaveTextContent('3');
});