# Design Token Migration Status

Tracks the progress of migrating components from `theme.palette` / hardcoded values to CSS custom properties generated from the Token Studio design tokens in `packages/tokens/`.

## Legend

| Symbol | Meaning |
|--------|---------|
| :white_check_mark: | Fully applied — component uses CSS vars for this category |
| :construction: | Partially applied — some values migrated, others remain |
| :x: | Not yet started |
| :heavy_minus_sign: | N/A — component does not use this category or has no tokens defined for it |

## Component Status

### Components with module-level tokens defined

These components have dedicated token definitions in `modules/base.json`.

| Component | Package | Colors | Shadows | Opacity | Spacing | Diffs | Less? | Notes |
|-----------|---------|--------|---------|---------|---------|-------|-------|-------|
| [section-message](#section-message) | `section-message` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 2 | No | 7 variants, all tokenised |
| [toast](#toast) | `toast` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :x: | 2 | No | 4 variants, shadow done |
| [broadcast-bar](#broadcast-bar) | `broadcast-bar` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | TBD | No | 9 color tokens ready |
| ai-chat | `app-menu` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | TBD | No | 9 color tokens |
| app-menu | `app-menu` | :x: | :x: | :x: | :x: | TBD | No | 6 color, 1 shadow, 14 opacity refs |
| avatar | `avatar` | :x: | :heavy_minus_sign: | :x: | :x: | TBD | Yes (1) | 9 color, 1 opacity |
| buttons | `button` | :x: | :x: | :x: | :x: | TBD | Yes (2) | 247 color, 15 dim, 1 opacity. Largest token set |
| button-expander | `button` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | TBD | — | Part of button package |
| card | `card` | :x: | :x: | :x: | :x: | TBD | No | 4 color, 3 shadow, 1 opacity |
| card-select | `card-select` | :x: | :x: | :x: | :x: | TBD | No | 15 color, 2 boxShadow, 1 opacity |
| description-line | `description` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | TBD | No | 2 color tokens |
| divider | `divider` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | TBD | No | 3 color, 4 dim |
| form | `form` / `input` / `checkbox` / `radio` / `switch` / `select` | :x: | :heavy_minus_sign: | :x: | :x: | TBD | Yes (many) | 61 color, 3 opacity. Spans multiple packages |
| inline-alert | `inline-alert` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | TBD | No | 5 color tokens |
| inline-edit | `inline-edit` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | TBD | No | 5 color tokens |
| inline-select | `inline-select` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | TBD | No | 10 color tokens |
| list-item | `list-item` | :x: | :heavy_minus_sign: | :x: | :x: | TBD | No | 42 color, 1 opacity |
| modal | `modal` | :x: | :x: | :heavy_minus_sign: | :x: | TBD | Yes (2) | 9 color, 1 shadow |
| navbar | `navbar` | :x: | :heavy_minus_sign: | :x: | :x: | TBD | No | 5 color, 2 opacity |
| page | `page-header` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | TBD | No | 1 color token |
| page-header | `page-header` | :x: | :x: | :heavy_minus_sign: | :x: | TBD | No | 4 color, 1 shadow |
| pagination | `pagination` | :x: | :heavy_minus_sign: | :x: | :x: | TBD | Yes (2) | 16 color, 2 opacity |
| popcornfirm | `popconfirm` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | TBD | Yes (1) | 4 color tokens |
| progressbar | `progress-bar` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | TBD | No | 4 color, 7 dim |
| status-pill | `status` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | TBD | No | 15 color, 5 dim |
| stepper | `stepper` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | TBD | No | 16 color, 1 dim |
| tabs | `tabs` | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | TBD | No | 4 color, 6 dim |
| time-picker | `time-picker` | :x: | :x: | :heavy_minus_sign: | :x: | TBD | No | 9 color, 1 boxShadow |

### Components without module-level tokens

These components use `theme.palette` / hardcoded colors but do not yet have dedicated token definitions in Token Studio. They can use semantic tokens directly or need token definitions added.

| Package | palette refs | Less? | shadow refs | opacity refs | Notes |
|---------|-------------|-------|-------------|--------------|-------|
| action-area | 4 | No | 0 | 0 | |
| alert | 44 | Yes (2) | 9 | 11 | Heavy palette + Less usage |
| autocomplete | 10 | Yes (2) | 3 | 0 | |
| avatar-group | 8 | No | 2 | 2 | |
| badge | 11 | Yes (1) | 4 | 4 | |
| banner | 10 | Yes (1) | 0 | 0 | |
| block | 6 | No | 0 | 0 | |
| button-group | 6 | No | 4 | 0 | |
| card-tabs | 68 | No | 2 | 4 | High palette count |
| cascader | 34 | No | 5 | 10 | |
| checkbox | 9 | Yes (2) | 4 | 1 | Token Studio has form.checkbox tokens |
| code-area | 18 | No | 1 | 1 | |
| code-snippet | 20 | Yes (1) | 0 | 2 | |
| collector | 12 | No | 1 | 2 | |
| color-picker | 8 | No | 2 | 0 | |
| column-manager | 14 | No | 1 | 5 | |
| completed-within | 5 | No | 1 | 3 | |
| condition | 14 | No | 1 | 8 | |
| confirmation | 5 | No | 0 | 0 | |
| context-selector | 7 | No | 0 | 0 | |
| copy-icon | 2 | No | 0 | 0 | |
| cruds | 4 | No | 0 | 0 | |
| date-picker | 56 | No | 1 | 0 | High palette count |
| date-range-picker | 43 | No | 2 | 7 | |
| drawer | 3 | Yes (1) | 1 | 0 | |
| dropdown | 20 | No | 1 | 1 | |
| editable-items-list | 1 | No | 0 | 0 | |
| emoji-picker | 2 | No | 0 | 0 | |
| empty-states | 1 | No | 0 | 0 | |
| estimation | 2 | No | 0 | 0 | |
| factors | 18 | No | 2 | 0 | |
| field-set | 1 | No | 0 | 0 | |
| file-uploader | 152 | No | 0 | 7 | Highest palette count |
| filter | 3 | No | 0 | 1 | |
| flag | 0 | No | 0 | 34 | No palette, heavy opacity |
| footer | 1 | No | 0 | 0 | |
| form-field | 2 | No | 0 | 0 | |
| format-picker | 8 | No | 0 | 0 | |
| icon-picker | 8 | No | 0 | 0 | |
| information-card | 3 | No | 2 | 2 | |
| input | 49 | Yes (2) | 14 | 2 | Token Studio has form.input tokens |
| input-number | 5 | Yes (2) | 5 | 0 | |
| insight | 4 | No | 0 | 0 | |
| item-filter | 2 | No | 1 | 0 | |
| item-picker | 43 | No | 4 | 1 | |
| items-roll | 16 | No | 1 | 4 | |
| layout | 6 | No | 2 | 2 | |
| list | 9 | Yes (2) | 1 | 1 | |
| loader | 2 | No | 0 | 0 | |
| logic | 13 | No | 0 | 0 | |
| manageable-list | 57 | No | 6 | 9 | High palette count |
| mapping | 3 | No | 0 | 0 | |
| menu | 102 | Yes (2) | 5 | 21 | Very high palette + opacity |
| metric-card | 2 | No | 0 | 3 | |
| operators | 6 | No | 0 | 0 | |
| panel | 2 | No | 1 | 0 | |
| panels-resizer | 4 | No | 0 | 0 | |
| popover | 0 | No | 0 | 2 | |
| radio | 1 | Yes (2) | 3 | 4 | Token Studio has form.radio tokens |
| result | 3 | No | 0 | 0 | |
| scrollbar | 17 | Yes (2) | 0 | 17 | |
| search | 13 | Yes (2) | 4 | 8 | |
| search-bar | 12 | No | 1 | 0 | |
| select | 13 | Yes (2) | 6 | 3 | Token Studio has form.select tokens |
| short-cuts | 7 | No | 1 | 0 | |
| sidebar | 14 | Yes (1) | 1 | 2 | |
| sidebar-object | 9 | No | 0 | 0 | |
| skeleton | 5 | No | 0 | 15 | |
| slider | 12 | No | 4 | 0 | |
| sortable | 3 | No | 1 | 2 | |
| status | 7 | No | 0 | 1 | Token Studio has status-pill tokens |
| step-card | 5 | No | 1 | 13 | |
| subject | 2 | No | 0 | 0 | |
| subtle-form | 10 | No | 1 | 4 | |
| switch | 2 | Yes (2) | 2 | 2 | Token Studio has form.switch tokens |
| table | 65 | Yes (2) | 8 | 23 | Heavy palette + Less |
| tag | 25 | No | 2 | 3 | |
| tags | 7 | No | 0 | 0 | |
| toolbar | 4 | No | 1 | 0 | |
| tooltip | 3 | No | 2 | 2 | |
| tray | 4 | No | 1 | 0 | |
| typography | 8 | Yes (1) | 0 | 1 | |
| unordered-list | 1 | No | 0 | 0 | |
| wizard | 6 | No | 0 | 0 | |

### Packages with no color-related code

These packages have zero `theme.palette`, shadow, and opacity usage:

`checkbox-tristate`, `flex-box`, `grid`, `ordered-list`

---

## Detailed Reports

### section-message

**Package:** `packages/components/section-message/`
**Token variants:** success, warning, error, informative, supply, service, entity (7 total)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

All 7 `SectionType` variants use component-level CSS vars (`--ds-section-message-variant-{variant}-{bg|border|bordertop|icon|text-header|text-description}`). No `theme.palette` fallback remains for type-driven colors.

`customColor` / `customColorIcon` overrides still use `theme.palette` — intentional (user-specified overrides, not token-driven).

#### Shadows — :heavy_minus_sign: N/A

#### Opacity — :heavy_minus_sign: N/A

#### Spacing — :x: Not started

Hardcoded px values remain. Token Studio defines: `content.padding.x`, `content.padding.y`, `content.gap.elements`, `content.gap.text`, `border.radius`, `border.width.default`, `border.width.top`, `icon.size`.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Header text color | `grey-700` (#57616d) | `grey-800` (#384350) | Darker |
| Description text color | `grey-700` (#57616d) | `grey-600` (#6a7580) | Lighter |

#### Unmapped colors

| Usage | Value | Location | Reason |
|-------|-------|----------|--------|
| Close icon | `grey-700` | `IconCloseWrapper` | Could use `--ds-color-icon-base-default` |
| NumberWrapper gradient | `grey-400` | Hover effect | Decorative |
| IconOrderWrapper hover | `blue-600` | SVG fill | Interactive |
| Various grey-700 | `grey-700` | `Wrapper`, `OrderWrapper` etc. | Legacy/unused styled components |

---

### toast

**Package:** `packages/components/toast/`
**Token variants:** success, warning, error, informative (4 total; component type `negative` → token `error`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

All 4 variants use CSS vars (`--ds-toast-variant-{variant}-{bg|border|icon|text-label|text-description}`). Body text/icons use semantic tokens.

#### Shadows — :white_check_mark: Complete

Container `box-shadow` uses `var(--ds-shadows-shadow-2)`.

#### Opacity — :heavy_minus_sign: N/A

`opacity: 0.6` on `NumberWrapper` is decorative, no token equivalent.

#### Spacing — :x: Not started

Hardcoded px values remain. Token Studio defines: `content.padding.x`, `content.padding.y`, `content.gap.elements`, `content.gap.text`, `borderRadius`, `icon.size`.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Negative icon/border | `red-500` (#ff5a4d) | `red-600` (#f52922) | Darker |
| Informative border | `grey-600` (#6a7580) | `grey-700` (#57616d) | Darker |

#### Unmapped colors

| Usage | Value | Location | Reason |
|-------|-------|----------|--------|
| NumberWrapper gradient | `grey-400` | Hover effect | Decorative |
| IconOrderWrapper hover | `blue-600` | SVG fill | Interactive |
| Gradient stops | `rgba(255,255,255,0)` | NumberWrapper | Transparent white |

---

### broadcast-bar

**Package:** `packages/components/broadcast-bar/`
**Token variants:** success, warning, error (3 total; component type `negative` → token `error`)
**Status:** Not yet migrated

#### Colors — :x: Not started

9 tokens available: `--ds-broadcast-bar-variant-{success|warning|error}-{bg|text|icon}`

Current mapping:
- success → `green-600` (bg), `white` (text/icon)
- warning → `yellow-600` (bg), `grey-800` (text/icon)
- negative → `red-600` (bg), `white` (text/icon)

#### Shadows — :heavy_minus_sign: N/A

#### Opacity — :heavy_minus_sign: N/A

#### Spacing — :x: Not started

Token Studio defines: `content.padding.x.left`, `content.padding.x.right`, `content.padding.y`, `content.gap`, `icon.size.main`, `icon.size.close`.

#### Expected visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Warning text/icon | `grey-800` (#384350) | `grey-900` (#232936) | Darker |

#### Unmapped colors

| Usage | Value | Location | Reason |
|-------|-------|----------|--------|
| Button background | `rgba(255,255,255,0.2)` | `ButtonWrapper` | Semi-transparent overlay — no token |
