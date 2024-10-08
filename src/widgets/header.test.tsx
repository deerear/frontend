import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import Header from './header';

test('renders the header', () => {
  render(<Header />);
  const headerElement = screen.getByText(/My App/i);
  expect(headerElement).toBeInTheDocument();
});
