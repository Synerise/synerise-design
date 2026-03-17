# Input (`@synerise/ds-input`)

> A family of enhanced input components — text input, textarea, password, multi-value tags, and auto-sizing — each wrapped in a `FormField` shell that adds label, description, error text, counter, and tooltip.

## Package structure

```
src/
  Input.tsx                   — main enhanced input (forwardRef to outer div)
  Input.types.ts              — BaseProps, InputProps, AutoResizeProp, StyledInput
  Input.styles.tsx            — all styled-components; also exports as InputStyles namespace
  TextArea.tsx                — enhanced textarea (FormField wrapper)
  TextArea.types.ts           — TextareaProps
  Textarea/
    Textarea.tsx              — DSRawTextArea styled component (inner implementation)
    Textarea.types.ts         — RawTextAreaProps (TextAreaProps is @deprecated alias)
    Textarea.styles.ts        — textarea styled-components
  InputGroup.tsx              — group wrapper for multiple inputs
  InputGroup.types.ts         — Props (extends Ant GroupProps)
  InputMultivalue/
    InputMultivalue.tsx       — tag-style multi-value input; Enter to add values
    InputMultivalue.types.ts  — InputMultivalueProps
    Elements/Value.tsx        — individual tag chip with remove button
  PasswordInput.tsx           — wraps Input with show/hide toggle (uses icon1 slot)
  PasswordInput.types.tsx     — PasswordInputProps, PasswordInputTexts
  AutosizeInput/
    AutosizeInput.tsx         — standalone auto-resizing <input> (not Ant Design based)
    AutosizeInput.types.ts    — AutosizeInputProps, AutosizeWrapperProps, AutosizeInputRefType
    utils/calculateInputWidth.ts
  components/
    AutosizeWrapper.tsx       — conditionally wraps input with autosize behaviour
    ElementIcons.tsx          — renders icon1/icon2 with Tooltip wrappers and expand icon
    ExpandableWrapper.tsx     — expandable textarea overlay shown when input text overflows
  hooks/
    useCounterLimit.tsx       — generates the counter display ReactNode (rightSide slot)
    useElementFocus.ts        — returns focus handler for icon click
    useInputAddonHeight.ts    — measures input height for matching addon/prefixel height
  utils/getCharCount.ts       — counts characters from controlled value
  index.ts                    — public exports
```

## Public exports

### `Input`

Enhanced text input with `FormField` wrapper. `forwardRef<HTMLDivElement, InputProps>` — **ref points to the outer wrapper `<div>`, not the `<input>` element**. Use `handleInputRef` to access the underlying `HTMLInputElement`.

Props (`InputProps` = `BaseProps & AntdInputProps`):

#### DS-specific props (`BaseProps`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | Field label (from `FormFieldCommonProps`) |
| `description` | `string` | — | Helper text below the input |
| `errorText` | `string` | — | Error message; also sets error styling |
| `error` | `boolean` | — | Sets error styling without a message |
| `tooltip` | `ReactNode` | — | Tooltip content on the label |
| `tooltipConfig` | `TooltipProps` | — | Tooltip configuration object |
| `counterLimit` | `number` | — | Max chars; shows `current/max` counter; blocks input at limit |
| `renderCustomCounter` | `(count?: number) => ReactNode` | — | Custom counter renderer (replaces default `current/max`) |
| `icon1` | `ReactElement` | — | Left action icon (inside the input, right side) |
| `icon1Tooltip` | `ReactElement` | — | Tooltip for `icon1` |
| `icon2` | `ReactElement` | — | Second action icon (stacks with `icon1`) |
| `icon2Tooltip` | `ReactElement` | — | Tooltip for `icon2` |
| `prefixel` | `ReactNode` | — | Attached left addon block (rendered via `addonBefore`; height matched to input) |
| `suffixel` | `ReactNode` | — | Attached right addon block (rendered via `addonAfter`; height matched to input) |
| `handleInputRef` | `(ref: MutableRefObject<HTMLInputElement \| null>) => void` | — | Callback receiving the underlying `<input>` ref after mount |
| `resetMargin` | `boolean` | — | Removes outer wrapper margin |
| `expandable` | `boolean` | — | Shows expand icon when text overflows; click opens a textarea overlay |
| `expandableTooltip` | `ReactNode` | — | Tooltip on the expand icon |
| `autoResize` | `AutoResizeProp` | — | Auto-sizes input width to its text content |
| `autoResizeProps` | `Partial<Pick<AutosizeInputProps, 'placeholderIsMinWidth' \| 'wrapperClassName' \| 'wrapperStyle' \| 'extraWidth'>>` | — | Fine-tuning for `autoResize` behaviour |
| `className` | `string` | — | Applied to the outer wrapper |

