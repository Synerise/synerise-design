# Navbar Mocks

Mock for `@synerise/ds-navbar` package including Navbar and Navbar.Divider.

## Vitest

```typescript
vi.mock('@synerise/ds-navbar', async () => {
  const { navbarMockFactory } = await import('@synerise/ds-mocks');
  return { ...navbarMockFactory() };
});

// Query elements
screen.getByTestId('ds-navbar');
screen.getByTestId('ds-navbar-description');
screen.getByTestId('ds-navbar-divider');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Navbar';

jestMocks.mockNavbar();

// Query elements
screen.getByTestId('ds-navbar');
screen.getByTestId('ds-navbar-description');
screen.getByTestId('ds-navbar-divider');
```

## Mocked Components

### Navbar (default export)
- `Navbar` - renders div with children, className, and description
- `Navbar.Divider` - renders hr element

## Available Test IDs

### Navbar
- `ds-navbar` - Main container
- `ds-navbar-description` - Description element

### Navbar.Divider
- `ds-navbar-divider` - Divider element
