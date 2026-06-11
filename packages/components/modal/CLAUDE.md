# Modal (`@synerise/ds-modal`)

> A native React modal dialog with portal-based rendering, predefined sizes, a structured header (title, tabs, actions), a slot-based footer, async handler support, and optional scrollable height capping. No Ant Design dependency.

## Package structure

```
src/
  Modal.tsx               — main component: state, portal, forwardRef
  Modal.types.ts          — ModalProps, ModalContentProps, ModalTitleProps, ModalFooterProps, ModalRef, ModalHandle
  Modal.const.ts          — SIZE_MAP (size name → pixel width)
  ShowModal.tsx            — imperative showModal() API via ds-core's setPortalContent
  ShowModal.spec.tsx       — tests for showModal
  Modal.spec.tsx           — tests for Modal
  index.ts                 — public exports
  Elements/
    ModalContent/
      ModalContent.tsx     — visual structure: root, mask, scroll wrap, container, body
      ModalContent.styles.ts — ModalRoot, ModalMask, ModalScrollWrap, ModalContainer, ModalBody, Scrollbar
    ModalTitle/
      ModalTitle.tsx       — header region: title, description (deprecated), tabs, actions, close button
      ModalTitle.styles.ts
      ModalTitle.spec.tsx
      index.ts
    ModalFooter/
      ModalFooter.tsx      — footer region: prefix / cancel / infix / ok / suffix slots
      ModalFooter.styles.ts
      ModalFooter.spec.tsx
      index.ts
```

## Public exports

### `Modal` (default export)

`forwardRef` component. Renders `ModalContent` via `createPortal` into `getContainer() || document.body`.

**Props (ModalProps):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether the modal is visible |
| `destroyOnClose` | `boolean` | `false` | When true, unmounts children on close. When false, keeps mounted but hidden |
| `title` | `ReactNode` | — | Modal header title |
| `size` | `ModalSize` | — | Predefined width: `small` (520px), `medium` (792px), `large` (1044px), `extraLarge` (1280px), `fullSize` (100%), `fullScreen` (100% fixed) |
| `bodyBackground` | `'white' \| 'grey'` | `'white'` | Background colour of the modal body |
| `blank` | `boolean` | — | Strips header/footer chrome; shows only a close button if `onCancel` is provided |
| `closable` | `boolean` | `true` | Whether the close button is shown (gated in ModalContent before reaching ModalTitle) |
| `maskClosable` | `boolean` | `true` | Whether clicking the backdrop closes the modal |
| `centered` | `boolean` | `false` | Vertically centres the modal |
| `maxViewportHeight` | `true \| number` | — | Caps height. `true` → 80vh; number → Nvh. Wraps children in scrollbar. Anchors modal to bottom of viewport |
| `disableScrollbar` | `boolean` | — | Disables scrollbar wrapping from `maxViewportHeight` |
| `bodyScrollRef` | `MutableRefObject<HTMLDivElement \| null>` | — | Ref to the body's scroll element. With the custom scrollbar active (`maxViewportHeight`, no `disableScrollbar`) it resolves to that scrollbar's scroll node; with `disableScrollbar` it resolves to `ModalBody`. Pass the same ref to a child `VirtualTable`'s `scrollElementRef` so the modal's scroll drives virtualization. When the custom scrollbar is active, the node binds one tick after mount |
| `headerActions` | `ReactNode` | — | Extra buttons/icons in header action row |
| `headerBottomBar` | `ReactNode` | — | Full-width bar below the header |
| `headerTabProps` | `TabsProps` | — | Renders a `Tabs` component in the header |
| `titleContainerStyle` | `CSSProperties` | — | Inline styles for the title container |
| `description` | `ReactNode` | — | **Deprecated.** Sub-title with dashed separator |
| `onOk` | `(e) => void \| Promise` | — | OK button handler; async supported — modal stays open until resolved |
| `onCancel` | `(e) => void \| Promise` | — | Cancel/close handler; async supported |
| `afterClose` | `() => void` | — | Called after each close (every `open: true → false` transition). Matches antd Modal semantics. Does not fire on initial mount or on hard unmount of an open modal. |
| `footer` | `ReactNode \| null` | auto-generated | `null` suppresses footer; custom ReactNode overrides it |
| `texts` | `{ okButton?; cancelButton? }` | `{ okButton: 'Apply', cancelButton: 'Cancel' }` | Default button labels |
| `prefix` | `ReactNode` | — | Slot before cancel button |
| `infix` | `ReactNode` | — | Slot between cancel and OK |
| `suffix` | `ReactNode` | — | Slot after OK button |
| `okButton` / `cancelButton` | `ReactNode` | — | Replaces the auto-generated button entirely |
| `CustomFooterButton` | `ComponentType<ButtonProps>` | `Button` | Custom button component for ok/cancel |
| `okText` / `cancelText` | `ReactNode` | — | Button labels (override `texts`) |
| `okType` | `ButtonType` | `'primary'` | Button type for OK |
| `okButtonProps` / `cancelButtonProps` | `ButtonProps` | — | Extra props for buttons |
| `bodyStyle` | `CSSProperties` | — | Inline styles for body |
| `bodyFullWidth` | `boolean` | — | Removes body padding |
| `ariaLabel` | `string` | — | Accessible name for the dialog; fallback when `title` is absent or non-text |
| `closeButtonAriaLabel` | `string` | `DS.MODAL.CLOSE` (`'Close'`) | Accessible name for the close button; defaults to the localised translation |
| `initialFocusRef` | `RefObject<HTMLElement \| null>` | dialog container | Element focused on open. Defaults to the dialog container (announced by its accessible name). Pass a ref only when focusing a specific control is genuinely useful (search/rename dialogs) |
| `getContainer` | `() => HTMLElement` | `document.body` | Portal mount target |
| `zIndex` | `number` | theme `zindex-modal` | z-index of the modal root |

