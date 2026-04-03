---
name: publish-ready
description: Verify a component package is ready for publishing by checking documentation, stories, argTypes, code tabs, overview page, unit tests, and interaction tests.
---

## Overview

Run a pre-publish readiness check on a single component package. This skill orchestrates verification across documentation (CLAUDE.md, README.md), Storybook completeness (argTypes, code tabs, overview MDX), unit test coverage for new functionality, and interaction tests for complex components. It produces a pass/fail checklist with actionable items for anything that needs attention before publishing.

## Arguments

The user must provide:
1. **Package name** — e.g., `modal`, `button`, `progress-bar` (kebab-case directory name under `packages/components/`)

The user may optionally provide:
- A git ref or branch to diff against for identifying "new functionality" (defaults to `origin/master`)

If the package name was not provided, ask: *"Which package would you like to check for publish readiness? (e.g. modal, button, progress-bar)"*

## Workflow

### Step 1 — Locate the package and gather context

Find all relevant files:

```
packages/components/<package-name>/src/          ← component source
packages/components/<package-name>/CLAUDE.md     ← AI reference doc
packages/components/<package-name>/README.md     ← user-facing docs
packages/components/<package-name>/package.json  ← package metadata
packages/storybook/stories/components/<PascalName>/  ← stories directory
```

Derive `<PascalName>` from the kebab-case name (e.g., `progress-bar` → `ProgressBar`). If the stories directory uses a different casing, search with:
```
packages/storybook/stories/components/**/<PascalName>*.stories.tsx
```

Read all source files, types files, stories, tests, and documentation before forming any judgements.

### Step 2 — Identify new and changed functionality

Run a diff against the base branch to understand what has changed:

```bash
git diff origin/master -- packages/components/<package-name>/src/
```

From the diff, extract:
- **New props** added to types files
- **New components** or sub-components added
- **New hooks** added
- **Changed behaviour** in existing components (modified logic, new branches)
- **New exports** added to `index.ts`

This list drives the "new functionality needs tests" checks in Steps 5 and 6.

### Step 3 — Verify CLAUDE.md and README.md completeness

#### 3.1 CLAUDE.md

Read `packages/components/<package-name>/CLAUDE.md`. If it does not exist, record as **FAIL**.

If it exists, cross-reference against the actual source code:

| Check | How to verify |
|-------|--------------|
| All exported components listed | Compare exports in `index.ts` against CLAUDE.md "Public exports" section |
| All props documented with correct types | Compare each prop in `*.types.ts` against CLAUDE.md prop tables |
| Prop defaults accurate | Check default values in component source or `defaultProps` against documented defaults |
| New props from Step 2 are documented | Every new/changed prop from the diff must appear in CLAUDE.md |
| Sub-components documented | Each exported sub-component has a section |
| Package structure reflects actual files | `src/` tree in CLAUDE.md matches the real directory |
| No stale references | No props, components, or files documented that no longer exist in source |

#### 3.2 README.md

Read `packages/components/<package-name>/README.md`. If it does not exist, record as **WARN** (not a hard blocker, but recommended).

If it exists, verify:

| Check | How to verify |
|-------|--------------|
| All public props listed | Cross-reference `*.types.ts` against README prop tables |
| New props from Step 2 are documented | Every new/changed prop from the diff must appear in README |
| Types and defaults accurate | Match against current source |
| No stale props | No rows for props that were removed |
| Usage examples valid | Import paths and JSX match current exports |
| Install command correct | Package name matches `package.json` `name` field |

### Step 4 — Verify Storybook stories

Read all `*.stories.tsx` files (excluding `*.test.stories.tsx` / `*.tests.stories.tsx`).

#### 4.1 argTypes completeness

For each story file's meta (default export), check `argTypes`:

| Check | How to verify |
|-------|--------------|
| All interactive props have argTypes | Every prop that a user would want to toggle in the Storybook controls panel should have an argType. Compare against the component's props type. |
| Correct control types | Boolean props → `BOOLEAN_CONTROL`, string props → `STRING_CONTROL`, number props → `NUMBER_CONTROL`, enum/union props → `controlFromOptionsArray('select'\|'radio', options)`, ReactNode props → `REACT_NODE_AS_STRING` or `REACT_NODE_NO_CONTROL`, color props → `COLOR_CONTROL` or `THEME_PALETTE_COLOR_NAMES_CONTROL`. Verify each argType uses the appropriate control from `packages/storybook/stories/utils/controls.ts`. |
| New props from Step 2 have argTypes | Every new prop added in the diff should have a corresponding argType entry |
| No stale argTypes | No argTypes for props that were removed |

#### 4.2 Code tab (parameters.docs.source.code)

For each non-test story, check whether `parameters.docs.source.code` exists and is up to date.

**Verification approach:**
1. Check if every named story export has a `parameters.docs.source.code` field.
2. For stories that have one, verify the code snippet reflects current props and component name.
3. If code tabs are missing or outdated, record as **FAIL** and note that the `/storybook-code-tab` skill should be run.

