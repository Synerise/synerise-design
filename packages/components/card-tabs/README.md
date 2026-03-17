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
        name="Variant A"
        tag="A"
        active={true}
        greyBackground={false}
        suffixIcon={<FileIcon />}
        disabled={false}
        prefix={prefixType.TAG}
        onSelectTab={() => {}}
        onChangeName={() => {}}
        onRemoveTab={() => {}}
        onDuplicateTab={() => {}}
        invalid={false}
        draggable={false}
    />
    <CardTab
        id={1}
        name="Variant B"
        tag="B"
        active={false}
        greyBackground={false}
        suffixIcon={<FileIcon />}
        disabled={false}
        prefix={prefixType.TAG}
        onSelectTab={() => {}}
        onChangeName={() => {}}
        onRemoveTab={() => {}}
        onDuplicateTab={() => {}}
        invalid={false}
        draggable={false}
    />
</CardTabs>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-card-tabs--default"></iframe>

## API

### CardTabs Component

| Property      | Description                                    | Type                               | Default |
| ------------- | ---------------------------------------------- | ---------------------------------- | ------- |
| children      | Array of CardTab elements                      | Array<ReactElement<CardTabProps>>  | -       |
| addTabLabel   | Label text for the add-tab button              | string                             | -       |
| maxTabsCount  | Max number of child components                 | number                             | -       |
| onAddTab      | Callback fired when user clicks on add button  | () => void                         | -       |
| onChangeOrder | Callback fired when user changes order of tabs | (newOrder: CardTabProps[]) => void | -       |

### CardTab Component

| Property          | Description                                                                     | Type                                                                                                   | Default  |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------- |
| id                | Id of tab                                                                       | string \| number                                                                                       | -        |
| name              | Name of tab                                                                     | string                                                                                                 | -        |
| prefix            | Prefix variant selector                                                         | `prefixType.TAG` / `prefixType.DOT` / `prefixType.ICON` / `prefixType.HANDLE`                         | -        |
| tag               | Single letter (tag) shown when `prefix={prefixType.TAG}`                        | string                                                                                                 | -        |
| active            | Flag of active tab                                                              | boolean                                                                                                | `false`  |
| greyBackground    | Change default color of tabs, use when background will be different then white  | boolean                                                                                                | `false`  |
| prefixIcon        | Icon shown when `prefix={prefixType.ICON}`                                      | ReactNode                                                                                              | -        |
| suffixIcon        | Icon visible on the right side of the tab, when set action icons will be hidden | SVG Icon                                                                                               | null     |
| disabled          | Flag of disabled tabs                                                           | boolean                                                                                                | `false`  |
| invalid           | Flag of tabs with some errors                                                   | boolean                                                                                                | `false`  |
| invalidName       | Flag of tabs with invalid name                                                  | boolean                                                                                                | `false`  |
| draggable         | Shows drag handler on the left side of tab                                      | boolean                                                                                                | `false`  |
| onSelectTab       | Callback fired when user clicks on the tab                                      | (id: string \| number) => void                                                                         | -        |
| onPreviewTab      | Callback fired when user clicks on the preview tab icon                         | (id: string \| number) => void                                                                         | -        |
| onRemoveTab       | Callback fired when user clicks on the remove tab icon                          | (id: string \| number) => void                                                                         | -        |
| onDuplicateTab    | Callback fired when user clicks on the duplicate tab icon                       | (id: string \| number) => void                                                                         | -        |
| onChangeName      | Callback fired when the edit name input blur                                    | (id: string \| number, newName: string) => void                                                        | -        |
| texts             | Translations of CrudButtons tooltips                                            | CardTabTexts                                                                                           | -        |
| color             | Color of CardTab                                                                | `red`/ `green`/ `grey`/ `yellow`/ `blue`/ `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple`/ `violet` | `yellow` |
| colorDot          | Custom dot node shown when `prefix={prefixType.DOT}`; defaults to `CardDot`    | React.ReactNode                                                                                        | -        |
| itemData          | Additional item data                                                            | any                                                                                                    | -        |
| renderSuffix      | render custom suffix instead of cruds, dropdown menu or icon                    | (props: CardTabSuffixProps) => ReactNode                                                               | -        |
| actionsAsDropdown | render crud actions in dropdown instead of icons                                | boolean                                                                                                | `false`  |

#### CardTabTexts

| Property           | Description          | Type                     | Default     |
| ------------------ | -------------------- | ------------------------ | ----------- |
| changeNameTooltip  | Rename tooltip       | string / React.ReactNode | 'Rename'    |
| duplicateTooltip   | Duplicate tooltip    | string / React.ReactNode | 'Duplicate' |
| previewTooltip     | Preview tooltip      | string / React.ReactNode | 'Preview'   |
| removeTooltip      | Remove tooltip       | string / React.ReactNode | 'Remove'    |
| changeNameMenuItem | Rename menu label    | string / React.ReactNode | 'Rename'    |
| duplicateMenuItem  | Duplicate menu label | string / React.ReactNode | 'Duplicate' |
| removeMenuItem     | Remove menu label    | string / React.ReactNode | 'Remove'    |
