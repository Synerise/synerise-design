# ItemPicker (`@synerise/ds-item-picker`)

> A dropdown-based single-item selector with search, sections, folder navigation, async infinite loading, and action items, available in a current ("new") API and a deprecated legacy API.

## Package structure

```
src/
  ItemPicker.tsx                  — default export; router that dispatches to ItemPickerNew or ItemPickerLegacy based on `isNewVersion` prop
  ItemPicker.styles.ts            — minimal wrapper styled-component
  index.ts                        — public exports
  hooks/
    useDefaultTexts.tsx           — resolves all i18n text defaults via react-intl
  modules.d.ts                    — ambient module declarations
  components/
    ItemPickerNew/
      ItemPickerNew.tsx           — current picker: FormField + Dropdown + Trigger + ItemPickerList
      ItemPickerNew.types.ts      — ItemPickerProps (new), ItemPickerListProps, ItemLoaderConfig, etc.
      types/
        actions.types.ts          — Action union type (redirect | custom | searchBy | searchIn)
        baseItemSectionType.types.ts — BaseItemType, BaseSectionType, BaseSectionTypeWithFolders
        itemPickerListTexts.types.ts — ItemPickerListTexts (all 23 text keys)
    ItemPickerList/
      ItemPickerList.tsx          — virtualised list (react-window VariableSizeList), search, sections, keyboard nav
      ItemPickerList.types.ts     — ItemPickerListAPI, ItemSelectHandler, ItemPickerListRef
      ItemPickerList.styles.ts
      constants.ts                — ITEM_SIZE, ITEMS_PER_PAGE (150), ITEMS_PER_SECTION (4), DEFAULT_HEIGHT (420)
      types/renderMode.ts         — RENDER_MODES enum
      hooks/
        useItemsInSections.tsx    — core state machine: section/folder navigation, async loading, infinite scroll, search
        useItemsInSections.utils.tsx
        useFlattenFolders.ts      — resolves nested folder structure
        useListHeight.ts          — calculates outer/list/offset heights from containerHeight config
      utils/
        actionItemsUtils.tsx      — builds action rows in the list
        createTitleFromTitlePath.ts
        findSectionById.ts        — exported utility
        getContextAwareActions.ts
        getSearchByActionItems.tsx
        isNavKey.ts
        resolveSectionId.ts
        typeguards.utils.ts
      components/
        EmptyListMessage.tsx      — empty state with optional "search all folders" CTA
        ErrorItem.tsx / ErrorMessage.tsx — error state
        InfiniteLoaderItem.tsx    — loading-more / all-loaded / error-more row
        ItemPickerListFooter.tsx  — optional refresh button footer
        ItemPickerListRow.tsx     — react-window row renderer
        ItemPickerListSkeleton.tsx — initial loading skeleton
        ListSearchInput.tsx       — search bar with searchBy param chip
        LoadingItem.tsx / NoMoreItem.tsx
    ItemPickerLegacy/
      ItemPickerLegacy.tsx        — @deprecated; uses ItemPickerDropdown + Trigger
      ItemPickerLegacy.types.ts   — ItemPickerProps (legacy)
      ItemPicker.spec.tsx         — Jest tests
    ItemPickerDropdown/
      ItemPickerDropdown.tsx      — @deprecated internal dropdown for legacy picker
      ItemPickerDropdown.types.ts
      ItemPickerDropdown.style.ts
    ItemPickerTrigger/
      Trigger.tsx                 — shared trigger button (selected value / placeholder, clear icon, change button)
      Trigger.types.ts            — ItemPickerTriggerProps
      Trigger.styles.ts
```

## Public exports

### Default export — `ItemPicker`

A polymorphic `forwardRef` component. Renders `ItemPickerNew` when `isNewVersion: true`, otherwise renders `ItemPickerLegacy`.

```ts
type ItemPickerType = <ItemType extends BaseItemType, SectionType extends BaseSectionType>(
  p: ItemPickerProps | (ItemPickerPropsNew<ItemType, SectionType> & { ref?: ItemPickerListRef })
) => JSX.Element;
```

---

### `ItemPickerNew` (named export)

