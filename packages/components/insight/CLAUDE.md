# Insight (`@synerise/ds-insight`)

> A card component for displaying a single "insight" with a structured header (avatar + title/subtitle + optional right-side action), flexible content area, and optional footer.

## Package structure

```
src/
  Insight.tsx          — main component; auto-converts InlineAlertProps[] content
  Insight.types.ts     — InsightProps interface (extends WithHTMLAttributes<HTMLDivElement>)
  Insight.styles.tsx   — styled-components; hasHover variant
  index.ts             — default export + InsightProps type export
  __specs__/
    Insight.spec.tsx   — render tests (Jest)
```

## Public exports

### `Insight` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Header title; rendered inside a `<label>`. |
| `subTitle` | `ReactNode` | `undefined` | Secondary line below the title. |
| `avatar` | `ReactNode` | `undefined` | Left-side avatar in the header bar. Adds `12px` left margin to the text wrapper when present. |
| `headerRightSide` | `ReactNode` | `undefined` | Rendered at the far right of the header bar (e.g. edit button). |
| `content` | `InlineAlertProps[] \| ReactNode` | `undefined` | Card body. If an `InlineAlertProps[]` is passed, each item is automatically rendered as `<InlineAlert>`. Otherwise treated as a plain ReactNode. |
| `footer` | `ReactNode` | `undefined` | Rendered at the bottom of the card. |
| `onClick` | `() => void` | `undefined` | Makes the entire card hoverable (`grey-050` background on hover). Only applied when truthy. |
| `className` | `string` | `undefined` | Extra class names appended to `ds-insight <className>`. |

All standard `HTMLDivElement` attributes are also accepted and spread onto the root element via `WithHTMLAttributes<HTMLDivElement, ...>`.

### `InsightProps`

Type alias exported for consumer use.

## Usage patterns

```tsx
import Insight from '@synerise/ds-insight';

// Minimal
<Insight title="Get File SFTP" />

// With avatar, subtitle, header action
<Insight
  title="Get File SFTP"
  subTitle="Custom mode name"
  avatar={<Avatar size="medium" shape="square" iconComponent={<Icon component={<NotificationsM />} />} />}
  headerRightSide={<Button type="ghost" mode="icon-label"><Icon component={<EditM />} />Edit</Button>}
  content={<div>Any content here</div>}
  footer={<Button>More</Button>}
/>

// InlineAlert shorthand — pass InlineAlertProps[] directly
<Insight
  title="Get File SFTP"
  content={[
    { message: 'Template ready to update', type: 'warning' },
    { message: 'Info message', type: 'info' },
  ]}
/>

// Clickable card (hover effect)
<Insight title="Get File SFTP" onClick={() => handleClick()} />
```

## Styling

Styles live in `Insight.styles.tsx`. Uses `theme.palette` tokens for all colours:
- Container: `white` background, `grey-200` bottom border
- Hover state: `grey-050` background — only added when `hasHover` is `true` (i.e. `onClick` is provided)
- `Title` renders as a `<label>` element (not a heading) with `font-weight: 500; font-size: 14px; color: grey-800`
- Gaps: `24px` padding, `16px` gap between sections, `4px` gap between content items

## Key dependencies

- `@synerise/ds-inline-alert` — rendered automatically when `content` is `InlineAlertProps[]`
- `@synerise/ds-utils` — `WithHTMLAttributes` utility type

## Implementation notes

- **`content` dual-mode**: `isInlineAlertPropsArray` checks at runtime whether `content` is an array of objects with `message` and `type` fields (and no React elements). If so, renders `<InlineAlert key={index} {...props} />` for each. Otherwise falls through to raw ReactNode rendering. The check uses `!React.isValidElement(item)` so a ReactNode array will NOT trigger InlineAlert mode.
- **`title` renders as `<label>`**, not a heading element — assistive technology may not announce it as a heading.
- **`className` handling** — appended as `` `ds-insight ${className || ''}` ``; extra trailing space is harmless but present when `className` is omitted.
- **No internal state** — fully controlled/stateless; all content is passed as props.
- **Uses Jest** (not Vitest) — `package.json` has `"test": "jest"`.
