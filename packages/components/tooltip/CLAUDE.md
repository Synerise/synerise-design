# Tooltip (`@synerise/ds-tooltip`)

> A floating tooltip built on `@synerise/ds-popover` that supports multiple display types, keyboard shortcuts, images, a footer button, and a fully custom render prop.

## Package structure

```
src/
  Tooltip.tsx         — default export; main component (forwardRef wrapper around ds-popover)
  Tooltip.types.ts    — TooltipProps, TooltipContentProps, TooltipTypes
  Tooltip.const.ts    — flip/shift/transition constants passed to ds-popover
  Tooltip.utils.ts    — getOffsetConfig (mainAxis px per offset value), getTransitionConfig (opacity fade)
  Tooltip.styles.tsx  — all styled-components (TooltipComponent, TooltipContent, TooltipTitle, etc.)
  TooltipContent.tsx  — internal component that renders structured tooltip body
  index.ts            — re-exports default + all types
  modules.d.ts        — module declaration shim
  __specs__/
    Tooltip.spec.tsx  — Jest / Testing Library tests
```

## Public exports

```ts
export default Tooltip;
export type { TooltipProps, TooltipContentProps, TooltipTypes };
```

### `Tooltip`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'default' \| 'largeSimple' \| 'largeScrollable'` | `'default'` | Visual variant. `default` = compact single-line; `largeSimple` = multi-line with description; `largeScrollable` = same but description area is scrollable (max-height 90px). |
| `title` | `ReactNode` | — | Primary title text/node. In `default` type, rendered at font-weight 400; in large types at 500. |
| `description` | `ReactNode` | — | Secondary body text. **Only rendered when `type !== 'default'`**. |
| `icon` | `ReactNode` | — | Icon displayed inline before the title text. |
| `shortCuts` | `ReactNode \| ReactNode[]` | — | Keyboard hint(s) rendered as styled key badges beside the title. Accepts a single node or an array. |
| `status` | `ReactNode` | — | Content rendered above the title row (e.g. status badge). |
| `image` | `ReactNode` | — | Node rendered between title and description (e.g. `<img />`). |
| `button` | `ReactNode` | — | Content placed in the footer bar (right-aligned). |
| `render` | `() => ReactNode` | — | Fully custom render prop. When provided, all structured content props are ignored and the result is wrapped in `TooltipWrapper` (applies `box-shadow`). |
| `placement` | `LegacyTooltipPlacement` | `'top'` | One of: `top`, `topLeft`, `topCenter`, `topRight`, `bottom`, `bottomLeft`, `bottomCenter`, `bottomRight`, `left`, `leftTop`, `leftBottom`, `right`, `rightTop`, `rightBottom`. |
| `trigger` | `'click' \| 'hover' \| ('click' \| 'hover')[]` | `'hover'` | Interaction that opens the tooltip. Array form activates multiple triggers. Note: `'focus'` is **not** a valid value (despite older docs). |
| `open` | `boolean` | — | Controlled open state. Synced via `useEffect`; overrides internal state. |
| `onOpenChange` | `(newOpen: boolean) => void` | — | Callback fired when open state changes. |
| `offset` | `'default' \| 'small'` | `'default'` | Space between trigger and tooltip: `default` = 8 px, `small` = 4 px. |
| `timeToHideAfterClick` | `number` | `0` | When `trigger` includes `'click'`, auto-hides the tooltip after this many milliseconds. `0` disables auto-hide. |
| `disabled` | `boolean` | — | When `true`, the component renders `children` directly without a tooltip wrapper. |
| `zIndex` | `number` | theme `zindex-tooltip` | CSS z-index for the floating layer. Defaults to the design-system theme token. |
| `overlayStyle` | `CSSProperties` | — | Inline style applied to the tooltip content wrapper. |
| `getPopupContainer` | `PopoverOptions['getPopupContainer']` | `ds-utils defaultGetPopupContainer` | Returns the DOM node that the tooltip portal renders into. |
| `popoverProps` | `Omit<PopoverOptions, 'zIndex' \| 'getPopupContainer'>` | — | Escape hatch to pass any additional props directly to the underlying `<Popover>`. |
| `children` | `ReactNode` | — | Trigger element. Rendered via `PopoverTrigger asChild`. |
| `ref` | `React.Ref<HTMLElement>` | — | Forwarded to `PopoverTrigger`. |

