# Popconfirm (`@synerise/ds-popconfirm`)

> A floating confirmation dialog that wraps a trigger element and requires the user to confirm or cancel an action, with optional image carousel, close icon, and description.

## Package structure

```
src/
  Popconfirm.tsx              — main component (forwardRef, wraps @synerise/ds-popover)
  Popconfirm.types.ts         — PopconfirmProps, PopconfirmType, PopconfirmTexts
  Popconfirm.styles.tsx       — all styled-components for Popconfirm
  Popconfirm.const.ts         — POPOVER_OFFSET_CONFIG (mainAxis: 16)
  ConfirmMessage/
    ConfirmMessage.tsx        — standalone tooltip-based confirm message component
    ConfirmMessage.types.ts   — ConfirmMessageProps
    ConfirmMessage.style.ts   — styled-components for ConfirmMessage
  utils/
    getTransitionConfig.ts    — scaleY transition config for @floating-ui/react
  style/
    index.less                — Ant Design Carousel overrides
  index.ts                    — public exports
  modules.d.ts                — *.less module declaration
```

## Public exports

```ts
import Popconfirm, { ConfirmMessage } from '@synerise/ds-popconfirm';
// types
import type { PopconfirmProps, PopconfirmTexts, ConfirmMessageProps } from '@synerise/ds-popconfirm';
```

- `default` — `Popconfirm` component (also has `.ConfirmMessage` attached — deprecated access pattern)
- `ConfirmMessage` — named export (preferred)
- `PopconfirmProps` — type
- `PopconfirmTexts` — type (picks `okText | description | title | cancelText` from `PopconfirmProps`)
- `ConfirmMessageProps` — type

### `Popconfirm`

`forwardRef<HTMLElement, PopconfirmProps>` — delegates positioning/open state to `@synerise/ds-popover`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | Header text/node |
| `description` | `ReactNode` | — | Body text/node below title |
| `icon` | `ReactNode` | — | Icon displayed left of the title |
| `closeIcon` | `ReactNode` | — | Icon rendered as a close button (top-right); clicking it closes the popconfirm |
| `titlePadding` | `boolean` | — | Adjusts close icon margin and description top spacing |
| `images` | `string[]` | — | URLs rendered in an Ant Design Carousel (fade effect) |
| `imagesAutoplay` | `boolean` | — | Enables carousel autoplay |
| `imagesAutoplaySpeed` | `number` | `5000` | Autoplay interval in ms |
| `withLink` | `ReactNode` | — | Inline link node rendered below description |
| `cancelText` | `ReactNode` | — | Label for the cancel button |
| `cancelButtonProps` | `ButtonProps` | — | Extra props merged onto the cancel `@synerise/ds-button` |
| `okText` | `ReactNode` | — | Label for the confirm button |
| `okButtonProps` | `ButtonProps` | — | Extra props merged onto the confirm `@synerise/ds-button` |
| `okType` | `ButtonProps['type']` | `'primary'` | Type variant of the confirm button |
| `hideButtons` | `ReactNode` | — | Truthy value hides the button row entirely (type is `ReactNode`, not `boolean`) |
| `buttonsAlign` | `'left' \| 'right'` | — | Flex alignment of the button wrapper (`flex-start` for both; `right` omitted maps to `flex-end`) |
| `disabled` | `boolean` | — | When true, renders only `{children}` with no popover |
| `staticVisible` | `boolean` | — | Prevents dismiss on outside click (`dismissConfig.enabled = false`) |
| `placement` | `LegacyPopconfirmPlacement` | `'top'` | Popover placement (maps to `@floating-ui` placement via `getPlacement`) |
| `trigger` | `PopoverOptions['trigger']` | `'click'` | Open trigger (`'click'`, `'hover'`, or array) |
| `open` | `boolean` | — | Controlled open state (one-way: only syncs `false → true`) |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |
| `overlayClassName` | `string` | — | Class applied to the popconfirm container div |
| `overlayStyle` | `CSSProperties` | — | Inline styles applied to the popconfirm container div |
| `zIndex` | `number` | `theme.variables['zindex-popconfirm']` | Z-index override |
| `asChild` | `boolean` | `true` | Passed to `PopoverTrigger`; merges props onto the single child element |
| `children` | `ReactNode` | — | The trigger element |
| `getPopupContainer` | `PopoverOptions['getPopupContainer']` | — | Portal mount node override |
| `offsetConfig` | `PopoverOptions['offsetConfig']` | — | Override default 16px offset |
| `flipConfig` | `PopoverOptions['flipConfig']` | — | Flip middleware config |
| `shiftConfig` | `PopoverOptions['shiftConfig']` | — | Shift middleware config |

