# Popover (`@synerise/ds-popover`)

> Headless, context-based popover primitive built on `@floating-ui/react`. Provides a `Popover` root + four sub-components (`PopoverTrigger`, `PopoverContent`, `PopoverArrow`, `PopoverClose`) as a compound component API. Handles nesting, keyboard navigation, focus management, transitions, and portal rendering.

## Package structure

```
src/
 Popover.tsx — root component; FloatingTree nesting logic + context provider
 Popover.types.ts — all exported types and interfaces
 Popover.const.ts — HOVER_OPEN_DELAY, HOVER_CLOSE_DELAY, PLACEMENT_MAP
 index.ts — public exports
 components/
 PopoverTrigger.tsx / .styles.ts — trigger wrapper (forwardRef, asChild support)
 PopoverContent.tsx / .styles.ts — portaled floating panel (forwardRef, focus manager, transitions)
 PopoverArrow.tsx — arrow element positioning helper
 PopoverClose.tsx — close button helper (forwardRef)
 hooks/
 usePopover.ts — main floating-ui orchestration hook
 usePopoverContext.ts — context consumer with null-guard
 useListNavigationConfig.ts — keyboard list navigation config helper
 contexts/
 PopoverContext.tsx — React context holding UsePopoverReturn
 utils/
 getMiddleware.ts — builds floating-ui middleware array (offset, flip, shift, arrow)
 getDefaultTransitionConfig.ts — default opacity fade transition config
 getPlacement.ts — converts LegacyPlacement → floating-ui Placement
 __specs__/Popover.spec.tsx — render, click-open, hover-open
 __specs__/PopoverHide.spec.tsx — the `hide` middleware's two readings, with stubbed rects
```

## Public exports

### `Popover`

Root component (default + named export). Provides `PopoverContext` to all children. Automatically wraps in `FloatingTree` if there is no floating parent (first nesting level); passes through as `PopoverContent` otherwise — enabling unlimited nesting depth.

`Popover` accepts `PopoverOptions` props plus `children: ReactNode`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** Should include `PopoverTrigger` and `PopoverContent` |
| `placement` | `Placement` | `'bottom'` | Floating-ui placement (e.g. `'top'`, `'bottom-start'`) |
| `trigger` | `PopoverTriggerType \| PopoverTriggerType[]` | `'click'` | `'click'`, `'hover'`, or both |
| `open` | `boolean` | `undefined` | Controlled open state |
| `onOpenChange` | `(open, event?, reason?) => void` | `undefined` | Controlled open state setter |
| `onDismiss` | `(event?, reason?) => void` | `undefined` | Called when closed via escape or outside-press |
| `modal` | `boolean` | `false` | Whether popover is modal (traps focus) |
| `initialOpen` | `boolean` | `false` | Uncontrolled initial open state |
| `returnFocus` | `boolean` | `true` | Return focus to trigger on close |
| `testId` | `string` | `'noTestId'` | Sets `data-testid` on trigger/content elements |
| `componentId` | `string` | `undefined` | Sets `data-popover-{componentId}` on content for CSS targeting |
| `zIndex` | `number` | `theme.variables['zindex-dropdown']` | CSS z-index of the floating panel |
| `autoUpdate` | `boolean \| AutoUpdateOptions` | `undefined` | Keep position updated while both elements are mounted |
| `offsetConfig` | `OffsetConfig` | `{ enabled: true }` | Floating-ui `offset` middleware config; set `enabled: false` to disable |
| `flipConfig` | `FlipConfig` | `{ enabled: true }` | Floating-ui `flip` middleware config |
| `shiftConfig` | `ShiftConfig` | `{ enabled: true }` | Floating-ui `shift` middleware config |
| `hideConfig` | `HideConfig` | `{ enabled: true }` | Floating-ui `hide` middleware config; hides the overlay while its anchor is not visible. `{ enabled: false }` opts out |
| `arrowConfig` | `Omit<ArrowOptions, 'element'>` | `{}` | Arrow middleware config (element is managed by `PopoverArrow`) |
| `hoverConfig` | `HoverConfig` | `{}` | Extra options forwarded to `useHover` (e.g. `restMs`, `move`) |
| `dismissConfig` | `UseDismissProps` | `{}` | Extra options forwarded to `useDismiss` |
| `closeOnFocusOut` | `boolean` | `true` | Close the popover when focus leaves it (e.g. tabbing out); Escape and outside-press still dismiss |
| `listNavigationConfig` | `UseListNavigationProps` | `{ enabled: false }` | Keyboard list navigation config (disabled by default) |
| `transitionDuration` | `number` | `undefined` | Enable CSS transition on open/close with given duration in ms |
| `getTransitionConfig` | `({ placement }) => Partial<UseTransitionStylesProps>` | opacity fade | Custom transition styles factory |
| `getPopupContainer` | `(element: HTMLElement) => HTMLElement` | `undefined` | Custom portal root container (forwarded to `FloatingPortal`) |

