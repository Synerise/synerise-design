# CodeArea (`@synerise/ds-code-area`)

> A Monaco Editor wrapper with fullscreen mode (via `createPortal`), syntax switching, character counter, error state, label/tooltip, and customisable footer content.

## Package structure

```
src/
  CodeArea.tsx             — public-facing component; manages fullscreen state + portal
  CodeArea.types.ts        — all type definitions
  CodeArea.styles.ts       — all styled-components (also re-exported from index.ts)
  CodeArea.figma.tsx       — Figma Code Connect file
  constants.ts             — MONACO_DEFAULT_OPTIONS, DS_MONACO_THEME, DS_MONACO_THEME_NAME
  index.ts                 — public exports
  components/
    CodeAreaEditor.tsx     — forwardRef wrapper; handles label, counter, error, fullscreen header
    CodeAreaEditorRaw.tsx  — mounts <Editor> from @monaco-editor/react; owns monaco lifecycle
    BottomBar.tsx          — syntax select + fullscreen button + custom footer slot
    ContentAbove.tsx       — label + top counter row
    ContentBelow.tsx       — description + additional description + bottom counter + error text
    FullscreenHeader.tsx   — header bar shown only in fullscreen mode
    AriaContainer.tsx      — attaches monaco's ARIA container element to the DOM
    index.ts               — re-exports all components
  utils/
    getDefaultTexts.tsx    — merges react-intl defaults with caller-supplied texts
    getCharCount.ts        — returns char count; undefined when over limit
    calculateRequiredSpace.ts — calculates px height stolen by chrome in fullscreen
    index.ts               — re-exports utils
```

## Public exports

### `CodeArea` (default export)

Generic component: `CodeArea<SyntaxName extends CodeAreaSyntax = CodeAreaSyntax>`.

`CodeAreaProps` = `Omit<CodeAreaEditorProps, 'toggleFullscreen' | 'isFullscreen'>` plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentSyntax` | `CodeAreaSyntax` | — | **Required.** Active language for the editor. |
| `label` | `ReactNode` | `undefined` | Label rendered above the editor (via `FormFieldLabel`). |
| `fullscreenLabel` | `ReactNode` | `undefined` | Label shown in the fullscreen header; falls back to `label`. |
| `description` | `ReactNode` | `undefined` | Text below the editor. |
| `errorText` | `ReactNode` | `undefined` | Error message below editor; also triggers red border + background. Sets `isValid=false`. |
| `placeholder` | `ReactNode` | `undefined` | Overlay shown when editor is empty. Positioned `left: 62px` (after line numbers). |
| `counter` | `{ limit: number; placement?: 'bottom' \| 'top' }` | `undefined` | Character counter. Hard-limits input at `limit` (triggers `undo` on overflow). |
| `syntaxOptions` | `CodeAreaSyntaxOption<SyntaxName>[]` | `undefined` | Available languages. Syntax select renders in BottomBar when `length > 1` and not `readOnly`. |
| `allowFullscreen` | `boolean` | `undefined` | Shows the fullscreen button in BottomBar. |
| `readOnly` | `boolean` | `undefined` | Monaco `readOnly` + `domReadOnly`; grey background; cursor hidden. |
| `noBorder` | `boolean` | `undefined` | Removes the 1px border from the editor wrapper. |
| `height` | `string \| number` | `undefined` | Height of the wrapper. When unset, `EditorInnerWrapper` defaults to `295px`. |
| `zIndex` | `string \| number` | `undefined` | `z-index` of the fullscreen overlay. Defaults to `theme.variables['zindex-modal']`. |
| `tooltip` | `ReactNode` | `undefined` | Tooltip content shown next to the label. |
| `tooltipProps` | `TooltipProps` | `undefined` | Full tooltip configuration (merged with `tooltip`). |
| `style` | `CSSProperties` | `undefined` | Inline styles on the outermost wrapper. |
| `className` | `string` | `undefined` | Additional class on the outermost wrapper. |
| `texts` | `Partial<CodeAreaTexts>` | `undefined` | Override i18n strings (see below). |
| `value` | `string` | `undefined` | Controlled editor value (passed to `@monaco-editor/react`). |
| `defaultValue` | `string` | `undefined` | Uncontrolled initial value. |
| `options` | `EditorProps['options']` | `undefined` | Monaco editor options (merged over `MONACO_DEFAULT_OPTIONS`). |
| `loaderConfig` | `Parameters<typeof loader.config>[0]` | `undefined` | Configure the Monaco CDN/path loader. Applied once on first render. |
| `renderFooterContent` | `(state: { isFullscreen?, count?, isValid? }) => ReactNode` | `undefined` | Custom content in the right side of BottomBar. |
| `renderAdditionalDescription` | `(state: { isFullscreen?, count?, isValid? }) => ReactNode` | `undefined` | Custom content above `description`. |
| `onChange` | `EditorProps['onChange']` | `undefined` | Monaco `onChange` callback. Blocked when content exceeds `counter.limit`. |
| `onMount` | `EditorProps['onMount']` | `undefined` | Access to the editor + monaco instance after mount. |
| `beforeMount` | `EditorProps['beforeMount']` | `undefined` | Called before editor mounts; DS theme is registered here. |
| `onSyntaxChange` | `(newSyntax: SyntaxName) => void` | `undefined` | Fired when user selects a different syntax. |
| `onFullscreenChange` | `(isFullscreen: boolean) => void` | `undefined` | Fired when fullscreen is toggled. **Note: receives the *old* state**, not the new one (bug). |
| `getPopupContainer` | `(node: HTMLElement) => HTMLElement` | `getPopupContainer` from `@synerise/ds-utils` | Container for the fullscreen portal. |

### `CodeAreaTexts` (type)

| Key | Default (react-intl) |
|-----|----------------------|
| `fullscreen` | `'Fullscreen'` (`DS.CODE-AREA.FULLSCREEN`) |
| `closeFullscreen` | `'Close fullscreen'` (`DS.CODE-AREA.CLOSE-FULLSCREEN`) |
| `fullscreenTitle` | `'Fullscreen editor'` (`DS.CODE-AREA.FULLSCREEN-TITLE`) |

### `CodeAreaSyntaxOption<SyntaxName>` (type)

| Field | Type | Description |
|-------|------|-------------|
| `language` | `SyntaxName` | Language identifier passed to Monaco. |
| `label` | `string` (optional) | Display name in the syntax select dropdown. |

### `CodeAreaSyntax` (type)

`'json' | 'html' | 'css' | 'typescript' | 'javascript' | string`

### Style exports (`export * from './CodeArea.styles'`)

All styled-components are re-exported for targeted overrides: `EditorWrapper`, `BottomBar`, `Counter`, `ErrorText`, `CodeAreaWrapper`, etc.

## Usage patterns

```tsx
import CodeArea from '@synerise/ds-code-area';