### `showModal(props: ModalProps): ModalHandle`

Imperative API. Uses `setPortalContent` from `@synerise/ds-core` to render a modal via the DSProvider's `PortalRenderer`. Returns `{ destroy }` to unmount.

### `ModalTitle`

Header sub-component. Exported for advanced composition. Props: `Pick<ModalContentProps, 'headerActions' | 'headerTabProps' | 'onCancel' | 'titleContainerStyle' | 'blank' | 'description' | 'title' | 'headerBottomBar'>`.

### `TitleContainer`

Exported styled-component — the flex row holding title text and action buttons.

### `ModalFooter`

Footer sub-component. Props: `Pick<ModalContentProps, 'footer' | 'prefix' | 'infix' | 'suffix' | 'okButton' | 'cancelButton' | 'CustomFooterButton' | 'texts' | 'onOk' | 'onCancel' | 'cancelText' | 'okText' | 'cancelButtonProps' | 'okType' | 'okButtonProps'>`.

### Exported types

`ModalProps`, `ModalSize`, `ModalContentProps`, `ModalTitleProps`, `ModalFooterProps`, `ModalRef`, `ModalHandle`

## Usage patterns

```tsx
import Modal, { showModal } from '@synerise/ds-modal';

// Basic
<Modal open={isOpen} title="Edit record" onOk={handleOk} onCancel={handleClose}>
  <p>Content here</p>
</Modal>

// Sized, no auto-footer
<Modal open={isOpen} title="Large view" size="large" footer={null} onCancel={handleClose}>
  <CustomContent />
</Modal>

// Blank modal
<Modal open={isOpen} blank onCancel={handleClose} footer={myFooter} bodyStyle={{ padding: 0 }}>
  <MyContent />
</Modal>

// Height-capped scrollable
<Modal open={isOpen} title="Long list" maxViewportHeight={60} onCancel={handleClose}>
  <LongList />
</Modal>

// Imperative
const ref = showModal({ title: 'Confirm', onOk: () => ref.destroy() });

// Async handlers
<Modal onOk={async () => { await save(); }} onCancel={async () => { await cleanup(); }} />

// Scroll ref
const ref = useRef<ModalRef>(null);
<Modal ref={ref} open>{/* content */}</Modal>
ref.current?.scrollToTop();

// VirtualTable virtualizing against the modal's body scroll
const scrollRef = useRef<HTMLDivElement>(null);
<Modal open maxViewportHeight bodyScrollRef={scrollRef} onCancel={handleClose}>
  <VirtualTable stickyHeader scrollElementRef={scrollRef} columns={cols} data={data} />
</Modal>
```

