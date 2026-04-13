# ProgressBar Mock

## Vitest

```typescript
vi.mock('@synerise/ds-progress-bar', async () => {
  const { progressBarMockFactory } = await import('@synerise/ds-mocks');
  return { ...progressBarMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockProgressBar();
```

## Available test IDs

- `ds-progress-bar` — default ProgressBar
- `ds-progress-bar-label` — label text
- `ds-progress-bar-bar` — the bar element
- `ds-progress-bar-description` — description text
- `ds-progress-bar-multivalue` — Multivalue component
- `ds-progress-bar-multivalue-bar-{index}` — individual value bars
- `ds-progress-tiles` — ProgressTiles component
- `ds-progress-tiles-tile-{index}` — individual tiles
- Custom via `data-testid` prop
