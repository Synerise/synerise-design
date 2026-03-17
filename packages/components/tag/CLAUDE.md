# Tag (`@synerise/ds-tag`)

> A styled label component that supports multiple shapes, optional removal, prefix/suffix slots, image, tooltip, and status variants.

## Package structure

```
src/
  Tag.tsx           — main component, forwardRef, renders tag with optional remove button and tooltip
  Tag.types.ts      — TagProps type, TagTexts type, TagShape enum
  Tag.styles.ts     — all styled-components; exports getColorText helper
  index.ts          — public re-exports
  hooks/
    useDefaultTexts.tsx — merges caller-supplied texts with react-intl defaults
  __specs__/
    Tag.spec.tsx    — Jest unit tests
```

## Public exports

```ts
export { default } from './Tag';
export { TagShape, type TagProps, type TagTexts } from './Tag.types';
export { useDefaultTexts } from './hooks/useDefaultTexts';
```

### `Tag` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string \| number` | — | Used as the argument passed to `onRemove`; also sets `data-testid="tag-{id}"` (falls back to `"tag"` when absent) |
| `name` | `string` | — | Display text of the tag, rendered inside a `<span>` with text-overflow ellipsis |
| `color` | `string` | — | Background color for non-status shapes; sets close-icon color via `getColorText` |
| `textColor` | `string` | — | Overrides computed text color for any shape |
| `shape` | `TagShape` | `TagShape.DEFAULT_SQUARE` (see note) | Controls size, border-radius, and status styling |
| `image` | `string` | — | `src` for an `<img>` rendered before content; only shown for `DEFAULT_ROUND`/`DEFAULT_SQUARE` shapes |
| `removable` | `boolean` | — | Shows remove button on hover; only functional for `DEFAULT_ROUND` and `DEFAULT_SQUARE` |
| `disabled` | `boolean` | — | Reduces opacity to 0.4, prevents remove action; `onClick` still fires |
| `onClick` | `() => void` | — | Click handler on the tag container |
| `onRemove` | `(tag: string \| number) => void` | — | Called with `id` when remove button is clicked; requires `id` to be set |
| `prefixel` | `ReactNode` | — | Leading slot; strings/numbers get badge-style addonStyles wrapper, nodes get plain wrapper |
| `suffixel` | `ReactNode` | — | Trailing slot; hidden on remove-button hover; strings/numbers get addonStyles wrapper |
| `texts` | `Partial<TagTexts>` | — | Override any i18n string (see `TagTexts`) |
| `asPill` | `boolean` | — | Disables hover brightness filter (cursor stays default) |
| `dashed` | `boolean` | — | Passed to styled component; intended for dashed-border variant (no built-in CSS rule in current styles) |
| `tooltipProps` | `TooltipProps` | — | Wraps the entire rendered tag in `<Tooltip>` when provided |
| `className` | `string` | — | Appended to the `ds-tag` className on the root element |
| `ref` | `React.Ref<HTMLDivElement>` | — | Forwarded to the root `<div>` |
| `...htmlAttributes` | `HTMLDivElement` attrs | — | All remaining HTML div attributes are spread onto the root element |

### `TagShape` enum

| Value | Raw string | Visual |
|-------|-----------|--------|
| `DEFAULT_ROUND` | `'default_round'` | 24 px height, 12 px border-radius, removable |
| `DEFAULT_SQUARE` | `'default_square'` | 24 px height, 3 px border-radius, removable |
| `MEDIUM_ROUND` | `'medium_round'` | 18 px height, 9 px border-radius, uppercase |
| `SMALL_ROUND` | `'small_round'` | 14 px height, 8 px border-radius, uppercase |
| `SMALL_SQUARE` | `'small_square'` | 14 px height, 3 px border-radius, uppercase |
| `SINGLE_CHARACTER_ROUND` | `'single_character_round'` | 24×24 px, 12 px border-radius, centered |
| `SINGLE_CHARACTER_SQUARE` | `'single_character_square'` | 24×24 px, 3 px border-radius, centered |
| `STATUS_NEUTRAL` | `'status_custom'` | bordered, grey, no fill |
| `STATUS_SUCCESS` | `'status_active'` | bordered, green, no fill |
| `STATUS_ERROR` | `'status_inactive'` | bordered, red, no fill |
| `STATUS_WARNING` | `'status_paused'` | bordered, yellow, no fill |

