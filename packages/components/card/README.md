---
id: card
title: Card
---

Cards contain content and actions related to a single subject.

## When to use it

---

To display any kind of content (for example, tables, charts, dashboards, and more).

## Component anatomy

---

This component is complex, which means it consists of other components:

- [icon](/docs/components/icon/)
- [typography](/docs/components/typography/)

## Installation

---

```
npm i @synerise/ds-card
```

or

```
yarn add @synerise/ds-card
```

## Usage

---

```
<Card
        lively
        withHeader
        title="Card Example"
        description="Some description"
        icon={<IconComponent />}
        iconColor="#54cb0b"
        size="medium"
      >
       Content
      </Card>
```

## Card single

---

<iframe src="/storybook-static/iframe.html?id=components-card--single"></iframe>

## Card group

---

<iframe src="/storybook-static/iframe.html?id=components-card--group"></iframe>

## API

---

### Properties

| Property           | Description                                                                                                           | Type                                                                         | Default |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------- |
| title              | Defines the title of the card (in the header)                                                                         | string                                                                       | -       |
| description        | Defines the content of the card description (in the header)                                                           | React.ReactNode                                                              | string  |
| withHeader         | Defines if the header is shown                                                                                        | boolean                                                                      | -       |
| compactHeader      | Set as `true`, displays the description next to the header. Set as `false`, displays the description below the header | boolean                                                                      | -       |
| icon               | URL of the icon                                                                                                       | string                                                                       | -       |
| iconColor          | Defines the color of the icon                                                                                         | string                                                                       | -       |
| className          | Defines the class name of the container                                                                               | string                                                                       | -       |
| style              | Defines the CSS of the container                                                                                      | React.CSSProperties                                                          | -       |
| raised             | Defines if the container casts a shadow on the background                                                             | boolean                                                                      | -       |
| disabled           | Defines if the state of the component is disabled                                                                     | boolean                                                                      | -       |
| lively             | Defines if the container casts a shadow when the cursor is hovered over                                               | boolean                                                                      | -       |
| headerSideChildren | Defines if the container includes a button (in the header)                                                            | React.ReactNode                                                              | -       |
| children           | Defines if the button casts a shadow when the cursor is hovered over                                                  | React.ReactNode                                                              | -       |
| size               | Defines the width of the container (the container width is set to 100% when this property is not passed).             | `small` (472px) / `medium` (588px) / `large` (966px) / `extraLarge` (1232px) | -       |
| withoutPadding     | Reset padding of ContentContainer                                                                                     | boolean                                                                      | false   |
