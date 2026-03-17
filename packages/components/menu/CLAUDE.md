# Menu (`@synerise/ds-menu`)

> A feature-rich vertical menu wrapping Ant Design / `rc-menu`, supporting items with icons, descriptions, copy-to-clipboard, sub-menus, breadcrumbs, headers, ordered numbering, and show-more pagination.

## Package structure

```
src/
  Menu.tsx                           — class component; mounts AntdMenu, handles dataSource / children / pagination
  Menu.types.ts                      — AntdMenuProps, MenuItemProps, SubMenuProps, MenuTexts, Copyable, ItemType, ItemSize, VisibilityTrigger enums
  Menu.styles.ts                     — AntdMenu styled wrapper with ordered/asDropdownMenu/asInfoCardContainer variants
  index.ts                           — public exports + MenuStyles namespace
  Elements/
    Item/MenuItem.tsx                — primary item renderer; routes to Text/Select/Danger sub-variants
    Item/Text/                       — default item type
    Item/Select/                     — checkbox-style item type
    Item/Danger/                     — destructive item type (red text)
    Item/SubmenuText/                — item used inside sub-menus
    SubMenu/SubMenu.tsx              — expandable sub-menu with collapsible children
    Breadcrumb/Breadcrumb.tsx        — breadcrumb trail component
    Header/Header.tsx                — non-interactive section heading
    Divider/Divider.tsx              — visual separator
  style/index.less                   — Ant Design menu overrides
  __specs__/
    Menu.spec.tsx                    — Jest tests
```

## Public exports

### `Menu` (default export)

Class component. Props extend Ant Design `MenuProps`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `MenuItemProps[]` | — | Items to render; if absent, renders `children` instead |
| `children` | `ReactNode` | — | Manual items; used when `dataSource` is not provided |
| `ordered` | `boolean` | — | Prefixes each item with a zero-padded index (`01`, `02`, …) |
| `asDropdownMenu` | `boolean` | — | Adds dropdown-specific styling to the menu |
| `asInfoCardContainer` | `boolean` | — | Applies info-card container styles |
| `showTextTooltip` | `boolean` | — | Wraps each item's `text` in a `Tooltip` with the same text |
| `maxToShowItems` | `number` | — | Limits visible items; remaining are shown after a toggle button click |
| `texts` | `Partial<MenuTexts>` | `{ showMore, showLess }` | i18n overrides for the show-more toggle button |
| `popoverDelay` | `DelayConfig` | `{ open: 100, close: 400 }` | `FloatingDelayGroup` delay for sub-menu popovers |
| `selectable` | `boolean` | `false` | Ant Design `selectable`; overridden to `false` by default |

### `Menu.Item`

The primary item component. Key props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `ReactNode` | — | Item label |
| `description` | `ReactNode` | — | Secondary line below the label |
| `type` | `'default' \| 'select' \| 'danger'` | `'default'` | Visual variant |
| `size` | `'default' \| 'large'` | `'default'` | Affects min/max height |
| `prefixel` | `ReactNode \| (hovered: boolean) => ReactNode` | — | Left slot |
| `suffixel` | `ReactNode \| (hovered: boolean) => ReactNode` | — | Right slot |
| `prefixVisibilityTrigger` | `'default' \| 'hover'` | `'default'` | When to show the prefix |
| `suffixVisibilityTrigger` | `'default' \| 'hover'` | `'default'` | When to show the suffix |
| `highlight` | `string` | — | Substring to highlight in the label |
| `copyable` | `boolean \| Copyable` | — | Enables copy-to-clipboard; `boolean` is deprecated — pass `Copyable` object |
| `copyValue` | `string` | — | **`@deprecated`** — use `copyable: Copyable` instead |
| `copyHint` | `ReactNode` | — | **`@deprecated`** — no longer shown |
| `copyTooltip` | `ReactNode` | — | **`@deprecated`** — no longer shown |
| `indentLevel` | `number` | `0` | Indent multiplier for nested manual rendering |
| `subMenu` | `SubMenuProps[]` | — | Nested items |
| `parent` | `boolean` | — | Shows expand arrow for parent items |
| `disabled` | `boolean` | `false` | Disables the item |
| `checked` | `boolean` | — | Check state for `type="select"` items |
| `renderHoverTooltip` | `() => JSX.Element` | — | Custom hover tooltip renderer |
| `popoverProps` | `Pick<PopoverOptions, …>` | — | Overrides for the sub-menu popover |

