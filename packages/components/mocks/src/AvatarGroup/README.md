# AvatarGroup Mock

## Vitest

```typescript
vi.mock('@synerise/ds-avatar-group', async () => {
  const { avatarGroupMockFactory } = await import('@synerise/ds-mocks');
  return { ...avatarGroupMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockAvatarGroup();
```

## Available test IDs

- `ds-avatar-group` (default)
- Custom via `data-testid` prop
