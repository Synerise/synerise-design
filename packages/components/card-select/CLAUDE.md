# CardSelect (`@synerise/ds-card-select`)

> A selectable card component with a tick/checkbox indicator, optional icon, tag ribbon, and info tooltip; `CardSelectGroup` lays multiple cards in a CSS grid.

## Package structure

```
src/
  CardSelect.tsx          — main component (wrapped in styled-components withTheme)
  CardSelect.types.ts     — CardSelectProps, CardSelectAlignType, CardSelectSizeType
  CardSelect.styles.ts    — all styled-components; uses styled-is for conditional styles
  CardSelectGroup/
    CardSelectGroup.tsx        — grid wrapper; renders from items array or children
    CardSelectGroup.types.ts   — CardSelectGroupProps
    CardSelectGroup.styles.ts  — CSS grid; deprecated CardGroup alias
  constants.ts            — default icon/tick sizes per size variant
  index.ts                — public exports
```

## Public exports

### `CardSelect` (default export)

Wrapped in `withTheme` — do **not** pass `theme` manually (it is `@deprecated`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | `false` | Whether the card is selected. Controls blue outline + tick state. |
| `onChange` | `(value: boolean) => void` | `undefined` | Fires with toggled boolean on click, **unless** `onClick` is also set. |
| `onClick` | `() => void` | `undefined` | When set, `onChange` is suppressed — use this for custom toggle logic. |
| `size` | `'small' \| 'medium'` | `'medium'` | Card padding, font sizes, icon/tick sizes, gap in group. |
| `title` | `ReactNode` | `undefined` | Card title text. |
| `description` | `ReactNode` | `undefined` | Subtitle text. **Not rendered when `size='small'`**. |
| `icon` | `ReactNode` | `undefined` | Icon element rendered above the title. |
| `iconSize` | `number` | `96` (medium) / `48` (small) | Overrides the default icon size in px. |
| `tickSize` | `number` | `30` (medium) / `24` (small) | Overrides the default tick/check icon size in px. |
| `tickVisible` | `boolean` | `true` | Shows the tick / radio-circle indicator in the top corner. |
| `customTickVisible` | `boolean` | `undefined` | Shows `customTickVisibleComponent` in the opposite corner from the tick. |
| `customTickVisibleComponent` | `ReactNode` | `undefined` | Rendered when `customTickVisible=true`. |
| `elementsPosition` | `'left' \| 'center' \| 'right'` | `'center'` | Aligns title, description, icon, and tick horizontally. |
| `raised` | `boolean` | `undefined` | Uses `@box-shadow-base` / `@box-shadow-active` instead of the 1px border outline. |
| `stretchToFit` | `boolean` | `undefined` | Sets `height: 100%` — use inside a grid to equalise card heights. |
| `disabled` | `boolean` | `undefined` | 40% opacity + `pointer-events: none`. `cursor: not-allowed` on the outer wrapper. |
| `error` | `boolean` | `undefined` | Shows a 2px red-500 outline. |
| `tagProps` | `Omit<TagProps, 'shape'\|'removable'\|'asPill'\|'onRemove'\|'image'\|'texts'>` | `undefined` | Renders a `TagShape.DEFAULT_SQUARE` pill ribbon above the card. |
| `tagTooltipProps` | `TooltipProps` | `undefined` | Wraps the tag ribbon in a `<Tooltip>`. |
| `infoTooltipProps` | `TooltipProps` | `undefined` | Renders an `InfoFillS` icon with tooltip in the top-corner `Aside`. |
| `className` | `string` | `undefined` | Additional class on the inner container (also always gets `ds-card-select`). |
| `key` | `Key` | `undefined` | Standard React key (used by `CardSelectGroup` when rendering `items`). |
| `theme` | `{ [k: string]: string }` | — | **@deprecated** — injected by `withTheme`, do not pass manually. |

### `CardSelectGroup`

CSS grid container for multiple `CardSelect` items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `(CardSelectProps & { key: Key })[]` | `undefined` | Preferred way to supply cards. Renders `<CardSelect>` elements internally. |
| `children` | `ReactNode` | `undefined` | **@deprecated** — pass `CardSelect` elements as children instead of `items`. |
| `columns` | `number \| null` | `2` | Number of grid columns. Pass `null` to put all items in a single row. |
| `size` | `'small' \| 'medium'` | `undefined` | Passed to each `CardSelect` and controls grid gap (16px for small, 24px for medium/large). |
| `width` | `'small' \| 'large'` | `'large'` | **@deprecated** — use `size` instead. Controls gap only. |
| `className` | `string` | `undefined` | Class on the grid wrapper. |

### Type exports

`CardSelectProps`, `CardSelectGroupProps`

## Usage patterns

```tsx
import CardSelect, { CardSelectGroup } from '@synerise/ds-card-select';

// Uncontrolled toggle
const [selected, setSelected] = useState(false);
<CardSelect
  title="Option A"
  description="Some details"
  value={selected}
  onChange={setSelected}
  tickVisible
/>

// Group from items array (preferred)
<CardSelectGroup
  columns={3}
  size="medium"
  items={[
    { key: '1', title: 'Type A', value: selected === 'A', onChange: () => setSelected('A') },
    { key: '2', title: 'Type B', value: selected === 'B', onChange: () => setSelected('B') },
  ]}
/>

// Tag ribbon + info tooltip
<CardSelect
  title="Premium"
  tagProps={{ name: 'NEW', color: '#54cb0b', textColor: '#fff' }}
  infoTooltipProps={{ title: 'This is the premium tier' }}
  value={false}
  onChange={setValue}
/>
```

## Styling

Styles are in `CardSelect.styles.ts` using `styled-is` for `is(prop)` / `isNot(prop)` conditional CSS blocks. All colours are resolved from `@synerise/ds-core` theme palette tokens — no hardcoded hex values except in comments. The `styled-is` library is an additional dependency not used elsewhere in the DS.

## Implementation notes

- **`onClick` suppresses `onChange`**: the click handler does `onClick ? onClick() : onChange && onChange(!value)`. If you need both, call `onChange` yourself inside `onClick`.
- **`isPressed` state**: a brief `isPressed=true` is set on click and cleared by `useOnClickOutside`. This controls the pressed box-shadow state but is visual-only.
- **`description` is silently dropped** when `size='small'` — the JSX is `{description && size !== 'small' && …}`.
- **Tag ribbon offset**: the `TagRibbonAnchor` padding is calculated from constants (`TAG_LEFT_OFFSET*`) to align the ribbon with or without a tick. Position (`left`/`right`) is mirrored based on `elementsPosition`.
- **`CardSelectGroup` columns fallback**: when `columns` is `null`, the grid uses `itemsCount` columns (i.e. all items in one row). When both `items` and `children` are provided, `items` takes precedence.
- **`width` prop is deprecated**: it maps to the same styled `size` prop on the wrapper and only affects gap, not card size. Use `size` for both.
- **`withTheme` wrapper**: `CardSelect` is exported as `withTheme(CardSelect)` so the component receives `theme` as a prop. Internally it also calls `useTheme()` from `@synerise/ds-core`. The `theme` prop type is marked `@deprecated`.
