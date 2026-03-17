# Typography (`@synerise/ds-typography`)

> Collection of typography primitives: a custom `Title` (h1–h7), `Text` and `Paragraph` size variants, form-label helpers (`Description`, `ErrorText`, `Label`), an `Ellipsis` wrapper, and a `macro` namespace of reusable styled-components CSS snippets.

## Package structure

```
src/
  Title.tsx           — DS Title component (h1–h7 levels, ellipsis support)
  Title.types.ts      — Title Props interface
  Text.tsx            — DS Text component (medium/small/xsmall spans) + Ellipsis
  Paragraph.tsx       — DS Paragraph component (medium/small/xsmall spans)
  Ellipsis.tsx        — Overflow-detection wrapper that shows a tooltip when truncated
  CommonElements.ts   — All styled-component primitives (H1–H7, Text variants, Description, ErrorText, Label, EllipsisText)
  Typography.ts       — Re-exports antd/lib/typography as default
  index.ts            — Public exports
  style/
    macro-utils.ts    — CSS snippet exports for use in consumer styled-components
    index.less        — LESS overrides
```

## Public exports

### `default` (re-export of `antd/lib/typography`)

The full Ant Design Typography object (`Typography.Title`, `Typography.Text`, `Typography.Paragraph`, `Typography.Link`). Useful when antd's built-in features (editable, copyable, code) are needed. This is **not** the DS-customised version.

### `Title`

DS-customised heading. Renders `<h1>`–`<h6>` elements (level 7 renders as `<h6>`). Extends antd `TitleProps` minus `level` and `ellipsis`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7` | `1` | Heading level. Maps to DS type scale (h700–h100). Level 7 renders as `<h6>`. |
| `withoutMargin` | `boolean` | `undefined` | Removes `margin-bottom` from the heading element. |
| `ellipsis` | `EllipsisProps` | `undefined` | When provided, wraps the title in an `Ellipsis` component. Replaces antd's native ellipsis. |
| `className` | `string` | `undefined` | Merged with `'ds-title'`. |
| `...antdProps` | `TitleProps` | — | All remaining antd TitleProps pass through (e.g. `style`, `id`). |

Type scale mapping:

| level | macro | font-size |
|-------|-------|-----------|
| 1 | h700 | 24px |
| 2 | h600 | 21px |
| 3 | h500 | 18px |
| 4 | h400 | 16px |
| 5 | h300 | 14px |
| 6 | h200 | 13px |
| 7 | h100 | 10px |

### `Text`

Inline text span in three sizes. Renders a styled `<span>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'medium' \| 'small' \| 'xsmall'` | `'medium'` | Font size variant (14px / 13px / 11px). |
| `ellipsis` | `EllipsisProps` | `undefined` | When provided, wraps content in `Ellipsis`. |
| `className` | `string` | `undefined` | Applied to the `Ellipsis` wrapper when `ellipsis` is set; otherwise appended to the span. |
| `style` | `CSSProperties` | `undefined` | Applied to the `Ellipsis` wrapper when `ellipsis` is set. |
| `children` | `ReactNode` | — | |

### `TextSize`

Type alias exported from `Text.tsx`: `'medium' | 'small' | 'xsmall'`.

### `Paragraph`

Block text element in three sizes. Renders a styled `<span>` with class `ds-paragraph`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'medium' \| 'small' \| 'xsmall'` | `'medium'` | Font size variant. |
| `children` | `ReactNode` | — | |

> Note: `Paragraph` has no `className`, `style`, or `ellipsis` prop unlike `Text`.

### `Ellipsis`

