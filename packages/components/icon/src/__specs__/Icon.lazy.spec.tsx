import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';

import Icon from '../Icon';
import { DynamicIcon } from '../DynamicIcon/DynamicIcon';
import MimeTypeIcon from '../MimeTypeIcon/MimeTypeIcon';
import AddM from '../icons/M/AddM';
import { getIconComponent, loadIconComponent } from '../iconLoader';

const SRC = join(__dirname, '..');

// Vitest transforms each icon module on demand, so lazily importing a set here costs far more than
// in a browser, where the set is a single prebuilt chunk. RTL's 1s default makes these waits flaky;
// the timeout is about the test transform pipeline, not about how long resolution really takes.
const RESOLVE_TIMEOUT = 30000;

describe('Icon — lazy resolution', () => {
  describe('the component-only path never reaches an icon set', () => {
    // The whole point of the ticket: `Icon` must not have a static edge to any icon module, or a
    // consumer bundle retains all 1195 of them no matter which prop it uses.
    it.each([
      'Icon.tsx',
      'useIconComponent.ts',
      'iconLoader.ts',
      'DynamicIcon/iconManifest.ts',
    ])('%s has no static import of an icon set', (file) => {
      const source = readFileSync(join(SRC, file), 'utf8');
      const staticIconImports = source
        .split('\n')
        .filter(
          (line) =>
            /(^|\s)(import|export)\s/.test(line) &&
            /['"]\.{1,2}\/icons\//.test(line) &&
            !/^\s*import type\s/.test(line) &&
            !/^\s*export type\s/.test(line),
        );

      expect(staticIconImports).toEqual([]);
    });

    it('renders a component-provided icon without resolving anything', () => {
      const { container } = renderWithProvider(
        <Icon component={<AddM />} />,
      );

      expect(container.querySelector('[data-testid="ds-icon-add-m"]')).toBeTruthy();
    });
  });

  it('resolves an icon by name and caches it', async () => {
    expect(getIconComponent('AddL')).toBeNull();

    renderWithProvider(<Icon iconName="AddL" />);
    await screen.findByTestId('ds-icon-add-l', undefined, {
      timeout: RESOLVE_TIMEOUT,
    });

    expect(getIconComponent('AddL')).toBeTypeOf('function');
  }, RESOLVE_TIMEOUT);

  it('renders an already-resolved icon on the first frame', async () => {
    const first = renderWithProvider(<Icon iconName="BrowserL" />);
    await screen.findByTestId('ds-icon-browser-l', undefined, {
      timeout: RESOLVE_TIMEOUT,
    });
    first.unmount();

    // Deliberately no await: a remount must read the cache during render, otherwise virtualised
    // lists flash an empty box on every scroll.
    const { container } = renderWithProvider(<Icon iconName="BrowserL" />);

    expect(
      container.querySelector('[data-testid="ds-icon-browser-l"]'),
    ).toBeTruthy();
  }, RESOLVE_TIMEOUT);

  it('renders an empty sized container for an unknown name, without throwing', async () => {
    const { container } = renderWithProvider(
      <Icon iconName={'NotARealIconM' as never} size={32} />,
    );

    await waitFor(
      () => expect(loadIconComponent('NotARealIconM')).resolves.toBeNull(),
      { timeout: RESOLVE_TIMEOUT },
    );

    const icon = container.querySelector('.ds-icon') as HTMLElement;
    expect(icon).toBeTruthy();
    expect(icon.querySelector('svg')).toBeNull();
  });

  it('resolves icons from each set through its own chunk', async () => {
    await expect(loadIconComponent('AbTestXl')).resolves.toBeTypeOf('function');
    await expect(loadIconComponent('ABtestColor')).resolves.toBeTypeOf('function');
    // The M barrel is 903 modules; Vitest transforms them on demand, so this is slow here even
    // though production ships one prebuilt chunk. registerAllIcons.spec.tsx covers M as well.
    await expect(loadIconComponent('AlignLeftM')).resolves.toBeTypeOf('function');
  }, 120000);

  it('survives server rendering without suspending', () => {
    // React 16/17 renderToString throws on Suspense, so this locks out a future React.lazy.
    expect(() => renderToString(<Icon iconName="AddM" />)).not.toThrow();
  });
});

describe('MimeTypeIcon', () => {
  it('renders synchronously', () => {
    // No await — MimeTypeIcon maps a closed set of eight icons and imports them statically.
    const { container } = renderWithProvider(
      <MimeTypeIcon type="application/pdf" />,
    );

    expect(
      container.querySelector('[data-testid="ds-icon-file-type-image-m"]'),
    ).toBeTruthy();
  });

  it('falls back to FileM for an unknown mime type', () => {
    const { container } = renderWithProvider(<MimeTypeIcon type="nonsense/x" />);

    expect(container.querySelector('[data-testid="ds-icon-file-m"]')).toBeTruthy();
  });
});

describe('DynamicIcon', () => {
  it('never shows the fallback for a valid icon name', async () => {
    const { container } = renderWithProvider(
      <DynamicIcon name="ButtonL" fallback="fallback content" />,
    );

    // Not on the first frame, while the set is still loading...
    expect(container.textContent).not.toContain('fallback content');

    await screen.findByTestId('ds-icon-button-l', undefined, {
      timeout: RESOLVE_TIMEOUT,
    });

    // ...nor after it resolves.
    expect(container.textContent).not.toContain('fallback content');
  }, RESOLVE_TIMEOUT);

  it('shows the fallback once an unknown name is known to be missing', async () => {
    renderWithProvider(
      <DynamicIcon name={'AlsoNotReal' as never} fallback="fallback content" />,
    );

    expect(
      await screen.findByText('fallback content', undefined, {
        timeout: RESOLVE_TIMEOUT,
      }),
    ).toBeTruthy();
  }, RESOLVE_TIMEOUT);

  it('keeps the fallback on the first frame of a remount', async () => {
    const first = renderWithProvider(
      <DynamicIcon name={'StillNotReal' as never} fallback="fallback content" />,
    );
    await screen.findByText('fallback content', undefined, {
      timeout: RESOLVE_TIMEOUT,
    });
    first.unmount();

    // Deliberately no await: the miss is cached, so a remount must report `missing` during render.
    // Reading the cache through `getIconComponent` cannot — it returns null for "not loaded yet"
    // and for "no such icon" alike, so the fallback would disappear for a frame.
    const { container } = renderWithProvider(
      <DynamicIcon name={'StillNotReal' as never} fallback="fallback content" />,
    );

    expect(container.textContent).toContain('fallback content');
  }, RESOLVE_TIMEOUT);
});
