import { vi } from 'vitest';

window.ResizeObserver =
  window.ResizeObserver ||
  class ResizeObserverMock {
    constructor(callback) {
      this.callback = callback;
    }
    disconnect = vi.fn();
    observe = vi.fn();
    unobserve = vi.fn();
  };

