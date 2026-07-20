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
- refaktor styli zeby sie pozbyc `icon-base-default` (close icon), usunac hover z `icon-brand-default`,
- `text-base-disabled`, `text-base-subtle` -> beda dorobione modulowe

**Remaining semantic tokens** (icons now inherit `currentColor` after dropping the close-icon
`icon-base-default` and order-icon `text-base-subtle`/`icon-brand-default`):

| Token | Line(s) | Element / role |
|---|---|---|
| `--ds-color-text-base-disabled` | 150, 155, 178 | `NumberWrapper` order-number text + the two hover-underline gradient stops (`NumberWrapper:hover`, `OrderWrapper:hover`) |
| `--ds-color-text-base-subtle` | 162, 185, 191 | `NumberWrapper:hover` text, `OrderWrapper:hover` number text, `Wrapper` text |


### toast
- **Palette:** none.
- **Semantic (5):** `text-base-muted` ×4, `icon-base-muted`, `icon-brand-default`, `text-base-disabled`, **`--ds-shadows-shadow-2`** ⚑ (module `toast.shadow` pruned — see flag 1).
- jak w section message

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
- `border-base-subtle` do stokenizowania
- `text-brand-default`, `text-neutral-default` -> list item
- --ds-shadows-shadow-1 zostaje

### avatar
- **Palette (1)** — **dyn** (computed `${color}-${hue}`): `ObjectAvatar/ObjectAvatar.tsx:47`.
- **Semantic (3):** `background-base-default`, `icon-base-subtle` ×2, `text-onsolid-default`. ✓ appropriate.
- background-base-default (bialy border badge) -> modulowy z badge (border powinien byc w badge a nie tylko w avatar)
- 


### button
- **Palette (30):**
  - **decorative** (secondary ripple/focus-ring/chip): `blue-100` (164), `blue-300` (171,189), `blue-200` (175,193); split divider `grey-300` (348); Expander focus keyframe `blue-600` (`Expander.styles.tsx:23`).
  - **no-token:** secondary error-focus text `red-600` (181); error hover-bg `red-200` (472,505); `warning` readOnly `yellow-600`/white (302,306) — no `warning` module variant; Creator `blue-500` (36), `grey-500` (48), `rgba(grey-200)` disabled bg (103,107).
  - **dyn** (`custom-color`/`custom-color-ghost`/`iconColor`): `326,531,533,547,557,564,572,581,583,587,602,604,606,613`.
- **Semantic (20):** danger set (`text/border-danger-default`, `background-danger-subtlehover`/`-solidhover`, `text-onsolid-danger`) for the error state; `focus-base-default`; Checkbox/Star sub-comps (`icon-brand/danger/warning-default`, `border-base-default`/`-strong`/`-stronghover`); Creator/ButtonToggle (`background-base-*`, `background-brand-subtle`, `border-brand-*`, `text-base-muted`, `text-brand-default`). ✓ appropriate (no module tokens for these roles).

### card
- **Palette:** none.
- **Semantic (12):** CardBadge (`background-success/warning/danger-solid`, `text-onsolid-default`, `icon-base-muted`, `border-base-stronghover`); Card surface (`background-base-subtle`, `border-base-default`/`-subtle`, `text-base-muted`); **`--ds-opacity-disabled`** ⚑ (`Card.styles.ts:91` — `--ds-card-disabled-opacity` exists, see flag 2); **`--ds-shadows-shadow-1`** ⚑ (module `card.shadow.default` pruned).

