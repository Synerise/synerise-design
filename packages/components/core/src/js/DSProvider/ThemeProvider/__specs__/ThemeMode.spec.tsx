import React from 'react';
import { useTheme } from 'styled-components';
import { act, render, screen, waitFor } from '@testing-library/react';

import ThemeProvider from '../ThemeProvider';
import dsTheme, { type ThemePropsVars } from '../theme';

// Stand-in maps, so the mode each assertion expects is told apart whatever the real values are.
const TOKENS = vi.hoisted(() => ({
  light: {
    '--ds-color-text-base-default': 'light-text',
    '--ds-color-ordered-1-base': 'light-ordered-1',
  },
  dark: {
    '--ds-color-text-base-default': 'dark-text',
    '--ds-color-ordered-1-base': 'dark-ordered-1',
  },
}));
vi.mock('@synerise/ds-tokens/light', () => ({ cssText: '', tokens: TOKENS.light }));
vi.mock('@synerise/ds-tokens/dark', () => ({ cssText: '', tokens: TOKENS.dark }));

// jsdom's CSS parser drops the token rule, so count the injecting component instead.
vi.mock('../GlobalTokenStyles', () => ({
  GlobalTokenStyles: () => <meta data-testid="token-styles" />,
}));

const ORDERED_1 = '--ds-color-ordered-1-base';

const ThemeProbe = () => {
  const theme = useTheme() as ThemePropsVars;
  return (
    <div
      data-testid="probe"
      data-text={theme.tokens['--ds-color-text-base-default']}
      data-order={theme.colorsOrder[0]}
    />
  );
};

const probe = () => screen.getByTestId('probe');
const themeAttribute = () =>
  document.documentElement.getAttribute('data-ds-theme');

describe('ThemeProvider mode', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-ds-theme');
  });

  it('builds colorsOrder from the dark tokens in dark mode', () => {
    render(
      <ThemeProvider mode="dark">
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(probe()).toHaveAttribute('data-order', TOKENS.dark[ORDERED_1]);
  });

  it('keeps a caller-supplied colorsOrder', () => {
    const colorsOrder = ['#123456'];
    render(
      <ThemeProvider mode="dark" theme={{ ...dsTheme, colorsOrder }}>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(probe()).toHaveAttribute('data-order', '#123456');
  });

  it('still follows the mode when the theme only spreads the default one', () => {
    render(
      <ThemeProvider mode="dark" theme={{ ...dsTheme }}>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(probe()).toHaveAttribute('data-order', TOKENS.dark[ORDERED_1]);
  });

  it('removes the attribute it set when it unmounts', () => {
    const { unmount } = render(<ThemeProvider mode="dark" />);
    expect(themeAttribute()).toBe('dark');

    unmount();

    expect(themeAttribute()).toBeNull();
  });

  it('removes the attribute when mode is dropped', () => {
    const { rerender } = render(<ThemeProvider mode="dark" />);

    rerender(<ThemeProvider />);

    expect(themeAttribute()).toBeNull();
  });

  it('injects the token styles once for nested providers', () => {
    render(
      <ThemeProvider mode="light">
        <ThemeProvider>
          <ThemeProvider />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(screen.getAllByTestId('token-styles')).toHaveLength(1);
  });

  it('lets the outermost provider own the document mode', () => {
    render(
      <ThemeProvider mode="dark">
        <ThemeProvider mode="light">
          <ThemeProbe />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(themeAttribute()).toBe('dark');
    expect(probe()).toHaveAttribute(
      'data-text',
      TOKENS.dark['--ds-color-text-base-default'],
    );
  });

  it('follows an app-owned attribute when mode is omitted', async () => {
    document.documentElement.setAttribute('data-ds-theme', 'dark');
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(probe()).toHaveAttribute(
      'data-text',
      TOKENS.dark['--ds-color-text-base-default'],
    );

    act(() => {
      document.documentElement.setAttribute('data-ds-theme', 'light');
    });

    await waitFor(() =>
      expect(probe()).toHaveAttribute(
        'data-text',
        TOKENS.light['--ds-color-text-base-default'],
      ),
    );
  });

  it('resolves system mode from prefers-color-scheme', () => {
    const matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.stubGlobal('matchMedia', matchMedia);

    try {
      render(
        <ThemeProvider mode="system">
          <ThemeProbe />
        </ThemeProvider>,
      );

      expect(themeAttribute()).toBe('dark');
      expect(probe()).toHaveAttribute('data-order', TOKENS.dark[ORDERED_1]);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('follows an OS colour-scheme change in system mode and stops listening on unmount', () => {
    const query = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(query));

    try {
      const { unmount } = render(
        <ThemeProvider mode="system">
          <ThemeProbe />
        </ThemeProvider>,
      );
      expect(themeAttribute()).toBe('light');
      const [[event, onChange]] = query.addEventListener.mock.calls;
      expect(event).toBe('change');

      act(() => {
        query.matches = true;
        onChange();
      });

      expect(themeAttribute()).toBe('dark');
      expect(probe()).toHaveAttribute(
        'data-text',
        TOKENS.dark['--ds-color-text-base-default'],
      );

      unmount();
      expect(query.removeEventListener).toHaveBeenCalledWith('change', onChange);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('falls back to light in system mode when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);

    try {
      render(
        <ThemeProvider mode="system">
          <ThemeProbe />
        </ThemeProvider>,
      );

      expect(themeAttribute()).toBe('light');
      expect(probe()).toHaveAttribute(
        'data-text',
        TOKENS.light['--ds-color-text-base-default'],
      );
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
