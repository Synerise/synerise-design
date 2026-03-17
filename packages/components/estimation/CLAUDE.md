# Estimation (`@synerise/ds-estimation`)

> A card-style component for displaying a numeric estimation/metric value with optional progress bar, granular skeleton loading states, a calculated-date footer, and inline error alerts.

## Package structure

```
src/
  Estimation.tsx                        — main component
  Estimation.types.ts                   — EstimationProps and supporting types
  Estimation.styles.ts                  — styled-components (shared with sub-components)
  Estimation.spec.tsx                   — Jest tests (not Vitest)
  index.ts                              — public exports
  components/
    EstimationCalculated.tsx            — renders label + relative/custom date
    EstimationProgressBar.tsx           — Multivalue bar with colour-dot legend
    EstimationProgressBar.styles.ts     — styles for progress bar and legend
    EstimationProgressBarSkeleton.tsx   — skeleton placeholder for progress bar
  hooks/
    useDefaultTexts.tsx                 — merges i18n defaults with user overrides
```

## Public exports

### `Estimation` (default export)

All native `HTMLDivElement` attributes are accepted via `WithHTMLAttributes` from `@synerise/ds-utils`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `ReactNode` | — | Main estimation value displayed prominently |
| `label` | `ReactNode` | — | Label above the card (from `BaseLabelProps`) |
| `tooltip` | `ReactNode` | — | Tooltip content for the label (from `BaseLabelProps`) |
| `tooltipConfig` | `TooltipConfig` | — | Tooltip configuration object (from `BaseLabelProps`) |
| `total` | `ReactNode` | — | Top-right corner value (preformatted content) |
| `isLoading` | `boolean \| { total?: boolean; progressBar?: boolean }` | — | `true` = full skeleton; object = granular control (see notes) |
| `errorMessage` | `ReactNode` | — | Renders an `InlineAlert` in the footer |
| `footerButtons` | `ReactNode` | — | Buttons rendered on the right side of the footer |
| `texts` | `Partial<EstimationTexts>` | — | Overrides i18n strings for `calculated` and `loading` labels |
| `calculatedDate` | `Date \| ReactNode` | — | `Date` → rendered as relative time via `FormattedRelativeDateTimeTo`; any other `ReactNode` → rendered as-is |
| `progressBarValues` | `EstimationProgressValue[]` | — | Multivalue progress bar data; if any entry has `label`, a colour-dot legend is rendered below the bar |

No `forwardRef`.

### `EstimationProps`

TypeScript type re-exported for consumers.

## Usage patterns

```tsx
import Estimation from '@synerise/ds-estimation';

// Minimal
<Estimation value="1,234" />

// Full example
<Estimation
  label="Estimated reach"
  value="1,234"
  total={<>of <strong>5,000</strong></>}
  calculatedDate={new Date()}
  progressBarValues={[
    { percent: 30, color: '#f00', label: 'Active' },
    { percent: 70, color: '#00f', label: 'Inactive' },
  ]}
  footerButtons={<Button>Refresh</Button>}
/>

// Loading — skeleton for everything
<Estimation value="1,234" isLoading />

// Loading — skeleton only for total and progress bar
<Estimation
  value="1,234"
  total={5000}
  isLoading={{ total: true, progressBar: true }}
  progressBarValues={[...]}
/>

// Error state
<Estimation value="1,234" errorMessage="Failed to load data" />
```

## Styling

All styles are in `Estimation.styles.ts`. The card body uses `Panel` from `@synerise/ds-panel` as the container. The dashed divider between content and footer is `Divider` from `@synerise/ds-divider`. Uses `@synerise/ds-core` theme palette tokens; no hardcoded colour values.

## Custom hooks

### `useDefaultTexts`

Merges user-provided `texts` with react-intl defaults:
- `loading` → `<FormattedMessage id="DS.ESTIMATION.LOADING" defaultMessage="Loading..." />`
- `calculated` → `<FormattedMessage id="DS.ESTIMATION.CALCULATED" defaultMessage="Calculated:" />`

Returns a complete `EstimationTexts` object. Requires an `IntlProvider` in the tree.

## Key dependencies

- `@synerise/ds-form-field` — `FormFieldLabel` and `BaseLabelProps` for the label/tooltip
- `@synerise/ds-progress-bar` — `Multivalue` component and `ProgressValue` type
- `@synerise/ds-panel` — card container
- `@synerise/ds-inline-alert` — error state display
- `@synerise/ds-skeleton` — loading placeholders
- `@synerise/ds-core` — `FormattedRelativeDateTimeTo` for relative date, `useTheme` in skeleton
- `react-intl` — i18n for default button labels

## Implementation notes

- **`isLoading` granular mode**: When `isLoading` is an object (e.g. `{ progressBar: true }`), only the flagged parts show skeletons. The main `value` is always skeletonized when `isLoading` is truthy in any form. The progress bar only renders at all when `isLoading` is falsy — `showProgressBarSkeleton` is only shown when `isLoading` is the object variant.
- **`total` hidden when `isLoading=true`**: When `isLoading` is a plain `true` boolean, `total` is not rendered (not skeletonized). The skeleton variant `{ total: true }` replaces it with a skeleton.
- **Footer is conditional**: The footer (divider + footer row) only renders when `footerButtons` is provided OR at least one of `isLoading`, `errorMessage`, or `calculatedDate` is truthy.
- **`calculatedDate` type discrimination**: `calculatedDate instanceof Date` check determines whether to wrap with `FormattedRelativeDateTimeTo`. Any non-Date `ReactNode` is rendered verbatim.
- **`EstimationProgressValue` and `EstimationTexts` types are not exported** from `index.ts` — consumers must import them from the deep path or declare locally.
- **Tests use Jest** (not Vitest): The package has a `"test": "jest"` script — not yet migrated to Vitest.
- **`react-intl` is a peer dependency** — component will throw at runtime without an `IntlProvider` ancestor.