### card-select
- **Palette:** none.
- **Semantic (3):** `background-base-subtle`, `border-danger-default`, `icon-base-muted` (documented fallbacks — no module token for these). ✓
- do stokenizowania:  background-base-subtle`, `border-danger-default`
--ds-color-icon-base-muted zostaje sem

==========================================

### description
- **Palette:** none.
- **Semantic (4):** `border-base-strong` (inactive star), `icon-base-default`, `icon-warning-default` (active star), `text-brand-default`. ✓

### form
- **Palette:** none.
- **Semantic (1):** `icon-brand-default` (add-row icon). ✓

### input
- **Palette:** none (field surface now `--ds-form-field-*`).
- **Semantic (12):** InputMultivalue (`background-base-muted`/`-mutedhover`, `border-base-default`, `icon-danger-default`); labels/counter/chips (`text-base-default`/`-muted`/`-subtle`, `text-danger-default`, `text-neutral-default`, `icon-brand-default`); `opacity-disabled` (no module opacity token). ✓

### checkbox
- **Palette (1)** — **no-token:** `blue-500` indeterminate-hover bg (`Checkbox.styles.ts:199`).
- **Semantic (4):** `background-base-default` (indeterminate bar), `icon-base-muted` (disabled tick), `icon-brand-default` (hover-preview), `text-onsolid-default` (tick). Box/label states use `--ds-form-checkbox-*`. ✓

### radio
- **Palette (3)** — **no-token:** `blue-500` solid-button hover (`Radio.styles.tsx:261–263`).
- **Semantic (12):** segmented button + focus/disabled (`background-base-*`, `background-brand-solid`/`-subtle`, `border-base-*`, `border-brand-default`, `focus-base-default`, `text-base-subtle`, `text-brand-default`, `text-onsolid-default`); **`--ds-opacity-disabled`** ⚑ (`:240` — `--ds-form-radio-disabled-opacity` exists, see flag 2). Radio-dot states use `--ds-form-radio-*`.

### switch
- **Palette:** none.
- **Semantic (5):** `focus-base-default` (focus ring), spinner (`background-success-solid`, `border-base-stronghover`), labels (`text-base-muted`, `text-base-subtle`). Track/handle use `--ds-form-switch-*`. ✓

### select
- **Palette (1)** — **data-uri:** search-icon `grey-400` (`Select.styles.ts:130`). Deferred (mid de-antd; `.less` present).
- **Semantic (2):** `background-base-subtle`, `text-base-muted`. ✓

### inline-alert
- **Palette:** none.
- **Semantic (1):** `opacity-disabled` (no module opacity token). ✓

### inline-edit
- **Palette (1)** — **no-token:** `:active` icon-wrapper bg `grey-300` (`InlineEdit.styles.ts:83`).
- **Semantic (5):** `background-base-default`, `focus-base-default` + `text-danger-default` (focus/error underlines), `icon-base-muted` (hover dots), `text-base-disabled` (placeholder). Text/icon/bg states use `--ds-inline-edit-*`. ✓

### list-item
- **Palette (1)** — **decorative/interactive:** `blue-600` (`components/Text/Text.styles.tsx:55`).
- **Semantic (6):** `focus-base-default`/`-strong` (focus rings), `background-base-default`, `text-brand-hover`, `text-neutral-default`, `icon-success-default`. ✓

### modal
- **Palette:** none.
- **Semantic (7):** `background-base-default`/`-subtle`, `border-base-default`/`-strong`, `text-base-muted`, `opacity-muted` (mask), **`--ds-shadows-shadow-2`** ⚑ (module `modal.container.shadow` pruned).

### navbar
- **Palette:** none.
- **Semantic (1):** `text-onsolid-default` ×3. ✓

### page-header
- **Palette:** none.
- **Semantic (6):** `border-base-default`/`-subtle`, `icon-base-default`/`-subtle`, `text-neutral-default`, **`--ds-shadows-shadow-1`** ⚑ (module `page-header.container.shadow` pruned).

### popconfirm
- **Palette:** none.
- **Semantic (5):** carousel dots (`icon-base-default`, `background-base-default`, `background-success-solid`), link `text-base-subtle`, `--ds-shadows-shadow-2` ×2 (no module shadow token — genuinely semantic). ✓

### pagination
- **Palette:** none.
- **Semantic (3):** quick-jumper input `border-base-strong` + `focus-base-default`, total/jumper `text-base-muted` (no pagination token for the input/text). Item/nav use `--ds-pagination-*`. ✓

### stepper
- **Palette:** none.
- **Semantic:** none (fully on `--ds-stepper-step-*`). ✓

### time-picker
- **Palette:** none.
- **Semantic (5):** `background-base-default`, `border-base-strong`, `icon-danger-default`, `opacity-disabled`/`-muted` (no module opacity token). Colour states use `--ds-time-picker-*`. ✓

### broadcast-bar / status-pill / divider
- **Palette:** none. **Semantic:** none — fully on their `--ds-{broadcast-bar,status-pill,divider}-*` module tokens (broadcast-bar/status-pill via dynamic `var(--ds-…-variant-${v}-…)` construction). ✓

---

## Not applied (module tokens defined, no consuming code yet)

- **ai-chat** (9 tokens) — no ai-chat markup in the `app-menu` package.
- **page** (`--ds-page-bg`) — no full-page background element consumes it.
