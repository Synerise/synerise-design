# ManageableList (`@synerise/ds-manageable-list`)

> A feature-rich list management component supporting 5 item types (default, blank, content, content-large, filter), drag-and-drop reordering, expandable content, inline rename/delete/duplicate, show-more pagination, and full i18n.

## Package structure

```
src/
  ManageableList.tsx                    — main component; renders item list + add button + drag wrapper
  ManageableList.types.ts               — ManageableListProps, ItemProps, Texts, ListType, ExpansionBehaviour, AdditionalAction
  ManageableList.styles.ts              — ManageableListContainer, ShowMoreButton
  index.ts                              — public exports
  Item/
    Item.tsx                            — router: delegates to SimpleItem / ContentItem / FilterItem / BlankItem
    DraggableItem.tsx                   — wraps Item in @synerise/ds-sortable DraggableItem
    SimpleItem/                         — DEFAULT list type: name + optional icon/tag + actions
    ContentItem/                        — CONTENT / CONTENT_LARGE type: expandable header + body
    ContentItem/ContentItemHeader.tsx   — header with expand toggle, drag handle, meta, actions
    FilterItem/                         — FILTER type: checkbox select + dropdown menu
    BlankItem/                          — BLANK type: custom render function; full layout control
    ItemName/                           — name display with search-query highlighting
    ItemNameLarge/                      — name + unique key + tags (content-large only)
    ItemMeta/                           — creation date + user avatar
    ItemActions/                        — edit / duplicate / delete icon buttons with tooltips
  AddItem/                              — add button for CONTENT / CONTENT_LARGE types (Creator button)
  AddBlankItem/                         — add button for BLANK type (divider + button)
  AddItemWithName/                      — inline name-input add for DEFAULT type
  hooks/
    useTexts.tsx                        — i18n defaults via react-intl
  __specs__/
    ManageableList.spec.tsx             — default list type tests
    ManageableListWithContentItems.spec.tsx
    ManageableListWithFilterItems.spec.tsx
```

## Public exports

### `ManageableList` (default export)

Generic component: `ManageableList<T extends object>`. Has static properties:
- `ManageableList.ManageableListContainer` — styled wrapper (for external overrides)
- `ManageableList.ShowMoreButton` — styled button (for external overrides)

**Mutually exclusive props:** pass either `visibleItemsLimit` OR the deprecated `maxToShowItems` — not both (enforced via `ExactlyOne` utility type).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ItemProps<T>[]` | — (required) | Items to render |
| `loading` | `boolean` | — (required) | Shows `@synerise/ds-list` loading skeleton when true |
| `type` | `ManageableListType` | `'default'` | One of `'default' \| 'blank' \| 'content' \| 'content-large' \| 'filter'` |
| `visibleItemsLimit` | `number` | — | Show N items, rest behind a toggle button |
| `maxToShowItems` | `number` | — | **`@deprecated`** — use `visibleItemsLimit` |
| `onItemAdd` | `(params?: { name: string }) => void` | — | Called when user adds an item; renders the add button when provided |
| `onItemRemove` | `({ id: ReactText }) => void` | — | Enables delete action |
| `onItemEdit` | `({ id: ReactText; name: string }) => void` | — | Enables inline rename |
| `onItemSelect` | `({ id: ReactText }) => void` | — | Called on item click |
| `onItemDuplicate` | `({ id: ReactText }) => void` | — | Enables duplicate action |
| `onChangeOrder` | `(newOrder: ItemProps<T>[]) => void` | — | Enables drag-and-drop reorder (and button-based reorder) |
| `changeOrderByButtons` | `boolean` | `false` | Adds move-to-top / move-to-bottom buttons instead of drag handles |
| `changeOrderDisabled` | `boolean` | `false` | Hides all reorder affordances |
| `addButtonDisabled` | `boolean` | `false` | Disables the add button |
| `greyBackground` | `boolean` | `false` | Grey background on list and items |
| `selectedItemId` | `string` | — | Highlights the matching item |
| `searchQuery` | `string` | — | Highlights matching text inside item names |
| `expanderDisabled` | `boolean` | — | Hides the expand toggle on content items |
| `onExpand` | `(id: ReactText, isExpanded: boolean) => void` | — | Called when a content item is expanded/collapsed |
| `expansionBehaviour` | `string` | — | `'default' \| 'accordion' \| 'custom'` (see `ExpansionBehaviour` enum) |
| `expandedIds` | `ReactText[]` | — | **`@deprecated`** — use `item.expanded` on each item instead |
| `texts` | `Partial<Texts>` | see defaults | i18n overrides |
| `additionalActions` | `AdditionalAction[]` | — | Extra icon actions appended to each item's action row |
| `placeholder` | `string` | — | Input placeholder for the DEFAULT-type add-item field |
| `style` | `CSSProperties` | — | Inline styles on the root container |
| `renderCustomToggleButton` | `(props: { onClick, total, limit, allItemsVisible }) => ReactNode` | — | Replaces the default show-more/less button |
| `renderItem` | `(item: ItemProps) => ReactNode` | `() => <></>` | Custom item renderer (used by BLANK type) |
| `className` | `string` | — | Appended after `ds-manageable-list` |

### `ItemProps<T extends object>`

Extends `T` with:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ReactText` | Required unique identifier |
| `name` | `string` | Required display name |
| `canUpdate` | `boolean` | Shows rename action |
| `canDelete` | `boolean` | Shows delete action |
| `canDuplicate` | `boolean` | Shows duplicate action |
| `icon` | `ReactNode` | Item icon (DEFAULT type) |
| `tag` | `ReactElement` | Tag prefix (CONTENT types) |
| `tags` | `ReactNode` | Tag list in header (CONTENT_LARGE only) |
| `headerPrefix` | `ReactNode` | Rendered before the item name in the header (CONTENT_LARGE only) |
| `content` | `ReactNode` | Expandable body (CONTENT types) |
| `uniqueKey` | `ReactNode` | Unique key display (CONTENT_LARGE only) |
| `user` | `{ avatar_url?, firstname?, lastname?, email? }` | Shown in `ItemMeta` (CONTENT types) |
| `created` | `string` | Creation date shown in `ItemMeta` (CONTENT types) |
| `dropdown` | `ReactElement` | Custom dropdown menu for FILTER type |
| `expanded` | `boolean` | Initial expanded state (replaces deprecated `expandedIds`) |
| `selected` | `boolean` | Checked state for FILTER type |
| `disabled` | `boolean` | Disables the item |
| `changeOrderDisabled` | `boolean` | Disables drag for this specific item |
| `disableExpanding` | `boolean` | Always shows full content without expand toggle |
| `disableHeaderClick` | `boolean` | Prevents header click from toggling expand |
| `headerSuffix` | `ReactNode` | Rendered at the start of the item suffix area |
| `hideHeaderSuffixOnHover` | `boolean` | Hides `headerSuffix` on hover |
| `additionalSuffix` | `ReactNode` | Rendered at the end of the item suffix area |
| `nameWrapperClassNames` | `string[]` | Extra classes on the name wrapper |
| `description` | `string` | Sub-text (available in some item types) |

