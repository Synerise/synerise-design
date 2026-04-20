import { act, renderHook } from '@testing-library/react';

import { useTableHighlight } from '../useTableHighlight';

const HIGHLIGHT_CLASS = 'ds-table-row-highlight';

const makeContainerWithRow = (dataAttr: 'data-key' | 'data-row-key', key: string) => {
  const container = document.createElement('div');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const row = document.createElement('tr');
  row.setAttribute(dataAttr, key);
  tbody.appendChild(row);
  table.appendChild(tbody);
  container.appendChild(table);
  document.body.appendChild(container);
  return { container, row };
};

describe('useTableHighlight', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does nothing when container ref is null', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useTableHighlight(ref));
    expect(() => result.current.highlightRow('1')).not.toThrow();
  });

  it('adds highlight class and custom duration CSS var to matched row', () => {
    const { container, row } = makeContainerWithRow('data-key', 'row-1');
    const ref = { current: container };
    const { result } = renderHook(() => useTableHighlight(ref));

    act(() => {
      result.current.highlightRow('row-1', { duration: 1200 });
    });

    expect(row.classList.contains(HIGHLIGHT_CLASS)).toBe(true);
    expect(row.style.getPropertyValue('--ds-highlight-duration')).toBe('1200ms');
  });

  it('falls back to default duration when options omitted', () => {
    const { container, row } = makeContainerWithRow('data-row-key', 'row-2');
    const ref = { current: container };
    const { result } = renderHook(() => useTableHighlight(ref));

    act(() => {
      result.current.highlightRow('row-2');
    });

    expect(row.style.getPropertyValue('--ds-highlight-duration')).toBe('600ms');
  });

  it('matches rows by data-row-key selector', () => {
    const { container, row } = makeContainerWithRow('data-row-key', 'row-legacy');
    const ref = { current: container };
    const { result } = renderHook(() => useTableHighlight(ref));

    act(() => {
      result.current.highlightRow('row-legacy');
    });

    expect(row.classList.contains(HIGHLIGHT_CLASS)).toBe(true);
  });

  it('does nothing when no row matches the key', () => {
    const { container, row } = makeContainerWithRow('data-key', 'row-a');
    const ref = { current: container };
    const { result } = renderHook(() => useTableHighlight(ref));

    act(() => {
      result.current.highlightRow('missing');
    });

    expect(row.classList.contains(HIGHLIGHT_CLASS)).toBe(false);
  });

  it('removes highlight class when the animation ends', () => {
    const { container, row } = makeContainerWithRow('data-key', 'row-end');
    const ref = { current: container };
    const { result } = renderHook(() => useTableHighlight(ref));

    act(() => {
      result.current.highlightRow('row-end');
    });
    expect(row.classList.contains(HIGHLIGHT_CLASS)).toBe(true);

    act(() => {
      row.dispatchEvent(new Event('animationend'));
    });
    expect(row.classList.contains(HIGHLIGHT_CLASS)).toBe(false);
  });

  it('escapes special characters in the row key', () => {
    const container = document.createElement('div');
    const row = document.createElement('tr');
    row.setAttribute('data-key', 'a"b]c');
    container.appendChild(row);
    document.body.appendChild(container);

    const ref = { current: container };
    const { result } = renderHook(() => useTableHighlight(ref));

    expect(() =>
      act(() => {
        result.current.highlightRow('a"b]c');
      }),
    ).not.toThrow();
    expect(row.classList.contains(HIGHLIGHT_CLASS)).toBe(true);
  });
});