Overflow-detection wrapper that conditionally shows a tooltip when text is truncated.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltip` | `ReactNode` | `undefined` | Tooltip content — only shown when text is actually truncated. |
| `tooltipProps` | `TooltipProps` | `undefined` | Extra props forwarded to `@synerise/ds-tooltip` — only applied when truncated. |
| `className` | `string` | `undefined` | Applied to the outer `EllipsisText` div. |
| `style` | `CSSProperties` | `undefined` | Applied to the outer `EllipsisText` div. |
| `children` | `ReactNode` | — | |

### `EllipsisProps`

Type exported from `Ellipsis.tsx` (re-exported via `export * from './Text'`).

### `Description`

Styled `<div>` for secondary/help text. Props: `disabled?: boolean` (reduces opacity to 0.4). Color: `grey-600`.

### `ErrorText`

Styled `<div>` for field error messages. Color: `red-600`, bottom margin 4px. No custom props.

### `Label`

Styled `<label>` for form field labels. Color: `grey-800`, font-weight 500, `display: block`, `cursor: pointer`. No custom props.

### `macro`

Namespace of reusable styled-components CSS snippets for typography styling in consumer components:

| Export | Description |
|--------|-------------|
| `h700`–`h100` | Heading scales (font-size, line-height, letter-spacing, grey-800 color) |
| `medium`, `small`, `xsmall` | Body text scales |
| `link` | Blue-600 link style with hover |
| `linkbutton` | Grey link variant |
| `heading`, `regular` | Base weight/color mixins used by heading/body macros |
| `tag`, `tooltip`, `xsAvatar`, `xlAvatar`, `xlAvatarIcon` | Specific UI element sizes |
| `flexCentered` | Flex centering utility |

## Usage patterns

```tsx
import Typography, { Title, Text, Paragraph, Description, ErrorText, Label, macro } from '@synerise/ds-typography';

// DS Title (h1–h7)
<Title level={4} withoutMargin>Section heading</Title>

// DS Title with overflow tooltip
<Title level={3} ellipsis={{ tooltip: 'Full title text' }}>Long title that may truncate</Title>

// DS Text
<Text size="small">Helper text</Text>

// DS Text with ellipsis
<Text size="medium" ellipsis={{ tooltip: 'Full content' }} style={{ maxWidth: 200 }}>
  Long inline text
</Text>

// DS Paragraph
<Paragraph size="medium">Body copy</Paragraph>

// Form helpers
<Label htmlFor="field">Field name</Label>
<Description>Secondary info</Description>
<Description disabled>Disabled info</Description>
<ErrorText>Validation error</ErrorText>

// Antd Typography (full feature set: editable, copyable, etc.)
<Typography.Text copyable>Copy me</Typography.Text>

// macro — for use inside styled-components definitions
import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

const MyHeading = styled.div`
  ${macro.h400};
`;
```

## Styling

All styled primitives live in `CommonElements.ts`. Typography tokens come from `macro-utils.ts` (hardcoded scale values using `theme.palette` for colour). No variant prop on styled elements — size is selected by mapping to a different component.

`EllipsisText` sets `overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 100%` on a `<div>`, and makes inner heading/text elements `display: inline` or inherit parent styles.

## Key dependencies

- `@synerise/ds-tooltip` — used by `Ellipsis` to show the overflow tooltip (regular dependency, not peer)
- `lodash.debounce` — debounces the `ResizeObserver` callback in `Ellipsis` (100ms, leading + trailing)
- `classnames` — used in `Title` to merge `'ds-title'` with consumer `className`
- `antd/lib/typography` — default export pass-through; also used by spec test via `Typography.Title`

## Implementation notes

- **`Text` className bug** — `textClassNames` is built as `` `ds-text ${!ellipsis && className}` ``. When `ellipsis` is provided, `!ellipsis` is `false`, so the class becomes `"ds-text false"` (string). The `className` is then correctly forwarded to the `Ellipsis` wrapper, but the inner span gets a literal `"false"` class token.
- **`Title` level 7 renders as `<h6>`** — there is no `<h7>` in HTML. `H7` in `CommonElements.ts` is `styled.h6`. This is intentional for the design token h100 scale.
- **Default export is antd, not DS** — `import Typography from '@synerise/ds-typography'` gives you antd's Typography. The DS `Title`/`Text`/`Paragraph` are named exports only.
- **`Ellipsis` uses `ResizeObserver`** — observes both the text element and `document.body` to detect layout changes. Cleans up observer and debounce on unmount.
- **`Paragraph` vs `Text`** — both render styled spans with the same CSS macros (medium/small/xsmall). `Paragraph` has no `className`, `style`, or `ellipsis` support; `Text` does.
- **Uses Jest** (not Vitest) — `package.json` has `"test": "jest"` and a `jest.config.js`. Has not been migrated to Vitest yet.
