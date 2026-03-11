---
name: storybook-code-tab
description: Add or update parameters.docs.source.code on Storybook stories to provide clean JSX code snippets in the Code tab
---

## Overview

Generate developer-friendly JSX code strings for the `parameters.docs.source.code` field on each exported story in a component's `*.stories.tsx` file. These strings appear in the custom Code panel (`packages/storybook/addon-code-panel/CodePanel.tsx`) and serve as copy-paste references for developers.

## Arguments

The user must provide:
1. **Component name** — e.g., `ActionArea`, `Badge`, `Toast`

The user may optionally provide:
- A specific story name to process (otherwise all stories are processed)
- A path to the story file if it differs from the standard location

## Workflow

### Step 1 — Locate the story file

Find the story file at the standard path:

```
packages/storybook/stories/components/<ComponentName>/<ComponentName>.stories.tsx
```

If not found, search with:
```
packages/storybook/stories/components/**/<ComponentName>.stories.tsx
```

Also check for associated data/constants files in the same directory (e.g., `<ComponentName>.data.tsx`, `<ComponentName>.constants.ts`) — these may contain helpers referenced by stories.

**Skip** any `.test.stories.tsx` or `.tests.stories.tsx` files — those are visual/interaction test stories.

### Step 2 — Read and analyze the file

Read the complete story file. Identify:

1. **Meta/default export** — extract:
   - `component` field (the primary component name for JSX tags)
   - `render` function at the meta level (default render for all stories)
   - `args` at the meta level (default args inherited by all stories)
   - `argTypes` (to understand prop types)

2. **All named story exports** — for each, extract:
   - `args` (including spread references like `...Default.args`)
   - `render` function (story-level override)
   - Existing `parameters.docs.source.code` (updating vs adding)
   - Spread from other stories (e.g., `...Default`, `...Simple`)

3. **Imports** — note which components and icons are imported, as the code snippet should reference the same names. Prefer direct named imports (e.g., `Expander`) over deprecated compound component syntax (e.g., `Button.Expander`).

4. **Existing code snippets** — if a story already has `parameters.docs.source.code`, still verify it matches the current imports, args, and render. Update it if the component name, props, or structure have changed.

### Step 3 — Classify each story

**Category A: Args-only** (no custom render, or meta-level render that just does `<Component {...args} />`)
→ Generate `<Component prop1="value" prop2={123} />`

**Category B: Simple custom render**
→ Read the render JSX, substitute args values, produce concrete example

**Category C: Showcase/map render** (renders multiple component instances, maps over arrays)
→ Generate a simplified representative snippet showing the pattern

**Category D: Visual test / matrix — SKIP**
Stories named `*Matrix*`, `*MatrixHover*`, `*MatrixFocus*`, or with `tags: ['visualtests']`.
Do not add `parameters.docs.source.code` to these.

### Step 4 — Resolve effective args

For each non-skipped story, compute the final args by resolving:

1. **Meta-level `args`** — base defaults from the default export
2. **Spread references** — resolve `...Default.args`, `...WithTotal.args`, etc. by looking up the referenced story. Chain through multiple levels if needed.
3. **Story-level `args`** — override everything above
4. **Full story spread** — if a story uses `...Default` (spreading the entire story object, not just args), it inherits render, args, parameters, etc.

### Step 5 — Generate the code string

#### Prop serialization rules

| Value type | Output |
|---|---|
| String `'Label'` | `prop="Label"` |
| Boolean `true` | `prop` (shorthand) |
| Boolean `false` | `prop={false}` |
| Number `123` | `prop={123}` |
| Function `fn()` | `prop={fn()}` |
| Object `{ key: 'value' }` | `prop={{ key: 'value' }}` |
| JSX expression | Inline as-is |
| Theme ref `theme.palette['green-600']` | Keep as-is |

#### Category A — args-only

```
<ComponentName
  prop1="stringValue"
  prop2={123}
  prop3
  prop4={fn()}
/>
```

If args include `children`, use closing tag form:
```
<ComponentName prop1="value">
  {children}
</ComponentName>
```

**Prop completeness:** Include ALL props from the resolved args in the code snippet. Do not selectively omit props. The only exceptions are:
- `children` (rendered as JSX children, not a prop)
- Props with `undefined` value
- Empty strings (`''`) — omit these as they represent "no value"
- Boolean `false` where the prop defaults to `false` — omit these as they are redundant

Include `prop={false}` ONLY when the prop defaults to `true` (i.e., the `false` is an intentional override). To determine defaults, check the component's `defaultProps`, the meta-level `args`, or the `argTypes` configuration. When in doubt about the default, include the prop.

**Prop order:** Follow the order they appear in the story's `args` object. Spread args first, then overrides.

#### Category B — simple custom render

Read the render function's JSX. Substitute args values to produce a concrete example. Replace `{...args}` spread with the actual resolved prop values. Ensure ALL args that are passed via `{...args}` spread appear as explicit props in the code snippet — do not omit any.

Example: render `({ status }) => <Badge status={status} text="test" />` with args `{ status: 'active' }` → `<Badge status="active" text="test" />`

#### Category C — showcase/map render

Show the pattern with a literal array:
```
<>
  {['success', 'warning', 'error'].map(type => (
    <Alert message="Message" type={type} />
  ))}
</>
```

### Step 6 — Format and update the file

Use **multiline backtick template literals** (the majority convention in this codebase):

```tsx
parameters: {
  docs: {
    source: {
      code: `<ComponentName
  prop1="value"
  prop2={123}
/>`
    }
  }
}
```

**Consistency rule:** If the file already has stories with `parameters.docs.source.code` using escaped `\n` strings (like ActionArea), match that format. Otherwise use the multiline backtick format.

**Updating the file with Edit tool:**

- **Story already has `parameters.docs.source.code`** → replace the existing `code` value
- **Story has `parameters` but no `docs.source.code`** → add `docs: { source: { code: ... } }` inside existing `parameters`
- **Story has no `parameters`** → add the entire `parameters` block as the first field in the story object (before `args`, `render`, etc.)
- **Skipped stories (Category D)** → leave untouched

### Step 7 — Verify and report

After all edits:
1. Re-read the file to confirm the edits are syntactically valid (matching braces, no duplicate keys)
2. Check that every non-skipped story has `parameters.docs.source.code`
3. Ensure backticks in code strings are escaped if the code itself contains template literals

Output:
- The file path modified
- Summary table of stories: name, category, action (Added / Updated / Skipped)
- Any assumptions made that the user should verify
- Reminder to check in Storybook: `pnpm run storybook`
