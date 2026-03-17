---
id: flag
title: Flag
---

Flag UI Component

## Installation

```
npm i @synerise/ds-flag
or
yarn add @synerise/ds-flag
```

## Usage

```tsx
import Flag from '@synerise/ds-flag';

<Flag country="PL" size={24} />
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-flag--default"></iframe>

## API

| Property | Description                                                                 | Type                    | Default |
| -------- | --------------------------------------------------------------------------- | ----------------------- | ------- |
| country  | The country code (ISO 3166-1 alpha-2) for the flag; case-insensitive        | `CountryCode \| string` | -       |
| size     | Height of the flag in px; width is derived from the 15:21 aspect ratio      | `number`                | `24`    |
