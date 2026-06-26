# Sidebar (`@synerise/ds-sidebar`)

> A collapsible accordion sidebar built on a DS-native, antd-free `Collapse` (in `src/Collapse/`), with optional drag-and-drop panel reordering via `@synerise/ds-sortable`. Also exports `SidebarWithButton` — a helper component with a title and a dropdown-menu button.

## Package structure

```
src/
 Sidebar.tsx — main component; conditional sortable/non-sortable modes
 Sidebar.types.ts — SidebarProps, PanelProps, SidebarContextType, Order
 Sidebar.styles.ts — StyledCollapse, StyledPanel, SidebarHandle, DragOverlay, etc.
 Sidebar.context.tsx — SidebarContext { isSortable }
 Collapse/
 Collapse.tsx — DS-native accordion (manages active panels by `id`, clones children)
 CollapsePanel.tsx — one item; renders the ant-collapse-* / ds-sidebar-* DOM
 Collapse.types.ts — CollapseProps, CollapsePanelProps
 Panel/
 Panel.tsx — compound child; renders DraggablePanel or PanelContent
 DraggablePanel/
 DraggablePanel.tsx — useSortable wrapper around PanelContent
 DragOverlayPanel/
 DragOverlayPanel.tsx — visual copy of panel rendered during drag
 PanelContent/
 PanelContent.tsx — DS CollapsePanel wrapper with optional drag handle
 SidebarWithButton/
 SidebarWithButton.tsx — sidebar variant with title + dropdown button
 SidebarWithButton.types.ts
 SidebarWithButton.styles.ts
 __specs__/Sidebar.spec.tsx — Vitest tests
 index.ts — public exports
```

## Public exports

### `Sidebar` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** `<Sidebar.Panel>` elements |
| `order` | `string[]` | `[]` | Panel IDs in display order; also enables sortable mode when combined with `onChangeOrder` |
| `onChangeOrder` | `(order: string \| string[]) => void` | — | Called after drag reorder; **must be set alongside `order` to enable drag mode** |
| `defaultActiveKey` | `string[]` | — | Initially open panel IDs |
| `activeKey` | `string \| string[]` | — | Controlled open panels |
| `onChange` | `(keys: string \| string[]) => void` | — | Called when panels open/close |
| `getPopupContainer` | `(node: HTMLDivElement) => HTMLElement` | — | Portal target for the `DragOverlay`; useful when sidebar is inside a scrollable container |
| `className` | `string` | — | Added to the Collapse root |

Any other DS `CollapseProps` (`activeKey`, `defaultActiveKey`, `onChange`, `accordion`, `expandIcon`, `expandIconPosition`) are spread through.

**Drag mode is active when** `Array.isArray(order) && order.length > 0 && !!onChangeOrder`. The `is-drag-drop` CSS class is applied to the collapse when active.

### `Sidebar.Panel` (compound component)

Accessed as `Sidebar.Panel` or imported as `Panel`. Renders as `DraggablePanel` in sortable mode and `PanelContent` otherwise.

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | **Required.** Unique panel ID (used for ordering and collapse key) |
| `header` | `ReactNode` | **Required.** Panel header content |
| `children` | `ReactNode` | Panel body content |
| `forceRender` | `boolean` | Render body even when collapsed |
| `isActive` | `boolean` | Internal: whether panel is expanded |
| `draggable` | `boolean` | Internal: set by `DraggablePanel` |
| `dragHandleProps` | `HTMLAttributes<HTMLDivElement>` | Internal: set by `DraggablePanel` |

### `SidebarWithButton`

A non-collapsible sidebar header variant with a title label and a ghost button that opens a dropdown menu.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `MenuItemProps[]` | — | **Required.** Menu items in the dropdown |
| `buttonLabel` | `string` | — | Button text |
| `title` | `string` | — | Title text on the left |

## Usage patterns

```tsx
import Sidebar from '@synerise/ds-sidebar';

// Non-sortable
<Sidebar defaultActiveKey={['overview']}>
 <Sidebar.Panel id="overview" header="Overview">content</Sidebar.Panel>
 <Sidebar.Panel id="settings" header="Settings">content</Sidebar.Panel>
</Sidebar>

// Sortable (drag-and-drop)
<Sidebar
 order={panelOrder}
 onChangeOrder={setPanelOrder}
 defaultActiveKey={['overview']}
>
 <Sidebar.Panel id="overview" header="Overview">content</Sidebar.Panel>
 <Sidebar.Panel id="settings" header="Settings">content</Sidebar.Panel>
</Sidebar>
```

## Context / Provider

`SidebarContext` is created in `Sidebar.context.tsx` and provides `{ isSortable: boolean }` to `Panel` children. `Panel` checks this context to decide whether to render a `DraggablePanel` or a plain `PanelContent`. No external Provider is needed.

## Styling

`StyledCollapse` in `Sidebar.styles.ts` styles the DS accordion DOM via its `.ant-collapse-*` class hooks (retained for ui-tests / interim external CSS; `ds-sidebar-*` emitted alongside). Header padding is `18px 24px`. Content padding is `16px 24px`. Background is `blue-050`. The drag handle (`SidebarHandle`) is `cursor: grabbing` and positioned absolutely on the left of the header.

## Key dependencies

- DS-native `Collapse` / `CollapsePanel` (`src/Collapse/`) — the accordion engine (no antd)
- `@synerise/ds-sortable` — `SortableContainer`, `DragOverlay`, `useSortable`, `CSS`
- `@synerise/ds-icon` — expand icons (`AngleDownS`, `AngleUpS`) and drag handle (`DragHandleM`)
- `@synerise/ds-dropdown`, `@synerise/ds-menu`, `@synerise/ds-button` — used by `SidebarWithButton`

## Implementation notes

- **Collapse keys panels the way antd did** (`child.key ?? index`): the DS `Collapse` matches `activeKey`/`defaultActiveKey`/`onChange` against each panel's React `key`, falling back to the child index when a panel has no key. The panel helpers (`createSidebarPanels`, and real consumers) set `key={id}`, so id-based `activeKey`/`defaultActiveKey` work as before; panels written without a key (e.g. the `WithBlock` story, `defaultActiveKey="0"`) match by index — exactly as under antd. `Collapse` strips the `.$` prefix that `Children.toArray` (the sortable path) adds and treats positional `.N` keys as "no key", so the old `prefixKeys` juggling is unnecessary and `activeKey`/`defaultActiveKey`/`onChange` still speak plain ids in both modes.
- **`DragOverlayPanel`** is rendered either inside `getPopupContainer` target (via `createPortal`) or inline if no container is provided.
- **`onChangeOrder` must be truthy** to enable sorting — passing an empty array as `order` without `onChangeOrder` does not enable drag mode.
- **Uses Vitest** for testing.