## Higher-level modal components

Built on top of `Modal` in `@synerise/ds-confirmation`:

- **`Confirmation`** — typed dialog (negative/warning/success/informative) with icon, batch-items list, decision radio, related-objects view. Uses `size="small"`, `blank={true}`.
- **`Prompt`** — minimal variant with free-form content and typed button colour. Uses `size="small"`.

## Rendering architecture

`Modal` (`forwardRef`) manages `isOpen` / `hasBeenOpened` state and renders `ModalContent` via `createPortal`. When `hidden` (closed but not destroyed), `ModalContent` applies `display: none` on the same `ModalRoot` element — preserving the React tree structure so children are never unmounted/remounted.

DOM structure when visible:
```
document.body (portal target)
  └─ ModalRoot (position: absolute, z-index from theme)
       ├─ ModalMask (position: fixed, full viewport, semi-transparent)
       └─ ModalScrollWrap (position: fixed, full viewport, overflow: auto)
            └─ ModalContainer (absolute or fixed, sized, centered)
                 ├─ ModalTitle (header: title, tabs, actions, close button)
                 ├─ ModalBody (content, optional grey background)
                 └─ ModalFooter (prefix / cancel / infix / ok / suffix)
```

## Implementation notes

- **Close button:** Rendered by `ModalTitle` when `onCancel` is provided and `closable !== false`. `closable` is evaluated in `ModalContent` which gates `onCancel` before passing to `ModalTitle`.
- **Title render condition:** Header renders when at least one of `title`, `description`, `headerTabProps` is truthy. `headerBottomBar` renders independently.
- **Footer render logic:** `footer={null}` suppresses entirely. Explicit `footer` value overrides auto-generated `ModalFooter`. Omitted `footer` renders the default.
- **`fullScreen`** positions the modal `fixed` covering the viewport; body scrolls via `overflow: scroll`.
- **`maxViewportHeight`** anchors the modal to the bottom of the viewport (sheet-style), not the centre.
- **Async handlers:** Both `onOk` and `onCancel` can return `Promise`. `onCancel` awaits the promise then calls `closeModal()`. `onOk` resolves then calls `closeModal()` only if the handler was detected as promise-returning via `'then' in onOk`.
- **Accessibility:** `ModalContainer` carries `role="dialog"` + `aria-modal`. `ModalContent` generates two ids with React's `useId()` — `titleId` and `descriptionId` — passed to `ModalTitle` which applies them to `S.Title` (the `<h3>`) and `S.Description`. The dialog references them via `aria-labelledby` (when `title` is set) and `aria-describedby` (when `description` is set); `aria-label` falls back to the `ariaLabel` prop when there is no title. Both close buttons (header and `blank`) get `aria-label` from `closeButtonAriaLabel`, falling back to the localised `DS.MODAL.CLOSE` message (`useIntl().formatMessage`, default `'Close'`); `react-intl` is a peer dependency. Focus trap/restore is handled by `useFocusTrap`; `Escape` closes via `handleKeyDown`. **Initial focus:** on open, focus moves to the `ModalContainer` (`role="dialog"`, `tabIndex={-1}`) itself — screen readers announce the dialog's accessible name + role and no cursor lands in a non-critical field. This satisfies the WAI-ARIA APG Dialog pattern (focus must move *into* the dialog, but not necessarily onto the first focusable element). Consumers can override the target with `initialFocusRef` (e.g. focus a search field); it is passed straight to `useFocusTrap`'s `initialFocus` option.

## Key dependencies

- `@synerise/ds-button` — close button in header, ok/cancel in footer
- `@synerise/ds-icon` — `CloseM` icon
- `@synerise/ds-tabs` — optional tab bar via `headerTabProps`
- `@synerise/ds-scrollbar` — wraps children when `maxViewportHeight` is set
- `@synerise/ds-typography` — `Typography.Title` for the modal title
- `@synerise/ds-core` (peer) — `setPortalContent` for `showModal`, `renderWithProvider` for tests
- `styled-components` (peer) — all styling
- `react` (peer) — `createPortal`, `forwardRef`, `useImperativeHandle`
