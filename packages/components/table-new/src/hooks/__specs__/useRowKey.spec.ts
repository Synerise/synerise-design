import { renderHook } from '@testing-library/react';

import { useRowKey } from '../useRowKey';

describe('useRowKey', () => {
  it('should use function rowKey', () => {
    const rowKeyFn = (row: { id: string }) => row.id;
    const { result } = renderHook(() => useRowKey(rowKeyFn));
    expect(result.current.getRowKey({ id: 'abc' }, 0)).toBe('abc');
  });

  it('should use string rowKey to access property', () => {
    const { result } = renderHook(() => useRowKey<{ name: string }>('name'));
    expect(result.current.getRowKey({ name: 'John' }, 0)).toBe('John');
  });

  it('should fallback to row.key when no rowKey provided', () => {
    const { result } = renderHook(() => useRowKey(undefined));
    expect(result.current.getRowKey({ key: 'k1' } as any, 0)).toBe('k1');
  });

  it('should fallback to row.id when no rowKey and no key', () => {
    const { result } = renderHook(() => useRowKey(undefined));
    expect(result.current.getRowKey({ id: 'i1' } as any, 0)).toBe('i1');
  });

  it('should generate index-based id when no key found', () => {
    const { result } = renderHook(() => useRowKey(undefined));
    const key = result.current.getRowKey({} as any, 5);
    expect(key).toBe('5');
  });
});
