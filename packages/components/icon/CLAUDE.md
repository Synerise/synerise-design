# Icon (`@synerise/ds-icon`)

> Renders an SVG icon inside a sized, coloured `<div>` container. Icons are build-time generated from SVG files via `@svgr/core` and exported as individual React components.

## Package structure

```
src/
  Icon.tsx                      — main component (forwardRef)
  Icon.types.ts                 — IconProps, BaseIconProps, StyledIcon, IconName
  Icon.styles.ts                — IconContainer styled-component + exported constants
  index.ts                      — public exports
  useIconComponent.ts           — hook + util to resolve icon name → component
  icons/
    M/                          — medium (24px) icons, auto-generated
    L/                          — large (48px) icons, auto-generated
    XL/                         — extra-large icons, auto-generated
    colorIcons/                 — multi-colour icons, auto-generated
    additional/                 — additional icons, auto-generated
  DynamicIcon/
    DynamicIcon.tsx             — @deprecated wrapper (use <Icon iconName> instead)
    iconManifest.ts             — builds name→module map from all icon sets
  MimeTypeIcon/
    MimeTypeIcon.tsx            — maps MIME type string → icon
    MimeTypeIcon.types.ts       — MimeTypeIconsProps
    MimeTypeIcon.utils.tsx      — mapMimeTypeToIconName switch
  build/
    svgr.js                     — build script: SVG files → React components
    template.js                 — SVGR JSX template
  __specs__/
    Icon.spec.tsx               — Jest tests
```

## Public exports

### `Icon` (default export)

`forwardRef<HTMLDivElement, IconProps>`. Renders a `<div>` (`.ds-icon`) wrapping the SVG.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconName` | `IconName` | `undefined` | **Recommended.** Icon name string (e.g. `'AddM'`, `'InfoL'`). Takes precedence over `component` |
| `component` | `ReactNode` | `undefined` | **@deprecated.** Pass an icon element directly (e.g. `<AddM />`). Use `iconName` instead |
| `name` | `string` | `undefined` | Sets the `title` HTML attribute on the container div (tooltip on hover) |
| `size` | `string \| number` | `24` | Width and height of the container and SVG in px |
| `color` | `string` | `undefined` | Sets `color` CSS on the SVG (inherits if omitted; L/XL sets default to `grey-800`) |
| `stroke` | `boolean` | `undefined` | Also sets `stroke` CSS to the `color` value — for icons that use stroke instead of fill |
| `className` | `string` | `undefined` | Appended to `'ds-icon'` |
| + HTML div attrs | — | — | All `HTMLDivElement` attributes and `data-*` attributes spread onto the container |

> **Ref** forwarded to the outer `<div>` container.

### `MimeTypeIcon`

Maps a MIME type string to the correct icon. Props = `IconProps` (minus `component`) + `type: string`.

| Prop | Type | Description |
|------|------|-------------|
| `type` | `string` | MIME type (e.g. `'application/pdf'`, `'text/csv'`). Unknown types fall back to `FileM` |

Supported MIME types → icon name mapping (see `MimeTypeIcon.utils.tsx` for full list): csv→`FileTypeTableM`, docx→`FileTypeTextM`, pdf→`FileTypeImageM`, xlsx→`FileTypeTableM`, zip→`FileArchiveM`, video/audio→`FileActionM`, default→`FileM`.

### `DynamicIcon` ⚠️ deprecated

Use `<Icon iconName="..." />` instead. Props: `name: IconName`, `fallback?: ReactNode`, + all `IconProps` except `component`/`iconName`. Renders `null` (or `fallback`) if the icon name is not found in the manifest.

### `useIconComponent(name?: string)`

Hook. Returns `ComponentType<SVGProps<SVGSVGElement>> | null`. Resolves an icon name to its React component via `iconManifest`. Memoised on `name`.

### `getIconComponent(name: string)`

Pure function version of `useIconComponent`. Returns the icon component or `null`.

### Icon SVG components (tree-shakeable)

All icons from all sets are re-exported individually. Naming convention: `{PascalCaseName}{Size}`.

| Set | Size suffix | Example exports | CSS class on SVG |
|-----|------------|-----------------|-------------------|
| M (medium) | `M` | `AddM`, `InfoM`, `CloseM` | `add-m ds-icon-set-medium` |
| L (large) | `L` | `AddL`, `FileUploadL` | `add-l ds-icon-set-large` |
| XL (extra-large) | `XL` | `AddXL` | `add-xl ds-icon-set-xlarge` |
| colorIcons | varies | `LogoGoogle` | `logo-google ds-icon-set-color` |
| additional | varies | — | `{name} ds-icon-set-additional` |

Each icon component is `(props: SVGProps<SVGSVGElement>) => JSX.Element`. Every SVG has:
- `fill="currentColor"` — colour controlled via CSS `color`
- `data-testid="ds-icon-{kebab-name}"` — e.g. `data-testid="ds-icon-add-m"`
- `className="{kebab-name} ds-icon-set-{set}"` — e.g. `className="add-m ds-icon-set-medium"`

### Types exported

| Type | Description |
|------|-------------|
| `IconProps` | `WithHTMLAttributes<HTMLDivElement, BaseIconProps>` |
| `BaseIconProps` | Core props without HTML attributes |
| `IconName` | Union of all icon names across all sets (`AllIconNames`) |
| `DynamicIconProps` | Props for deprecated `DynamicIcon` |
| `DynamicIconName` | Alias for `IconName` |
| `MimeTypeIconsProps` | Props for `MimeTypeIcon` |
| `StyledIcon<CustomProps>` | Utility type for styled-component extensions of `Icon` |

### Style constants exported

| Export | Value | Description |
|--------|-------|-------------|
| `IconContainer` | styled `<div>` | The container element; importable for nested selector use |
| `defaultSize` | `24` | Default icon size in px |
| `DEFAULT_COLOR_TOKEN` | `'grey-800'` | Default colour applied to L/XL icons when `color` is not set |

## Usage patterns

```tsx
import Icon, { AddM, MimeTypeIcon } from '@synerise/ds-icon';

