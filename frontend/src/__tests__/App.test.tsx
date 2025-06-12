import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';

vi.mock('../routes', () => ({
  default: () => <div>Mocked App Routes</div>,
}));

import React from 'react';

vi.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: React.PropsWithChildren<object>) => <div>{children}</div>,
}));

vi.mock('../contexts/MovieContext', () => ({
  MovieProvider: ({ children }: React.PropsWithChildren<object>) => <div>{children}</div>,
}));

vi.mock('../styles/GlobalStyle', () => ({
  GlobalStyles: () => <style>{`body { margin: 0; }`}</style>,
}));

describe('App component', () => {
  it('renders AppRoutes correctly', () => {
    render(<App />); // 👈 Sem MemoryRouter aqui
    expect(screen.getByText('Mocked App Routes')).toBeInTheDocument();
  });
});
