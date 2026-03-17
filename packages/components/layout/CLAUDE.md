# Layout (`@synerise/ds-layout`)

> Shell components for building full-page application layouts with optional left/right sidebars, a header zone, a subheader zone, and a scrollable main content area.

## Package structure

```
src/
  Layout.tsx          — main layout component (header + sidebars + main content)
  Layout.types.ts     — exported types: LayoutProps, SidebarProps, ColumnProps
  Layout.styles.ts    — all styled-components (LayoutContainer, LayoutSidebar, SidebarButton, etc.)
  index.ts            — public exports
  Page/
    Page.tsx          — top-level page shell (navbar + app menu + layout slot)
    Page.styles.tsx   — styled-components for Page
  Sidebar/
    Sidebar.tsx       — internal sidebar component (not exported)
  __specs__/
    Layout.spec.tsx   — Jest tests
  modules.d.ts        — *.less module declaration
```

## Public exports

### `Layout` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Main content area |
| `header` | `ReactNode` | — | Rendered above the sidebar/main row |
| `subheader` | `ReactNode` | — | Rendered inside main column, above `children`, with a drop shadow |
| `left` | `SidebarProps` | — | Left sidebar config; omit to hide sidebar entirely |
| `right` | `SidebarProps` | — | Right sidebar config; omit to hide sidebar entirely |
| `className` | `string` | — | Added alongside `ds-layout` class |
| `styles` | `ColumnProps<CSSProperties>` | — | Inline style overrides per region |
| `fullPage` | `boolean` | `false` | Removes 24 px padding from main content inner wrapper |
| `nativeScroll` | `boolean` | — | Use native browser scroll in main column instead of `@synerise/ds-scrollbar` |
| `nativeScrollRef` | `Ref<HTMLDivElement>` | — | Ref forwarded to the native-scroll inner `<div>` |
| `fillViewport` | `boolean` | — | Positions container absolutely; height = `calc(100vh - viewportTopOffset)` |
| `viewportTopOffset` | `number` | `55` | Top offset used when `fillViewport` is true |
| `sidebarAnimationDisabled` | `boolean` | — | Disables CSS transitions on sidebar width |
| `renderLeftSidebarControls` | `boolean \| (() => ReactNode)` | `false` | `true` = built-in show/hide button; function = custom toggle UI |
| `renderRightSidebarControls` | `boolean \| (() => ReactNode)` | `false` | Same as above for right sidebar |
| `leftSidebarWithDnd` | `boolean` | `false` | Passes `withDnd` to left sidebar scrollbar |
| `rightSidebarWithDnd` | `boolean` | `false` | Passes `withDnd` to right sidebar scrollbar |
| `leftSidebarWithScrollbar` | `boolean` | `true` | Wraps left sidebar content in `@synerise/ds-scrollbar` |
| `rightSidebarWithScrollbar` | `boolean` | `true` | Wraps right sidebar content in `@synerise/ds-scrollbar` |
| `mainSidebarWithDnd` | `boolean` | `false` | Passes `withDnd` to main content scrollbar |

### `SidebarProps` (type export)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `content` | `ReactNode` | — | Rendered inside sidebar |
| `opened` | `boolean` | — | Controlled open state |
| `onChange` | `(isOpened: boolean) => void` | — | Called when built-in toggle is clicked |
| `width` | `number` | `320` | Width in px when sidebar is open |

### `ColumnProps<T>` (type export)

Generic type used for `styles` prop. Keys: `left`, `leftInner`, `main`, `mainInner`, `right`, `rightInner`.

### `Page` (named export)

Outer page shell wrapping a top navbar and an app menu alongside the main content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Typically a `<Layout>` instance |
| `navBar` | `ReactNode` | — | Top navigation bar (56 px tall; shifts content below it) |
| `appMenu` | `ReactElement` | — | Side application menu; rendered in a 64 px wide fixed slot; receives `top` prop via `cloneElement` |
| `className` | `string` | — | Applied to outer `PageContainer` |

## Usage patterns

```tsx
import Layout, { Page } from '@synerise/ds-layout';
import type { SidebarProps } from '@synerise/ds-layout';

// Full-page shell with both sidebars
const [leftOpen, setLeftOpen] = useState(false);
const [rightOpen, setRightOpen] = useState(false);

<Page navBar={<Navbar />} appMenu={<AppMenu />}>
  <Layout
    header={<PageHeader title="My Page" />}
    left={{ content: <LeftPanel />, opened: leftOpen, onChange: setLeftOpen }}
    right={{ content: <RightPanel />, opened: rightOpen, onChange: setRightOpen }}
    renderLeftSidebarControls
    renderRightSidebarControls
  >
    <Content />
  </Layout>
</Page>

// Full-page mode (no padding, native scroll)
<Page>
  <Layout fullPage nativeScroll header={<Header />}>
    <LargeContent />
  </Layout>
</Page>
```

## Styling

- `LayoutContainer` is `display: flex; flex-direction: column; height: 100%; overflow: hidden`.
- `fillViewport` switches container to `position: absolute; height: calc(100vh - N px)`.
- Default top offset for `fillViewport` is **55 px** (matches a typical navbar height).
- Main content inner wrapper has **24 px padding** on all sides except on `medium` breakpoint and below (handled by `@synerise/ds-core` `mediaQuery` helpers). `fullPage=true` overrides this to `0`.
- Sidebar slide animation uses CSS `max-width` transitions (0.3 s ease); disabled entirely when `sidebarAnimationDisabled` is true.
- `SidebarButton` (toggle handle) is absolutely positioned outside the sidebar; repositions at `top: 48px` normally, or `top: 170px` when `subheader` is present.
- `LayoutSidebar` has a hardcoded `background-color: #fff` — not a theme token.
- `Page.PageContainer` has a hardcoded `background-color: rgb(243, 245, 246)` — not a theme token.

## Key dependencies

- `@synerise/ds-scrollbar` — scrollbar used in main content and sidebars
- `@synerise/ds-icon` — arrow and close icons on sidebar toggle button
- `@synerise/ds-core` — `useTheme`, `mediaQuery` breakpoint helpers
- `styled-components ^5` (peer)

## Implementation notes

- `Sidebar` is an internal component not exported from `index.ts`.
- Sidebar `opened` / `onChange` are fully **controlled** — the component never manages its own open state.
- When `renderLeftSidebarControls` / `renderRightSidebarControls` is `false` (default), the sidebar visibility is derived purely from `left?.opened` / `right?.opened`. When the flag is truthy, a toggle button is rendered and `LayoutBody` allows `overflow: visible` on the relevant side.
- `Page` uses `React.cloneElement` to inject a `top` prop into `appMenu` equal to `56` (when `navBar` is present) or `0`. The `appMenu` element must accept a `top` prop.
- The test file has three `it.todo` stubs for sidebar control behaviour — this logic is untested.
- `Layout.styles.ts` contains a stray `}` character at line 235 (inside `LayoutSidebar`) which is a syntax artefact but compiles due to template-literal context.
