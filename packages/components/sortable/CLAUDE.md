# Sortable (`@synerise/ds-sortable`)

> A drag-and-drop sortable list built on `@dnd-kit`, providing a managed `Sortable` wrapper and a lower-level `SortableContainer` for custom layouts. Also re-exports key `@dnd-kit` primitives.

## Package structure

```
src/
  Sortable.tsx          — managed sortable list (state + DragOverlay)
  SortableContainer.tsx — DndContext + SortableContext wrapper (sensors, axis, strategy)
  SortableItem.tsx      — individual draggable item with grab/drag visual states
  Sortable.types.ts     — all types (BaseItem, SortableProps, SortableContainerProps, etc.)
  Sortable.styles.ts    — styled-components for drag placeholder and grab states
  index.ts              — public exports (components + @dnd-kit re-exports)
  __specs__/
    Sortable.spec.tsx   — Jest test
```

## Public exports

### `Sortable` (default export)

Managed sortable list. Maintains internal order state and renders a `DragOverlay`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ItemType[]` | — | **Required.** Array of items (must have `id: string \| number`) |
| `ItemComponent` | `ComponentType<WithIndex<ItemType>>` | — | **Required.** Component to render each item; receives `index` and `dragHandleProps` |
| `onOrderChange` | `(newOrder: ItemType[]) => void` | — | Called after a drag completes with the new order |
| `axis` | `'x' \| 'y'` | — | Constrain drag direction; omit for free 2D |
| `placeholderCss` | `Interpolation<ThemeProps>` | — | Custom styled-components CSS for the blue dashed drag placeholder |

`ItemComponent` receives the item's own props plus `index: number` and `dragHandleProps: DragHandlePropType` (spread onto the drag handle element).

### `SortableContainer`

Lower-level DnD context. Use when you need to render items manually (e.g. in the sidebar).

Props: `SortableContainerProps<ItemType>` = `Omit<DndContextProps, 'sensors' | 'collisionDetection' | 'modifiers'>` plus:

| Prop | Type | Description |
|------|------|-------------|
| `items` | `ItemType[]` | Items with `id` |
| `axis` | `'x' \| 'y'` | Movement axis |
| `onOrderChange` | `(newOrder: ItemType[]) => void` | Called after reorder |

Internally uses `MouseSensor`, `PointerSensor`, and `KeyboardSensor` with `sortableKeyboardCoordinates`. Strategy: `verticalListSortingStrategy` for `y`, `horizontalListSortingStrategy` for `x`, `rectSortingStrategy` otherwise.

### Re-exported `@dnd-kit` primitives

| Export | Source | Purpose |
|--------|--------|---------|
| `useDndMonitor` | `@dnd-kit/core` | Subscribe to DnD events from outside the context |
| `DragOverlay` | `@dnd-kit/core` | Floating overlay for grabbed item |
| `DraggableAttributes` | `@dnd-kit/core` | Type for handle attributes |
| `DraggableSyntheticListeners` | `@dnd-kit/core` | Type for handle listeners |
| `arrayMove` | `@dnd-kit/sortable` | Array reorder utility |
| `useSortable` | `@dnd-kit/sortable` | Hook for custom sortable items |
| `CSS` | `@dnd-kit/utilities` | CSS transform utilities |

### Types exported

`DragHandlePropType`, `SortableItemProps`, `SortableProps`, `BaseItem`, `WithIndex`

## Usage patterns

```tsx
import Sortable from '@synerise/ds-sortable';
import type { BaseItem, WithIndex, DragHandlePropType } from '@synerise/ds-sortable';

type Item = BaseItem & { label: string };

const ItemComponent = ({ label, dragHandleProps }: WithIndex<Item>) => (
  <div>
    <span {...dragHandleProps}>⠿</span>
    {label}
  </div>
);

<Sortable
  items={items}
  ItemComponent={ItemComponent}
  axis="y"
  onOrderChange={setItems}
/>
```

```tsx
// Lower-level usage with SortableContainer + useSortable
import { SortableContainer, useSortable, CSS } from '@synerise/ds-sortable';

<SortableContainer items={items} axis="y" onOrderChange={setItems}>
  {items.map((item, index) => <MyItem key={item.id} {...item} index={index} />)}
</SortableContainer>
```

## Styling

Drag placeholder (the item's original slot while dragging): blue dashed border + blue-050 background, customisable via `placeholderCss`. Grabbed item (in the overlay): white background + `box-shadow` elevation. Controlled via `SortableItemWrapper` in `Sortable.styles.ts`.

## Key dependencies

- `@dnd-kit/core` — `DndContext`, sensors, drag events
- `@dnd-kit/sortable` — `SortableContext`, `useSortable`, `arrayMove`
- `@dnd-kit/modifiers` — `restrictToVerticalAxis`, `restrictToHorizontalAxis`, `restrictToParentElement`
- `@dnd-kit/utilities` — `CSS.Translate.toString` for transforms
- `@synerise/ds-utils` — `WithHTMLAttributes` type helper

## Implementation notes

- **Semi-controlled order**: `Sortable` and `SortableContainer` both maintain internal `order` state synced from `items` via `useEffect([items])`. External `items` changes after mount will update the internal order.
- **`index === -1` in DragOverlay**: `ItemComponent` is rendered in the overlay with `index={-1}`; components can use this to detect the overlay state.
- **Keyboard support**: `KeyboardSensor` with `sortableKeyboardCoordinates` is wired up automatically in `SortableContainer`.
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
- **README API table is empty** — no props are documented.
