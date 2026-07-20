# Token usage by component

> Companion to [`TOKENISATION_STATUS.md`](./TOKENISATION_STATUS.md). Per-component inventory of
> **(a)** remaining direct `theme.palette` usages and **(b)** semantic-token usages
> (`--ds-color-*` / `--ds-shadows-*` / `--ds-opacity-*`), flagging where a semantic token is used even though a
> component-level **module** token exists for that role ("semantic instead of module").
>
> Generated **2026-07-17** (after the component-by-component tokenisation pass). Scope: each package's `src`
> `.ts`/`.tsx`, excluding `__specs__`/`.spec.`/`.test.`/`.figma.`/`.stories.`/`dist`. Palette values that are
> **dynamic** (user-supplied `customColor`/`color`/`iconColor` props) are intentionally kept on `theme.palette`
> and are not defects.
>
> Palette reason tags: **dyn** = dynamic user colour · **decorative** = gradient/ripple/chip/keyframe ·
> **no-token** = no matching token exists (UX follow-up) · **data-uri** = colour baked into a data-URI SVG.
>
> **Per-component semantic-token tables added 2026-07-20** (exact `file:line`, from live grep). Bare numbers
> refer to the package's main styles file; multi-file packages prefix the path relative to `src`. ⚑ marks a
> semantic shadow/opacity used where a module token exists but is pruned/unavailable.

---

## Semantic-instead-of-module (candidates to tighten)

These are the only places a **more specific module token exists** but a semantic token is used:

1. **Shadows** — `app-menu`, `card`, `modal`, `page-header`, `toast` use `--ds-shadows-shadow-{1,2}` because
   their module `*.shadow` tokens (`app-menu.container.shadow`, `card.shadow.*`, `modal.container.shadow`,
   `page-header.container.shadow`, `toast.shadow`) are **pruned** (they reference `shadow.level.*` primitives
   not yet emitted). Switch to the module tokens once those primitives land. (`popconfirm` uses `--ds-shadows-shadow-2`
   with **no** module shadow token — genuinely semantic.)
2. **Opacity** — `card` (`Card/Card.styles.ts:91`) uses `--ds-opacity-disabled` though `--ds-card-disabled-opacity`
   exists; `radio` (`Radio.styles.tsx:240`, segmented button) uses `--ds-opacity-disabled` though
   `--ds-form-radio-disabled-opacity` exists. Both are value-identical (0.4) — tighten for consistency.

Everywhere else, semantic tokens are used because **no module token covers that role** (focus rings, base
surfaces, brand/neutral text, `opacity-muted`, etc.) — consistent with the granularity rule.

---

## Per component

### section-message
- **Palette (4)** — all **dyn** (`customColor`/`customColorIcon` overrides): `SectionMessage.styles.tsx:40,67,72,86`.
- **Semantic (4):** `icon-base-default` (close icon), `icon-brand-default`, `text-base-disabled`, `text-base-subtle` (order cluster). No module token for these roles — ✓ appropriate.

**Remaining semantic tokens** (icons now inherit `currentColor` after dropping the close-icon
`icon-base-default` and order-icon `text-base-subtle`/`icon-brand-default`):

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-text-base-disabled` | 150, 155, 178 | `NumberWrapper` order-number text + the two hover-underline gradient stops (`NumberWrapper:hover`, `OrderWrapper:hover`) |
| `--ds-color-text-base-subtle` | 162, 185, 191 | `NumberWrapper:hover` text, `OrderWrapper:hover` number text, `Wrapper` text |


### toast
- **Palette:** none.
- **Semantic (5):** `text-base-muted` ×4, `icon-base-muted`, `icon-brand-default`, `text-base-disabled`, **`--ds-shadows-shadow-2`** ⚑ (module `toast.shadow` pruned — see flag 1).

**Remaining semantic tokens** (icons now inherit `currentColor` after dropping the action-icon
`icon-base-muted` and order-icon `icon-brand-default`):

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-shadows-shadow-2` | 205 | `Container` box-shadow (elevation) — ⚑ module `toast.shadow` pruned |
| `--ds-color-text-base-muted` | 150, 210, 216, 219 | `Wrapper`; `OrderWrapper`/`ListWrapper`/`NumberWrapper:hover`; `OrderWrapper:hover` number gradient + text |
| `--ds-color-text-base-disabled` | 107 | `NumberWrapper:hover` underline gradient stop |


