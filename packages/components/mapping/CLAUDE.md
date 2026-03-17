# Mapping (`@synerise/ds-mapping`)

> A two-column data-mapping UI — each row renders a left component and a right component (with an optional centre column), with optional batch selection via tristate checkbox.

## Package structure

```
src/
  Mapping.tsx                                       — main component (generic)
  Mapping.types.ts                                  — MappingProps, BaseItemType, BatchSelectionType, MappingTexts, etc.
  Mapping.styles.ts                                 — all styled components
  index.ts                                          — public exports
  components/
    BatchSelectionHeader/BatchSelectionHeader.tsx   — header bar with tristate checkbox, counter, action buttons, toggle button
    RowSelection/RowSelection.tsx                   — per-row checkbox
    TitleRow/TitleRow.tsx                           — column title row with optional info tooltips
  hooks/
    useBatchSelection.ts                            — checkbox state machine (none / some / all)
    useTexts.ts                                     — i18n defaults via react-intl
  utils/
    counter.tsx                                     — default counter renderer
  __specs__/
    Mapping.spec.tsx                                — Jest tests
```

## Public exports

### `Mapping` (default export)

Generic component: `Mapping<ItemType extends BaseItemType>`.

`MappingProps<T> = WithHTMLAttributes<HTMLDivElement, { … }>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `Array<T>` | — (required) | Items to render; each must have `id: string \| number` |
| `leftComponent` | `(props: { item: T, index: number }) => ReactNode` | — (required) | Render function for the left column cell |
| `rightComponent` | `(props: { item: T, index: number }) => ReactNode` | — (required) | Render function for the right column cell |
| `centerComponent` | `(props: { item: T, index: number }) => ReactNode` | — | Optional centre column (e.g. an arrow icon); omitting it collapses the centre slot |
| `batchSelection` | `BatchSelectionType<T>` | — | Enables selection header with tristate checkbox and action buttons |
| `leftTitle` | `ReactNode` | — | Column heading above the left cells |
| `leftTitleTooltip` | `TooltipProps` | — | Info icon tooltip for the left heading |
| `rightTitle` | `ReactNode` | — | Column heading above the right cells |
| `rightTitleTooltip` | `TooltipProps` | — | Info icon tooltip for the right heading |
| `texts` | `Partial<MappingTexts>` | see defaults | i18n overrides for the batch-selection toggle button |

Accepts all standard `<div>` HTML attributes.

### `MappingProps`

Full props type re-export.

### `BaseItemType`

`{ id: string | number }` — minimum shape required by `dataSource`.

### `BatchSelectionType<T>`

| Field | Type | Description |
|-------|------|-------------|
| `onSelectionChange` | `(selectedIds: T['id'][]) => void` | Called (via `useEffect`) whenever selection changes |
| `actionButtons` | `ReactNode` | Buttons shown in the header when at least one item is selected |
| `renderCounter` | `(selectedCount: number, total: number) => ReactNode` | Custom counter; defaults to `"N Items"` / `"N Selected"` |

### `MappingTexts` (i18n defaults)

| Key | Default |
|-----|---------|
| `enableBatchSelection` | `'Bulk actions'` |
| `disableBatchSelection` | `'Hide actions'` |

## Usage patterns

```tsx
import Mapping from '@synerise/ds-mapping';
import type { BaseItemType } from '@synerise/ds-mapping';

type RowItem = BaseItemType & { paramName: string; mappedName: string };

<Mapping<RowItem>
  dataSource={rows}
  leftComponent={({ item }) => <Input value={item.paramName} readOnly />}
  rightComponent={({ item }) => <Input value={item.mappedName} />}
  centerComponent={() => <Icon component={<ArrowRightM />} />}
  leftTitle="Source parameter"
  rightTitle="Target parameter"
/>
```

## Custom hooks

### `useBatchSelection`

Manages `selectedItemIds` state and derives `batchSelectionCheckboxState` (`true` = all, `false` = none, `undefined` = indeterminate). Returns `{ selectedItemIds, setSelectedItemIds, handleBatchCheckboxChange, batchSelectionCheckboxState }`.

### `useTexts`

Merges `react-intl` defaults with `texts` prop override. Returns a complete `MappingTexts` object.

## Styling

`Mapping.styles.ts`. Uses `theme.palette['grey-300']` for the batch selection header border. The wrapper has no gap when `dataSource.length === 1` (`isCompact` mode); otherwise `gap: 16px` between rows.

## Key dependencies

- `@synerise/ds-checkbox` — tristate batch checkbox and per-row row selection
- `@synerise/ds-tooltip` + `@synerise/ds-icon` — info icon on column titles
- `@synerise/ds-utils` — `WithHTMLAttributes`
- `react-intl` — i18n for batch-action toggle labels; requires `IntlProvider`

## Implementation notes

- **Batch selection is opt-in** — omit `batchSelection` entirely to hide the header and checkboxes.
- **Selection is local state** — `selectedItemIds` lives inside `Mapping`; `onSelectionChange` is fired via `useEffect` on every change. The parent does not control selection.
- **Action buttons visibility** — shown only when `enabled && checkboxState !== false` (i.e. at least one item is checked).
- **`texts` prop is missing from the README** — `MappingTexts` and the `texts` prop are not documented.
- **Test runner is Jest** (not Vitest).
