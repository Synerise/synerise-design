# Footer (`@synerise/ds-footer`)

> Minimal semantic `<footer>` wrapper with a `grey-200` top border and 16px vertical padding — designed to hold action buttons or status content at the bottom of a panel or page.

## Package structure

```
src/
  Footer.tsx        — component + FooterProps type
  Footer.styles.ts  — single styled-component (footer element)
  index.ts          — default export
  Footer.spec.tsx   — Jest tests
```

## Public exports

### `Footer` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Content rendered inside the footer |
| `style` | `CSSProperties` | `undefined` | Inline style override |
| `className` | `string` | `undefined` | CSS class override |

No `forwardRef` — the underlying DOM element is not exposed.

## Usage patterns

```tsx
import Footer from '@synerise/ds-footer';
import Button from '@synerise/ds-button';

<Footer>
  <Button type="primary">Save</Button>
  <Button>Cancel</Button>
</Footer>
```

## Styling

Single styled-component in `Footer.styles.ts`:
- `padding: 16px 0`
- `border-top: 1px solid` using `@synerise/ds-core` `grey-200` token

## Implementation notes

- This is a pure layout shell — it applies no flex/grid layout to children. Arrange children with `Flex`/`Box` or CSS inside.
- Uses **Jest** (not Vitest) — `jest.config.js` present; predates Vitest migration.
- `FooterProps` is defined inline in `Footer.tsx` and not exported from `index.ts`.
