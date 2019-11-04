Core components

Bunch of components to bootstrap application.

### Features

- Provide internationalization (with react-i18n)
- basic theme for styled-components, add variables to theme
- setup ant design framework

### Usage

```jsx harmony
<DSProvider locale="pl-PL" timeZone="Europe/Warsaw" messages={...} />
...
</DSProvider>
```

## API

| Property | Description                          | Type   | Default |
| -------- | ------------------------------------ | ------ | ------- |
| locale   | Current lang (ex. en-US)             | string | en      |
| timeZone | Current timezone (ex. Europe/Warsaw) | string |         |
| messages | Object with translations             | object |         |