### app-menu (sprawdzic czy udaloby sie to zbudowac za pomoca list itemów).
- **Palette:** none.
- **Semantic (4):** `border-base-subtle` ×2, `text-brand-default`, `text-neutral-default`, **`--ds-shadows-shadow-1`** ⚑ (module `app-menu.container.shadow` pruned).

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-shadows-shadow-1` | `AppMenu.styles.ts:10` | MenuWrapper (icon rail) box-shadow — ⚑ module `app-menu.container.shadow` pruned |
| `--ds-color-border-base-subtle` | `AppMenu.styles.ts:42`, `SubMenu/SubMenu.styles.ts:12` | ItemsDivider bottom border; SubMenu panel left border |
| `--ds-color-text-neutral-default` | `SubMenu/SubMenu.styles.ts:67` | SubMenu SubTitle text |
| `--ds-color-text-brand-default` | `SubMenu/Item/Item.styles.ts:25` | SubMenu item text (hover/active) |


### avatar
- **Palette (1)** — **dyn** (computed `${color}-${hue}`): `ObjectAvatar/ObjectAvatar.tsx:47`.
- **Semantic (3):** `background-base-default`, `icon-base-subtle` ×2, `text-onsolid-default`. ✓ appropriate.

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-text-onsolid-default` | `Avatar.styles.tsx:155, 174` | Avatar initials/string text on solid bg |
| `--ds-color-icon-base-subtle` | `UserAvatar/UserAvatar.tsx:57, 68` | UserAvatar fallback user icon |


### button
- **Palette (30):**
  - **decorative** (secondary ripple/focus-ring/chip): `blue-100` (164), `blue-300` (171,189), `blue-200` (175,193); split divider `grey-300` (348); Expander focus keyframe `blue-600` (`Expander.styles.tsx:23`).
  - **no-token:** secondary error-focus text `red-600` (181); error hover-bg `red-200` (472,505); `warning` readOnly `yellow-600`/white (302,306) — no `warning` module variant; Creator `blue-500` (36), `grey-500` (48), `rgba(grey-200)` disabled bg (103,107).
  - **dyn** (`custom-color`/`custom-color-ghost`/`iconColor`): `326,531,533,547,557,564,572,581,583,587,602,604,606,613`.
