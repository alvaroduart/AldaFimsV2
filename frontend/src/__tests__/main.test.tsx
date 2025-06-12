import { vi, expect, it } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

let capturedRenderFn: ReturnType<typeof vi.fn>;
let capturedCreateRootFn: ReturnType<typeof vi.fn>;

vi.mock('../App.tsx', () => ({
  default: () => <div data-testid="mock-app-component" />,
}));

vi.mock('react-dom/client', () => {
  capturedRenderFn = vi.fn();
  capturedCreateRootFn = vi.fn(() => ({
    render: capturedRenderFn,
  }));
  return {
    createRoot: capturedCreateRootFn,
  };
});

const mockRootElement = document.createElement('div');
mockRootElement.id = 'root';
document.body.appendChild(mockRootElement);

it('deve renderizar o App dentro do React.StrictMode usando react-dom/client', async () => {
  await import('../main');

  expect(capturedCreateRootFn).toHaveBeenCalledTimes(1);
  expect(capturedCreateRootFn).toHaveBeenCalledWith(mockRootElement);

  expect(capturedRenderFn).toHaveBeenCalledTimes(1);

  const renderArg = capturedRenderFn.mock.calls[0][0];
  expect(renderArg.type).toBe(React.StrictMode);

  render(renderArg);

  expect(screen.getByTestId('mock-app-component')).toBeInTheDocument();
});
