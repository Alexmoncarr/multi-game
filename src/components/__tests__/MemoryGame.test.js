/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-wait-for-side-effects */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import MemoryGame from '../MemoryGame';

jest.mock('./path/to/your/useEffectDependency', () => ({
  // Mock any dependencies here if there are any
}));

describe('MemoryGame Component', () => {
  const mockOnBackToHome = jest.fn();

  beforeEach(() => {
    render(<MemoryGame onBackToHome={mockOnBackToHome} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders MemoryGame component', () => {
    expect(screen.getByText(/Memoria/i)).toBeInTheDocument();
    expect(screen.getByText(/❓/)).toBeInTheDocument();
  });

  test('flips a card when clicked', () => {
    const firstCard = screen.getAllByText(/❓/)[0];
    fireEvent.click(firstCard);
    expect(firstCard).not.toHaveTextContent('❓');
  });

  test('matches pairs of cards', async () => {
    const cards = screen.getAllByText(/❓/);
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    await waitFor(() => {
      expect(screen.getByText(/¡Has encontrado todas las parejas!/i)).toBeInTheDocument();
    });
  });

  test('does not match different pairs', async () => {
    const cards = screen.getAllByText(/❓/);
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    await waitFor(() => {
      fireEvent.click(cards[2]);
      fireEvent.click(cards[3]);
      expect(screen.queryByText(/¡Has encontrado todas las parejas!/i)).not.toBeInTheDocument();
    });
  });

  test('resets the game', async () => {
    const cards = screen.getAllByText(/❓/);
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    await waitFor(() => {
      expect(screen.getByText(/¡Has encontrado todas las parejas!/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Jugar de Nuevo/i));
    expect(screen.queryByText(/¡Has encontrado todas las parejas!/i)).not.toBeInTheDocument();
  });

  test('back to home button works', () => {
    fireEvent.click(screen.getByText(/Back to Home/i));
    expect(mockOnBackToHome).toHaveBeenCalledTimes(1);
  });

  test('does not flip a card if it is already matched', () => {
    const cards = screen.getAllByText(/❓/);
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    expect(cards[0]).not.toHaveTextContent('❓');
    expect(cards[1]).not.toHaveTextContent('❓');

    fireEvent.click(cards[0]); // trying to flip again
    expect(cards[0]).not.toHaveTextContent('❓');
  });

  test('does not flip a card if two cards are already flipped', () => {
    const cards = screen.getAllByText(/❓/);
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    const thirdCard = cards[2];
    fireEvent.click(thirdCard); // trying to flip the third card

    expect(thirdCard).toHaveTextContent('❓'); // it should not be flipped
  });
});
