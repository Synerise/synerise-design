---
id: confirmation
title: Confirmation
---

Confirmation UI Component

## Installation

```
npm i @synerise/ds-confirmation
or
yarn add @synerise/ds-confirmation
```

## Usage

```
import Confirmation from '@synerise/ds-confirmation'

<Confirmation />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-confirmation--default"></iframe>

## API

| Property             | Description                                                                                                                                     | Type                                               | Default |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| icon                 | icon to display above title                                                                                                                     | Preferably Xl size icon from ds-icons ReactNode    | -       |
| title                | confirmation title                                                                                                                              | ReactNode                                          | -       |
| description          | confirmation details                                                                                                                            | ReactNode                                          | -       |
| texts                | custom translations                                                                                                                             | ReactNode                                          | -       |
| type                 | action type - this defines the button (and icon if negative) color                                                                              | `success` / `warning` / `negative` / `informative` | -       |
| mainButtonProps      | additional button customisation props                                                                                                           | subset of ButtonProps see ds-button                | -       |
| secondaryButtonProps | additional button customisation props                                                                                                           | subset of ButtonProps see ds-button                | -       |
| relatedObjects       | display objects that have relations to the object, renders a button in the footer that will switch confirmation modal content to this ReactNode | ReactNode                                          | -       |
| batchActionItems     | renders a list of items that are affected                                                                                                       | ListItemProps[]                                    | -       |
| decisionOptions      | renders a group of radio buttons to choose from                                                                                                 | RadioProps[]                                       | -       |
| additionalInfo       | extra description to render within a bordered frame                                                                                             | ReactNode                                          | -       |

### Prompt

| Property             | Description                                 | Type                                               | Default |
| -------------------- | ------------------------------------------- | -------------------------------------------------- | ------- |
| title                | prompt title                                | ReactNode                                          | -       |
| content              | prompt content                              | ReactNode                                          | -       |
| texts                | custom translations                         | ReactNode                                          | -       |
| type                 | action type - this defines the button color | `success` / `warning` / `negative` / `informative` | -       |
| mainButtonProps      | additional button customisation props       | subset of ButtonProps see ds-button                | -       |
| secondaryButtonProps | additional button customisation props       | subset of ButtonProps see ds-button                | -       |

### ConfirmationTexts

| Property                  | Description | Type      | Default                   |
| ------------------------- | ----------- | --------- | ------------------------- |
| mainButtonLabel           |             | ReactNode | `Ok`                      |
| secondaryButtonLabel      |             | ReactNode | `Cancel`                  |
| relatedObjectsButtonLabel |             | ReactNode | `Show related objects`    |
| relatedObjectsTitle       |             | ReactNode | `Objects to delete`       |
| batchActionItemsTitle     |             | ReactNode | `What do you want to do?` |
| decisionTitle             |             | ReactNode | `Related objects`         |
