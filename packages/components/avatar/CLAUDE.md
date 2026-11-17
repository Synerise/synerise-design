# Avatar (`@synerise/ds-avatar`)

> Three avatar variants — generic `Avatar`, `UserAvatar`, and `ObjectAvatar` — each a DS-native (styled-components) avatar with auto-tooltip, badge status, deterministic color/icon selection, and a library of 100 default SVG avatars.

## Package structure

```
src/
  Avatar.tsx               — base component (DS-native, styled-components)
  Avatar.types.ts          — all shared types (AvatarProps, UserAvatarProps, ObjectAvatarProps, …)
  Avatar.styles.tsx        — AvatarBase (DOM) + StyledAvatar (size/shape/bg/font); AvatarString/AvatarImg
  Avatar.spec.tsx          — base component tests
  utils.ts                 — getUserText, getObjectName, getTextBackground, getTooltipProps, …
  DefaultAvatarIcon.tsx    — renders one of 100 default SVGs by index
  defaultAvatars/          — auto-generated SVG components (build:svgr) + index.ts
  UserAvatar/
    UserAvatar.tsx         — user-specific avatar with auto-initials, default SVGs, badge
    UserAvatar.spec.tsx
    index.ts
  ObjectAvatar/
    ObjectAvatar.tsx       — object/entity avatar, square shape, Close2M fallback icon
    ObjectAvatar.spec.tsx
    index.ts
  index.ts                 — public exports
```

## Public exports

### `Avatar` (default export)

Base component. DS-native; props are explicitly declared (no antd inheritance). `data-*` attributes pass through.

**No avatar takes a background colour.** What it shows decides its background:

| Content | Background |
|---|---|
| Image (`src`) | the image |
| Icon (`iconComponent`) | the icon tile (Figma): base background, 1px strong border, shadow 1 |
| Text (string `children`, e.g. initials) | the custom colour its first letter maps to (`selectColorByLetter`), shade 500 |
| Anything else (e.g. a `UserAvatar` illustration) | transparent |

The **frame** — the 1px border and shadow 1 — comes with the icon tile. `hasTile` puts that frame on an **image** avatar as well, leaving the photo itself untouched. Text avatars ignore it: they already carry a colour of their own.

`backgroundColor` / `backgroundColorHue` are **deprecated and have no effect** (on `Avatar`, `UserAvatar` and `ObjectAvatar`). They stay in the types until other repos stop passing them, and they never reach the DOM. The DS itself no longer uses them.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| 'extraLarge'` | `'medium'` | Avatar size |
| `iconComponent` | `ReactNode` | `undefined` | Icon to render; auto-scaled per size unless `iconScale={false}` |
| `iconScale` | `boolean` | `true` | Auto-scales `iconComponent` to the ICON_SIZES map for the active size |
| `hasStatus` | `boolean` | `false` | Shows a `Badge` dot positioned on the avatar corner (requires a `Badge` wrapper in the parent) |
| `hasTile` | `boolean` | `false` | Draws the tile border and shadow around an **image** avatar. An icon always has them; text and other content ignore it. Also accepted by `UserAvatar` and `ObjectAvatar` |
| `disabled` | `boolean` | `false` | Applies `opacity: 0.4; pointer-events: none` |
| `tooltip` | `TooltipObject \| boolean` | `false` | Tooltip config; `false` disables it; object keys map to ds-tooltip props |
| `src` | `string` | `undefined` | Image URL; empty string `""` is treated as `undefined` |
| `children` | `ReactNode` | `undefined` | Text initials or other content |
| `shape` | `'circle' \| 'square'` | `'circle'` | Avatar shape |
| `backgroundColor` / `backgroundColorHue` | — | — | **Deprecated**, no effect (see above) |

Sizes in px: `small` = 24, `medium` = 40, `large` = 84, `extraLarge` = 120.

Icon sizes auto-scaled: `small` → 16px, `medium` → 24px, `large` → 30px, `extraLarge` → 42px. Exception: if the icon component name ends with `S` (small variant), `small` size is scaled to 24px instead.

### `UserAvatar`

High-level avatar for a user/client. Circle shape, auto-tooltip from user data.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | `UserAvatar` | `{}` | `{ firstName?, lastName?, email?, avatar?, avatarId? }` |
| `badgeStatus` | `BadgeStatus` | `undefined` | Wraps in `<Badge status>` when set; disables when `disabled=true` |
| `iconComponent` | `ReactNode` | `undefined` | Replaces the default `UserM`/`UserS` fallback icon |
| `size` | `Size` | `undefined` | Passed through to base Avatar |
| `tooltip` | `TooltipObject \| boolean` | auto from `user` | `undefined`/`true` → auto-builds tooltip from `firstName`+`lastName`+`email`; `false` disables it |
| `text` | `string` | `undefined` | Override initials text |
| `src` | `string` | `undefined` | Overrides `user.avatar` URL |
| `disabled` | `boolean` | `undefined` | Passed through |
| `style` | `CSSProperties` | `undefined` | Applied to outer wrapper if `badgeStatus` is set, or to the avatar directly |

**Render priority:** `avatar`/`src` photo → text initials (name or `text`) → default SVG (when `avatarId` is set) → fallback `UserM`/`UserS` icon.

`user.avatarId` is hashed deterministically to select one of 100 default SVGs. If `avatarId` is set and there are no initials or photo, the SVG is passed as content (not as an icon), so it sits on a transparent background without the icon tile.

Without initials or a photo, the fallback icon renders as the icon tile.

Tooltip is auto-generated from user data when `tooltip` is `undefined` or `true` — no need to pass tooltip props manually.

### `ObjectAvatar`

High-level avatar for objects/entities (products, campaigns, etc.). Square shape, `Close2M` icon fallback. Pass an object icon (`Object*M` from ds-icon) as `iconComponent`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `object` | `ObjectAvatar` | `{}` | `{ name?, description?, status?, avatar? }` |
| `color` | `Color` | `undefined` | Custom colour (600 shade) for the fallback icon; unset uses `--ds-avatar-icon-icon` |
| `badgeStatus` | `BadgeStatus` | `undefined` | Same as `UserAvatar` |
| `iconComponent` | `ReactNode` | `undefined` | Replaces the default `Close2M` fallback icon; use an object icon (`ObjectFunnelM`, `ObjectEmailM`, …) |
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

// Basic with initials (background from the first letter)
<Avatar size="medium">JD</Avatar>

// With photo
<Avatar src="https://example.com/photo.jpg" size="medium" />

// With icon (the icon tile)
<Avatar size="large" iconComponent={<Icon component={<FileM />} />} />

// With tooltip (backwards-compat name/email keys)
<Avatar tooltip={{ name: 'John Doe', email: 'jd@example.com' }}>JD</Avatar>

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
<Avatar disabled>AB</Avatar>
```