Current API. Generic over `ItemType extends BaseItemType` and `SectionType extends BaseSectionType | undefined`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isNewVersion` | `true` | — | **Required** discriminant to select this branch via `ItemPicker` default export |
| `items` | `ItemType[] \| ItemsConfig<ItemType> \| ItemLoaderConfig<ItemType>` | — | Fixed array, array-with-limit config, or async loader config |
| `selectedItem?` | `ItemType` | — | Currently selected item |
| `onChange?` | `(item: ItemType) => void` | — | Called when an item is selected; dropdown closes automatically |
| `onClear?` | `() => void` | — | Called when the trigger clear icon is clicked |
| `sections?` | `BaseSectionTypeWithFolders<SectionType>[]` | — | Section/folder tree; enables section-navigation mode |
| `recents?` | `ItemType[]` | — | Recent items shown at top |
| `actions?` | `Action[]` | — | Action rows (redirect / custom / searchBy / searchIn); shown on `/` keystroke |
| `isLoading?` | `boolean` | — | External loading state (shows skeleton) |
| `onRefresh?` | `() => void` | — | Enables footer refresh button (async items also get an auto refresh) |
| `onSectionChange?` | `(section?) => void` | — | Fired when the user navigates into a section |
| `containerHeight?` | `'fitContent' \| 'fillSpace' \| HeightConfig` | preset (420px) | List height strategy |
| `showItemsSectionLabel?` | `boolean` | `true` | Show "Items" section title row |
| `noResultsIcon?` / `emptyListIcon?` | `ReactNode` | — | Custom empty-state icons |
| `getItemHeight?` | `(item) => number` | — | Override per-item height |
| `scrollbarProps?` | `ScrollbarAdditionalProps` | — | Passed to `@synerise/ds-scrollbar` |
| `searchBarProps?` | `Omit<SearchBarProps, 'value' \| 'onSearchChange' \| 'placeholder'>` | — | Extra props for the search bar |
| `includeFooter?` | `boolean` | `true` | Show refresh footer |
| `includeSearchBar?` | `boolean` | `true` | Show search bar |
| `texts?` | `Partial<ItemPickerTexts>` | (react-intl defaults) | Override any of the 23 localised text strings |
| `triggerProps?` | `{ size?, allowClear?, withChangeButton?, withClearConfirmation?, informationCardTooltipProps? }` | — | Props forwarded to the default `Trigger` |
| `renderTrigger?` | `(props) => ReactNode` | — | Completely replace the trigger; receives `{ selected, openDropdown, closeDropdown, error, disabled }` |
| `placeholder?` | `ReactNode` | — | Trigger placeholder text |
| `placeholderIcon?` | `ReactNode` | — | Icon shown in placeholder state |
| `label?` | `ReactNode` | — | `FormField` label |
| `description?` | `ReactNode` | — | `FormField` description |
| `tooltip?` | `ReactNode` | — | `FormField` tooltip |
| `tooltipConfig?` | `FormFieldCommonProps['tooltipConfig']` | — | `FormField` tooltip config |
| `error?` | `boolean` | — | Error state on trigger and FormField |
| `errorText?` | `FormFieldCommonProps['errorText']` | — | Preferred error message |
| `errorMessage?` | `FormFieldCommonProps['errorText']` | — | **@deprecated** — use `errorText` |
| `disabled?` | `boolean` | — | Disables trigger and dropdown |
| `onFocus?` / `onBlur?` | `() => void` | — | Fired on dropdown open/close |
| `onLoadedData?` | `OnLoadedData` | — | Callback after each async page loads |
| `dropdownProps?` | `Partial<Omit<DropdownSharedProps, 'children' \| 'overlay' \| 'disabled'>>` | — | Extra props for `@synerise/ds-dropdown` |

`ref` (via `forwardRef`) exposes `ItemPickerListAPI`:

| Method / Property | Description |
|-------------------|-------------|
| `reloadActiveSection()` | Re-fetches the currently active section from page 0 |
| `currentSection` | The currently active section object |
| `activeSectionId` | `string \| undefined` |

---

### `ItemPickerList` (named export)

Standalone list panel without the trigger/dropdown shell. Accepts `ItemPickerListProps<ItemType, SectionType>` — a superset of the props above plus:

| Prop | Type | Notes |
|------|------|-------|
| `onItemSelect` | `ItemSelectHandler<ItemType, SectionType>` | **Required** |
| `isVisible?` | `boolean` | Controls reset-on-open behaviour |
| `isDropdown?` | `boolean` | Suppresses scroll-end events when not visible |
| `containerRef?` | `Ref<HTMLDivElement>` | Additional ref combined with internal ref |

---

### `ItemPickerLegacy` (named export) — **@deprecated**

Use `ItemPicker` (default) with `isNewVersion` instead.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `ListItemProps[]` | — | Items array |
| `onChange` | `(item: ListItemProps) => void` | — | Selection callback |
| `onClear?` | `() => void` | — | Clear callback |
| `placeholder` | `ReactNode` | — | Trigger placeholder |
| `selectedItem?` | `ListItemProps` | — | Selected item |
| `size?` | `'small' \| 'large'` | `'small'` | Trigger size |
| `dropdownVisibleRows?` | `number` | `10` | Max visible rows in dropdown |
| `dropdownRowHeight?` | `number` | `32` | Row height (px) |
| `dropdownBottomAction?` | `ReactNode` | — | Bottom slot |
| `closeOnBottomAction?` | `boolean` | `false` | Close on bottom action click |
| `searchPlaceholder?` | `string` | `'Search'` | Search bar placeholder |
| `noResults?` | `string` | `'No results'` | No-results message |
| `clear?` | `ReactNode` | `'Clear'` | Clear tooltip |
| `changeButtonLabel?` | `ReactNode` | `'Change'` | Change button label (large size) |
| `withClearConfirmation?` | `boolean` | — | Show Popconfirm before clearing |
| `clearConfirmTitle?` | `string` | `'Please confirm'` | Popconfirm title |
| `yesText?` / `noText?` | `string` | `'Yes'` / `'No'` | Popconfirm buttons |
| `error?` | `boolean` | — | Error state |
| `errorMessage?` | `ReactNode` | — | Error text |
| `disabled?` | `boolean` | — | Disabled state |
| `hideSearchBar?` | `boolean` | — | Hide search bar |
| `searchBarProps?` | `Partial<SearchBarProps>` | — | Extra search bar props |
| `scrollbarProps?` | `ScrollbarAdditionalProps` | — | Scrollbar config |
| `informationCardTooltipProps?` | `Omit<InformationCardTooltipProps, 'children'>` | — | Info card tooltip on trigger |
| `label?`, `description?`, `tooltip?`, `tooltipConfig?` | `FormFieldCommonProps` fields | — | FormField meta |
| `onBlur?` / `onFocus?` | `() => void` | — | Open/close side-effects |

---

### `ItemPickerTrigger` (named export)

The standalone trigger button, exported for custom dropdown implementations.

---

### Type exports

| Symbol | Source |
|--------|--------|
| `ItemPickerProps` | Legacy props (re-exported from `ItemPickerLegacy.types`) |
| `ItemPickerPropsNew` | New picker props |
| `ItemPickerListProps` | Standalone list props |
| `ItemLoaderConfig<ItemType>` | Async loader configuration |
| `ItemLoaderResponse<ItemType>` | Return type of `loadItems` |
| `LoaderProps` | Argument to `loadItems` |
| `OnLoadedData` | Callback type for `onLoadedData` |
| `ItemSelectHandler` | `onItemSelect` callback type |
| `ItemPickerListAPI` | Ref handle type |
| `BaseItemType` | Minimum item shape |
| `BaseSectionType` | Minimum section shape |
| `BaseSectionTypeWithFolders` | Section with optional `folders` tree |
| `ItemPickerListTexts` | All 23 localisation text keys |
| `Action` | Union of action types |
| `findSectionById` | Utility: finds a section by id in a nested section tree |

---

## Usage patterns

### Minimal — flat list

```tsx
import ItemPicker from '@synerise/ds-item-picker';

