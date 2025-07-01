---
id: step-card
title: StepCard
---

StepCard UI Component

## Installation

```
npm i @synerise/ds-step-card
or
yarn add @synerise/ds-step-card
```

## Usage

```
import StepCard from '@synerise/ds-step-card'

<StepCard
matching={true}
onChangeMatching={(matchingValue) => {}}
name={'funnel'}
onChangeName={(name) => {}}
onDuplicate={() => {}}
onDelete={() => {}}
texts={{
  matching: 'Matching',
  notMatching: 'Not matching',
  namePlaceholder: 'Placeholder',
  moveTooltip: 'Move',
  deleteTooltip: 'Delete',
  duplicateTooltip: 'Duplicate',
}}
footer={<span>Footer</span>}
>
<span>Content</span>
</StepCard>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-step-card--default"></iframe>

## API

| Property         | Description                                                 | Type                        | Default |
| ---------------- | ----------------------------------------------------------- | --------------------------- | ------- |
| matching         | Main matching configuration                                 | : MatchingProps             | -       |
| onChangeMatching | Function called when user change value of StepCard matching | (matching: boolean) => void | -       |
| onChangeName     | Function called when user change name of StepCard           | (name: string) => void      | -       |
| onDelete         | Function called when user click on delete StepCard icon     | () => void                  | -       |
| onDuplicate      | Function called when user click on duplicate StepCard icon  | () => void                  | -       |
| footer           | React node to inject as footer of StepCard React.ReactNode  | -                           |
| headerRightSide  | React node to inject into header right side slot            | React.ReactNode             | -       |
| texts            | Object with translations                                    | StepCardTexts               | -       |
| readonly         | Toggles editability (cruds, step name, draggability)        | boolean                     | -       |

### StepCardTexts

| Property         | Description                                               | Type   | Default        |
| ---------------- | --------------------------------------------------------- | ------ | -------------- |
| matching         | Label of Toggle component, visible when matching is true  | string | 'Matching'     |
| notMatching      | Label of Toggle component, visible when matching is false | string | 'Not matching' |
| namePlaceholder  | Placeholder of step name                                  | string | 'Name'         |
| moveTooltip      | Tooltip on move icon                                      | string | 'Move'         |
| deleteTooltip    | Tooltip on delete icon                                    | string | 'Delete'       |
| duplicateTooltip | Tooltip on duplicate icon                                 | string | 'Duplicate'    |
