# Avatar Mock

Mock for `@synerise/ds-avatar` package including `Avatar` (default), `UserAvatar`, `ObjectAvatar`, `DefaultAvatarIcon`, and `TOTAL_DEFAULT_AVATARS`.

## Vitest

```typescript
vi.mock('@synerise/ds-avatar', async () => {
  const { avatarMockFactory } = await import('@synerise/ds-mocks');
  return { ...avatarMockFactory() };
});

screen.getByTestId('ds-avatar');
screen.getByTestId('ds-user-avatar');
screen.getByTestId('ds-object-avatar');
```

## Jest

```typescript
import { jest as avatarMocks } from '@synerise/ds-mocks/Avatar';

avatarMocks.mockAvatar();

screen.getByTestId('ds-avatar');
screen.getByTestId('ds-user-avatar');
screen.getByTestId('ds-object-avatar');
```

## Mocked Components

### Avatar (default export)
- Renders children or an `<img>` when `src` is provided
- Exposes `size`, `backgroundColor`, `disabled`, and `tooltip` as data attributes

### UserAvatar (named export)
- Renders user initials from `user.firstName` + `user.lastName`
- Falls back to `user.email`, then `'User'`
- Shows `<img>` when `user.avatar` is set
- Exposes `badgeStatus` as a data attribute

### ObjectAvatar (named export)
- Renders `object.name` or falls back to `'Object'`
- Shows `<img>` when `object.avatar` is set

### DefaultAvatarIcon (named export)
- Renders a div with `data-index` attribute

### TOTAL_DEFAULT_AVATARS (constant)
- Exported as `100`

## Available Test IDs

### Avatar
- `ds-avatar` — Main container
- `ds-avatar-img` — Image element (when `src` is provided)

### UserAvatar
- `ds-user-avatar` — Main container
- `ds-user-avatar-img` — Image element (when `user.avatar` is provided)

### ObjectAvatar
- `ds-object-avatar` — Main container
- `ds-object-avatar-img` — Image element (when `object.avatar` is provided)

### DefaultAvatarIcon
- `ds-default-avatar-icon` — Main container

## Custom data-testid

```tsx
<Avatar data-testid="my-avatar">JD</Avatar>

screen.getByTestId('my-avatar');
```
