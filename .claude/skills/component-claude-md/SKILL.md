---
name: component-claude-md
description: Generate a CLAUDE.md file for a design system component package that documents its structure, API, sub-components, and implementation details for AI-assisted development.
---

## Overview

Analyse a single component package and write a `CLAUDE.md` file inside it (`packages/components/<package-name>/CLAUDE.md`). The file gives Claude (and other AI tools) a concise, accurate mental model of the component so future tasks — bug fixes, new features, audits, Code Connect — can be completed without re-reading every source file each time.

## Arguments

The user must provide:
1. **Package name** — e.g., `modal`, `button`, `popover` (kebab-case directory name under `packages/components/`)

If the package name was not provided, ask: *"Which package would you like to document? (e.g. modal, button, popover)"*

---

## Workflow

### Step 1 — Read all source files

Locate and read every relevant file in the package. Do NOT skip files — the quality of the CLAUDE.md depends on reading the actual code.

```
packages/components/<package-name>/
  src/
    <Name>.tsx              ← main component
    <Name>.types.ts(x)      ← prop interfaces
    <Name>.styles.tsx       ← styled-components
    index.ts(x)             ← public exports
    <SubName>/              ← sub-components (recurse into each)
    use*.ts(x)              ← custom hooks
    *utils*, *helpers*, *constants*  ← utilities
    __specs__/ or *.test.tsx         ← tests (scan but don't read in full)
  package.json
  README.md (if present)
```

Also check for stories (used to understand usage patterns, not documented in full):
```
packages/storybook/stories/components/<PascalName>/*.stories.tsx
```

### Step 2 — Analyse the component

Extract the following information from the source files:

#### 2.1 Purpose
What does this component do? One or two sentences. Derive from component name, JSDoc, README, and actual render output.

#### 2.2 Public API
For each exported symbol from `index.ts`:
- Component name
- Props interface (all props with types and defaults — read from `.types.ts` and `defaultProps` / default parameter values)
- Whether it has a `ref` / `forwardRef`
- Imperative handles (`useImperativeHandle`)

#### 2.3 Sub-components
Any nested components exported alongside the main one (e.g. `Modal.Title`, `ModalTitle`, `ButtonGroup`). Note their own props.

#### 2.4 Compound or context-based patterns
Does the component use React Context internally? Does it require a Provider wrapper? Is it a compound component where children must be specific sub-components?

#### 2.5 Styling approach
- Are styles in a dedicated `*.styles.tsx` or inline in the main file?
- Are styled-components using design tokens (ds-core variables) or hardcoded values?
- Is there a `theme` or `variant` pattern?

#### 2.6 Notable implementation details
Things that are non-obvious and would trip up a developer modifying the code:
- External library dependencies (e.g., Ant Design wrappers, floating-ui, react-spring)
- Event bubbling gotchas
- `useCallback`/`useMemo` patterns that are critical for performance
- SSR considerations
- Accessibility patterns (ARIA roles, keyboard handling)
- Known limitations or TODOs from comments

#### 2.7 Custom hooks
For each `use*.ts` hook in the package:
- What it does
- What it returns
- Whether it has side effects

#### 2.8 File structure map
A quick tree of notable files and their roles.

---

### Step 3 — Write the CLAUDE.md

Write the file to `packages/components/<package-name>/CLAUDE.md`.

Follow this template — adapt sections based on what is actually present (omit empty sections):

