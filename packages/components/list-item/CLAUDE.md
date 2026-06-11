# ListItem (`@synerise/ds-list-item`)
> A polymorphic list row component that renders one of five visual variants (default text, danger, select, divider, header) and supports prefixes, suffixes, submenus, copy-to-clipboard, hover tooltips, and keyboard navigation via `@floating-ui/react`.

## Package structure
```
src/
 ListItem.tsx — main component; type-switch dispatcher
 ListItem.types.ts — all public types, itemTypes/itemSizes consts
 ListItem.const.ts — LIST_ITEM_SIZE_MAPPING (default=32px, large=50px)
 ListItem.styles.ts — (empty placeholder)
 components/
 Danger/Danger.tsx — renders DangerItem styled variant
 Divider/Divider.tsx — renders ds-divider with side margin + dashed
 Header/Header.tsx — section header row with optional tooltip icon
 Select/Select.tsx — select-style row (uuid key bug present)
 Text/Text.tsx — default variant; all interactive logic lives here
 Text/ItemLabel.tsx — rendered <div role="menuitem"> with prefix/suffix/check slots
 Text/DynamicLabel.tsx — swaps normal label for copiedLabel via CSS transition
 Text/utils.ts — renderAddon, removeHandlerProps, getCopyConfig
 Text/ItemLabel.const.ts — INDENT_WIDTH = 20 (px per indentLevel)
 HoverTooltip/HoverTooltip.tsx — wraps item in @synerise/ds-popover on hover
 HoverTooltip/HoverTooltip.const.ts — offset 8px, open 100ms / close 400ms delays
 GroupItem/GroupItem.tsx — renders a title + array of ListItems or children
 SubMenu/SubMenu.tsx — collapsible inline sub-list, indented by level
 ListContext/ListContext.tsx — React context + useListContext hook
 ListContext/ListContextProvider.tsx — provider wrapping FloatingDelayGroup
 ListWrapper/ListWrapper.tsx — styled container that installs ListContextProvider
 hooks/
 useTemporaryLabel.ts — shows copiedLabel for a configurable duration
 modules.d.ts — declares *.less module
```

## Public exports

### Default export: `ListItem`

