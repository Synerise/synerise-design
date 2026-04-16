---
name: package-audit
description: Audit a design system package for code quality, test coverage, Storybook completeness, and code hygiene issues. Produces a severity-ranked report and a fix plan for critical/important issues.
---

## Overview

Perform a thorough quality audit of a single component package in the design system. The audit covers dead code, unit tests, Storybook stories, interactive tests, console logs, suppression comments, code organisation, README completeness, and package.json dependency hygiene. Output is a structured report grouped by severity, followed by a prioritised fix plan for critical and important findings.

## Arguments

The user must provide:
1. **Package name** — e.g., `modal`, `button`, `popover` (kebab-case directory name under `packages/components/`)

If the package name was not provided, ask: *"Which package would you like to audit? (e.g. modal, button, popover)"*

## Workflow

### Step 1 — Locate the package

Find and read all source files for the package:

```
packages/components/<package-name>/src/         ← component source
packages/storybook/stories/components/<PascalName>/   ← stories
```

If the `stories` directory uses a different casing or name, search with:
```
packages/storybook/stories/components/**/<PascalName>*.stories.tsx
```

Read all relevant files before forming any judgements. Typical structure to read:
- `package.json` — declared dependencies, peerDependencies, devDependencies
- `<Name>.tsx` — main component
- `<Name>.types.ts` / `<Name>.types.tsx` — prop types
- `<Name>.styles.tsx` / `style/` — styled-components
- `index.ts` / `index.tsx` — public exports
- Sub-component files in nested directories
- Custom hooks: `use*.ts` / `use*.tsx`
- Utility/helper files: `*utils*`, `*helpers*`, `*constants*`
- `__specs__/` or `*.test.tsx` — unit tests
- `*.stories.tsx` — regular stories
- `*.test.stories.tsx` / `*.tests.stories.tsx` — interactive/play stories
- `README.md` — package documentation

### Step 2 — Run automated checks

Run these commands and capture the output; use findings to support manual analysis:

```bash
# Check for console.log / console.error / console.warn
grep -rn "console\." packages/components/<package-name>/src/ --include="*.ts" --include="*.tsx"

# Check for ts-ignore / ts-expect-error / @ts-nocheck
grep -rn "@ts-ignore\|@ts-expect-error\|@ts-nocheck" packages/components/<package-name>/src/

# Check for eslint-disable comments
grep -rn "eslint-disable" packages/components/<package-name>/src/

# List exported symbols from index
cat packages/components/<package-name>/src/index.ts 2>/dev/null || cat packages/components/<package-name>/src/index.tsx

# Count test files
find packages/components/<package-name>/src -name "*.test.tsx" -o -name "*.spec.tsx" | wc -l

# Count story files
find packages/storybook/stories/components/<PascalName> -name "*.stories.tsx" 2>/dev/null | wc -l

# Check README exists and get its size
wc -l packages/components/<package-name>/README.md 2>/dev/null || echo "MISSING"

# List all import statements in source files (to cross-reference against package.json)
grep -rh "^import" packages/components/<package-name>/src/ --include="*.ts" --include="*.tsx" | grep "from '" | sed "s/.*from '\\([^']*\\)'.*/\\1/" | grep -v '^\.' | sort -u

# Check for MDX overview
ls packages/storybook/stories/components/<PascalName>/Overview.mdx 2>/dev/null || echo "MISSING"

# List argTypes from stories
grep -A 1 "argTypes:" packages/storybook/stories/components/<PascalName>/<PascalName>.stories.tsx | head -30
```

### Step 3 — Analyse each dimension

Evaluate every dimension below and collect concrete findings with file and line references.

#### 3.1 Dead Code
- Exported symbols from `index.ts` that are never imported elsewhere in the monorepo
- Internal functions, variables, or components that are defined but never called/rendered
- Props defined in the types interface but never read inside the component
- Commented-out blocks of code

To check for unused exports, search the monorepo:
```bash
grep -rn "from '.*<package-name>'" packages/ --include="*.ts" --include="*.tsx" | head -40
```

#### 3.2 Unit Tests
- Are there test files at all? If none exist, flag as Critical.
- Do tests cover the main component behaviour (rendering, prop variations, event handling)?
- Are edge cases tested (empty state, error state, disabled state)?
- Are there tests for custom hooks and utility functions?
- Test quality: avoid snapshot-only tests — look for behaviour assertions.
- Coverage gaps: list untested public behaviours.

#### 3.3 Storybook Stories
- Does a `*.stories.tsx` file exist? If not, flag as Critical.
- Do stories cover the most common use cases: default state, all key variants (size, type, state), with and without optional content?
- Does every story have a `parameters.docs.source.code` snippet (the Code tab)?
- Are there isolated stories for sub-components or compound usage patterns?

