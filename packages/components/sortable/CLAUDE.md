# Sortable (`@synerise/ds-sortable`)

> A drag-and-drop sortable list built on `@dnd-kit`, providing a managed `Sortable` wrapper and a lower-level `SortableContainer` for custom layouts. Also re-exports key `@dnd-kit` primitives.

## Package structure

```
src/
 Sortable.tsx — managed sortable list (state + DragOverlay)
 SortableContainer.tsx — DndContext + SortableContext wrapper (sensors, axis, strategy, collision detection)
 leadingEdgeCollision.ts — collision detection for `axis` lists (leading edge past a neighbour's center)
 SortableItem.tsx — individual draggable item with grab/drag visual states
 Sortable.types.ts — all types (BaseItem, SortableProps, SortableContainerProps, etc.)
 Sortable.styles.ts — styled-components for drag placeholder and grab states
 index.ts — public exports (components + @dnd-kit re-exports)
 __specs__/
 Sortable.spec.tsx — Vitest test
 leadingEdgeCollision.spec.ts — collision rule on fabricated rects (incl. keyboard moves)
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

Collision detection: with `axis` set, `createLeadingEdgeCollisionDetection(axis)` (`leadingEdgeCollision.ts`) — the dragged item takes a neighbour's place once its leading edge (top/left moving back, bottom/right moving forward) crosses that neighbour's center; the furthest crossed neighbour wins, and with none crossed `over` stays the active item, so a drop keeps the order. It compares against layout rects (`droppableRects`, measured without sort transforms), so the result does not flicker while neighbours shift. Without `axis` (grid) it is `closestCenter`. Why not `closestCenter` for lists: with items of very different heights a tall item needs about a quarter of its own height of travel before `over` changes, more than its `DragOverlay` (clamped by `restrictToParentElement`) can move when a short item sits at the edge of the list, so the drop snapped back.

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
 <span {..dragHandleProps}>⠿</span>
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
 {items.map((item, index) => <MyItem key={item.id} {..item} index={index} />)}
</SortableContainer>
```

## Styling

Drag placeholder (the item's original slot while dragging): `1px dashed var(--ds-color-border-brand-strong)` border + `var(--ds-color-background-brand-subtle)` background, customisable via `placeholderCss`. Grabbed item (in the overlay): `var(--ds-color-background-base-default)` background + `var(--ds-shadows-shadow-2)` elevation. Controlled via `SortableItemWrapper` in `Sortable.styles.ts`.

## Key dependencies

- `@dnd-kit/core` — `DndContext`, sensors, drag events
- `@dnd-kit/sortable` — `SortableContext`, `useSortable`, `arrayMove`
- `@dnd-kit/modifiers` — `restrictToVerticalAxis`, `restrictToHorizontalAxis`, `restrictToParentElement`
- `@dnd-kit/utilities` — `CSS.Translate.toString` for transforms
- `@synerise/ds-utils` — `WithHTMLAttributes` type helper

## Implementation notes

- **Semi-controlled order**: `Sortable` and `SortableContainer` both maintain internal `order` state synced from `items` via `useEffect([items])`. External `items` changes after mount will update the internal order.
- **`index === -1` in DragOverlay**: `ItemComponent` is rendered in the overlay with `index={-1}`; components can use this to detect the overlay state.
- **Keyboard support**: `KeyboardSensor` with `sortableKeyboardCoordinates` is wired up automatically in `SortableContainer`. It moves the item so its top edge meets the target's top (moving up) or its bottom edge meets the target's bottom (moving down), so the leading edge always passes the target's center and one key press moves one slot under the collision rule above.
- **Uses Vitest** for testing.
- **README API table is empty** — no props are documented.