`forwardRef<HTMLDivElement, ListItemProps>` — dispatches to sub-component based on `type`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'default' \| 'danger' \| 'divider' \| 'select' \| 'header'` | `'default'` | Visual/behavioural variant |
| `text` | `ReactNode` | — | Label alternative to `children` (`text` wins if both provided) |
| `children` | `ReactNode` | — | Label content |
| `size` | `'default' \| 'large'` | `'default'` | Row height: 32px or 50px |
| `checked` | `boolean` | — | Shows green check icon in suffix slot; adds `ds-list-item-selected` class |
| `selected` | `boolean` | — | Additional selected state (typed but not rendered by built-in variants) |
| `disabled` | `boolean` | — | Prevents click/key events; sets `tabIndex=-1` |
| `noHover` | `boolean` | — | Disables hover background |
| `featured` | `boolean` | — | Blue label + blue prefix/suffix icon tint |
| `ordered` | `boolean` | — | Renders ordinal counter before content |
| `parent` | `boolean` | — | Shows `AngleRightS` arrow in content area |
| `selectableParent` | `boolean` | — | Only affects items with a `subMenu`. When `true`, clicking the row fires `onClick` (e.g. to select it) and expand/collapse moves to the suffix arrow (`role="button"`, keyboard-accessible). When omitted, the whole row toggles the sub-menu and `onClick` is not called. |
| `prefixel` | `ReactNode \| AddonRenderer` | — | Left slot; `AddonRenderer = (hovered: boolean) => ReactNode` |
| `prefixVisibilityTrigger` | `'hover' \| 'default'` | — | When `'hover'`, prefix only visible while item is hovered |
| `suffixel` | `ReactNode \| AddonRenderer` | — | Right slot |
| `suffixVisibilityTrigger` | `'hover' \| 'default'` | — | When `'hover'`, suffix only visible while item is hovered |
| `description` | `ReactNode` | — | Second line; only rendered when `size === 'large'` |
| `highlight` | `string` | — | Substring to highlight in string children |
| `copyable` | `boolean \| Copyable` | — | Enables copy-to-clipboard on mousedown/Enter |
| `copyValue` | `string` | — | **Deprecated** — use `copyable: { copyValue }` |
| `copyHint` | `ReactNode` | — | **Deprecated** — no longer rendered |
| `copyTooltip` | `ReactNode` | — | **Deprecated** — no longer rendered |
| `timeToHideTooltip` | `number` | — | **Deprecated** — no longer rendered |
| `tooltipProps` | `TooltipProps` | — | **Deprecated** — no longer rendered |
| `subMenu` | `ListItemProps[]` | — | Inline collapsible sub-list; toggled on row click/Enter by default, or via the suffix arrow when `selectableParent` is set |
| `defaultSubMenuOpen` | `boolean` | `false` | Initial open state of `subMenu` (uncontrolled, read once on mount). Ignored when `subMenuOpen` is provided |
| `subMenuOpen` | `boolean` | — | Controlled open state of `subMenu`; when set, the component stops managing it internally — pair with `onSubMenuToggle` |
| `onSubMenuToggle` | `(open: boolean) => void` | — | Fires with the next open state on every `subMenu` toggle (row click in default mode, or the suffix arrow when `selectableParent`) |
| `indentLevel` | `number` | — | Left indent = `indentLevel * 20px` |
| `renderHoverTooltip` | `() => JSX.Element` | — | Popover rendered on hover via `HoverTooltip`; wraps item in a `PropagationStopper` |
| `popoverProps` | `{ placement?, getPopupContainer?, offsetConfig?, flipConfig?, shiftConfig?, initialOpen? }` | — | Passed to `HoverTooltip`'s `Popover`; only used when `renderHoverTooltip` is set |
| `onClick` | `ListItemEventHandler<MouseEvent \| KeyboardEvent>` | — | Receives `{ key, item, domEvent }` |
| `onItemHover` | `ListItemEventHandler<MouseEvent>` | — | Fires on `mouseOver` |
| `key` | `Key` | — | React key |
| `itemKey` | `Key` | — | Stable key used in `ItemData`; falls back to a stable UUID |
| `level` | `number` | — | Passed to `Divider` only |
| `higher` | `boolean` | — | Passed to `Divider` only |
| `direction` | `'ltr' \| 'rtl'` | — | Typed; not visually implemented in default variant |

### `Copyable` type
```ts
type Copyable = {
 copyValue: string;
 copiedLabel?: ReactNode; // label shown after copy (replaces content temporarily)
 timeToReset?: number; // ms to show copiedLabel (default 1000)
 delayClickEvent?: number | false; // ms to delay onClick after copy (default 700); false to disable
};
```

### `ListWrapper`
Container `<div>` that installs `ListContextProvider` (shared `onClick`, `FloatingDelayGroup`). Accepts all `ListContextProps` + HTML div attributes + `children`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `ListItemEventHandler` | — | Shared click handler for all descendant ListItems |
| `children` | `ReactNode` | — | ListItem nodes |

### `HoverTooltip` (named export)
Public re-export. Usually consumed indirectly through `renderHoverTooltip`; can be used standalone to wrap any content.

### `GroupItem` (named export)
Groups a title + items array.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | **required** | Section label |
| `items` | `ListItemProps[]` | — | Rendered as `<ListItem>` array |
| `children` | `ReactNode` | — | Alternative/additional items |

### `ListContextProvider` (named export)
Provides `ListContext` + `FloatingDelayGroup`. Use when building custom list containers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `ListItemEventHandler` | — | Shared click handler |
| `popoverDelay` | `DelayConfig` | `{ open: 100, close: 400 }` | HoverTooltip delay for all items |
| `children` | `ReactNode` | — | |

### `useListContext` (named export)
`() => ListContextProps | undefined` — reads `ListContext`; returns `undefined` outside a provider.

### Const/type exports
- `itemTypes` — `{ DEFAULT, DANGER, DIVIDER, SELECT, HEADER }`
- `itemSizes` — `{ DEFAULT, LARGE }`
- `LIST_ITEM_SIZE_MAPPING` — `Record<ItemSize, number>`
- `type ListItemProps`, `type BasicItemProps`, `type ItemSize`, `type ItemType`, `type ItemData`, `type StyledListItem`, `type ListItemEventHandler`, `type ListWrapperProps`

## Usage patterns

```tsx
import ListItem, { ListWrapper, ListContextProvider, useListContext } from '@synerise/ds-list-item';

// Basic
<ListItem>Label</ListItem>

// With shared click handler (preferred for lists)
<ListWrapper onClick={(itemData) => console.log(itemData)}>
 <ListItem itemKey="a">Option A</ListItem>
 <ListItem itemKey="b" type="danger">Delete</ListItem>
 <ListItem type="divider" />
 <ListItem type="header">Section</ListItem>
