# ContextSelector (`@synerise/ds-context-selector`)

> A dropdown-based selector for structured, grouped data (e.g. events, attributes, segments) with tabs, sub-group navigation, search, virtualized list rendering, and a hover info-card on the selected trigger.

## Package structure

```
src/
  ContextSelector.tsx          — main component; trigger button + Dropdown wrapper
  ContextSelector.types.ts     — all prop interfaces and shared types
  ContextSelector.styles.ts    — styled-components for dropdown internals
  ContextSelectorDropdown/
    ContextSelectorDropdown.tsx     — dropdown overlay; tabs, search, virtualized list
    ContextSelectorDropdownItem.tsx — single list row (wraps ds-list-item)
    utils.ts                        — isListTitle, isGroup type guards
  hooks/
    useTexts.ts              — merges i18n defaults with caller-provided texts
  constants.ts               — dropdown heights, item sizes
  index.ts                   — public exports
```

## Public exports

### `ContextSelector` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `groups` | `ContextGroup[]` | — | **Required.** Defines top-level tabs when length > 1. |
| `items` | `ContextItem[]` | — | **Required.** All selectable leaf items. |
| `onSelectItem` | `(item: ContextItem \| ContextGroup \| undefined) => void` | — | **Required.** Called on item selection; dropdown closes. |
| `selectedItem` | `ContextItem \| undefined` | `undefined` | Currently selected item. Changes trigger button appearance. |
| `texts` | `Partial<ContextTexts>` | i18n defaults | Override any label text. Falls back to `react-intl` formatted messages. |
| `type` | `'default' \| 'attribute' \| 'event'` | `undefined` | Controls trigger colour when an item is selected: `'event'` → `cyan`, others → `green`. |
| `readOnly` | `boolean` | `false` | Skips the `Dropdown` entirely; renders only the trigger (no click handler). |
| `disabled` | `boolean` | `undefined` | Passes `disabled` to the trigger button. |
| `addMode` | `boolean` | `undefined` | When no item is selected, shows a primary `+` button instead of the colour-coded trigger. |
| `loading` | `boolean` | `undefined` | Shows a skeleton in the dropdown body. |
| `recentItems` | `ContextItem[]` | `undefined` | When provided and groups has ≤1 entry, items are split into "Recent" / "All" sections. |
| `defaultDropdownVisibility` | `boolean` | `false` | Initial open state; also re-synced via effect when the value changes. |
| `opened` | `boolean` | `undefined` | One-way external open trigger — setting to `true` opens the dropdown. |
| `onOpen` | `() => void` | `undefined` | Called when trigger button is clicked (before dropdown opens). |
| `onActivate` | `(fieldType: string) => void` | `undefined` | Called when dropdown becomes visible (receives empty string). |
| `onDeactivate` | `() => void` | `undefined` | Called on dropdown dismiss. |
| `onSetGroup` | `(item: ContextItem \| ContextGroup \| undefined) => void` | `undefined` | Called when a sub-group row is clicked (navigation into sub-group). |
| `onSearch` | `(query: string) => void` | `undefined` | Enables server-side search. When provided, client-side filtering is disabled. |
| `hideSearchField` | `boolean` | `false` | Hides the search input inside the dropdown. |
| `onFetchData` | `() => void` | `undefined` | Called when scrollbar reaches the bottom (infinite scroll). |
| `hasMoreItems` | `boolean` | `undefined` | Required for infinite scroll to fire `onFetchData`. |
| `onClickOutside` | `() => void` | `undefined` | Called on outside-press dismiss. |
| `onClickOutsideEvents` | `HandledEventsType[]` | `undefined` | Overrides the event types watched for outside-press. |
| `menuItemHeight` | `ItemSize` | `ItemSize.DEFAULT` | Height of each dropdown row: `'large'` (50px) or `'default'` (32px). |
| `dropdownWrapperStyles` | `CSSProperties` | `undefined` | Inline styles applied to `Dropdown.Wrapper`. |
| `customTriggerComponent` | `ReactNode` | `undefined` | Replaces the built-in trigger button entirely. |
| `trigger` | `PopoverTriggerType \| PopoverTriggerType[]` | `['click']` | Dropdown open trigger event(s). |
| `getPopupContainerOverride` | `(trigger: HTMLElement \| null) => HTMLElement` | `getPopupContainer` | Overrides popup container for both the dropdown and inner tooltips. |
| `dropdownProps` | `Omit<DropdownSharedProps, 'trigger' \| 'getPopupContainer' \| 'overlay' \| 'children'>` | `undefined` | Extra props forwarded to `ds-dropdown`. |
| `errorText` | `ReactNode` | `undefined` | Error message rendered below the component; also triggers error styling on the trigger. |
| `isError` | `boolean` | `undefined` | Shows error styling without a message. |
| `popoverDelay` | `DelayConfig` | `undefined` | Passed via `ListContextProvider` to all list item hover popovers. |
| `dropdownDimensionsConfig` | `{ defaultHeight?: number; lowerHeight?: number; threshold?: number }` | `{ 420, 350, 900 }` | Overrides responsive height thresholds (px). |