- **Semantic (20):** danger set (`text/border-danger-default`, `background-danger-subtlehover`/`-solidhover`, `text-onsolid-danger`) for the error state; `focus-base-default`; Checkbox/Star sub-comps (`icon-brand/danger/warning-default`, `border-base-default`/`-strong`/`-stronghover`); Creator/ButtonToggle (`background-base-*`, `background-brand-subtle`, `border-brand-*`, `text-base-muted`, `text-brand-default`). ✓ appropriate (no module tokens for these roles).

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-background-danger-subtlehover` | `Button.styles.tsx:465, 483` | error button bg (base + focus-visible) |
| `--ds-color-border-danger-default` | `Button.styles.tsx:466, 473`, `Creator/Creator.styles.tsx:16` | error button inset border; Creator error border |
| `--ds-color-text-danger-default` | `Button.styles.tsx:467, 474, 484, 499` | error button text (base/hover/focus/secondary) |
| `--ds-color-background-danger-solidhover` | `Button.styles.tsx:477, 491, 516, 520` | error button pressed bg + ripple |
| `--ds-color-text-onsolid-danger` | `Button.styles.tsx:479, 517` | error button pressed text |
| `--ds-color-focus-base-default` | `Button.styles.tsx:486, 512` | focus ring (error primary/secondary) |
| `--ds-color-text-base-muted` | `ButtonToggle/ButtonToggle.styles.tsx:14, 20`, `Creator/Creator.styles.tsx:32, 83` | ghost toggle hover text; Creator label/icon text |
| `--ds-color-background-brand-subtle` | `ButtonToggle/ButtonToggle.styles.tsx:27`, `Creator/Creator.styles.tsx:31, 35, 40` | activated ghost toggle bg; Creator upload bg |
| `--ds-color-text-brand-default` | `ButtonToggle/ButtonToggle.styles.tsx:28` | activated ghost toggle text |
| `--ds-color-background-danger-subtle` | `Creator/Creator.styles.tsx:17` | Creator error bg |
| `--ds-color-background-base-default` | `Creator/Creator.styles.tsx:20, 24`, `Checkbox/Checkbox.styles.ts:43`, `Star/Star.styles.ts:47` | Creator error focus/hover bg; checkbox/star icon bg (default+hover) |
| `--ds-color-border-base-stronghover` | `Creator/Creator.styles.tsx:23, 101, 110` | Creator hover / focus-active border |
| `--ds-color-border-brand-strong` | `Creator/Creator.styles.tsx:30, 34` | Creator upload border (base+hover) |
| `--ds-color-border-brand-default` | `Creator/Creator.styles.tsx:39, 44, 115` | Creator focus-visible border (upload + default) |
| `--ds-color-border-base-strong` | `Creator/Creator.styles.tsx:81, 119`, `Checkbox/Checkbox.styles.ts:14`, `Star/Star.styles.ts:12` | Creator default/disabled border; checkbox/star unchecked icon |
| `--ds-color-background-base-subtle` | `Creator/Creator.styles.tsx:112, 120`, `Checkbox/Checkbox.styles.ts:48`, `Star/Star.styles.ts:41` | Creator focus-active/disabled bg; checkbox/star disabled icon bg |
| `--ds-color-icon-danger-default` | `Checkbox/Checkbox.styles.ts:9`, `Star/Star.styles.ts:7` | checkbox/star error icon |
| `--ds-color-icon-brand-default` | `Checkbox/Checkbox.styles.ts:13, 24`, `Star/Star.styles.ts:22` | checkbox/star checked + hover icon |
| `--ds-color-border-base-default` | `Checkbox/Checkbox.styles.ts:19`, `Star/Star.styles.ts:17` | checkbox/star disabled icon colour |
| `--ds-color-icon-warning-default` | `Star/Star.styles.ts:11` | active (favourite) star icon |


### card
- **Palette:** none.
- **Semantic (12):** CardBadge (`background-success/warning/danger-solid`, `text-onsolid-default`, `icon-base-muted`, `border-base-stronghover`); Card surface (`background-base-subtle`, `border-base-default`/`-subtle`, `text-base-muted`); **`--ds-opacity-disabled`** ⚑ (`Card.styles.ts:91` — `--ds-card-disabled-opacity` exists, see flag 2); **`--ds-shadows-shadow-1`** ⚑ (module `card.shadow.default` pruned).

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-background-base-subtle` | `Card/Card.styles.ts:18` | grey card background |
| `--ds-shadows-shadow-1` | `Card/Card.styles.ts:25` | card box-shadow — ⚑ module `card.shadow.default` pruned |
| `--ds-color-border-base-default` | `Card/Card.styles.ts:28, 196` | outline card inset border; compact-header description left divider |
| `--ds-opacity-disabled` | `Card/Card.styles.ts:91` | disabled card `IconContainer` opacity — ⚑ `--ds-card-disabled-opacity` exists |
| `--ds-color-border-base-subtle` | `Card/Card.styles.ts:123, 223` | header bottom border; footer top border |
| `--ds-color-text-base-muted` | `Card/Card.styles.ts:161` | card description text |
| `--ds-color-background-success-solid` | `CardBadge/CardBadge.styles.tsx:6` | CardBadge success bg |
| `--ds-color-background-warning-solid` | `CardBadge/CardBadge.styles.tsx:7` | CardBadge warning bg |
| `--ds-color-background-danger-solid` | `CardBadge/CardBadge.styles.tsx:8` | CardBadge error bg |
| `--ds-color-text-onsolid-default` | `CardBadge/CardBadge.styles.tsx:14, 15, 16` | CardBadge success/warning/error icon |
| `--ds-color-icon-base-muted` | `CardBadge/CardBadge.styles.tsx:17, 18` | CardBadge default/checked icon |
| `--ds-color-border-base-stronghover` | `CardBadge/CardBadge.styles.tsx:23` | CardBadge default-status inset ring |


