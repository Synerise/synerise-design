# Remaining palette / hex / rgba usage — `packages/components`

Snapshot of every colour that is **not** yet a `var(--ds-*)` token, taken 2026-10-07 on
`chore/tokenisation-master-merge-upstream-tokens` (after the context-selector focus ring moved to
`--ds-color-focus-base-default`). Companion to `TOKENISATION_STATUS.md`, which tracks per-component
status; this file is the flat list of what is left in the source.

**Scope of the scan:** `packages/components/*/src`, `.ts` / `.tsx` / `.less`, excluding specs, stories,
`*.figma.tsx` (Code Connect examples), `defaultAvatars/` and comment lines. Line based, so a multi-line
expression is counted per line. Matches: `palette`, `hexToRgba` / `hexToRgbValues`, `#hex`, `rgb(a)(`,
legacy `theme.variable(s)`.

Recipe to re-run (rough, the list below is curated from it):

```bash
git grep -nE "palette|hexToRgba|hexToRgbValues|rgba?\(|(^|[^&\w/-])#[0-9a-fA-F]{3,8}\b|theme\.variables?\b" \
  -- 'packages/components/*/src' ':!*__specs__*' ':!*stories*' ':!*.figma.*' ':!*defaultAvatars*'
```

## Summary

| Category | Lines | Where it matters |
|---|---:|---|
| 1. Static colour in styling code | 8 | tokenise or ask upstream — section 1 |
| 2. Dynamic `theme.palette[...]` lookups | ~25 | runtime colour props — section 2 |
| 3. `rgba(…, 0)` gradient fade stops | 0 | **done** (all 17 now `transparent`) — section 3 |
| 4. Legacy `theme.variable(s)` (not colours) | 17 | z-index and border-radius, not colour tokens — section 4 |
| 5. Intentional literals (artwork, theme source) | ~1,400 | `icon`, `flag`, `core` — section 5 |
| Storybook stories (not shipped) | 39 in 15 files | out of scope here |

## 1. Static colours still in styling code

| Package | Location | Value | Why it is left / next step |
|---|---|---|---|
| `avatar` | `Avatar.styles.tsx:207` | `background-color: #000` | Opacity-0 hover veil; could be `--ds-color-background-overlay-solid`, check dark mode intent |
| `broadcast-bar` | `BroadcastBar.styles.tsx:59` | `rgba(255, 255, 255, 0.2)` | White-on-solid tint; no translucent-on-solid token. Candidate for a module token |
| `button` | `Button.styles.tsx:389` | `rgba(255, 255, 255, 0.15)` | Split-button divider for primary-like types; the secondary/tertiary branch already uses `--ds-color-border-base-strong`. Needs a divider-on-solid token |
| `button` | `Button.styles.tsx:217`, `:234` | `palette['blue-200']` | Split divider hover/pressed (secondary). **Live code** under `mode="split"`, not dead as the upstream handoff claims. Decision: delete (divider stays grey) or request a token |
| `cascader` | `Cascader.styles.tsx:6`, `:15` | `0 16px 32px 0 rgba(35, 41, 54, 0.05)` | Shadow with alpha 0.05, differs from `--ds-shadows-shadow-2` (0.1). Needs a token or a visual sign-off to use shadow-2 |
| `scrollbar` | `Scrollbar.styles.tsx:41` | `rgba(255, 255, 255, 0.6)` | Light scrim over the track; no light-scrim token |
| `slider` | `Slider.styles.ts:130` | `0 0 0 3px rgba(35, 138, 254, 0.25)` | Active-handle focus ring; needs a translucent focus-ring token (design-tokens follow-up) |
| `banner` | `Banner.const.ts:4-5` | `palette['yellow-600']`, `palette.white` | Dynamic status-Tag defaults, exported constants, resolved at module scope. Move to `--ds-color-*` strings if the consumers accept `var()` |

## 2. Dynamic `theme.palette[...]` lookups

These resolve a colour from a **prop or a runtime key**, so there is no single static token. The agreed
direction is `resolveCustomColor` from `@synerise/ds-utils` (as button and file-uploader do), because
`custom-color` is the categorical palette.