### `AdditionalAction`

`{ icon: ReactNode; tooltip: string; onClick: (item: ItemProps) => void; color?: string }`

### `ManageableListProps`, `ManageableListItemProps`, `AddItemProps`, `StyledContentItem`

Type re-exports.

### `ContentItem`, `FilterItem`, `SimpleItem`, `AddItem`

Sub-component re-exports for consumers who need to render items standalone.

### `ListType` (enum)

`DEFAULT = 'default'` | `BLANK = 'blank'` | `CONTENT = 'content'` | `CONTENT_LARGE = 'content-large'` | `FILTER = 'filter'`

### `ExpansionBehaviour` (enum)

`DEFAULT = 'default'` | `ACCORDION = 'accordion'` | `CUSTOM = 'custom'`

## Usage patterns

```tsx
import ManageableList from '@synerise/ds-manageable-list';
import { ListType } from '@synerise/ds-manageable-list';

// Default list (with inline add)
<ManageableList
  type={ListType.DEFAULT}
  items={items}
  loading={false}
  visibleItemsLimit={5}
  onItemAdd={({ name }) => addItem(name)}
  onItemRemove={({ id }) => removeItem(id)}
  onItemEdit={({ id, name }) => editItem(id, name)}
  onItemSelect={({ id }) => selectItem(id)}
  onChangeOrder={(newOrder) => setItems(newOrder)}
  selectedItemId={activeId}
/>

// Content list (expandable)
<ManageableList
  type={ListType.CONTENT}
  items={contentItems}
  loading={false}
  onExpand={(id, isExpanded) => handleExpand(id, isExpanded)}
/>
```

## Custom hooks

### `useTexts`

Merges `react-intl` `FormattedMessage` defaults with `texts` prop overrides. Returns a complete `Texts` object. **Note:** the `useMemo` dependency array is `[defaultTexts]` — if the `texts` object is recreated on every render, texts will be rememoized each time.

## Styling

`ManageableList.styles.ts` is minimal — only the root container and show-more button. All per-item styles live in `Item.styles.ts` and each item type's own styles file. Uses `@synerise/ds-list` for the loading skeleton.

## Key dependencies

- `@synerise/ds-sortable` — `SortableContainer` + `DragOverlay` for drag-and-drop reorder
- `@synerise/ds-list` — loading skeleton and base list wrapper when drag is disabled
- `react-intl` — i18n for all text labels; requires `IntlProvider`

## Implementation notes

- **Add button placement differs by type** — `DEFAULT` renders `AddItemWithName` at the **top**; `CONTENT`/`CONTENT_LARGE` render `AddItem` at the **bottom**; `BLANK` renders `AddBlankItem` at the **bottom**.
- **Drag-and-drop is conditional** — `SortableContainer` is used only when `onChangeOrder` is provided and `changeOrderDisabled` is false; otherwise items render via `@synerise/ds-list`.
- **`expandedIds` vs `item.expanded`** — `expandedIds` prop is deprecated; prefer setting `expanded: true` on individual `ItemProps`. Both are supported; `expandedIds` takes priority when defined.
- **`ExactlyOne` constraint** — passing both `maxToShowItems` and `visibleItemsLimit` causes a TypeScript error. Only one should be used.
- **`Item.types.ts` re-exports `Props`** — `Props` is re-exported as `@deprecated` alias for `ManageableListItemProps`; do not use.
- **README inaccuracies** — README documents `listType` (should be `type`), `styles` (should be `style`), `activateItem` text key (should be `activateItemTitle`); many `ItemProps` fields and `visibleItemsLimit` are missing; `maxToShowItems` is documented without the deprecation warning.
- **Test runner is Jest** (not Vitest).
