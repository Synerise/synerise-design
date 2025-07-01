## General guidelines

An avatar is an object used to represent a particular person in the application. The avatar is usually accompanied by the status (for example, **Active**, **Inactive**, **Blocked**) identifying the availability of any person in the application.

- Use avatars to represent a persona in the application. It may be a user of the application or a customer in the CRM module.
- You can use avatars to represent a general entity such as the campaign type or analysis type on a list in the application
- Every time when you use an image to communicate a concept, it’s important to use descriptive alt text. This ensures users with accessibility as it lets screen readers to describe what’s in the image to people who are visually impaired.

---

## Anatomy of avatars

![Avatar](avatar/2.png)

1. Avatars contain an image that represents a user, a customer or entity. hen an image of a person is not uploaded, the application displays their initials instead (**3**).
2. To give users an idea about the status of a particular user, you can display a status on the avatar. For instance, an avatar can show if the user is active or inactive.
3. When a user haven't uploaded an image, the application users initials of the user to represent them.

### Structure

Avatars are forms of proportional sides. Their shape is placed in a square or a circle.

![Avatar](avatar/1.png)

### Shapes

The shape of avatars can be both circular or square (make sure each corner has a **3px radius**).

### Sizes

Avatars have 4 sizes:

- Small - **24x24px**
- Medium - **40x40px**
- Large - **84x84px**
- Extra large - **120x120px**

The **S**-sized avatars contain the **S**-sized icons of the **Standard icons set**. The **M**, **L** and **XL** sizes contain the **M**-sized icons.

```
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar size="small" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```

---

## Avatar types

We divide avatars into three types. Every type has its own use case. If a customer hasn't uploaded an image, the application automatically displays an avatar with the initials of the customer.

**Types of avatars:**

![Avatar types](avatar/avatar-type.png)

1. Avatar with a photo
2. Avatar with initials
3. Avatar with an icon

```
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="square" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="cirlce" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} src="https://www.w3schools.com/howto/img_avatar.png" size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} src="https://www.w3schools.com/howto/img_avatar.png" shape="square" size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```

---

## Variations

We can present avatars as a single entity or in a group.

![Avatar groups](avatar/avatar-groups.png)

1. Single avatar
2. Group avatar

### Avatar with tooltips

```
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} size="small" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```

### Avatar icons

```
import Icon, { FileM } from "@synerise/ds-icon";
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="square" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="cirlce" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} iconComponent={<Icon component={<FileM />} color={"white"} />} size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} src="https://www.w3schools.com/howto/img_avatar.png" shape="square" size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```

---

## Installation

```jsx static
npm i @synerise/ds-avatar
```

or

```jsx static
yarn add @synerise/ds-avatar
```

## Usage

```jsx static
import Avatar from '@synerise/ds-avatar';

<Avatar shape={'circle'} backgroundColor={'grey'} size={20} />;
```

## API

| Property           | Description                                                                                        | Type                                                                                                 | Default  |
| ------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------- |
| backgroundColor    | Background color of the avatar                                                                     | `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet` | `orange` |
| backgroundColorHue | Background color hue of the avatar                                                                 | `900` / `800` / `700` / `600` / `500` / `400` / `300` / `200` / `100` / `050`                        | `400`    |
| disabled           | Determines if avatar is disabled                                                                   | boolean                                                                                              | `false`  |
| hasStatus          | Aligns a badge with the avatar                                                                     | boolean                                                                                              | `false`  |
| iconComponent      | Provides a custom component as a child. If both are provided, the prop icon has a greater priority | React.ReactNode                                                                                      | -        |
| iconScale          | Auto scale icon to sizes                                                                           | boolean                                                                                              | `true`   |
| shape              | Shape of the avatar                                                                                | `circle` / `square`                                                                                  | `circle` |
| size               | Size of the avatar                                                                                 | `small` / `medium` / `large` / `extraLarge`                                                          | `medium` |
| src                | Image source path                                                                                  | string                                                                                               | -        |
| tooltip            | Tooltip text displayed on hover                                                                    | { name: string, email: string }                                                                      | -        |

## UserAvatar

A variant that renders full standard user avatar, with expected tooltip etc.

This component should be used as user/client representation.

```ts
import { UserAvatar } from '@synerise/ds-avatar';

<UserAvatar user={{
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@synerise.com',
  avatar: 'http://image.url/image.jpg',
}} />
```

| Property        | Description                                    | Type                                                                                                          | Default  |
| --------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| user            | User information                               | { firstName: string, lastName: string, email: string, avatar: string }                                        | -        |
| backgroundColor | Background color of the avatar                 | `auto` / `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet` | `auto`   |
| badgeStatus     | Badge status                                   | `active` / `error` / `warning`                                                                                | -        |
| disabled        | Determines if avatar is disabled               | boolean                                                                                                       | `false`  |
| iconComponent   | Replace default user icon                      | React.ReactNode                                                                                               | -        |
| size            | Size of the avatar                             | `small` / `medium` / `large` / `extraLarge`                                                                   | `medium` |
| tooltip         | Change default tooltip text displayed on hover | { title: string, description: string, status: string } / `false`                                              | -        |

## ObjectAvatar

A variant that renders full standard object avatar.

This component should be used for ex. in products, services, etc.

```ts
import { ObjectAvatar } from '@synerise/ds-avatar';

<ObjectAvatar object={{
  name: 'Product name',
  description: 'Nice description',
  status: 'API',
}} />
```

|                 | Property                                       | Description                                                                                                   | Type     | Default |
| --------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| object          | Object information                             | { name: string, description: string, status: string, avatar: string }                                         | -        |         |
| color           | Background color of the avatar                 | `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet`          | `grey`   |         |
| backgroundColor | Background color of the avatar                 | `auto` / `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet` | `auto`   |         |
| badgeStatus     | Badge status                                   | `active` / `error` / `warning`                                                                                | -        |         |
| disabled        | Determines if avatar is disabled               | boolean                                                                                                       | `false`  |         |
| iconComponent   | Replace default user icon                      | React.ReactNode                                                                                               | -        |         |
| size            | Size of the avatar                             | `small` / `medium` / `large` / `extraLarge`                                                                   | `medium` |         |
| tooltip         | Change default tooltip text displayed on hover | { title: string, description: string, status: string } / `false`                                              | -        |         |
