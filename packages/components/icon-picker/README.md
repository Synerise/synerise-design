---
id: icon-picker
title: IconPicker
---

IconPicker UI Component

## Installation

```
npm i @synerise/ds-icon-picker
or
yarn add @synerise/ds-icon-picker
```

If you intend to use font-awesome icon you also need to have these packages installed, as they are not included in this package:

```json
{
  "@fortawesome/react-fontawesome": "^0.2.2",
  "@fortawesome/fontawesome-svg-core": "^6",
  "@fortawesome/free-brands-svg-icons": "^6",
  "@fortawesome/free-regular-svg-icons": "^6",
  "@fortawesome/free-solid-svg-icons": "^6"
}
```

## Usage

```
import IconPicker from '@synerise/ds-icon-picker'

<IconPicker />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-icon-picker--default"></iframe>

## API

| Property     | Description                                         | Type                                            | Default |
| ------------ | --------------------------------------------------- | ----------------------------------------------- | ------- |
| button       | Button Node                                         | ReactElement                                    | -       |
| data         | Icons list source                                   | 'design-system' / 'font-awesome' / DataSource[] | -       |
| noResultMsg  | Node displayed when no items matches searched query | ReactNode                                       | -       |
| onSelect     | Action on icon select                               | OnSelectType                                    | -       |
| placeholder  | Input placeholder                                   | string                                          | -       |
| trigger      | Trigger type                                        | `['click', 'hover']`             | []      |
| onClear      | Action on icon delete                               | OnSelectType                                    | -       |
| selectedIcon | Icon Node                                           | ReactElement                                    | -       |
| clearTooltip | tooltip text                                        | string                                          | -       |

OnSelectType depends on the icon list source. For `design-system` or plain items provided as `DataSource[]` it is `(item: ReactNode) => void;`. For `font-awesome` it is `(item: [IconPrefix, IconName]) => void;`. See FontAwesome docs on how to use the IconPrefix and IconName to display an icon.