All standard Ant Design `InputProps` are also accepted and forwarded (e.g. `value`, `onChange`, `disabled`, `size`, `prefix`, `suffix`, `addonBefore`, `addonAfter`, `allowClear`, `defaultValue`, `type`, `onPressEnter`, etc.).

#### `AutoResizeProp`

```ts
type AutoResizeProp =
  | boolean
  | { minWidth: string; maxWidth?: string; stretchToFit?: boolean };
```

`stretchToFit: true` makes the input fill its containing element. **Important**: the flex parent must have `min-width: 0; flex-grow: 1` applied to work correctly.

### `RawInput`

Bare Ant Design `Input` that adds the DS `error` CSS class. No `FormField` wrapper, no label/description/counter.

```tsx
export const RawInput = (props: InputProps) => (
  <S.AntdInput className={props.error ? 'error' : ''} {...props} />
);
```

### `TextArea`

Enhanced textarea with `FormField` wrapper. Same label/description/error/counter/icon features as `Input`. Does **not** support `expandable`, `expandableTooltip`, `autoResize`, or `autoResizeProps` (these are omitted from `TextareaProps`).

`TextareaProps` = `RawTextAreaProps & Omit<BaseProps<HTMLTextAreaElement>, 'expandable' | 'expandableTooltip' | 'autoResize' | 'autoResizeProps'>`

`RawTextAreaProps` = Ant Design `TextAreaProps` + `error?: boolean`, `errorText?: string | ReactNode`, `wrapperStyle?: CSSProperties`, `resize?: ResizeProperty`

### `RawTextArea`

Styled Ant Design `TextArea` component (exported from `Input.styles.tsx`). No FormField wrapper.

### `DSRawTextArea`

The inner `Textarea/Textarea.tsx` raw DS textarea. Same API as `RawTextAreaProps`.

### `InputGroup`

Wraps Ant Design `Input.Group` with `FormField` support. Accepts `errors?: string[]` (array of error strings — each rendered as an `ErrorText`). Children are each wrapped in a `ds-input-group-item` div.

