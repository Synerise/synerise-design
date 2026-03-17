# Cascader (`@synerise/ds-cascader`)

> A hierarchical category-browser with built-in search, breadcrumb navigation, and multi-select; the category tree is passed as a deeply-nested `Category` object rather than a flat array.

## Package structure

```
src/
  Cascader.tsx          — main component (search + navigation + category list)
  Cascader.types.ts     — CascaderProps, Category, Path, Texts
  Cascader.styles.tsx   — styled-components (Wrapper, SearchResults, CascaderScrollbar)
  utils.ts              — tree traversal: getAllPaths, filterPaths, hasNestedCategories, searchCategoryWithId
  index.ts              — public exports
  Elements/
    BackAction/         — "go back" button shown when navigating > 1 level deep
    BottomAction/       — generic bottom action slot (not currently used by Cascader directly)
    Breadcrumb/         — renders a path as chevron-separated crumbs; also exported publicly
    BreadcrumbsList/    — virtualised list of Breadcrumb rows for search results
    CategoriesList/     — renders children of the active category as ListItems
    Navigation/         — composes Breadcrumb + BackAction into the nav header
```

## Public exports

### `Cascader` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rootCategory` | `Category` | — | **Required.** The root node of the category tree. Nested categories are arbitrary object keys whose values are `Category` objects. |
| `selectedCategoriesIds` | `ReactText[]` | — | **Required.** Controlled list of selected category ids. Drives the green check icon and selection state. |
| `categorySuffix` | `ReactNode` | — | **Required.** Element shown in the suffix slot of each unselected leaf item (e.g. an "add" button). Replaced by a green `CheckS` icon when the item is selected. |
| `onCategorySelect` | `(item: Category, selected: boolean) => void` | `undefined` | Fires when a leaf category is toggled. `selected` is the new state. |
| `searchClearTooltip` | `ReactNode` | `undefined` | Tooltip on the search-bar clear button. |
| `searchInputPlaceholder` | `string` | `''` | Placeholder for the search input. |
| `maxHeight` | `number` | `undefined` | Constrains the category list height (px) to enable scrolling. Height is snapped to a multiple of `CATEGORY_ITEM_HEIGHT` (32px). |
| `contentStyles` | `CSSProperties` | `undefined` | Inline styles applied to the `SearchResults` wrapper. |

### `Breadcrumb`

Re-exported standalone component for rendering a path as a row of `›`-separated crumbs. Extends `ListItemProps` from `@synerise/ds-list-item`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `path` | `string[]` | — | **Required.** Array of path segments. |
| `onPathClick` | `(path: string & { id?: number \| string }) => void` | `undefined` | Called when a crumb is clicked. |
| `highlight` | `string` | `undefined` | Search term to highlight inside crumb text and description. |
| `description` | `ReactNode` | `undefined` | Optional secondary line above the path row. Highlighted if string + `highlight` is set. |
| `compact` | `boolean` | `undefined` | Reverses the path array so deepest item appears first. |
| `startWithArrow` | `boolean` | `undefined` | Renders an arrow before the first item. |
| `gradientOverlap` | `boolean` | `undefined` | Fades out overflowing content with a gradient. Uses a `ResizeObserver`-like ref check. |
| `highlightActivePath` | `boolean` | `undefined` | Adds `.active` class to the last (deepest) path segment. |
| `prefixel` | `ReactNode` | `undefined` | Element prepended before the crumb content (e.g. a home icon). |
| `isNavigation` | `boolean` | `undefined` | Applies navigation-mode styling. |
| `disabled` | `boolean` | `undefined` | Greyed-out state. |
| `className` | `string` | `undefined` | Additional class (`ds-breadcrumb` always added). |
| `style` | `CSSProperties` | `undefined` | Inline styles. |

### Type exports

`CascaderProps`, `Category`, `Texts`, `Path`

## Data model

The `Category` type is intentionally minimal — the actual tree structure relies on **arbitrary object keys** holding nested `Category` values:

```ts
type Category = {
  id: ReactText;   // string | number
  name: string;
  path: string[];  // full path from root to this node, e.g. ['Home', 'Computers', 'Laptops']
  // any additional key: Category  ← nested children (not in the type, handled with @ts-expect-error)
};
```

This is a known limitation tracked as `STOR-1904`. All tree-traversal utilities use `Object.keys` + `typeof value === 'object'` duck-typing to find children.

## Usage patterns

```tsx
import Cascader from '@synerise/ds-cascader';

const rootCategory = {
  id: 0,
  name: 'Home',
  path: ['Home'],
  Phones: { id: 1, name: 'Phones', path: ['Home', 'Phones'] },
  Computers: {
    id: 2,
    name: 'Computers',
    path: ['Home', 'Computers'],
    Laptops: { id: 3, name: 'Laptops', path: ['Home', 'Computers', 'Laptops'] },
  },
};

const [selected, setSelected] = useState<(string | number)[]>([]);

<Cascader
  rootCategory={rootCategory}
  selectedCategoriesIds={selected}
  categorySuffix={<Button>Add</Button>}
  onCategorySelect={(item, isSelected) =>
    setSelected(prev =>
      isSelected ? [...prev, item.id] : prev.filter(id => id !== item.id)
    )
  }
  searchInputPlaceholder="Search categories…"
  maxHeight={400}
/>
```

## Key dependencies

- `@synerise/ds-search-bar` — the search input at the top
- `@synerise/ds-list-item` — each category row in `CategoriesList`; `Breadcrumb` extends `ListItemProps`
- `@synerise/ds-scrollbar` — `CascaderScrollbar` wraps both the search results and category list
- `@synerise/ds-utils` (`useResize`, `renderWithHighlight`) — container height measurement and search term highlighting

## Implementation notes

- **Navigation is state-only**: drilling into a category pushes it onto `enteredCategories` and sets `activeCategory`. Going back (breadcrumb click / back-action) pops from `enteredCategories` and re-finds the target via `searchCategoryWithId`.
- **Leaf vs. branch detection**: `hasNestedCategories` returns `true` if any object-valued key exists. Clicking a branch navigates into it; clicking a leaf calls `onItemSelect` (toggle).
- **Search overrides navigation**: when `searchQuery` is non-empty the category list is hidden and `BreadcrumbsList` shows `filteredPaths` instead. `filterPaths` matches only the **last element** of each path string array against the query (case-insensitive).
- **`selectedCategoriesIds` is both controlled and internally mirrored**: an internal `selectedIds` state is synced via `useEffect([selectedCategoriesIds])`. Local toggles update `selectedIds` immediately without waiting for the parent to propagate a new prop — this gives an optimistic UI feel.
- **`maxHeight` is approximate**: it floors to a multiple of 32px (`CATEGORY_ITEM_HEIGHT`) after subtracting the categories container's `offsetTop`. This means the exact pixel value you pass will rarely match the actual clamped height.
- **`backActionVisible`** requires `enteredCategories.length > 1` (not just `> 0`) so the back action only appears from the second level onwards.
- **`Texts` type** is exported but unused internally — it defines a single key `'searchPlaceholder'` and appears to be a leftover from an earlier i18n pattern.