#### 3.4 Interactive Test Stories
- Does a `*.test.stories.tsx` or `*.tests.stories.tsx` file exist?
- Do `play` functions test the main interactive paths: click, keyboard navigation, open/close, form submission, etc.?
- Do they cover error and edge-case flows (invalid input, disabled interactions)?
- Are assertions (`expect`) present in play functions, not just interactions?

#### 3.5 Console Logs
- Any `console.log`, `console.warn`, `console.error`, or `console.info` left in source files.
- Distinguish debug logs (always Critical to remove) from intentional error reporting.

#### 3.6 TypeScript Suppression Comments
- `// @ts-ignore` — flag each occurrence; assess if it can be removed with a proper type fix.
- `// @ts-expect-error` — acceptable only with an explanatory comment; flag bare ones.
- `// @ts-nocheck` — flag as Critical at file level.
- Evaluate if removing the comment is feasible with a minor type annotation change.

#### 3.7 ESLint Suppression Comments
- `// eslint-disable-next-line` and `/* eslint-disable */` — flag each.
- Distinguish: some are legitimately unavoidable (e.g., `react-hooks/exhaustive-deps` with a documented reason); most should be fixed.
- Flag bare disables without explanatory comments as higher severity.

#### 3.8 Code Organisation & Conciseness
- Is the main component file excessively long (> ~200 lines is a yellow flag; > ~400 lines is red)?
- Are there inline helper functions that belong in a `utils.ts` or dedicated hook?
- Are there large render sub-sections that should be extracted as named sub-components?
- Are styled-components definitions inline in the main file when there is already a `*.styles.tsx`?
- Are there repetitive patterns that could be abstracted?
- Is business logic mixed with rendering logic in ways that reduce testability?

#### 3.9 package.json Dependency Hygiene

Read `packages/components/<package-name>/package.json` and cross-reference every `import` statement collected in Step 2 against the declared dependencies.

**Missing dependencies** — imported in source but not declared in `dependencies` or `peerDependencies`:
- Flag as **Critical** if the package is a direct runtime import that would cause a build/runtime failure for consumers.
- Flag as **Important** if it is only used in test/story files but is missing from `devDependencies`.

**Unused dependencies** — declared in `dependencies` but never imported in any source file:
- Flag as **Important**. Dead weight that inflates consumer install size and obscures real deps.
- Exception: tooling packages in `devDependencies` (e.g. `vitest`, `@babel/*`) — these are expected to not appear in source imports; do not flag them.

**Wrong dependency category** — packages that should be `peerDependencies` but are declared as `dependencies` (or vice versa):
- Packages shared across all DS packages (`react`, `styled-components`, `@synerise/ds-core`) must be `peerDependencies`, not `dependencies`. Flag as **Important** if misclassified.
- DS sibling packages (`@synerise/ds-*`) consumed at runtime should be `dependencies` (not `peerDependencies`) unless they are already listed in the workspace root. Flag if wrong.

**Version constraints** — flag as **Minor** if:
- A dependency uses `*` or an overly broad range that could silently pull in a breaking version.
- A `peerDependency` range is narrower than what the rest of the monorepo expects.

#### 3.10 README Completeness
Read `packages/components/<package-name>/README.md` and evaluate:
- Does the file exist at all? If not, flag as Critical.
- Does it document **all public props** exported from `index.ts` / `Modal.types.ts`? Cross-reference the types file to find gaps.
- Does it show at least one **usage example** (import + JSX snippet)?
- Does it document **sub-components** (`ModalTitle`, `ModalFooter`, etc.) and their props?
- Does it document **imperative APIs** (`showModal`, `ref.scrollToTop`, etc.) if they exist?
- Does it list **deprecated props** clearly?
- Are prop **types and defaults** accurate — i.e. do they still match the current source? Flag stale docs as Important.
- Is the install command correct (right package name, right package manager hint)?

#### 3.11 MDX Overview Page
Check for `packages/storybook/stories/components/<PascalName>/Overview.mdx`:
- Does the file exist? If not, flag as **Important** — all components should have an overview page for Storybook docs.
- If it exists, verify it covers these sections:
  - **Component description** — what the component is and when to use it
  - **Key features** — summary of the component's main capabilities
  - **Usage guidance** — guidelines on how and when to use the component (do's / don'ts, common patterns)
  - **Import example** — code snippet showing how to import the component
  - **Key props** — documentation of the most important props with descriptions
- Flag as **Minor** if the overview exists but is missing one or more of the above sections.

#### 3.12 ArgTypes Coverage
Read the TypeScript props type from `<Name>.types.ts` (the main `<Name>Props` type) and the `argTypes` object from the stories file. Compare every prop in the TypeScript type against the argTypes:

