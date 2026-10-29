# Remaining palette / hex / rgba usage — `packages/components`

Snapshot of every colour that is **not** yet a `var(--ds-*)` token, taken 2026-10-12 on
`chore/tokenisation-mr19-token-followups`. Companion to `tokenisation-status.md`, which tracks per-component
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

Nothing in component styling reads `theme.palette`, `hexToRgba` or a literal colour any more (2026-10-12, after
design-tokens@c7d5afd2 delivered the ripple, icon, scrollbar, slider and separator tokens). What is left:

| Category | Lines | Where it matters |
|---|---:|---|
| 1. `theme.palette` object and the `hexToRgba` helper | 2 definitions | retire with a deprecation window — section 1 |
| 2. Legacy `theme.variable(s)` (not colours) | 17 | z-index and border-radius, not colour tokens — section 2 |
| 3. Intentional literals (artwork, theme source) | ~1,400 | `icon`, `flag`, `core` — section 3 |
| Storybook stories (not shipped) | 39 in 15 files | out of scope here |

## 1. `theme.palette` and `hexToRgba`

No in-repo consumer is left; both survive only as public API.

| Package | Location | What |
|---|---|---|
| `utils` | `hexToRgba/hexToRgba.ts` (+ export in `index.ts:5`) | Public helper. In this repo only the `core` Less comment mentions it. Downstream still calls it: 2 lines in `portal-ui-bridge`, 3 in `portal-next`, 2 in `react-internal` |
| `core` | `js/DSProvider/ThemeProvider/theme.ts:13,83` | The `theme.palette` object itself (`vars.colors`), also the last-resort lookup for chart slots in `theme.ts:67`. Downstream usage is large: about 2,800 lines in 1,340 files in `portal-ui-bridge`, 155 in `portal-next`, 72 in `react-internal`, 32 in `universal-list` |

Removing either is a breaking change for those repos. Suggested path: mark both deprecated (dev warning on
`theme.palette` access, `@deprecated` on `hexToRgba`), migrate the consumers through the sync workflow, then delete.
The `palette` array exported from `utils/selectColorByLetter.ts:15` is unrelated: it is only the custom-colour family list (a name clash).

## 2. Legacy `theme.variable(s)` (not colours)

Remaining reads of the old Less-derived theme variables. None is a colour, so none has a `--ds-*`
colour token; listed so they do not hide in the palette count.

- **z-index (`zindex-modal` / `-dropdown` / `-tooltip` / `-popconfirm`):** `code-area` (`CodeArea.styles.ts:97`), `drawer` (`Drawer.styles.tsx:64`), `modal` (`ModalContent.styles.ts:134`), `popconfirm` (`Popconfirm.tsx:109`), `popover` (`PopoverArrow.tsx:32`, `PopoverContent.tsx:156`), `tabs` (`Tabs.tsx:26`), `tag` (`Tag.tsx:119`), `tags` (`LimitedTags.tsx:40`), `tooltip` (`Tooltip.tsx:155`), `tray` (`Tray.styles.ts:29`), `information-card` (`InformationCardTooltip.tsx:33`), `core` (`overlayZIndex.tsx:54,64`)
- **`@border-radius-base`:** `card` (`Card.styles.ts:58`), `card-select` (`CardSelect.styles.ts:156`), `slider` (`AllocationMarks.styles.ts:27`)

## 3. Intentional literals

- **`icon` (798 lines) and `flag` (254 lines):** hex values inside SVG artwork. Icons are recoloured through `currentColor` / the `color` prop; flags are fixed national colours. Not tokenised by design.
- **`core` `js/DSProvider/ThemeProvider/variables.ts` (217) and `style/colors.less` (121):** the primitive palette definitions that feed `theme.palette`, `build/vars.js` and the Less functions. They stay hex until the palette is retired.
- **`core` Less (`config.less`, `antd-legacy.less`, `reset.less`):** ~15 literal colours and shadows. `antd-legacy.less` is now deletable (menu, alert and table are retired on master); `config.less` shrinks with it. `reset.less` carries `@mark-bg` and the tap-highlight transparent.
- **`color-picker`** `ColorPicker.tsx:32`: `DEFAULT_COLOR = '#ffffff'`, the picker's default **value** (user data), not styling.
- **`code-area`** `constants.ts:24`: `TRANSPARENT = '#00000000'`, a Monaco theme constant (Monaco cannot take CSS variables).

