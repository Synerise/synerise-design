# Utils (`@synerise/ds-utils`)

> Shared utility functions, React hooks, and TypeScript helper types used across `@synerise/ds-*` packages.

## Package structure

```
src/
  index.ts                          — all public exports
  types/types.ts                    — shared TypeScript utility types

  # Pure functions
  hexToRgba/                        — hex colour string → rgba() string
  toCamelCase/                      — kebab/snake_case → camelCase
  escapeRegEx/ (regex/)             — escape special regex chars in a string
  getInitials/                      — extract initials from first/last name (NOT exported from index.ts)
  selectColorByLetter/              — map letter → ds-core palette colour
  renderWithHighlight/              — wrap a substring match in a highlight <span>
  doubleClickListener/              — factory for single/double click disambiguation
  focusWithArrowKeys/               — keyboard arrow-key focus navigation helper
  omitKeys/                         — remove named keys from a plain object
  getPopupContainer/                — Ant Design getPopupContainer helper

  # Hooks
  useOnClickOutside/                — fire handler when clicking outside a ref
  useResize/                        — track element offsetWidth/offsetHeight on window resize
  useResizeObserver/                — track element DOMRect via ResizeObserver
  useResizeToFit/                   — ResizeObserver with manual observe/disconnect control
  useBreakpoint/                    — window width → named breakpoint + dimensions
  useCombinedRefs/                  — merge multiple React refs into one
  usePrevious/                      — return previous render's value
  useIsMounted/                     — ref that is true while component is mounted
  useElementInView/                 — IntersectionObserver: is element visible?
  useOverscrollBlock/               — prevent horizontal overscroll on a container
  useScrollContain/                 — block wheel event propagation out of a container
  useStableId/                      — stable UUID for component lifetime (via uuid v4)
  useLatestRef/                     — always-current ref to a changing value
  useSearchResults/                 — filtered+sorted search results from grouped item lists
  useKeyboardShortcuts/             — document-level keydown handler map
  useDelimiterEscape/               — join/split/validate delimited strings with escape tags
  useTraceUpdate/                   — dev-only: console.log changed props on each render
```

---

## Public exports

### Pure functions

#### `hexToRgba(hex: string, alpha: number): string`
Converts a 6-char hex colour (e.g. `'#ff0000'`) to `rgba(r, g, b, alpha)`. No validation — assumes well-formed input.

#### `toCamelCase(str: string): string`
Converts kebab-case and snake_case strings to camelCase. Strips non-alphanumeric characters.

#### `escapeRegEx(s: string): string`
Escapes all regex special characters in a string for safe use in `new RegExp(...)`.

#### `selectColorByLetter(letter?: string, forAvatar?: boolean): Color`
Maps a letter to a design-system palette colour. Uses `latinize` to normalise accented characters.
- `forAvatar = false` (default) → returns a `theme.palette` hex string
- `forAvatar = true` → returns `{ color: string; hue: string }` (split on `-`)
- Falls back to `'orange-500'` when `letter` is undefined or not a string.

Also exports: `palette` (array), `colorByLetter` (map), `getColor`, and types `ColorByLetter`, `ColorObject`, `Color`.

#### `renderWithHighlight(name, highlight?, className?, testId?): ReactNode`
Wraps the first matching substring of `name` in a `<span className={className} data-testid={testId}>`. Match is case-insensitive. Returns plain `name` string when no match. Default className/testId: `'string-highlight'`.

#### `doubleClickListener<T>(onClick, onDblClick, delay?): ReactEventHandler<T>`
Factory that returns a single event handler distinguishing single from double clicks via a 250 ms timer (configurable via `delay`). Each call to the factory creates its own independent timeout closure.

#### `focusWithArrowKeys(event, focusableItemClass, fallback): void`
Queries `document` for all elements matching `.${focusableItemClass}` and moves focus with ArrowUp/ArrowDown. Enter key calls `.click()` on the active element. Calls `fallback()` when no next/previous element exists. **Uses `document.querySelectorAll` globally — not scoped to a container.**

