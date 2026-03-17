# Modal (`@synerise/ds-modal`)

> An Ant Design 4 `Modal` wrapper that adds predefined sizes, a structured header (title, description, tabs, actions), a slot-based footer, and optional scrollable height capping.

## Package structure

```
src/
  Modal.tsx               — main component + static AntD modal methods
  Modal.types.ts          — ModalProps, ModalFooterBuilder, Props (deprecated alias)
  Modal.styles.ts         — AntdModal (styled), Scrollbar, ModalWrapper
  index.ts                — public exports
  Elements/
    ModalTitle/
      ModalTitle.tsx      — header region: title, description, tabs, actions, close button
      ModalTitle.styles.ts
      index.ts
    ModalFooter/
      ModalFooter.tsx     — footer region: prefix / cancel / infix / ok / suffix slots
      ModalFooter.styles.ts
      index.ts
  style/
    index.less            — Ant Design Less overrides for modal chrome
    modal.mixin.less
```

## Public exports

### `Modal` (default export)

Wraps Ant Design `Modal`. No `forwardRef`.

**DS-specific props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| 'extraLarge' \| 'fullSize' \| 'fullScreen'` | — | Maps to a fixed pixel width (520 / 792 / 1044 / 1280 / 100% / 100%). Overrides `width`. |
| `bodyBackground` | `'white' \| 'grey'` | `'white'` | Sets `bodybg-white` or `bodybg-grey` className on the modal |
| `blank` | `boolean` | — | Strips header and footer chrome; shows only a close button (if `onCancel` is provided) |
| `titleContainerStyle` | `CSSProperties` | — | Inline styles applied to the `TitleContainer` div |
| `headerActions` | `ReactNode` | — | Extra buttons/icons rendered in the header action row, left of the close button |
| `headerBottomBar` | `ReactNode` | — | Full-width bar rendered below the header, above the body |
| `headerTabProps` | `TabsProps` | — | If provided, renders a `Tabs` component inside the header |
| `texts` | `{ okButton?: ReactNode; cancelButton?: ReactNode }` | `{ okButton: 'Apply', cancelButton: 'Cancel' }` | Default button labels for the auto-generated footer |
| `maxViewportHeight` | `true \| number` | — | Caps modal height. `true` → 80 vh; number → N vh. Wraps children in `@synerise/ds-scrollbar` unless `disableScrollbar` is set. Modal is positioned `fixed` when this prop is set. |
| `disableScrollbar` | `boolean` | — | Disables the automatic scrollbar wrapping added by `maxViewportHeight` |
| `description` | `ReactNode` | — | **Deprecated.** Sub-title rendered below the title with a dashed separator |
| `children` | `ReactNode` | — | Modal body content |

**Inherited Antd `ModalProps` (selected commonly used):**

| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | `false` |
| `title` | `ReactNode` | — |
| `onOk` | `(e) => void` | — |
| `onCancel` | `(e) => void` | — |
| `footer` | `ReactNode \| null` | auto-generated `ModalFooter` |
| `zIndex` | `number` | `1000` |
| `width` | `string \| number` | `520` |
| `centered` | `boolean` | `false` |
| `maskClosable` | `boolean` | `true` |
| `destroyOnClose` | `boolean` | `false` |
| `okText` | `ReactNode` | — |
| `cancelText` | `ReactNode` | — |
| `okButtonProps` | `ButtonProps` | — |
| `cancelButtonProps` | `ButtonProps` | — |
| `bodyStyle` | `CSSProperties` | — |

**`ModalFooterBuilder` props** (footer slot customisation, part of `ModalProps`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prefix` | `ReactNode` | — | Rendered before the cancel button |
| `infix` | `ReactNode` | — | Rendered between cancel and OK buttons |
| `suffix` | `ReactNode` | — | Rendered after the OK button |
| `okButton` | `ReactNode` | — | Replaces the auto-generated OK button entirely |
| `cancelButton` | `ReactNode` | — | Replaces the auto-generated cancel button entirely |
| `CustomFooterButton` | `ComponentType<ButtonProps>` | `Button` | Button component used to render ok/cancel when not replaced |
| `DSButton` | `ComponentType<ButtonProps>` | `Button` | **Deprecated** — use `CustomFooterButton` |

**Static methods** (pass-through from Ant Design):

```ts
Modal.info(config)
Modal.success(config)
Modal.error(config)
Modal.warning(config)
Modal.confirm(config)
```

### `ModalTitle`

Internal header component, also exported for advanced composition. Props are a `Pick<ModalProps, 'headerActions' | 'headerTabProps' | 'onCancel' | 'titleContainerStyle' | 'blank' | 'description' | 'title' | 'headerBottomBar'>`.

### `TitleContainer`

Exported styled-component (`div`) — the flex row that holds the title text and action buttons. Useful if you need to render a custom title with the same layout.

