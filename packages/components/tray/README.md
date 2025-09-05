---
id: tray
title: Tray
---

Tray UI Component

A slide-over panel (tray) rendered from the edge of the screen. Content and visibility are provided via the Tray context — the component itself only mounts/render when its id is opened by the provider.

## Installation

```bash
npm i @synerise/ds-tray
# or
yarn add @synerise/ds-tray
```

## Quick overview

- Mount a single `Tray` (or more) inside a `TrayProvider`.
- Open/close trays via the `useTray` hook which calls `openTray(id, TrayData)` / `closeTray(id)`.

Key source files:
- Component: [`Tray`](packages/components/tray/src/Tray.tsx)
- Props type: [`TrayProps`](packages/components/tray/src/Tray.types.ts)
- Provider & data shape: [`TrayProvider` / `TrayData`](packages/components/tray/src/components/TrayProvider.tsx)
- Hooks: [`useTray`](packages/components/tray/src/hooks/useTray.ts), [`useTrayContext`](packages/components/tray/src/hooks/useTrayContext.ts)
- Context: [`TrayContext`](packages/components/tray/src/contexts/TrayContext.ts)

## Basic usage

1) Wrap your app with the provider and mount a `Tray` with a stable id:

```tsx
import React from 'react';
import { TrayProvider } from '@synerise/ds-tray';
import Tray from '@synerise/ds-tray';

const App = () => (
  <TrayProvider>
    {/* mount tray(s) that will be controlled via context */}
    <Tray id="my-tray" />
    {/* other app UI */}
  </TrayProvider>
);
```

2) Open the tray from anywhere inside the provider using the hook:

```tsx
import React from 'react';
import { useTray } from '@synerise/ds-tray';

const Demo = () => {
  const { open, close } = useTray();

  const openTray = () => {
    open('my-tray', {
      title: 'Details',
      content: <div>Tray content</div>,
      headerRightSide: <span>Extra</span>,
      footer: <div><button onClick={() => close('my-tray')}>Close</button></div>,
      onClose: (id) => console.log('closed', id),
    });
  };

  return <button onClick={openTray}>Open tray</button>;
};
```

## API

Tray component props
| Property                      | Description                                        | Type                        | Required |     |
|-------------------------------|----------------------------------------------------|-----------------------------|----------|-----|
| `id`                          | Identifier used to bind the tray to provider state | `string                     | number`  | yes |
| any other HTML div attributes | `className`, `style`, `data-*`, etc.               | `HTMLDivElement` attributes | no       |     |


Tray data (passed to `open(id, data)`) — [`TrayData`](packages/components/tray/src/components/TrayProvider.tsx)
| Property          | Description                                    | Type         |                  |
|-------------------|------------------------------------------------|--------------|------------------|
| `content`         | Main content to render inside the tray         | `ReactNode`  |                  |
| `title`           | Header title (node)                            | `ReactNode`  |                  |
| `headerRightSide` | Node rendered in header to the right of title  | `ReactNode`  |                  |
| `footer`          | Footer node rendered at bottom of tray         | `ReactNode`  |                  |
| `onClose`         | Callback invoked when tray close action occurs | `(id: string | number) => void` |

Notes
- The `Tray` component reads its state from context (`getTrayState(id)`) and returns `null` if not open. See [`Tray.tsx`](packages/components/tray/src/Tray.tsx).
- The provider stores tray entries keyed by id; you can open different trays by using different ids.
- The close button in the header calls `closeTray(id)` and triggers `TrayData.onClose` if provided.
- `Tray` accepts normal div props because `TrayProps` extends HTML div attributes. See [`Tray.types.ts`](packages/components/tray/src/Tray.types.ts).
