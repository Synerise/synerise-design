# Sidebar (`@synerise/ds-sidebar`)

> A collapsible accordion sidebar built on Ant Design `Collapse`, with optional drag-and-drop panel reordering via `@synerise/ds-sortable`. Also exports `SidebarWithButton` — a helper component with a title and a dropdown-menu button.

## Package structure

```
src/
  Sidebar.tsx                 — main component; conditional sortable/non-sortable modes
  Sidebar.types.ts            — SidebarProps, PanelProps, SidebarContextType, Order
  Sidebar.styles.ts           — AntdCollapse, AntdPanel, SidebarHandle, DragOverlay, etc.
  Sidebar.context.tsx         — SidebarContext { isSortable }
  Panel/
    Panel.tsx                 — compound child; renders DraggablePanel or PanelContent
  DraggablePanel/
    DraggablePanel.tsx        — useSortable wrapper around PanelContent
  DragOverlayPanel/
    DragOverlayPanel.tsx      — visual copy of panel rendered during drag
  PanelContent/
    PanelContent.tsx          — Ant Design Panel wrapper with optional drag handle
  SidebarWithButton/
    SidebarWithButton.tsx     — sidebar variant with title + dropdown button
    SidebarWithButton.types.ts
    SidebarWithButton.styles.ts
  utils/
    prefixKeys.ts             — adds `.$` prefix to collapse keys in sortable mode
  style/index.less            — Ant Design collapse less import
  __specs__/Sidebar.spec.tsx  — Jest tests
  index.ts                    — public exports
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
| `className` | `string` | — | Added to the Ant Collapse |

Any other Ant Design `CollapseProps` are spread through.

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

`AntdCollapse` in `Sidebar.styles.ts` heavily overrides Ant Design collapse CSS. Header padding is `18px 24px`. Content padding is `16px 24px`. Background is `blue-050`. The drag handle (`SidebarHandle`) is `cursor: grabbing` and positioned absolutely on the left of the header.

## Key dependencies

- `antd` — `Collapse` and `Panel` base components
- `@synerise/ds-sortable` — `SortableContainer`, `DragOverlay`, `useSortable`, `CSS`
- `@synerise/ds-icon` — expand icons (`AngleDownS`, `AngleUpS`) and drag handle (`DragHandleM`)
- `@synerise/ds-dropdown`, `@synerise/ds-menu`, `@synerise/ds-button` — used by `SidebarWithButton`

## Implementation notes

- **Collapse key prefixing**: in sortable mode, panel IDs are prefixed with `.$` when passed to Ant's `activeKey`/`defaultActiveKey` (via `prefixKeys`). The `handleOnChange` callback strips the prefix back off. This prevents key collisions between React element keys and collapse panel keys.
- **`DragOverlayPanel`** is rendered either inside `getPopupContainer` target (via `createPortal`) or inline if no container is provided.
- **`onChangeOrder` must be truthy** to enable sorting — passing an empty array as `order` without `onChangeOrder` does not enable drag mode.
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