### `TagTexts` type

All fields are optional and can be `ReactNode` (or `string` for `searchPlaceholder`).

| Key | Default message |
|-----|----------------|
| `deleteTooltip` | "Delete" |
| `addButtonLabel` | "Add tag" |
| `manageLinkLabel` | "Manage tags" |
| `createTagButtonLabel` | "Create tag" |
| `dropdownNoTags` | "No data" |
| `clearTooltip` | "Clear" |
| `searchPlaceholder` | "Search" |
| `noResultsLabel` | "No tags found" |

### `useDefaultTexts(texts?: Partial<TagTexts>): TagTexts`

Merges caller-supplied overrides with react-intl defaults. Requires an `IntlProvider` ancestor. Used internally by `Tag` but exported for use in composite components (e.g. `Tags`).

## Usage patterns

```tsx
import Tag, { TagShape } from '@synerise/ds-tag';

// Basic
<Tag name="Label" shape={TagShape.DEFAULT_ROUND} color="#5A32FB" />

// Removable — requires id for onRemove to fire
<Tag
  id="tag-1"
  name="Removable"
  shape={TagShape.DEFAULT_ROUND}
  color="#5A32FB"
  removable
  onRemove={(id) => console.log('remove', id)}
/>

// Status
<Tag name="Active" shape={TagShape.STATUS_SUCCESS} />

// With tooltip over the whole tag
<Tag
  name="Hovered"
  shape={TagShape.DEFAULT_ROUND}
  tooltipProps={{ title: 'More info' }}
/>

// Pill (no hover brightness effect)
<Tag name="Pill" shape={TagShape.SMALL_ROUND} asPill />

// Prefix / suffix (ReactNode)
<Tag
  name="With icon"
  shape={TagShape.DEFAULT_ROUND}
  color="#5A32FB"
  prefixel={<Icon component={<Add3M />} size={20} />}
/>
```

## Styling

- Uses `styled-components` throughout; all styles are in `Tag.styles.ts`.
- Background is rendered via a `::before` pseudo-element (non-status shapes), with `filter: brightness()` applied on hover.
- `getColorText(theme, color)` is exported from `Tag.styles` and used by stories and the remove-icon to pick white vs `grey-600` depending on whether `color` equals `theme.palette['grey-200']`.
- When `asPill` is `true`, the hover brightness filter is suppressed and cursor stays `default`.
- Remove button is hidden via `display: none` by default and set to `display: inline-block` on `:hover` via the isActionable CSS block.
- Suffix is hidden (`display: none`) while the remove button is visible on hover.
- `dashed` prop is forwarded to the styled component but no CSS rule currently uses it in `Tag.styles.ts` — it is available for downstream extension.

## Key dependencies

- `@synerise/ds-icon` — close icon (`CloseS`) and custom prefix icons
- `@synerise/ds-tooltip` — delete tooltip on remove button and optional whole-tag tooltip
- `@synerise/ds-core` — `useTheme()` for palette access, `ThemeProps` typing
- `@synerise/ds-utils` — `WithHTMLAttributes` wrapper type
- `react-intl` — i18n for default texts (requires `IntlProvider` in the tree)

## Implementation notes

- The `shape` default in the destructure is written as `TagShape.DEFAULT_ROUND && TagShape.DEFAULT_SQUARE` which evaluates to `TagShape.DEFAULT_SQUARE` at runtime — the effective default is `DEFAULT_SQUARE`.
- `onRemove` is only called when both `onRemove` and `id` are defined; passing `removable` without `id` will show the button but silently no-op on click.
- Remove is restricted to `DEFAULT_ROUND` and `DEFAULT_SQUARE` shapes regardless of the `removable` prop.
- `disabled` only applies visual styling (opacity + cursor) and prevents `isActionable`; it does **not** stop `onClick` from firing.
- Tests use `jest` (not vitest) — see `jest.config.js`.
- `data-testid` is `"tag-{id}"` when `id` is provided, otherwise `"tag"`.
