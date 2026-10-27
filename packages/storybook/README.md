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

## Known failures

Stories tagged `known-failure` are skipped by `pnpm test-storybook` (see `vitest.config.ts`). Their
`play` functions failed on `master` when the suite joined CI. Fix one, drop its tag.
