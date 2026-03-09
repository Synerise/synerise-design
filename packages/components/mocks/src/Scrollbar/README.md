# Scrollbar Mock

Mock for `@synerise/ds-scrollbar` component.


## Vitest

```typescript
vi.mock('@synerise/ds-scrollbar', async () => {
  const { scrollbarMockFactory } = await import('@synerise/ds-mocks');
  return { ...scrollbarMockFactory() };
});
```
