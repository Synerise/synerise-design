import { vi } from 'vitest';

class IntersectionObserverMock {
  constructor() {
    this.disconnect = vi.fn();
    this.observe = vi.fn();
    this.unobserve = vi.fn();
    this.takeRecords = vi.fn().mockReturnValue([]);
  }
}

window.IntersectionObserver = window.IntersectionObserver || IntersectionObserverMock;
