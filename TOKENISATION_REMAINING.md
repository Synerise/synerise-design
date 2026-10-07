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
| 1. Static colour in styling code | 3 | tokenise or ask upstream — section 1 |
| 2. Dynamic `theme.palette[...]` lookups | ~25 | runtime colour props — section 2 |
| 3. Legacy `theme.variable(s)` (not colours) | 17 | z-index and border-radius, not colour tokens — section 3 |
| 4. Intentional literals (artwork, theme source) | ~1,400 | `icon`, `flag`, `core` — section 4 |
| Storybook stories (not shipped) | 39 in 15 files | out of scope here |

## 1. Static colours still in styling code

| Package | Location | Value | Why it is left / next step |
|---|---|---|---|
| `button` | `Button.styles.tsx` (`splitDividerColor`) | `rgba(255, 255, 255, 0.15)` | Split divider for types on a solid fill (primary, danger, success, warning). `*-separator` tokens exist for those variants but equal the hover fills, not a white line; confirm intent (UX note 7) |
| `scrollbar` | `Scrollbar.styles.tsx:41` | `rgba(255, 255, 255, 0.6)` | Light scrim over the track; no light-scrim token |
| `slider` | `Slider.styles.ts:130` | `0 0 0 3px rgba(35, 138, 254, 0.25)` | Active-handle focus ring; needs a translucent focus-ring token (design-tokens follow-up) |

## 2. Dynamic `theme.palette[...]` lookups

These resolve a colour from a **prop or a runtime key**, so there is no single static token. The agreed
direction is `resolveCustomColor` from `@synerise/ds-utils` (as button and file-uploader do), because
`custom-color` is the categorical palette.

| Package | Location | What |
|---|---|---|
| `button` | `Button.variants.ts:194,300,354` and `Button.styles.tsx:172` | The tertiary, ghost-secondary and ghost-primary ripples: `rgba(hexToRgbValues(p['grey-400']), rippleAlpha(0.25, 0.35))`, i.e. grey-400 at 0.133. No token carries that alpha; needs `--ds-buttons-variant-{tertiary,ghost-secondary,ghost-primary}-ripple` upstream. |
| `card-tabs` | `CardTab.styles.ts:149,169,184,192,202,210,285,314,321,403` | `customColorOr(color, theme.palette[color])` and `theme.palette[getLighterColor(color)]`: the per-tab `color` prop fallback. Active colour already comes from the `ordered` set; this is the legacy named-colour path |
| `table-new` | `components/TreeTable/TreeTable.styles.ts:31,37,61` | palette passed in as the last-resort fallback of `levelBarColor` after `resolveCustomColor` |
| `icon` | `Icon.styles.ts:41-42` | `theme.palette[DEFAULT_COLOR_TOKEN]` (`grey-800`) for large/xlarge default. Gap: no semantic icon token for grey-800 (icon family stops at `icon-base-default`, grey-600) |
| `utils` | `hexToRgba/hexToRgba.ts` (+ export in `index.ts:5`) | The helper itself. Retire once the last `hexToRgba` consumer is gone (only `button` variants and downstream apps) |
| `core` | `js/DSProvider/ThemeProvider/theme.ts:13,83` | The `theme.palette` object itself (`vars.colors`), the source for every lookup above. Removed only when all of the above are |

## 3. Legacy `theme.variable(s)` (not colours)

Remaining reads of the old Less-derived theme variables. None is a colour, so none has a `--ds-*`
colour token; listed so they do not hide in the palette count.

- **z-index (`zindex-modal` / `-dropdown` / `-tooltip` / `-popconfirm`):** `code-area` (`CodeArea.styles.ts:97`), `drawer` (`Drawer.styles.tsx:64`), `modal` (`ModalContent.styles.ts:134`), `popconfirm` (`Popconfirm.tsx:109`), `popover` (`PopoverArrow.tsx:32`, `PopoverContent.tsx:156`), `tabs` (`Tabs.tsx:26`), `tag` (`Tag.tsx:119`), `tags` (`LimitedTags.tsx:40`), `tooltip` (`Tooltip.tsx:155`), `tray` (`Tray.styles.ts:29`), `information-card` (`InformationCardTooltip.tsx:33`), `core` (`overlayZIndex.tsx:54,64`)
- **`@border-radius-base`:** `card` (`Card.styles.ts:58`), `card-select` (`CardSelect.styles.ts:156`), `slider` (`AllocationMarks.styles.ts:27`)

## 4. Intentional literals

- **`icon` (798 lines) and `flag` (254 lines):** hex values inside SVG artwork. Icons are recoloured through `currentColor` / the `color` prop; flags are fixed national colours. Not tokenised by design.
- **`core` `js/DSProvider/ThemeProvider/variables.ts` (217) and `style/colors.less` (121):** the primitive palette definitions that feed `theme.palette`, `build/vars.js` and the Less functions. They stay hex until the palette is retired.
- **`core` Less (`config.less`, `antd-legacy.less`, `reset.less`):** ~15 literal colours and shadows. `antd-legacy.less` is now deletable (menu, alert and table are retired on master); `config.less` shrinks with it. `reset.less` carries `@mark-bg` and the tap-highlight transparent.
- **`color-picker`** `ColorPicker.tsx:32`: `DEFAULT_COLOR = '#ffffff'`, the picker's default **value** (user data), not styling.
- **`code-area`** `constants.ts:24`: `TRANSPARENT = '#00000000'`, a Monaco theme constant (Monaco cannot take CSS variables).

