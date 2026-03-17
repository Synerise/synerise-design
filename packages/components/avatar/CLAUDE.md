# Avatar (`@synerise/ds-avatar`)

> Three avatar variants — generic `Avatar`, `UserAvatar`, and `ObjectAvatar` — each wrapping Ant Design's Avatar with auto-tooltip, badge status, deterministic color/icon selection, and a library of 100 default SVG avatars.

## Package structure

```
src/
  Avatar.tsx               — base component; wraps antd Avatar
  Avatar.types.ts          — all shared types (AvatarProps, UserAvatarProps, ObjectAvatarProps, …)
  Avatar.styles.tsx        — styled AntdAvatar; size/shape/bg/font overrides
  Avatar.spec.tsx          — base component tests
  utils.ts                 — getUserText, getObjectName, getColorByText, getTooltipProps, …
  DefaultAvatarIcon.tsx    — renders one of 100 default SVGs by index
  defaultAvatars/          — auto-generated SVG components (build:svgr) + index.ts
  UserAvatar/
    UserAvatar.tsx         — user-specific avatar with auto-initials, default SVGs, badge
    UserAvatar.spec.tsx
    index.ts
  ObjectAvatar/
    ObjectAvatar.tsx       — object/entity avatar, square shape, mail fallback icon
    ObjectAvatar.spec.tsx
    index.ts
  style/index.less         — imports antd avatar LESS
  index.ts                 — public exports
```

## Public exports

### `Avatar` (default export)

Base component. Extends `AntAvatarProps` minus `size`, `icon`, and `src`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| 'extraLarge'` | `'medium'` | Avatar size |
| `backgroundColor` | `Color \| string` | `undefined` | Named color or hex string; combined with `backgroundColorHue` for theme token lookup |
| `backgroundColorHue` | `'050'–'900'` | `'500'` | Hue suffix for the background color token |
| `iconComponent` | `ReactNode` | `undefined` | Icon to render; auto-scaled per size unless `iconScale={false}` |
| `iconScale` | `boolean` | `true` | Auto-scales `iconComponent` to the ICON_SIZES map for the active size |
| `hasStatus` | `boolean` | `false` | Shows a `Badge` dot positioned on the avatar corner (requires a `Badge` wrapper in the parent) |
| `disabled` | `boolean` | `false` | Applies `opacity: 0.4; pointer-events: none` |
| `tooltip` | `TooltipObject \| boolean` | `false` | Tooltip config; `false` disables it; object keys map to ds-tooltip props |
| `src` | `string` | `undefined` | Image URL; empty string `""` is treated as `undefined` |
| `children` | `ReactNode` | `undefined` | Text initials or other content |
| `shape` *(from antd)* | `'circle' \| 'square'` | `'circle'` | Avatar shape |

Sizes in px: `small` = 24, `medium` = 40, `large` = 84, `extraLarge` = 120.

Icon sizes auto-scaled: `small` → 16px, `medium` → 24px, `large` → 30px, `extraLarge` → 42px. Exception: if the icon component name ends with `S` (small variant), `small` size is scaled to 24px instead.

### `UserAvatar`

High-level avatar for a user/client. Circle shape, auto-tooltip from user data.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | `UserAvatar` | `{}` | `{ firstName?, lastName?, email?, avatar?, avatarId? }` |
| `backgroundColor` | `'auto' \| Color \| string` | `undefined` | `'auto'` picks color from first initial; dash-separated `'grey-800'` sets both color and hue |
| `badgeStatus` | `BadgeStatus` | `undefined` | Wraps in `<Badge status>` when set; disables when `disabled=true` |
| `iconComponent` | `ReactNode` | `undefined` | Replaces the default `UserM`/`UserS` fallback icon |
| `size` | `Size` | `undefined` | Passed through to base Avatar |
| `tooltip` | `TooltipObject \| boolean` | auto from `user` | `undefined`/`true` → auto-builds tooltip from `firstName`+`lastName`+`email`; `false` disables it |
| `text` | `string` | `undefined` | Override initials text |
| `src` | `string` | `undefined` | Overrides `user.avatar` URL |
| `disabled` | `boolean` | `undefined` | Passed through |
| `style` | `CSSProperties` | `undefined` | Applied to outer wrapper if `badgeStatus` is set, or to the avatar directly |

**Render priority:** `avatar`/`src` photo → text initials (name or `text`) → default SVG (when `avatarId` is set) → fallback `UserM`/`UserS` icon.

`user.avatarId` is hashed deterministically to select one of 100 default SVGs. If `avatarId` is set and there are no initials or photo, the SVG is used and background is transparent.

Tooltip is auto-generated from user data when `tooltip` is `undefined` or `true` — no need to pass tooltip props manually.

### `ObjectAvatar`

High-level avatar for objects/entities (products, campaigns, etc.). Square shape, mail icon fallback.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `object` | `ObjectAvatar` | `{}` | `{ name?, description?, status?, avatar? }` |
| `color` | `Color` | `'grey'` | Color for the fallback icon (when no text/image) |
| `backgroundColor` | `'auto' \| Color \| string` | `undefined` | Background color; overrides auto-color from `object.name` |
| `badgeStatus` | `BadgeStatus` | `undefined` | Same as `UserAvatar` |
| `iconComponent` | `ReactNode` | `undefined` | Replaces default `MailM` fallback icon |
| `tooltip` | `TooltipObject \| boolean` | auto from `object` | `undefined` → auto-builds from `object.name`/`description`/`status`; `false` disables it |
| `text` | `string` | `undefined` | Override initials (uppercased) |
| `size` | `Size` | `undefined` | Passed through |
| `disabled` | `boolean` | `undefined` | Passed through |

Unlike `UserAvatar`, ObjectAvatar tooltip auto-generates only when `tooltip === undefined` (not when `true`).

### `DefaultAvatarIcon`

Renders one of the 100 built-in SVG avatars by index.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | **required** | Index 0–99; wraps via modulo so any integer is safe |

### `TOTAL_DEFAULT_AVATARS`

Exported constant — `100`. The actual number of built-in SVGs in `defaultAvatars/`.

### Exported types

- `AvatarProps` — base Avatar props
- `UserAvatarProps` — UserAvatar props
- `ObjectAvatarProps` — ObjectAvatar props
- `UserAvatarType` — the `UserAvatar` data shape (`firstName`, `lastName`, `email`, `avatar`, `avatarId`)
- `ObjectAvatarType` — the `ObjectAvatar` data shape (`name`, `description`, `status`, `avatar`)
- `TooltipObject` — `Omit<TooltipProps, 'children'> & { name?, email? }` (backwards-compat aliases)
- `AvatarSize` — `'small' | 'medium' | 'large' | 'extraLarge' | undefined`

## Usage patterns

```tsx
import Avatar, { UserAvatar, ObjectAvatar } from '@synerise/ds-avatar';
import Icon, { FileM } from '@synerise/ds-icon';

