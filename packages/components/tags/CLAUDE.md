# Tags (`@synerise/ds-tags`)

> A controlled tag-group component that renders selected tags inline, with optional add-from-pool, create-new, and overflow-into-dropdown behaviours.

## Package structure

```
src/
  Tags.tsx              — root component; renders selected tags, LimitedTags overflow, and AddTags button
  Tags.types.ts         — TagsProps, ActionTaken, ExtendedTagProps type definitions
  Tags.styles.ts        — styled-components: Container, TagsWrapper, SelectedTags, TagOverflow, Title, LimitedTag
  index.ts              — public exports
  modules.d.ts          — ambient module declarations
  components/
    AddTags/
      AddTags.tsx        — dropdown trigger with search bar, create-new button, and selectable tag list
      AddTags.styles.ts  — AddTagButton, CreateTagDropdownButton, Separator
    LimitedTags/
      LimitedTags.tsx    — "+N" pill that opens hidden selected tags on hover
    TagsDropdown/
      TagsDropdown.tsx   — shared dropdown wrapper around @synerise/ds-dropdown
      TagsDropdown.styles.ts — Overlay, DropdownContainer (Scrollbar), DropdownTagsContainer, BottomAction
  __specs__/
    Tags.spec.tsx        — Jest + React Testing Library tests
```

## Public exports

```ts
export { default } from './Tags';                        // default: Tags component
export * as TagsStyles from './Tags.styles';
export type { TagsProps, ActionTaken, ExtendedTagProps } from './Tags.types';
export { AddTags, type AddTagsProps } from './components/AddTags/AddTags';

// @deprecated — import directly from @synerise/ds-tag
export { default as Tag, TagShape } from '@synerise/ds-tag';
export type { TagProps, TagTexts } from '@synerise/ds-tag';
```

### `Tags` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ExtendedTagProps[]` | `[]` | Pool of all available tags (used by AddTags dropdown) |
| `selected` | `ExtendedTagProps[]` | `[]` | Currently selected/displayed tags |
| `tagShape` | `TagShape` | — | Shape applied to all tags in the group |
| `addable` | `boolean` | — | Renders the AddTags button |
| `addButtonType` | `'single-icon' \| 'icon-label'` | auto* | Add button display mode (`icon-label` when `texts.addButtonLabel` is set, otherwise `single-icon`) |
| `removable` | `boolean` | — | Shows remove icon on each tag |
| `creatable` | `boolean` | — | Shows "create new tag" button in the add dropdown when search query has no exact match |
| `disabled` | `boolean` | — | Disables all tags in the group |
| `texts` | `Partial<TagTexts>` | — | Localisation strings (see TagTexts below) |
| `onCreate` | `(name: string) => void` | — | Called when a new tag is created via the create button |
| `onSelectedChange` | `(tags: TagProps[], action: ActionTaken) => void` | — | Called on any add or remove action |
| `title` | `ReactNode` | — | Label rendered before the tag list |
| `maxVisibleTags` | `number` | — | Caps inline-displayed selected tags; overflow shown in a hover dropdown |
| `maxHeight` | `number` | — | Max height (px) of the add-tags dropdown scrollable area |
| `overlayPlacement` | `'topLeft' \| 'topCenter' \| 'topRight' \| 'bottomLeft' \| 'bottomCenter' \| 'bottomRight'` | — | Placement of the add-tags dropdown |
| `overlayStyle` | `CSSProperties` | — | Inline style override for the add-tags dropdown overlay |
| `dropdownFooter` | `ReactNode` | — | Custom content rendered in the footer of the add-tags dropdown |
| `asPill` | `boolean` | — | Renders tags as pills (passed through to each `Tag`) |
| `style` | `CSSProperties` | — | Inline style for the root container |
| `className` | `string` | — | Additional class for the root container (always receives `ds-tags`) |
| `theme` | `{ [k: string]: string }` | — | **@deprecated** — use `useTheme` hook instead |

### `TagTexts` (from `@synerise/ds-tag`)

