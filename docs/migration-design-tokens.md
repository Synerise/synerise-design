# Migrating to design tokens

**Status:** merged to `master` on 2026-10-29 and released

Component styling moves from the Less-derived `theme.palette` / `theme.variables` to design-token CSS
custom properties (`var(--ds-*)`) from `@synerise/ds-tokens`. The DS does not follow strict SemVer:
these changes ship as minor/patch releases and consumers migrate in lockstep.

## `theme.variables` / `theme.variable()`

`theme.variables` is generated from `core/src/style/config.less` + `antd-legacy.less` by
`core/build/vars.js`. Tokenisation shrank it from 403 to 186 keys. `theme.palette` is unchanged.

### 217 keys were removed

`theme.variable('@<key>')` now returns `undefined` for these, and a styled-components interpolation of
`undefined` renders an empty declaration that the browser drops — no error, the style just disappears.

None of them is read by `portal-ui-bridge`, `portal-next`, `react-internal`, `universal-list` or
`portal-ui` (default branches checked 2026-10-21, including dynamically built keys). The only hits are
`portal-ui-bridge`'s own `packages/components/charts/src/styles/variables.less`, which defines its own
copies and does not depend on these.

**Colour ramps (`<hue>-color[-darker-N|-lighter-N|-opacity-N]`)** — 90

```
primary-color-darker-3 primary-color-darker-2 primary-color-darker-1 primary-color-lighter-2
primary-color-lighter-3 primary-color-lighter-4 primary-color-opacity-4 gray-color-opacity-1
gray-color-opacity-2 gray-color-opacity-3 gray-color-opacity-6 secondary-color-darker-3
secondary-color-darker-2 secondary-color-darker-1 secondary-color-lighter-1 secondary-color-lighter-2
secondary-color-lighter-3 secondary-color-lighter-4 secondary-color-lighter-5 secondary-color-lighter-6
red-color-darker-3 red-color-darker-2 red-color-darker-1 red-color-lighter-1
red-color-lighter-2 red-color-lighter-3 red-color-lighter-4 red-color-lighter-5
red-color-opacity-4 orange-color-darker-2 orange-color-lighter-1 orange-color-lighter-2
orange-color-lighter-3 orange-color-lighter-4 orange-color-lighter-5 orange-color-lighter-6
yellow-color-darker-3 yellow-color-darker-2 yellow-color-darker-1 yellow-color-lighter-1
yellow-color-lighter-2 yellow-color-lighter-3 yellow-color-lighter-4 yellow-color-lighter-5
yellow-color-opacity-4 green-color-darker-3 green-color-darker-2 green-color-darker-1
green-color-lighter-2 green-color-lighter-3 green-color-lighter-4 green-color-lighter-5
green-color-lighter-6 green-color-opacity-4 cyan-color-darker-3 cyan-color-darker-2
cyan-color-darker-1 cyan-color-lighter-1 cyan-color-lighter-2 cyan-color-lighter-3
cyan-color-lighter-4 cyan-color-lighter-5 cyan-color-lighter-6 purple-color-darker-3
purple-color-darker-2 purple-color-darker-1 purple-color purple-color-lighter-1
purple-color-lighter-2 purple-color-lighter-3 purple-color-lighter-4 purple-color-lighter-5
purple-color-lighter-6 violet-color-darker-3 violet-color-darker-2 violet-color-darker-1
violet-color violet-color-lighter-1 violet-color-lighter-2 violet-color-lighter-3
violet-color-lighter-4 violet-color-lighter-5 violet-color-lighter-6 lime-color-darker-3
lime-color-darker-2 lime-color-lighter-2 lime-color-lighter-3 lime-color-lighter-4
lime-color-lighter-5 lime-color-lighter-6
```

**antd button theming (`btn-*`)** — 112

