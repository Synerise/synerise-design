import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import { tokens as darkTokens } from '@synerise/ds-tokens/dark';
import { tokens as lightTokens } from '@synerise/ds-tokens/light';

import { GlobalTokenStyles } from './GlobalTokenStyles';
import dsTheme, { getColorsOrder, type ThemePropsVars } from './theme';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeProviderProps = {
  theme?: ThemePropsVars;
  /**
   * Colour scheme to apply. The provider is stateless — the consuming app owns the
   * preference (localStorage, user setting, OS default) and passes it here.
   * - `'light'` / `'dark'` — force that scheme.
   * - `'system'` — follow the OS `prefers-color-scheme` and react to changes.
   * - omitted — the provider does not touch `data-ds-theme`; the app may set the
   *   attribute itself (both themes are always present in the injected CSS), and
   *   `theme.tokens` follows it.
   *
   * Only the outermost provider applies it: a nested provider follows the document mode.
   */
  mode?: ThemeMode;
  children?: ReactNode;
};

type ResolvedMode = 'light' | 'dark';

const THEME_ATTRIBUTE = 'data-ds-theme';

// The resolved mode of the outermost provider. Theming is document-level, so a nested
// provider neither injects the token CSS again nor touches the attribute: it follows this.
const DocumentModeContext = createContext<ResolvedMode | null>(null);

// Layout effect on the client so the attribute and theme.tokens settle before paint; plain
// effect on the server, where neither runs and useLayoutEffect would warn.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

const readDocumentMode = (): ResolvedMode =>
  document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'dark'
    ? 'dark'
    : 'light';

const ThemeProvider = ({
  theme = dsTheme,
  mode,
  children,
}: ThemeProviderProps) => {
  const outerMode = useContext(DocumentModeContext);
  const isRoot = outerMode === null;
  // 'system' and an app-owned attribute start as light so server and client render the
  // same markup; the layout effect below corrects them before the first paint.
  const [rootMode, setRootMode] = useState<ResolvedMode>(
    mode === 'dark' ? 'dark' : 'light',
  );

  useIsomorphicLayoutEffect(() => {
    if (!isRoot) {
      return undefined;
    }
    if (mode === 'light' || mode === 'dark') {
      setRootMode(mode);
      return undefined;
    }
    if (mode === 'system') {
      if (typeof window.matchMedia !== 'function') {
        setRootMode('light');
        return undefined;
      }
      const query = window.matchMedia('(prefers-color-scheme: dark)');
      const sync = (): void => setRootMode(query.matches ? 'dark' : 'light');
      sync();
      query.addEventListener('change', sync);
      return () => query.removeEventListener('change', sync);
    }
    const sync = (): void => setRootMode(readDocumentMode());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [THEME_ATTRIBUTE],
    });
    return () => observer.disconnect();
  }, [isRoot, mode]);

  // Reflect the resolved scheme on <html> so the dark CSS block — and every portaled
  // overlay, which renders to document.body — picks it up. Only when mode is controlled:
  // an app that omits `mode` owns the attribute itself.
  useIsomorphicLayoutEffect(() => {
    if (!isRoot || !mode) {
      return undefined;
    }
    const root = document.documentElement;
    root.setAttribute(THEME_ATTRIBUTE, rootMode);
    return () => {
      if (root.getAttribute(THEME_ATTRIBUTE) === rootMode) {
        root.removeAttribute(THEME_ATTRIBUTE);
      }
    };
  }, [isRoot, mode, rootMode]);

  const resolvedMode = outerMode ?? rootMode;

  const mergedTheme = useMemo(() => {
    const activeTokens = resolvedMode === 'dark' ? darkTokens : lightTokens;
    const ownColorsOrder =
      theme?.colorsOrder && theme.colorsOrder !== dsTheme.colorsOrder
        ? theme.colorsOrder
        : undefined;
    return {
      ...dsTheme,
      ...theme,
      tokens: activeTokens,
      // Resolved from the active mode's tokens so chart palettes follow a dark-mode
      // switch. A caller-supplied colorsOrder still wins; the default one, which a
      // spread of `theme` carries along, does not count as caller-supplied.
      colorsOrder: ownColorsOrder ?? getColorsOrder(activeTokens),
    };
  }, [theme, resolvedMode]);

  return (
    <DocumentModeContext.Provider value={resolvedMode}>
      <ThemeProviderBase theme={mergedTheme}>
        {isRoot && <GlobalTokenStyles />}
        {children}
      </ThemeProviderBase>
    </DocumentModeContext.Provider>
  );
};

export default ThemeProvider;
