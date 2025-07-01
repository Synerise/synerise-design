---
id: subject
title: Subject
---

Subject UI Component

## Installation

```
npm i @synerise/ds-subject
or
yarn add @synerise/ds-subject
```

## Usage

```
import Subject from '@synerise/ds-subject'

<Subject
    texts={{
        noResults: 'No results',
        searchPlaceholder: 'Search'
    }}
    onSelectItem={(item) => {}
    onShowPreview={() => {}}
    type='event'
    placeholder='Choose event'
    iconPlaceholder={<VarTypeStringM />}
    selectedItem={undefined}
    items={[
        {
          id: 1,
          name: `Attribute 1`,
          icon: <NotificationsM />,
        },
        {
          id: 2,
          name: `Attribute 2`,
          icon: <NotificationsM />,
        }
    ]}
  />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-subject--default"></iframe>

## API

| --------- | ------ | ------ | ----- |
| getPopupContainerOverride | Popup container function for child tooltips and dropdowns | (trigger: HTMLElement | null) => HTMLElement; | - |
| iconPlaceholder | Icon for empty selected item | React.ReactNode | - |
| items | Array of available subjects | SubjectItem[] | [] |
| onActivate | Callback called when user opens dropdown | (fieldType: string) => void | - |
| onDeactivate | Callback called when user closes dropdown | () => void | - |
| onSelectItem | Callback called when user select new subject | ( SubjectItem) => void; | - |
| onShowPreview | Callback called when user clicks on Show Preview button | () => void \ undefined | - |
| placeholder | Placeholder for empty selected item | string \ React.ReactNode; | - |
| Property | Description | Type | Default |
| selectedItem? | Selected item | SubjectItem \ undefined; | `undefined` |
| texts | Object with translations | TEXTS | - |
| type? | Type of subject `parameter` \ `context` \ `event` | SubjectType | `parameter` |

### SubjectItem

| Property | Description          | Type            | Default |
| -------- | -------------------- | --------------- | ------- |
| icon     | Icon of subject item | React.ReactNode | -       |
| id       | Id of subject item   | React.ReactText | -       |
| name     | Name of subject item | string          | -       |

### TEXTS

| Property          | Description            | Type   | Default |
| ----------------- | ---------------------- | ------ | ------- |
| noResults         | No results info        | string | -       |
| searchPlaceholder | Search box placeholder | string | -       |