## Tooltip API

`tooltip` accepts `boolean | TooltipObject`. `TooltipObject` extends `TooltipProps` with backwards-compatible aliases:
- `name` → aliased to `title`
- `email` → aliased to `description`

Tooltip type is auto-determined: if exactly one of `title`, `description`, `status` is set → `'default'`; multiple → `'largeSimple'`.

`UserAvatar` and `ObjectAvatar` build the tooltip automatically from their data props when `tooltip` is not explicitly set.

## Styling

Styles in `Avatar.styles.tsx`. A DS-native `AvatarBase` renders the `ant-avatar` root + `ant-avatar-string`/`<img>` child (with `ds-avatar-*` class hooks added alongside the `ant-*` ones during the antd-removal interim); the `StyledAvatar` styled-component applies all visual styling via props and styled sub-component references (`${AvatarString}`) — no `.ant-*` class selectors, except the cross-component `& ~ .ant-badge-dot` sibling (the dot is owned by ds-badge). Key styles:

- Dimensions per size set directly in CSS: `small` 24, `medium` 40, `large` 84, `extraLarge` 120 px
- Background follows the content (`$content` on `StyledAvatar`, see the table above). A text avatar's colour comes from `getTextBackground`: `selectColorByLetter` on the first character, resolved with ds-utils `resolveCustomColor` to the flipping `var(--ds-color-custom-<family>-500)` token, so it adapts to dark mode.
- The **icon tile** (Figma "Object icons", `i6XNJPIUGQHOVQrZ7LZEhE` 252:4297) is `--ds-color-background-base-default` plus the `tileFrame` helper, `1px solid --ds-color-border-base-strong` and `--ds-shadows-shadow-1`. `hasTile` applies that same `tileFrame` to an image avatar. These are semantic tokens because the design binds them directly and the avatar module has no tile border or shadow token. The 1px border sits inside the box (`border-box`), so an icon gets 2px less room.
- The tile's icon inherits `--ds-avatar-icon-icon` (set without `!important`) in place of the white `--ds-avatar-text-text`, so a container can recolour it (ds-list-item sets `.ds-avatar.ds-avatar { color: inherit }` in its prefix). Neither `UserAvatar` nor `ObjectAvatar` forces a colour on the icon; ObjectAvatar sets one only when its `color` prop is. Object icons (`Object*M`) carry token colours and ignore it either way.
- Badge dot (`ds-badge-dot`) is hidden by default; shown when `hasStatus=true` with size/shape-specific positioning from `BADGE_POSITION` map
- Hover/active darken overlay via `::before` pseudo-element (`--ds-avatar-overlay-opacity-hover` / `-pressed`) — only applied when `onClick` or `hasTooltip` is truthy
- Font sizes per size via `MACRO_MAPPING` (xsAvatar, small, xlAvatar macros from ds-typography)

## Key dependencies

- `@synerise/ds-badge` — wraps avatar when `badgeStatus` is set in UserAvatar / ObjectAvatar
- `@synerise/ds-tooltip` — always rendered as wrapper; skipped visually when no tooltip content
- `@synerise/ds-status` — used in ObjectAvatar default tooltip for `object.status`
- `@synerise/ds-utils` (`useOnClickOutside`, `selectColorByLetter`) — `selectColorByLetter` drives auto-color from initials
- `@svgr/core` (devDep) — SVGs in `build/svg/` are compiled to React components via `build:svgr`

## Implementation notes

- `src=""` (empty string) is explicitly converted to `undefined` to prevent showing a broken image.
- The 100 default SVG components in `defaultAvatars/` are **auto-generated** by `build:svgr` — do not edit them manually; regenerate via `pnpm run build:svgr`.
- `getDefaultAvatarIndex` uses a simple djb2-style hash on the string form of `avatarId` — the same `avatarId` always maps to the same avatar across all environments.
- When `badgeStatus` is used in `UserAvatar`/`ObjectAvatar`, the `style` prop is applied to a wrapping `<span>` instead of the avatar, to avoid breaking the badge positioning.
- `hasStatus` on the base `Avatar` only controls CSS visibility of the `ds-badge-dot` — the actual `Badge` component must be provided by the parent (UserAvatar/ObjectAvatar handle this internally).