### `Menu.Breadcrumb`

Section breadcrumb trail component.

### `Menu.Header`

Non-interactive section heading row.

### `Menu.Divider`

Visual separator (`Divider` from `./Elements/Divider/Divider`).

### `Menu.SubMenu`

Ant Design SubMenu (via `S.AntdMenu.SubMenu`).

### `Menu.ItemGroup`

Ant Design ItemGroup (via `S.AntdMenu.ItemGroup`).

### `MenuStyles`

Namespace object containing all internal styled-component exports for consumers who need to override styles:

```ts
MenuStyles.MenuStyles   // main menu wrapper styles
MenuStyles.Breadcrumb
MenuStyles.Header
MenuStyles.ItemDanger
MenuStyles.ItemSelect
MenuStyles.ItemSubmenuText
MenuStyles.ItemText
```

### `MenuTexts`, `AntdMenuProps`, `MenuItemProps`, `SubMenuProps`, `MenuDividerProps`

Type re-exports from `Menu.types.ts`.

### Enums: `VisibilityTrigger`, `ItemType`, `ItemSize`

Re-exported from `Menu.types.ts`.

## Usage patterns

```tsx
import Menu from '@synerise/ds-menu';
import type { MenuItemProps } from '@synerise/ds-menu';

// dataSource mode
<Menu dataSource={items} maxToShowItems={5} />

// children mode (compound)
<Menu>
  <Menu.Header>Section</Menu.Header>
  <Menu.Item text="Item 1" prefixel={<Icon component={<EditM />} />} />
  <Menu.Divider />
  <Menu.Item text="Danger" type="danger" />
</Menu>

// Copy with new API
<Menu.Item
  text="Copy me"
  copyable={{ copyValue: 'clipboard text', copiedLabel: 'Copied!' }}
/>
```

## Styling

`Menu.styles.ts` wraps Ant Design's `Menu` in a styled component. Applies ordered numbering via CSS counters when `ordered={true}`. Dropdown-specific overrides applied when `asDropdownMenu={true}`. Uses `rc-menu` for the underlying implementation.

## Key dependencies

- `rc-menu` (`~9.6.3`) — underlying menu implementation
- `antd` — Ant Design `Menu` base
- `@synerise/ds-popover` (`FloatingDelayGroup`) — delay isolation for nested sub-menu popovers
- `copy-to-clipboard` — clipboard API for `copyable` items
- `@synerise/ds-tooltip` — hover tooltips on items
- `uuid` — unique keys for sub-menu items

## Implementation notes

- **Class component** — `Menu` is a `React.Component`, not a functional component; `toggleItems` uses `setState`. Converting to functional is a known migration task.
- **`dataSource` vs `children`** — both modes work but are mutually exclusive. When `dataSource` is provided, `children` is ignored for the item list (the toggle button still renders after).
- **`maxToShowItems` with `children`** — when using `children` mode (not `dataSource`), pagination slices `Children.toArray(children)` by index, so any non-item children (e.g. `Menu.Header`) count against the limit.
- **Deprecated copy props** — `copyValue`, `copyHint`, `copyTooltip`, `timeToHideTooltip`, `tooltipProps` on `MenuItemProps` are all `@deprecated`; use `copyable: Copyable` instead.
- **`asDropdownwMenu` typo in README** — the README documents `asDropdownwMenu` (extra `w`) but the actual prop name is `asDropdownMenu`.
- **Test runner is Jest** (not Vitest).
