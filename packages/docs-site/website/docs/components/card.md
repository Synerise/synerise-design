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

| Property                          | Description                                                                                                           | Type                                                                         | Default |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------- |
| background                        | Background of Card container                                                                                          | `white` / `white-shadow` / `grey` / `grey-shadow` / `outline`                | `white` |
| children                          | Defines if the button casts a shadow when the cursor is hovered over                                                  | React.ReactNode                                                              | -       |
| renderBadge                       | Custom slot content for badge icon                                                                                    | React.ReactNode?                                                             | -       |
| className                         | Defines the class name of the container                                                                               | string                                                                       | -       |
| compactHeader                     | Set as `true`, displays the description next to the header. Set as `false`, displays the description below the header | boolean                                                                      | -       |
| description                       | Defines the content of the card description (in the header)                                                           | React.ReactNode                                                              | string  |
| disabled                          | Defines if the state of the component is disabled                                                                     | boolean                                                                      | -       |
| headerBorderBottom                | Show line under CardHeader                                                                                            | boolean                                                                      | `false` |
| headerSideChildren                | Defines if the container includes a button (in the header)                                                            | React.ReactNode                                                              | -       |
| staticContent                     | Defines content that's visible even if hideContent is `true`                                                          | React.ReactNode                                                              | -       |
| hideContent                       | Defines the initial visibility of the content                                                                         | boolean                                                                      | `false` |
| icon                              | Icon of CardBadge, if defined then avatar prop gets ignored                                                           | React.ReactNode                                                              | -       |
| iconColor                         | Defines the color of the icon                                                                                         | string                                                                       | -       |
| avatar                            | Avatar for CardBadge                                                                                                  | React.ReactNode                                                              | -       |
| lively                            | Defines if the container casts a shadow when the cursor is hovered over                                               | boolean                                                                      | -       |
| raised                            | Defines if the container casts a shadow on the background                                                             | boolean                                                                      | -       |
| style                             | Defines the CSS of the container                                                                                      | React.CSSProperties                                                          | -       |
| size                              | Defines the width of the container (the container width is set to 100% when this property is not passed).             | `small` (472px) / `medium` (588px) / `large` (966px) / `extraLarge` (1232px) | -       |
| title                             | Defines the title of the card (in the header)                                                                         | string                                                                       | -       |
| withHeader                        | Defines if the header is shown                                                                                        | boolean                                                                      | -       |
| withoutPadding                    | Reset padding of ContentContainer                                                                                     | boolean                                                                      | `false` |
| showSideChildrenWhenHeaderHidden  | Show headerSideChildren on the bottom when header is scrolled out of view                                             | boolean                                                                      | `false` |
| defaultHeaderBackgroundColor      | Defines if header should have default white color                                                                     | boolean                                                                      | `false` |

#### CardBadge

| Property | Description                         | Type                                        | Default   |
| -------- | ----------------------------------- | ------------------------------------------- | --------- |
| Icon     | Icon rendered in badge              | React.ReactNode                             | -         |
| Status   | Defines the color of badge and icon | `success` / `error` / `warning` / `default` | `default` |