#### `omitKeys(keys: string[], obj: Record<string, unknown>): Record<string, unknown>`
Returns a new object with specified keys removed.

#### `getPopupContainer(trigger: HTMLElement | null): HTMLElement`
Walks up the DOM from `trigger` to find the nearest ancestor matching `[data-popup-container]`. Falls back to `document.body`. Used as the Ant Design `getPopupContainer` prop to contain popups inside scroll areas.

Also exports: `getClosest(elem, selector)` — the internal DOM-walk helper.

#### `NOOP: () => void`
No-op function constant. Exported for use as prop default.

---

### Hooks

#### `useOnClickOutside(ref, handler, customEventsTypes?, ignoreSelectors?): void`
Attaches document-level listeners for `mousedown` + `touchstart` (default) or a custom event list. Fires `handler` when the event target is outside `ref`. Passing `null` as `handler` removes all listeners.
- `ignoreSelectors` — list of CSS selectors; if the event target has a matching ancestor, the handler is suppressed.
- Uses `useRef` to keep `handler` current without re-attaching listeners.

Also exports type: `HandledEventsType = 'mousedown' | 'touchstart' | 'click' | 'contextmenu'`

#### `useResize(componentRef?, visible?): { width: number; height: number }`
Listens to `window.resize` and reads `offsetWidth`/`offsetHeight` from `componentRef`. Initial dimensions are read synchronously on mount. The `visible` param is in the dependency array but not used in logic — changing it triggers a re-read.

#### `useResizeObserver(elementRef, resizeHandler?): DOMRect`
Wraps `ResizeObserver`. Returns the current `DOMRect` as state; also calls the optional `resizeHandler` callback. Batches updates via `requestAnimationFrame` (falls back to `setTimeout`).

#### `useResizeToFit<T>({ onResize, autoObserve? }): { elementRef, observe, disconnect }`
ResizeObserver with manual control. Calls `onResize(clientWidth)` on size change.
- `autoObserve = true` — starts observing immediately on mount.
- `autoObserve = false` (default) — caller must invoke `observe()` explicitly.
- Returns `observe` and `disconnect` for manual lifecycle management.

#### `useBreakpoint(): { dimensions, breakpoint? }`
Tracks `window.innerWidth/innerHeight`. Returns current `Dimensions` and the matching named `Breakpoint`.

Breakpoint table:

| Key | Min | Max | Columns |
|-----|-----|-----|---------|
| `xs` | 0 | 320 | 4 |
| `sm` | 321 | 768 | 8 |
| `md` | 769 | 960 | 8 |
| `lg` | 961 | 1280 | 12 |
| `xl` | 1281 | 1600 | 16 |
| `xxl` | 1601 | ∞ | 24 |

Also exports types: `Dimensions`, `BreakpointKey`, `Breakpoint`, `DimensionsWithBreakpoint`

#### `useCombinedRefs<T>(...refs): MutableRefObject<T | null>`
Merges multiple refs (callback refs or `RefObject`) into a single internal ref. Use to attach both a forwarded ref and a local ref to the same element.

#### `usePrevious<T>(value: T): T | undefined`
Stores the previous render's value. Returns `undefined` on first render.

#### `useIsMounted(): MutableRefObject<boolean>`
Returns a ref (`isMounted.current`) that is `true` after mount and `false` after unmount. Safe to read in async callbacks without causing state updates.

#### `useElementInView<T>(options, rootElementRef?): { isIntersecting, isVisible, elementRef }`
Creates an `IntersectionObserver` attached to the returned `elementRef`. `isIntersecting` and `isVisible` are the same value (both reflect `entry.isIntersecting`).
> **Note:** The `useEffect` has no dependency array, meaning the observer is re-created on every render.

#### `useOverscrollBlock<T extends HTMLElement>(): MutableRefObject<T>`
Attach the returned `ref` to a scroll container. On `mouseenter` sets `document.body.style.overscrollBehaviorX = 'contain'`; on `mouseleave` removes it. Cleans up on unmount.