Props (`Props`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `compact` | `boolean` | `false` | Compact adjacent inputs (removes borders between them) |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | Applied to the Ant `Input.Group` |
| `errors` | `string[]` | — | Array of error messages displayed below the group |
| `resetMargin` | `boolean` | — | Removes outer wrapper margin |
| `label` | `ReactNode` | — | Group label |
| `description` | `string` | — | Helper text |
| `tooltip` | `ReactNode` | — | Tooltip on label |
| `tooltipConfig` | `TooltipProps` | — | Tooltip configuration |

### `InputMultivalue`

Tag-style input that accumulates values. Press **Enter** to add the current text as a new tag. Tags can be individually removed.

**Semi-controlled bug**: `selectedValues` state is initialised from the `values` prop on first render only. External changes to `values` after mount do **not** update the internal state.

Props (`InputMultivalueProps`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `values` | `string[]` | — | **Required.** Initial set of tag values |
| `onChange` | `(values: string[]) => void` | — | Called with the updated values array |
| `error` | `boolean` | — | Sets error styling |
| `errorText` | `ReactNode \| string` | — | Error message |
| `label` | `ReactNode \| string` | — | Field label |
| `description` | `ReactNode \| string` | — | Helper text |
| `disabled` | `boolean` | — | Disables interaction |
| `onBlur` | `() => void` | — | Called on blur |
| `onFocus` | `() => void` | — | Called on focus |
| `maxLength` | `number` | — | Max length of the current entry (not the total values count) |
| `className` | `string` | — | Applied to the input wrapper |

### `PasswordInput`

Wraps `Input` with a show/hide password toggle in the `icon1` slot. Accepts all `InputProps` except `icon1`, `icon1Tooltip`, `icon2`, `icon2Tooltip`, `suffixel`, `prefixel`, `type`, and `expandableTooltip`.

Additional prop: `texts?: Partial<PasswordInputTexts>` to override show/hide label strings. Defaults come from `react-intl` (`DS.INPUT.SHOW-PASSWORD` / `DS.INPUT.HIDE-PASSWORD`).

### `AutosizeInput`

Standalone auto-resizing `<input>` (not Ant Design based). Renders a hidden sizer element to measure text width and adjusts the input accordingly.

Props (`AutosizeInputProps`): Extends `InputHTMLAttributes<HTMLInputElement>` (omitting `size`) plus:

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | **Required.** The actual `<input>` element to resize |
| `placeholderIsMinWidth` | `boolean` | Use placeholder width as minimum width |
| `wrapperClassName` | `string` | Class on the wrapper div |
| `wrapperStyle` | `CSSProperties` | Style on the wrapper div |
| `extraWidth` | `number \| string` | Extra pixels added to the calculated width |
| `minWidth` | `number \| string` | Minimum width override |
| `onAutosize` | `(newWidth: number) => void` | Called after resize |
| `preAutosize` | `(newWidth: number) => void` | Called before resize |

`AutosizeInputRefType` (from `useImperativeHandle`):

```ts
{
  inputRef: MutableRefObject<HTMLInputElement | null>;
  sizerRef: RefObject<HTMLDivElement>;
  wrapperRef: RefObject<HTMLDivElement>;
  inputWrapperRef: RefObject<HTMLElement>;
  placeholderSizerRef: RefObject<HTMLDivElement>;
  copyInputStyles: () => void;
  updateInputWidth: () => void;
}
```

### `AutosizeWrapper`

Conditionally applies `AutosizeInput` behaviour when `autoResize` is truthy. Used internally by `Input`.

### `Label` _(deprecated)_

Re-export of `FormFieldLabel` from `@synerise/ds-form-field`. **Import directly from `@synerise/ds-form-field` instead.**

### `InputStyles`

Namespace export of all styled-components from `Input.styles.tsx`. Useful for extending via `styled(InputStyles.OuterWrapper)`.

### Types exported

| Export | Description |
|--------|-------------|
| `InputProps` | Main input props (`BaseProps & AntdInputProps`) |
| `BaseProps` | DS-specific additions to Ant inputs |
| `AutoResizeProp` | `boolean \| { minWidth, maxWidth?, stretchToFit? }` |
| `TextareaProps` | Enhanced textarea props |
| `InputMultivalueProps` | Multi-value tag input props |
| `AutosizeInputProps` | Standalone autosize input props |
| `AutosizeWrapperProps` | Autosize wrapper props |
| `AutosizeInputRefType` | Imperative ref shape for `AutosizeInput` |
| `PasswordInputProps` | Password input props |
| `PasswordInputTexts` | Show/hide text labels |
| `StyledInput` | Helper type for styled-component extensions of `Input` |
| `EnhancedProps` | **@deprecated** — use `InputProps` or `TextareaProps` |
| `Props` (from Input.types) | **@deprecated** — use `InputProps` or `TextareaProps` |

## Usage patterns

```tsx
import { Input, TextArea, InputGroup, InputMultivalue, PasswordInput } from '@synerise/ds-input';

// Basic input with label and counter
<Input
  label="Email"
  value={value}
  onChange={e => setValue(e.target.value)}
  counterLimit={100}
  errorText={error}
/>

// Password input
<PasswordInput
  label="Password"
  value={password}
  onChange={e => setPassword(e.target.value)}
/>

// Multi-value tags
<InputMultivalue
  label="Tags"
  values={tags}
  onChange={setTags}
/>

// Auto-resizing input
<Input
  value={value}
  onChange={e => setValue(e.target.value)}
  autoResize={{ minWidth: '80px', maxWidth: '400px' }}
/>

// Input with left/right addon blocks
<Input
  value={value}
  onChange={e => setValue(e.target.value)}
  prefixel={<span>https://</span>}
  suffixel={<span>.com</span>}
/>

// Group of inputs
<InputGroup label="Address" errors={errors} compact>
  <Input placeholder="Street" />
  <Input placeholder="City" />
</InputGroup>
```

## Custom hooks

### `useCounterLimit`

Generates the counter `ReactNode` (rendered in `FormField`'s `rightSide` slot). Returns a `<Counter>` element showing `charCount/counterLimit` or the result of `renderCustomCounter`. Returns `undefined` when neither prop is provided.

### `useElementFocus`

Returns a click handler that calls `.focus()` on the passed ref. Used to focus the input when an icon is clicked.

### `useInputAddonHeight`

Reads `inputRef.current.input.offsetHeight` after mount and returns `{ inputAddonHeight }`. Used to match the height of `prefixel`/`suffixel` addon blocks to the input.

## Styling

Styles live in `Input.styles.tsx` using `@synerise/ds-core` theme tokens. Error state is applied via `.error` CSS class on the Ant Design input. Icon padding is calculated dynamically: each icon adds 24 px + 4 px gap via `getIconsWidth`.

## Key dependencies

- `antd` — `Input`, `Input.Group`, and `TextArea` base components
- `@synerise/ds-form-field` — `FormField` wrapper providing label, tooltip, description, errorText slots
- `@floating-ui/react` — `useMergeRefs` for combining forwarded ref with internal wrapper ref
- `@synerise/ds-utils` — `useResizeObserver` for `stretchToFit` auto-resize
- `uuid` — generates a stable `id` per instance for `<label htmlFor>` association
- `react-intl` — default `showText`/`hideText` strings in `PasswordInput`

## Implementation notes

- **`Input` ref targets the outer `<div>`**, not the `<input>` element. Pass `handleInputRef` to get the `HTMLInputElement` ref.
- **`counterLimit` blocks input** — the `onChange` handler returns early when the new value would exceed the limit. The underlying Ant `input.maxLength` is **not** used.
- **`expandable` overlay**: when text overflows, an expand icon appears. Clicking it focuses a `<textarea>` overlay positioned over the input. On blur the textarea collapses and the value is synced back to the hidden input.
- **`autoResize` and `expandable` together**: `overflown` is computed from `AutosizeInput`'s reported width vs. `minWidth`, enabling the expand icon to appear correctly.
- **`InputMultivalue` is semi-controlled**: `selectedValues` initialises from `values` on mount only. To reset the values externally, pass a new `key` prop.
- **`@ts-expect-error`** in `ExpandableWrapper.tsx` for setting `.value` on `TextAreaRef` — the Ant Design type does not expose `.value` directly.
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
- **`Label` re-export is `@deprecated`**: import `FormFieldLabel` from `@synerise/ds-form-field` directly.
- **`DSRawTextArea`** (`RawTextArea as DSRawTextArea` in `index.ts`) is a second raw textarea export from the inner `Textarea/Textarea.tsx`; it is distinct from `RawTextArea` which comes from `Input.styles.tsx`.