```markdown
# <PackageName> (`@synerise/ds-<package-name>`)

> <One-sentence description of what this component does.>

## Package structure

\`\`\`
src/
  <Name>.tsx          — main component
  <Name>.types.ts     — prop interfaces
  <Name>.styles.tsx   — styled-components
  index.ts            — public exports
  <SubName>/          — <what this sub-component does>
  use<Hook>.ts        — <what this hook does>
\`\`\`

## Public exports

### `<ComponentName>`

Primary component. Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `propName` | `string` | `undefined` | What it does |
| ... | | | |

<!-- Add forwardRef note if applicable -->
<!-- Add imperative handle if applicable -->

### `<SubComponentName>` _(if present)_

<Brief description.> Props: ...

## Usage patterns

\`\`\`tsx
// Minimal usage
import ComponentName from '@synerise/ds-<package-name>';
<ComponentName prop="value" />

// Compound usage (if applicable)
<ComponentName>
  <ComponentName.Sub />
</ComponentName>
\`\`\`

## Context / Provider

<!-- Only include if the component uses React Context -->
`<ContextName>` is created in `<Name>.tsx` and consumed by sub-components. No external Provider is required — the root component handles it.

## Styling

Styles live in `<Name>.styles.tsx`. Uses `@synerise/ds-core` tokens for colours and spacing. <!-- Note any variant/theme pattern -->

## Custom hooks

### `use<HookName>` _(if present)_

<What it does, what it returns, notable side effects.>

## Key dependencies

- `<dependency>` — <why it's used>

## Implementation notes

<!-- Non-obvious details a developer needs to know -->
- <Note about gotcha, pattern, or constraint>
```

#### Rules for writing the file

1. **Be concise.** This is a reference document, not a tutorial. Use tables and bullet points over prose.
2. **Be accurate.** Every prop, type, and default must come from the actual source code — do not infer or guess.
3. **Omit empty sections.** If there are no custom hooks, don't include that section.
4. **Use real import paths** in the usage example (the actual npm package name from `package.json`).
5. **Highlight non-obvious things.** Obvious things (e.g., "pass `onClick` to handle clicks") don't need documenting. Focus on what would surprise a developer unfamiliar with the component.
6. **List all exported symbols** from `index.ts` — not just the main component.

---

### Step 4 — Update README.md (if present)

If `packages/components/<package-name>/README.md` exists, compare it against the actual source code and fix any outdated information. Do NOT rewrite the README from scratch — only correct inaccuracies.

#### What to check and fix

| Section | What to verify |
|---------|---------------|
| Installation / import | Package name matches `package.json` `name` field |
| Props table | Every prop exists in the types file with the correct type and default |
| Removed props | Delete rows for props that no longer exist in the types |
| New props | Add rows for props present in the types but missing from the README |
| Usage examples | Import paths and JSX are valid against current exports from `index.ts` |
| Sub-components | Names and props match what is actually exported |
| Peer dependencies | Match `peerDependencies` in `package.json` |

#### Rules for README edits

1. **Fix inaccuracies and fill gaps.** Correct wrong values AND add missing content within existing sections.
2. **Preserve existing prose and examples** that are still accurate.
3. **Add missing rows to existing tables.** If a prop, sub-component, or type exists in the source but is absent from an existing table, add a row for it using the same column format as the surrounding rows.
4. **Do not add entirely new sections** (`##` headings) that weren't there before — only update existing content.
5. If the README is missing entirely, do not create one — CLAUDE.md is the documentation target for this skill.

---

### Step 5 — Create todos for gaps

After writing the files, collect every gap found during analysis and create a todo item for each one using the `TodoWrite` tool. Gaps include:

- Props with no type annotation
- Props with no default value where one is clearly expected
- Exported symbols missing from the README
- Deprecated patterns still in active use (e.g. deprecated props passed in examples)
- Private/deep imports that are fragile (e.g. `pkg/dist/Sub`)
- Type asymmetries or inconsistencies in the public API
- Missing tests (empty `__specs__` directory or no spec file for a sub-component)
- Any `TODO` or `FIXME` comments found in source files

Each todo should be concise and actionable: `[<package-name>] <what needs fixing>`.

Only create todos for real issues found in the code — do not invent gaps. If no gaps were found, skip this step.

---

### Step 6 — Report

After writing the files and creating todos, output:
- The path of the created CLAUDE.md
- Whether README.md was updated and a bullet list of what was changed (or "README not present" / "README already up to date")
- A one-line summary of what was documented (e.g., "Documented 3 exports, 2 sub-components, 1 custom hook")
- How many todo items were created (or "No gaps found")
