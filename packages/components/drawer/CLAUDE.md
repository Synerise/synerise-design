# Drawer (`@synerise/ds-drawer`)

> DS-native sliding panel built on `createPortal` + `useFocusTrap` (modeled on
> `ds-modal`). No Ant Design dependency. Renders no built-in close affordance —
> callers compose their own header/close action via the styled sub-components.

## Package structure

```
src/
  Drawer.tsx          — functional component; attaches sub-components as static properties
  Drawer.types.ts     — DrawerProps (DrawerOwnProps + data-*/aria-* passthrough)
  Drawer.styles.tsx   — styled-components: overlay, mask, panel, body + sub-components
  Drawer.figma.tsx    — Figma Code Connect mapping
  index.ts            — default export only
  __specs__/
    Drawer.spec.tsx   — render/visibility/close/inline/a11y-name tests (vitest)
```

## Public exports

### `Drawer` (default)

Functional component. Mounts into a portal (`document.body` by default), renders a
dimming mask + a panel that slides in from `placement`, and traps focus while open
in mask mode. Closing is driven entirely by the consumer via `onClose` (mask click
or `Escape`) — there is no built-in close button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state (preferred, antd 5 alias). |
| `visible` | `boolean` | `false` | Legacy antd 4 name. Back-compat only; `open` wins if both set. |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Edge the panel slides from. |
| `width` | `number \| string` | `256` | Panel width for `left`/`right`. Number → px. |
| `height` | `number \| string` | — | Panel height for `top`/`bottom`. Number → px. |
| `mask` | `boolean` | `true` | Render the dimming mask. `false` → inline, non-modal panel (no focus trap). |
| `maskClosable` | `boolean` | `true` | Close when the mask is clicked. |
| `keyboard` | `boolean` | `true` | Close on `Escape`. |
| `destroyOnClose` | `boolean` | `false` | Unmount children once the close transition ends (else kept hidden in the DOM). |
| `getContainer` | `(() => HTMLElement) \| false` | `document.body` | Portal target, or `false` to render inline in place (no portal). |
| `zIndex` | `number` | derived, see below | z-index of the root overlay. Omit it and the drawer stacks `OVERLAY_Z_INDEX_STEP` (2) above the nearest enclosing modal/drawer, falling back to the `zindex-modal` token when nothing encloses it. Set it to opt out of the stack entirely. |
| `onClose` | `(e: MouseEvent \| KeyboardEvent) => void` | — | Called on mask click / `Escape`. |
| `afterVisibleChange` | `(open: boolean) => void` | — | Fires after the open/close slide transition (`transform` `transitionend`). |
| `className` | `string` | — | Appended to the root overlay class hooks. |
| `style` | `CSSProperties` | — | Applied to the root **overlay** (not the panel). |
| `aria-label` | `string` | ← `title` | Accessible name for the `role="dialog"` panel. |
| `aria-labelledby` | `string` | — | ID labelling the dialog. Takes precedence over `aria-label`. |
| `title` | `string` | — | **Not rendered.** Used only as the dialog's fallback accessible name. |
| `closable` | `boolean` | — | **No-op**, kept for back-compat. |
| `data-*` / `aria-*` | — | — | Passthrough onto the root overlay (`PassthroughAttributes`). |

Sub-components attached as static properties:

| Static | Element | Description |
|--------|---------|-------------|
| `Drawer.DrawerHeader` | `div` | Header wrapper — `24px` padding (top/sides) + bottom border (`grey-100`). |
| `Drawer.DrawerHeaderWithoutPadding` | `div` | Header variant — no padding, no border. Wrap `DrawerHeader` when adding full-width elements below it (tabs, search bar). |
| `Drawer.DrawerHeaderBar` | `div` | Flex row (`space-between`, centered), `24px` bottom padding. Place back icon, title, action buttons here. |
| `Drawer.DrawerHeaderBack` | `div` | Container for a back/nav icon; adds `24px` right margin. |
| `Drawer.DrawerBody` | `div` | Scrollable body (`overflow-y: auto`). Wraps `DrawerContent`. |
| `Drawer.DrawerContent` | `div` | Content area with `24px` padding on all sides. |

## Usage patterns

