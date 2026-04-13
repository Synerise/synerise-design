# EmojiPicker Mock

## Vitest

```typescript
vi.mock('@synerise/ds-emoji-picker', async () => {
  const { emojiPickerMockFactory } = await import('@synerise/ds-mocks');
  return { ...emojiPickerMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockEmojiPicker();
```

## Available test IDs

- `ds-emoji-picker` (default)
- Custom via `data-testid` prop

## Named exports

- `EmojiPicker` — same as default export