### card-select
- **Palette:** none.
- **Semantic (3):** `background-base-subtle`, `border-danger-default`, `icon-base-muted` (documented fallbacks — no module token for these). ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-border-danger-default` | `CardSelect.styles.ts:159` | error card 2px outline box-shadow |
| `--ds-color-background-base-subtle` | `CardSelect.styles.ts:285` | disabled RadioShape bg |
| `--ds-color-icon-base-muted` | `CardSelect.tsx:128` | info tooltip (`InfoFillS`) icon |

### description
- **Palette:** none.
- **Semantic (4):** `border-base-strong` (inactive star), `icon-base-default`, `icon-warning-default` (active star), `text-brand-default`. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-icon-base-default` | `Row/DescriptionRow.styles.ts:49` | Copyable icon default |
| `--ds-color-text-brand-default` | `Row/DescriptionRow.styles.ts:51, 92` | Copyable hover; row link hover |
| `--ds-color-icon-warning-default` | `Row/Star.tsx:13` | active (favourite) star icon |
| `--ds-color-border-base-strong` | `Row/Star.tsx:18` | inactive star icon |


### form
- **Palette:** none.
- **Semantic (1):** `icon-brand-default` (add-row icon). ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-icon-brand-default` | `EditableList/EditableList.tsx:141` | Add-row "+" icon |


### input
- **Palette:** none (field surface now `--ds-form-field-*`).
- **Semantic (12):** InputMultivalue (`background-base-muted`/`-mutedhover`, `border-base-default`, `icon-danger-default`); labels/counter/chips (`text-base-default`/`-muted`/`-subtle`, `text-danger-default`, `text-neutral-default`, `icon-brand-default`); `opacity-disabled` (no module opacity token). ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-opacity-disabled` | `Input.styles.tsx:120` | disabled inner action-icon opacity |
| `--ds-color-icon-brand-default` | `Input.styles.tsx:144` | action-icon hover |
| `--ds-color-text-neutral-default` | `Input.styles.tsx:301, 395` | clear-button text; counter text |
| `--ds-color-text-base-subtle` | `Input.styles.tsx:304` | clear-button hover text |
| `--ds-color-text-danger-default` | `Input.styles.tsx:381`, `InputMultivalue/InputMultivalue.styles.tsx:58` | error text |
| `--ds-color-text-base-default` | `Input.styles.tsx:386`, `InputMultivalue/InputMultivalue.styles.tsx:63, 150` | label text; multivalue chip hover text |
| `--ds-color-text-base-muted` | `Input.styles.tsx:399`, `InputMultivalue/InputMultivalue.styles.tsx:41, 70` | description text; multivalue disabled text |
| `--ds-color-background-base-subtle` | `Textarea/Textarea.styles.ts:26`, `InputMultivalue/InputMultivalue.styles.tsx:42` | readOnly textarea bg; multivalue disabled bg |
| `--ds-color-border-base-default` | `InputMultivalue/InputMultivalue.styles.tsx:47` | multivalue wrapper hover border |
| `--ds-color-icon-danger-default` | `InputMultivalue/InputMultivalue.styles.tsx:83` | chip remove-icon |
| `--ds-color-background-base-mutedhover` | `InputMultivalue/InputMultivalue.styles.tsx:118, 149` | chip disabled bg; chip hover bg |
| `--ds-color-background-base-muted` | `InputMultivalue/InputMultivalue.styles.tsx:119` | chip default bg |