---

### `PopoverTrigger` (forwardRef)

Wraps the trigger element. Sets floating-ui reference and attaches interaction event handlers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** Trigger content |
| `asChild` | `boolean` | `false` | Forward ref/props to first child instead of wrapping in `<span>`. Child must forward its ref. |
| + all `HTMLElement` attributes | | | |

**`asChild` mode:** Renders a hidden `display: contents` `TriggerAnchor` span as the floating-ui reference anchor, then clones the child with interaction props. Use when you need the trigger to receive props directly (e.g. a custom button component that forwards its ref).

---

### `PopoverContent` (forwardRef)

Portaled floating panel. Only renders when `open` is truthy. Wraps content in `FloatingFocusManager` for focus trapping/restoration.

Accepts all `HTMLDivElement` attributes. Positioning styles are applied inline via `floatingStyles` from `useFloating`.

**GlobalStyles side effect:** Renders `createGlobalStyle` that sets `div[data-floating-ui-portal] { display: contents }` — prevents the portal wrapper from affecting layout.

---

### `PopoverArrow`

Positions an arrow element relative to the floating content. Must be rendered inside `PopoverContent`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactElement` | `undefined` | Arrow element to clone; receives `ref`, absolute position styles, and a placement class name |
| `getClassNameFromPlacement` | `(placement: Placement) => string` | `ds-popover-arrow-{placement}` | Custom class name factory |

---

### `PopoverClose` (forwardRef)

Renders a `<button>` that calls `setOpen(false)` on click. Accepts all `ButtonHTMLAttributes`.

---

### Re-exported utilities

| Export | Source | Description |
|--------|--------|-------------|
| `FloatingDelayGroup` | `@floating-ui/react` | Wrap multiple hover popovers to share delay state |
| `limitShift` | `@floating-ui/react` | Shift middleware limiter |
| `getPlacement` | `utils/getPlacement.ts` | Convert `LegacyPlacement` → floating-ui `Placement` |
| `HOVER_OPEN_DELAY` | `Popover.const.ts` | `100` (ms) |
| `HOVER_CLOSE_DELAY` | `Popover.const.ts` | `100` (ms) |
| `PLACEMENT_MAP` | `Popover.const.ts` | Maps all `LegacyPlacement` keys to floating-ui `Placement` values |

### Type exports

`PopoverProps`, `PopoverOptions`, `PopoverTriggerType`, `OffsetConfig`, `FlipConfig`, `ShiftConfig`, `HoverConfig`, `DelayConfig`, `UsePopoverReturn`, `LegacyPlacement`, `LegacyDropdownPlacement`, `LegacyPopconfirmPlacement`, `LegacyTooltipPlacement`, `PopoverTriggerProps`

## Usage patterns

```tsx
import Popover, {
 PopoverTrigger,
 PopoverContent,
 PopoverArrow,
 PopoverClose,
 FloatingDelayGroup,
} from '@synerise/ds-popover';

// Click-triggered (default)
<Popover testId="my-popover" placement="bottom-start">
 <PopoverTrigger>
 <button>Open</button>
 </PopoverTrigger>
 <PopoverContent className="my-panel">
 Content here
 <PopoverClose>✕</PopoverClose>
 </PopoverContent>
</Popover>

// Hover-triggered with delay group (multiple popovers share delay)
<FloatingDelayGroup delay={{ open: 100, close: 400 }}>
 <Popover trigger="hover">
 <PopoverTrigger asChild>
 <MyButton />
 </PopoverTrigger>
 <PopoverContent>Tooltip content</PopoverContent>
 </Popover>
</FloatingDelayGroup>

// Controlled
<Popover open={isOpen} onOpenChange={setIsOpen}>
 <PopoverTrigger>..</PopoverTrigger>
 <PopoverContent>..</PopoverContent>
