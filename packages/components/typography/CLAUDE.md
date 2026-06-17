# Typography (`@synerise/ds-typography`)

> Collection of typography primitives: a custom `Title` (h1–h7), `Text` and `Paragraph` size variants, form-label helpers (`Description`, `ErrorText`, `Label`), an `Ellipsis` wrapper, and a `macro` namespace of reusable styled-components CSS snippets.

## Package structure

```
src/
 Title.tsx — DS Title component (h1–h7 levels, ellipsis support)
 Title.types.ts — Title Props interface
 Text.tsx — DS Text component (medium/small/xsmall spans) + Ellipsis
 Paragraph.tsx — DS Paragraph component (medium/small/xsmall spans)
 Ellipsis.tsx — Overflow-detection wrapper that shows a tooltip when truncated
 CommonElements.ts — All styled-component primitives (H1–H7, Text variants, Description, ErrorText, Label, EllipsisText)
 Typography.ts — DS-composed default export: `{ Title, Text, Paragraph }` (antd-free)
 index.ts — Public exports
 style/
 macro-utils.ts — CSS snippet exports for use in consumer styled-components
```

## Public exports

### `default` (DS-composed `Typography` namespace)

A plain object `{ Title, Text, Paragraph }` whose members are the **DS-implemented** components below
(not antd). It exists so existing `import Typography from '@synerise/ds-typography'` +
`<Typography.Title>` / `<Typography.Text>` / `<Typography.Paragraph>` call sites keep working without
antd. antd-only members (`Typography.Link`, `copyable`, `editable`, `code`, `ellipsis`) are **dropped** —
a repo-wide audit (portal-ui-bridge, portal-next, universal-list) found zero usages.

### `Title`

DS-customised heading. Renders `<h1>`–`<h6>` elements (level 7 renders as `<h6>`). Accepts standard
heading HTML attributes (`HTMLAttributes<HTMLHeadingElement>`) plus the props below.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7` | `1` | Heading level. Maps to DS type scale (h700–h100). Level 7 renders as `<h6>`. |
| `withoutMargin` | `boolean` | `undefined` | Removes the default `margin-bottom` (`0.5em`) from the heading element. |
| `ellipsis` | `EllipsisProps` | `undefined` | When provided, wraps the title in an `Ellipsis` component. |
| `className` | `string` | `undefined` | Merged with `'ds-title'`. |
| `data-*` | `string` | — | Any `data-*` attribute is forwarded onto the heading element (typed via `DataAttributes`). |
| `...rest` | `HTMLAttributes<HTMLHeadingElement>` | — | All remaining heading attributes pass through (e.g. `style`, `id`). |

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
| `className` | `string` | `undefined` | Applied to the `Ellipsis` wrapper when `ellipsis` is set; otherwise appended to the span (`'ds-text'`). |
| `style` | `CSSProperties` | `undefined` | Applied to the `Ellipsis` wrapper when `ellipsis` is set; otherwise applied to the span. |
| `data-*` | `string` | — | Forwarded onto the outer element — the `Ellipsis` wrapper when `ellipsis` is set, otherwise the span (typed via `DataAttributes`). |
| `children` | `ReactNode` | — | |

> When `ellipsis` is set, `style` / `className` / `data-*` are applied to the outer `Ellipsis`
> wrapper (so e.g. `style={{ maxWidth }}` still constrains the truncation box) — colocated with where
> truncation is measured.

### `TextSize`

Type alias exported from `Text.tsx`: `'medium' | 'small' | 'xsmall'`.

### `Paragraph`

Block text element in three sizes. Renders a styled `<span>` with class `ds-paragraph`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'medium' \| 'small' \| 'xsmall'` | `'medium'` | Font size variant. |
| `className` | `string` | `undefined` | Merged with `'ds-paragraph'`. |
| `style` | `CSSProperties` | `undefined` | Applied to the paragraph span. |
| `data-*` | `string` | — | Any `data-*` attribute is forwarded onto the paragraph span (typed via `DataAttributes`). |
| `children` | `ReactNode` | — | |

> Note: `Paragraph` supports `className` / `style` / `data-*` but (unlike `Text`) has no `ellipsis` prop.

### `Ellipsis`

Overflow-detection wrapper that conditionally shows a tooltip when text is truncated.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltip` | `ReactNode` | `undefined` | Tooltip content — only shown when text is actually truncated. |
| `tooltipProps` | `TooltipProps` | `undefined` | Extra props forwarded to `@synerise/ds-tooltip` — only applied when truncated. |
| `className` | `string` | `undefined` | Applied to the outer `EllipsisText` div. |
| `style` | `CSSProperties` | `undefined` | Applied to the outer `EllipsisText` div. |
| `data-*` | `string` | — | Any `data-*` attribute is forwarded onto the outer `EllipsisText` div (typed via `DataAttributes`). |
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

// Default export namespace — DS Title/Text/Paragraph (antd-free)
import Typography from '@synerise/ds-typography';
<Typography.Title level={4}>Heading</Typography.Title>
<Typography.Text strong>Bold</Typography.Text>

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
- `classnames` — used in `Title`/`Text` to merge `'ds-title'`/`'ds-text'` with consumer `className`
- **No antd** — the package is antd-free. The default export is a DS-composed `{ Title, Text, Paragraph }`.

## Implementation notes

- **Default export is DS, not antd** — `import Typography from '@synerise/ds-typography'` now gives a DS-composed `{ Title, Text, Paragraph }` namespace (the same DS components as the named exports). antd-only members (`Link`, `copyable`, `editable`, `code`, antd `ellipsis`) were dropped after a repo-wide audit found zero usages.
- **`Text` `strong`** — `strong` renders the span at `font-weight: 500`. When `ellipsis` is unset, `style` / `className` / `data-*` are applied to the rendered span. When `ellipsis` is set, they are applied to the outer `Ellipsis` wrapper (the `EllipsisText` div that measures truncation), so `style={{ maxWidth }}` keeps constraining the truncation box.
- **`data-*` forwarding** — `Title`, `Text`, `Paragraph` and `Ellipsis` accept arbitrary `data-*` attributes (typed via the shared `DataAttributes` from `@synerise/ds-utils`) and forward them onto their outer element. For `Title` the heading carries `style`/`data-*` (via `...rest`); for `Text`/`Paragraph` the rendered span, or the `Ellipsis` wrapper when `ellipsis` is set.
- **`Title` default margin** — headings have `margin-bottom: 0.5em` by default (own styled-component value, no longer reliant on antd's global reset); `withoutMargin` sets it to `0`.
- **`Title` level 7 renders as `<h6>`** — there is no `<h7>` in HTML. `H7` in `CommonElements.ts` is `styled.h6`. Intentional for the h100 scale.
- **`Paragraph`** — renders block-level styled spans (`display: block`) in medium/small/xsmall; no `className`/`style`/`ellipsis` support (unlike `Text`).
- **`Ellipsis` uses `ResizeObserver`** — observes both the text element and `document.body` to detect layout changes. Cleans up observer and debounce on unmount.
- **Uses Vitest** — `"test": "vitest run"`.
