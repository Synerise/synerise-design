# Design Token Migration Status

Tracks the progress of migrating components from `theme.palette` / hardcoded values to CSS custom properties generated from the Token Studio design tokens in `packages/tokens/`.

## Legend

| Symbol | Meaning |
|--------|---------|
| :white_check_mark: | Fully applied — component uses CSS vars for this category |
| :construction: | Partially applied — some values migrated, others remain |
| :x: | Not yet started |
| :heavy_minus_sign: | N/A — component does not use this token category |

## Component Status

| Component | Colors | Shadows | Opacity | Spacing | Visual diffs | Notes |
|-----------|--------|---------|---------|---------|--------------|-------|
| [section-message](#section-message) | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 2 | No shadows or opacity in component |
| [toast](#toast) | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :x: | 2 | Shadow via `--ds-shadows-shadow-2` |
| [broadcast-bar](#broadcast-bar) | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | TBD | 9 color tokens available in build |

---

## section-message

**Package:** `packages/components/section-message/`
**Token variants:** success, warning, error, informative, supply, service, entity (7 total)
**Migrated in:** `chore/tokenisation` branch

### Colors — :white_check_mark: Complete

All 7 `SectionType` variants use component-level CSS vars (`--ds-section-message-variant-{variant}-{bg|border|bordertop|icon|text-header|text-description}`). No `theme.palette` fallback remains for type-driven colors.

`customColor` / `customColorIcon` overrides still use `theme.palette` — intentional (user-specified overrides, not token-driven).

### Shadows — :heavy_minus_sign: N/A

Component has no box-shadow.

### Opacity — :heavy_minus_sign: N/A

Component has no opacity usage.

### Spacing — :x: Not started

Hardcoded px values remain for padding, margin, border-radius, border-width. Token Studio defines spacing tokens (`content.padding.x`, `content.padding.y`, `content.gap.elements`, `content.gap.text`, `border.radius`, `border.width.default`, `border.width.top`, `icon.size`) but these are `dimension` type tokens not yet included in the CSS output.

### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Header text color | `grey-700` (#57616d) | `grey-800` (#384350) via `--ds-color-text-base-default` | Darker |
| Description text color | `grey-700` (#57616d) | `grey-600` (#6a7580) via `--ds-color-text-base-muted` | Lighter |

### Unmapped colors

| Usage | Current value | Location | Reason |
|-------|---------------|----------|--------|
| Close icon | `theme.palette['grey-700']` | `IconCloseWrapper` | No component token; could use `--ds-color-icon-base-default` |
| NumberWrapper | `theme.palette['grey-400']` | Hover gradient | Decorative — keep palette |
| IconOrderWrapper hover | `theme.palette['blue-600']` | SVG fill | Interactive hover — keep palette |
| Various grey-700 text | `theme.palette['grey-700']` | `Wrapper`, `IconOrderWrapper`, `OrderWrapper` | Legacy/unused styled components |

---

## toast

**Package:** `packages/components/toast/`
**Token variants:** success, warning, error, informative (4 total; component type `negative` maps to token variant `error`)
**Migrated in:** `chore/tokenisation` branch

### Colors — :white_check_mark: Complete

All 4 variants use component-level CSS vars (`--ds-toast-variant-{variant}-{bg|border|icon|text-label|text-description}`). Body text and icons use semantic tokens (`--ds-color-text-base-muted`, `--ds-color-icon-base-muted`).

### Shadows — :white_check_mark: Complete

Container `box-shadow` uses `var(--ds-shadows-shadow-2)` (was hardcoded `0 16px 32px 0 rgba(35,41,54,0.12)`).

### Opacity — :heavy_minus_sign: N/A

Component uses hardcoded `opacity: 0.6` on `NumberWrapper` — decorative, no token equivalent.

### Spacing — :x: Not started

Hardcoded px values remain for padding, margin, border-radius, max-width. Token Studio defines spacing tokens (`content.padding.x`, `content.padding.y`, `content.gap.elements`, `content.gap.text`, `borderRadius`, `icon.size`) but these are `dimension` type not yet in the CSS output.

### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Negative icon/border | `red-500` (#ff5a4d) | `red-600` (#f52922) via `--ds-color-border-danger-default` | Darker, more saturated |
| Informative border | `grey-600` (#6a7580) | `grey-700` (#57616d) via `--ds-color-border-neutral-default` | Darker |

### Unmapped colors

| Usage | Current value | Location | Reason |
|-------|---------------|----------|--------|
| NumberWrapper gradient | `theme.palette['grey-400']` | Hover underline effect | Decorative — keep palette |
| IconOrderWrapper hover | `theme.palette['blue-600']` | SVG fill | Interactive hover — keep palette |
| Gradient transparent stops | `rgba(255, 255, 255, 0)` | NumberWrapper, OrderWrapper | Transparent white — hardcoded |

---

## broadcast-bar

**Package:** `packages/components/broadcast-bar/`
**Token variants:** success, warning, error (3 total; component type `negative` maps to token variant `error`)
**Status:** Not yet migrated

### Colors — :x: Not started

9 component-level tokens available in the CSS build:
- `--ds-broadcast-bar-variant-{success|warning|error}-{bg|text|icon}`

Current implementation uses `theme.palette` in `getColorBackground()` and `getColorIcon()` helper functions. Mapping:
- success → `green-600` (bg), `white` (text/icon)
- warning → `yellow-600` (bg), `grey-800` (text/icon)
- negative → `red-600` (bg), `white` (text/icon)

Token mapping uses `onSolid` semantic colors for text/icon (e.g., `color.text.onSolid.warning` → `grey-900`). Warning text/icon may differ: currently `grey-800`, token uses `grey-900`.

### Shadows — :heavy_minus_sign: N/A

Component has no box-shadow.

### Opacity — :heavy_minus_sign: N/A

Component has no opacity usage.

### Spacing — :x: Not started

Hardcoded px values: padding (12px), margins (8px, 12px, 3px, 5px, 6px, 10px), border-radius (3px). Token Studio defines `content.padding.x.left`, `content.padding.x.right`, `content.padding.y`, `content.gap`, `icon.size.main`, `icon.size.close`.

### Expected visual diffs (pre-migration)

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Warning text/icon | `grey-800` (#384350) | `grey-900` (#232936) via `--ds-color-text-onsolid-warning` | Darker — needs verification |

### Unmapped colors

| Usage | Current value | Location | Reason |
|-------|---------------|----------|--------|
| Button background | `rgba(255, 255, 255, 0.2)` | `ButtonWrapper` | Semi-transparent overlay — no token |
