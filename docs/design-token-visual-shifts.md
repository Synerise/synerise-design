# Design-token visual shifts

A **shift** is a tokenised value that renders differently from `master`. Most of the tokenisation maps
an old palette value onto a token with exactly the same value; a shift is where no such token existed,
or where the role-correct token has a different value, and the new value was accepted instead of
inventing a token to preserve the old one.

Every shift below was accepted as part of the tokenisation work. Each one appears as a Chromatic diff
on the stories that render it, so a diff that matches an entry here is expected, not a regression.

Entries name the styled component (or selector) and property rather than a line number, since lines
move. "Note" is the source and rationale recorded when the shift was made, verbatim; "—" means none was
recorded beyond the values. The consumer-facing summary is in
[migration-design-tokens.md](./migration-design-tokens.md#visual-changes).

Record a new shift here, in its package's section, instead of leaving an inline comment at the site.

## autocomplete

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Autocomplete.styles.ts` | `ClearButton` `:hover` `color` | `--ds-form-icon-color-hover` (lighter) | `--ds-form-icon-color-default` | forms family: field icons no longer lighten on hover |

## badge

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/BadgeWithLabel.styles.ts` | `Label` `color` | grey-600 | `--ds-badge-variant-neutral-text` (grey-500) | per review |

## button

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| tokens | secondary disabled `bg` / `border` / `text` | grey-100 / grey-200 / grey-600 (under the 0.4 opacity) | grey-50 / grey-400 / grey-700 | token value change only (buttons family): reads like production after the 0.4 opacity |
| tokens | tertiary disabled `bg` / `text` | grey-400 @ 15% / grey-600 | grey-400 @ 37.5% / grey-700 | token value change only (buttons family) |
| tokens | tertiary default and focus `text` | grey-600 | grey-700 | token value change only; matches production |

## button-group

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/ButtonGroup.styles.ts` | `Description` `color` | grey-500 | `--ds-color-text-base-muted` (grey-600) | — |

## checkbox

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Checkbox.styles.ts` | `CheckboxText` (label) `color` | grey-700, separate hover/selected | `--ds-form-label-text-color` (grey-800), every state | forms family |
| `src/Checkbox.styles.ts` | `Description` `color` | grey-700 | `--ds-form-description-text-color` (grey-600) | forms family; matches production |
| `src/Checkbox.styles.ts` | `CheckboxLabel` `:hover` `CheckboxInner` | blue border + tick preview | `--ds-form-control-border-hover` (grey-400), no tick | forms family |
| `src/Checkbox.styles.ts` | `CheckboxInner` disabled | grey bg/border/icon | resting look + `--ds-opacity-disabled`; checked + disabled is faded blue | forms family |

## code-snippet

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/CodeTypes/InlineCode/InlineCode.styles.ts` | inline code `color` | `#e31a5d` | `--ds-code-snippet-inlinecode-text` (pink-600 `#ff2f52`) | — |

## collector

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Collector.styles.ts` | `.ds-input-value-wrapper` (value chip) `background` | grey-200 | `--ds-form-chip-bg-default` (grey-100) | form.chip module token |
| `src/Collector.styles.ts` | `DropdownContent` `box-shadow` | α 0.12 | `--ds-dropdown-shadow` (= shadow-2, α 0.10) | marginally lighter |
| `src/Collector.styles.ts` | `NavigationWrapper` (footer) `background` | grey-050 | `--ds-dropdown-footer-bg` (grey-100) | marginally darker |

## color-picker

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/ColorPicker.styles.ts` | `SwatchCreatorButton` (creator "+" glyph) `color` | grey-800 | `--ds-color-icon-base-default` (grey-600) | no icon token at grey-800 |

## date-picker

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Elements/PickerInput/PickerInput.styles.tsx` | `DefaultIconWrapper` (default calendar icon) `color` | grey-400 | `--ds-form-icon-color-default` (grey-600) | — |
| `src/Elements/DayPicker/DayPicker.styles.ts` | `&--outside` `DayText` `color` | `--ds-color-text-base-default` (grey-800) | `--ds-calendar-day-pastfuture-text` (grey-400) | days from the neighbouring months fade again, as on production |

## date-range-picker

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Footer/Footer.styles.ts` | `Container` (footer) `background` | grey-050 | `--ds-dropdown-footer-bg` (grey-100) | aligns to the standard DS dropdown footer |
| `src/RangeFilter/RangeFilter.styles.tsx` | `Footer` (actions bar) `background-color` | grey-050 | `--ds-dropdown-footer-bg` (grey-100) | consistent with the picker Footer |
| `src/RangePickerInput/RangePickerInput.styles.tsx` | `DateValue` (selected date value text) `color` | grey-600 | `--ds-form-field-text-value` (grey-700) | — |

## drawer

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Drawer.styles.tsx` | `DrawerMask` `background-color` | `--ds-color-background-overlay-default` (grey-900 @ 0.5) | `--ds-drawer-mask-color` (grey-800 @ 20% light, black @ 40% dark) | shared modal/drawer mask (token request D3) |

## factors

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/FactorValue/Array/Array.styles.ts`, `src/RelativeDate/RelativeDateDropdown.styles.ts` | ✕ `:hover` `color` | `--ds-color-icon-danger-defaulthover` = red-500 (lighter) | same token, now red-700 (darker) | token value change only (token request D1) |

## format-picker

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/FormatSettings/FormatSettings.styles.ts` | `FormatFooter` `background-color` | grey-050 | `--ds-dropdown-footer-bg` (grey-100) | marginally darker |

## information-card

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/InformationCard.styles.tsx` | `FooterWrapper` `background` | grey-050 | `--ds-dropdown-footer-bg` (base-muted = grey-100) | marginally darker |

## inline-edit

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/InlineSelect/InlineSelect.style.ts` | text/icon `:hover` `color` | blue-500 | `--ds-inline-select-{text,icon}-hover` (blue-700) | token value change only (token request D2) |

## input

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Input.styles.tsx` | `ClearButton` `color` | grey (`text-neutral-default`, `text-base-subtle` on hover) | `--ds-form-clear-icon` (red), also on hover | forms family: ✕ is always red |

## input-number

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/InputNumber.styles.tsx` | `InputNumberRoot` with `$disabled` `background` | grey-050 | `--ds-form-field-bg-disabled` (grey-100) | darker |

## item-picker

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/components/ItemPickerDropdown/ItemPickerDropdown.style.ts` | `DropdownFooter` `background-color` | grey-050 | `--ds-dropdown-footer-bg` (grey-100) | marginally darker |
| `src/components/ItemPickerList/ItemPickerList.styles.ts` | `FooterWrapper` `background-color` | grey-050 | `--ds-dropdown-footer-bg` (grey-100) | marginally darker |

## items-roll

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/ItemsRoll.styles.ts` | `WarningIcon` `color` | yellow-500 | `--ds-color-icon-warning-default` (yellow-600) | no yellow-500 icon token |

## logic

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Matching/Matching.styles.ts` | `Toggle::after` (dashed underline) gap colour | white | `transparent` | UX 2026-07-22 dark-mode fix — show the surface behind |

`Toggle` text colour keeps its values (green / red 600, 700 on hover) but now reads them from the
semantic background family: `--ds-color-background-{success,danger}-solid` and `-solidactive`
("UX 2026-07-22"). A `background-*` token driving text colour is a token-category mismatch, "flagged by
UX for later review".

## modal

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Elements/ModalContent/ModalContent.styles.ts` | `ModalMask` | `--ds-modal-mask-color` + `opacity: --ds-opacity-muted` | `--ds-modal-mask-color` with alpha in the colour (black @ 40% in dark) | dark mask darkens instead of lightening (token request D3) |

## panels-resizer

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Resizer/Resizer.styles.tsx` | `Handler` (grip bar) `background-color` | grey-200 | `--ds-color-background-base-muted` (grey-100) | lighter; per UX 2026-07-21 |

## popconfirm

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| tokens | `--ds-popconfirm-content-description` | grey-700 | grey-800 | token value change only (layers family); matches production |

## radio

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Radio.styles.tsx` | `RadioText` (label) `color` | grey-700, separate selected | `--ds-form-label-text-color` (grey-800) | forms family |
| `src/Radio.styles.tsx` | `Description` `color` | grey-700 | `--ds-form-description-text-color` (grey-600) | forms family |
| `src/Radio.styles.tsx` | `RadioInner` disabled | grey bg, grey dot | resting look + `--ds-opacity-disabled`; checked + disabled is faded blue | forms family |
| `src/Radio.styles.tsx` | `RadioButtonLabel` unselected | grey-700 text, grey hover bg | `--ds-buttons-variant-secondary-*` (grey-600 text; blue-50 bg, blue border and text on hover) | forms family: radio buttons follow Button Toggle |

## rich-text

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/RichText.styles.ts` | `popoverSurface` (shared popover surface) `box-shadow` | `rgba(0,0,0,0.12)` | `--ds-shadows-shadow-1` (`#2329360a`) | lighter |

## search

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Search.styles.tsx` | `SearchNativeInput:disabled` `background-color` | grey-050 | `--ds-form-field-bg-disabled` (grey-100) | aligns to form standard |

## search-bar

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/SearchBar.styles.tsx` | `ClearInputWrapper` `color` at rest | `--ds-search-bar-clear-default` (grey) | `--ds-form-clear-icon` (red) | forms family: ✕ is always red |

## section-message

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/SectionMessage.styles.tsx` | `AlertMessage` `color` (neutral) | grey-600 | `--ds-message-text-title` (grey-800) | messages family |
| tokens | `--ds-section-message-variant-warning-borderTop` | yellow-500 | yellow-600 | token value change only; matches production |

## skeleton

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Skeleton.styles.ts` | `BackgroundGradient` shimmer end stop | `#9c9d9d` | `--ds-skeleton-gradient` end stop (grey-300) | lighter; start/mid stops ~exact |
| `src/Skeleton.styles.ts`, pulse keyframes | `--ds-skeleton-pulse-opacity-max` | 0.3 (`CheckboxSkeleton`, `DropdownSkeleton`) | 0.4 | one pulse for every skeleton (token request D4) |

## step-card

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/StepCard.styles.ts` | `Footer` `background-color` | `rgba(grey-50, 0.6)` (translucent) | `--ds-color-background-base-subtle` (solid grey-50) | per UX 2026-07-21 |

## tabs

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Tab/Tab.styles.ts` | `TabContainer:focus` label and icon `color` | blue-500 | `--ds-color-focus-base-default` (blue-600) | darker. The only exact-value token is a background token; this is the role-correct one |

## tag

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Tag.styles.ts` | `TagShape.STATUS_SUCCESS` `color` | green-600 | `--ds-status-pill-variant-success-text` (green-700) | status-pill success = text-success-default |
| `src/Tag.styles.ts` | `TagShape.STATUS_WARNING` `color` | yellow-600 | `--ds-status-pill-variant-warning-text` (yellow-700) | status-pill warning = text-warning-default |
| `src/Tag.styles.ts` | `getColorText` on a grey-200 `color` | white (the grey-200 check missed the token value) | `--ds-color-text-base-muted` (grey-600) | bug fix; matches production (tags family) |

## toast

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Toast.styles.ts` | `AlertDescription` `color` (success) | grey-700 | `--ds-message-text-description` (grey-600) | messages family |

## tray

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/Tray.styles.ts` | `TrayHeader` `border-bottom` | grey-200 | `--ds-modal-header-border-color` (grey-100) | reuses modal header border; lighter |

## typography

| File | Selector / property | Before | After | Note |
| --- | --- | --- | --- | --- |
| `src/style/macro-utils.ts` | `link` macro `&:hover` `color` | blue-500 | `--ds-color-text-brand-defaulthover` (blue-700) | darker; per UX 2026-07-21 |

## Token-name mismatches without a visual shift

Not shifts: the value is exact, but the token's name does not match how it is used. Listed so a reader
does not "fix" the name and introduce a real shift.

| Package | File | Selector / property | Token | Note |
| --- | --- | --- | --- | --- |
| layout | `src/Layout.styles.ts` | `SidebarButton` `background-color` | `--ds-color-background-base-stronghover` | a "hover" token used at the resting state (exact grey-500, no visual shift) |
| layout | `src/Layout.styles.ts` | `SidebarButton` when `opened`, below `medium`, `background-color` | `--ds-color-background-neutral-solidhover` | hover token at rest (exact grey-600) |
| logic | `src/Matching/Matching.styles.ts` | `Toggle` text `color` | `--ds-color-background-{success,danger}-solid(active)` | see [logic](#logic) |
