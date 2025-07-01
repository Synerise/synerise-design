---
id: card-select
title: Card Select
---

A card select is a form of presenting a selectable option on a separate, usually rectangle-shaped, object.

## When to use it

- To present a user with several types to choose from in one large module (for example, types of recommendations).

## Component anatomy

This is a simple component, which means it doesn't consist of any other components.

## Installation

```
npm i @synerise/ds-card-select
```

or

```
yarn add @synerise/ds-card-select

```

## Usage

---

```
<CardSelect
              title="Card"
              description="With description"
              value={true}
              icon={<IconComponent />}
              onChange={() => store !== 0 && setStore(0)}
              tickVisible
            />
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-cardselect--default"></iframe>

## API

| Property                   | Description                                                                                | Type                        | Default  |
| -------------------------- | ------------------------------------------------------------------------------------------ | --------------------------- | -------- |
| className                  | The className of the container                                                             | string                      | -        |
| size                       | The size of the card                                                                       | `small` / `medium`          | `medium` |
| raised                     | Defines border style                                                                       | boolean                     | -        |
| icon                       | Defines the icon                                                                           | ReactNode                   | -        |
| iconSize                   | Overwrites the predefined (82px for `medium` size, 48px for `small` size) size of the icon | number                      | -        |
| title                      | Defines the title of the card                                                              | `ReactNode`                 | -        |
| description                | Defines the description of the card (not available for `small` size)                       | `ReactNode`                 | -        |
| value                      | Defines if the card is selected by a user                                                  | boolean                     | `false`  |
| tickVisible                | Defines the display of the checkbox                                                        | boolean                     | `true`   |
| disabled                   | Defines if the card is disabled (`onChange` still fires)                                   | boolean                     | -        |
| customTickVisible          | Defines if the checkbox is custom                                                          | boolean                     | -        |
| customTickVisibleComponent | Custom checkbox component                                                                  | ReactNode                   | -        |
| stretchToFit               | Aligns the height of each card                                                             | boolean                     | -        |
| theme                      | Palette of colors                                                                          | string                      | -        |
| elementsPosition           | Defines the position of the elements on the card                                           | `left` / `right` / `center` | `center` |

| tagProps | Defines a ribbon-style tag | `TagProps` | - |
| tagTooltipProps | Defines tooltip for the ribbon tag | `TooltipProps` | - |
| infoTooltipProps | Defines a tooltip with information about the purpose of the card | `TooltipProps` | - |

### TagProps

accepts a subset of TagProps. See @synerise/ds-tag for API

```
Omit<TagProps, 'shape' | 'removable' | 'asPill' | 'onRemove' | 'image' | 'texts'>
```

### CardSelectGroup

| Property  | Description                                                                                   | Type                                     | Default                                 |
| --------- | --------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------- |
| className | The name of the container                                                                     | string                                   | -                                       |
| columns   | Defines the number of columns. Defaults to 2, set to null to render all items in a single row | number / null                            | -                                       |
| children  | Deprecated. Use items prop instead                                                            | ReactNode                                | -                                       |
| items     | Array of CardSelect props to render CardSelect child elements                                 | CardSelectProps & { key: string / numer} | -                                       |
| width     | Defines the size of the gap between items. Deprecated, use size prop                          | `small` / `large`                        | 16px for `small`, 24px for `large` size |
| size      | The size of the CardSelect items and gap between them                                         | `small` / `medium`                       | `medium`                                |

### Methods

| Property | Description                                                       | Type                     | Default |
| -------- | ----------------------------------------------------------------- | ------------------------ | ------- |
| onChange | Handler for the state change                                      | (state: boolean) => void | -       |
| onClick  | Handler for click (onChange will not fire if onClick is provided) | () => void               | -       |
