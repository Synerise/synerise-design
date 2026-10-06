# @synerise/ds-condition-blocks

Composable, **presentational** building blocks for filtering-condition layouts.

Where `@synerise/ds-condition` bakes in one fixed structure (context chip → optional
aggregate → rows of factor / operator / parameter), these blocks let a consuming app
compose _any_ condition layout — including free-form, text-interleaved ones — while keeping
the design-system look and, crucially, ds-condition's **grow/shrink-within-bounds** sizing.
All state and behaviour (menus, values, add/remove orchestration) live in the consuming app.

## Blocks

| Block | Role |
| --- | --- |
| `ConditionGroup` | Outermost wrapper — entity on the left, rows on the right. |
| `ConditionRows` | Vertical stack of rows (and the add button); sets the inter-row gap. |
| `ConditionRow` | Horizontal flex row; fills its parent but never overflows. Renders its own leading `connector` and an optional `errorMessage`. |
| `ConditionSlot` | Sizing wrapper for one control (`rigid` / `fill` / `shrink` presets or explicit `grow`/`shrink`/`basis`/`minWidth`/`maxWidth`); optional `errorMessage`. |
| `ConditionConnector` | The tree-line connector cell (usually rendered via a row's `connector` prop). |
| `ConditionEntity` | Flex wrapper for the entity/context chip(s); optional `errorMessage`. |
| `ConditionTextSlot` | Inline label for text-interleaved layouts ("Show only [N] items with the same [x]"). |
| `ConditionAddButton` | Ghost "and where" / "Add another" / "and then…" action, with an optional connector. |
| `ConditionRemove` | Hover-revealed ✕ for a row. |

## The sizing guarantee

Three mechanisms, ported from `@synerise/ds-condition`, keep controls stretching and
shrinking within bounds without the row ever overflowing its parent:

1. **`ConditionSlot` flex budgets** — `rigid` = `flex: 0 0`, `fill` = `flex: 30 1`,
   `shrink` = `flex: 0 400`; pair `shrink` with a `minWidth` floor.
2. **A `min-width: 0` cascade** — every level (`ConditionRows` → `ConditionRow` → `ConditionSlot`
   → its child) is `min-width: 0`, so children can shrink below their intrinsic width.
3. **A stretch-to-fit value input** — the input the consuming app passes (`@synerise/ds-input`
   with `autoResize.stretchToFit`) pins its `max-width` to the measured parent width, so it fills
   the slot but never spills out.

Put shrinkable controls in a `ConditionSlot` (never a bare child of `ConditionRow`) so the
cascade applies.
