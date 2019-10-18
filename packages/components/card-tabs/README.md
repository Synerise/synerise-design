---
id: card-tabs
title: CardTabs
---

CardTabs UI Component

## Installation

```
npm i @synerise/ds-card-tabs
or
yarn add @synerise/ds-card-tabs
```

## Usage

```
import CardTabs from '@synerise/ds-card-tabs'

<CardTabs
    maxTabsCount={4}
    onChangeOrder={() => {})}
    onAddTab={() => {})}
>
    <CardTab
        id={0}
        index={0}
        name="Variant A"
        tag="A"
        active={true}
        greyBackground={false}
        prefixIcon={<FileIcon />}
        suffixIcon={<FileIcon />}
        disabled={false}
        prefix={prefixType.TAG}
        onSelectTab={() => {})}
        onChangeName={() => {})}
        onRemoveTab={() => {}}
        onDuplicateTab={() => {})}
        invalid={false}
        draggable={false}
    />
    <CardTab
        id={1}
        index={1}
        name="Variant B"
        tag="B"
        active={false}
        greyBackground={false}
        prefixIcon={<FileIcon />}
        suffixIcon={<FileIcon />}
        disabled={false}
        prefix={prefixType.TAG}
        onSelectTab={() => {})}
        onChangeName={() => {})}
        onRemoveTab={() => {}}
        onDuplicateTab={() => {})}
        invalid={false}
        draggable={false}
    />
</CardTabs>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-card-tabs--default"></iframe>

## API

### CardTabs Component

| Property      | Description                                    | Type               | Default |
| ------------- | ---------------------------------------------- | ------------------ | ------- |
| maxTabsCount  | Max number of child components                 | number             | -       |
| onAddTab      | Callback fired when user clicks on add button  | function           | -       |
| onChangeOrder | Callback fired when user changes order of tabs | function(newOrder) | -       |

### CardTab Component

| Property       | Description                                                                     | Type                          | Default |
| -------------- | ------------------------------------------------------------------------------- | ----------------------------- | ------- |
| id             | Id of tab                                                                       | number                        | -       |
| index          | Position of tab                                                                 | number                        | -       |
| name           | Name of tab                                                                     | string                        | -       |
| tag            | Single letter (tag) of tab                                                      | string                        | -       |
| active         | Flag of active tab                                                              | boolean                       | false   |
| greyBackground | Change default color of tabs, use when background will be different then white  | boolean                       | false   |
| prefixIcon     | Icon visible on the left side of the tab                                        | SVG Icon                      | null    |
| suffixIcon     | Icon visible on the right side of the tab, when set action icons will be hidden | SVG Icon                      | null    |
| disabled       | Flag of disabled tabs                                                           | boolean                       | false   |
| invalid        | Flag of tabs with some errors                                                   | boolean                       | false   |
| draggable      | Shows drag handler on the left side of tab                                      | boolean                       | false   |
| onSelectTab    | Callback fired when user clicks on the tab                                      | (id: number) => {}            | -       |
| onRemoveTab    | Callback fired when user clicks on the remove tab icon                          | (id: number) => {}            | -       |
| onDuplicateTab | Callback fired when user clicks on the duplicate tab icon                       | (id: number) => {}            | -       |
| onChangeName   | Callback fired when the edit name input blur                                    | (id: number, newName: string) | -       |
