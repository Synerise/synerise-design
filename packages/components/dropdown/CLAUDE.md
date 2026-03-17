# Dropdown (`@synerise/ds-dropdown`)

> Floating dropdown built on `@synerise/ds-popover` (floating-ui) — supports click/hover triggers, custom overlay content, built-in search+list via `DropdownMenu`, and optional footer.

## Package structure

```
src/
  Dropdown.tsx                    — main component + sub-component registry
  Dropdown.types.ts               — DropdownProps, DropdownSharedProps, DropdownSize, DropdownPlacement
  Dropdown.styles.ts              — Wrapper styled-component
  Dropdown.const.ts               — PLACEMENT_MAP, size constants, popover configs
  index.ts                        — public exports
  hooks/
    useDropdownVisibility.ts      — controlled/uncontrolled open state
    useDefaultTexts.tsx           — i18n fallback texts for DropdownMenu
  utils/
    getDropdownWidth.ts           — maps DropdownSize to pixel widths
    getTransitionConfig.ts        — scaleY transition config for floating-ui
    isSplitFooter.ts              — type guard for split footer shape
  components/
    DropdownPopover/              — floating-ui Popover wrapper + keyboard navigation context
    DropdownMenu/                 — searchable list dropdown (data-driven)
    DropdownMenuList/             — virtualisable list renderer with empty state
    DropdownOverlay/              — forwardRef overlay wrapper with size management
    DropdownFooter/               — footer with optional left/right split
    TextTrigger/                  — text + rotating-arrow trigger element
    BackAction/                   — back-navigation row with left arrow
    BottomAction/                 — bottom call-to-action row
```

## Public exports

### `Dropdown` (default + named export)

Compound component. `children` is the trigger element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** Trigger element |
| `overlay` | `ReactNode` | `undefined` | Dropdown panel content |
| `open` | `boolean` | `undefined` | Controlled open state |
| `onOpenChange` | `(isOpen: boolean) => void` | `undefined` | Fires on open/close |
| `onDismiss` | `(event?: Event, reason?: OpenChangeReason) => void` | `undefined` | Fires when closed by clicking outside |
| `trigger` | `PopoverTriggerType \| PopoverTriggerType[]` | `'click'` | `'click'` \| `'hover'` \| `'focus'` |
| `placement` | `DropdownPlacement` | `undefined` | Floating-ui placement (legacy names supported) |
| `size` | `DropdownSize \| number` | `undefined` | Overlay width: `'small'`(216px) \| `'medium'`(282px) \| `'large'`(588px) \| `'auto'` \| `'match-trigger'` \| `'min-match-trigger'` \| px number |
| `disabled` | `boolean` | `false` | Renders children without popover wrapper |
| `asChild` | `boolean` | `undefined` | Passes trigger props to the first child (Radix-style) |
| `hideOnItemClick` | `string \| boolean` | `undefined` | CSS selector or `true` → use `[role="menuitem"]` to auto-close on item click |
| `footer` | `ReactNode \| { left?: ReactNode; right?: ReactNode }` | `undefined` | Footer below overlay; object shape renders split layout |
| `overlayStyle` | `CSSProperties` | `undefined` | Inline style on the overlay container |
| `overlayClassName` | `string` | `undefined` | Class on the overlay container |
| `overlayHTMLAttributes` | `HTMLAttributes<HTMLDivElement>` | `undefined` | HTML attributes forwarded to overlay div |
| `getPopupContainer` | `(trigger: HTMLElement) => HTMLElement` | `getPopupContainerDefault` | Popover mount container |
| `popoverProps` | `Partial<PopoverOptions>` | `undefined` | Pass-through to `@synerise/ds-popover` |
| `popoverTriggerProps` | `Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'>` | `undefined` | HTML attributes on the trigger span |
| `dropdownRender` | `() => ReactNode` | — | **Deprecated** — use `overlay` |
| `destroyPopupOnHide` | `boolean` | — | **Deprecated** — all dropdowns are destroyed when hidden |
| `align` | `any` | — | **Deprecated** |

#### Sub-components attached to `Dropdown`

| Name | Description |
|------|-------------|
| `Dropdown.Wrapper` | Styled `div` — white background, clips `ListItemWrapper` width |
| `Dropdown.MenuWrapper` | Styled `div` — 8px padding, for manual menu item lists |
| `Dropdown.SearchInput` | Re-export of `@synerise/ds-search-bar` |
| `Dropdown.BottomAction` | See `BottomAction` below |
| `Dropdown.BackAction` | See `BackAction` below |
| `Dropdown.TextTrigger` | See `TextTrigger` below |

---

### `DropdownMenu<ItemType extends ListItemProps>`

Data-driven dropdown with optional search. Renders a filtered list from `dataSource` — no manual overlay needed.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `ItemType[]` | — | **Required.** Items to render (must satisfy `ListItemProps`) |
| `children` | `ReactNode` | — | **Required.** Trigger element |
| `withSearch` | `boolean` | `false` | Show search bar |
| `virtualised` | `boolean` | `false` | Use `react-window` virtualised list |
| `maxVisibleItems` | `number` | `7` | Max items before scroll |
| `texts` | `Partial<DropdownMenuTexts>` | built-in i18n | Translation overrides |
| `itemMatchesSearchQuery` | `(item: ItemType, query: string) => boolean` | case-insensitive text match | Custom search predicate |
| `onSearchQueryChange` | `(query: string) => void` | `undefined` | Fires on search input change |
| `hideOnItemClick` | `boolean` | `undefined` | Close on item click |
| + all `DropdownSharedProps` except `overlay`, `dropdownRender`, `align`, `hideOnItemClick` (string) | | | |

