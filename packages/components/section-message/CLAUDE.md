# SectionMessage (`@synerise/ds-section-message`)

> A themed alert/banner component that displays a message with a type-specific icon, optional description, actions, and a close button.

## Package structure

```
src/
 SectionMessage.tsx — main component
 SectionMessage.types.ts — prop types and union types
 SectionMessage.const.tsx — ICONS map and DEFAULT_ICON
 SectionMessage.styles.tsx — styled-components
 SectionMessage.utils.tsx — color helpers and isSectionType guard
 index.ts — public exports
 modules.d.ts — jest-dom augmentation
 __specs__/
 SectionMessage.spec.tsx — Vitest tests
```

## Public exports

```ts
export default SectionMessage;
export type { SectionMessageProps, SectionType, CustomColorType };
```

### `SectionMessage`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `SectionType` | — (required) | Visual variant; drives background, border and icon colours |
| `message` | `ReactNode` | — | Bold heading text |
| `description` | `ReactNode` | — | Regular-weight body text rendered below the message |
| `icon` | `ReactNode` | type-derived icon | Overrides the automatic icon for the given type |
| `customIcon` | `ReactElement` | — | Renders the element directly (bypasses `<Icon>` wrapper); takes precedence over `icon` |
| `customColor` | `CustomColorType` | — | Overrides the background and border colours via `resolveCustomColor` (`--ds-color-custom-*` tokens) |
| `customColorIcon` | `CustomColorType` | — | Overrides the icon and top-border colour |
| `showMoreLabel` | `ReactNode` | — | Label for the "show more" link; only rendered when `onShowMore` is also provided |
| `onShowMore` | `() => void` | — | Click handler for the "show more" link; requires `showMoreLabel` |
| `onClose` | `() => void` | — | Called when the close button is clicked; only active when `withClose` is truthy |
| `withClose` | `ReactNode` | — | When truthy, shows a close (`CloseM`) button; actual value is unused — only truthiness matters |
| `suffixel` | `ReactNode` | — | Content placed in the right-hand action area, before the close button |
| `moreButtons` | `ReactNode` | — | Additional action buttons rendered inside the content area |
| `withEmphasis` | `ReactNode` | — | Bold inline content; only rendered when `withLink` is falsy |
| `withLink` | `ReactNode` | — | Underlined link content; rendered instead of `withEmphasis`; also adjusts content area padding |
| `unorderedList` | `ReactNode` | — | List content; only rendered when `moreButtons` is falsy |
| `color` | `ColorType` | — | **Deprecated** — use `customColor` instead |

All standard `HTMLDivElement` attributes are forwarded to the root `<div>` via `WithHTMLAttributes`.

### Type aliases

```ts
type SectionType = 'positive' | 'notice' | 'negative' | 'neutral' | 'supply' | 'service' | 'entity';

type CustomColorType =
 | 'blue' | 'grey' | 'red' | 'green' | 'yellow'
 | 'pink' | 'mars' | 'orange' | 'fern' | 'cyan' | 'purple' | 'violet';

/** @deprecated */
type ColorType = 'grey' | 'red' | 'green' | 'yellow' | 'violet' | 'purple' | 'cyan';
```

## Usage patterns

```tsx
import SectionMessage from '@synerise/ds-section-message';

// Basic
<SectionMessage type="negative" message="Payment failed" description="Please check your card details." />

// With close button
<SectionMessage type="notice" message="Maintenance window" withClose onClose={() => setVisible(false)} />

// Custom colour override
<SectionMessage type="neutral" message="Info" customColor="pink" customColorIcon="pink" />

// Show more + suffix actions
<SectionMessage
 type="positive"
 message="Import complete"
 showMoreLabel="See details"
 onShowMore={handleDetails}
 suffixel={<Button>Undo</Button>}
/>
```

## Styling

`AlertMessage` and `AlertDescription` use the shared `message` module for every type: `var(--ds-message-text-title)` and `var(--ds-message-text-description)`.

All other colours come from `var(--ds-section-message-variant-<variant>-{bg,border,bordertop,icon})` tokens (`SectionMessage.utils.tsx`), with `type` mapped to a token variant:

| `type` | Token variant |
|--------|---------------|
| `positive` | `success` |
| `negative` | `error` |
| `notice` | `warning` |
| `neutral` | `informative` |
| `supply` | `supply` |
| `service` | `service` |
| `entity` | `entity` |

An unknown `type` (untyped consumer data) falls back to the `informative` variant, as `neutral` does.

When `customColor` / `customColorIcon` are set, they go through `resolveCustomColor` (`@synerise/ds-utils`) to the `--ds-color-custom-*` tokens (background shade `50`, border `200`, icon/top-border `600`) and fully override the type-derived values.

Links inside `description` take the description colour and are underlined in every state, like the `withLink` slot, so the global `a` colours from ds-core's reset do not apply.

The component has a `border-radius: 2px` and a thicker `border-top: 2px` that carries the accent colour.

Several styled components (`NumberWrapper`, `OrderWrapper`, `IconOrderWrapper`, `Wrapper`) are defined in `SectionMessage.styles.tsx` but are not used in `SectionMessage.tsx` — they appear to be legacy/unused.

## Key dependencies

- `@synerise/ds-icon` — `Icon` wrapper component plus icon components (`Check2M`, `WarningM`, `InfoM`, `NotificationsReceiveM`, `UpdateDataM`, `UserUpM`, `CloseM`)
- `@synerise/ds-utils` — `WithHTMLAttributes` utility type
- `@synerise/ds-core` — `ThemePropsVars` (for colour helpers); `renderWithProvider` in tests, from its `/testing` subpath

## Implementation notes

- `customIcon` takes a `ReactElement` and is rendered directly as a child of `IconWrapper`, bypassing the `<Icon component={..}>` wrapper. `icon` (type `ReactNode`) is passed as the `component` prop to `<Icon>`.
- `withClose` controls visibility of the close button but the close action fires `onClose` — both props must be set together for the button to work.
- `showMoreLabel` is only rendered when `onShowMore` is also provided (both must be truthy).
- `unorderedList` is suppressed when `moreButtons` is truthy.
- `withEmphasis` is suppressed when `withLink` is truthy.
- The `data-testid` on the root element is `ds-section-message-${type}`.
- `isSectionType` is a type-guard used internally to validate the `type` prop before indexing `ICONS`.
- The package uses **Jest** (not Vitest) for testing.
