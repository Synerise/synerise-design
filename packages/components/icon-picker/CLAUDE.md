# IconPicker (`@synerise/ds-icon-picker`)

> A dropdown icon picker that supports three icon sources: DS icons (`'design-system'`), Font Awesome icons (`'font-awesome'`), or a custom `DataSource[]`. Returns a strongly-typed value depending on the source.

## Package structure

```
src/
  IconPicker.tsx              — root component; trigger rendering, search filter, dropdown
  IconPicker.types.ts         — all types including generics; exported from index
  IconPicker.styles.tsx       — styled-components for overlay, list, items
  IconPicker.const.ts         — ITEMS_PER_ROW (6), ELEMENT_HEIGHT (32px)
  index.ts                    — default export + type exports
  components/
    Overlay/
      Overlay.tsx             — search input (Dropdown.SearchInput) + List
      Overlay.types.ts        — OverlayType (internal)
    List/
      List.tsx                — virtualised list with Scrollbar and empty state
      ListItem/
        ListItem.tsx          — single icon cell with tooltip + button
        ListItem.types.ts     — ListItemProps (internal)
    RowItem.tsx               — react-window row renderer (memo + areEqual)
  hooks/
    useIconSourceLoader.tsx   — loads icons based on source type; async for FA
    useGroupItems.ts          — flattens grouped data into virtual list rows
  utils/
    createItemData.ts         — memoized factory for react-window itemData
    loadFontAwesome.ts        — dynamic import() of all FA icon packs
    matchesSearchQuery.ts     — keyword matching for search filter
    prepareItems.ts           — normalises DataSource[] to FilterElement[]
    typeguards.utils.ts       — isFASourceType, isDSSourceType, isData, isCategories
  __specs__/
    IconPicker.spec.tsx       — render, selection, DS/FA source tests (Jest)
```

## Public exports

### `IconPicker` (default)

Generic component: `IconPicker<Source extends SourceType>`. The type of `onSelect`'s argument depends on `data`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `'design-system' \| 'font-awesome' \| DataSource[]` | — | Icon source. Determines `onSelect` value type. |
| `onSelect` | `(value: ValueTypeForSource<Source>) => void` | — | Called when an icon is clicked. Value is `[IconPrefix, IconName]` for FA; `ReactNode` for DS/custom. |
| `trigger` | `PopoverTriggerType[]` | — | Dropdown trigger types, e.g. `['click']`. |
| `placeholder` | `string` | — | Search input placeholder text. |
| `button` | `ReactElement` | — | Custom trigger element. **Typed as required but has a fallback** — if omitted, renders a default "Choose icon" button or the selected-icon button-group (see implementation notes). |
| `selectedIcon` | `ReactNode` | `undefined` | The currently-selected icon to display. When truthy, renders a `ButtonGroup` with the icon + a red clear button instead of the default trigger. |
| `onClear` | `() => void` | `undefined` | Called when the clear button is clicked (only shown when `selectedIcon` is set). |
| `clearTooltip` | `ReactNode` | `undefined` | Tooltip text on the clear button. |
| `noResultMsg` | `ReactNode` | `<FormattedMessage id="DS.ICON-PICKER.NO-RESULTS" />` | Message shown when search returns no results. |

### Exported types

| Type | Description |
|------|-------------|
| `IconPickerProps<Source>` | Full props interface (generic) |
| `SourceType` | `'font-awesome' \| 'design-system' \| DataSource[]` |
| `FASource` | `'font-awesome'` |
| `DSSource` | `'design-system'` |
| `FAValue` | `[IconPrefix, IconName]` — value returned by FA `onSelect` |
| `DataSource` | Custom data source shape: `{ category, items: [{ item, value?, keywords? }] }` |
| `FilterElement<V>` | Normalised group: `{ category, items: FilterItem<V>[] }` |
| `FilterItem<V>` | `{ keywords?, value, item }` |

## Usage patterns