## 4. Hardcoded opacities

Scan of 2026-10-21 on `chore/tokenisation` @ 984e463ba8: every numeric `opacity` in `packages/components/*/src`
`.ts` / `.tsx` other than `0` / `1`, excluding specs, stories and comments. Opacity tokens available today:
`--ds-opacity-disabled` 0.4, `--ds-opacity-muted` 0.2, `--ds-skeleton-pulse-opacity-min` 0.1 / `-max` 0.3, and
the per-component `*-disabled-opacity` 0.4 set.

### Value matches an existing token

Swapped on `fix/tokenisation-review-leftovers`: inline-edit and list disabled (`--ds-opacity-disabled`),
the scrollbar loading veil and resting track (`--ds-opacity-muted`), and the skeleton pulse start and end
(`--ds-skeleton-pulse-opacity-min`). No visual change.

### No token for the value

Needs a token upstream or a design decision (requested on the Design Token Requests page). The card's
extra 0.16 on disabled header content was dropped on `fix/tokenisation-review-leftovers`.

| Package | Location | Value | Use | Note |
|---|---|---:|---|---|
| `avatar` | `Avatar.styles.tsx:238` | 0.05 | hover veil (`::before`) | the veil colour is tokenised, its strength is not |
| `avatar` | `Avatar.styles.tsx:248` | 0.1 | pressed veil (`::before`) | as above |
| `rich-text` | `RichText.styles.ts:378` | 0.4 | selected table cell veil over `--ds-color-background-brand-subtle` | same value as `opacity-disabled` but a different meaning; better a translucent brand background token |
| `scrollbar` | `DnDScrollbar/DnDScrollbar.styles.tsx:114` | 0.6 | track on hover / active / focus | pairs with the 0.2 rest value |
| `skeleton` | `Skeleton.styles.ts:19` | 0.4 | pulse keyframes, middle | `--ds-skeleton-pulse-opacity-max` is 0.3: align the code or the token |
| `subtle-form` | `SubtleForm.styles.ts:94` | 0.5 | disabled field | every other disabled control uses 0.4 |
| `tag` | `Tag.styles.ts:122` | 0.8 | remove button | |
| `tag` | `Tag.styles.ts:127` | 0.3 | remove button `::before` (with `filter: brightness(70%)`) | |
| `toast` | `Toast.styles.ts:102` | 0.6 | expand-count text | |

### Left as literals

- `badge` `Badge.styles.tsx:64`, `:75`: 0.9 in the entry animation keyframes. Motion, not a visual state.
- `mocks` `Typography/jest.tsx:101`, `vi.tsx:99`: test doubles, not shipped styling.
- Every `0` / `1` toggle and `transition: opacity …` duration.

## Deferred upstream (design-tokens, 2026-10-20)

Open in the design-tokens handoff for design-tokens@c283299a. Design decides these; no code change is
due until they land as token values.

- **Grey tag in dark:** `tag.variant.gray` background (`base.muted`) sits below the card, so the tag looks sunken.
- **Section Message informative:** the header is grey like the description; every other variant has a dark header.
- **36 module tokens with alpha** (tertiary and ghost button backgrounds among them) do not switch in dark.
  Only semantic alpha tokens flip per theme.
- **`tag.pill` grey:** weak text contrast in both themes.
- **Stepper warning circle:** content at step 700 and border at 600, the mismatch already fixed for status pill
  and the calendar "today" ring.