### checkbox
- **Palette (1)** — **no-token:** `blue-500` indeterminate-hover bg (`Checkbox.styles.ts:199`).
- **Semantic (4):** `background-base-default` (indeterminate bar), `icon-base-muted` (disabled tick), `icon-brand-default` (hover-preview), `text-onsolid-default` (tick). Box/label states use `--ds-form-checkbox-*`. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-text-onsolid-default` | 72 | checked tick colour (currentColor → SVG) |
| `--ds-color-background-base-default` | 97 | indeterminate bar (`::after`) fill |
| `--ds-color-icon-base-muted` | 126 | disabled+checked tick |
| `--ds-color-icon-brand-default` | 186 | hover-preview tick (unchecked box) |


### radio
- **Palette (3)** — **no-token:** `blue-500` solid-button hover (`Radio.styles.tsx:261–263`).
- **Semantic (12):** segmented button + focus/disabled (`background-base-*`, `background-brand-solid`/`-subtle`, `border-base-*`, `border-brand-default`, `focus-base-default`, `text-base-subtle`, `text-brand-default`, `text-onsolid-default`); **`--ds-opacity-disabled`** ⚑ (`:240` — `--ds-form-radio-disabled-opacity` exists, see flag 2). Radio-dot states use `--ds-form-radio-*`.

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-border-base-default` | 92 | disabled radio-dot border |
| `--ds-color-background-base-subtle` | 93, 197 | disabled radio-dot bg; seg-button default bg |
| `--ds-color-focus-base-default` | 149, 219, 220 | radio focus-ring border; seg-button focus border + inset shadow |
| `--ds-color-background-base-default` | 152, 211 | focused-checked radio centre bg; seg-button hover bg |
| `--ds-color-background-brand-subtle` | 153 | focused-unchecked radio centre bg |
| `--ds-color-text-base-subtle` | 196, 239 | seg-button text (default + disabled) |
| `--ds-color-border-base-strong` | 198, 203 | seg-button border; first-child left border |
| `--ds-color-text-brand-default` | 229 | checked seg-button text |
| `--ds-color-border-brand-default` | 230, 231 | checked seg-button border + connect shadow |
| `--ds-opacity-disabled` | 240 | disabled seg-button opacity — ⚑ `--ds-form-radio-disabled-opacity` exists (used at 118) |
| `--ds-color-text-onsolid-default` | 256 | solid-checked seg-button text |
| `--ds-color-background-brand-solid` | 257, 258 | solid-checked seg-button bg + border |


### switch
- **Palette:** none.
- **Semantic (5):** `focus-base-default` (focus ring), spinner (`background-success-solid`, `border-base-stronghover`), labels (`text-base-muted`, `text-base-subtle`). Track/handle use `--ds-form-switch-*`. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-focus-base-default` | `RawSwitch.styles.ts:55` | toggle focus-visible border |
| `--ds-color-border-base-stronghover` | `RawSwitch.styles.ts:87` | loading spinner ring border |
| `--ds-color-background-success-solid` | `RawSwitch.styles.ts:88` | loading spinner top-border accent |
| `--ds-color-text-base-subtle` | `Switch.styles.ts:25` | label text |
| `--ds-color-text-base-muted` | `Switch.styles.ts:47` | disabled label text |


### select
- **Palette (1)** — **data-uri:** search-icon `grey-400` (`Select.styles.ts:130`). Deferred (mid de-antd; `.less` present).
- **Semantic (2):** `background-base-subtle`, `text-base-muted`. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-text-base-muted` | 147 | readOnly selector text |
| `--ds-color-background-base-subtle` | 182 | `grey` variant selector bg |


