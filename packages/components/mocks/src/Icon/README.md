# Icon Mocks

Mock utilities for `@synerise/ds-icon` component.

## Vitest

```typescript
// Basic mock - renders the icon prop as text with data attributes
vi.mock('@synerise/ds-icon', async () => {
  const { iconMockFactory } = await import('@synerise/ds-mocks');
  return { ...iconMockFactory() };
});

// Minimal mock - renders null
vi.mock('@synerise/ds-icon', async () => {
  const { iconMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...iconMinimalMockFactory() };
});

// Custom render function
vi.mock('@synerise/ds-icon', async () => {
  const { iconWithRenderMockFactory } = await import('@synerise/ds-mocks');
  return {
    ...iconWithRenderMockFactory((props) => (
      <span data-custom-icon={props.iconName}>{props.iconName}</span>
    ))(),
  };
});
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Icon';

// Basic mock
jestMocks.mockIcon();

// Minimal mock
jestMocks.mockIconMinimal();

// Custom render function
jestMocks.mockIconWithRender((props) => (
  <span data-custom-icon={props.iconName}>{props.iconName}</span>
));
```

## Available Functions

| Function                    | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| `iconMockFactory`           | Factory for full mock with props preserved as data attributes |
| `iconMinimalMockFactory`    | Factory that returns null                                     |
| `iconWithRenderMockFactory` | Factory with custom render function                           |

## Usage Example

```tsx
// Component using Icon
<Icon iconName="InfoM" size={24} color="blue" />

// With iconMockFactory, renders as:
<div
  class="ds-icon"
  data-testid="ds-icon"
  data-icon="InfoM"
  data-icon-size="24"
  data-icon-color="blue"
  title="InfoM"
>
  InfoM
</div>
```

## Data Attributes

The `iconMockFactory` preserves these props as data attributes for testing:

| Attribute           | Source Prop                          |
| ------------------- | ------------------------------------ |
| `data-icon`         | `iconName` or `name`                 |
| `data-icon-size`    | `size`                               |
| `data-icon-color`   | `color`                              |
| `data-icon-stroke`  | `stroke`                             |
| `data-testid`       | `data-testid` (default: `ds-icon`)   |