## Usage patterns

```tsx
import Tooltip from '@synerise/ds-tooltip';
import type { TooltipProps } from '@synerise/ds-tooltip';

// Simple tooltip
<Tooltip title="Save changes">
  <button>Save</button>
</Tooltip>

// Large type with description + footer button
<Tooltip
  type="largeSimple"
  title="Feature name"
  description="A longer explanation of what this feature does."
  button={<Button type="ghost-white">Learn more</Button>}
>
  <Icon component={<InfoM />} />
</Tooltip>

// Keyboard shortcut hint
<Tooltip title="Submit" shortCuts={[<KeyboardEnterM height={18} />, '⌘']}>
  <button>Submit</button>
</Tooltip>

// Scrollable description (long text)
<Tooltip type="largeScrollable" title="Details" description={longText}>
  <span>Hover me</span>
</Tooltip>

// Custom render — bypasses all structured props
<Tooltip render={() => <InformationCard asTooltip title="Title" />}>
  <span>Hover me</span>
</Tooltip>

// Click trigger with auto-hide after 2 s
<Tooltip title="Copied!" trigger="click" timeToHideAfterClick={2000}>
  <button>Copy</button>
</Tooltip>
```

## Styling

- Background: `rgba(56, 67, 80, 0.9)` (semi-transparent dark).
- Text color: `grey-200` from theme palette.
- Border radius: `3px`.
- Max-width: `250px` for `default`/`largeSimple`; `400px` for `largeScrollable`.
- Content padding: `3px 8px` for `default`; `12px` for large types.
- Keyboard key badges (`TooltipKey`): `grey-700` background, `grey-500` border, subtle box-shadow.
- `TooltipWrapper` applies `box-shadow-2` from theme variables (used by `render` prop path and as base for `TooltipComponent`).

## Key dependencies

- `@synerise/ds-popover` — provides `Popover`, `PopoverContent`, `PopoverTrigger`, `getPlacement`, placement/trigger types, flip/shift/offset config types.
- `@synerise/ds-scrollbar` — used inside `TooltipContent` for the `largeScrollable` description area.
- `@synerise/ds-core` — `useTheme` for reading the `zindex-tooltip` token.
- `@synerise/ds-icon` — `IconContainer` referenced in styled-components for icon alignment.
- `@synerise/ds-utils` — `getPopupContainer` default fallback.

## Implementation notes

- The tooltip is invisible (renders `children` directly) when **either** `disabled` is `true` **or** all of `description`, `title`, `icon`, and `render` are falsy. `shortCuts`, `image`, `button`, and `status` alone do not cause the tooltip to show.
- `description` is silently ignored in `type="default"` — it must be a large type to render.
- `trigger` type is `'click' | 'hover'` (from `PopoverTriggerType`). The value `'focus'` is **not** supported at the type level even though it appears in older documentation and storybook `argTypes`.
- When `trigger` includes `'click'`, `handleTriggerClick` toggles `isOpen` via an `onClick` on `PopoverTrigger` because `@synerise/ds-popover` click detection goes through the trigger's onClick.
- Transition is a simple opacity fade (0 → 1 in 150 ms); no transform animation.
- The `open` prop is one-way controlled: an incoming `open` change is applied via `useEffect`, not passed directly to `Popover.open`. This means there can be a one-render lag compared to fully controlled patterns.
- Tests use Jest (not Vitest) — `jest.config.js` is present and `package.json` `test` script runs `jest`.