`DropdownMenuTexts` keys: `searchPlaceholder`, `noSearchResults`, `searchClearTooltip`.

---

### `DropdownOverlay`

`forwardRef` wrapper for custom overlay content. Handles size calculation (`match-trigger`, `min-match-trigger`, static px) and `hideOnItemClick` event delegation.

---

### `TextTrigger`

Text label with rotating chevron — intended as a dropdown trigger.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| ReactNode \| undefined` | — | Label text |
| `size` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | — | **Required.** Typography size level |
| `expanded` | `boolean` | `undefined` | Controls arrow rotation (open state) |
| `isDisabled` | `boolean` | `undefined` | Disables interactions |
| `inactiveColor` | `string` | `grey-800` | Color when not hovered/focused |
| `onClick` | `() => void` | `undefined` | Click handler |
| `onFocus` | `() => void` | `undefined` | Focus handler |

---

### `BackAction`

Back-navigation row rendered inside a dropdown overlay.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | **Required.** Button label |
| `onClick` | `() => void` | — | **Required.** Click handler |
| `tooltip` | `ReactNode` | `undefined` | Tooltip content |
| `tooltipProps` | `Partial<TooltipProps>` | `undefined` | Pass-through to `@synerise/ds-tooltip` |

---

### `BottomAction`

Bottom call-to-action row (grey-050 background, 52px height).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClickAction` | `() => void` | — | **Required.** Click handler |
| `icon` | `ReactElement` | `undefined` | Icon before text |
| `children` | `ReactNode` | `undefined` | Label text |
| + all `HTMLDivElement` attributes | | | |

---

### Type exports

`DropdownPlacement`, `DropdownProps`, `DropdownSharedProps`, `DropdownSize`, `DropdownMenuProps`, `DropdownMenuListItemProps`.

## Usage patterns

```tsx
import Dropdown, { DropdownMenu, TextTrigger, BackAction, BottomAction } from '@synerise/ds-dropdown';

// Basic overlay dropdown
<Dropdown overlay={<Menu>...</Menu>} trigger="click">
  <Button>Open</Button>
</Dropdown>

// Data-driven with search
<DropdownMenu
  dataSource={items}
  withSearch
  trigger="click"
  texts={{ searchPlaceholder: 'Search...' }}
>
  <Button>Open</Button>
</DropdownMenu>

// Custom overlay with sub-components
<Dropdown overlay={
  <>
    <Dropdown.BackAction label="Back" onClick={handleBack} />
    <Dropdown.Wrapper>
      <Menu>...</Menu>
    </Dropdown.Wrapper>
    <Dropdown.BottomAction onClickAction={handleAdd} icon={<PlusM />}>
      Add item
    </Dropdown.BottomAction>
  </>
}>
  <Dropdown.TextTrigger value="Select" size={2} />
</Dropdown>

// Controlled
const [open, setOpen] = useState(false);
<Dropdown open={open} onOpenChange={setOpen} overlay={...}>
  <Button>Toggle</Button>
</Dropdown>
```

## Controlled vs. uncontrolled

`useDropdownVisibility` handles both modes:
- **Uncontrolled:** omit `open` — internal state manages visibility.
- **Controlled:** pass `open` + `onOpenChange` — component stays in sync with external state.

A `skipDuplicates` ref prevents `onOpenChange` from firing twice when both the trigger's `onClick` and the popover's `onOpenChange` fire for the same event.

## Styling

- Overlay: `DropdownOverlay.styles.ts` — white background, `box-shadow-2`, `3px` border-radius, dynamic width.
- Footer: `grey-100` background, `48px` height; split layout via `DropdownFooterLeft`/`DropdownFooterRight`.
- `Dropdown.Wrapper` clips `ListItemWrapper` to prevent overflow in narrow overlays.
- All colours and shadows come from `@synerise/ds-core` tokens.

## Custom hooks

### `useDropdownVisibility`

Manages controlled/uncontrolled open state. Returns `{ open, toggleOpen }`. Deduplicates `onOpenChange` calls that would otherwise fire twice from concurrent click handlers.

### `useDefaultTexts`

Calls `useIntl()` to return default English strings for `DropdownMenu` (`searchPlaceholder`, `noSearchResults`, `searchClearTooltip`). Requires a `react-intl` `IntlProvider` ancestor.

## Key dependencies

- `@synerise/ds-popover` — floating-ui wrapper providing `Popover`, `PopoverContent`, `PopoverTrigger`
- `@synerise/ds-search-bar` — `Dropdown.SearchInput` is a direct re-export
- `@synerise/ds-list-item` — `ListItemProps` is the item type constraint for `DropdownMenu`
- `react-window` — `VariableSizeList` for virtualised `DropdownMenuList`
- `@floating-ui/react` — `FloatingList`, `useListNavigation` for keyboard arrow-key navigation inside `DropdownPopover`

## Implementation notes

- When `disabled=true`, `Dropdown` renders `children` directly (no span wrapper, no popover).
- `asChild` mode forwards all trigger props onto the first child element (Radix `Slot` pattern) — do not wrap children in an extra element when using this.
- `hideOnItemClick` on `DropdownMenu` accepts only `boolean`; on `Dropdown` it also accepts a CSS selector string.
- `DropdownMenu` sets `disabled` automatically when `dataSource` is empty.
- The overlay is always unmounted when hidden (`destroyPopupOnHide` is a no-op legacy prop).
- `DropdownPopover` provides `DropdownContext` (active index + close handler) to list items — do not skip it when building a custom overlay with keyboard navigation.
- `PLACEMENT_MAP` in `Dropdown.const.ts` maps legacy Ant Design placement strings (e.g. `bottomCenter`) to floating-ui equivalents — no consumer migration needed.