```
btn-primary-hover-bg btn-primary-focus-bg btn-primary-active-bg btn-default-focus-bg
btn-default-active-bg btn-default-hover-bg btn-default-shadow btn-tertiary-color
btn-tertiary-bg btn-tertiary-hover-bg btn-tertiary-focus-bg btn-tertiary-active-bg
btn-tertiary-border btn-tertiary-shadow btn-tertiary-white-color btn-tertiary-white-bg
btn-tertiary-white-hover-bg btn-tertiary-white-focus-bg btn-tertiary-white-active-bg btn-tertiary-white-border
btn-ghost-hover-bg btn-ghost-focus-bg btn-ghost-active-bg btn-ghost-shadow
btn-ghost-primary-color btn-ghost-primary-bg btn-ghost-primary-hover-bg btn-ghost-primary-focus-bg
btn-ghost-primary-active-bg btn-ghost-primary-border btn-ghost-white-color btn-ghost-white-bg
btn-ghost-white-hover-bg btn-ghost-white-focus-bg btn-ghost-white-active-bg btn-ghost-white-border
btn-danger-hover-bg btn-danger-active-bg btn-danger-focus-bg btn-danger-ghost-bg
btn-danger-shadow btn-success-color btn-success-bg btn-success-border
btn-success-hover-bg btn-success-focus-bg btn-success-active-bg btn-success-shadow
btn-warning-color btn-warning-bg btn-warning-border btn-warning-hover-bg
btn-warning-focus-bg btn-warning-active-bg btn-warning-shadow btn-gray-color
btn-gray-bg btn-gray-border btn-gray-hover-bg btn-dark-color
btn-dark-bg btn-dark-border btn-dark-hover-bg btn-flat-color
btn-flat-bg btn-flat-border btn-flat-hover-color btn-primary-on-blue-color
btn-primary-on-blue-bg btn-primary-on-blue-hover-bg btn-disable-primary-on-blue-color btn-disable-primary-on-blue-bg
btn-disable-primary-color btn-disable-primary-bg btn-disable-primary-border btn-disable-default-border
btn-disable-tertiary-color btn-disable-tertiary-bg btn-disable-tertiary-border btn-disable-tertiary-white-color
btn-disable-tertiary-white-bg btn-disable-tertiary-white-border btn-disable-ghost-color btn-disable-ghost-bg
btn-disable-ghost-border btn-disable-ghost-primary-color btn-disable-ghost-primary-bg btn-disable-ghost-primary-border
btn-disable-ghost-white-color btn-disable-ghost-white-bg btn-disable-ghost-white-border btn-disable-gray-color
btn-disable-gray-bg btn-disable-gray-border btn-disable-dark-color btn-disable-dark-bg
btn-disable-dark-border btn-disable-danger-color btn-disable-danger-bg btn-disable-danger-border
btn-disable-success-color btn-disable-success-bg btn-disable-success-border btn-disable-warning-color
btn-disable-warning-bg btn-disable-warning-border btn-disable-flat-color btn-disable-flat-bg
btn-disable-flat-border btn-padding-base btn-padding-lg btn-padding-sm
```

**Shadows** — 4

```
shadow-color-highlight box-shadow-3 box-shadow-4 shadow-highlight
```

**Other** — 11

```
heading-color-dark tag-default-border tag-border-radius-base grid-gutter-width
label-font-size label-line-height input-border-width input-font-size-lg
input-font-size-base input-line-height-base input-background-color-focus
```
**Replacement:** use the matching design token — `var(--ds-…)` in CSS, or
`useTheme().tokens['--ds-…']` where a concrete value is needed. The ramps map onto the
`--ds-color-<hue>-<shade>` primitives and the semantic `--ds-color-*` tier; the button keys onto the
`--ds-buttons-*` module tokens.

### 15 keys now hold a `var()` instead of a hex value