### `ModalFooter`

Footer component, also exported for standalone use or the deprecated `buildModalFooter` helper. Props: `Pick<ModalProps, 'prefix' | 'infix' | 'suffix' | 'okButton' | 'cancelButton' | 'CustomFooterButton' | 'DSButton' | 'texts' | 'onOk' | 'onCancel' | 'cancelText' | 'okText' | 'cancelButtonProps' | 'okType' | 'okButtonProps'>`.

### `buildModalFooter` (**deprecated**)

```ts
buildModalFooter(props: ModalFooterProps): JSX.Element
```

A wrapper around `<ModalFooter>`. Use `<ModalFooter>` directly instead.

### `Props` (type, **deprecated**)

Alias for `ModalProps`. Use `ModalProps` directly.

### `ModalProps` (type)

The full prop type for `Modal`.

## Usage patterns

```tsx
import Modal, { ModalFooter } from '@synerise/ds-modal';

// Basic
<Modal open={isOpen} title="Edit record" onOk={handleOk} onCancel={handleClose}>
  <p>Content here</p>
</Modal>

// Sized, no auto-footer
<Modal open={isOpen} title="Large view" size="large" footer={null} onCancel={handleClose}>
  <CustomContent />
</Modal>

// Blank modal (icon-dialog style, used internally by ds-confirmation)
<Modal open={isOpen} blank onCancel={handleClose} footer={myFooter} bodyStyle={{ padding: 0 }}>
  <MyContent />
</Modal>

// Height-capped scrollable modal
<Modal open={isOpen} title="Long list" maxViewportHeight={60} onCancel={handleClose}>
  <LongList />
</Modal>

// Custom footer slots
<Modal
  open={isOpen}
  title="Action"
  prefix={<HelpButton />}
  infix={<Divider />}
  onOk={handleOk}
  onCancel={handleClose}
>
  <p>Content</p>
</Modal>
```

## Higher-level modal components

Two purpose-built modal components are built on top of `Modal` in `@synerise/ds-confirmation`:

- **`Confirmation`** — a typed confirmation dialog (negative / warning / success / informative) with an icon, optional batch-items list, decision radio group, and related-objects drill-down view. Always uses `size="small"` and `blank={true}`.
- **`Prompt`** — a minimal variant of Confirmation with free-form `content`, typed button colour, and no icon/description. Always uses `size="small"`.

Both components manage their own footer via the `footer` prop and pass `bodyStyle={{ padding: 0 }}` to own all spacing via styled-components.

## Styling

`Modal.styles.ts` extends Ant Design's `Modal` via styled-components. Size and fullscreen behaviour are controlled via `isFullscreen` and `maxHeight` transient props on `S.AntdModal`. Additional `.less` overrides live in `src/style/` — these are side-effect imports compiled to `dist/style/index.css`.

The close button is **always hidden** via `closable={false}` on the underlying Antd modal — the `ModalTitle` component renders its own close button (a ghost icon-only `Button`) when `onCancel` is provided. Do not rely on Antd's built-in close icon.

`ModalTitle.styles.ts` uses `theme.palette['grey-800']` / `theme.palette['grey-300']` / `theme.palette['grey-600']` / `theme.palette['grey-100']` — requires a styled-components `ThemeProvider` from `@synerise/ds-core`.

## Key dependencies

- `antd` (peer, `4.24.16`) — base `Modal` component extended by this package
- `@synerise/ds-button` — close button in header, ok/cancel in footer
- `@synerise/ds-tabs` — optional tab bar rendered via `headerTabProps`
- `@synerise/ds-scrollbar` — wraps children when `maxViewportHeight` is set
- `@synerise/ds-typography` — `Typography.Title` for the modal title
- `@synerise/ds-icon` — `CloseM` icon in the close button
- `classnames` — combines body-background and blank class names

## Implementation notes

- **`closable` is hardcoded to `false`** in `Modal.tsx`. Passing `closable={true}` has no effect — the close affordance is rendered by `ModalTitle` only when `onCancel` is provided.
- **Title render condition:** The Antd `title` slot is only populated when at least one of `title`, `description`, `blank`, or `headerBottomBar` is truthy. A modal without any of these has no header chrome at all.
- **Footer render logic:** `footer={null}` suppresses the footer entirely. Any other explicit `footer` prop value overrides the auto-generated `ModalFooter`. If `footer` is omitted, `<ModalFooter {...props}>` is rendered automatically.
- **`fullScreen` size** positions the modal `fixed` covering the entire viewport; the body scrolls internally via `overflow: scroll`.
- **`maxViewportHeight` positioning** switches the modal to `position: fixed; left: 50%; bottom: 0; translate: -50%` — it anchors to the bottom of the viewport, not the center. This is intentional for sheet-style patterns.
- **`Props` type alias** is deprecated — prefer importing `ModalProps` directly.