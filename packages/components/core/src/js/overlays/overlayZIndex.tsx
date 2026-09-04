import React, { createContext, useContext, useMemo } from 'react';

import { useTheme } from '../DSProvider/ThemeProvider/theme';

/**
 * Distance between two adjacent overlays in the stack. Deliberately small: the
 * popover family (`ds-popover` and everything built on it) uses FLAT theme
 * tokens starting at `zindex-dropdown`, so a modal that climbs past that would
 * cover its own dropdowns, selects and tooltips. See `OVERLAY_Z_INDEX_CEILING`.
 */
export const OVERLAY_Z_INDEX_STEP = 2;

/**
 * The effective z-index of the nearest enclosing overlay, or `undefined` when
 * there is none. Provided by `ds-modal` and `ds-drawer` around their own
 * subtree.
 *
 * Read through the React tree, NOT the DOM tree — every overlay portals to
 * `document.body`, so a nested modal (or a dropdown) is a DOM sibling of its
 * parent while still being a React descendant. That is what makes this work.
 */
const OverlayZIndexContext = createContext<number | undefined>(undefined);

/** The enclosing overlay's z-index, or `undefined` at the top level. */
export const useOverlayZIndex = (): number | undefined =>
  useContext(OverlayZIndexContext);

// Warn once per session rather than on every render of a clamped overlay.
// Not gated on NODE_ENV: `process` is not typed in this package, and reaching the
// ceiling means ~24 nested overlays, which is worth surfacing in any build.
let ceilingWarned = false;

/**
 * Resolves the z-index an overlay should render at:
 *
 * 1. an explicit `zIndex` prop always wins — the escape hatch for consumers
 *    that position themselves against something outside the DS stack;
 * 2. otherwise one step above the enclosing overlay, so a modal opened from
 *    inside another modal is always on top;
 * 3. otherwise the `zindex-modal` token, i.e. today's flat default.
 *
 * Derived values are clamped below the popover family so an overlay can never
 * rise above a dropdown/tooltip opened inside it.
 */
export const useResolvedOverlayZIndex = (zIndex?: number): number => {
  const theme = useTheme();
  const parentZIndex = useOverlayZIndex();

  return useMemo(() => {
    if (zIndex !== undefined) {
      return zIndex;
    }

    const base = Number.parseInt(theme.variables['zindex-modal'], 10);

    if (parentZIndex === undefined) {
      return base;
    }

    // `zindex-dropdown` is the lowest z-index the popover family actually uses
    // (`zindex-popover` is declared but unused). Stopping one step below it
    // keeps every overlay opened INSIDE this one painted above it.
    const ceiling =
      Number.parseInt(theme.variables['zindex-dropdown'], 10) -
      OVERLAY_Z_INDEX_STEP;
    const stacked = parentZIndex + OVERLAY_Z_INDEX_STEP;

    if (stacked > ceiling) {
      if (!ceilingWarned) {
        ceilingWarned = true;
        // eslint-disable-next-line no-console
        console.warn(
          `[ds-core] Overlay nesting reached the z-index ceiling (${ceiling}). ` +
            'Further nested overlays will tie with their parent and stack by DOM ' +
            'order instead. Pass an explicit `zIndex` if you need to go higher.',
        );
      }
      return ceiling;
    }

    return stacked;
  }, [zIndex, parentZIndex, theme]);
};

export type OverlayZIndexProviderProps = {
  /** The resolved z-index of the overlay owning this subtree. */
  value: number;
  children?: React.ReactNode;
};

/**
 * Publishes an overlay's resolved z-index to its subtree. Overlays that render
 * a stack (`ds-modal`, `ds-drawer`) wrap their content in this so anything they
 * contain can stack above them.
 */
export const OverlayZIndexProvider = ({
  value,
  children,
}: OverlayZIndexProviderProps): React.ReactElement => (
  <OverlayZIndexContext.Provider value={value}>
    {children}
  </OverlayZIndexContext.Provider>
);