### inline-alert
- **Palette:** none.
- **Semantic (1):** `opacity-disabled` (no module opacity token). ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-opacity-disabled` | 51 | disabled wrapper opacity |


### inline-edit
- **Palette (1)** — **no-token:** `:active` icon-wrapper bg `grey-300` (`InlineEdit.styles.ts:83`).
- **Semantic (5):** `background-base-default`, `focus-base-default` + `text-danger-default` (focus/error underlines), `icon-base-muted` (hover dots), `text-base-disabled` (placeholder). Text/icon/bg states use `--ds-inline-edit-*`. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-text-danger-default` | `InlineEdit.styles.ts:24, 31` | error focus-underline; error underline dots |
| `--ds-color-focus-base-default` | `InlineEdit.styles.ts:26` | focus underline (non-error) |
| `--ds-color-icon-base-muted` | `InlineEdit.styles.ts:33` | hover underline dots (non-error) |
| `--ds-color-background-base-default` | `InlineEdit.styles.ts:78`, `InlineSelect/InlineSelect.style.ts:74`, `InlineSelect/SelectDropdown/SelectDropdown.style.ts:20` | edit-icon hover bg; chevron-icon hover bg; dropdown list bg |
| `--ds-color-text-base-disabled` | `InlineEdit.styles.ts:161` | placeholder text (non-error) |


### list-item
- **Palette (1)** — **decorative/interactive:** `blue-600` (`components/Text/Text.styles.tsx:55`).
- **Semantic (6):** `focus-base-default`/`-strong` (focus rings), `background-base-default`, `text-brand-hover`, `text-neutral-default`, `icon-success-default`. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-background-base-default` | `components/Text/Text.styles.tsx:99`, `components/ListWrapper/ListWrapper.styles.ts:5` | item label base bg; list wrapper container bg |
| `--ds-color-text-brand-hover` | `components/Text/Text.styles.tsx:177, 206` | featured item hover text; featured+selected hover text |
| `--ds-color-focus-base-strong` | `components/Text/Text.styles.tsx:181` | featured item focus ring (inset) |
| `--ds-color-focus-base-default` | `components/Text/Text.styles.tsx:257` | default item focus ring (inset) |
| `--ds-color-text-neutral-default` | `components/Text/Text.styles.tsx:286`, `components/GroupItem/GroupItem.styles.ts:8`, `components/Header/Header.styles.tsx:9` | ordered counter; group title; menu header |
| `--ds-color-icon-success-default` | `components/Text/ItemLabel.tsx:153` | checked (`CheckS`) suffix icon |


### modal
- **Palette:** none.
- **Semantic (7):** `background-base-default`/`-subtle`, `border-base-default`/`-strong`, `text-base-muted`, `opacity-muted` (mask), **`--ds-shadows-shadow-2`** ⚑ (module `modal.container.shadow` pruned).

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-background-base-subtle` | `Elements/ModalContent/ModalContent.styles.ts:54` | body grey background |
| `--ds-shadows-shadow-2` | `Elements/ModalContent/ModalContent.styles.ts:75` | container shadow — ⚑ module `modal.container.shadow` pruned |
| `--ds-opacity-muted` | `Elements/ModalContent/ModalContent.styles.ts:140` | mask opacity |
| `--ds-color-border-base-default` | `Elements/ModalTitle/ModalTitle.styles.ts:50` | header bottom-bar border |
| `--ds-color-text-base-muted` | `Elements/ModalTitle/ModalTitle.styles.ts:70` | description text (deprecated) |
| `--ds-color-border-base-strong` | `Elements/ModalTitle/ModalTitle.styles.ts:77` | description dashed-separator dash |
| `--ds-color-background-base-default` | `Elements/ModalTitle/ModalTitle.styles.ts:78` | description dashed-separator gap |