## Suggested order

1. Ask design-tokens for: grey-400 ripple tokens for tertiary / ghost variants (and a fix for the inverted danger hover/pressed tokens), split-divider-on-solid, translucent focus ring (slider), loading scrim (scrollbar), a grey-800 icon default (see note 6).
2. Then retire `hexToRgba`, `theme.palette` and the `antd-legacy.less` leftovers.

## Notes for UX / design-tokens (button variants, 2026-10-07)

1. **Danger hover/pressed tokens look inverted.** `--ds-buttons-variant-primary-danger-bg-hover` is #cf1413 (darker red) and
   `-bg-active` is #f52922, identical to the default. Primary, success and warning go lighter on hover and darker on press.
   Code now consumes the tokens as delivered, so light-mode danger buttons change: hover red-500 (#ff5a4d) becomes #cf1413,
   pressed red-700 (#cf1413) becomes #f52922 (no pressed feedback against default). Please confirm the intent or swap the
   two values (hover = red-500, active = red-700, as before).
2. **Disabled primary, danger and success** now dim the whole button (solid disabled token plus 0.4 element opacity), as
   secondary/tertiary/ghost/warning already did. The background looks the same; the white label is now also at 40% (it was solid
   white on a 40% fill). Confirm this is the desired disabled look.
3. **Success focus ring** moved from blue-700 to blue-600 (`--ds-buttons-variant-primary-success-border-focus`), matching the
   danger and warning rings.
4. **Ripple tokens wanted** for tertiary, ghost-secondary and ghost-primary: grey-400 at 13.3% (the press ripple composited over the
   25% hover reaches the 35% pressed fill). Until they exist these three stay on `theme.palette`.
5. **Removed:** the danger hover outer shadow (`0 2px 4px rgba(255,90,77,.2)`). It never rendered because the button's
   `-webkit-mask-image` clips outer shadows to the border box, so there is no visual change. If design wants a danger hover
   elevation it needs a different mechanism than `box-shadow` on the button.
6. **Large / extra-large icon default colour (grey-800) has no token.** `Icon.styles.ts` gives the large and xlarge icon sets a
   darker default than the M set (`DEFAULT_COLOR_TOKEN = 'grey-800'`), but the semantic icon family tops out at
   `--ds-color-icon-base-default` (grey-600). Needs a strong/emphasis default icon token (e.g. `icon.base.strong`); until then
   this stays a `theme.palette` lookup in `icon`.
7. **Split button divider.**
   - Secondary: the divider now matches the button's own border per state. Rest uses `--ds-buttons-variant-secondary-separator`
     (same value as the border), hover uses `--ds-buttons-variant-secondary-border-hover` (#8bcaff), pressed uses
     `--ds-color-border-brand-strong` (#8bcaff). Hover and pressed were blue-200 (#bce1ff), so they shift one step to blue-300.
     Pressed uses the semantic token because `--ds-buttons-variant-secondary-border-active` is transparent, while the pressed
     ring itself is brand-strong. Confirm the divider should stay visible when pressed.
   - Tertiary: divider stays `--ds-color-border-base-strong` (#dbe0e3); `--ds-buttons-variant-tertiary-separator` is #e9edee.
     Confirm which is intended.
   - Types on a solid fill (primary, danger, success, warning): the divider is white at 15%. `--ds-buttons-variant-primary-separator`
     (#238afe), `-danger-` (#cf1413), `-success-` (#76dc25) and `-warning-` (#ffc300) exist but are the hover fills, which would be
     a different look. Confirm whether the white line stays or the tokens are the intended divider.
8. **Scrollbar loading veil.** `Scrollbar.styles.tsx` covers the content with `rgba(255, 255, 255, 0.6)` while loading. There is no
   light-scrim / loading-overlay token; it would also need a dark-mode counterpart.
9. **Slider active-handle focus ring.** `Slider.styles.ts:130` draws `0 0 0 3px rgba(35, 138, 254, 0.25)` (blue-500 at 25%) around the
   dragged handle. Needs a translucent focus-ring token. (The scrollbar has no such ring; if a scrollbar focus ring was meant, it is not
   in the source today.)
10. **FYI, applied without a token request:**
    - Cascader: the elevation moved from the input and results wrappers to the outer `.ds-cascader` element and uses
      `--ds-shadows-shadow-2`. Light-mode alpha goes from 0.05 to 0.10, so the shadow is stronger.
    - Broadcast bar: the button wrapper no longer has its translucent white background or 3px radius.
    - Factors count pill: default colour is `--ds-color-background-neutral-solid` (grey-700) instead of grey-600, the neutral counterpart of the
      danger-solid error pill. One shade darker in light mode.
    - Avatar hover/press veil uses `--ds-color-background-overlay-solid` instead of black, so it lightens instead of darkening in dark mode.