| Key | Was | Now |
| --- | --- | --- |
| `background-color` | `#f3f5f6` | `var(--ds-color-background-base-muted)` |
| `body-background` | `#f3f5f6` | `var(--ds-color-background-base-muted)` |
| `heading-color` | `#384350` | `var(--ds-color-text-base-default)` |
| `text-color` | `#6a7580` | `var(--ds-color-text-base-muted)` |
| `link-color` | `#0b68ff` | `var(--ds-color-text-brand-default)` |
| `link-active-color` | `#0b68ff` | `var(--ds-color-text-brand-default)` |
| `border-color-base` | `#dbe0e3` | `var(--ds-color-border-base-strong)` |
| `box-shadow-1` | `0px 4px 12px 0px rgba(35, 41, 54, 0.04)` | `var(--ds-shadows-shadow-1)` |
| `box-shadow-2` | `0px 16px 32px 0px rgba(35, 41, 54, 0.1)` | `var(--ds-shadows-shadow-2)` |
| `btn-default-color` | `#6a7580` | `var(--ds-color-text-base-muted)` |
| `btn-default-bg` | `#f9fafb` | `var(--ds-color-background-base-subtle)` |
| `input-color` | `#6a7580` | `var(--ds-color-text-base-muted)` |
| `input-border-color` | `#dbe0e3` | `var(--ds-color-border-base-strong)` |
| `table-header-bg` | `#f9fafb` | `var(--ds-color-background-base-subtle)` |
| `table-header-sort-bg` | `#f3f5f6` | `var(--ds-color-background-base-muted)` |

These keep working anywhere CSS resolves them: styled-components interpolations, inline `style`
objects, CSS gradients. They break where the value is used as a **colour value in JavaScript** —
`hexToRgba(theme.variable('@text-color'), 0.5)`, colour libraries, Highcharts options, canvas or SVG
presentation attributes. For those, read the resolved value from `useTheme().tokens['--ds-…']`
(it follows the active light/dark mode).

All current consumer reads of these keys (24 in `portal-ui-bridge`, 1 in `portal-next`) are CSS
interpolations or inline styles, so nothing needs to change today.

## Visual changes

Accepted on review. No code change is needed, but snapshots and screenshots will differ.
The per-property list of smaller colour shifts (old value, new token, rationale) is in
[design-token-visual-shifts.md](./design-token-visual-shifts.md).

| Component | Before | After |
| --- | --- | --- |
| `Navbar` (no `color`) | blue-600 background | `--ds-navbar-container-bg` (grey) |
| `Cascader` | shadow on the input and search results | `--ds-shadows-shadow-2` on the root `.ds-cascader`, so every Cascader has elevation; one inside a `Dropdown` overlay shows both shadows |
| `DatePicker` days outside the current month | lighter than in-month days | `--ds-color-text-base-default`, darker than in-month days; the background marks them |
| `Radio` checked label | darkened to grey-800 | stays at the default label colour |
| `FileUploader` remove / success icons | darkened on hover | no hover colour change |
| `Avatar` / `selectColorByLetter` colours | 11 hand-ordered families | the 12 `customColorNames` families in alphabetical order, including grey (accepted by UX) — see below |
| `IconPicker` search with no results | 16px above the icon and text | 6px, so the empty state sits 10px closer to the search input and the dropdown is 10px shorter. The dotted separator between icon groups was also removed, with no visual change: groups render as virtualised rows, so it had nothing left to match |
| `EditableItemsList` add button | `ghost-primary` button with default spacing | `mode="icon-label"` when `addButtonLabel` is set (4px gap between icon and text), `mode="single-icon"` (32px square) when it is not. `addButtonProps.mode` overrides both |

### Initial-letter colours

`selectColorByLetter` (used by `Avatar` and any app colouring by initial) now cycles through
`@synerise/ds-tokens/names` `customColorNames` (`blue, cyan, fern, green, grey, mars, orange, pink, purple,
red, violet, yellow`). 21 of 26 letters change colour; A–D and T keep theirs, E and Q become grey:

```
E orange→grey   F yellow→mars    G red→orange    H mars→pink     I pink→purple   J violet→red
K purple→violet L blue→yellow    M cyan→blue     N fern→cyan     O green→fern    P orange→green
Q yellow→grey   R red→mars       S mars→orange   U violet→purple V purple→red    W blue→violet
X cyan→yellow   Y fern→blue      Z green→cyan
```

### Icon colours: an explicit `color` always wins