```tsx
import Drawer from '@synerise/ds-drawer';

<Drawer
  open={isOpen}
  placement="right"
  width={676}
  onClose={() => setOpen(false)}
  aria-label="Object details"
>
  <Drawer.DrawerHeader>
    <Drawer.DrawerHeaderBar>
      <Drawer.DrawerHeaderBack>{backButton}</Drawer.DrawerHeaderBack>
      <h4 style={{ flex: 1, margin: 0 }}>Title</h4>
      {closeButton}
    </Drawer.DrawerHeaderBar>
  </Drawer.DrawerHeader>
  <Drawer.DrawerBody>
    <Drawer.DrawerContent>
      <p>Content</p>
    </Drawer.DrawerContent>
  </Drawer.DrawerBody>
</Drawer>

// With tabs / search below the header (no bottom border on the header)
<Drawer open={isOpen} placement="right" width={676} onClose={close}>
  <Drawer.DrawerHeaderWithoutPadding>
    <Drawer.DrawerHeader>
      <Drawer.DrawerHeaderBar>...</Drawer.DrawerHeaderBar>
    </Drawer.DrawerHeader>
    <Tabs ... />        {/* or <SearchBar ... /> */}
  </Drawer.DrawerHeaderWithoutPadding>
  <Drawer.DrawerBody>
    <Drawer.DrawerContent>...</Drawer.DrawerContent>
  </Drawer.DrawerBody>
</Drawer>

// Inline, non-modal panel (no portal, no mask, no focus trap)
<Drawer open={isOpen} getContainer={false} mask={false} onClose={close}>
  ...
</Drawer>
```

## Styling

Styles live in `Drawer.styles.tsx`, using `theme` tokens (no hardcoded values):

- `DrawerRoot` — outer overlay. `position: fixed; inset: 0` (or `absolute` when inline),
  `z-index: zindex-modal` token, `pointer-events: none`. Carries the class hooks and the
  consumer `className` (consumers may `styled(Drawer)` and target `&.ant-drawer { ... }`).
- `DrawerMask` — `grey-800` at `0.2` alpha (matches `ds-modal`), opacity fade on open/close.
- `DrawerContentWrapper` — the `role="dialog"` panel; slides via `transform` per placement,
  `transition: transform 0.3s ease`; `width`/`height` applied per placement axis.
- `DrawerBodyBox` — white panel body: no padding, flex column, `overflow: hidden`,
  `box-shadow: box-shadow-2` token.

**Class hooks preserved** for consumer overrides / external CSS:
`ant-drawer` · `ds-drawer` · `ant-drawer-{placement}` · `ds-drawer-{placement}` ·
`ant-drawer-open` / `ds-drawer-open` (when entered) · `ant-drawer-mask` · `ds-drawer-mask` ·
`ant-drawer-content-wrapper` · `ds-drawer-content-wrapper` · `ant-drawer-body` · `ds-drawer-body`.

## Key dependencies

- `react-dom` — `createPortal` for the overlay mount.
- `@synerise/ds-utils` — `useFocusTrap` (focus trap + restore) and `PassthroughAttributes`.
- `@synerise/ds-core` — theme tokens (`palette`, `variables`) via styled-components `theme`.
- `styled-components` — styling + sub-component primitives.

## Implementation notes

- **Functional component** — attaches sub-components as static properties on the function.
- **Open/close lifecycle** — `shouldRender` keeps the tree mounted; `entered` drives the
  slide/fade (deferred one frame on enter so the transition runs). `destroyOnClose` unmount
  and `afterVisibleChange` both fire from the panel's `transform` `transitionend`.
- **Focus trap only in mask mode** — inline drawers (`mask={false}`) are non-modal and must
  not trap focus. On close, focus is restored to the previously focused element.
- **Accessible name** — the dialog needs one: prefer `aria-labelledby`, then `aria-label`,
  then the non-rendered `title`. Header-built drawers should pass `aria-labelledby` (pointing
  at the header text) or `aria-label`.
- **`title` / `closable`** — never rendered. `title` only feeds the fallback accessible name;
  `closable` is inert. Compose the visible title inside `DrawerHeaderBar`.
- **`visible` vs `open`** — both work. Prefer `open`.
- **No `DrawerHeaderWithoutPadding` named export** — only reachable as
  `Drawer.DrawerHeaderWithoutPadding` (static property).
