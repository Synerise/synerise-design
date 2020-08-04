---
id: card-select
title: Card Select
---

A card select is a form of presenting a selectable option on a separate, usually rectangle-shaped, object.

## When to use it

---

- To present a user with several types to choose from in one large module (for example, types of recommendations).

## Component anatomy

---

This is a simple component, which means it doesn't consist of any other components.

## Installation

---

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

---

<iframe src="/storybook-static/iframe.html?id=components-cardselect--default"></iframe>

## API

---

### Properties

| Property                   | Description                                                          | Type               | Default                                         |
| -------------------------- | -------------------------------------------------------------------- | ------------------ | ----------------------------------------------- |
| className                  | The name of the container                                            | string             | -                                               |
| size                       | The size of the card                                                 | `small` / `medium` | `medium`                                        |
| raised                     | Defines if the component casts shadow on the background              | boolean            | -                                               |
| icon                       | Defines the URL of the icon                                          | string             | -                                               |
| iconSize                   | Defines the size of the icon                                         | number             | 82 px for `medium` size, 48 px for `small` size |
| title                      | Defines the title of the card                                        | string             | -                                               |
| description                | Defines the description of the card (not available for `small` size) | string             | -                                               |
| value                      | Defines if the card is selected by a user                            | boolean            | false                                           |
| tickVisible                | Defines the display of the checkbox                                  | boolean            | true                                            |
| disabled                   | Defines if the card is disabled (`onChange` still fires)             | boolean            | -                                               |
| customTickVisible          | Defines if the checkbox is custom                                    | boolean            | -                                               |
| customTickVisibleComponent | Custom checkbox component                                            | ReactNode          | -                                               |
| stretchToFit               | Aligns the height of each card                                       | boolean            | -                                               |
| clearTooltip               | Defines the title of clear icon tooltip                              | string             | -                                               |
| thickSize                  | The size of the thick                                                | `small` / `medium` | `medium`                                        |
| theme                      | Palette of colors                                                    | string             | -                                               |
| elementsPosition           | Defines the position of the elements on the card                     | string             | `center`                                        |
| width                      | Defines the width of Group of cards                                  | `large` / `small`  | `large`                                         |

### Methods

| Property | Description                                                       | Type                     | Default |
| -------- | ----------------------------------------------------------------- | ------------------------ | ------- |
| onChange | Handler for the state change                                      | (state: boolean) => void | -       |
| onClick  | Handler for click (onChange will not fire if onClick is provided) | () => void               | -       |
