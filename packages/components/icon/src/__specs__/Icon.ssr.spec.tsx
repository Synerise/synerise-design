import React from 'react';

import { vi } from 'vitest';

// Isolated in its own file: it deletes `globalThis.window` and re-imports the module graph, so the
// icon modules it loads are separate instances from every other spec's.
//
// Resetting the registry means registerAllIcons re-transforms all 1195 icon modules, which the
// 5s default does not cover once the rest of the suite is running in parallel. As in
// Icon.lazy.spec.tsx, the timeout is about Vitest's transform pipeline, not about the code.
const SSR_TIMEOUT = 30000;

describe('Icon — server rendering', () => {
  const renderOnServer = async (register: boolean) => {
    vi.resetModules();
    const { window: realWindow } = globalThis;
    // jsdom always provides `window`, so a plain `renderToString` here still runs the browser
    // branch. Removing it is the only way to exercise what a Node server actually sees.
    Reflect.deleteProperty(globalThis, 'window');

    try {
      const { renderToString } = await import('react-dom/server');
      const { default: Icon } = await import('../Icon');
      if (register) {
        await import('../registerAllIcons');
      }
      return renderToString(<Icon iconName="AddM" />);
    } finally {
      Object.defineProperty(globalThis, 'window', {
        value: realWindow,
        configurable: true,
        writable: true,
      });
    }
  };

  it('emits the icon when registerAllIcons has filled the cache', async () => {
    // registerAllIcons fills the cache at module-evaluation time, which runs on the server too.
    // Gating the render-time cache read on `typeof window` would defeat the one documented way to
    // get icons into server-rendered HTML.
    expect(await renderOnServer(true)).toContain('data-testid="ds-icon-add-m"');
  }, SSR_TIMEOUT);

  it('emits the sized empty container when it has not', async () => {
    // Without an eager registration there is nothing to read: the effect never runs on the server.
    // Both sides agree, so hydration stays consistent.
    const html = await renderOnServer(false);

    expect(html).toContain('ds-icon');
    expect(html).not.toContain('<svg');
  }, SSR_TIMEOUT);
});
