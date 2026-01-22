import { vi } from 'vitest';

window.MutationObserver =
  window.MutationObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

