# ColorPicker (`@synerise/ds-color-picker`)

> An input-triggered dropdown color picker built on `react-colorful`, with hex input, copy-to-clipboard, and optional saved color swatches.

## Package structure

```
src/
  ColorPicker.tsx       — main component; all state, dropdown, and trigger logic
  ColorPicker.types.ts  — ColorPickerProps, ColorPickerSize enum, ColorHookType
  ColorPicker.styles.ts — all styled-components + createGlobalStyle for maxWidth
  utils.ts              — color validation and conversion utilities
  index.tsx             — default export + ColorPickerProps type export
  __specs__/
    ColorPicker.spec.tsx — component + utility unit tests (Vitest)
```

## Public exports

### `ColorPicker` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Controlled color value. Accepts hex (`#fff`, `#ffffff`) or CSS named colors (`red`). |
| `onChange` | `(color: string) => void` | `undefined` | Called with a normalised 6-digit hex string on every valid change. |
| `colors` | `string[]` | `[]` | Initial saved color swatches. Local copy is maintained in component state. |
| `onSaveColors` | `(colors: string[]) => void` | `undefined` | Called when the user saves a new swatch. Receives the full updated array. |
| `maxSavedColors` | `number` | `9` | Maximum number of swatches. Older entries are dropped from the front. |
| `isShownSavedColors` | `boolean` | `undefined` | Shows the divider + swatch section below the hex input. |
| `infix` | `(colorHooks?: Partial<ColorHookType>) => JSX.Element` | `() => <></>` | Render slot between the save button and the swatches (e.g. color-format converter). Receives `{ color, setColor }`. |
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | Height of the `react-colorful` picker: S=136px, M=168px, L=200px. |
| `maxWidth` | `number` | `undefined` | When `>= 228`, injects a `createGlobalStyle` to constrain `.color-picker-overlay` to this width. |
| `placeholder` | `string` | `undefined` | Input placeholder text. |
| `tooltip` | `{ copy: string; copied: string }` | `undefined` | Tooltips for the copy-to-clipboard icon inside the dropdown hex input. |
| `error` | `boolean` | `undefined` | Error state on the trigger input. |
| `errorText` | `string` | `undefined` | Error message below the trigger (from `FormFieldCommonProps`). |
| `description` | `string` | `undefined` | Description text below the trigger (from `FormFieldCommonProps`). |
| `disabled` | `boolean` | `undefined` | Disables the input. **Dropdown is not rendered at all** when `true`. |
| `readOnly` | `boolean` | `undefined` | Makes the input read-only. **Dropdown is not rendered at all** when `true`. |
| `inputProps` | `Omit<InputProps, 'value'\|'onChange'\|'defaultValue'\|'placeholder'\|'disabled'\|'readOnly'\|'prefix'\|keyof FormFieldCommonProps>` | `undefined` | Extra props forwarded to the trigger `Input`. |
| `getPopupContainer` | `(triggerNode: HTMLElement) => HTMLElement` | `defaultGetPopupContainer` from `@synerise/ds-utils` | Portal target for the dropdown. |

### `ColorPickerProps`

Type exported from `index.tsx`.

### `ColorHookType` _(not in index.tsx)_

Type used for the `infix` render prop: `{ color: string; setColor: (color: string) => void }`. Not exported from `index.tsx` — import from `@synerise/ds-color-picker/dist/ColorPicker.types` if needed, or declare inline.

## Usage patterns

```tsx
import ColorPicker from '@synerise/ds-color-picker';

// Controlled basic usage
const [color, setColor] = useState('#00ffff');
<ColorPicker value={color} onChange={setColor} />

// With saved swatches and copy tooltip
const [color, setColor] = useState('#00ffff');
const [savedColors, setSavedColors] = useState<string[]>([]);
<ColorPicker
  value={color}
  onChange={setColor}
  colors={savedColors}
  onSaveColors={setSavedColors}
  isShownSavedColors
  maxSavedColors={9}
  tooltip={{ copy: 'Copy', copied: 'Copied!' }}
  size="S"
  description="Brand colour"
/>

// With infix slot (e.g. format converter between save button and swatches)
<ColorPicker
  value={color}
  onChange={setColor}
  isShownSavedColors
  infix={({ color, setColor }) => (
    <Select ... onChange={setColor} />
  )}
/>
```

## Styling

All styles are in `ColorPicker.styles.ts`. Uses `theme.palette` tokens for borders, backgrounds, and text. `react-colorful` internal class names (`.react-colorful__*`) are overridden directly inside the `Container` styled-component.

`ColorPickerModalStyle` is a `createGlobalStyle` that targets `.color-picker-overlay` — it is only injected into the DOM when `maxWidth >= 228`. This is a **global CSS side-effect**.

`SwatchSectionWrapper` has a CSS bug: `alignitems: center` instead of `align-items: center` — the flex alignment is silently ignored.

## Key dependencies

- `react-colorful` (`HexColorPicker`) — the core colour-gradient picker UI
- `@synerise/ds-dropdown` — popover/overlay shell for the picker panel
- `@synerise/ds-input` — trigger text input and the hex input inside the dropdown
- `@synerise/ds-tags` + `@synerise/ds-copy-icon` — swatch chips and copy button
- `@synerise/ds-form-field` — `FormFieldCommonProps` for `description`/`errorText`
- `@synerise/ds-utils` (`useOnClickOutside`, `getPopupContainer`) — click-outside close, default portal target

## Implementation notes

- **`disabled`/`readOnly` bypass the Dropdown entirely** — when either is set, the component returns just the trigger `Input` directly (no `Dropdown` wrapper). Opening the picker is impossible.
- **Dual color state** — `colorTextInput` (what the user typed / named color) and `colorHexInput` (the normalised hex shown in the dropdown) are kept in sync. `lastValidHexColor` drives the `react-colorful` picker and the preview tag — it only updates on valid input.
- **`onBlur` resets to last valid** — if the user types an invalid color in the trigger input and blurs, both inputs revert to `lastValidHexColor`.
- **Initial sync is one-time** — `useEffect` with empty deps `[]` runs only on mount to initialise local state from `value`. After that, `value` changes are **not** automatically reflected (the component is semi-controlled). Pass `value` and handle `onChange` consistently.
- **`standardizeColor` uses `document.createElement('canvas')`** — browser-only. Will throw in SSR/Node environments.
- **`isValidTextColor` uses `new Option().style`** — also browser-only.
- **`maxWidth` threshold** — the prop only takes effect when `>= 228` (the default picker width). Values below 228 are silently ignored.
- **`@ts-ignore` on Tags `selected` prop** — the swatch color entries are passed as tag items but the typing doesn't align. Line 168 of `ColorPicker.tsx`.
- **`savedColors` is local state** — `colors` prop initialises the local `savedColors` state on mount only. Subsequent `colors` prop changes are not reflected unless the component remounts.
