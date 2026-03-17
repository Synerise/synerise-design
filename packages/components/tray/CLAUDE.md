# Tray (`@synerise/ds-tray`)

> A fixed-position slide-over panel (400 px wide, anchored top-right by default) whose content and visibility are controlled via React context — the `Tray` instance only renders when its `id` is opened by a `TrayProvider`.

## Package structure

```
src/
  Tray.tsx                   — main component; reads state from context, renders null when closed
  Tray.types.ts              — TrayProps interface
  Tray.styles.ts             — all styled-components (wrapper, header, footer, scrollbar, title)
  Tray.const.ts              — fixed dimensions (WRAPPER_HEIGHT, HEADER_HEIGHT, FOOTER_HEIGHT)
  index.ts                   — public exports
  components/
    TrayProvider.tsx         — context provider + TrayData / TrayState types
  contexts/
    TrayContext.ts           — TrayContext + TrayContextType
  hooks/
    useTray.ts               — public hook: { open, close }
    useTrayContext.ts        — internal hook; throws if used outside TrayProvider
  __specs__/
    Tray.spec.tsx            — Jest tests (show, hide, multi-tray isolation)
```

## Public exports

### `Tray` (default export)

Mounts a tray instance bound to an `id`. Returns `null` when the tray for that id is not open.

`TrayProps = WithHTMLAttributes<HTMLDivElement, { id: string }>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | Binds this instance to provider state |
| `className`, `style`, `data-*`, … | `HTMLDivElement` attrs | no | Forwarded to the outer wrapper — use these to override default `position: fixed; top: 0; right: 0` |

No `forwardRef`.

### `TrayProps`

Type re-export for consumers that need to type the component's props.

### `TrayProvider`

Context provider that must wrap any `Tray` instances and any code calling `useTray`.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | App tree |

### `useTray`

Returns `{ open, close }`.

| Method | Signature | Description |
|--------|-----------|-------------|
| `open` | `(id: string, data: TrayData) => void` | Opens the tray with the given id, setting its content |
| `close` | `(id: string) => void` | Closes the tray with the given id |

`TrayData` shape (passed as the second argument to `open`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | `ReactNode` | yes | Main scrollable body |
| `title` | `ReactNode` | yes | Rendered in the header as a level-4 `Title` |
| `headerRightSide` | `ReactNode` | no | Rendered to the right of the title (before the built-in close button) |
| `footer` | `ReactNode` | no | Rendered in the footer bar; bar is hidden when `footer` is `undefined` |
| `onClose` | `(id: string) => void` | no | Called after the built-in close button triggers `closeTray(id)` |

## Usage patterns

```tsx
import React from 'react';
import Tray, { TrayProvider, useTray } from '@synerise/ds-tray';

// 1. Wrap once with provider and mount Tray instances
const App = () => (
  <TrayProvider>
    <Tray id="details" />
    <PageContent />
  </TrayProvider>
);

// 2. Open/close from anywhere inside the provider
const PageContent = () => {
  const { open, close } = useTray();

  return (
    <button
      onClick={() =>
        open('details', {
          title: 'Details',
          content: <div>Body content</div>,
          footer: <button onClick={() => close('details')}>Close</button>,
          onClose: (id) => console.log('closed', id),
        })
      }
    >
      Open details
    </button>
  );
};
```

```tsx
// Repositioning via className / style
import styled from 'styled-components';
import Tray from '@synerise/ds-tray';

const TopLeftTray = styled(Tray)`
  top: 20px;
  left: 50px;
`;

<TopLeftTray id="sidebar" />
```

## Context / Provider

`TrayContext` (in `contexts/TrayContext.ts`) is created with `undefined` as the default value. `TrayProvider` supplies `{ openTray, closeTray, getTrayState }`. `useTrayContext` throws with a descriptive error when called outside the provider. The `Tray` component calls `useTrayContext` internally — mounting `<Tray>` outside `<TrayProvider>` will throw at render time.

## Styling

All styles are in `Tray.styles.ts`. Key layout:
- `TrayWrapper`: `position: fixed; top: 0; right: 0; width: 400px; max-height: 562px; z-index: zindex-tooltip`. Override via `className`/`style`.
- `TrayHeader`: fixed height `56px`, `padding-left: 18px`, flex row with space-between.
- `TrayContent`: flex `1 1 auto`, wraps a `@synerise/ds-scrollbar` in `absolute` mode.
- `TrayFooter`: fixed height `48px`, `grey-050` background, only rendered when `footer` is provided.

All colours and shadow come from `@synerise/ds-core` theme tokens (`grey-050`, `grey-100`, `grey-200`, `white`, `box-shadow-2`, `zindex-tooltip`).

## Custom hooks

### `useTray`

Public hook. Thin alias over `useTrayContext` — exposes `open` (`openTray`) and `close` (`closeTray`) with friendlier names. No side effects.

### `useTrayContext` _(internal)_

Reads `TrayContext` and throws `'useTrayContext must be used within a TrayProvider'` if the context is `undefined`. Used internally by `Tray.tsx` and `useTray`.

## Key dependencies

- `@synerise/ds-button` — ghost single-icon close button in the header
- `@synerise/ds-icon` + `CloseM` — close icon
- `@synerise/ds-scrollbar` — scrollable content area inside `TrayContent`
- `@synerise/ds-typography` — `Title` level 4 for the header title

## Implementation notes

- **No open/close animation** — `Tray` returns `null` directly when `isOpen` is `false`. There is no CSS transition or mount/unmount animation.
- **`id` is `string` only** — despite some documentation saying `string | number`, the actual types (`TrayProps`, `TrayContext`, `TrayData.onClose`) all use `string`.
- **`TrayData` is not exported from `index.ts`** — consumers who need to type the data object must import it directly from the internal path `@synerise/ds-tray/dist/components/TrayProvider` or use `Parameters<ReturnType<typeof useTray>['open']>[1]`.
- **`content` and `title` are required** in `TrayData` — omitting them will cause a TypeScript error but no runtime guard.
- **Closing sets `isOpen: false`** but keeps the `data` object in state. Re-opening with the same id and new data replaces the previous data.
- **Test runner is Jest** (not Vitest) — `"test": "jest"` in package.json, uses `jest.config.js`.
