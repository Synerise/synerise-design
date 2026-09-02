# Icon (`@synerise/ds-icon`)

> Renders an SVG icon inside a sized, coloured `<div>` container. Icons are build-time generated from SVG files via `@svgr/core` and exported as individual React components.

## Package structure

```
src/
 Icon.tsx — main component (forwardRef)
 Icon.types.ts — IconProps, BaseIconProps, StyledIcon, IconName
 Icon.styles.ts — IconContainer styled-component + exported constants
 index.ts — public exports
 useIconComponent.ts — hooks resolving icon name → component
 iconLoader.ts — icon cache + per-set dynamic import()
 registerAllIcons.ts — opt-in side-effect entry: registers every icon eagerly
 icons/
 M/ — medium (24px) icons, auto-generated
 L/ — large (48px) icons, auto-generated
 XL/ — extra-large icons, auto-generated
 colorIcons/ — multi-colour icons, auto-generated
 iconSets.ts — name → set index, auto-generated
 additional/ — additional icons, auto-generated
 DynamicIcon/
 DynamicIcon.tsx — @deprecated wrapper (use <Icon iconName> instead)
 iconManifest.ts — AllIconNames union (type-only; no runtime imports)
 MimeTypeIcon/
 MimeTypeIcon.tsx — maps MIME type string → icon
 MimeTypeIcon.types.ts — MimeTypeIconsProps
 MimeTypeIcon.utils.tsx — mapMimeTypeToIconName switch
 build/
 svgr.js — build script: SVG files → React components
 template.js — SVGR JSX template
 __specs__/
 Icon.spec.tsx — Vitest tests
```

## Public exports

### `Icon` (default export)

`forwardRef<HTMLDivElement, IconProps>`. Renders a `<div>` (`.ds-icon`) wrapping the SVG.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `component` | `ReactNode` | `undefined` | **Recommended for known icons.** Import the icon and pass it directly (e.g. `<AddM />`) — tree-shakeable |
| `iconName` | `IconName` | `undefined` | Icon name string (e.g. `'AddM'`, `'InfoL'`). Use **only** when the icon isn't known at build time (e.g. from a DB/API); prefer `component`. Takes precedence over `component` |
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

Use `<Icon iconName=".." />` instead. Props: `name: IconName`, `fallback?: ReactNode`, + all `IconProps` except `component`/`iconName`. Renders `fallback` once the name is known not to exist. While the icon's set is still loading it renders the empty `Icon` container, so a valid name never flashes the fallback.

### `useIconComponent(name?: string)`

Hook. Returns `ComponentType<SVGProps<SVGSVGElement>> | null`. Resolves an icon name to its React component, loading the icon's set on first use and returning `null` until it arrives.

### `getIconComponent(name?: string)` ⚠️ deprecated

Synchronous, **cache-only** lookup — returns `null` for an icon that has not been loaded yet. It cannot tell that apart from "no such icon"; use `peekIcon` when the difference matters. Use `loadIconComponent` (async) or `useIconComponent` (in a component) instead, or import `registerAllIcons` to make every lookup resolve.

### `peekIcon(name: string)`

Synchronous tri-state cache probe: `{ status: 'loaded', Component }`, `{ status: 'missing' }` (a cached negative result — the name does not exist), or `{ status: 'unknown' }` (nothing resolved for it yet). This is what lets `useIconComponentState` report `missing` during render, so a remount of an unknown name never hides `DynamicIcon`'s fallback for a frame.

### `loadIconComponent(name: string)`

`Promise<ComponentType<SVGProps<SVGSVGElement>> | null>`. Resolves an icon by name, fetching its set on first use. Resolves to `null` for an unknown name. A failed chunk fetch is evicted from every cache it touched, so a later mount retries rather than getting a permanently rejected promise.

### `useIconComponentState(name?: string)`

Returns `{ Component, status }` where `status` is `'idle' | 'loading' | 'loaded' | 'missing'`. Use it when you must tell "still loading" apart from "no such icon" — `DynamicIcon` uses it to keep `fallback` meaning *unknown icon*.

