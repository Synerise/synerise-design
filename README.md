# Synerise Design System

React UI library inspired by [Ant Design](https://github.com/ant-design/ant-design).

### Features

- Written in TypeScript with predictable static types.
- Internationalization by [react-intl](https://github.com/formatjs/react-intl)
- [Styled-Components](https://github.com/styled-components/styled-components)

### How to use

Each component is installed separately. If you want to use one of them you have to use DSProvier first.

#### Step 1. - install Core

```
yarn add @synerise/ds-core
```

#### Step 2. - install component (ex. Button)

```
yarn add @synerise/ds-button
```

#### Step 3. - usage

```jsx
import { DSProvider } from '@synerise/ds-core';
import Button from '@synerise/ds-button'

<DSProvider>
    <Button>Click Me!</Button>
</DSProvider>
```
