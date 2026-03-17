# CopyIcon (`@synerise/ds-copy-icon`)

> Clickable icon that copies a string to the clipboard via `copy-to-clipboard`, with a tooltip that temporarily switches from "Copy" to "Copied!" for 2 seconds after a successful copy.

## Package structure

```
src/
  CopyIcon.tsx        — main component
  CopyIcon.types.ts   — CopyIconProps, CopyTooltipTexts
  CopyIcon.styles.tsx — single styled div wrapper
  index.ts            — public exports
```

## Public exports

### `CopyIcon` (default)

Accepts all `HTMLDivElement` attributes in addition to its own props (`WithHTMLAttributes<HTMLDivElement, ...>`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `copyValue` | `string` | _(required)_ | String written to the clipboard on click. |
| `texts` | `Partial<CopyTooltipTexts>` | `undefined` | Override tooltip labels. Falls back to `useIntl` i18n strings. |
| `icon` | `ReactNode` | `undefined` | Custom icon to render. Defaults to `CopyClipboardM` at 24px. |
| `placement` | `TooltipProps['placement']` | `undefined` | Tooltip placement (Ant Design `TooltipPlacement`). |
| `onCopy` | `() => void` | `undefined` | Extra callback fired after a successful copy. |
| `onClick` | `MouseEventHandler<HTMLDivElement>` | `undefined` | Also called on every click (copy success or failure). |
| `onMouseEnter` | `MouseEventHandler<HTMLDivElement>` | `undefined` | Forwarded; resets tooltip to "Copy" text on re-enter if not in copied state. |
| `onMouseLeave` | `MouseEventHandler<HTMLDivElement>` | `undefined` | Forwarded as-is. |

### `CopyTooltipTexts` (type)

| Field | Type | i18n default |
|-------|------|--------------|
| `copyTooltip` | `ReactNode` | `'Copy'` |
| `copiedTooltip` | `ReactNode` | `'Copied!'` |

### `CopyIconProps` (type)

Full props interface — exported for typed prop-passing.

## Usage patterns

```tsx
import CopyIcon from '@synerise/ds-copy-icon';

// Minimal
<CopyIcon copyValue="some-text" />

// With custom tooltip labels and callback
<CopyIcon
  copyValue={apiKey}
  texts={{ copyTooltip: 'Copy API key', copiedTooltip: 'Key copied!' }}
  onCopy={() => analytics.track('api_key_copied')}
  placement="top"
/>

// With custom icon
<CopyIcon copyValue={value} icon={<Icon component={<LinkM />} />} />
```

## Key dependencies

- `copy-to-clipboard` (peer dep `^3.3.1`) — writes to clipboard; returns `false` if copy fails. The "copied" feedback only triggers when it returns `true`.
- `react-intl` `useIntl` (peer dep) — default tooltip strings. `IntlProvider` must be present in the tree.
- `@synerise/ds-tooltip` — wraps the icon with the toggling tooltip.
- `@synerise/ds-icon` `CopyClipboardM` — default icon.

## Implementation notes

- **`useIntl()` is called unconditionally** — an `IntlProvider` must be in the tree even if `texts` is fully provided.
- **"Copied" lock** — `isCopiedBlock` state prevents the tooltip from resetting back to "Copy" on `mouseEnter` during the 2-second feedback window. The reset uses `setTimeout(..., 2000)` with no cleanup, so if the component unmounts during that window, a no-op state update will be attempted (harmless in React 18 but can produce warnings in older versions).
- **`onCopy` vs `onClick`** — `onCopy` fires only on a successful copy (when `copy-to-clipboard` returns `true`). `onClick` fires on every click regardless. Both are called within the same handler.
- **`mouseEnter` stops propagation** — `handleMouseEnter` always calls `event.stopPropagation()` before forwarding to the consumer's `onMouseEnter`. Same for `mouseLeave`.
- **`CopyTooltipTexts` is not exported from `index.ts`** — only `CopyIconProps` is exported. Import the type directly if needed: `import type { CopyTooltipTexts } from '@synerise/ds-copy-icon/dist/CopyIcon.types'`.
