# ADR 0001 — Remove the Ant Design (antd) dependency from the design system

- **Status:** Accepted
- **Date:** 2026-06-08
- **Deciders:** DS team
- **Tags:** dependencies, components, breaking-change, tech-debt

## Context

The design system (`@synerise/ds-*`) is built on top of **Ant Design 4.x** (`antd@4.24.16`,
pinned as a `peerDependency`). antd 4 is no longer the long-term direction for the platform:

- **Maintenance / EOL risk.** antd 4 is in maintenance mode; staying on it blocks React 19+ and
  pulls in `rc-*` sub-dependencies and a large LESS theming layer we do not control.
- **Bundle weight.** antd ships a broad component set and its own CSS-in-LESS theming. We only use a
  subset, but consumers pay for the LESS base styles imported per component
  (`~antd/lib/<comp>/style/index.less`).
- **Styling friction.** Most DS components override antd's internal CSS classes
  (`.ant-avatar-string`, `.ant-badge-count`, `.ant-switch`, …) from styled-components. This couples
  our styling to antd's private DOM structure and breaks whenever antd changes markup.
- **Design control.** We already re-implement most visuals with styled-components and design tokens
  from `@synerise/ds-core`. antd is increasingly just a DOM/behaviour shell we fight against.

An audit (2026-06-08) of `packages/components/*/src` found:

- **27** packages import antd in source (excluding `ds-table`). 7 of those are **type-only** imports.
- **19** more packages declare `antd` in `package.json` peerDeps but **never import it** — stale
  declarations that only need a `package.json` cleanup.
- Foundational blast radius: `ds-core` is consumed by ~354 files, `ds-input` by ~37, `ds-select` by ~11.

See `docs/antd-migration-status.md` for the full per-package tracker.

## Decision

**We will remove `antd` as a dependency of the design system**, package by package, replacing each
antd-backed component with a DS-native implementation built on `styled-components` + `@synerise/ds-core`
design tokens. `ds-table` is **out of scope** for this initiative (tracked separately).

Guiding principles:

1. **Preserve the public API and visual output** of each `@synerise/ds-*` package. Migrations are
   internal refactors, not redesigns. Snapshot/interaction tests must keep passing (or be updated
   only for unavoidable DOM-structure changes, reviewed deliberately).
2. **Reproduce antd's DOM + inline its base CSS** where our styled-components currently rely on antd
   class names, so existing overrides keep working with minimal churn — then simplify over time.
3. **Migrate leaf/standalone components first**, foundational ones (`ds-input`, `ds-select`,
   `ds-core`) last, because antd's `ConfigProvider` context underpins the wrapped components.
4. **Type-only antd imports are migrated last** — they will mostly switch to types defined by the
   already-migrated owning packages (e.g. `ds-input` props, `ds-select` props) rather than ad-hoc
   local types.
5. **Breaking public exports are a deliberate, flagged decision.** Two packages re-export antd
   directly to consumers — `ds-switch` (`RawSwitch`) and `ds-typography` (the antd `Typography`
   default export, used downstream with antd-only features such as `copyable` / `Typography.Title`).
   These require an explicit back-compat-vs-break decision before migration (see Consequences).
6. **One feature branch per component**, named `refactor/deantd-<component>`, squash-merged via MR.

### Migration ordering (complexity, least → most)

Ordering reflects the **real** cost found in the source audit, not raw import counts. All four
"Tier 1" components below render a real antd component and style it via antd's CSS classes, and
avatar/badge/switch import antd's component LESS — so none are trivial re-exports.

- **Tier 1 — standalone leaf components (this initiative's first wave):**
  `avatar`, `badge`, `switch`, `typography`.
- **Tier 2 — medium runtime components:** `pagination`, `alert`, `banner`, `popconfirm`, `sidebar`,
  `list`, `checkbox`, `radio`, `input-number`.
- **Tier 3 — complex / foundational:** `drawer`, `menu`, `search`, `autocomplete`, `select`, `input`,
  `core`.
- **Tier 0 — type-only imports (LAST):** `table-new`, `mocks`, `completed-within`, `date-picker`,
  `factors`, `form`, `subtle-form`. Migrated after the owning packages so they can adopt
  DS-native types instead of antd ones.
- **Out of scope:** `ds-table`.
- **Stale peerDeps (config-only cleanup, no code):** `block`, `card`, `card-select`, `card-tabs`,
  `checkbox-tristate`, `code-area`, `collector`, `color-picker`, `column-manager`, `design-system`,
  `field-set`, `manageable-list`, `mapping`, `navbar`, `page-header`, `sidebar-object`, `tabs`,
  `time-picker`, `toolbar`.

## Consequences

### Positive
- Removes a large, EOL-track dependency and its `rc-*` / LESS transitive weight.
- Full control over DOM and styling; no more overriding private antd classes.
- Unblocks future React upgrades and a tokens-only theming story.

### Negative / risks
- **Visual-regression risk** on published packages — each migration must be verified against
  Storybook and snapshot tests. antd's base component LESS must be reproduced where relied upon.
- **Breaking-change surface:**
  - `ds-switch` exports `RawSwitch` (literally antd's Switch), used by `column-manager`, `field-set`,
    and the bridge (`automations`). The DS-native replacement must match the consumed API or those
    call sites break.
  - `ds-typography`'s **default export is antd's `Typography`**, consumed with antd-only features
    (`copyable`, `Typography.Title`, ellipsis) in `sidebar-object` and 30+ bridge files. Faithfully
    replacing it is the hardest part of the "smallest" package and may force either a back-compat
    re-implementation or coordinated downstream changes.
- **Cross-repo coordination** with `portal-ui-bridge` and `universal-list`, which consume these
  packages.
- Migration is incremental and spans many MRs; antd cannot be fully dropped from `package.json` /
  the build until the last component (and `ds-core`'s `ConfigProvider`/locale usage) is migrated.

### Neutral
- During the transition, antd remains a peerDependency for not-yet-migrated packages. The
  `package.json` peerDep is only removed per package as its source becomes antd-free.

## References
- `docs/antd-migration-status.md` — living per-package status tracker.
- Audit date: 2026-06-08.
