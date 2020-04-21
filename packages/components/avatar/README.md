```js noeditor
import {version} from './package.json';
`Current version: ${ version }`
```

<div className="ds-package-info">
  @synerise/ds-avatar
  <a target="_blank" href="https://www.npmjs.com/package/@synerise/ds-avatar">https://www.npmjs.com/package/@synerise/ds-avatar</a>
</div>

<a target="_blank" href="/storybook-static/?path=/story/components-avatar--simple">Storybook</a>
<br />
<br />

## General guidelines

An avatar is an object used to represent a particular person in the application. The avatar is usually accompanied with the status (for example, **Active**, **Inactive**, **Blocked**) identifying availability of any person in the application.


- Use avatars to represent a persona in the application. It may be a user of the application or a customer in the CRM module.
- You can use avatars to represent a general entity such as the campaign type, analysis type on a list in the application
- Every time when you use an image to communicate a concept, it’s important to use descriptive alt text. This ensures users with accessibility as it lets screen readers to describe what’s in the image to people who are visually impaired.  

---  


## Anatomy of avatars


![Avatar](avatar/2.png)

1. Avatars contain an image that represents a user, a customer or entity. In the case when an image of a person is not uploaded, the application displays their initials instead (**3**).  
2. To give users an idea about the status of a particular user, you can display a status on the avatar. For instance, an avatar can show if the user is active or inactive. 
3. When a user haven't uploaded an image, the application users initials of the user to represent them.


### Structure


Avatars are forms of proportional sides. Their shape is placed in a square or a circle.


![Avatar](avatar/1.png)

### Shapes


The shape of avatars can be both circular or square (make sure each corner has **3px radius**).

### Sizes


Avatars have 4 sizes:

- Small - **24x24px**
- Medium - **32x32px**
- Large - **40x40px**
- Extra large - **80x80px**

![Avatar](avatar/3.png)

The **S**-sized avatars contain the **S**-sized icons of the **Standard icons set**. The **M**, **L** and **XL** sizes contain the **M**-sized icons.

![Avatar](avatar/4.png)


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

We divide avatars into three types. Every type has its own use case. If a customer hasn't uploaded an image, the application automatically displays avatar with the initial of the customer. 

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
import Icon from "@synerise/ds-icon";
import { FileM} from "@synerise/ds-icon/dist/icons";
<div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="square" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} shape="cirlce" size="medium" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} iconComponent={<Icon component={<FileM />} color={"white"} />} size="large" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
    <Avatar tooltip={{name: 'Jan Janowski', email: 'jj@test.pl'}} src="https://www.w3schools.com/howto/img_avatar.png" shape="square" size="extraLarge" backgroundColor="blue" backgroundColorHue="600">JJ</Avatar>
</div>
```

---

## Installation


```static
npm i @synerise/ds-avatar
or
yarn add @synerise/ds-avatar
```

## Usage


```static
import Avatar from '@synerise/ds-avatar'

<Avatar
shape={circle}
backgroundColor={grey}
size={20}
/>

```








