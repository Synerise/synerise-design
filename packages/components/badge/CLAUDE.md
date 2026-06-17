# Badge (`@synerise/ds-badge`)

> DS-native badge (status dot, flag/pulsing dot, count badge). **antd-free** — exposes `ds-badge*`
> DOM/class hooks so downstream styled-overrides (e.g. ds-avatar) keep working. The legacy
> `ant-badge*` hooks have been dropped (so a parent app on the old antd-based badge can't leak its
> global `.ant-badge*` styles onto this one). Colour is driven by `status` (or `customColor`); there
> is no antd dependency.

## Package structure

```
src/
  Badge.tsx                — public entry: `text` → BadgeWithLabel, otherwise BadgeCore
  BadgeCore.tsx            — dot/count renderer (derives dot/count mode, renders the styled-components tree)
  Badge.styles.tsx         — styled-components (Wrapper, CountSup, ScrollNumberOnly, Current, DotSup, CustomCountSup) + colour helpers
  Badge.types.ts           — BadgeProps, Color, ColorHue, Status
  BadgeWithLabel.tsx       — status dot aligned next to a text label (powers the `text` prop; also exported)
  BadgeWithLabel.styles.ts — inline-flex alignment for dot↔label
  Badge.figma.tsx          — Code Connect mappings (status-driven)
  index.ts                 — public exports
```

> No `style/` LESS folder — the antd badge LESS base was inlined into `Badge.styles.tsx`. Styling uses
> first-class styled-components with transient `$`-props; the elements carry `ds-badge-*` class names
> (for DS consumers / ui-tests / external CSS) but they are not used as styling selectors.

## Public exports

### `Badge` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `BadgeStatus` | `undefined` | DS status — drives the dot/count colour: `active`→green-600, `inactive`→grey-400, `blocked`→red-600, `processing`→blue-600, `warning`→yellow-600. Auto-enables dot mode. |
| `flag` | `boolean` | `undefined` | Renders the dot with `::before`/`::after` halos. Requires dot/status. |
| `pulsing` | `boolean` | `undefined` | Pulse animation on the halos. Only visible when `flag` or `status` is set. |
| `outlined` | `boolean` | `undefined` | White `box-shadow` ring around the count badge. |
| `customColor` | `LiteralStringUnion<BadgeColor \| DefaultColor>` | `undefined` | Overrides the badge colour. Palette token → resolved via `theme.palette` (`'blue'` → `blue-600`, or full key `'blue-600'`); any other value is used as a **raw CSS colour** (`'#FF0000'`, `'rgb(…)'`, …), so colours outside the palette work. |
| `count` | `ReactNode` | `undefined` | Number/node in the count badge. Hidden when `0`. |
| `dot` | `boolean` | `undefined` | Forces dot mode (auto-enabled by `status`). |
| `overflowCount` | `number` | `99` | Max number before `N+`. |
| `offset` | `[number\|string, number\|string]` | `undefined` | `[x, y]` offset of the badge relative to its children. |
| `children` | `ReactNode` | `undefined` | When omitted, the badge renders inline (standalone). |
| `text` | `ReactNode` | `undefined` | When set, renders a status/dot badge next to this label (delegates to `BadgeWithLabel`) — the legacy antd `status` + `text` API. Takes precedence over `count`/`children`; only `status`/`customColor`/`flag`/`pulsing`/`dot`/`className`/`style` apply in this mode. |
| `className`, `style` | — | — | Applied to the outer wrapper. |
| `data-*`, `aria-*` | — | — | Forwarded to the outermost wrapper (`PassthroughAttributes` from `@synerise/ds-utils`). |

### `BadgeWithLabel` (named export)

A status/dot `Badge` aligned next to a text label. Owns the dot↔label alignment (inline-flex, 8px
gap) so consumers don't carry that CSS. It powers the `Badge` `text` prop and is also exported for
direct use.

| Prop | Type | Description |
|------|------|-------------|
| `status` / `customColor` / `flag` / `pulsing` / `dot` | — | Forwarded to the inner `Badge`. |
| `children` | `ReactNode` | The label rendered next to the dot. |
| `className`, `style` | — | Applied to the wrapper. |

```tsx
import { BadgeWithLabel } from '@synerise/ds-badge';
<BadgeWithLabel status="warning">Needs review</BadgeWithLabel>
```

### Types

