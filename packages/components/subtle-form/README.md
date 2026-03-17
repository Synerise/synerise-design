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
| disabled      | Disables hover effects and value editing       | boolean                  | false   |
| label         | Label text displayed above the textarea        | string / React.ReactNode | ---     |
| labelTooltip  | Tooltip displayed on label hover               | string / React.ReactNode | ---     |
| maxRows       | Maximum rows to be displayed                   | number                   | -       |
| minRows       | Minimum rows to be displayed                   | number                   | 1       |
| onChange      | Callback execute after input change            | (value: string) => void  | ---     |
| value         | Value displayed in the input                   | string                   | ---     |
| placeholder   | Placeholder displayed in the input             | string                   | ---     |
| suffix        | Suffix element rendered on the right-hand side | React.ReactNode          | ---     |
| suffixTooltip | Suffix tooltip displayed on hover              | React.ReactNode          | ---     |
| error         | Error state; forces the textarea into edit mode | boolean                 | ---     |
| errorText     | Error message displayed below the field        | React.ReactNode          | ---     |
| textAreaProps | Props forwarded to the underlying TextArea     | TextAreaProps            | ---     |

### Input

| Property      | Description                                    | Type                     | Default |
| ------------- | ---------------------------------------------- | ------------------------ | ------- |
| disabled      | Disables hover effects and value editing       | boolean                  | false   |
| label         | Label text displayed above the input           | string / React.ReactNode | ---     |
| labelTooltip  | Tooltip displayed on label hover               | string / React.ReactNode | ---     |
| value         | Value displayed in the input                   | string                   | ---     |
| onChange      | Callback executed after input change           | (value: string) => void  | ---     |
| placeholder   | Placeholder displayed in the input             | string                   | ---     |
| suffix        | Suffix element rendered on the right-hand side | React.ReactNode          | ---     |
| suffixTooltip | Suffix tooltip displayed on hover              | React.ReactNode          | ---     |
| error         | Error state; forces the input into edit mode   | boolean                  | ---     |
| errorText     | Error message displayed below the field        | React.ReactNode          | ---     |
| inputProps    | Props forwarded to the underlying Input        | InputProps               | ---     |

### Select

| Property      | Description                                    | Type                     | Default |
| ------------- | ---------------------------------------------- | ------------------------ | ------- |
| disabled      | Disables hover effects and value editing       | boolean                  | false   |
| label         | Label text displayed above the select          | string / React.ReactNode | ---     |
| labelTooltip  | Tooltip displayed on label hover               | string / React.ReactNode | ---     |
| value         | Selected value                                 | SelectValue              | ---     |
| placeholder   | Placeholder displayed when no value            | string                   | ---     |
| suffix        | Suffix element rendered on the right-hand side | React.ReactNode          | ---     |
| suffixTooltip | Suffix tooltip displayed on hover              | React.ReactNode          | ---     |
| error         | Error state; forces the select into edit mode  | boolean                  | ---     |
| errorText     | Error message displayed below the field        | React.ReactNode          | ---     |
| children      | `Select.Option` children                       | React.ReactNode          | ---     |

### DatePicker

| Property                | Description                                        | Type                     | Default          |
| ----------------------- | -------------------------------------------------- | ------------------------ | ---------------- |
| disabled                | Disables hover effects and value editing           | boolean                  | false            |
| label                   | Label text displayed above the date picker         | string / React.ReactNode | ---              |
| labelTooltip            | Tooltip displayed on label hover                   | string / React.ReactNode | ---              |
| value                   | Selected date                                      | Date                     | ---              |
| onApply                 | Called when date is confirmed; also deactivates    | (date: Date) => void     | ---              |
| onClear                 | Called when cleared; also deactivates              | () => void               | ---              |
| format                  | Date format string                                 | string                   | `'dd-MM-yyyy'`   |
| placeholder             | Placeholder displayed when no value                | string                   | ---              |
| suffix                  | Suffix element rendered on the right-hand side     | React.ReactNode          | ---              |
| suffixTooltip           | Suffix tooltip displayed on hover                  | React.ReactNode          | ---              |
| error                   | Error state; forces the picker into display mode   | boolean                  | ---              |
| errorText               | Error message displayed below the field            | React.ReactNode          | ---              |

### Field

| Property       | Description                                          | Type                     | Default |
| -------------- | ---------------------------------------------------- | ------------------------ | ------- |
| disabled       | Disables hover effects and interactions              | boolean                  | false   |
| label          | Label text displayed above the field                 | string / React.ReactNode | ---     |
| labelTooltip   | Tooltip displayed on label hover                     | string / React.ReactNode | ---     |
| active         | Controlled active (edit) state                       | boolean                  | ---     |
| activeElement  | Render function for the edit state                   | () => ReactElement       | ---     |
| inactiveElement| Render function for the display state               | () => ReactElement       | ---     |
| suffix         | Suffix element rendered on the right-hand side       | React.ReactNode          | ---     |
| suffixTooltip  | Suffix tooltip displayed on hover                    | React.ReactNode          | ---     |
| errorText      | Error message; forces the field into edit mode       | React.ReactNode          | ---     |
| mask           | Mask string shown below inactive content             | string                   | ---     |
| maskVisible    | Whether to show the mask                             | boolean                  | ---     |
