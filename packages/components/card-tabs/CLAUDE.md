# CardTabs (`@synerise/ds-card-tabs`)

> Horizontally scrolling row of fixed-size tab cards with colour coding, drag-to-reorder, inline rename, and an "add tab" button — each card rendered as a generic `CardTab<IdType>`.

## Package structure

```
src/
  CardTabs.tsx              — main container component
  CardTabs.types.ts         — CardTabsProps, CardTabsPropsBase, CardTabsItem (deprecated)
  CardTabs.styles.ts        — CardTabsContainer, CardTabsAddButton
  CardTab/
    CardTab.tsx             — individual tab card (generic IdType)
    CardTab.types.ts        — CardTabProps, prefixType enum, PrefixProps union, CardTabTexts
    CardTab.styles.ts       — all styled components for the card
    CardTabActions/         — inline CRUD icon buttons (edit/duplicate/remove/preview)
    CardTabDropdown/        — 3-dot dropdown menu for the same actions
    CardTabPrefix/          — left-side prefix (tag, dot, icon, or drag handle)
  utils.ts                  — getColor, getLighterColor helpers
  index.ts                  — public exports
```

## Public exports

### `CardTabs` (default)

Container component. Generic: `CardTabs<IdType extends string | number>`. Accepts all `HTMLDivElement` attributes in addition to its own props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Array<ReactElement<CardTabProps<IdType>>>` | `[]` | Array of `CardTab` elements. |
| `onChangeOrder` | `(newOrder: CardTabProps<IdType>[]) => void` | `undefined` | Enables drag-to-reorder when provided (and >1 child). Called with the new props array. |
| `onAddTab` | `() => void` | `undefined` | When provided, renders a `Creator` button after the tabs. |
| `addTabLabel` | `string` | `undefined` | Label text shown inside the add-tab Creator button (hidden at narrow widths via CSS). |
| `maxTabsCount` | `number` | `undefined` | Disables the add-tab button when `children.length >= maxTabsCount`. |
| `className` | `string` | `undefined` | Extra class on the container div (always includes `ds-card-tabs`). |

### `CardTab`

Individual tab card. Generic: `CardTab<IdType extends string | number>`. Not usually used standalone — rendered as children of `CardTabs`.

#### Required props

| Prop | Type | Description |
|------|------|-------------|
| `id` | `IdType` | Unique identifier passed back in all callbacks. |
| `name` | `string` | Tab label displayed with ellipsis overflow. |
| `prefix` | `prefixType` | Discriminated union key. Determines which prefix variant is rendered. |

#### Optional props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color \| DefaultColor \| string` | `'yellow'` | Background colour of the active state. Auto-assigned by `CardTabs` from `defaultColorsOrder` if not set. |
| `active` | `boolean` | `undefined` | Shows the card in its active/selected state (coloured background). |
| `draggable` | `boolean` | `undefined` | Shows a drag handle. Also auto-set by `CardTabs` when >1 children and `onChangeOrder` is provided. |
| `disabled` | `boolean` | `undefined` | Sets `pointer-events: none` and reduces opacity. Does NOT disable child actions individually. |
| `invalid` | `boolean` | `undefined` | Red border. Combined with `active`, turns the card red-600. |
| `invalidName` | `boolean` | `undefined` | Same visual effect as `invalid` (both flags are OR'd). |
| `greyBackground` | `boolean` | `undefined` | White card with drop shadow instead of the default grey-050 bordered card. |
| `suffixIcon` | `ReactNode` | `undefined` | Renders a static icon on the right. **Suppresses** `CardTabActions`/`CardTabDropdown` entirely. |
| `renderSuffix` | `(props: CardTabSuffixProps) => ReactNode` | `undefined` | Custom suffix renderer. Takes precedence over action icons. |
| `actionsAsDropdown` | `boolean` | `undefined` | Renders action callbacks in a 3-dot `CardTabDropdown` instead of inline `CardTabActions` icons. |
| `texts` | `CardTabTexts` | `undefined` | Override i18n strings for tooltips and dropdown menu labels. |
| `itemData` | `unknown` | `undefined` | Arbitrary data forwarded to `CardTabContainer` styled component (available to `Sortable`). |
| `dragHandleProps` | `DragHandlePropType` | `undefined` | Drag handle props injected by `@synerise/ds-sortable` when draggable. |
| `onSelectTab` | `(id: IdType) => void` | `undefined` | Called on click (only when not in edit mode). |
| `onChangeName` | `(id: IdType, name: string) => void` | `undefined` | Called on inline edit blur. Also enables the rename action in CRUD/dropdown. |
| `onDuplicateTab` | `(id: IdType) => void` | `undefined` | Called when the duplicate action is triggered. |
| `onRemoveTab` | `(id: IdType) => void` | `undefined` | Called when the remove action is triggered. |
| `onPreviewTab` | `(id: IdType) => void` | `undefined` | Called when the preview action is triggered. |
| `keyId` | `string` | `undefined` | **Deprecated.** Used as React `key` when set. |
| `intl` | `IntlShape` | `undefined` | **Deprecated.** Previously used to override internal i18n. Now unused. |

#### `PrefixProps` discriminated union

`prefix` selects which additional props are available:

| `prefix` value | Additional props | Renders |
|----------------|------------------|---------|
| `prefixType.TAG` | `tag: string` | Coloured square badge with a text label |
| `prefixType.DOT` | `colorDot?: ReactNode` | Small coloured circle; defaults to `CardDot` |
| `prefixType.ICON` | `prefixIcon: ReactNode` | An icon element |
| `prefixType.HANDLE` | _(none)_ | Persistent drag handle (always visible, not only on hover) |

### `prefixType` (enum)

```ts
enum prefixType { TAG, ICON, DOT, HANDLE }
```

### `CardDot`

Exported styled component (`div`, 8×8px, 50% border-radius). Use as the `colorDot` value when you want to render the DS dot style at a custom colour.

### `CardTabsStyles`

Object of styled-component exports for styled-extension use:
```ts
{ CardTabs: MainCardTabsStyles, CardTab: CardTabStyles }
```

### Types

| Export | Description |
|--------|-------------|
| `CardTabProps<IdType>` | Full props interface for `CardTab` |
| `CardTabsProps<IdType>` | Full props interface for `CardTabs` (includes HTMLDiv attributes) |
| `CardTabsPropsBase<IdType>` | Props without HTMLDiv attributes |
| `CardTabsItem` | **Deprecated.** `Partial<CardTabProps>` alias |

## Usage patterns

```tsx
import CardTabs, { CardTab, prefixType } from '@synerise/ds-card-tabs';

// Basic usage
<CardTabs onAddTab={handleAdd} addTabLabel="Add tab" maxTabsCount={6}>
  <CardTab id={1} name="Variant A" prefix={prefixType.TAG} tag="A" active />
  <CardTab id={2} name="Variant B" prefix={prefixType.TAG} tag="B" onSelectTab={handleSelect} />
</CardTabs>

// With reorder and CRUD actions
<CardTabs onChangeOrder={handleReorder}>
  <CardTab
    id={1}
    name="Tab 1"
    prefix={prefixType.DOT}
    onSelectTab={handleSelect}
    onChangeName={handleRename}
    onDuplicateTab={handleDuplicate}
    onRemoveTab={handleRemove}
  />
</CardTabs>

// Actions in dropdown menu
<CardTab
  id={1}
  name="Tab 1"
  prefix={prefixType.ICON}
  prefixIcon={<FileM />}
  actionsAsDropdown
  onChangeName={handleRename}
  onRemoveTab={handleRemove}
/>
```

## Styling

- `CardTabs.styles.ts` — container is full-width flex row with `gap: 16px 12px`, wraps at 588px breakpoint; at ≤588px, the Creator add button collapses to icon-only (label hidden via CSS).
- `CardTab.styles.ts` — `CardTabContainer` is a styled div 168×48px, 3px border-radius. Background, border, and text colours all derive from the `color` prop and the `active`/`invalid`/`greyBackground` flags via inline theme palette lookups.
- Uses `@synerise/ds-core` theme palette tokens throughout; `getLighterColor` utility steps colour levels down by 100 on hover.

## Key dependencies

- `@synerise/ds-sortable` — drag-to-reorder when `onChangeOrder` is provided (uses `Sortable` with `CardTab` as `ItemComponent` and injects `dragHandleProps`)
- `@synerise/ds-inline-edit` — inline name editing triggered by double-click or rename action
- `@synerise/ds-cruds` — inline CRUD icon buttons in `CardTabActions`
- `@synerise/ds-dropdown` `DropdownMenu` — 3-dot contextual menu in `CardTabDropdown`
- `react-intl` `useIntl` — default tooltip/label strings (requires `IntlProvider` in the tree)
- `@synerise/ds-core` `defaultColorsOrder` — auto-assigns colours to tabs by index

## Implementation notes

- **`useIntl()` is called unconditionally** in `CardTab.tsx`. An `IntlProvider` must be present in the React tree or the component will throw. The `texts` prop can override individual strings but does not remove this requirement.
- **Colour auto-assignment** — `CardTabs` uses `cloneElement` to inject `color` from `defaultColorsOrder[i % length]` for any tab that doesn't have an explicit `color` prop.
- **Sortable mode is activated automatically** — when `onChangeOrder` is provided AND `childrenCount > 1`, `CardTabs` switches from `renderChildren` (cloneElement loop) to a `<Sortable>` component that manages drag state. Individual tab's `draggable` prop is also OR'd with parent's `onChangeOrder` presence.
- **Suffix rendering priority** — `actionsAsDropdown` > `renderSuffix` > `suffixIcon` (suppresses actions) > `CardTabActions` (if any action callback present).
- **Double-click to rename** — `CardTabLabel` has an `onDoubleClick` handler that triggers `handleEditName` (same as clicking the rename action). While `edited=true`, the prefix is hidden and the suffix is replaced by `InlineEdit`.
- **`disabled` is visual only** — applies `pointer-events: none` on the container div, but does not disable action icons individually; individual buttons inside the card are not disabled.
- **`invalid` + `active` combination** — when both are true, the background becomes `red-600` and hover/active states use `getLighterColor('red-600')` (i.e., `red-500`).
- **`index` prop does not exist** — the README incorrectly documents an `index` prop; no such prop is in `CardTabProps`.
