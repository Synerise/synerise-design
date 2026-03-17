# MetricCard (`@synerise/ds-metric-card`)

> A compact card showing a numeric metric title, value, optional tooltip, and a copy-to-clipboard button that appears on hover. Supports loading skeleton and inline error state.

## Package structure

```
src/
  MetricCard.tsx          — main component
  MetricCard.types.ts     — MetricCardProps, CopyTexts
  MetricCard.styles.tsx   — all styled components
  index.ts                — public exports
  __specs__/
    MetricCard.spec.tsx   — Jest tests (title, hover reveal, inlineAlert, copyIcon)
```

## Public exports

### `MetricCard` (default export)

`MetricCardProps = WithHTMLAttributes<HTMLDivElement, { … }>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | Card heading; truncated with tooltip on overflow |
| `headerRightSide` | `ReactNode` | — | Rendered right of the title (e.g. an options button) |
| `displayValue` | `ReactNode` | — | Value shown at rest (e.g. compact-formatted number) |
| `hoverValue` | `ReactNode` | — | Value shown on hover (e.g. full unformatted number); falls back to `displayValue` if absent |
| `tooltip` | `ReactNode` | — | Text for the info icon tooltip next to the title |
| `tooltipConfig` | `TooltipProps` | — | Spreads all `ds-tooltip` props onto the title info tooltip; takes priority over `tooltip` |
| `greyBackground` | `boolean` | — | Applies grey background to the `Panel` wrapper |
| `isLoading` | `boolean` | — | Shows a skeleton instead of the value area |
| `errorMessage` | `ReactNode` | — | Renders an `InlineAlert type="alert"` instead of the value area |
| `copyValue` | `string` | — | String to copy; when provided, hovering the card reveals the `CopyIcon` |
| `texts` | `CopyTexts` | — | `{ copyTooltip?, copiedTooltip? }` — labels for the copy icon |

Accepts all standard `<div>` HTML attributes via `WithHTMLAttributes`.

### `MetricCardProps`

Full props type re-export.

## Usage patterns

```tsx
import MetricCard from '@synerise/ds-metric-card';

<MetricCard
  title="Revenue"
  displayValue={<FormattedNumber options={compactOptions} value={12345} />}
  hoverValue={<FormattedNumber value={12345} />}
  copyValue="12345"
  texts={{ copyTooltip: 'Copy', copiedTooltip: 'Copied!' }}
  headerRightSide={<Button type="ghost" mode="single-icon">…</Button>}
/>
```

## Styling

`MetricCard.styles.tsx`. Root is a `Panel` with `p="8px 8px 14px 24px"` and `radius={3}`. Value font size is `32px`, `font-weight: 500`, colour `grey-800`.

Hover behaviour is pure CSS class toggle: `MetricContent.hovered` class shows `WrapperNumber` and hides `WrapperFormattedNumber` (and vice versa). The `CopyIcon` uses `visibility + opacity` transition so it doesn't shift layout.

## Key dependencies

- `@synerise/ds-panel` — outer container card
- `@synerise/ds-inline-alert` — error state (`type="alert"`)
- `@synerise/ds-skeleton` — loading state (`size="S" width="M" height={32}`)
- `@synerise/ds-copy-icon` — copy-to-clipboard button
- `@synerise/ds-tooltip` — title info tooltip
- `@synerise/ds-typography` — `Text` component with ellipsis tooltip for title and value
- `@synerise/ds-utils` — `WithHTMLAttributes`

## Implementation notes

- **`isLoading` and `errorMessage` are mutually exclusive** — `isLoading` takes priority; the `useMemo` returns the skeleton first, then the inline alert, then the value nodes.
- **`hoverValue` fallback** — if only `displayValue` is provided and no `hoverValue`, `WrapperNumber` still renders `displayValue` on hover.
- **Copy icon visibility** — the icon is only mounted when `hover && typeof copyValue === 'string'`; it is not shown at all when `copyValue` is absent.
- **Test runner is Jest** (not Vitest).