### Types

| Export | Description |
|--------|-------------|
| `ContextProps` | Full props for `ContextSelector` |
| `ContextItem` | A selectable leaf item (see below) |
| `ContextGroup` | A group / tab header (see below) |
| `ContextTexts` | Shape of the `texts` prop |
| `ContextDropdownProps` | Props for the internal `ContextSelectorDropdown` (not for external use) |
| `ContextSelectorDropdownItemProps` | Props for the internal list row (not for external use) |
| `ContextItemsInSubGroup` | `ContextItem & { isGroup?: boolean }` — internal navigation marker |
| `DropdownItemProps` | Union of all virtual-list row types |

#### `ContextItem` shape

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `ReactText \| null` | Yes | Unique identifier |
| `name` | `string` | Yes | Display label |
| `icon` | `ReactNode` | Yes | Icon shown in list and trigger |
| `groupId` | `ReactText` | No | Ties item to a `ContextGroup` |
| `groupName` | `string` | No | Used as section header when no tab groups |
| `subGroups` | `ContextGroup[]` | No | Nested sub-groups |
| `description` | `ReactNode` | No | Shown below name (use with `menuItemHeight="large"`) |
| `subtitle` | `string` | No | Shown in the hover info-card |
| `value` | `ReactText \| null` | No | Alternative value (not used in selection logic) |
| `customSuffix` | `ReactNode` | No | Replaces the check-mark suffix |
| `useCustomIcon` | `boolean` | No | Renders `icon` directly instead of wrapping in `<Icon>` |
| `excludeFromSearchResults` | `boolean` | No | Excludes item from client-side search |
| `informationCardProps` | `Partial<InformationCardProps>` | No | Overrides props on the hover info-card |
| `renderAdditionalDescription` | `() => ReactNode` | No | Extra content in hover info-card |
| `renderHoverTooltip` | `() => ReactNode` | No | Replaces the entire hover info-card |
| `popoverProps` / `disabled` | (from `ListItemProps`) | No | Forwarded to the underlying `ds-list-item` |

#### `ContextGroup` shape

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `ReactText` | Yes | Unique identifier; matched against `ContextItem.groupId` |
| `name` | `string` | Yes | Tab label |
| `defaultGroup` | `boolean` | No | Marks which tab is active on open |
| `icon` | `ReactNode` | No | Icon in sub-group list row |
| `subGroups` | `ContextGroup[]` | No | Enables sub-group navigation within a tab |
| `description` | `ReactNode` | No | Row description |
| `tooltip` | `string` | No | Tooltip on the group row |
| `itemType` / `customSuffix` / `useCustomIcon` | — | No | Same semantics as `ContextItem` |

## Usage patterns

