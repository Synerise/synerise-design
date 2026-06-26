# Pagination (`@synerise/ds-pagination`)
> DS-native, antd-free pagination — page-window/ellipsis list, prev/next, jump-prev/next, optional
> size changer (`@synerise/ds-select`), quick jumper, and total summary. Styled with
> styled-components; emits `ds-pagination-*` class hooks (no `ant-*`).

## Package structure
```
src/
 Pagination.tsx       — the component: page state (controlled/uncontrolled), handlers, render
 Pagination.types.ts  — PaginationProps, PaginationLocale, PaginationItemType
 Pagination.styles.ts — styled-components (Root, Item, Nav, Jump, Options, SizeChanger, QuickJumper, JumperInput)
 getPages.ts          — page-item list algorithm (window + ellipsis) + getJumpSize
 index.ts             — exports default + PaginationProps / PaginationLocale types
 modules.d.ts         — @testing-library/jest-dom augmentation
```

No LESS, no antd. The previous `style/*.less` was inlined into `Pagination.styles.ts`.

## Public exports
```ts
import Pagination from '@synerise/ds-pagination';
import type { PaginationProps, PaginationLocale } from '@synerise/ds-pagination';
```

### `Pagination`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `number` | — | Controlled current page. |
| `defaultCurrent` | `number` | `1` | Uncontrolled initial page. |
| `total` | `number` | `0` | Total item count. |
| `pageSize` | `number` | — | Controlled page size. |
| `defaultPageSize` | `number` | `10` | Uncontrolled initial page size. |
| `onChange` | `(page, pageSize) => void` | — | Fired on page or page-size change. |
| `showSizeChanger` | `boolean` | auto (`total > 50`) | Render the page-size `<Select>`. When omitted, auto-shows once `total > 50` (antd parity); an explicit value always wins. |
| `pageSizeOptions` | `(string\|number)[]` | `['10','20','50','100']` | Size-changer options. |
| `onShowSizeChange` | `(current, size) => void` | — | Fired when the size changes. |
| `showQuickJumper` | `boolean` | `false` | Render the quick-jumper input (jump on Enter). |
| `showTotal` | `(total, [from,to]) => ReactNode` | — | Total/range summary. |
| `showLessItems` | `boolean` | `false` | Narrower page window. |
| `disabled` | `boolean` | `false` | Disable all controls. |
| `hideOnSinglePage` | `boolean` | `false` | Render nothing when there is one page. |
| `locale` | `PaginationLocale` | — | `{ page?, jump_to?, items_per_page? }` labels. |
| `itemRender` | `(page, type, el) => ReactNode` | — | Accepted for back-compat but **ignored** (DS renders its own controls), matching the previous behaviour. |
| `className`, `style`, `data-*` | — | — | Applied to the root `<ul>`. |

## Usage patterns
```tsx
import Pagination from '@synerise/ds-pagination';

<Pagination defaultCurrent={1} total={500} />
<Pagination current={page} total={500} onChange={(page) => setPage(page)} />
<Pagination current={page} total={5000} showSizeChanger showQuickJumper
  onChange={(page, pageSize) => handleChange(page, pageSize)} />
```

No CSS import is required (styled-components).

## Styling
- All styling lives in `Pagination.styles.ts` (styled-components, theme tokens). Classes are hooks only,
  not styling selectors.
- Page item: 32px, `border-radius: 16px`; active = `grey-700` background, white text; hover = translucent grey.
- prev/next: `grey-600` ghost icon buttons (`@synerise/ds-button`); disabled = `opacity: 0.4`.
- jump-prev/next: `OptionHorizontalM` by default, swap to `DoubleAngleLeftS`/`DoubleAngleRightS` on hover
  (via `.default-icon` / `.hover-icon` toggling inside the styled `Jump`).
- size changer: `@synerise/ds-select`, `min-width: 140px`; quick jumper: input with `blue-600` focus ring.
- Font family `'Graphik LCG Web', sans-serif`.

### DOM / class hooks (`ds-pagination-*` only)
`ds-pagination` (root `<ul>`) → `ds-pagination-total-text`, `ds-pagination-prev`, `ds-pagination-item`
+ `ds-pagination-item-{n}` (+ `ds-pagination-item-active`), `ds-pagination-jump-prev` / `-jump-next`,
`ds-pagination-next`, `ds-pagination-options` + `-options-size-changer` / `-options-quick-jumper`.

## Key dependencies
- `@synerise/ds-button` — ghost single-icon nav controls
- `@synerise/ds-icon` — `AngleLeftS`/`AngleRightS`/`DoubleAngleLeftS`/`DoubleAngleRightS`/`OptionHorizontalM`
- `@synerise/ds-select` — the size changer (`Select` + `Select.Option`)
- `@synerise/ds-utils` — `DataAttributes` passthrough type
- `@synerise/ds-core` (peer), `styled-components` (peer)

## Implementation notes
- **Page algorithm** in `getPages.ts`: ≤ `5 + buffer*2` pages → all shown; otherwise a `buffer`-wide
  window around `current` with the first/last page pinned and `jump-prev`/`jump-next` ellipsis controls.
  `buffer` is 2 (1 when `showLessItems`); jump controls skip `buffer*2 + 1` pages.
- **Controlled/uncontrolled** both for `current` and `pageSize` independently.
- **`itemRender` is ignored** — the component always renders its own DS nav controls (the prop is kept
  in the type for back-compat since the old wrapper also overrode it).
- ds-table / ds-table-new render this component and target the `ds-pagination-*` hooks (updated from the
  old `ant-pagination-*`).
- Uses **Vitest**.
