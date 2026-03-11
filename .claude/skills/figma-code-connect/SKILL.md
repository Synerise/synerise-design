---
name: figma-code-connect
description: Generate a Figma Code Connect file (*.figma.tsx) for a design system component
---

## Overview

Generate a `<ComponentName>.figma.tsx` file that connects a React component to its Figma design using the `@figma/code-connect` library.

## Arguments

The user must provide:
1. **Component name** — e.g., `Switch`, `Button`, `Avatar`

The user may optionally provide:
- **Figma URL** — the Figma node URL for the component (from Figma dev mode)
- Figma variant properties and their values
- Which props map to which Figma properties
- Nested component props (e.g., Label, Description sub-layers)

## Figma Design System File

- **File key:** `fsSZONXpVvtrDsCgtu01Jb`
- **URL pattern:** `https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=<nodeId>&m=dev`

## Workflow

### Step 1 — Locate the component

Find the component source files:

```
packages/components/<component-name>/src/<ComponentName>.tsx
packages/components/<component-name>/src/<ComponentName>.types.ts
packages/components/<component-name>/src/index.ts
```

Read these files to understand:
- The component's props interface (from `.types.ts`)
- Named exports and default export (from `index.ts` and the main component file)
- What the component renders and how props affect it

### Step 2 — Get Figma structure via MCP

If the Figma MCP server is available (tools like `mcp__figma__get_design_context` exist), use it to get the component details:

1. **If the user provided a Figma URL**, extract `fileKey` and `nodeId` from it.
2. **If no URL was provided**, search for the component using the Figma REST API:
   ```
   curl -s -H "X-Figma-Token: <token>" "https://api.figma.com/v1/files/fsSZONXpVvtrDsCgtu01Jb/component_sets" \
     | python3 -c "import sys,json; [print(json.dumps({...})) for cs in json.load(sys.stdin)['meta']['component_sets'] if '<name>' in cs['name'].lower()]"
   ```
3. **Call `mcp__figma__get_design_context`** with the `nodeId` and `fileKey` to get design context, screenshots, and code suggestions.
4. **If MCP suggests Code Connect mappings** (via `get_code_connect_suggestions`), follow the flow to map sub-components (like Button) and then use the returned design context.

**If the MCP server is NOT available**, fall back to:
- The Figma REST API via curl to get component_sets, component properties, and layer structure
- Ask the user for variant properties and values

### Key Figma properties to extract

From the component set's `componentPropertyDefinitions`:
- **VARIANT** properties — these become `variant: {}` keys in `figma.connect()`
- **BOOLEAN** properties — map with `figma.boolean('PropName', { true: ..., false: ... })`
- **TEXT** properties — map with `figma.string('PropName')` (note: Figma text props often have `✏️` emoji prefix)
- **INSTANCE_SWAP** properties — map with `figma.instance('LayerName')`

From the layer tree (depth exploration):
- Nested instances with their own properties (e.g., Button inside ActionArea)
- Text layers with `componentPropertyReferences` pointing to text properties
- Hidden layers controlled by boolean properties via `refs.visible`

### Step 3 — Generate the Code Connect file

Create `packages/components/<component-name>/src/<ComponentName>.figma.tsx` following these conventions:

#### File structure

```tsx
import figma from '@figma/code-connect';

import ComponentName from './ComponentName';
// Import any additional named exports needed (e.g., RawSwitch, ButtonGroup)

const FIGMA_URL = 'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=<nodeId>&m=dev';

// If there are reusable prop mappings shared across variants, define them as shared objects:
const baseProps = {
  label: figma.boolean('Show Header', {
    true: figma.string('✏️Header Text'),
    false: undefined,
  }),
};

// One figma.connect() call per variant combination that produces meaningfully different code
figma.connect(ComponentName, FIGMA_URL, {
  variant: { State: 'Default' },
  props: baseProps,
  example: (props) => <ComponentName {...mapped props} />,
});
```

#### Figma API mapping reference

Use these `figma.*` helpers to map Figma properties to React props:

| Figma property type | Helper | Example |
|---|---|---|
| String | `figma.string('PropName')` | `figma.string('Text')` |
| Boolean | `figma.boolean('PropName')` | `figma.boolean('Has Icon')` |
| Boolean → conditional | `figma.boolean('PropName', { true: value, false: undefined })` | Show/hide a prop based on Figma toggle |
| Enum → string | `figma.enum('PropName', { 'FigmaValue': 'react-value' })` | `figma.enum('Size', { 'Small': 'S', 'Medium': 'M' })` |
| Enum → boolean | `figma.enum('PropName', { 'Value': true })` | Used when a Figma enum maps to a boolean prop |
| Instance (slot) | `figma.instance('LayerName')` | `figma.instance('Icon')` |
| Children (auto slot) | `figma.children('LayerName')` | `figma.children('*')` for all children |
| Nested props | `figma.nestedProps('LayerName', { ... })` | Access sub-component properties |
| Class name | `figma.className([...])` | Combine into className prop |

#### Key rules

1. **One `figma.connect()` per distinct code output.** If two variant combos produce the same JSX, merge them. If they produce different JSX (different props, different components), keep them separate.
2. **Variant keys and values must match Figma exactly** — they are case-sensitive and may contain spaces.
3. **Use `figma.nestedProps`** when a Figma sub-layer (like `Label` or `Description`) has its own properties you need to access.
4. **Import the actual component** — the `example` must produce valid, copy-pasteable JSX that a developer would actually write.
5. **Boolean props** — if a Figma variant like `State: Selected` maps to a boolean React prop like `checked`, set it directly in the example: `<Switch checked />`.
6. **Disabled state** — if a Figma variant like `State: Disabled` maps to a `disabled` prop, set it directly. For components that pass disabled via sub-props (like `buttonProps`), use the correct nesting.
7. **Shared prop objects** — extract repeated prop configurations into shared const objects (e.g., `baseProps`) to avoid duplication across variant `figma.connect()` calls.
8. **Figma text property names** often have emoji prefixes like `✏️` — include these exactly as they appear in Figma.

### Step 4 — Register Code Connect mappings via MCP

If the MCP server is available and `mcp__figma__send_code_connect_mappings` is accessible:
1. After generating the file, use `get_code_connect_suggestions` to check if sub-components (like Button) need mapping
2. Search the codebase for matching components
3. Present matches to the user for approval
4. Call `send_code_connect_mappings` with the approved mappings

### Step 5 — Validate

After generating the file:
1. Verify the import paths are correct by checking what's exported from the component's `index.ts`
2. Ensure all variant property names and values match what Figma returns (from MCP or REST API)
3. Check that the generated JSX examples are valid and match how the component is actually used (based on its props interface)

### Step 6 — Report

Output:
- The path of the generated file
- A summary of how many `figma.connect()` calls were created and what variant combinations they cover
- Any assumptions made that the user should verify against their Figma file
- Whether Code Connect mappings were sent to Figma for sub-components
