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
import {Title} from '@synerise/ds-typography';
<Title level={1}>This is h1 element</Title>;
<Title level={2}>This is h2 element</Title>;
<Title level={3}>This is h3 element</Title>;
<Title level={4}>This is h4 element</Title>;
<Title level={5}>This is h5 element</Title>;
<Title level={6}>This is h6 element</Title>;
```