const [selected, setSelected] = useState<MyItem | undefined>();

<ItemPicker
  isNewVersion
  placeholder="Select an item"
  items={myItems}
  selectedItem={selected}
  onChange={setSelected}
  onClear={() => setSelected(undefined)}
/>
```

### Async infinite scroll

```tsx
import ItemPicker, { type ItemLoaderConfig } from '@synerise/ds-item-picker';

const loaderConfig: ItemLoaderConfig<MyItem> = {
  limitPerPage: 50,
  loadItems: async ({ page, limit, searchQuery, sectionId, abortController }) => {
    const data = await fetchItems({ page, limit, searchQuery, sectionId });
    return { items: data.results, total: data.total };
  },
};

<ItemPicker isNewVersion items={loaderConfig} placeholder="Pick…" onChange={handleChange} />
```

### With sections and folders

```tsx
<ItemPicker
  isNewVersion
  items={loaderConfig}
  sections={[
    { id: 'seg', text: 'Segmentations', folders: [{ id: 'f1', text: 'Folder A' }] },
  ]}
  onSectionChange={(section) => console.log('navigated to', section)}
  onChange={handleChange}
  placeholder="Pick segmentation"
/>
```

### Imperative reload via ref

```tsx
import ItemPicker, { type ItemPickerListAPI } from '@synerise/ds-item-picker';
import { useRef } from 'react';