// Basic with initials
<Avatar backgroundColor="blue" backgroundColorHue="600" size="medium">JD</Avatar>

// With photo
<Avatar src="https://example.com/photo.jpg" size="medium" />

// With icon
<Avatar backgroundColor="fern" size="large" iconComponent={<Icon component={<FileM />} />} />

// With tooltip (backwards-compat name/email keys)
<Avatar backgroundColor="blue" tooltip={{ name: 'John Doe', email: 'jd@example.com' }}>JD</Avatar>

// UserAvatar — auto-initials and auto-tooltip
<UserAvatar
  user={{ firstName: 'John', lastName: 'Doe', email: 'jd@example.com' }}
  size="medium"
/>

// UserAvatar with default SVG avatar
<UserAvatar user={{ avatarId: 42 }} size="medium" />

// UserAvatar with badge
import Badge from '@synerise/ds-badge';
<UserAvatar user={{ firstName: 'Jane' }} badgeStatus="active" />

// ObjectAvatar
<ObjectAvatar
  object={{ name: 'Campaign', description: 'Email campaign', status: 'Active' }}
  size="medium"
/>

// Disabled
<Avatar disabled backgroundColor="grey">AB</Avatar>
```

## Tooltip API

`tooltip` accepts `boolean | TooltipObject`. `TooltipObject` extends `TooltipProps` with backwards-compatible aliases:
- `name` → aliased to `title`
- `email` → aliased to `description`

Tooltip type is auto-determined: if exactly one of `title`, `description`, `status` is set → `'default'`; multiple → `'largeSimple'`.

`UserAvatar` and `ObjectAvatar` build the tooltip automatically from their data props when `tooltip` is not explicitly set.

## Styling

Styles in `Avatar.styles.tsx`. Wraps Ant Design `Avatar` in a `styled(forwardRef(...))`. Key overrides:

- `medium` and `extraLarge` Ant sizes are mapped to `'default'` Ant size; actual dimensions set via CSS
- Background applied via `theme.palette[${backgroundColor}-${backgroundColorHue}]` — requires both to be valid token fragments
- Badge dot (`ant-badge-dot`) is hidden by default; shown when `hasStatus=true` with size/shape-specific positioning from `BADGE_POSITION` map
- Hover/active darken overlay via `::before` pseudo-element — only applied when `onClick` or `hasTooltip` is truthy
- Font sizes per size via `MACRO_MAPPING` (xsAvatar, small, xlAvatar macros from ds-typography)

## Key dependencies

- `antd` (`Avatar`) — base implementation; the styled component wraps `antd/lib/avatar`
- `@synerise/ds-badge` — wraps avatar when `badgeStatus` is set in UserAvatar / ObjectAvatar
- `@synerise/ds-tooltip` — always rendered as wrapper; skipped visually when no tooltip content
- `@synerise/ds-status` — used in ObjectAvatar default tooltip for `object.status`
- `@synerise/ds-utils` (`useOnClickOutside`, `selectColorByLetter`) — `selectColorByLetter` drives auto-color from initials
- `@svgr/core` (devDep) — SVGs in `build/svg/` are compiled to React components via `build:svgr`

## Implementation notes

- `src=""` (empty string) is explicitly converted to `undefined` to prevent showing a broken image.
- `backgroundColor` is a string passed directly into `theme.palette[…]` key lookup — invalid color+hue combos silently produce `undefined` background.
- The 100 default SVG components in `defaultAvatars/` are **auto-generated** by `build:svgr` — do not edit them manually; regenerate via `pnpm run build:svgr`.
- `getDefaultAvatarIndex` uses a simple djb2-style hash on the string form of `avatarId` — the same `avatarId` always maps to the same avatar across all environments.
- `getColorByText` supports a `'color-hue'` dash-separated string shorthand for `backgroundColor` (e.g. `'grey-800'`) — this bypasses the separate `backgroundColorHue` prop entirely.
- When `badgeStatus` is used in `UserAvatar`/`ObjectAvatar`, the `style` prop is applied to a wrapping `<span>` instead of the avatar, to avoid breaking the badge positioning.
- `hasStatus` on the base `Avatar` only controls CSS visibility of the `ant-badge-dot` — the actual `Badge` component must be provided by the parent (UserAvatar/ObjectAvatar handle this internally).