### navbar
- **Palette:** none.
- **Semantic (1):** `text-onsolid-default` ×3. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-text-onsolid-default` | 13, 70, 73 | navbar text on solid bg; inline-alert svg + text on solid bg |


### page-header
- **Palette:** none.
- **Semantic (6):** `border-base-default`/`-subtle`, `icon-base-default`/`-subtle`, `text-neutral-default`, **`--ds-shadows-shadow-1`** ⚑ (module `page-header.container.shadow` pruned).

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-icon-base-default` | `PageHeaderClamp/PageHeaderClamp.styles.ts:24`, `PageHeaderBack/PageHeaderBack.tsx:18` | title tooltip icon; back-arrow icon |
| `--ds-color-border-base-default` | `PageHeader.styles.ts:6` | main container bottom border |
| `--ds-shadows-shadow-1` | `PageHeader.styles.ts:7` | main container shadow — ⚑ module `page-header.container.shadow` pruned |
| `--ds-color-border-base-subtle` | `PageHeader.styles.ts:17, 49` | isolated `::before` overlay border; bottom bar top border |
| `--ds-color-text-neutral-default` | `PageHeader.styles.ts:36` | description text |
| `--ds-color-icon-base-subtle` | `PageHeaderRightSide/PageHeaderRightSide.tsx:26` | close (`CloseM`) icon |


### popconfirm
- **Palette:** none.
- **Semantic (5):** carousel dots (`icon-base-default`, `background-base-default`, `background-success-solid`), link `text-base-subtle`, `--ds-shadows-shadow-2` ×2 (no module shadow token — genuinely semantic). ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-shadows-shadow-2` | `Popconfirm.styles.tsx:6`, `ConfirmMessage/ConfirmMessage.style.ts:20` | container shadow — ⚑ **no** module token (genuinely semantic) |
| `--ds-color-icon-base-default` | `Popconfirm.styles.tsx:51` | inactive carousel dot bg |
| `--ds-color-background-base-default` | `Popconfirm.styles.tsx:52, 62`, `ConfirmMessage/ConfirmMessage.style.ts:17` | inactive dot border; active dot fill; confirm-message bg |
| `--ds-color-background-success-solid` | `Popconfirm.styles.tsx:61` | active carousel dot border |
| `--ds-color-text-base-subtle` | `Popconfirm.styles.tsx:199` | withLink text |


### pagination
- **Palette:** none.
- **Semantic (3):** quick-jumper input `border-base-strong` + `focus-base-default`, total/jumper `text-base-muted` (no pagination token for the input/text). Item/nav use `--ds-pagination-*`. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-text-base-muted` | 23, 134 | total summary text; quick-jumper label |
| `--ds-color-border-base-strong` | 142 | quick-jumper input border |
| `--ds-color-focus-base-default` | 148, 149 | quick-jumper input focus border-color + focus ring (inset) |


### stepper
- **Palette:** none.
- **Semantic:** none (fully on `--ds-stepper-step-*`). ✓


### time-picker
- **Palette:** none.
- **Semantic (5):** `background-base-default`, `border-base-strong`, `icon-danger-default`, `opacity-disabled`/`-muted` (no module opacity token). Colour states use `--ds-time-picker-*`. ✓

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-opacity-muted` | 100 | disabled+active cell opacity |
| `--ds-opacity-disabled` | 110 | disabled cell text opacity |
| `--ds-color-icon-danger-default` | 132 | clear (×) icon |
| `--ds-color-background-base-default` | 142 | inactive input focus bg |
| `--ds-color-border-base-strong` | 143 | inactive input focus border-color |


### broadcast-bar / status-pill / divider
- **Palette:** none. **Semantic:** none — fully on their `--ds-{broadcast-bar,status-pill,divider}-*` module tokens (broadcast-bar/status-pill via dynamic `var(--ds-…-variant-${v}-…)` construction). ✓

---

## Not applied (module tokens defined, no consuming code yet)

- **ai-chat** (9 tokens) — no ai-chat markup in the `app-menu` package.
- **page** (`--ds-page-bg`) — no full-page background element consumes it.
