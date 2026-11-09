import React, { useRef } from 'react';

import { render } from '@testing-library/react';

import useResizeObserver from '../useResizeObserver';

type ObserverRecord = {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
};

let observers: ObserverRecord[] = [];
const originalResizeObserver = window.ResizeObserver;

beforeAll(() => {
  window.ResizeObserver = class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor() {
      observers.push(this);
    }
  } as unknown as typeof ResizeObserver;
});

afterAll(() => {
  window.ResizeObserver = originalResizeObserver;
});

beforeEach(() => {
  observers = [];
});

// The hook keeps the first observer it constructs; later renders construct and drop others.
const activeObserver = () => observers[0];

const Observed = ({ elementId }: { elementId?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useResizeObserver(ref);
  return elementId ? <div ref={ref} key={elementId} id={elementId} /> : null;
};

describe('useResizeObserver', () => {
  it('should observe the element rendered on mount', () => {
    const { container } = render(<Observed elementId="first" />);

    expect(activeObserver().observe).toHaveBeenCalledTimes(1);
    expect(activeObserver().observe).toHaveBeenCalledWith(
      container.querySelector('#first'),
    );
  });

  it('should observe an element rendered after mount', () => {
    const { container, rerender } = render(<Observed />);
    expect(activeObserver().observe).not.toHaveBeenCalled();

    rerender(<Observed elementId="late" />);

    expect(activeObserver().observe).toHaveBeenCalledWith(
      container.querySelector('#late'),
    );
  });

  it('should move to the element that replaces the observed one', () => {
    const { container, rerender } = render(<Observed elementId="first" />);
    const first = container.querySelector('#first');

    rerender(<Observed elementId="second" />);

    expect(activeObserver().unobserve).toHaveBeenCalledWith(first);
    expect(activeObserver().observe).toHaveBeenLastCalledWith(
      container.querySelector('#second'),
    );
  });

  it('should not observe the same element twice across renders', () => {
    const { rerender } = render(<Observed elementId="first" />);

    rerender(<Observed elementId="first" />);
    rerender(<Observed elementId="first" />);

    expect(activeObserver().observe).toHaveBeenCalledTimes(1);
  });

  it('should disconnect on unmount', () => {
    const { unmount } = render(<Observed elementId="first" />);

    unmount();

    expect(activeObserver().disconnect).toHaveBeenCalled();
  });
});