| Key | Type | Description |
|-----|------|-------------|
| `addButtonLabel` | `ReactNode` | Label for the add-tags trigger button |
| `searchPlaceholder` | `string` | Placeholder in the add-tags search bar |
| `createTagButtonLabel` | `ReactNode` | Label for the "create new tag" button |
| `clearTooltip` | `ReactNode` | Tooltip on the search clear icon |
| `deleteTooltip` | `ReactNode` | Tooltip on a tag's remove icon |
| `noResultsLabel` | `ReactNode` | Message when search yields no results |
| `dropdownNoTags` | `ReactNode` | Message when the unselected pool is empty |
| `manageLinkLabel` | `ReactNode` | Not rendered by Tags itself; available for consumers to pass via `dropdownFooter` |

### `ActionTaken`

```ts
type ActionTaken = {
  type: 'ADD' | 'REMOVE';
  tag: TagProps;
};
```

### `ExtendedTagProps`

`TagProps & { informationCardProps?: InformationCardProps }`

When `informationCardProps` is provided on a tag, hovering the tag renders an `InformationCard` tooltip (placement `bottomLeft` inline, `right` inside the dropdown).

### `AddTags` (named export)

Internal sub-component also exported for advanced use. Props are a subset of `TagsProps` plus `texts: TagTexts` (required, not `Partial`).

## Usage patterns

```tsx
import Tags from '@synerise/ds-tags';
import type { TagsProps } from '@synerise/ds-tags';

// Minimal — read-only display
<Tags selected={[{ id: 1, name: 'Marketing' }]} />

// Full interactive
<Tags
  data={allTags}
  selected={selectedTags}
  addable
  removable
  creatable
  texts={{
    addButtonLabel: 'Add tag',
    searchPlaceholder: 'Search...',
    createTagButtonLabel: 'Create',
    clearTooltip: 'Clear',
    deleteTooltip: 'Delete',
    noResultsLabel: 'No results',
    dropdownNoTags: 'No tags found',
  }}
  onSelectedChange={(tags, action) => setSelectedTags(tags)}
  onCreate={(name) => createTag(name)}
  maxVisibleTags={5}
/>
```

## Styling

- Root container: `display: flex; margin-bottom: 24px` — the bottom margin is always applied.
- Tags wrap via `flex-wrap: wrap`; each tag sits inside a `32px`-height overflow div.
- The `LimitedTags` "+N" pill uses `grey-100` background / `grey-700` text and is always rendered `asPill`.
- Dropdown tag list has a hardcoded `max-height: 320px` (inside `DropdownTagsContainer`); use `maxHeight` prop on `Tags` to override the scrollable container height.

## Key dependencies

| Package | Role |
|---------|------|
| `@synerise/ds-tag` | Single `Tag` component and `TagShape` enum |
| `@synerise/ds-dropdown` | Popover/dropdown primitive used by AddTags and LimitedTags |
| `@synerise/ds-search-bar` | Search input inside the add-tags dropdown |
| `@synerise/ds-information-card` | Tooltip card rendered on tag hover when `informationCardProps` is set |
| `@synerise/ds-result` | "No results" empty-state inside the dropdown |
| `@synerise/ds-scrollbar` | Scrollable container in `TagsDropdown` |
| `@synerise/ds-button` | Add-tag trigger button and create-tag button |
| `@synerise/ds-core` | `useTheme` hook for palette tokens |

## Implementation notes

- `Tags` is a **controlled** component — it does not manage `selected` state internally. The parent must update `selected` in `onSelectedChange`.
- `addButtonType` defaults to `'icon-label'` when `texts.addButtonLabel` is truthy, and to `'single-icon'` otherwise. An explicit `addButtonType` prop overrides this.
- `AddTags` filters `data` to exclude already-`selected` items (matched by `id`). Search is case-insensitive substring match on `name`.
- The "create" button only appears when `creatable` is true, the search query is non-empty, and no tag in the selectable pool has an exact name match.
- `LimitedTags` is not exported — it is an internal component opened by `hover` trigger.
- The test runner is **Jest** (not Vitest) — see `jest.config.js`.
- `Props` (re-exported type) is `@deprecated`; use `TagsProps` instead.
- `Tag` and `TagShape` re-exports from this package are `@deprecated`; import directly from `@synerise/ds-tag`.