| Export | Description |
|--------|-------------|
| `BadgeProps` | Full props type (`BadgeOwnProps & PassthroughAttributes`) |
| `BadgeWithLabelProps` | Props for `BadgeWithLabel` |
| `BadgeStatus` | `'active' \| 'inactive' \| 'blocked' \| 'processing' \| 'warning' \| undefined` |
| `BadgeColor` | `'red' \| 'green' \| 'grey' \| 'yellow' \| 'blue' \| 'pink' \| 'mars' \| 'orange' \| 'fern' \| 'cyan' \| 'purple' \| 'violet' \| 'white' \| 'transparent'` |
| `BadgeColorHue` | `'900' \| '800' \| '700' \| '600' \| '500' \| '400' \| '300' \| '200' \| '100' \| '050'` |

## Usage patterns

```tsx
import Badge from '@synerise/ds-badge';

// Count badge (red by default; colour with status/customColor, or override via `style`)
<Badge count={5}><Avatar /></Badge>
<Badge count={3} status="blocked" />
<Badge count={3} customColor="blue" />

// Status dot (dot auto-enabled by status).
<Badge status="active" />

// Status dot + label — pass `text` (legacy API) or use BadgeWithLabel directly.
<Badge status="active" text="Online" />

// Flag dot with pulse
<Badge status="processing" flag pulsing><Avatar /></Badge>

// Custom dot colour (arbitrary, non-status colour)
<Badge status="active" customColor="purple-700" />

// data-* passthrough on the wrapper
<Badge status="active" data-testid="presence" />
```

## Styling

`Badge.styles.tsx` is `styled(BadgeBase)`. It **inlines the base badge CSS** that antd's LESS used to
provide (wrapper positioning, count pill, dot, `.ds-badge-not-a-wrapper` standalone layout) and adds
the DS overrides. DS-only styling props (`flag`, `pulsing`, `outlined`, `customColor`) are stripped in
the wrapper before reaching `BadgeBase`'s DOM; they are still read by the CSS interpolations.

Colours come from `@synerise/ds-core` theme palette tokens (`resolveColor`): `customColor` → `status`
colour → **red** default (count text is white). Consumers wanting a different look (e.g. a neutral
count chip) override it with an inline `style`/`styled(Badge)` — and, matching antd, the consumer's
`style` is applied to the **indicator element** (count/dot), not the wrapper, so
`style={{ backgroundColor: 'transparent', color: ... }}` recolours the count (e.g. the Tabs counter).
A custom-node `count` (e.g. an icon) renders bare via `.ds-badge-scroll-number-custom-component` — no pill
background. Count badge is 16px tall; count text uses `macro.h200` from `@synerise/ds-typography`. The
theme type is `ThemeProps` from `@synerise/ds-core` (not styled-components' `DefaultTheme`, unaugmented here).

## Key dependencies

- `@synerise/ds-core` — theme palette tokens, `ThemeProps`, `DefaultColor`
- `@synerise/ds-typography` — `macro.h200` for count text
- `@synerise/ds-utils` — `PassthroughAttributes` (data-*/aria-* type)

## Implementation notes

- **No antd.** `BadgeBase` renders the DOM with `ds-badge` / `ds-badge-count` / `ds-badge-dot` /
  `ds-badge-status-dot` / `ds-badge-status-<status>` class hooks, which the DS consumers' selectors
  target (e.g. ds-avatar's `& ~ .ds-badge-dot`). The dot `sup` carries `ds-badge-dot` **and**
  `ds-badge-status-dot ds-badge-status-<status>` when `status` is set. The legacy `ant-badge-*` /
  `ant-scroll-number-*` hooks were removed so a parent app still on the old antd-based badge can't
  leak its global `.ant-badge*` styles onto the new one.
- **Colour is status-driven.** The old `backgroundColor` / `backgroundColorHue` / `textColor` /
  `textColorHue` props and the antd-passthrough `color` / `text` props were **removed**; `showZero` /
  `size` / `title` / `id` and the antd `Omit<AntBadgeProps>` inheritance are gone too. `customColor`
  is kept for arbitrary per-item colours (segment lists, status-label table cells).
- **`dot` is auto-derived from `status`** — set `status` and you get a dot without `dot={true}`.
- **Standalone vs wrapping** — with no `children` the wrapper gets `ds-badge-not-a-wrapper` and the
  badge renders inline (no absolute positioning / offset).
- **`text` restored** — when `text` is set, `Badge` delegates to `BadgeWithLabel` (status dot + label), so the legacy `status` + `text` API keeps working without switching components; `BadgeWithLabel` is still exported for direct use. To avoid a `Badge ↔ BadgeWithLabel` import cycle, the dot/count renderer lives in `BadgeCore.tsx` — both `Badge` (text mode) and `BadgeWithLabel` render `BadgeCore`.
- Tests: Vitest (`src/__specs__/Badge.spec.tsx`).
