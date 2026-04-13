import { act, renderHook } from '@testing-library/react';

import { useTemporaryLabel } from '../hooks/useTemporaryLabel';

describe('useTemporaryLabel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start with temporaryLabel as false', () => {
    const { result } = renderHook(() => useTemporaryLabel(1000));
    expect(result.current.temporaryLabel).toBe(false);
  });

  it('should reset temporaryLabel after duration', () => {
    const { result } = renderHook(() => useTemporaryLabel(1000));

    act(() => {
      result.current.setTemporaryLabel(true);
    });
    expect(result.current.temporaryLabel).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.temporaryLabel).toBe(false);
  });

  it('should not start timer when temporaryLabel is false', () => {
    const { result } = renderHook(() => useTemporaryLabel(500));
    expect(result.current.temporaryLabel).toBe(false);

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.temporaryLabel).toBe(false);
  });

  it('should respect custom duration', () => {
    const { result } = renderHook(() => useTemporaryLabel(2000));

    act(() => {
      result.current.setTemporaryLabel(true);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.temporaryLabel).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.temporaryLabel).toBe(false);
  });
});
