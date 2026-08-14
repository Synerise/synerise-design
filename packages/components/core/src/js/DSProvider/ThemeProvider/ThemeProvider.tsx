import React, { type ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import { tokens as darkTokens } from '@synerise/ds-tokens/dark';
import { tokens as lightTokens } from '@synerise/ds-tokens/light';

import { GlobalTokenStyles } from './GlobalTokenStyles';
import dsTheme, { type ThemePropsVars, getColorsOrder } from './theme';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeProviderProps = {
  theme?: ThemePropsVars;
  /**
   * Colour scheme to apply. The provider is stateless — the consuming app owns the
   * preference (localStorage, user setting, OS default) and passes it here.
   * - `'light'` / `'dark'` — force that scheme.
   * - `'system'` — follow the OS `prefers-color-scheme` and react to changes.
   * - omitted — the provider does not touch `data-ds-theme`; the app may set the
   *   attribute itself (both themes are always present in the injected CSS).
   */
  mode?: ThemeMode;
  children?: ReactNode;
};

const prefersDark = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const resolveMode = (mode: ThemeMode): 'light' | 'dark' =>
  mode === 'system' ? (prefersDark() ? 'dark' : 'light') : mode;

const ThemeProvider = ({
  theme = dsTheme,
  mode,
  children,
}: ThemeProviderProps) => {
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>(() =>
    mode ? resolveMode(mode) : 'light',
  );

  // Keep resolvedMode in sync with the mode prop; for 'system', track the OS preference.
  useEffect(() => {
    if (!mode) {
      return undefined;
    }
    if (mode !== 'system') {
      setResolvedMode(mode);
      return undefined;
    }
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      setResolvedMode('light');
      return undefined;
    }
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = (): void => setResolvedMode(query.matches ? 'dark' : 'light');
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [mode]);

  // Reflect the resolved scheme on <html> so the dark CSS block — and every portaled
  // overlay, which renders to document.body — picks it up. Only when mode is controlled:
  // an app that omits `mode` owns the attribute itself.
  useEffect(() => {
    if (mode && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-ds-theme', resolvedMode);
    }
  }, [mode, resolvedMode]);

  const mergedTheme = useMemo(() => {
    const activeTokens = resolvedMode === 'dark' ? darkTokens : lightTokens;
    return {
      ...dsTheme,
      ...theme,
      tokens: activeTokens,
      // Resolved from the active mode's tokens so chart palettes follow a dark-mode
      // switch. A caller-supplied colorsOrder still wins (it comes from `theme`).
      colorsOrder: theme?.colorsOrder ?? getColorsOrder(activeTokens),
    };
  }, [theme, resolvedMode]);

  return (
    <ThemeProviderBase theme={mergedTheme}>
      <GlobalTokenStyles />
      {children}
    </ThemeProviderBase>
  );
};

export default ThemeProvider;
