# Logic (`@synerise/ds-logic`)

> A clickable operator toggler (`AND`/`OR` or custom) and a matching-state toggle (`matching`/`not matching`) used in filter and condition builders.

## Package structure

```
src/
  Logic.tsx            — default export; cycles through operators on click
  Logic.types.ts       — LogicProps, LogicOperator, LogicOperatorValue, LogicSubComponents
  Logic.style.ts       — styled wrapper with dashed underline and hover colour
  Matching/
    Matching.tsx        — inline toggle for matching/not-matching state, supports sentence interpolation
    Matching.types.ts   — MatchingProps, MatchingTexts
    Matching.styles.ts  — MatchingWrapper + Toggle styled components
  Placeholder/
    Placeholder.tsx     — static display-only placeholder with a ClickM icon
    Placeholder.types.ts — PlaceholderType { text?: string }
    Placeholder.styles.ts — PlaceholderContainer styled component
  index.ts             — public barrel
  modules.d.ts         — ambient module declarations
```

## Public exports

```ts
export { default }         // Logic (default)
export { Matching }
export { Placeholder }
export type { LogicOperator, LogicOperatorValue, LogicProps }
export type { MatchingProps, MatchingTexts }
```

`Placeholder` and its types (`PlaceholderType`) are exported from `index.ts` as a named export but `PlaceholderType` is **not** re-exported from the barrel — only the component itself is.

### `Logic` (default export)

Renders an inline clickable text label. Each click advances `value` to the next operator in the `options` array, wrapping around.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `LogicOperatorValue` (`'AND' \| 'OR' \| string`) | — (required) | Currently active operator value |
| `onChange` | `(value: LogicOperatorValue) => void` | — (required) | Called with the next operator value on click |
| `options` | `LogicOperator[]` | `[{value:'AND', label: intl('AND')}, {value:'OR', label: intl('OR')}]` | Custom operator list; if omitted, uses i18n keys `DS.LOGIC.AND` / `DS.LOGIC.OR` |
| `readOnly` | `boolean` | `false` | Disables click handler and removes hover/underline styles |

`Logic.Matching` is attached as a static sub-component: `Logic.Matching = Matching`.

### `LogicOperator`

| Property | Type |
|----------|------|
| `value` | `string` |
| `label` | `string \| React.ReactNode` |

### `Matching` (also `Logic.Matching`)

Renders a sentence with an inline clickable toggle that flips between `matching` and `not matching`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `matching` | `boolean` | `true` | Current state |
| `onChange` | `(matching: boolean) => void` | — (required) | Called with the toggled boolean |
| `sentence` | `string` | — | Optional sentence containing `#MATCHING_TOGGLE#`; the placeholder is replaced with the toggle span inline |
| `texts` | `Partial<MatchingTexts>` | — | Override default i18n labels |
| `readOnly` | `boolean` | `false` | Disables click and hover styles |
| ...htmlAttributes | `React.HTMLAttributes<HTMLDivElement>` | — | Spread onto the wrapper `<div>` |

When `sentence` is omitted the component renders only the toggle span.

### `MatchingTexts`

| Property | Type | Default (i18n) |
|----------|------|----------------|
| `matching` | `string` | `'matching'` (`DS.MATCHING.MATCHING`) |
| `notMatching` | `string` | `'not matching'` (`DS.MATCHING.NOT-MATCHING`) |

### `Placeholder`

Static, non-interactive placeholder with a `ClickM` icon and a text label. Used to indicate an empty/unpopulated logic slot.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Label rendered next to the icon |

## Usage patterns

```tsx
import Logic from '@synerise/ds-logic';

// Basic operator toggle
<Logic value="AND" onChange={(v) => setValue(v)} />

// Read-only display
<Logic value="OR" onChange={() => {}} readOnly />

// Custom operators
<Logic
  value="INCLUDES"
  options={[{ value: 'INCLUDES', label: 'Includes' }, { value: 'EXCLUDES', label: 'Excludes' }]}
  onChange={(v) => setValue(v)}
/>

// Matching toggle inside a sentence
<Logic.Matching
  matching={isMatching}
  onChange={(v) => setMatching(v)}
  sentence="Find all items #MATCHING_TOGGLE# this condition."
/>

// Matching toggle standalone
<Logic.Matching matching={false} onChange={setMatching} />

// Placeholder
import { Placeholder } from '@synerise/ds-logic';
<Placeholder text="Click to add condition" />
```

## Styling

- `Logic`: `styled.div` — dashed bottom border via `::after` pseudo-element (grey-600, hidden in `readOnly`); hover changes text and border to `blue-700`.
- `Matching` toggle: `styled.span` — green (`green-600`/`green-700` hover) when `matching=true`, red (`red-600`/`red-700` hover) when `matching=false`; grey-800 when `readOnly`.
- Both use `user-select: none`.
- `Placeholder`: fixed `min-height: 63px`, white background, icon + text centered in a row.
- All colour values come from `theme.palette` tokens — no hardcoded hex values.

## Key dependencies

| Package | Role |
|---------|------|
| `@synerise/ds-typography` | `Title` (level 4) in Logic, `Text` in Placeholder |
| `@synerise/ds-icon` | `ClickM` icon in Placeholder |
| `@synerise/ds-utils` | `WithHTMLAttributes` utility type used in `MatchingProps` |
| `@synerise/ds-core` | `ThemeProps` type in styles; `theme` singleton for static colour in Placeholder |
| `react-intl` | Default i18n labels for both Logic and Matching |
| `styled-components` | All styling |

## Implementation notes

- **Operator cycling**: `Logic` uses `findIndex` on the operators array and wraps with modulo-equivalent logic — no external state; fully controlled component.
- **Sentence interpolation**: `Matching` searches for the literal string `'#MATCHING_TOGGLE#'` via `String.prototype.search` and slices the surrounding text into a three-element React array `[before, <Toggle/>, after]`. If the token is absent the toggle renders standalone.
- **i18n defaults**: Default labels are resolved via `useIntl()` with hardcoded `defaultMessage` fallbacks (`'matching'`, `'not matching'`). Custom `texts` are shallowly merged on top.
- **Test runner**: Jest (not Vitest) — `jest.config.js` present; tests live in `src/__specs__/`.
- **`Placeholder` types not re-exported**: `PlaceholderType` is used internally but is not listed in the `index.ts` type exports — consumers cannot import the type from the package.
