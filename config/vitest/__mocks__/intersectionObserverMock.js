import { vi } from 'vitest';

window.IntersectionObserver =
  window.IntersectionObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));
