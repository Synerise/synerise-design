# Pagination (`@synerise/ds-pagination`)
> A thin wrapper around Ant Design's Pagination component that replaces navigation controls with DS-styled ghost icon buttons.

## Package structure
```
src/
  Pagination.tsx    — main component, wraps AntPagination with custom itemRender
  index.ts          — re-exports default Pagination
  modules.d.ts      — imports @testing-library/jest-dom for jest augmentation
  style/
    index.less      — imports antd pagination/select styles, ds-core vars, ds-select mixin, then pagination.less
    pagination.less — DS-specific overrides: spacing, icon swap on jump buttons, item styling, size-changer width
```

## Public exports
```ts
export { default } from './Pagination';
```

The package exports a single default export — there are no named exports.

### `Pagination`
This component accepts all props from Ant Design's `PaginationProps` (`antd/lib/pagination`). The component spreads all props directly onto `AntPagination`. The only prop with custom handling is:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `PaginationLocale` | `{ page: '' }` | Merged with `{ page: '' }` to suppress the Ant default page label. All other `PaginationProps` pass through unchanged. |

All other `PaginationProps` from Ant Design 4.x are supported as-is (e.g. `current`, `defaultCurrent`, `total`, `pageSize`, `defaultPageSize`, `onChange`, `onShowSizeChanger`, `showSizeChanger`, `showQuickJumper`, `showTotal`, `disabled`, `simple`, `size`, `hideOnSinglePage`, `pageSizeOptions`, `responsive`, `itemRender`, `showLessItems`).

Note: providing a custom `itemRender` will be overridden — the component always uses its own `itemRender` internally.

## Usage patterns
```tsx
import Pagination from '@synerise/ds-pagination';
import '@synerise/ds-pagination/dist/style/index.css';

// Basic usage
<Pagination defaultCurrent={1} total={500} />

// Controlled
<Pagination current={page} total={500} onChange={(page) => setPage(page)} />

// With size changer and quick jumper
<Pagination
  current={page}
  total={5000}
  showSizeChanger
  showQuickJumper
  onChange={(page, pageSize) => handleChange(page, pageSize)}
/>
```

## Styling
- Styles are compiled from Less — consumer must import `@synerise/ds-pagination/dist/style/index.css` or the Less source `@synerise/ds-pagination/src/style/index.less`.
- The Less entry pulls in: `antd` pagination + select base styles, `@synerise/ds-core` variables + config, `@synerise/ds-select` select mixin, then `pagination.less` overrides.
- Jump-prev/jump-next buttons show `OptionHorizontalM` icon by default and swap to `DoubleAngleLeftS` / `DoubleAngleRightS` on hover via `.default-icon` / `.hover-icon` CSS class toggling.
- Disabled prev/next controls use `opacity: 0.4` rather than a color change.
- The size changer `<select>` has a minimum width of 140px (overrides the Ant default).
- Font family is explicitly set to `'Graphik LCG Web', sans-serif` for all pagination children.

## Key dependencies
- `antd` 4.24.16 (peer) — `AntPagination`, `PaginationProps` type
- `@synerise/ds-button` — `Button` with `mode="single-icon"` and `type="ghost"` used for all nav controls
- `@synerise/ds-icon` — `AngleLeftS`, `AngleRightS`, `DoubleAngleLeftS`, `DoubleAngleRightS`, `OptionHorizontalM`
- `@synerise/ds-select` (dep, unused in JS — only its Less mixin is imported for styles)
- `@synerise/ds-core` (peer) — Less variables, style bootstrap

## Implementation notes
- `itemRender` is memoized with `useCallback(fn, [])` — it never changes identity after mount.
- The `locale` prop is partially overridden: `{ page: '' }` is the base, and any consumer-provided `locale` is spread on top, so consumers can still override other locale strings.
- Uses Jest (not Vitest) — `jest.config.js` present, test file uses `jest.fn()`.
- The `@synerise/ds-select` package is listed as a dependency solely for its Less mixin import in styles; it adds no runtime JS dependency.