</ListWrapper>

// Copy-to-clipboard
<ListItem copyable={{ copyValue: 'value', copiedLabel: 'Copied!', timeToReset: 1500 }}>
 Copy me
</ListItem>

// Hover tooltip (renders a Popover card on hover)
<ListItem renderHoverTooltip={() => <div>Details</div>} popoverProps={{ placement: 'right' }}>
 Hover me
</ListItem>

// Sub-menu (inline, collapsible)
<ListItem subMenu={[{ children: 'Sub A', itemKey: 'sub-a' }]}>Parent</ListItem>

// Prefix/suffix with hover visibility
<ListItem
 prefixel={<Icon component={<StarM />} />}
 prefixVisibilityTrigger="hover"
 suffixel={(hovered) => hovered ? <Button>Delete</Button> : null}
>
 Row
</ListItem>

// Large size with description
<ListItem size="large" description="Secondary text">
 Primary label
</ListItem>
```

## Styling / Key dependencies / Implementation notes

- **`@floating-ui/react` `useListItem`** — `Text` registers each item with floating-ui's list context via `useListItem()`. The merged ref (`useMergeRefs`) handles both the forwarded ref and the floating-ui ref. This is required for keyboard navigation in dropdowns.
- **`useDropdown` integration** — if an item is rendered inside `@synerise/ds-core`'s `DropdownProvider`, clicking an item calls `setIsOpen(false)` when `hideOnItemClick === true`.
- **`description` only renders at `size="large"`** — setting `description` on a default-size item silently does nothing.
- **`checked` in `Text` type** — renders a `CheckS` icon in the suffix slot. In `select` type, the styled component handles its own checked appearance independently via `S.SelectItem`.
- **`Select.tsx` bug** — `uuid()` is called as the `key` prop on every render, generating a new key on each re-render, causing unnecessary unmount/remount cycles. (TODO comment present in source.)
- **`copyable` boolean legacy** — when `copyable` is a plain `boolean`, it requires `copyValue` (deprecated string prop) to be set separately. Use the object form `copyable: { copyValue: '..' }` instead.
- **`useTemporaryLabel` missing cleanup** — the `useEffect` in `useTemporaryLabel` runs on every render (no dependency array), creating a new `setTimeout` on each render. This is a bug: it resets the timer unnecessarily when other state changes.
- **`GroupItem` uses `items?.map(ListItem)`** — passes `ListItemProps` objects directly as React elements via `.map(Component)`. This relies on all `ListItemProps` being valid props AND each item object having a `key` property (which is typed as optional). Missing `key` will produce React warnings.
- **`indentLevel`** — each sub-menu level adds 20px indent (`INDENT_WIDTH`). The `SubMenu` component automatically increments `indentLevel` by 1.
- **`selectableParent`** — by default a `subMenu` parent owns its whole row for expand/collapse and swallows `onClick`. Setting `selectableParent` flips this: `Text.tsx` routes the row click/Enter to `onClick` (the `if (subMenu && !selectableParent)` guard), and `ItemLabel` renders the suffix arrow as a focusable `S.SubMenuToggle` (`role="button"`, Enter/Space) whose handler calls `stopPropagation()` so toggling never selects.
- **Sub-menu open state** — uncontrolled by default (internal `useState`, starts closed). Seed the initial state with `defaultSubMenuOpen`, or fully control it with `subMenuOpen` + `onSubMenuToggle` (mirrors `Dropdown`'s `open`/`onOpenChange`). When `subMenuOpen` is provided, `Text.tsx` derives the open state from the prop and `onSubMenuToggle` fires the next state on each toggle without mutating internal state. Omitting all three preserves the legacy behaviour.
- **Sub-menu nesting** — `subMenu` is fully recursive (each `SubMenu` renders items via `ItemComponent`, so a nested item with its own `subMenu` nests again); there is **no hard depth limit**. The practical cap is layout-driven: each open `SubMenuContainer` is `max-height: 999px; overflow: hidden` (`SubMenu.styles.ts`), so any single level whose expanded content exceeds 999px is clipped, and indent grows 20px per level without bound.
- **`popoverDelay` is not forwarded** through `ListWrapper` — `ListWrapper` only forwards `onClick`; callers needing custom delay must use `ListContextProvider` directly.
- **Uses Vitest** — `jest.config.js` present; only 2 smoke tests exist, well below 80% coverage requirement.
