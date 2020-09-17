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
    selectItem={(item) => {}
    showPreview={() => {}}
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

| Property        | Description                                             | Type                                | Default     | 
| ---------       | ------                                                  | ------                              | -----       | 
| iconPlaceholder | Icon for empty selected item                            | React.ReactNode           | -           | 
| items           | Array of available subjects                             | SubjectItem[]             | []          | 
| placeholder     | Placeholder for empty selected item                     | string \ React.ReactNode; | -           | 
| selectedItem?   | Selected item                                           | SubjectItem \ undefined;  | `undefined` | 
| selectItem      | Callback called when user select new subject            | ( SubjectItem) => void;   | -           | 
| showPreview     | Callback called when user clicks on Show Preview button | () => void                | -           | 
| texts           | Object with translations                                | TEXTS                     | -           | 
| type?           | Type of subject `parameter` \ `context` \ `event`       | SubjectType               | `parameter` | 
 
 

### SubjectItem

| Property  | Description          | Type            | Default | 
| --------- | ------               | ------          | -----   |
| icon      | Icon of subject item | React.ReactNode | -      | 
| id        | Id of subject item   | React.ReactText | -       | 
| name      | Name of subject item | string          | -      | 
 

### TEXTS
| Property          | Description            | Type   | Default | 
| ---------         | ------                 | ------ | -----   | 
| noResults         | No results info        | string | -       | 
| searchPlaceholder | Search box placeholder | string | -       | 

    