- **Deprecated props** should have `{ table: { disable: true } }` in argTypes to hide them from the controls panel. Flag as **Important** if deprecated props have active controls.
- **Boolean props** should have `BOOLEAN_CONTROL` or equivalent (e.g. `{ control: 'boolean' }`). Flag as **Minor** if missing.
- **Number props** should have `NUMBER_CONTROL` or equivalent (e.g. `{ control: 'number' }`). Flag as **Minor** if missing.
- **String props** should have `STRING_CONTROL` or equivalent (e.g. `{ control: 'text' }`). Flag as **Minor** if missing.
- **Callback props** (functions like `onClose`, `onChange`) are acceptable without controls — they are managed by the story render function. They should not have misleading controls (e.g. a text input for a function). Flag as **Minor** if a callback has a misleading control type.
- **Complex object/array props** are acceptable with `{ control: false }` or no argType entry at all. Flag as **Info** for complex types that reasonably can't have controls.

Summary of severity:
- **Important** — deprecated props are not hidden in argTypes (still appear in controls panel)
- **Minor** — controllable props (boolean, number, string) are missing argTypes entries
- **Info** — complex types without controls (informational, no action required)

### Step 4 — Classify findings by severity

Assign each finding one of these four levels:

| Severity | Meaning |
|---|---|
| **Critical** | Blocks production quality: no tests, no stories, `@ts-nocheck`, `console.log` in prod code, README missing entirely, runtime import with no matching declared dependency |
| **Important** | Significant quality gap: missing interactive tests, uncovered key use cases, unresolved suppressions without justification, large disorganised files, unused `dependencies`, `react`/`styled-components` in `dependencies` instead of `peerDependencies`, README exists but is missing major props / imperative APIs / usage examples, or contains stale information that contradicts the current source, missing MDX overview page, deprecated props not hidden in argTypes |
| **Minor** | Code smell or style issue: unused prop, commented-out code, a missing Code tab snippet, a `ts-expect-error` with comment, overly broad version ranges, minor README gaps (a missing default value, a missing sub-component section), MDX overview missing sections, controllable props missing argTypes |
| **Info** | Observation with no required action: suggestion for improvement, note about complexity |

### Step 5 — Produce the report

Format the report as follows:

---

## Package Audit: `<package-name>`

### Summary

| Dimension | Status | Findings |
|---|---|---|
| Dead Code | 🔴 / 🟡 / 🟢 | Short description |
| Unit Tests | 🔴 / 🟡 / 🟢 | e.g. "3 test files, missing hook tests" |
| Stories | 🔴 / 🟡 / 🟢 | e.g. "Stories exist, missing Code tab snippets" |
| Interactive Tests | 🔴 / 🟡 / 🟢 | e.g. "No play functions found" |
| Console Logs | 🔴 / 🟡 / 🟢 | e.g. "2 console.log calls" |
| TS Suppressions | 🔴 / 🟡 / 🟢 | e.g. "1 @ts-ignore, 0 @ts-nocheck" |
| ESLint Suppressions | 🔴 / 🟡 / 🟢 | e.g. "4 disable comments, 2 unjustified" |
| Code Organisation | 🔴 / 🟡 / 🟢 | e.g. "Main file 520 lines, logic not split" |
| Dependencies | 🔴 / 🟡 / 🟢 | e.g. "1 missing dep, 2 unused, react in dependencies" |
| README | 🔴 / 🟡 / 🟢 | e.g. "Missing, stale props, no usage example" |
| MDX Overview | 🔴 / 🟡 / 🟢 | e.g. "Missing overview page" or "Exists but missing import example" |
| ArgTypes | 🔴 / 🟡 / 🟢 | e.g. "2 deprecated props visible in controls, 3 booleans missing argTypes" |

🔴 = Critical issue present · 🟡 = Important or Minor issues · 🟢 = No issues

---

### Critical Findings

List each finding with:
- **[CRITICAL-N]** `path/to/file.tsx:line` — description of the problem

### Important Findings

- **[IMPORTANT-N]** `path/to/file.tsx:line` (or general) — description

### Minor Findings

- **[MINOR-N]** `path/to/file.tsx:line` — description

### Info

- **[INFO-N]** Observation or suggestion

---

### Step 6 — Create the fix plan

If there are any Critical or Important findings, produce a numbered action plan:

---

## Fix Plan

> Only Critical and Important issues are included. Minor and Info findings are left to the team's discretion.

### 1. [Short action title]
**Addresses:** CRITICAL-1, CRITICAL-2
**Files:** `path/to/file.tsx`
**What to do:** Concrete description of the change. Include what to write, where to write it, and why.

### 2. [Short action title]
...

---

Order actions from highest to lowest impact. Group related fixes (e.g., "add tests for X hook + Y util" as one action). Each action must be self-contained and implementable independently.

After presenting the report and plan, ask the user: *"Would you like me to start implementing the fix plan?"*