type Syntax = 'json' | 'javascript';

<CodeArea<Syntax>
  label="Query"
  currentSyntax="json"
  syntaxOptions={[
    { language: 'json', label: 'JSON' },
    { language: 'javascript', label: 'JS' },
  ]}
  value={code}
  onChange={(val) => setCode(val ?? '')}
  onSyntaxChange={setSyntax}
  allowFullscreen
  counter={{ limit: 5000, placement: 'bottom' }}
  errorText={hasError ? 'Invalid JSON' : undefined}
  height={400}
/>
```

## Key dependencies

- `@monaco-editor/react` (4.4.6) — React wrapper for Monaco Editor; provides `<Editor>`, `loader`, and types
- `monaco-editor` (0.34.1, devDep) — types used in `constants.ts` and `CodeArea.types.ts`
- `react-intl` — **required peer dep** for default `texts`; app must have `<IntlProvider>`
- `@synerise/ds-form-field` (`FormFieldLabel`) — renders `label` + `tooltip` above the editor
- `@synerise/ds-inline-edit` (`InlineSelect`) — syntax switcher in BottomBar

## Implementation notes

- **Fullscreen uses `createPortal`**: when `isFullscreen=true`, a second `<CodeAreaEditor>` is mounted via portal into `getPopupContainer(wrapperRef.current)`. The in-place editor remains mounted with `isFullscreen={false}` always. This means two Monaco instances exist simultaneously during fullscreen.
- **`onFullscreenChange` receives the old state**: `onFullscreenChange && onFullscreenChange(isFullscreen)` is called before `setIsFullscreen` — the callback gets the value *before* the toggle (likely a bug).
- **Counter hard-limit**: when `value.length > counter.limit`, `CodeAreaEditorRaw` triggers `'undo'` on the Monaco instance directly. The `onChange` callback is not called for over-limit input.
- **`isValid` logic**: `isValid` starts as `true`, is set to `false` when `errorText` is truthy (via `useEffect`), and is also set to `false` when Monaco reports markers (lint/parse errors). Both paths independently drive the error state.
- **Monaco theme**: `DS_MONACO_THEME` (`'DSTheme'`) is registered in `beforeMount` and uses a transparent background so the wrapper's background colour shows through.
- **`loaderConfig` is one-shot**: a `loaderConfigSet` ref prevents calling `loader.config()` more than once per component instance — changing `loaderConfig` after mount has no effect.
- **`placeholder` offset**: positioned `left: 62px` to align with the editor text column after Monaco's line-number gutter. Adjust if `options.lineNumbers` is set to `'off'`.
- **BottomBar visibility**: shown when at least one of `isSyntaxSelectVisible`, `allowFullscreen && !isFullscreen`, or `renderFooterContent` is truthy.
- **AriaContainer**: Monaco's accessibility tree is redirected to a detached `<div>` created in `useMemo` and attached to the DOM via `<AriaContainer>`. This prevents Monaco's ARIA announcements from polluting the page structure.