```tsx
import ContextSelector from '@synerise/ds-context-selector';

// Minimal (with react-intl IntlProvider in the tree)
<ContextSelector
  groups={[{ id: 'all', name: 'All', defaultGroup: true }]}
  items={[{ id: 1, name: 'Revenue', icon: <ChartLineM />, groupId: 'all' }]}
  onSelectItem={(item) => setSelected(item)}
  selectedItem={selected}
/>

// With tabs (groups.length > 1 renders tabs)
<ContextSelector
  groups={[
    { id: 'events', name: 'Events', defaultGroup: true },
    { id: 'attrs', name: 'Attributes' },
  ]}
  items={items}
  onSelectItem={handleSelect}
  type="event"
/>

// Server-side search + infinite scroll
<ContextSelector
  groups={groups}
  items={items}
  onSelectItem={handleSelect}
  onSearch={handleSearch}
  onFetchData={fetchNextPage}
  hasMoreItems={hasMore}
  loading={isLoading}
/>

// ReadOnly — renders trigger only, no dropdown
<ContextSelector
  groups={[]} items={[]}
  onSelectItem={() => {}}
  selectedItem={selected}
  readOnly
/>
```

## Custom hook

### `useTexts`

Merges i18n defaults (via `react-intl` `useIntl`) with caller-provided `Partial<ContextTexts>`. Returns a complete `ContextTexts` object.

**Requires `IntlProvider` in the React tree.** If no custom texts are provided, defaults are: `buttonLabel='Choose'`, `searchPlaceholder='Search'`, `noResults='No results'`, `showMore='Show more'`, `recentItemsGroupName='Recent'`, `allItemsGroupName='All'`.

## Styling

`ContextSelector.styles.ts` exports internal building blocks (`ItemsList`, `Title`, `ErrorWrapper`, `Skeleton`, etc.). Uses `@synerise/ds-core` theme palette tokens. No variant/theme prop pattern on the styles themselves — visual variants are controlled by props (`type`, `readOnly`, `addMode`).

## Key dependencies

- `@synerise/ds-dropdown` — outer `Dropdown` and `Dropdown.Wrapper` / `SearchInput` / `BackAction`
- `@synerise/ds-button` — trigger button with `custom-color`, `primary` modes
- `@synerise/ds-information-card` — hover card shown on the selected item trigger
- `@synerise/ds-list-item` — each dropdown row; `ListContextProvider` distributes `popoverDelay`
- `react-window` (`VariableSizeList`) — virtualised rendering of dropdown items
- `@synerise/ds-tabs` — tab bar when `groups.length > 1`
- `@synerise/ds-utils` — `useSearchResults` (client-side search), `focusWithArrowKeys`, `getClosest`
- `react-intl` — i18n for default text labels (peer requirement via `useTexts`)
- `uuid` — generates unique CSS class names for keyboard focus management in the list

## Implementation notes

- **`readOnly` short-circuits the entire Dropdown** — the component returns only the trigger when `readOnly=true`. No dropdown is mounted, no event listeners are attached.
- **Dismiss ignores `.ds-info-card` clicks** — the `dismissConfig.outsidePress` handler checks `getClosest(target, '.ds-info-card')`; clicks inside the hover info-card do not close the dropdown.
- **`opened` is one-way** — setting `opened=true` opens the dropdown but the component manages its own closed state internally. Setting `opened` back to `false` does nothing.
- **Viewport height adaptation** — a `resize` event listener adjusts dropdown height: `< 900px` → 350px, otherwise 420px. Override via `dropdownDimensionsConfig`.
- **`maxSearchResultsInGroup`** — hard-coded default of `4` inside `ContextSelectorDropdown`; not exposed through `ContextProps`.
- **Sub-group navigation resets on select** — selecting any item clears `activeGroup` and resets `activeTab` to the `defaultGroup` index.
- **`uuid` per render instance** — a unique CSS class is generated once per `ContextSelectorDropdown` mount and used for keyboard arrow-key focus management between search input and list items.
- **`@ts-expect-error` in groupByGroupName** — `groupName` is not on the `ContextGroup` type but is used at runtime when items are merged with their group names for the "Recent / All" split view.
