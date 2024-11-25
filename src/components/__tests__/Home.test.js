/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../Home'; // Adjust the import according to your file structure

describe('Home Component', () => {
  let setGameMock;

  beforeEach(() => {
    setGameMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component without crashing', () => {
    const { getByText } = render(<Home setGame={setGameMock} />);
    expect(getByText(/welcome to the game/i)).toBeInTheDocument(); // Adjust based on actual text
  });

  test('calls setGame when the start button is clicked', () => {
    const { getByRole } = render(<Home setGame={setGameMock} />);
    const startButton = getByRole('button', { name: /start game/i }); // Adjust based on actual button text
    fireEvent.click(startButton);
    expect(setGameMock).toHaveBeenCalled();
  });

  test('does not call setGame when the button is not clicked', () => {
    render(<Home setGame={setGameMock} />);
    expect(setGameMock).not.toHaveBeenCalled();
  });

  test('handles unexpected props gracefully', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/welcome to the game/i)).toBeInTheDocument(); // Ensure default behavior
  });

  test('throws error when setGame is not a function', () => {
    expect(() => render(<Home setGame="not-a-function" />)).toThrow();
    expect(() => render(<Home setGame={null} />)).toThrow();
  });

  // Additional tests for edge cases can be added as needed
});