**`LegacyPopconfirmPlacement`** values: `'topLeft' | 'top' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomCenter' | 'bottomRight' | 'right' | 'left' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'`

### `ConfirmMessage`

A lightweight confirmation feedback component: clicking the child triggers `onClick(showMessage)`, and the consumer calls `showMessage()` to display a timed tooltip overlay.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Text shown inside the tooltip message |
| `onClick` | `(showMessage: () => void) => void` | — | **Required.** Consumer receives a callback to imperatively show the message |
| `children` | `ReactNode` | — | Trigger element |
| `icon` | `ReactNode` | — | Icon shown left of the title in the message |
| `displayDuration` | `number` | `5000` | How long (ms) the message stays visible |
| `placement` | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'topLeft'` | Tooltip placement |

## Usage patterns

```tsx
import Popconfirm from '@synerise/ds-popconfirm';

// Basic
<Popconfirm
  title="Are you sure?"
  okText="Yes"
  cancelText="No"
  onConfirm={() => doSomething()}
  onCancel={() => {}}
>
  <button>Delete</button>
</Popconfirm>

// With description and image carousel
<Popconfirm
  title="Are you sure?"
  description="This action cannot be undone."
  images={['https://example.com/img.jpg']}
  imagesAutoplay
>
  <button>Delete</button>
</Popconfirm>

// ConfirmMessage (named import preferred)
import { ConfirmMessage } from '@synerise/ds-popconfirm';

<ConfirmMessage
  title="Copied!"
  icon={<Icon component={<WarningFillM />} />}
  onClick={(showMessage) => { copyToClipboard(); showMessage(); }}
>
  <button>Copy</button>
</ConfirmMessage>
```

## Styling

- Container: `max-width: 288px`, `padding: 16px`, `border-radius: 3px`, `background: theme.palette.white`, shadow from `theme.variables['box-shadow-2']`
- Title: `14px`, `font-weight: 500`, `color: theme.palette['grey-800']`
- Description: `13px`, `font-weight: 400`; `margin-top: 6px` only when `titlePadding` is falsy
- Buttons: `height: 32px`; cancel is always `type="secondary"`, confirm uses `okType`
- Arrow: custom SVG triangle, positioned via CSS classes (`ds-popover-arrow-*`) — rotated per placement
- Carousel dots: custom styled Ant Design `.slick-dots`; active dot uses `theme.palette['green-600']` border
- `ConfirmMessage` styles contain a hardcoded colour (`#404c5a` for text) — not a design token

## Key dependencies

- `@synerise/ds-popover` — provides `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverArrow`, `getPlacement`
- `@synerise/ds-button` — cancel and confirm buttons
- `@synerise/ds-tooltip` — used by `ConfirmMessage` internally
- `@synerise/ds-core` — `useTheme` for z-index and colour tokens
- `antd` `Carousel` — image slideshow
- `@floating-ui/react` — `UseTransitionStylesProps` (peer dep declared as devDependency)

## Implementation notes

- **Controlled `open` is one-way.** The effect only syncs `false → true` (sets `isOpen` when `open` becomes truthy but never back to `false`). Fully controlled close must be done by not passing `open=true`.
- **`disabled` short-circuits entirely** — renders `<>{children}</>` with no popover infrastructure mounted.
- **`staticVisible`** disables `@floating-ui` dismiss middleware; the popover will not close on outside click or blur.
- **`asChild=true` (default)** merges trigger props onto the direct child element using `PopoverTrigger`. Set `asChild={false}` to wrap the child in a span instead.
- **`hideButtons` type is `ReactNode`**, not `boolean`. Any truthy value hides buttons. This is a type inaccuracy in the source.
- **`Popconfirm.ConfirmMessage`** is a deprecated access pattern — use the named export `ConfirmMessage` instead (JSDoc `@deprecated` comment in `Popconfirm.tsx`).
- **`buttonsAlign`** default is effectively right-aligned (`flex-end`) when undefined, but the README says default is `'right'` — the prop simply being absent achieves the same visual result via a falsy branch.
- Tests use **Jest** (not Vitest), consistent with `jest.config.js` present in package root.
- `@floating-ui/react` is listed only in `devDependencies` despite `getTransitionConfig.ts` importing its types — safe at runtime because types are erased, but indicates the package relies on the host having it transitively.
