# Skeleton (`@synerise/ds-skeleton`)

> A set of loading placeholder components (skeleton loaders) for text, checkboxes, dropdowns, ordered lists, and avatars, each rendering animated shimmer bars.

## Package structure

```
src/
  Skeleton.tsx                    — default text skeleton; configurable count, size, width
  Skeleton.types.ts               — SkeletonProps + SkeletonSize/WidthSize/StartOffsetSize enums
  Skeleton.styles.ts              — shared BackgroundGradient + bar/wrapper styled-components
  CheckboxSkeleton/               — skeleton with a real Checkbox + skeleton bars beside it
    CheckboxSkeleton.tsx
    CheckboxSkeleton.types.ts     — CheckboxSkeletonProps + SkeletonSize enum
    CheckboxSkeleton.styles.ts
  DropdownSkeleton/               — skeleton for dropdown list items
    DropdownSkeleton.tsx
    DropdownSkeleton.types.ts     — DropdownSkeletonProps + SkeletonSize enum
    DropdownSkeleton.styles.ts
  OrderedListSkeleton/            — skeleton for ordered list rows (reuses CheckboxSkeletonProps)
    OrderedListSkeleton.tsx
    OrderedListSkeleton.styles.ts
  SkeletonAvatar/                 — circular or square avatar skeleton
    SkeletonAvatar.tsx
    SkeletonAvatar.types.ts       — SkeletonAvatarProps + SkeletonSize/LeftSize enums
    SkeletonAvatar.styles.ts
  __specs__/
    Skeleton.spec.tsx             — Jest tests
  index.ts                        — public exports
```

## Public exports

### `Skeleton` (default export)

Text/bar skeleton. Renders `numberOfSkeletons` stacked bars.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | Height of each bar (S=14px, M=16px, L=32px) |
| `width` | `'M' \| 'L'` | — | Fixed bar width (M=60px, L=140px); if omitted, bar fills container |
| `height` | `number` | — | Override bar height in px (takes precedence over `size`) |
| `numberOfSkeletons` | `number` | `2` | Number of skeleton bars to render |
| `className` | `string` | — | Applied to the container |

### `CheckboxSkeleton`

Skeleton with a real `Checkbox` beside animated bars.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | Bar height (S=14px, M=16px, L=30px) |
| `numberOfSkeletons` | `number` | `2` | Number of skeleton bars |
| `className` | `string` | — | Applied to the container |

### `DropdownSkeleton`

Skeleton for dropdown list items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | Bar height (S=14px, M=16px, L=30px) |
| `numberOfSkeletons` | `number` | `3` | Number of skeleton rows |
| `className` | `string` | — | Applied to the container |

### `OrderedListSkeleton`

Skeleton for ordered list rows. Uses `CheckboxSkeletonProps` internally (no separate type exported).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | Bar height |
| `numberOfSkeletons` | `number` | `4` | Number of skeleton rows |
| `className` | `string` | — | Applied to the container |

### `SkeletonAvatar`

Circular or square avatar placeholder.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'S' \| 'M' \| 'L' \| 'XL'` | `'M'` | Diameter (S=24px, M=40px, L=84px, XL=120px) |
| `shape` | `'square' \| 'circle'` | — | Square uses 6px border-radius; circle uses 48% |
| `className` | `string` | — | Applied to the container |

### Types exported

`SkeletonProps`, `CheckboxSkeletonProps`, `DropdownSkeletonProps`, `SkeletonAvatarProps`

(`OrderedListSkeletonProps` is not exported — it reuses `CheckboxSkeletonProps` internally)

## Usage patterns

```tsx
import Skeleton, { CheckboxSkeleton, DropdownSkeleton, OrderedListSkeleton, SkeletonAvatar } from '@synerise/ds-skeleton';

<Skeleton size="M" numberOfSkeletons={3} />
<Skeleton width="L" height={40} />
<CheckboxSkeleton numberOfSkeletons={4} />
<DropdownSkeleton size="S" />
<OrderedListSkeleton numberOfSkeletons={5} />
<SkeletonAvatar size="L" shape="circle" />
```

## Styling

All components share `BackgroundGradient` from `Skeleton.styles.ts` — a grey-to-light gradient. Each bar is animated with a `1.2s ease-in-out infinite` keyframes animation that slides the gradient left/right, producing a shimmer effect. Colours come from `theme.palette['grey-050']` for the base and the gradient for the shimmer.

## Key dependencies

- `@synerise/ds-checkbox` — `CheckboxSkeleton` renders a real `Checkbox` (unchecked, non-interactive) beside the bars
- `uuid` — generates unique `id` per skeleton bar for stable keys

## Implementation notes

- **`Skeleton.tsx` has a missing React key bug**: each iteration wraps `<S.Wrapper>` in an empty fragment `<>` without a key; only the inner `Wrapper` has `key={tile.id}`. The fragment should have the key instead.
- **`Skeleton` has no `shape` or `inline` props** — these appear in the README but do not exist in `SkeletonProps`; they belong to `SkeletonAvatar`.
- **`OrderedListSkeleton` exports no dedicated type** — it uses `CheckboxSkeletonProps` directly. If consumers need to type `OrderedListSkeleton` props they must import `CheckboxSkeletonProps`.
- **SkeletonSize enums are local** per sub-package — each `CheckboxSkeleton.types.ts`, `DropdownSkeleton.types.ts`, and `SkeletonAvatar.types.ts` defines its own `SkeletonSize` enum with different values. They are not re-exported from `index.ts`.
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
