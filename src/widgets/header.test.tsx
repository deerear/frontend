import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';

describe('Header Component', () => {
  it('renders the Header component', () => {
    render(<Header />);

    const headerElement = screen.getByText(/Header/i);
    expect(headerElement).toBeInTheDocument();
  });
});
