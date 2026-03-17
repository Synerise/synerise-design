# Alert (`@synerise/ds-alert`)

> **DEPRECATED PACKAGE.** Do not add new usages. Four purpose-built replacement packages exist; see migration table below.

## Migration

| Export from `@synerise/ds-alert` | Replacement |
|----------------------------------|-------------|
| `Toast` | `@synerise/ds-toast` |
| `BroadcastBar` | `@synerise/ds-broadcast-bar` |
| `InlineAlert` / `IconAlert` | `@synerise/ds-inline-alert` |
| `SectionMessage` | `@synerise/ds-section-message` |
| `AlertInfo` | `@synerise/ds-result` (discouraged — no direct replacement yet) |
| `Alert` (default) | `@synerise/ds-section-message` or `@synerise/ds-toast` depending on use case |
| `AlertSemanticColor` | No direct replacement — use discouraged |

## Package structure

```
src/
  Alert.tsx                    — main Alert component (Ant Design wrapper, deprecated)
  Alert.types.ts               — AlertType, Props (extends antd AlertProps)
  Alert.styles.tsx             — AntdAlert, AlertContent, AlertMessage, AlertDescription
  index.ts                     — all exports
  InlineAlert/                 — thin wrapper → @synerise/ds-inline-alert
  IconAlert/                   — re-export → @synerise/ds-inline-alert (deprecated)
  SectionMessage/              — re-export → @synerise/ds-section-message (deprecated)
  BroadcastBar/                — re-export → @synerise/ds-broadcast-bar (deprecated)
  Toast/                       — standalone toast (deprecated, use @synerise/ds-toast)
  AlertInfo/                   — full-page status illustration component (discouraged)
  ColorSemantic/               — semantic color icon box (no replacement, discouraged)
```

## Public exports

### `Alert` (default) — **deprecated**

Wraps Ant Design `Alert`. Extends `antd/AlertProps` with:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'warning' \| 'error' \| 'info'` | — | **Required.** Semantic type |
| `message` | `ReactNode` | `undefined` | Alert message content |
| `color` | `'blue' \| 'grey' \| 'red' \| 'green' \| 'yellow' \| 'pink' \| 'mars' \| 'orange' \| 'fern' \| 'cyan' \| 'purple' \| 'violet'` | `undefined` | Colour override |
| `mode` | `'background' \| 'background-outline' \| 'outline' \| 'clear'` | `undefined` | Visual style mode |
| `showMoreLabel` | `ReactNode` | `undefined` | Label for "show more" link |
| `onShowMore` | `() => void` | `undefined` | "Show more" click handler |

Has `Alert.InlineAlert` sub-component (forwards to `InlineAlert`).

### `Toast` — **deprecated**, use `@synerise/ds-toast`

Standalone toast notification. Extends `antd/AlertProps` with extensive colour and expand props. See source `Toast.types.ts` for full prop list.

### `InlineAlert` — **deprecated**, use `@synerise/ds-inline-alert`

Thin wrapper around `@synerise/ds-inline-alert`. Props: `type: 'success' | 'alert' | 'warning' | 'info'`, `message: ReactNode`.

### `SectionMessage` — **deprecated**, use `@synerise/ds-section-message`

Direct re-export from `@synerise/ds-section-message`.

### `BroadcastBar` — **deprecated**, use `@synerise/ds-broadcast-bar`

Direct re-export from `@synerise/ds-broadcast-bar`.

### `IconAlert` — **deprecated**, use `@synerise/ds-inline-alert`

Alias for `InlineAlert`. Re-exports from `@synerise/ds-inline-alert`.

### `AlertInfo` — **discouraged**, no direct replacement

Full-page status illustration (icon + text + optional button). Props: `type`, `size` (`AlertSize.SMALL`=48px | `AlertSize.MEDIUM`=96px), `label`, `labelPosition`, `text`, `button`, `fontSize`, `mode`.

### `AlertSemanticColor` — **discouraged**, no direct replacement

100×100 px coloured icon box with 8 semantic types and 4 visual modes. Not exported from `index.ts` — only accessible via deep import.

### `AlertStyles`

```ts
{ Alert: typeof MainAlertStyles, Toast: typeof ToastStyles }
```

Exported for consumers that need to extend styles. `AlertMessage` from `Alert.styles` is also exported directly (deprecated — use `AlertStyles.Alert` instead).

### `AlertSize`

```ts
enum AlertSize { SMALL = 48, MEDIUM = 96 }
```

Used by `AlertInfo`.

## Implementation notes

- `SectionMessage`, `BroadcastBar`, and `IconAlert` are **one-line re-exports** — they add no logic, just re-export from their respective packages.
- `InlineAlert` has its own thin styled wrapper (`InlineAlert.styles.ts`) on top of `@synerise/ds-inline-alert` — the styles may diverge from the source package.
- `Toast` is a **full standalone implementation** (not a re-export). It uses `animate.css` keyframe animations and Ant Design `Alert` as its base. It is **not** a re-export of `@synerise/ds-toast`.
- `Alert` default icons are `Check2M` (success), `Close2M` (error), `NotificationsM` (warning/info) from `@synerise/ds-icon`.
- Ant Design 4.x (`antd ^4.24.16`) is a peer dependency — this package is tied to antd 4.
