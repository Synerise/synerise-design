# CodeSnippet (`@synerise/ds-code-snippet`)

> Displays code in three variants — inline, single-line, and expandable multi-line — with optional syntax highlighting, copy-to-clipboard, and animated expand/collapse.

## Package structure

```
src/
  CodeSnippet.tsx           — main component, switches between three variants
  CodeSnippet.types.ts      — CodeSnippetType enum, FontSize enum, CodeSnippetProps
  CodeSnippet.figma.tsx     — Figma Code Connect mappings
  index.ts                  — public exports
  style/
    index.less              — IBM Plex Mono font-face declarations
  CodeTypes/
    InlineCode/             — <code> element with pink background; no copy button
    SingleCode/             — single-line block with copy icon
    MultiCode/              — multi-line block with expand/collapse + syntax highlight
  Highlight/
    Highlight.tsx           — wraps children with highlight.js, async language loading
    Highlight.types.ts      — HighlightProps, LanguageHighlight (190+ language union)
    Highlight.styles.ts     — design token-mapped hljs colour classes
```

## Public exports

### `CodeSnippet` (default export)

No `forwardRef`. Routes to `InlineCode`, `SingleCode`, or `MultiCode` based on `type`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `CodeSnippetType` | `CodeSnippetType.INLINE` | Which variant to render. |
| `children` | `string` | `''` | The code content. Must be a string, not JSX. |
| `className` | `string` | `undefined` | Applied to the root wrapper. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles on the root. _(only forwarded to SingleCode — not all variants)_ |
| `fontSize` | `FontSize` | `FontSize.SMALL` (12) | `FontSize.SMALL = 12` or `FontSize.MEDIUM = 14`. |
| `colorSyntax` | `boolean` | `false` | Enables highlight.js syntax colouring. Multi-line only. |
| `languages` | `LanguageHighlight[]` | `['javascript', 'typescript', 'json']` | Languages to register with highlight.js. |
| `rows` | `number` | `6` | Visible line count before expand button appears. Multi-line only. |
| `expanded` | `boolean` | `false` | Initial expanded state. Multi-line only. |
| `wrap` | `boolean` | `false` | Enables `white-space: pre-wrap`. Multi-line only. |
| `tooltipTitleHover` | `string` | `'Copy'` | Tooltip text before copy. Single-line and multi-line. |
| `tooltipTitleClick` | `string` | `'Copied!'` | Tooltip text after copy. |
| `labelBeforeExpanded` | `string` | `'Show more'` | Expand button label. |
| `labelAfterExpanded` | `string` | `'Show less'` | Collapse button label. |
| `hideExpandButton` | `boolean` | `false` | Hides the expand/collapse button. Multi-line only. |
| `hideCopyButton` | `boolean` | `false` | Hides the copy icon. Multi-line only. |
| `customTriggerComponent` | `ReactNode` | `undefined` | Replaces the default `DuplicateS` copy icon. Single-line and multi-line. |
| `onExpand` | `() => void` | `undefined` | Extra callback on expand/collapse click. |
| `onCopy` | `() => void` | `undefined` | Extra callback on copy. |

### `CodeSnippetType` (enum)

```ts
enum CodeSnippetType {
  INLINE = 'inline',
  SINGLE_LINE = 'single-line',
  MULTI_LINE = 'multi-line',
}
```

### `FontSize` (enum)

```ts
enum FontSize {
  SMALL = 12,
  MEDIUM = 14,
}
```

### `CodeSnippetProps` (type)

Re-exported props interface.

## Usage patterns

```tsx
import CodeSnippet, { CodeSnippetType } from '@synerise/ds-code-snippet';
import { FontSize } from '@synerise/ds-code-snippet';

// Inline (default)
<CodeSnippet>some_variable</CodeSnippet>

// Single-line with copy
<CodeSnippet type={CodeSnippetType.SINGLE_LINE} fontSize={FontSize.SMALL}>
  npm install @synerise/ds-button
</CodeSnippet>

// Multi-line with syntax highlighting and expand
<CodeSnippet
  type={CodeSnippetType.MULTI_LINE}
  colorSyntax
  languages={['javascript']}
  rows={4}
  labelBeforeExpanded="Show more"
  labelAfterExpanded="Show less"
>
  {codeString}
</CodeSnippet>
```

## Styling

- Styles split across `InlineCode.styles.ts`, `SingleCode.styles.ts`, `MultiCode.styles.ts`, `Highlight.styles.ts`.
- Uses `@synerise/ds-core` theme palette tokens (e.g. `props.theme.palette['grey-100']`).
- Font loaded via `src/style/index.less` — imports IBM Plex Mono WOFF files. The Less file is compiled separately (`build:css` script) and must be imported as a side effect: `import './style/index.less'` (already done in `CodeSnippet.tsx`).
- Inline variant uses a hardcoded `#e31a5d` for the code text colour (not a token).

## Key dependencies

- `highlight.js` — syntax colouring; languages are loaded **asynchronously** via dynamic `import()` in `Highlight.tsx`
- `react-animate-height` — smooth expand/collapse animation in `MultiCode` (300ms duration)
- `@synerise/ds-copy-icon` — copy-to-clipboard button with tooltip state management
- `@synerise/ds-scrollbar` — custom scrollbar for multi-line code content

## Implementation notes

- **`children` must be a plain string**, not JSX. All three code type components type `children` as `string`.
- **Syntax highlighting is async** — `Highlight` dynamically imports each language module on mount/update. There may be a brief flash of unstyled code before highlighting applies.
- **`rows` controls both the expand threshold and the initial height** — the expand button only appears when the actual line count exceeds `rows + 1`. Height is calculated as `(rows + 1) * 17px` (LINE_HEIGHT_DEFAULT).
- **`expanded` prop** sets the initial state but the component controls its own expand/collapse state after mount (`useState(expanded)`). It is not a fully controlled prop.
- **`style` prop** is declared in `CodeSnippetProps` but only forwarded to the `SingleCode` path — not `InlineCode` or `MultiCode`.
- **`colorSyntax` and `languages`** are only meaningful for `CodeSnippetType.MULTI_LINE`; they are silently ignored for other types.
- **`hideExpandButton` and `hideCopyButton`** are only forwarded to `MultiCode`; they have no effect on `INLINE` or `SINGLE_LINE`.
- **Font-face declarations** are in a `.less` file compiled as a CSS side effect. If the Less build step is skipped, IBM Plex Mono will not load.
- **`tooltipHint` prop** appears in the README but does **not exist** in `CodeSnippetProps` — it was removed. The correct props are `tooltipTitleHover` and `tooltipTitleClick`.