// Recommended: by name string
<Icon iconName="AddM" size={24} color="#0066cc" />

// With stroke-based icon
<Icon iconName="SomeStrokeIcon" stroke color={theme.palette['blue-600']} />

// Direct component import (still valid, not deprecated at the import level)
<Icon component={<AddM />} size={32} />

// MIME type icon
<MimeTypeIcon type="application/pdf" size={24} />

// Imperative ref
const ref = useRef<HTMLDivElement>(null);
<Icon ref={ref} iconName="InfoM" />

// As styled-component target
import { IconContainer } from '@synerise/ds-icon';
const MyButton = styled.button`
  &:hover ${IconContainer} { color: blue; }
`;
```

## Styling

`IconContainer` in `Icon.styles.ts`. No design-system token dependencies except the L/XL default colour (`DEFAULT_COLOR_TOKEN = 'grey-800'`):
- Container: `display: inline-block; vertical-align: middle; width/height = size px`
- If `color` prop is set: applies to SVG as CSS `color` (+ `stroke` if `stroke=true`)
- If `color` is NOT set: SVGs inherit parent colour, **except** `ds-icon-set-large` and `ds-icon-set-xlarge` which default to `grey-800`
- If `onClick` is present on the container: `cursor: pointer` is applied automatically

## Key dependencies

- `@svgr/core` (dev) — transforms `.svg` files into typed React components at build time
- `@synerise/ds-utils` — `WithHTMLAttributes`, `DataAttributes` used in `IconProps`

## Adding a new icon

1. Add the `.svg` file to `src/svg/{M|L|XL|colorIcons|additional}/`
2. Run `pnpm run build:svgr` — this regenerates the `*.tsx` component and `index.ts` barrel for that set
3. Run `pnpm run build:js` and `pnpm run defs` (or just `pnpm run build`)

## Implementation notes

- **`iconName` vs `component` precedence:** `useIconComponent(iconName)` result takes priority — if an `IconComponent` is found by name, `component` is ignored.
- **`DynamicIcon` is deprecated:** Its behaviour (render `null` on unknown name) differs slightly from `<Icon iconName>` (which silently renders nothing but doesn't accept a `fallback`). Prefer `<Icon iconName>` for all new code.
- **`component` prop is @deprecated** but still functional. The JSDoc deprecation is on `BaseIconProps`; it will not cause TypeScript warnings unless explicitly configured.
- **Duplicate XL icons:** `index.ts` contains a comment: "Some of this icons are duplicated in XL folder, consider removing it before uploading new version."
- **Tests use Jest** (`jest.config.js`) — not yet migrated to Vitest.
- **SVG IDs are hashed:** SVGR build prefixes all SVG element IDs with `svg-{hash(filePath)}` to prevent global ID collisions when multiple icons are on the same page.