Do NOT generate code tab snippets in this skill — that is the responsibility of the `storybook-code-tab` skill. Only verify and flag.

#### 4.3 Overview MDX page

Check for an overview MDX page at:
```
packages/storybook/stories/components/<PascalName>/<PascalName>.mdx
```

Also check: `<PascalName>.overview.mdx`, `<PascalName>.docs.mdx`.

| Check | How to verify |
|-------|--------------|
| MDX file exists | If missing → **FAIL** |
| Imports valid story exports | Each `import { X } from './Stories'` must reference a real export |
| `Canvas` references valid | Each `<Canvas of={StoryName} />` must reference an imported story |
| Props tables match source | Cross-reference documented props against `*.types.ts` |
| New functionality from Step 2 is covered | New variants/modes should be mentioned or demonstrated |
| No stale content | No references to removed props, components, or stories |

If the MDX file is missing or significantly outdated, note that the `/overview-mdx` skill should be run.

### Step 5 — Verify unit tests for new functionality

Read test files in `packages/components/<package-name>/src/__specs__/` and any `*.test.tsx` files.

Cross-reference against the new functionality identified in Step 2:

| Check | How to verify |
|-------|--------------|
| Test files exist | At least one test file for the component. If none → **FAIL** |
| New props are tested | Each new prop from the diff should have at least one test exercising it (render with prop, assert expected output or behaviour) |
| New components/sub-components tested | Each new exported component should have basic render + key behaviour tests |
| New hooks tested | Custom hooks with non-trivial logic should have tests |
| Event handlers tested | New `onClick`, `onChange`, etc. props should have interaction tests (fireEvent/userEvent + assertion) |

Do not require exhaustive coverage of every code path — focus on whether the **new** functionality has basic test coverage.

### Step 6 — Verify interaction tests for complex components

This check applies to components that have significant user interaction: dropdowns, modals, tooltips, tabs, date pickers, forms, drag-and-drop, keyboard navigation, etc.

Read `*.test.stories.tsx` or `*.tests.stories.tsx` files in the storybook stories directory.

| Check | How to verify |
|-------|--------------|
| Interaction test file exists | For complex interactive components, a `.tests.stories.tsx` file should exist. Simple presentational components (Badge, Divider, Typography) may not need one — use judgement. |
| Play functions have assertions | Each `play` function should include `expect()` calls, not just `userEvent` actions |
| Key interactions covered | Open/close, click handlers, keyboard navigation, hover states — at least the primary interaction paths |
| New interactive behaviour tested | If Step 2 identified new interactive props (e.g., `onClick` on a bar segment), there should be a corresponding play-function test |

**Complexity heuristic:** A component is "complex" if it:
- Has open/close or show/hide state
- Handles keyboard events
- Contains focus management
- Has multi-step interactions (select → confirm → close)
- Manages drag-and-drop or reordering
- Contains form validation logic

Simple presentational components without interaction do NOT need interaction tests. Record as **N/A** for these.

### Step 7 — Produce the readiness report

Format the report as follows:

---

## Publish Readiness: `@synerise/ds-<package-name>`

### Checklist

| # | Check | Status | Details |
|---|-------|--------|---------|
| 1 | CLAUDE.md complete & accurate | PASS / FAIL | <brief detail> |
| 2 | README.md complete & accurate | PASS / FAIL / WARN | <brief detail> |
| 3 | Story argTypes correct | PASS / FAIL | <brief detail> |
| 4 | Code tabs present & up to date | PASS / FAIL | <brief detail> |
| 5 | Overview MDX page | PASS / FAIL | <brief detail> |
| 6 | Unit tests for new functionality | PASS / FAIL / N/A | <brief detail> |
| 7 | Interaction tests (complex components) | PASS / FAIL / N/A | <brief detail> |

### Overall: READY / NOT READY

A package is **READY** if all checks are PASS or N/A.
A package is **NOT READY** if any check is FAIL.

---

### Issues

List each failing check with:
- **[CHECK-N]** What specifically is wrong
- **Fix:** What needs to be done (and which skill to run if applicable)

Example:
- **[CHECK-4]** Stories `WithSteps` and `ThinProgressBar` are missing `parameters.docs.source.code`
  **Fix:** Run `/storybook-code-tab <package-name>` to generate code tab snippets
- **[CHECK-5]** No overview MDX page found
  **Fix:** Run `/overview-mdx <package-name>` to create the overview documentation page

---

### New Functionality Summary

List the new/changed functionality detected in Step 2:
- <New prop / component / hook> — tested: YES / NO
- ...

---

After presenting the report, if the package is NOT READY, ask: *"Would you like me to fix these issues? I can run the relevant skills and make the necessary changes."*

If the package is READY, confirm: *"This package looks ready to publish. All documentation, stories, and tests are in order."*
