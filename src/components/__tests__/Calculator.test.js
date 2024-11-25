/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../Calculator';
import { evaluate } from 'mathjs';

jest.mock('mathjs');

describe('Calculator Component', () => {
  const onBackToHomeMock = jest.fn();

  beforeEach(() => {
    render(<Calculator onBackToHome={onBackToHomeMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders calculator with initial state', () => {
    expect(screen.getByText(/Calculadora/i)).toBeInTheDocument();
    expect(screen.getByText('')).toBeInTheDocument(); // input display
    expect(screen.getByText('')).toBeInTheDocument(); // result display
  });

  test('handles input button clicks', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));

    expect(screen.getByText('1+2')).toBeInTheDocument();
  });

  test('calculates result correctly', () => {
    evaluate.mockReturnValue(3);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    expect(evaluate).toHaveBeenCalledWith('1+2');
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('displays error on invalid calculation', () => {
    evaluate.mockImplementation(() => { throw new Error('Invalid calculation'); });

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('a')); // invalid input
    fireEvent.click(screen.getByText('='));

    expect(evaluate).toHaveBeenCalledWith('1+a');
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('clears input and result on clear button click', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('C'));

    expect(screen.getByText('')).toBeInTheDocument(); // input cleared
    expect(screen.getByText('')).toBeInTheDocument(); // result cleared
  });

  test('calls back function when back button is clicked', () => {
    fireEvent.click(screen.getByText(/Back to Home/i));

    expect(onBackToHomeMock).toHaveBeenCalledTimes(1);
  });
});