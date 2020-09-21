---
id: subtle-form
title: SubtleForm
---

SubtleForm UI Component

## Installation

```
npm i @synerise/ds-subtle-form
or
yarn add @synerise/ds-subtle-form
```

## Usage

```
import SubtleForm from '@synerise/ds-subtle-form'

const [value, setValue] = React.useState('');
    return (
      <SubtleForm.TextArea
        minRows={1}
        maxRows={10}
        value={value}
        onChange={setValue}
        placeholder={'Description'}
        label={'Label'}
        labelTooltip={'Label tooltip'}
        suffixTooltip={'Edit'}
      />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-subtle-form--default"></iframe>

## API

### TextArea

| Property      | Description                                    | Type                     | Default |
| ------------- | ---------------------------------------------- | ------------------------ | ------- |
| label         | Label text displayed above the textarea        | string / React.ReactNode | ---     |
| labelTooltip  | Tooltip displayed on label hover               | string / React.ReactNode | ---     |
| maxRows       | Maximum rows to be displayed                   | number                   | 0       |
| minRows       | Minimum rows to be displayed                   | number                   | 1       |
| onChange      | Callback execute after input change            | (value: string) => void  | ---     |
| value         | Value displayed in the input                   | string                   | ---     |
| placeholder   | Placeholder displayed in the input             | string                   | ---     |
| suffix        | Suffix element rendered on the right-hand side | React.ReactNode          | ---     |
| suffixTooltip | Suffix tooltip dispalyed on hover              | string / React.ReactNode | ---     |