```tsx
import IconPicker from '@synerise/ds-icon-picker';
import type { DSSource, FASource, FAValue, DataSource } from '@synerise/ds-icon-picker';

// DS Icons — onSelect receives ReactNode
const [icon, setIcon] = useState<ReactNode>(null);
<IconPicker<DSSource>
  data="design-system"
  onSelect={setIcon}
  selectedIcon={icon}
  onClear={() => setIcon(null)}
  trigger={['click']}
  placeholder="Search"
  clearTooltip="Remove"
/>

// Font Awesome — onSelect receives [IconPrefix, IconName]
const [fa, setFa] = useState<FAValue | null>(null);
<IconPicker<FASource>
  data="font-awesome"
  onSelect={setFa}
  selectedIcon={fa ? <FontAwesomeIcon icon={fa} /> : null}
  onClear={() => setFa(null)}
  trigger={['click']}
  placeholder="Search"
/>

// Custom DataSource[]
const myIcons: DataSource[] = [
  {
    category: 'Emoji',
    items: [
      { item: '😀', value: 'grinning', keywords: 'grinning smile happy' },
    ],
  },
];
<IconPicker
  data={myIcons}
  onSelect={(value) => console.log(value)}
  trigger={['click']}
  placeholder="Search"
/>

// Custom trigger button
<IconPicker
  data="design-system"
  button={<Button type="primary">Select icon</Button>}
  onSelect={setIcon}
  trigger={['click']}
  placeholder="Search"
/>
```

## Custom hooks

### `useIconSourceLoader`

Loads icons based on the `data` prop and returns `FilterElement[]`.
- `'design-system'` → synchronously imports `@synerise/ds-icon/dist/icons/M` (deep import) and sets state
- `'font-awesome'` → dynamically imports all FA packs via `Promise.all` (async, icons appear after load)
- `DataSource[]` → runs `prepareItems()` synchronously

> **Anti-pattern:** `loadedItems()` is called **directly in the hook body on every render** (not inside `useEffect`). The `!items.length` guard prevents repeated state updates, but the callback itself runs every render cycle.

### `useGroupItems`

Flattens `FilterElement[]` into `GroupedFilterElement[]` for react-window. Each entry is either a `[Category]` header row or a `FilterItem[]` row (up to `ITEMS_PER_ROW` items). Memoized with `useMemo`.

## Key dependencies

- `react-window` (`FixedSizeList`) — virtualises the icon grid (item height = 32px, max visible = 330px)
- `@synerise/ds-scrollbar` — wraps virtual list; scroll events forwarded manually via `listRef.current.scrollTo()`
- `@fortawesome/*` — **peer dependencies**, loaded lazily via `loadFontAwesome()` only when `data='font-awesome'`
- `react-intl` — **peer dependency** — default `noResultMsg` uses `<FormattedMessage>`; `IntlProvider` must be in the tree
- `memoize-one` — memoizes `createItemData` for react-window

## Implementation notes

- **`button` is required in types but optional in practice** — TypeScript will error if omitted, but the component renders a default "Choose icon" button when `button` is falsy. If you want to suppress the TS error, pass `button={undefined as unknown as ReactElement}` or use the default.
- **Font Awesome icons load asynchronously** — the picker renders empty until `loadFontAwesome()` resolves. No loading state is shown.
- **Selection state is fully controlled** — the component has no internal selection state. Pass `selectedIcon` and handle `onClear` to control the selected-state UI.
- **`selectedIcon` toggles the trigger entirely** — when truthy, the default trigger button is replaced with `ButtonGroup` (selected icon + clear button). The `button` prop is ignored in this state.
- **`ListItem` has a fragile Avatar check** — `(element.item as any).type.name === 'Avatar'` detects Avatar items by component name. Minification or renaming will break this.
- **Deep import for DS icons** — `import * as medium from '@synerise/ds-icon/dist/icons/M'` is a fragile path that may break if `@synerise/ds-icon` restructures its dist output.
- **Uses Jest** (not Vitest) — `package.json` has `"test": "jest"`. Spec also uses `jest.fn()`. Not yet migrated.
- **`react-intl` is required** — `IntlProvider` must be present for the default `noResultMsg`. Tests use `renderWithProvider` from `@synerise/ds-core`.
