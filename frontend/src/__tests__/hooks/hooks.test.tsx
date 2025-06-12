import { renderHook, act, render, fireEvent } from '@testing-library/react';
import React, { useRef } from 'react';
import { test, expect, vi, describe } from 'vitest';
import { useLocalStorage, useClickOutside, useDebounce, useForm } from '../../hooks';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = 'initialValue';
  const mockStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
    });
  });

  beforeEach(() => {
    mockStorage.getItem.mockClear();
    mockStorage.setItem.mockClear();
    mockStorage.removeItem.mockClear();
    mockStorage.getItem.mockReturnValue(null);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('deve inicializar com o valor inicial', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toBe(initialValue);
  });

  test('deve ler do localStorage', () => {
    mockStorage.getItem.mockReturnValue(JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toBe('storedValue');
  });

  test('deve atualizar o localStorage ao definir um valor', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    act(() => {
      result.current[1]('newValue');
    });
    expect(mockStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify('newValue'));
    expect(result.current[0]).toBe('newValue');
  });

  test('deve lidar com função como novo valor', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    act(() => {
      result.current[1](prev => prev + ' updated');
    });
    expect(mockStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify('initialValue updated'));
    expect(result.current[0]).toBe('initialValue updated');
  });

  test('deve lidar com erros no localStorage', () => {
    mockStorage.setItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    act(() => {
      result.current[1]('errorValue');
    });
    expect(mockStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify('errorValue'));
    expect(result.current[0]).toBe('errorValue');
  });

  test('deve retornar o mesmo valor em chamadas subsequentes', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toBe('initialValue');
    act(() => {
      result.current[1]('anotherValue');
    });
    expect(result.current[0]).toBe('anotherValue');
  });
});

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null!);
  useClickOutside(ref, onOutsideClick);

  return (
    <div>
      <div data-testid="inside" ref={ref}>
        Dentro
      </div>
      <div data-testid="outside">Fora</div>
    </div>
  );
}

test('chama callback ao clicar fora do elemento', () => {
  const callback = vi.fn();
  const { getByTestId } = render(<TestComponent onOutsideClick={callback} />);
  fireEvent.mouseDown(getByTestId('outside'));
  expect(callback).toHaveBeenCalled();
});

test('não chama callback ao clicar dentro do elemento', () => {
  const callback = vi.fn();
  const { getByTestId } = render(<TestComponent onOutsideClick={callback} />);
  fireEvent.mouseDown(getByTestId('inside'));
  expect(callback).not.toHaveBeenCalled();
});

test('remove event listener ao desmontar', () => {
  const callback = vi.fn();
  const addSpy = vi.spyOn(document, 'addEventListener');
  const removeSpy = vi.spyOn(document, 'removeEventListener');
  const { unmount } = render(<TestComponent onOutsideClick={callback} />);
  expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  unmount();
  expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  addSpy.mockRestore();
  removeSpy.mockRestore();
});

describe('useDebounce', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('value', 500));
    expect(result.current).toBe('value');
  });

  test('should debounce value update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated');
  });
});

describe('useForm', () => {
  const initialValues = { name: '', email: '' };

  test('should initialize form with initial values', () => {
    const { result } = renderHook(() => useForm(initialValues, vi.fn()));
    expect(result.current.values).toEqual(initialValues);
  });

  test('should handle field change', () => {
    const { result } = renderHook(() => useForm(initialValues, vi.fn()));
    act(() => {
      result.current.handleChange('name', 'John');
    });
    expect(result.current.values.name).toBe('John');
  });

  test('should call onSubmit with current values', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm(initialValues, onSubmit));
    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    act(() => {
      result.current.handleChange('email', 'john@example.com');
    });
    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });
    expect(onSubmit).toHaveBeenCalledWith({ name: '', email: 'john@example.com' });
  });

  test('should reset form to initial values', () => {
    const { result } = renderHook(() => useForm(initialValues, vi.fn()));
    act(() => {
      result.current.handleChange('name', 'Jane');
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.values).toEqual(initialValues);
  });

  test('should set field error', () => {
    const { result } = renderHook(() => useForm(initialValues, vi.fn()));
    act(() => {
      result.current.setFieldError('email', 'Email inválido');
    });
    expect(result.current.errors.email).toBe('Email inválido');
  });
});
