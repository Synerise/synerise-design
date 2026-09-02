import { useEffect, useState } from 'react';

import type { AllIconNames } from './DynamicIcon/iconManifest';
import {
  type IconComponent,
  getIconComponent,
  loadIconComponent,
  peekIcon,
} from './iconLoader';

export type IconName = AllIconNames;
export type { IconComponent };
export { getIconComponent, loadIconComponent, peekIcon };

export type IconStatus = 'idle' | 'loading' | 'loaded' | 'missing';

export type IconComponentState = {
  Component: IconComponent | null;
  status: IconStatus;
};

// Deliberately not gated on `typeof window`. The effect never runs on the server, so a bare
// `<Icon iconName>` renders empty there either way — but `registerAllIcons` fills the cache at
// module-evaluation time, which *does* run on the server, and short-circuiting would defeat the one
// documented way to get icons into server-rendered HTML. Hydration stays consistent because
// whatever warms the cache on the server (an eager import) warms it on the client too.
const resolveFromCache = (name?: string): IconComponentState => {
  if (!name) {
    return { Component: null, status: 'idle' };
  }
  const cached = peekIcon(name);
  if (cached.status === 'loaded') {
    return { Component: cached.Component, status: 'loaded' };
  }
  // A cached negative result is final, so report it as such rather than as a pending load —
  // otherwise a remount of an unknown name hides `DynamicIcon`'s fallback for a frame.
  return {
    Component: null,
    status: cached.status === 'missing' ? 'missing' : 'loading',
  };
};

/**
 * Resolves an icon name to its component, loading the icon's set on first use.
 *
 * The cache is read during render — in the `useState` initializer and again when `name` changes —
 * rather than in an effect. That is what keeps a remount of an already-loaded icon from flashing an
 * empty box for a frame, which matters because virtualised lists remount icons constantly.
 */
export const useIconComponentState = (name?: string): IconComponentState => {
  const [state, setState] = useState<IconComponentState>(() =>
    resolveFromCache(name),
  );
  const [resolvedFor, setResolvedFor] = useState(name);

  if (name !== resolvedFor) {
    setResolvedFor(name);
    setState(resolveFromCache(name));
  }

  useEffect(() => {
    if (!name) {
      return undefined;
    }

    if (peekIcon(name).status !== 'unknown') {
      // The cache can warm between this render and this effect — another Icon mounting in the same
      // commit resolves the same set. Adopt the result instead of bailing out, or this instance
      // renders an empty box until something unrelated re-renders it.
      const resolved = resolveFromCache(name);
      setState((previous) =>
        previous.Component === resolved.Component &&
        previous.status === resolved.status
          ? previous
          : resolved,
      );
      return undefined;
    }

    let cancelled = false;
    loadIconComponent(name).then((Component) => {
      if (!cancelled) {
        setState({ Component, status: Component ? 'loaded' : 'missing' });
      }
    });

    // Cleanup runs before the next effect, so a slow load for a previous name can never overwrite
    // the current one.
    return () => {
      cancelled = true;
    };
  }, [name]);

  return state;
};

export const useIconComponent = (name?: string): IconComponent | null =>
  useIconComponentState(name).Component;
