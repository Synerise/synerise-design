# useFocusTrap

Traps keyboard focus within a container element. When active, Tab and Shift+Tab cycle through focusable elements inside the container without escaping to the rest of the page. On activation, the first focusable element receives focus. On deactivation, focus is restored to the element that was focused before the trap activated.

## Usage

```tsx
import { useRef } from 'react';
import { useFocusTrap } from '@synerise/ds-utils';

const Dialog = ({ open, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);

  return (
    <div ref={containerRef} tabIndex={-1}>
      {children}
    </div>
  );
};
```

## API

```ts
useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean): void
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `containerRef` | `RefObject<HTMLElement \| null>` | Ref to the container element that should trap focus |
| `active` | `boolean` | Whether the focus trap is currently active |

## Behaviour

- **Activation (`active` changes to `true`):** Saves `document.activeElement`, then focuses the first focusable element inside the container (or the container itself if none exist).
- **Tab wrapping:** When focus is on the last focusable element and Tab is pressed, focus wraps to the first. Shift+Tab from the first wraps to the last.
- **Deactivation (`active` changes to `false`):** Removes the Tab trap listener and restores focus to the previously focused element.
- **Dynamic content:** Focusable elements are queried on each Tab press, so elements added or removed while the trap is active are handled correctly.

## Focusable elements

The following elements are considered focusable:

- `a[href]`
- `button:not([disabled])`
- `input:not([disabled])`
- `select:not([disabled])`
- `textarea:not([disabled])`
- `[tabindex]:not([tabindex="-1"])`