</Popover>
```

## Context / Provider

`PopoverContext` (created in `contexts/PopoverContext.tsx`) holds the full `UsePopoverReturn` value. Consumed internally by all sub-components via `usePopoverContext()`. No external Provider is required — `<Popover>` handles it.

`usePopoverContext()` throws if called outside a `<Popover>` tree.

## Custom hooks

### `usePopover`

The core hook, not exported from the package root. All floating-ui setup lives here:
- Manages controlled/uncontrolled `open` state
- Composes `useFloating`, `useClick`, `useHover`, `useDismiss`, `useRole`, `useListNavigation`, `useTransitionStyles`, `useDelayGroup`
- Returns `UsePopoverReturn` (extends `UseFloatingReturn` + `UseInteractionsReturn`)
- **`open` returned is `isMounted`** from `useTransitionStyles` — remains `true` during the exit transition so the element stays mounted

### `useListNavigationConfig`

Creates a `listRef` and returns default list navigation config (`enabled: false`, `activeIndex: null`). Merged with consumer-provided `listNavigationConfig`.

## Key dependencies

- `@floating-ui/react ^0.27` — all positioning, interaction, and transition logic
- `@synerise/ds-core` — `useTheme()` for z-index and styling tokens
- `classnames` — arrow placement class name composition

## Hiding while the anchor is not visible

`autoUpdate` keeps the overlay glued to its anchor, so an anchor that scrolls out of view — or gets
clipped by a scrolling ancestor, e.g. a table's sticky header parking itself — used to take the
overlay off-screen with it. The overlay stayed mounted: invisible, but still holding focus and
swallowing clicks, with nothing on screen for the user to dismiss.

The `hide` middleware now runs last in the chain (after `flip`/`shift`, so it judges the position
those settled on), and `PopoverContent` applies `visibility: hidden` plus
`data-popover-anchor-hidden="true"` when it reports `referenceHidden`.

It **hides rather than closes**, so nothing is lost — a half-filled form in a popover survives a
scroll away and back. `visibility: hidden` rather than `opacity: 0` is what makes that safe: it
takes the subtree out of hit-testing and out of the focus order.

**An anchor reporting no box at all reads as hidden only if it once reported one.** A box that was
there and is now gone belongs to an anchor that stopped being rendered — a hover-revealed row action
on mouse-out, a collapsed accordion, a tab that is no longer the current one. `autoUpdate` has
already repositioned the overlay against that 0×0 box at the document origin, `flip`/`shift` clamped
it into the viewport, and it lands in the top-left corner and sits there for as long as it stays
open. A box that was *never* there is no layout information at all, and reading that as hidden is
what would break jsdom, where nothing has layout and every anchor would otherwise read as hidden,
silently failing every consumer's `toBeVisible()` assertion on overlay content.

`PopoverContent` latches "this anchor has had a box" in a ref written during render, because the
measurement has to be latched in the same pass that consumes it — an effect-driven latch commits one
paint *after* the coordinates it is masking. `hide` remains the only thing that decides; the latch
only widens what it is allowed to judge, so `hideConfig={{ enabled: false }}` still opts out of all
of it, and an anchor that is genuinely 0×0 while in view is still left alone.

Testing either branch therefore needs the rects stubbed, including
`documentElement.clientWidth/clientHeight`, which floating-ui reads for the viewport and jsdom
reports as 0. `src/__specs__/PopoverHide.spec.tsx` has a worked example.

## Implementation notes

- **FloatingTree nesting:** `Popover` checks `useFloatingParentNodeId()`. If `null` → wraps in `<FloatingTree>`. If non-null (nested) → renders `<PopoverContent>` directly inside the existing tree. This is required for nested popovers (e.g. dropdown inside tooltip) to dismiss independently.
- **Arrow middleware timing:** `arrowConfig` passes `arrowRef.current` as the arrow element. On the first render `arrowRef.current` is `null`, so the arrow middleware is not active until after `PopoverArrow` mounts and triggers a re-render. This can cause a one-frame position glitch.
- **`open` is `isMounted`:** `usePopover` returns `isMounted` (from `useTransitionStyles`) as `open`, not the raw open boolean. This keeps the floating element in the DOM during exit transitions. If `transitionDuration` is `undefined`, `isMounted` tracks open/close exactly.
- **`onDismiss`:** Only fires for `'escape-key'` and `'outside-press'` reasons, even if `dismissConfig.enabled` is false it will still fire (the guard checks `dismissConfig.enabled !== false`, meaning it fires unless explicitly disabled).
- **Controlled click trigger:** `useClick` is only enabled when `controlledOpen === undefined` (uncontrolled). In controlled mode the consumer manages open state entirely.
- **`PopoverTrigger.styles.ts`:** `Trigger` is a `span` with `display: flex; min-width: 0`. If this flex wrapper causes layout issues, use `asChild` mode instead.
- **GlobalStyles:** Every mounted `PopoverContent` injects global CSS. Multiple concurrent popovers inject it multiple times (harmless but worth knowing).
- **Do not gate visibility on floating-ui's `isPositioned`.** `useFloating` resets it in a layout
  effect as soon as `open` goes false, while `PopoverContent` is still mounted for the exit
  transition (`usePopover` returns `isMounted` as `open`) — gating on it would make every
  transitioned overlay vanish instantly instead of fading. There is no open-time flash to fix
  anyway: the first `computePosition` resolves in microtasks and `flushSync` commits it before the
  first paint, and transitioned overlays start at `opacity: 0`. If one is ever actually observed,
  gate on "positioned at least once during *this* open cycle", not on `isPositioned`.
- **`ResizeObserver` and `IntersectionObserver` are no-ops under test** (`config/vitest/__mocks__/`),
  so `autoUpdate`'s `elementResize` and `layoutShift` never fire in a spec. A spec that needs a real
  recompute drives it with `fireEvent(window, new Event('resize'))`, which `autoUpdate`'s
  `ancestorResize` listener picks up.
- Uses **Vitest**, configured only in the root `vite.config.base.ts` (`check:no-package-test-config`
  in CI rejects per-package test config).
