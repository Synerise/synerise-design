---
name: overview-mdx
description: Add or update an MDX overview documentation page for a component in Storybook, detailing usage patterns, API surface, and implementation guidance.
---

## Overview

Create or update a component's MDX overview page in Storybook (`packages/storybook/stories/components/<PascalName>/<PascalName>.mdx`). This page appears as the "Overview" tab (configured via `docs.defaultName: 'Overview'` in `.storybook/main.ts`) and serves as the primary developer-facing documentation for consuming the component.

## Arguments

The user must provide:
1. **Package name** — e.g., `modal`, `button`, `progress-bar` (kebab-case directory name under `packages/components/`)

The user may optionally provide:
- Specific sections or topics to emphasise
- Known usage caveats to document

If the package name was not provided, ask: *"Which package would you like to create an overview page for? (e.g. modal, button, popover)"*

## Workflow

### Step 1 — Read all source material

Read the component source and existing documentation to understand the full API surface:

```
packages/components/<package-name>/src/         ← component source (all .tsx/.ts files)
packages/components/<package-name>/CLAUDE.md    ← AI reference doc (rich context)
packages/components/<package-name>/README.md    ← existing docs (if present)
packages/storybook/stories/components/<PascalName>/  ← all story files
```

From the source, extract:
- All exported components and their props (from `index.ts` and `*.types.ts`)
- Sub-components and compound patterns
- Custom hooks exposed to consumers
- Context/Provider requirements
- Key dependencies that affect usage (e.g., requires `DSProvider` wrapper)

From the stories, extract:
- All named story exports (these become `Canvas` examples)
- Which stories best illustrate key use cases
- The meta export (needed for `<Meta>` tag)

### Step 2 — Check for existing MDX

Look for an existing file at:
```
packages/storybook/stories/components/<PascalName>/<PascalName>.mdx
```

Also check for alternate names: `<PascalName>.overview.mdx`, `<PascalName>.docs.mdx`.

- If found → read it, preserve accurate content, update outdated sections.
- If not found → create a new file.

### Step 3 — Plan the page structure

Select which story variants to embed as `Canvas` examples. Choose stories that:
1. Show the **default/minimal** usage (always include)
2. Demonstrate each **major variant** or mode (e.g., stacked vs side-by-side, inline vs block)
3. Illustrate **compound usage** patterns (sub-components, context, slots)
4. Show **interactive behaviour** if relevant (controlled mode, callbacks)

Do NOT embed every story — pick the 3–7 most instructive ones. Visual test stories (`*Matrix*`, `tags: ['visualtests']`) and `.tests.stories.tsx` stories must never be embedded.

### Step 4 — Write the MDX file

Use this structure (adapt based on component complexity — omit sections that don't apply):

```mdx
import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import { StoryName1, StoryName2 } from './<PascalName>.stories';
// Import from .tests.stories ONLY if a specific interaction demo is needed
// Import the meta for the <Meta> tag:
import <PascalName>Meta from './<PascalName>.stories';

<Meta component={ComponentImport} of={<PascalName>Meta} />

# <ComponentName>

<1-2 sentence description of what the component does and when to use it.>

## Quick overview

- <Bullet points covering the key concepts a developer needs to know>
- <How to import and use the component>
- <Any required wrapper/provider>
- <Key behavioural modes (e.g., controlled vs uncontrolled)>

## Basic example

<Canvas of={Default} sourceState="shown" />

## <Variant/Feature name>

<Brief explanation of this variant or feature.>

<Canvas of={VariantStory} sourceState="shown" />

<!-- Repeat for each major variant/feature -->

## API reference

### `<ComponentName>`

<Brief description.>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `propName` | `type` | `default` | What it does |

<!-- Add tables for sub-components if they have their own props -->

### `<SubComponentName>` _(if applicable)_

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ... | ... | ... | ... |

### Exported types _(if applicable)_

| Type | Description |
|------|-------------|
| `TypeName` | What it represents |

## Notes & tips

- <Non-obvious implementation details>
- <Common gotchas>
- <Accessibility considerations>
- <Performance tips for large datasets, etc.>
```

#### Writing rules

1. **Imports must be valid.** Only import story exports that actually exist in the story file. Verify each story name against the actual named exports.
2. **`sourceState="shown"`** — use on the primary example so the code is visible by default. Omit on subsequent examples to keep the page scannable (users can expand them).
3. **Props tables must match the source.** Cross-reference every prop against the current `*.types.ts` file. Include type, default, and description. Do not invent props.
4. **Be concise.** This is a reference page, not a tutorial. Use bullet points and tables over paragraphs.
5. **Use the component's npm package name** in import examples: `import Component from '@synerise/ds-<package-name>'`.
6. **Do not duplicate story content.** The `Canvas` component renders the story inline — describe *why* a pattern matters, not *what* the code does line-by-line.
7. **Preserve accurate existing content** when updating. Only change sections that are outdated or incomplete.

### Step 5 — Remove `autodocs` tags from story files

A manual MDX page replaces the auto-generated docs page. If any story file for this component has `tags: ['autodocs']` in its meta (default export), **remove the `autodocs` tag**. Leaving it in causes a Storybook warning:

> You created a component docs page for '...', but also tagged the CSF file with 'autodocs'. This is probably a mistake.

Check all `*.stories.tsx` files (excluding `*.test.stories.tsx`) in the component's stories directory and remove `'autodocs'` from the `tags` array. If `autodocs` is the only tag, remove the entire `tags` property.

### Step 6 — Verify the file

After writing:
1. Re-read the MDX file to confirm all imports reference real exports.
2. Verify that the story file actually exports the names referenced in `import` and `<Canvas of={...} />`.
3. Check that all prop tables match the current types file.

### Step 7 — Preview and report

1. Call the **preview-stories** MCP tool to generate preview URLs for the component's stories, so the user can verify the overview page renders correctly.
2. Include all returned preview URLs in your response.

Output:
- The file path created or updated
- Summary of sections included
- List of stories embedded as Canvas examples
- Any assumptions or gaps the user should verify
- Preview URLs for visual verification
