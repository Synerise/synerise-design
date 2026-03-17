# Popover (`@synerise/ds-popover`)

> Headless, context-based popover primitive built on `@floating-ui/react`. Provides a `Popover` root + four sub-components (`PopoverTrigger`, `PopoverContent`, `PopoverArrow`, `PopoverClose`) as a compound component API. Handles nesting, keyboard navigation, focus management, transitions, and portal rendering.

## Package structure

```
src/
  Popover.tsx                          — root component; FloatingTree nesting logic + context provider
  Popover.types.ts                     — all exported types and interfaces
  Popover.const.ts                     — HOVER_OPEN_DELAY, HOVER_CLOSE_DELAY, PLACEMENT_MAP
  index.ts                             — public exports
  components/
    PopoverTrigger.tsx / .styles.ts    — trigger wrapper (forwardRef, asChild support)
    PopoverContent.tsx / .styles.ts    — portaled floating panel (forwardRef, focus manager, transitions)
    PopoverArrow.tsx                   — arrow element positioning helper
    PopoverClose.tsx                   — close button helper (forwardRef)
  hooks/
    usePopover.ts                      — main floating-ui orchestration hook
    usePopoverContext.ts               — context consumer with null-guard
    useListNavigationConfig.ts         — keyboard list navigation config helper
  contexts/
    PopoverContext.tsx                 — React context holding UsePopoverReturn
  utils/
    getMiddleware.ts                   — builds floating-ui middleware array (offset, flip, shift, arrow)
    getDefaultTransitionConfig.ts      — default opacity fade transition config
    getPlacement.ts                    — converts LegacyPlacement → floating-ui Placement
  __specs__/Popover.spec.tsx           — 3 tests: render, click-open, hover-open
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
| `arrowConfig` | `Omit<ArrowOptions, 'element'>` | `{}` | Arrow middleware config (element is managed by `PopoverArrow`) |
| `hoverConfig` | `HoverConfig` | `{}` | Extra options forwarded to `useHover` (e.g. `restMs`, `move`) |
| `dismissConfig` | `UseDismissProps` | `{}` | Extra options forwarded to `useDismiss` |
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
  <PopoverTrigger>...</PopoverTrigger>
  <PopoverContent>...</PopoverContent>
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

## Implementation notes

- **FloatingTree nesting:** `Popover` checks `useFloatingParentNodeId()`. If `null` → wraps in `<FloatingTree>`. If non-null (nested) → renders `<PopoverContent>` directly inside the existing tree. This is required for nested popovers (e.g. dropdown inside tooltip) to dismiss independently.
- **Arrow middleware timing:** `arrowConfig` passes `arrowRef.current` as the arrow element. On the first render `arrowRef.current` is `null`, so the arrow middleware is not active until after `PopoverArrow` mounts and triggers a re-render. This can cause a one-frame position glitch.
- **`open` is `isMounted`:** `usePopover` returns `isMounted` (from `useTransitionStyles`) as `open`, not the raw open boolean. This keeps the floating element in the DOM during exit transitions. If `transitionDuration` is `undefined`, `isMounted` tracks open/close exactly.
- **`onDismiss`:** Only fires for `'escape-key'` and `'outside-press'` reasons, even if `dismissConfig.enabled` is false it will still fire (the guard checks `dismissConfig.enabled !== false`, meaning it fires unless explicitly disabled).
- **Controlled click trigger:** `useClick` is only enabled when `controlledOpen === undefined` (uncontrolled). In controlled mode the consumer manages open state entirely.
- **`PopoverTrigger.styles.ts`:** `Trigger` is a `span` with `display: flex; min-width: 0`. If this flex wrapper causes layout issues, use `asChild` mode instead.
- **GlobalStyles:** Every mounted `PopoverContent` injects global CSS. Multiple concurrent popovers inject it multiple times (harmless but worth knowing).
- Uses **Jest** (not Vitest) — `jest.config.js` present; 3 tests covering render, click, and hover.
