/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../Home'; // Adjust the import based on your file structure

describe('Home Component', () => {
  let setGameModeMock;

  beforeEach(() => {
    setGameModeMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component correctly', () => {
    const { getByText } = render(<Home setGameMode={setGameModeMock} />);
    expect(getByText(/Welcome to the Game/i)).toBeInTheDocument(); // Adjust based on actual content
  });

  test('calls setGameMode with correct argument when button is clicked', () => {
    const { getByRole } = render(<Home setGameMode={setGameModeMock} />);
    const button = getByRole('button', { name: /Start Game/i }); // Adjust based on actual button text
    fireEvent.click(button);

    expect(setGameModeMock).toHaveBeenCalledWith('gameMode'); // Adjust based on expected argument
    expect(setGameModeMock).toHaveBeenCalledTimes(1);
  });

  test('handles invalid input by not calling setGameMode', () => {
    const { getByRole } = render(<Home setGameMode={setGameModeMock} />);
    const button = getByRole('button', { name: /Invalid Game Mode/i }); // Adjust based on actual button text
    fireEvent.click(button);

    expect(setGameModeMock).not.toHaveBeenCalled();
  });

  test('displays error message on failure', () => {
    const { getByText } = render(<Home setGameMode={setGameModeMock} />);
    const errorMessage = getByText(/An error occurred/i); // Adjust based on actual error message
    expect(errorMessage).toBeInTheDocument();
  });

  test('calls setGameMode with proper error handling', () => {
    const error = new Error('Test Error');
    setGameModeMock.mockImplementation(() => {
      throw error;
    });

    expect(() => {
      const { getByRole } = render(<Home setGameMode={setGameModeMock} />);
      const button = getByRole('button', { name: /Start Game/i });
      fireEvent.click(button);
    }).toThrow('Test Error');

    expect(setGameModeMock).toHaveBeenCalledTimes(1);
  });

  test('checks interaction with external dependencies', () => {
    // Mock an external service if needed
    const externalServiceMock = jest.fn().mockResolvedValue('response');
    const { getByRole } = render(<Home setGameMode={setGameModeMock} />);
    const button = getByRole('button', { name: /Start Game/i });
    fireEvent.click(button);

    expect(externalServiceMock).toHaveBeenCalled();
  });
});