const ref = useRef<ItemPickerListAPI | null>(null);

<ItemPicker isNewVersion ref={ref} items={loaderConfig} onChange={handleChange} placeholder="…" />

// Reload after an external mutation:
ref.current?.reloadActiveSection();
```

### Standalone list (no trigger)

```tsx
import { ItemPickerList } from '@synerise/ds-item-picker';

<ItemPickerList items={myItems} onItemSelect={(item) => console.log(item)} />
```

---

## Styling

- All styled-components; no hardcoded colours — uses `@synerise/ds-core` theme tokens.
- The outer wrapper is `S.ItemPickerWrapper` (just `position: relative`).
- List layout driven by `useListHeight`; default height 420 px, drops to 350 px below 800 px viewport threshold.
- `containerHeight` prop accepts `'fitContent'` (shrinks to content), `'fillSpace'` (100%), or an explicit `HeightConfig` object.

---

## Key dependencies

| Package | Role |
|---------|------|
| `react-window` | Virtualised `VariableSizeList` for item rows |
| `@synerise/ds-dropdown` | Popover shell (Floating UI-based) |
| `@synerise/ds-form-field` | Label / description / error / tooltip wrapper |
| `@synerise/ds-list-item` | Row components and `itemSizes` constants |
| `@synerise/ds-scrollbar` | Custom scrollbar wrapping the list |
| `@synerise/ds-search-bar` | Search input in list header |
| `@synerise/ds-popconfirm` | Clear-confirmation dialog |
| `@synerise/ds-information-card` | Optional info tooltip on trigger |
| `lodash.debounce` | 300 ms debounce on search query |
| `uuid` | Unique class-name per list instance (used by `focusWithArrowKeys`) |
| `react-intl` | All default text strings |

---

## Implementation notes

- **Version switch**: `ItemPicker` (default) checks `'isNewVersion' in props && props.isNewVersion` at render time. No runtime flag registry — purely prop-driven.
- **Async loading race prevention**: `useItemsInSections` tracks a `requestIdRef` UUID and discards stale responses.
- **AbortController**: each `loadItems` call gets a fresh `AbortController`; the previous one is aborted on re-trigger (section change, search, refresh).
- **Search action trigger**: typing `/` into the search bar activates the global actions list (`listActions = searchQuery === '/'`).
- **Infinite scroll**: only active for `ItemLoaderConfig` items in `LIST_ITEMS` render mode. Pages are tracked via `pageToLoad.current`; deduplication relies on the caller returning accurate `total`.
- **Section/folder rendering modes** (`renderMode.ts`):
  - `LIST_ITEMS` — flat list
  - `LIST_ITEMS_IN_SECTIONS` — items grouped under section headers
  - `LIST_FOLDERS_IN_SECTIONS` — folder tiles (no items loaded yet)
- **`ItemPickerLegacy` is marked `@deprecated`** in source with a JSDoc comment on the component itself.
- **`errorMessage` prop** on `ItemPickerNew` is marked `@deprecated`; prefer `errorText` (from `FormFieldCommonProps`).
- **Several `ItemPickerTriggerProps` fields are `@deprecated`**: `clear`, `changeButtonLabel`, `clearConfirmTitle`, `yesText`, `noText` — move to `texts` object.
- **`Props` alias** in `Trigger.types.ts` is marked `@deprecated`; use `ItemPickerTriggerProps`.
- **Tests use Jest** (`jest.config.js` present); the package has not been migrated to Vitest.
- The search-bar `searchPlaceholder` in `ItemPickerNew` must be overridden via `texts.searchPlaceholder` (not a top-level prop), unlike `ItemPickerLegacy` where it is a direct prop.
- `ItemPickerList` generates a unique per-instance CSS class via `uuid()` on mount; `focusWithArrowKeys` from `@synerise/ds-utils` uses this class for keyboard navigation.
