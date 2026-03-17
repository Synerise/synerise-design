# Badge (`@synerise/ds-badge`)

> Ant Design `Badge` wrapper that adds a DS colour system, DS-specific status types, flag/pulsing dot mode, and outlined counter variant.

## Package structure

```
src/
  Badge.tsx          — main component (thin wrapper; auto-derives `dot` from `status`)
  Badge.types.ts     — BadgeProps, Color, ColorHue, Status
  Badge.styles.tsx   — styled Ant Design Badge with all DS-specific style logic
  index.ts           — public exports
  style/
    index.less       — global Ant Design badge overrides
```

## Public exports

### `Badge` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `BadgeStatus` | `undefined` | DS status: `'active'` `'inactive'` `'blocked'` `'processing'` `'warning'`. Overrides Ant Design's `status` (different value set). Also auto-enables dot mode. |
| `flag` | `boolean` | `undefined` | Renders the dot with `::before`/`::after` halos (larger ring indicators). Requires dot/status to be active. |
| `pulsing` | `boolean` | `undefined` | Adds repeating pulse animation to the `::before`/`::after` halos. Only visible when `flag` or `status` is set. |
| `outlined` | `boolean` | `undefined` | Adds a white `box-shadow` ring around the count badge. |
| `backgroundColor` | `BadgeColor` | `undefined` | Background colour of the count badge. Combined with `backgroundColorHue`. |
| `backgroundColorHue` | `BadgeColorHue` | `undefined` | Hue of the background colour (`'050'`–`'900'`). |
| `textColor` | `BadgeColor` | `undefined` | Text colour of the count badge. Combined with `textColorHue`. |
| `textColorHue` | `BadgeColorHue` | `undefined` | Hue of the text colour. |
| `customColor` | `BadgeColor \| DefaultColor` | `undefined` | Overrides the dot/status dot colour. If the string contains `-` it is used as a full palette key (e.g. `'blue-600'`); otherwise `-600` is appended automatically. |

All other props are forwarded to `antd/lib/badge` (`count`, `dot`, `overflowCount`, `showZero`, `offset`, `text`, `title`, `children`, etc.).

### Types

| Export | Description |
|--------|-------------|
| `BadgeProps` | Full props interface |
| `BadgeStatus` | `'active' \| 'inactive' \| 'blocked' \| 'processing' \| 'warning' \| undefined` |
| `BadgeColor` | `'red' \| 'green' \| 'grey' \| 'yellow' \| 'blue' \| 'pink' \| 'mars' \| 'orange' \| 'fern' \| 'cyan' \| 'purple' \| 'violet' \| 'white' \| 'transparent'` |
| `BadgeColorHue` | `'900' \| '800' \| '700' \| '600' \| '500' \| '400' \| '300' \| '200' \| '100' \| '050'` |

## Usage patterns

```tsx
import Badge from '@synerise/ds-badge';

// Count badge
<Badge count={5}>
  <Avatar />
</Badge>

// Status dot (dot is auto-enabled when status is provided)
<Badge status="active" text="Online" />

// Flag dot with pulse
<Badge status="processing" flag pulsing>
  <Avatar />
</Badge>

// Custom coloured count badge
<Badge count={3} backgroundColor="blue" backgroundColorHue="600" textColor="white" textColorHue="050" />

// Custom dot colour
<Badge status="active" customColor="purple-700" />
```

## Styling

`Badge.styles.tsx` creates a styled version of `antd/lib/badge` directly (not a wrapper div). DS-specific props (`flag`, `outlined`, `backgroundColor`, `textColor`, `backgroundColorHue`, `textColorHue`, `pulsing`, `customColor`) are destructured and stripped before being forwarded to the Ant Design component to avoid unknown DOM attribute warnings.

Uses `@synerise/ds-core` theme palette tokens exclusively. Count badge is `16px` tall (overrides Ant Design default). Typography uses `macro.h200` from `@synerise/ds-typography`.

Status dot colours are hardcoded to specific palette tokens:
- `active` → `green-600`
- `inactive` → `grey-400`
- `blocked` → `red-600`
- `processing` → `blue-600`

These are overridden when `customColor` is provided.

## Key dependencies

- `antd/lib/badge` — base component
- `@synerise/ds-core` — theme palette tokens and `DefaultColor` type
- `@synerise/ds-typography` — `macro.h200` for count text styling

## Implementation notes

- **`dot` is auto-derived from `status`** — if `dot` is not explicitly passed and `status` is set, `dot` is coerced to `true`. This means you do not need to set `dot={true}` when using `status`.
- **`status` overrides Ant Design's `status`** — Ant Design's `status` accepts `'success' | 'processing' | 'error' | 'default' | 'warning'`; this component replaces it with a DS-specific set. The CSS classes are generated as `.ant-badge-status-<value>` using whatever string is passed.
- **`pulsing` requires `flag` or `status`** — the animation targets `::before`/`::after` pseudo-elements that are only rendered when `flag` or `status` is truthy.
- **`customColor` palette key detection** — presence of `-` in the string selects a full palette key; absence auto-appends `-600`. So `'blue'` → `blue-600`, `'blue-700'` → `blue-700`.
- **`outlined` uses `box-shadow`** — adds `0 0 0 1px white` around the count badge, useful when the badge appears on a coloured background.
