# FileUploader Mocks

Mock for `@synerise/ds-file-uploader` package including FileUploader, AvatarUploader, ItemUploader, and FileUploaderStyles.

## Vitest

```typescript
vi.mock('@synerise/ds-file-uploader', async () => {
  const { fileUploaderMockFactory } = await import('@synerise/ds-mocks');
  return { ...fileUploaderMockFactory() };
});

// Query elements
screen.getByTestId('ds-file-uploader');
screen.getByTestId('ds-avatar-uploader');
screen.getByTestId('ds-item-uploader');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/FileUploader';

jestMocks.mockFileUploader();

// Query elements
screen.getByTestId('ds-file-uploader');
screen.getByTestId('ds-avatar-uploader');
screen.getByTestId('ds-item-uploader');
```

## Mocked Components

### FileUploader (default export)
- `FileUploader` - renders div with children, className, accept, and disabled attributes

### Named exports
- `AvatarUploader` - renders div with accept and disabled attributes
- `ItemUploader` - renders div with accept and disabled attributes
- `FileUploaderStyles` - empty object

## Available Test IDs

- `ds-file-uploader` - Main FileUploader container
- `ds-avatar-uploader` - AvatarUploader container
- `ds-item-uploader` - ItemUploader container
