# Storybook

The Storybook for `@synerise/ds-*`. Every story is also a test in two places:

- **Chromatic** snapshots it on merge requests (`chromatic_publish`) and is billed per snapshot.
- **Vitest + Playwright** runs its `play` function in Chromium (`pnpm test-storybook`, CI job
  `storybook_interaction_tests`).

## Snapshot policy

Stories are snapshotted unless they opt out. Opt out when another snapshotted story already shows
what this one renders:

```tsx
import { NO_SNAPSHOT } from '../../utils/chromatic';

export const IconLeft: Story = {
  parameters: { ...NO_SNAPSHOT },
  // ...
};
```

- **Matrix stories carry the visuals.** Render the variants (types × modes × states) side by side in
  one story, like `ButtonMatrix`. The single-variant stories stay for the docs page and controls, with
  `NO_SNAPSHOT`.
- **Behaviour-only `play` stories opt out.** If the story ends where it started (search typed then
  cleared, dropdown opened then closed, a callback asserted), `storybook_interaction_tests` covers it and
  a snapshot adds nothing. Keep the snapshot when the end state is new (dropdown open, validation error
  shown), or render that state statically through props instead.
- **Duplicates opt out.** When two story files run the same `play` functions against the same UI, as
  the ItemPicker infinite-loader tests do, only one of them keeps snapshots. A meta-level
  `parameters: { ...NO_SNAPSHOT }` covers the whole file.
- **Watch the spread.** `{ ...OtherStory }` copies `OtherStory.parameters`, so `NO_SNAPSHOT` on a story
  other stories are built from disables them too. Put it on leaves, or give each derived story its own
  `parameters`.

## Adding or changing a story

Every story either carries a snapshot or opts out naming the snapshotted story that shows it. Decide
where the new visual goes before writing the story:

| You add | Where it is snapshotted |
|---|---|
| A new prop value, mode, size or state of a component | The folder's matrix story. The single story stays for docs and controls, with `NO_SNAPSHOT` |
| A hover or focus look | A `pseudo` copy of the matrix, like `ButtonMatrixHover`, not a `play` that hovers |
| A `play` story that ends where it started | Nowhere: `NO_SNAPSHOT`, since `storybook_interaction_tests` covers it |
| A `play` story that ends in a new state (overlay open, error shown, rows selected) | Its own snapshot, or render that state through props and add it to the matrix |
| A variant a matrix cell cannot hold (modal, drawer, full-width table, viewport-sized) | Its own snapshot |
| A new component, or a folder with several variants and no matrix yet | A new matrix story, then the rows above for each story |

Keeping a matrix complete:

- **Composed matrices pick up new stories.** A `<Name>Matrix.stories.tsx` built with `composeStories`
  and `StoryMatrix` from `stories/utils/StoryMatrix.tsx` (Input, Slider, TextArea, PasswordInput,
  CardSelect) renders every story of its source file except the ones it destructures out. Add the story
  with `NO_SNAPSHOT` and check that it shows up in the matrix. A story that does not fit a cell is
  destructured out and keeps its own snapshot. `CellsMatrix` lists one file per cell type, so a new
  `Cells/*.stories.tsx` file is added to its `CELL_STORIES`.
- **Hand-written matrices need the new value.** `ButtonMatrix` and `ToggleMatrix` map arrays of types,
  modes and states; add the new one to the array rather than snapshotting a separate story.
- **Only args go into a matrix.** Composed stories render without their `play` function, so a state
  reached by clicking is not in the matrix. Give the component the prop that renders it (`open`,
  `errorText`, `selectedRowKeys`) or keep the `play` story's snapshot.
- **Matrix content is deterministic.** Fixed data and static props: no `play`, no `Math.random()` or
  `uuid()`, no `new Date()`, no running animation. Anything that changes between builds diffs the whole
  matrix on every MR.
- **Label every cell** with its variant name, as `StoryMatrix` does with the story key, so a Chromatic
  diff points at the variant that changed.
- **Review checklist.** The MR names, for every new or changed story, the snapshotted story that shows
  it, and Chromatic shows the matrix diff with the new variant in it.

## What makes Chromatic re-snapshot everything

TurboSnap only re-snapshots stories whose imports changed, except when a file imported by
`.storybook/preview.tsx` changes: then every story is captured at full price. Keep the global
decorators to `@synerise/ds-core`; a provider only some stories need (`TrayProvider`) belongs in those
stories' `decorators`.

Merge commits always re-test the union of both sides, so prefer rebasing a long-lived branch onto
`master` over merging `master` into it.

Chromatic is manual on draft merge requests; play the job when you want snapshots or the pre-release
tarballs. Until it has run, the pipeline is blocked and the MR cannot merge. Marking an MR ready does
not start a new pipeline, so either play the job or push once more after marking it ready.

## Play functions under `pnpm test-storybook`

- **No `useArgs` for state a `play` function changes.** `updateArgs` does not re-render the story under
  the Vitest runner, so a picker that keeps its value in args never shows the new one there. Keep that
  state in React `useState`, synced from args with `useEffect`, as `FormatPicker`, `Tags` and
  `ItemPickerLegacy` do.
- **Global stores outlive a story.** Stories run one after another in the same page, so toasts and other
  module-level state leak into the next story. Reset them in the meta's `beforeEach`, as the Toast tests do.
