# Form (`@synerise/ds-form`)

> **⚠️ Deprecated.** This entire package is deprecated in favour of `@synerise/ds-editable-items-list`. Do not add features; minimise changes.

## Package structure

```
src/
  Form.tsx                          — class component namespace (only purpose: holds Form.FieldSet)
  index.ts                          — public exports
  Elements/
    FieldSet/
      FieldSet.tsx                  — @deprecated labelled section with heading + optional divider
      FieldSet.types.ts             — FieldSetProps
      FieldSet.styles.ts            — TopWrapper, Heading, Description (NOTE: Description = 'div', not styled)
      __specs__/FieldSet.spec.tsx   — Jest tests (heading/description render, divider)
  EditableList/
    EditableList.tsx                — editable key-value row list (Autocomplete + Input per row)
    EditableList.types.ts           — EditListProps, EditableParam, AddButtonConfigProps
    EditableList.styles.tsx         — row/wrapper styled components
    __spec__/EditableList.spec.ts   — all tests are it.todo() — no real tests
```

## Public exports

### `Form` (default export)

Class component with no props. Its sole purpose is to expose `Form.FieldSet` as a static property. Do not render `<Form>` directly.

### `Form.FieldSet` _(deprecated)_

`@deprecated — FieldSet component will no longer be supported.`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `ReactNode` | — (required) | Heading text rendered in h400 style |
| `description` | `ReactNode` | — | Subtitle below heading |
| `children` | `ReactNode` | — | Content below the heading block |
| `withLine` | `boolean` | `undefined` | Renders a `Divider` with `marginTop={18}` between heading and children |
| `className` | `string` | — | Applied to the `TopWrapper` div |

### `EditableList` _(deprecated)_

A controlled list of editable key-value rows. Each row renders an `Autocomplete` (left) + `Input` (right) by default; every slot is replaceable via render props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `EditableParam[]` | — | Controlled rows array |
| `onChange` | `(params: EditableParam[]) => void` | — | Called after any name/value change |
| `leftColumnName` | `ReactNode` | — | Label shown above the first column (row 0 only) |
| `rightColumnName` | `ReactNode` | — | Label shown above the second column (row 0 only) |
| `autocompleteOptions` | `ReactNode` | — | Option children passed to the `Autocomplete` in each row |
| `onSearch` | `(query: string) => void` | — | Forwarded to `Autocomplete.onSearch` |
| `onClickDelete` | `DeleteHandler` | — | Custom delete handler; if absent, the row is removed from local state |
| `addButtonConfig` | `AddButtonConfigProps` | — | `{ textAddButton?, disableAddButton?, onClickAddRow? }` |
| `validation` | `{ validateLeftColumn?, validateRightColumn? }` | — | Return a `ReactNode` error message (or falsy) per field value |
| `firstInputProps` | `AutocompleteProps` | `{ style: { width: 350 } }` | Spread onto the Autocomplete; use to override width/style |
| `secondInputProps` | `InputProps` | `{ style: { width: 300 } }` | Spread onto the Input; use to override width/style |
| `renderAddButton` | `(params?) => JSX.Element` | — | Replaces the default "add row" button entirely |
| `renderLeftColumn` | `(param, index) => JSX.Element` | — | Replaces the Autocomplete for each row |
| `renderRightColumn` | `(param, index) => JSX.Element` | — | Replaces the Input for each row |
| `renderAdditionalColumn` | `(rows) => JSX.Element` | — | Appended after the two default columns in each row |
| `renderActions` | `boolean \| Function` | — | `true` = show a `Cruds` delete button; function = render custom actions |

### `EditableParam`

`{ name: string; value: string }` — shape of a single row.

### `EditListProps`

Full props type for `EditableList`.

## Usage patterns

```tsx
import Form, { EditableList } from '@synerise/ds-form';

// Form.FieldSet (deprecated)
<Form.FieldSet heading="Section" description="Details" withLine>
  <MyFormFields />
</Form.FieldSet>

// EditableList (deprecated)
const [rows, setRows] = useState([{ name: '', value: '' }]);

<EditableList
  value={rows}
  onChange={setRows}
  leftColumnName="Key"
  rightColumnName="Value"
  addButtonConfig={{ textAddButton: 'Add row' }}
  renderActions
/>
```

## Styling

- `FieldSet.styles.ts`: `Heading` uses `macro.heading` + `macro.h400` from `@synerise/ds-typography`. **`Description` is exported as the string `'div'`** (not a styled component) — this is intentional (renders a native `<div>`) but inconsistent with the rest of the pattern.
- `EditableList.styles.tsx`: plain flex wrappers, no theme tokens except `theme.palette['blue-600']` hardcoded in the add icon colour in `EditableList.tsx`.

## Key dependencies

- `@synerise/ds-autocomplete` — left column input (with options)
- `@synerise/ds-input` — right column input
- `@synerise/ds-cruds` — delete action button when `renderActions={true}`
- `@synerise/ds-divider` — optional line in `Form.FieldSet`
- `@synerise/ds-typography` — `macro.heading` / `macro.h400` for FieldSet heading styles

## Implementation notes

- **`Form` class renders nothing** — it exists only to provide the `Form.FieldSet` static property. Never render `<Form>` as a container.
- **`EditableList` is uncontrolled by default** — it maintains its own internal `params` state synced from `value` via `useEffect`. Changes propagate out via `onChange` but the component does not re-render from `value` alone unless the reference changes.
- **`renderActions={true}` vs function** — when `true`, uses `Cruds` delete button which calls `onClickDelete` if provided, otherwise removes the row from internal state. When a function, it receives `(param, idx, params, { onClickDelete })` and must return a `JSX.Element`.
- **No real tests** — `EditableList.__spec__/EditableList.spec.ts` contains only `it.todo()` entries.
- **Test runner is Jest** (not Vitest).