#### `useScrollContain<ElementType extends HTMLElement>(): RefObject<ElementType>`
Attach the returned `ref` to a container. Blocks `wheel` events from propagating or scrolling the page (calls `stopPropagation` + `preventDefault`).

#### `useStableId(): string`
Returns a UUID (`uuid` v4) that is stable for the lifetime of the component. Generated synchronously on first render, never regenerated on re-renders.

#### `useLatestRef<T>(value: T): MutableRefObject<T>`
Stores `value` in a ref and syncs it in a `useEffect`. Use to read the latest value of a prop/state in a callback without adding it to `useCallback`'s dependency array.

#### `useSearchResults<ItemType, GroupType, GroupedListItemType>(...): { searchResults, getActiveTabGroup, getGroupName }`
Filters and sorts a flat `items` array against a `searchQuery`, respecting `activeTab` and `activeGroup` constraints. Returns results grouped via the `groupByGroupName` callback.

Signature:
```ts
useSearchResults(
  items: ItemType[],
  groups: GroupType[],
  activeTab: number,
  groupByGroupName: (items: ItemType[], max?: number) => GroupedListItemType[],
  activeGroup?: GroupType,
  searchQuery?: string,
  maxSearchResultsInGroup?: number,
)
```

Also exports: `BaseItemType`, `BaseGroupType`, `getActiveTabGroup`, `getGroupName`, `isItemInGroup`

#### `useKeyboardShortcuts(keyConfig: Record<string, (event: KeyboardEvent) => void>): void`
Attaches a `keydown` listener to `document`. The record key is matched against `event.key`. Re-attaches whenever `keyConfig` reference changes — **memoize `keyConfig` to avoid redundant listener churn.**

#### `useDelimiterEscape(config?): { joinWithEscape, splitWithEscape, isValidEscapedString }`
Handles serialisation/deserialisation of string arrays where items may contain the delimiter. Wraps items containing the delimiter in configurable tags.
- Default: `delimiter=','`, `openTag='```'`, `closeTag='```'`
- Returns a memoised object of three functions; re-memoises only when `delimiter`/`openTag`/`closeTag` change.

Also exports interfaces: `DelimiterEscapeConfig`, `DelimiterEscapeUtils`

#### `useTraceUpdate(props: Record<string, unknown>): void`
**Development debugging tool.** Logs changed props to `console.log` on each render. Do not use in production code.

---

## Exported TypeScript types

| Type | Description |
|------|-------------|
| `LiteralStringUnion<T>` | `T \| (string & {})` — enables IDE autocomplete on open string unions |
| `ExactlyOne<T, U>` | Mutually exclusive union — exactly one of T or U, never both |
| `DataAttributes` | `Record<\`data-${string}\`, string>` |
| `WithHTMLAttributes<ElementType, BaseType>` | Merges base props with native HTML attrs and `DataAttributes`, with base props winning on conflicts |
| `DeepPartial<T>` | Recursively makes all properties optional |
| `RequiredProps<BaseType, PropName>` | Makes specific props required on a base type |
| `ObjectStringKeys<T>` | Union of keys in T whose values are `string` |

---

## Key dependencies

- `uuid` — used by `useStableId` for UUID generation
- `latinize` — used by `selectColorByLetter` to normalise accented letters
- `@synerise/ds-core` — `theme.palette` used by `selectColorByLetter`

## Implementation notes

- `getInitials` exists in `src/getInitials/` and has tests but is **not exported from `index.ts`**. Consumers must import it directly from `dist/getInitials/getInitials` (fragile deep import).
- `useResize` accepts a `RefObject<any>` — typed loosely to accept refs to any DOM element.
- `focusWithArrowKeys` queries the entire `document`, not a scoped container — all elements with the given class on the page are in scope simultaneously.
- `useTraceUpdate` calls `console.log` unconditionally — strip from production builds or guard with `process.env.NODE_ENV`.
- Tests use **Jest** (not Vitest) — `jest.config.js` present, no `vitest.config.ts`.
