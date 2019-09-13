---
id: typography
title: Typography
---

## Synerise Design System - Typography

This module provides few helpers and components to work with typograpy.

### Examples

##### Styled components header macro usage

```jsx harmony
import { macro } from '@synerise/ds-typography';
export const HeaderH1 = styled.div`
  color: #000;
  ${macro.h700};
`;
```

##### Styled components color palette usage

```jsx harmony
export const Color = styled.div`
  color: ${({ theme }) => theme.palette['red-600']};
`;
```

##### Ant Design components usage

```jsx harmony
import Typograpy from '@synerise/ds-typography';

<Typograpy.Title level={h2}>This is h2 element</Typograpy.Title>;
```
