---
id: information-card
title: InformationCard
---

InformationCard UI Component

Information card shows details of an object or entity.
It should be used as an additional information (details) provider when user is selecting something using menu or dropdown.

## Installation
```
npm i @synerise/ds-information-card
or
yarn add @synerise/ds-information-card
```

## Development

```zsh
# lerna bootstrap # install all required reused shared lerna packages
yarn workspace @synerise/ds-information-card lint
yarn workspace @synerise/ds-information-card build
```

## Usage
```js
import InformationCard from '@synerise/ds-information-card'
import Popover from 'antd/popover'

<Popover
    defaultVisible={false}
    placement="right"
    content={() => <InformationCard title="Entity full name" subtitle="entity.id"/>}
>Entity short name</Popover>
```

Generally, components require being capable of rendering this and usually an additional effort is required to get them to support rendering.
See text's menu item element `packages/components/menu/src/Elements/Item/Text/Text.tsx`.

Note that `title` and `subtitle` are required props. For just a single line of text consider using just tooltip or popover.

### Usage with dropdown and other components relying on `rc-trigger` `getPopupContainer`

Some components render elements via portal, in such a case if tthey are listening for global events like click (for e.g. closing the dropdown) - developer using this component is responsible for proper handling of such a clicks. One of ways is making use of `overlayInnerClass` popover's class property to later.
By default class is `ignore-click-outside` (so looking for `domElement.closest('.ignore-click-outside')` to determine whether handler should be skipped should be fine).

## Demo

<iframe src="/storybook-static/iframe.html?id=components-information-card--default"></iframe>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
