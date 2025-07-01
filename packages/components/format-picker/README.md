---
id: format-picker
title: FormatPicker
---

FormatPicker UI Component

## Installation

```
npm i @synerise/ds-format-picker
or
yarn add @synerise/ds-format-picker
```

## Usage

```
import FormatPicker from '@synerise/ds-format-picker'

<FormatPicker
    format={store.state.format}
    value={19000.7}
    onDataFormatChange={handleDataFormatChange}
    onCurrencyChange={handleCurrencyChange}
    onUseSeparatorChange={handleUseSeparatorChange}
    onCompactNumbersChange={handleCompactNumberChange}
    onFixedLengthChange={handleFixedLengthChange}
    onSetDefault={handleSetDefault}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-format-picker--default"></iframe>

## API

| Property               | Description                    | Type                               | Default |
| ---------------------- | ------------------------------ | ---------------------------------- | ------- |
| format                 | Format configuration           | FormattingValue                    | -       |
| value                  | Example value                  | number                             | -       |
| onDataFormatChange     | Data format change handler     | (format) => void}                  | -       |
| onCurrencyChange       | Currency change handler        | (currency: CurrencyType) => void   | -       |
| onUseSeparatorChange   | Use separator change handler   | (useSeparator: boolean) => void}   | -       |
| onCompactNumbersChange | Compact numbers change handler | (compactNumbers: boolean) => void} | -       |
| onFixedLengthChange    | Fixed length change handler    | (fixedLength) => void              | -       |
| onSetDefault           | Set default value of format    | () => void                         | -       |
| text                   | Set of custom labels           | Texts                              | -       |
| buttonType             | type of button                 | string                             | -       |

### Texts

| Property       | Description                       | Type                     | Default              |
| -------------- | --------------------------------- | ------------------------ | -------------------- |
| header         | Header of format settings         | string \ React.ReactNode | `Number format`      |
| format         | Format label                      | string \ React.ReactNode | `Format`             |
| numeric        | Numeric type of format tooltip    | string \ React.ReactNode | `Numeric`            |
| cash           | Cash type of format tooltip       | string \ React.ReactNode | `Cash`               |
| percentage     | Percentage type of format tooltip | string \ React.ReactNode | `Percentage`         |
| setDefault     | Set default format button label   | string \ React.ReactNode | `Set default`        |
| useSeparator   | Use 1000 separator checkbox label | string \ React.ReactNode | `Use 1000 separator` |
| compactNumbers | Compact number checkbox label     | string \ React.ReactNode | `Compact humbers`    |

### FormattingValue

| Property       | Description              | Type                 | Default |
| -------------- | ------------------------ | -------------------- | ------- |
| dataFormat     | Format of data           | FormattingDataFormat | -       |
| currency       | Selected currency        | CurrencyType         | -       |
| useSeparator   | Use 1000 separator       | boolean              | -       |
| compactNumbers | Use compact numbers      | boolean              | -       |
| fixedLength    | Number of decimal places | number               | -       |

### CurrencyType

Available values: `USD` | `EUR` | `PLN` | `JPY`

### FormattingDataFormat

Available values: `numeric` | `percent` | `cash`