Wrappers now colour icons through `color` on the wrapper instead of a rule on the `svg`, so
`<Icon color>` always wins over the wrapper's state colours (hover, selected, featured, danger). DS
defaults no longer pass a `color` prop, so they keep following the state colours.

If a portal app passes `color` in one of these slots and wants the DS default, hover, selected or
featured colour, **remove the prop**:

- list-item / dropdown `prefixel` and `suffixel` (including `type="danger"`)
- input `icon1` / `icon2`, description `labelIcon`, toast `customIcon`, section-message `IconOrderWrapper`
- item-picker `selected.prefixel`, tag prefix icon, tabs `suffixel`, block `icon`, table-new `icon` /
  `tooltipIcon`, manageable-list `additionalActions`, navbar alert `customIcon`

Also visible: manageable-list's red remove icons stay red on hover, large / XL icons in these wrappers
keep the icon package's darker large-icon default, and a raw `<svg>` (not wrapped in `Icon`) in a tabs
`suffixel` no longer picks up the state colours.

## Removed or changed exports

| Export | Change | Migration |
| --- | --- | --- |
| `ButtonStyles.Expander.focusAnimation` (`@synerise/ds-button`) | was `({ theme }) => Keyframes`, now a plain `Keyframes` | use it directly; calling it throws |
| `DEFAULT_COLOR_TOKEN` (`@synerise/ds-icon`) | removed (was `'grey-800'`) | use `var(--ds-color-icon-base-strong)` (grey-800), or leave `color` unset so the icon inherits |
| `RawTextArea` (`@synerise/ds-input`) | deprecated, to be removed; it is the bare `<textarea>` with no border, focus or scrollbar wrapper | `DSRawTextArea` for a bare DS textarea (wrapper, autosize, error state), or `TextArea` for the FormField version with label, description, error text and counter |
| `DS_MONACO_THEME` (`@synerise/ds-code-area/dist/constants`, deep import only) | deprecated; stays light-only | `getDsMonacoTheme(useTheme().tokens)`, which follows the active mode. `CodeArea` itself now does this |

None of these is used in `portal-ui-bridge`, `portal-next` or `react-internal`.

## Consumer changes to make

A running list of changes the portal repos need for this release. Checked against `portal-ui-bridge` @
`5e4be650ce0` and `portal-next` @ `7bea2381` (2026-10-21).

### `portal-ui-bridge`

**Tags on a grey-200 background with no `textColor`.** `Tag` text now pairs with its background variant:
a `color` without `textColor` gets the colour variant's text (white), so `color={theme.palette['grey-200']}`
renders white on light grey. The tag colours match Figma; the fix is to drop `color` so the default grey
variant (with its dark grey text) renders:

| File | Change |
| --- | --- |
| `packages/apps/ai/src/App/Search/Indexes/IndexDetails/Preview/PreviewRenderer/Filters/AutomaticFacetTag/AutomaticFacetTag.tsx:28` | drop `color` |
| `packages/apps/campaigns/src/App/Promotions/Promotions/PromotionForm/steps/PromotionAudience/BehavioralFilter/components/PurchaseFilterBuilder.tsx:119` | drop `color` |
| `packages/components/analytics-core/src/modules/AnalyticsFilter/components/AnalyticsFilter.tsx:371` | drop `color` |
| `packages/apps/campaigns/src/App/Stories/components/FramesCardPreview/components/NumberedTabs/NumberedTabs.tsx:39` | drop `color` (`StepTag`) |
| `packages/apps/campaigns/src/App/Stories/components/FramesCardPreview/components/NumberedTabs/NumberedTabs.tsx:61` | inactive: `color={isActive ? theme.palette['blue-600'] : undefined}` |
| `packages/components/content-manager/src/ContentVariantsThumbnail/ContentVariantsThumbnail.tsx:51` | inactive: `undefined` instead of `grey-200` |

Tags that pass `color={grey-200}` together with `textColor`, or render only an icon with its own colour
(`WalletTypeTags`, `SystemTags`), are unaffected.

### `portal-next`

Nothing yet.