### `preloadIcons(...names)` / `preloadIconSet(set)`

Warm the cache ahead of render so the first paint has no gap. `set` is one of `'M' | 'L' | 'XL' | 'additional' | 'colorIcons'`.

### `registerIcons(icons)`

Fills the cache from an eagerly imported set. This is what `registerAllIcons` uses; call it directly only if you import icon sets yourself.

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

// Recommended for known icons: import the icon and pass it via `component` (tree-shakeable)
<Icon component={<AddM />} size={24} color="#0066cc" />

// With stroke-based icon
<Icon component={<SomeStrokeIcon />} stroke color={theme.palette['blue-600']} />

// Only when the icon name isn't known until runtime (e.g. from a DB/API):
<Icon iconName={iconNameFromApi} size={32} />

// MIME type icon
<MimeTypeIcon type="application/pdf" size={24} />

// Imperative ref
const ref = useRef<HTMLDivElement>(null);
<Icon ref={ref} component={<InfoM />} />

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
2. Run `pnpm run build:svgr` — regenerates the `*.tsx` component, the `index.ts` barrel for that set, and the `icons/iconSets.ts` name → set index. It fails if the new name already exists in another set, since `iconSets` is a flat name → set map and could only keep one of them.
3. Run `pnpm run build`

## Adding a new icon set

1. Add the folder to `ICON_SETS` in `build/svgr.js` — it is the single source of truth for both the generated `IconSet` union and the per-set output directories
2. Run `pnpm run build:svgr`, then add a matching `import()` to `SET_LOADERS` in `src/iconLoader.ts`

`SET_LOADERS` is typed `Record<IconSet, …>` against the generated union, so step 2 is a compile error until you do it — which is the point. Without that coupling a missing loader would only show up at runtime, as an icon that silently never appears.

## Implementation notes

- **`iconName` vs `component` precedence:** `useIconComponent(iconName)` result takes priority — if an `IconComponent` is found by name, `component` is ignored. While a set is still loading the result is `null`, so `component` renders in the meantime — which makes it a natural placeholder for an `iconName` icon.
- **`DynamicIcon` is deprecated:** Its behaviour (render `fallback` on unknown name) differs slightly from `<Icon iconName>` (which silently renders nothing but doesn't accept a `fallback`). Prefer `<Icon iconName>` for all new code.
- **`component` is the recommended prop for known icons; `iconName` is for unknown/runtime names only.** Import the icon and pass `component={<X />}` (tree-shakeable); use `iconName` only when the name isn't known at build time (e.g. from a DB/API). The former `@deprecated` mark on `component` has been removed.
- **Tree-shaking:** `Icon.tsx` has no static import of any icon module — `iconLoader.ts` reaches the five sets only through dynamic `import()`. So `<Icon component={<AddM />} />` retains just the icons you imported (~390 kB gzipped stays out of the bundle), and `iconName` pulls in one set on demand.
- **`iconName` resolves asynchronously.** The first render of an icon whose set is not yet loaded shows the empty container for one frame — correctly sized, since `IconContainer` always applies `width`/`height`, so there is no layout shift. The cache is read *during render*, so every later render of any icon from that set paints immediately. Resolution is per set, not per icon: five chunks (`M`, `L`, `XL`, `additional`, `colorIcons`), with a small generated `icons/iconSets.ts` index mapping name → set.
- **Opting out:** `import '@synerise/ds-icon/dist/registerAllIcons';` in an application entry file registers every icon eagerly and makes `iconName` fully synchronous, including under SSR. That bundles the whole set — use it only when icons must appear in server-rendered HTML or on the very first paint.
- **Duplicate XL icons:** `index.ts` contains a comment: "Some of this icons are duplicated in XL folder, consider removing it before uploading new version."
- **Uses Vitest** for testing.
- **SVG IDs are hashed:** SVGR build prefixes all SVG element IDs with `svg-{hash(filePath)}` to prevent global ID collisions when multiple icons are on the same page.
