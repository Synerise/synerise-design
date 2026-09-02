import type { ComponentType, SVGProps } from 'react';

import type { IconSet } from './icons/iconSets';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type IconSetModule = Record<string, IconComponent>;

/**
 * The five icon sets, each behind its own dynamic import.
 *
 * Static specifiers on purpose — a template literal cannot be rewritten by Rollup to the emitted
 * dist path, and the `@vite-ignore` escape hatch that would silence it also stops Vite emitting a
 * chunk at all. These five are the only edge from `Icon` to any icon, and they are all async, which
 * is what makes `<Icon component={...} />` tree-shakeable.
 */
const SET_LOADERS: Record<IconSet, () => Promise<IconSetModule>> = {
  M: () => import('./icons/M'),
  L: () => import('./icons/L'),
  XL: () => import('./icons/XL'),
  additional: () => import('./icons/additional'),
  colorIcons: () => import('./icons/colorIcons'),
};

/** Resolved icons, and negatively-cached misses. Read during render so a remount never flashes. */
const cache = new Map<string, IconComponent | null>();
/** In-flight resolutions, so N simultaneous mounts of one icon share a single fetch. */
const inFlight = new Map<string, Promise<IconComponent | null>>();
const setModules = new Map<IconSet, Promise<IconSetModule>>();

let iconSetsPromise: Promise<Record<string, IconSet>> | undefined;

const loadIconSets = (): Promise<Record<string, IconSet>> => {
  if (!iconSetsPromise) {
    iconSetsPromise = import('./icons/iconSets')
      .then((module) => module.iconSets)
      .catch((error) => {
        // Evict before rethrowing: a settled-rejected promise left in place would be handed to
        // every later caller, turning one transient fetch failure into a permanently iconless page.
        iconSetsPromise = undefined;
        throw error;
      });
  }
  return iconSetsPromise;
};

const loadSet = (set: IconSet): Promise<IconSetModule> => {
  const pending = setModules.get(set);
  if (pending) {
    return pending;
  }
  // Same eviction as loadIconSets — the cached promise must not outlive a failed fetch.
  const request = SET_LOADERS[set]().catch((error) => {
    setModules.delete(set);
    throw error;
  });
  setModules.set(set, request);
  return request;
};

/**
 * Synchronous, cache-only lookup. Returns `null` for an icon that has not been loaded yet.
 *
 * @deprecated Icons resolve asynchronously now. Use `loadIconComponent`, or `useIconComponent`
 * inside a component. Import `@synerise/ds-icon/dist/registerAllIcons` to make every icon resolve
 * synchronously again.
 */
export const getIconComponent = (name?: string): IconComponent | null =>
  (name ? cache.get(name) : null) ?? null;

export type CachedIcon =
  | { status: 'loaded'; Component: IconComponent }
  | { status: 'missing' }
  | { status: 'unknown' };

/**
 * Synchronous tri-state cache probe.
 *
 * `getIconComponent` returns `null` both for "not loaded yet" and for "no such icon", which is not
 * enough to decide whether to show a fallback. This separates them: `missing` is a cached negative
 * result, `unknown` means nothing has been resolved for this name yet.
 */
export const peekIcon = (name: string): CachedIcon => {
  if (!cache.has(name)) {
    return { status: 'unknown' };
  }
  const Component = cache.get(name);
  return Component ? { status: 'loaded', Component } : { status: 'missing' };
};

/** Resolves an icon by name, fetching its set on first use. Resolves to `null` for unknown names. */
export const loadIconComponent = (
  name: string,
): Promise<IconComponent | null> => {
  const cached = cache.get(name);
  if (cached !== undefined) {
    return Promise.resolve(cached);
  }
  const pending = inFlight.get(name);
  if (pending) {
    return pending;
  }

  const request = loadIconSets()
    .then((iconSets) => {
      const set = iconSets[name];
      if (!set) {
        // Definitively unknown — cache the miss so we never look for it again.
        cache.set(name, null);
        return null;
      }
      return loadSet(set).then((module) => {
        const component = module[name] ?? null;
        cache.set(name, component);
        return component;
      });
    })
    .catch(() => {
      // A failed chunk fetch is transient — a stale hash after a deploy, or an offline tab.
      // Deliberately not cached, so a later mount retries instead of rendering nothing forever.
      return null;
    })
    .finally(() => {
      inFlight.delete(name);
    });

  inFlight.set(name, request);
  return request;
};

/** Fills the cache from an eagerly imported icon set. Used by `registerAllIcons`. */
export const registerIcons = (icons: IconSetModule): void => {
  Object.keys(icons).forEach((name) => {
    const component = icons[name];
    if (typeof component === 'function') {
      cache.set(name, component);
    }
  });
};

/** Warms specific icons so their first render paints immediately. */
export const preloadIcons = (...names: string[]): Promise<unknown> =>
  Promise.all(names.map(loadIconComponent));

/** Warms a whole icon set. */
export const preloadIconSet = (set: IconSet): Promise<unknown> =>
  loadSet(set).then((module) => registerIcons(module));
