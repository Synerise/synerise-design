# Toast (`@synerise/ds-toast`)
> A notification toast component built on `react-hot-toast` that displays status messages with optional description, close button, expandable content, and action buttons.

## Package structure
```
src/
  Toast.tsx          — Toast component and showToast imperative function; attaches static methods
  Toast.types.ts     — ToastType, ToastProps, ShowToastProps, ToastCustomisationOptions
  Toast.styles.ts    — All styled-components (Container, AnimationContainer, AlertMessage, etc.)
  constants.tsx      — ICONS map: ToastType → ds-icon ReactNode
  index.ts           — Public re-exports
  utils/
    dismissToast.ts  — Re-exports toast.dismiss from react-hot-toast (animated exit)
    removeToast.ts   — Re-exports toast.remove from react-hot-toast (instant removal)
    index.ts         — Re-exports both utils
  __specs__/
    Toast.spec.tsx   — Jest tests (renderWithProvider + TOASTER_DEFAULTS from ds-core)
```

## Public exports
All of the following are exported from the package root (`index.ts`):

- `Toast` (default export + named) — the React component
- `showToast` — imperative function to show a toast via react-hot-toast's Toaster
- `dismissToast` — alias for `toast.dismiss` (animated exit, optional toastId)
- `removeToast` — alias for `toast.remove` (instant removal, optional toastId)
- `ICONS` — `Record<ToastType, ReactNode>` mapping types to ds-icon components
- `ToastProps` (type)

### `Toast` component
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'warning' \| 'negative' \| 'informative'` | — | Controls the icon and top-border accent color |
| `message` | `ReactNode` | — | Primary message text (bold, 14px) |
| `description` | `ReactNode` | — | Secondary text below message (13px) |
| `customIcon` | `ReactElement` | — | Overrides the default type icon |
| `expander` | `boolean` | — | Shows an `AngleDownS` chevron that toggles `expandedContent` |
| `expandedContent` | `ReactNode` | — | Content revealed when `expanded` is true; visibility is CSS-toggled |
| `expanded` | `boolean` | — | Controls whether `expandedContent` is visible |
| `onExpand` | `(isExpanded: boolean) => void` | — | Called when the expander chevron is clicked |
| `withClose` | `boolean` | — | Renders a `CloseM` icon that dismisses the toast |
| `onCloseClick` | `() => void` | — | Called when close icon is clicked (fires before `toast.dismiss`) |
| `onDismiss` | `() => void` | — | Called on component unmount (covers both manual and timeout dismissal) |
| `button` | `ReactNode` | — | Action element rendered below description/expandedContent |
| `toastId` | `string` | — | ID used when calling `toast.dismiss` from the close button |
| `show` | `boolean` | `true` | Drives enter/exit animation (`AnimationContainer`); set by react-hot-toast internally |

Extends `WithHTMLAttributes<HTMLDivElement, ...>` — all standard div props are passed to the inner `Container`.

### `showToast(type, props, options?)`
| Param | Type | Description |
|-------|------|-------------|
| `type` | `ToastType` | Toast variant |
| `props` | `ShowToastProps` | All `ToastProps` except `type` and `show` |
| `options` | `ToastCustomisationOptions` | Subset of react-hot-toast `ToastOptions`: `duration`, `position`, `id`, `removeDelay`, `className`, `style` |

Returns the `toastId` string. If `props.toastId` is not provided a `uuid` is generated.

### Static shortcut methods on `Toast`
| Method | Maps to type |
|--------|-------------|
| `Toast.success(props, options?)` | `'success'` |
| `Toast.error(props, options?)` | `'negative'` |
| `Toast.info(props, options?)` | `'informative'` |
| `Toast.warning(props, options?)` | `'warning'` |

## Usage patterns

### Imperative (Toaster-based, recommended)
```tsx
import Toast from '@synerise/ds-toast';

// Static shortcut
Toast.success({ message: 'Campaign saved!' });
Toast.error({ message: 'Failed', description: 'No response from server' });

// With custom duration and explicit id
Toast.warning({ message: 'Slow connection' }, { duration: 5000, id: 'my-toast' });
```

### Programmatic with full control
```tsx
import { showToast, dismissToast, removeToast } from '@synerise/ds-toast';

const id = showToast('informative', { message: 'Loading...', withClose: true });

// Later — animated dismiss or instant remove
dismissToast(id);  // fade-out animation
removeToast(id);   // instant removal
```

### Controlled expandable toast
```tsx
import Toast from '@synerise/ds-toast';

<Toast
  type="warning"
  message="3 records failed"
  expander
  expanded={isExpanded}
  onExpand={setIsExpanded}
  expandedContent={<ul>...</ul>}
/>
```

### Inline (no Toaster required)
The `Toast` component can be rendered directly in JSX without react-hot-toast's `Toaster`. The `show` prop is only needed when driving the animation externally.

```tsx
import Toast from '@synerise/ds-toast';

<Toast type="success" message="Saved!" withClose onCloseClick={handleClose} />
```

## Styling
- `Container` renders a white card (`border-radius: 4px`, `box-shadow: 0 16px 32px 0 rgba(35,41,54,0.12)`, `max-width: 500px`) with a 2px top border in the accent color for the type.
- Accent colors (icon fill + top border): success → `green-600`, warning → `yellow-600`, negative → `red-500`, informative → `grey-600`.
- `AnimationContainer` plays `openingAnimation` (slide up + fade in from `translateY(60px)`) when `$show=true` and `closingAnimation` (fade out + slight scale-down + `translateY(-8px)`) when `$show=false`. Duration is `0.6s cubic-bezier(0.4,0,0.2,1)`.
- `AlertMessage` right-padding is computed dynamically: 24px (no icons), 48px (close or expander), 72px (both).
- `expandedContent` is shown/hidden via `visibility + height: auto/0` (not `display: none`), preserving layout flow.
- Depends on `@synerise/ds-unordered-list` styles (`UnorderedList` selector used inside `AlertContent`).

## Key dependencies
- `react-hot-toast ^2.5.2` — Toaster and imperative toast API
- `uuid ^8.3.2` — Auto-generates `toastId` when not provided
- `@synerise/ds-icon` — `Check3M`, `WarningFillM`, `InfoFillM`, `AngleDownS`, `CloseM`
- `@synerise/ds-unordered-list` — style import for list layout inside expanded content
- `@synerise/ds-core` (peer) — theme tokens; `DSProvider` embeds the Toaster via `TOASTER_DEFAULTS`
- `@synerise/ds-utils` — `WithHTMLAttributes` utility type

## Implementation notes
- `onDismiss` is fired from a `useEffect` cleanup (component unmount), not from the close click handler. It therefore fires for both manual dismissal and timeout expiry.
- `onCloseClick` fires first, then `toast.dismiss(toastId)` is called — both only if `toastId` is present.
- `Toast.error` maps to type `'negative'` (not `'error'`). There is no `'error'` type in `ToastType`.
- The Toaster must be mounted for imperative toasts to render. In tests this is done via `renderWithProvider(..., { toasterProps: TOASTER_DEFAULTS })` from `@synerise/ds-core`.
- Tests use **Jest** (not Vitest) — see `jest.config.js`.
- `FirstButtonWrapper` and `Wrapper` styled-components are exported from `dist/Toast.styles` (not from the package root) and used in Storybook stories for layout.
