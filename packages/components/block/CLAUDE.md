# Block (`@synerise/ds-block`)

> **DEPRECATED.** Will receive no further updates and will be removed from a future DS version. Do not use in new code.

A minimal drag-placeholder item: renders an icon + label inside a grey card that switches to a dashed empty outline while being dragged. No known replacement — check with the DS team before any new usage.

## Package structure

```
src/
  Block.tsx        — @deprecated main component
  Block.types.ts   — BlockProps
  Block.styles.ts  — BlockWrapper, BlockContent, BlockName styled components
  index.ts         — default export only
```

## Public exports

### `Block` (default)

`@deprecated` — frozen, no further development planned.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode \| string` | _(required)_ | Label text displayed next to the icon. |
| `isDragging` | `boolean` | _(required)_ | When `true`, adds the `is-dragging` CSS class — hides icon and label, shows a dashed border outline. |
| `icon` | `ReactNode` | _(required)_ | Icon element rendered to the left of the label. |
| `className` | `string` | `undefined` | Extra class on the outer wrapper (always includes `ds-block`). |

`BlockProps` is **not** exported from `index.ts` — import directly from the source if needed:
```ts
import type { BlockProps } from '@synerise/ds-block/dist/Block.types';
```

## Usage patterns

```tsx
// ⚠️ DEPRECATED — avoid in new code
import Block from '@synerise/ds-block';

<Block isDragging={false} icon={<Icon component={<SomeIcon />} />}>
  Block label
</Block>
```

## Styling

`Block.styles.ts` uses `@synerise/ds-typography` `macro.h200` and `@synerise/ds-core` theme palette tokens:
- Default: grey-050 background, transparent border, grey-600 text.
- Hover: grey-800 text and icon colour.
- `is-dragging`: dashed grey-400 border, icon and label hidden (`display: none`).
- `BlockWrapper` uses `flex: 0 0 50%` — designed to sit in a two-column flex grid.

## Implementation notes

- **`isDragging` is required** — there is no default value in `BlockProps`. Omitting it causes a TypeScript error.
- **`icon` is required** — same, no default value.
- **`BlockProps` not re-exported** — `index.ts` only has `export { default }`. The types are only accessible via a direct dist path import.
- The component creates an internal `useRef<HTMLDivElement>` but never uses it for anything — it is not forwarded and no imperative handle is exposed.
