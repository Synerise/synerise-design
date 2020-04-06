#### Version
  
```js noeditor
  import {version} from './../package.json';
  `v: ${ version }`
```

<div className="ds-package-info">
  @synerise/ds-avatar
  <a target="_blank" href="https://www.npmjs.com/package/@synerise/ds-avatar">https://www.npmjs.com/package/@synerise/ds-avatar</a>
</div>

<a target="_blank" href="/storybook-static/?path=/story/components-avatar--simple">Storybook</a>
<br />
<br />

An avatar is an icon that represents a particular person, but, the avatar has more applications in the Synerise platform.
It is used as:

- Human-related icon
- Object icon

Inspired by [Ant Design Avatar](https://ant.design/components/avatar/)

1. Avatar zawiera wizerunek klienta w formie zdjęcia lub inicjałów
2. Avatar może posiadać status ( `Active, Inactive, Blocked` )służący doidentyfikacji dostępności użytkownika
3. Kształt avatarów może być zarówno okrągły jak i kwadratowy (zawierający `3px radius` na rogach)

![Avatar](avatar/2.png)

## General guidance


### Usage:

Use avatars to quickly identify users.

### Best practices

- To represent a platform user (for example, to indicate the author of the campaign).
- To represent a customer (for example, on a list of customers, on a customer card).
- To represent the type of the item on a list (for example, a campaign, an analysis).

## Anatomy


### Budowa

Avatary zbudowane są z form o proporcjonalnych bokach. Ich kształt wpisanyjest w formę kwadratu lub koła.

![Avatar](avatar/1.png)

### Wielkości

Avatary posiadają 4 możliwe rozmiary:
- Small - `size 24x24px`
- Medium - `size 32x32px`
- Large - `size 40x40px`
- XL - `size 80x80px`

![Avatar](avatar/3.png)

Avatary w rozmiarach Small posiadają również ikony o rozmiarach `s` z setu `Standard icons`. Rozmiar Medium, Large oraz XL zawierają ikony o rozmiarach `M`.

![Avatar](avatar/4.png)

## Installation

---

```static
npm i @synerise/ds-avatar
or
yarn add @synerise/ds-avatar
```

## Usage

---

```static
import Avatar from '@synerise/ds-avatar'

<Avatar
shape={circle}
backgroundColor={grey}
size={20}
/>

```

## Demo

### Avatar sizes
```
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar size="small" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```

### Avatar with tooltips

```
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} size="small" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```

### Avatar types

```
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="square" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="cirlce" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} src="https://www.w3schools.com/howto/img_avatar.png" size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} src="https://www.w3schools.com/howto/img_avatar.png" shape="square" size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```


### Avatar icons

```
import Icon from "@synerise/ds-icon";
import { FileM} from "@synerise/ds-icon/dist/icons";
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="square" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="cirlce" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} iconComponent={<Icon component={<FileM />} color={"white"} />} size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} src="https://www.w3schools.com/howto/img_avatar.png" shape="square" size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```
