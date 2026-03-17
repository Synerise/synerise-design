# Description (`@synerise/ds-description`)

> Displays labelled key-value pairs in one of several layout modes (table, inline, corner, numbered-list).

## Package structure

```
src/
  Description.tsx         — root container component
  Description.types.ts    — DescriptionProps, DescriptionType, DescriptionRatio
  Description.styles.tsx  — styled wrapper; applies layout CSS per type/ratio
  index.ts                — public exports
  Row/
    DescriptionRow.tsx      — single label+value row
    DescriptionRow.types.ts — DescriptionRowProps, RowTexts
    DescriptionRow.styles.ts — all row-level styled-components
    Copy.tsx                — standalone copyable icon (deprecated)
    Copy.types.ts           — CopyProps
    Star.tsx                — internal active/inactive star indicator
    Star.types.ts           — StarProps (internal)
  __specs__/
    Description.spec.tsx    — Vitest + React Testing Library tests
```

## Public exports

### `Description` (default export)

Root container. Wraps one or more `DescriptionRow` children and controls layout.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'table' \| 'inline' \| 'corner' \| 'numbered-list'` | `'table'` | Layout mode |
| `ratio` | `'50-50' \| '25-75'` | `'50-50'` | Column width split — only effective when `type='table'` |
| `children` | `JSX.Element \| JSX.Element[]` | — | One or more `DescriptionRow` elements |

> When a single child is passed, vertical padding on inner cells is removed (`singleRow` flag).

### `DescriptionRow`

Renders one label+value row. Used as direct children of `Description`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `React.ReactNode` | — | **Required.** Primary content |
| `label` | `string \| React.ReactNode` | `undefined` | Left-side label; truncated with ellipsis when too long |
| `labelIcon` | `React.ReactNode` | `undefined` | Icon rendered before the label text |
| `prefixEl` | `string \| React.ReactNode` | `undefined` | Element before the value |
| `suffixEl` | `string \| React.ReactNode` | `undefined` | Element after the value |
| `copyValue` | `string` | `undefined` | Renders a copy-to-clipboard icon; the string is what gets copied |
| `starType` | `'active' \| 'inactive'` | `undefined` | Renders a star icon before the value (`active` = yellow, `inactive` = grey) |
| `texts` | `RowTexts` | `undefined` | Override tooltip strings for the copy icon (see below) |

`RowTexts` shape:
```ts
{ copyTooltip?: string; copiedTooltip?: string; }
```
When `texts` is omitted, copy-icon tooltips fall back to `react-intl` message IDs `DS.DESCRIPTION.COPY-VALUE` and `DS.DESCRIPTION.COPIED`.

### `DescriptionCopyable` ⚠️ deprecated

Stand-alone copy-icon component. Exported for legacy use only — **will be removed in a future version**. New code should use `copyValue` on `DescriptionRow` instead.

| Prop | Type | Description |
|------|------|-------------|
| `copyValue` | `string` | String to copy to clipboard |
| `texts` | `RowTexts` | Tooltip text overrides |
| + HTML div attrs | — | Spreads onto the wrapper `<div>` |

## Usage patterns

```tsx
import Description, { DescriptionRow } from '@synerise/ds-description';

// Table layout (default)
<Description type="table" ratio="25-75">
  <DescriptionRow label="Name" value="John Kowalski" />
  <DescriptionRow label="Email" value="j.kowalski@example.com" copyValue="j.kowalski@example.com" />
</Description>

// Inline layout with star and prefix
<Description type="inline">
  <DescriptionRow
    label="Rating"
    value="5 stars"
    starType="active"
    prefixEl={<Avatar>JK</Avatar>}
    suffixEl={<Button>Edit</Button>}
  />
</Description>
```

## Styling

- Container styles in `Description.styles.tsx`; row styles in `Row/DescriptionRow.styles.ts`.
- Uses `props.theme.palette` tokens from `@synerise/ds-core` (e.g. `grey-600`, `grey-800`, `blue-600`, `yellow-600`) — no hardcoded hex values.
- Copy icon and `Copyable` wrapper are hidden (`visibility: hidden; opacity: 0`) and revealed via CSS `:hover` on `RowWrapper` — no JS toggle needed.
- `numbered-list` is a valid `DescriptionType` value but has **no dedicated CSS branch** in `Description.styles.tsx`; it falls through to `inlineStyles`.

## Key dependencies

- `@synerise/ds-copy-icon` — copy-to-clipboard icon used inside `DescriptionRow` via `StyledCopyIcon`
- `@synerise/ds-icon` — `Icon`, `CopyClipboardM`, `StarFillM`, `StarM`
- `@synerise/ds-tooltip` — tooltip wrapper on `DescriptionCopyable`
- `copy-to-clipboard` — clipboard write in `DescriptionCopyable`
- `react-intl` — default copy-icon tooltip strings (peer dependency)
- `classnames` — adds `single-row` CSS class on single-child containers

## Implementation notes

- `Star` is an **internal component** — not exported from `index.ts`. Do not import it directly.
- `ratio` is silently ignored for `inline` and `corner` types; the styled-component only applies `getColumnsWidth` in the `table` branch.
- `value` is **required** on `DescriptionRow`; `label` is optional.
- String `value` and string `label` automatically receive a `title` attribute for native browser tooltip on truncation.
- Links (`a`, `[href]`) inside a row inherit the row text colour and get a blue hover state via the `RowWrapper` CSS — no extra props needed.
- `DescriptionCopyable` (Copy) uses `event.stopPropagation()` on mouse enter/leave to prevent bubbling conflicts.