| Package | Location | What |
|---|---|---|
| `button` | `Button.variants.ts` (~25 lines: 108, 207-208, 262-263, 318-319, 373-374, 428-429, 455, 480, 530, 614-628) and `Button.styles.tsx:172` | `getVariantStyles(type, theme.palette)` builds hover/pressed colours with `hexToRgbValues(p['…'])` at 0.2-0.4 alpha plus an `rgba(255, 90, 77, 0.2)` shadow. Needs per-variant translucent module tokens (none named upstream) |
| `card-tabs` | `CardTab.styles.ts:149,169,184,192,202,210,285,314,321,403` | `customColorOr(color, theme.palette[color])` and `theme.palette[getLighterColor(color)]`: the per-tab `color` prop fallback. Active colour already comes from the `ordered` set; this is the legacy named-colour path |
| `dropdown` | `components/TextTrigger/TextTrigger.tsx:27` | `theme.palette[inactiveColor]`, a consumer-supplied key |
| `factors` | `FactorValue/Array/Array.tsx:60` | `theme.palette['grey-600']`, default colour of the count pill |
| `table-new` | `components/TreeTable/TreeTable.styles.ts:31,37,61` | palette passed in as the last-resort fallback of `levelBarColor` after `resolveCustomColor` |
| `icon` | `Icon.styles.ts:41-42` | `theme.palette[DEFAULT_COLOR_TOKEN]` (`grey-800`) for large/xlarge default. Gap: no semantic icon token for grey-800 (icon family stops at `icon-base-default`, grey-600) |
| `utils` | `selectColorByLetter/selectColorByLetter.ts:14,19,28` | `theme.palette[colorString]` for letter-based avatar colours |
| `utils` | `hexToRgba/hexToRgba.ts` (+ export in `index.ts:5`) | The helper itself. Retire once the last `hexToRgba` consumer is gone (only `button` variants and downstream apps) |
| `core` | `js/DSProvider/ThemeProvider/theme.ts:13,83` | The `theme.palette` object itself (`vars.colors`), the source for every lookup above. Removed only when all of the above are |

## 3. `rgba(…, 0)` gradient fade stops — done

All 17 fully transparent gradient ends (`rgba(255, 255, 255, 0)` and `rgba(0, 0, 0, 0)`) were replaced with
`transparent` on 2026-10-07, so a fade no longer carries a hard-coded white or black stop on dark surfaces.
Touched: `card-tabs` (`CardTab.styles.ts`), `collector`, `inline-edit` (`InlineEdit` and `InlineSelect`),
`manageable-list` (`Item.styles.ts`), `section-message`, `tags` (`AddTags.styles.ts`), `toast`.

## 4. Legacy `theme.variable(s)` (not colours)

Remaining reads of the old Less-derived theme variables. None is a colour, so none has a `--ds-*`
colour token; listed so they do not hide in the palette count.

- **z-index (`zindex-modal` / `-dropdown` / `-tooltip` / `-popconfirm`):** `code-area` (`CodeArea.styles.ts:97`), `drawer` (`Drawer.styles.tsx:64`), `modal` (`ModalContent.styles.ts:134`), `popconfirm` (`Popconfirm.tsx:109`), `popover` (`PopoverArrow.tsx:32`, `PopoverContent.tsx:156`), `tabs` (`Tabs.tsx:26`), `tag` (`Tag.tsx:119`), `tags` (`LimitedTags.tsx:40`), `tooltip` (`Tooltip.tsx:155`), `tray` (`Tray.styles.ts:29`), `information-card` (`InformationCardTooltip.tsx:33`), `core` (`overlayZIndex.tsx:54,64`)
- **`@border-radius-base`:** `card` (`Card.styles.ts:58`), `card-select` (`CardSelect.styles.ts:156`), `slider` (`AllocationMarks.styles.ts:27`)

## 5. Intentional literals

- **`icon` (798 lines) and `flag` (254 lines):** hex values inside SVG artwork. Icons are recoloured through `currentColor` / the `color` prop; flags are fixed national colours. Not tokenised by design.
- **`core` `js/DSProvider/ThemeProvider/variables.ts` (217) and `style/colors.less` (121):** the primitive palette definitions that feed `theme.palette`, `build/vars.js` and the Less functions. They stay hex until the palette is retired.
- **`core` Less (`config.less`, `antd-legacy.less`, `reset.less`):** ~15 literal colours and shadows. `antd-legacy.less` is now deletable (menu, alert and table are retired on master); `config.less` shrinks with it. `reset.less` carries `@mark-bg` and the tap-highlight transparent.
- **`color-picker`** `ColorPicker.tsx:32`: `DEFAULT_COLOR = '#ffffff'`, the picker's default **value** (user data), not styling.
- **`code-area`** `constants.ts:24`: `TRANSPARENT = '#00000000'`, a Monaco theme constant (Monaco cannot take CSS variables).

## Suggested order

1. 1:1 candidates that only need an existing token mapped: `avatar` veil, `banner` constants, `factors` pill default.
2. Ask design-tokens for: split-divider-on-solid, translucent focus ring (slider), scrim (scrollbar), shadow 0.05 (cascader), `broadcast-bar` tint, per-variant button translucent states, a grey-800 icon default.
3. Then retire `hexToRgba`, `theme.palette` and the `antd-legacy.less` leftovers.
