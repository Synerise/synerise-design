# Radio (`@synerise/ds-radio`)

> Thin wrapper around Ant Design's `Radio`, adding a `label` prop (renders via `FormFieldLabel`), a `description` prop rendered below the radio, and group-level `fullWidth`/`big` layout variants.

## Package structure

```
src/
  Radio.tsx          — main component + Group + Button composition
  Radio.types.ts     — RadioProps, RadioGroupProps, deprecated Props alias
  Radio.styles.tsx   — styled-components
  index.ts           — public exports
  style/
    index.less       — Less styles (imported at runtime)
  __specs__/
    Radio.spec.tsx   — Jest tests
```

## Public exports

### `Radio` (default export)

Compound component: `Radio` + `Radio.Group` + `Radio.Button`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Renders label text via `FormFieldLabel`. Takes precedence over `children` |
| `description` | `ReactNode` | `undefined` | Additional text rendered below the radio in small grey text |
| `children` | `ReactNode` | `undefined` | **@deprecated** — use `label` instead. Only rendered when `label` is not provided |
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `undefined` | Initial uncontrolled checked state |
| `disabled` | `boolean` | `undefined` | Disables the radio; also dims `label` and `description` to 40% opacity |
| `value` | `any` | `undefined` | Value used by `Radio.Group` for comparison |
| `autoFocus` | `boolean` | `undefined` | Focuses the input on mount |
| + all Antd `RadioProps` | — | — | All props from `antd/lib/radio` |

### `Radio.Group`

Wraps `AntdRadio.Group` with two additional layout props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fullWidth` | `boolean` | `undefined` | Makes the group `display: flex; width: 100%` — each radio button gets `flex: 1` |
| `big` | `boolean` | `undefined` | When combined with `fullWidth`, sets button height to `48px` instead of `32px` |
| + all Antd `RadioGroupProps` | — | — | `value`, `defaultValue`, `onChange`, `options`, `disabled`, `name`, `size`, `buttonStyle`, etc. |

### `Radio.Button`

Direct re-export of `AntdRadio.Button` — no customisations. Use for segmented/toggle-button style radio groups.

### Types exported

| Type | Description |
|------|-------------|
| `RadioProps` | Props for `Radio` |
| `RadioGroupProps` | Props for `Radio.Group` |
| `Props` | **@deprecated** alias for `RadioProps` |

## Usage patterns

```tsx
import Radio from '@synerise/ds-radio';

// Basic radio with label and description
<Radio.Group value={selected} onChange={(e) => setSelected(e.target.value)}>
  <Radio value="a" label="Option A" description="Some extra context" />
  <Radio value="b" label="Option B" />
</Radio.Group>

// Full-width button group
<Radio.Group value={tab} onChange={(e) => setTab(e.target.value)} fullWidth big>
  <Radio.Button value="list">List</Radio.Button>
  <Radio.Button value="grid">Grid</Radio.Button>
</Radio.Group>

// Shorthand options
<Radio.Group options={['A', 'B', 'C']} value={val} onChange={handleChange} />
```

## Styling

Styles live in `Radio.styles.tsx`. Uses `@synerise/ds-core` theme tokens:
- `grey-600` — `Description` text colour
- `opacity: 0.4` applied on `disabled` to both `Label` and `Description`
- `Label` extends `FormFieldLabel` from `@synerise/ds-form-field`
- `AntRadioGroup` with `fullWidth` applies flex layout; `big` switches height to `48px`
- `AdditionalData` has a `@deprecated` comment in source but is still actively used as the margin wrapper for `Description`

Less overrides in `src/style/index.less` (imported at runtime).

## Key dependencies

- `antd` — `Radio`, `Radio.Group`, `Radio.Button` base components
- `@synerise/ds-form-field` — `FormFieldLabel` used for the `label` prop rendering
- `@synerise/ds-typography` — `macro.small` applied to `Description` font size

## Implementation notes

- **`label` vs `children`**: `label` takes precedence — if `label` is set, `children` is ignored entirely. `children` is marked `@deprecated` in the type file.
- **`Radio.Button` is unmodified**: `Radio.Button = AntdRadio.Button` with no custom styling or props.
- **`AdditionalData` styled-component** is marked `@deprecated` in its source comment but is still the live wrapper div for `Description` — the comment is misleading.
- **Tests use Jest** (`jest.config.js`) — not yet migrated to Vitest.
