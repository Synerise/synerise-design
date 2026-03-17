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

| Property               | Description                                            | Type                                        | Default         |
| ---------------------- | ------------------------------------------------------ | ------------------------------------------- | --------------- |
| format                 | Current format configuration                           | `FormattingValue`                           | -               |
| value                  | Example number shown in the trigger button label       | `number`                                    | -               |
| onDataFormatChange     | Called when user selects a data format                 | `(format: FormattingDataFormat) => void`    | -               |
| onCurrencyChange       | Called when a currency is selected                     | `(currency: CurrencyType) => void`          | -               |
| onUseSeparatorChange   | Called when the 1000-separator checkbox changes        | `(useSeparator: boolean) => void`           | -               |
| onCompactNumbersChange | Called when the compact numbers checkbox changes       | `(compactNumbers: boolean) => void`         | -               |
| onFixedLengthChange    | Called when decimal places are incremented/decremented | `(fixedLength: number) => void`             | -               |
| onSetDefault           | If provided, renders a "Set default" footer button     | `() => void`                                | -               |
| onFormattedValueChange | Called whenever the formatted display value changes    | `(formattedValue: string) => void`          | -               |
| text                   | Override any subset of UI labels                       | `Partial<FormatPickerTexts>`                | -               |
| currenciesConfig       | Custom currency list for the cash dropdown             | `CurrencyConfig[]`                          | USD/EUR/PLN/JPY |
| buttonType             | DS button type for the trigger button                  | `string`                                    | `'tertiary'`    |
| disabled               | Disables the trigger and all panel controls            | `boolean`                                   | -               |
| maxFixedLength         | Upper bound for decimal places                         | `number`                                    | -               |

### Texts

| Property       | Description                       | Type                     | Default              |
| -------------- | --------------------------------- | ------------------------ | -------------------- |
| header         | Header of format settings         | `string \| ReactNode` | `Number format`      |
| format         | Format label                      | `string \| ReactNode` | `Format`             |
| numeric        | Numeric type of format tooltip    | `string \| ReactNode` | `Numeric`            |
| cash           | Cash type of format tooltip       | `string \| ReactNode` | `Cash`               |
| percentage     | Percentage type of format tooltip | `string \| ReactNode` | `Percentage`         |
| setDefault     | Set default format button label   | `string \| ReactNode` | `Set default`        |
| useSeparator   | Use 1000 separator checkbox label | `string \| ReactNode` | `Use 1000 separator` |
| compactNumbers         | Compact numbers checkbox label                         | `string \| ReactNode`    | `Use compact numbers`  |
| currencyMenuItemPrefix | Prefix shown before the example value in currency rows | `string`                 | `'e.g.'`               |

### FormattingValue

| Property       | Description              | Type                 | Default |
| -------------- | ------------------------ | -------------------- | ------- |
| dataFormat     | Format of data           | FormattingDataFormat | -       |
| currency       | Selected currency        | CurrencyType         | -       |
| useSeparator   | Use 1000 separator       | boolean              | -       |
| compactNumbers | Use compact numbers      | boolean              | -       |
| fixedLength    | Number of decimal places | number               | -       |

### CurrencyType

`string` — any currency code string. The default `currenciesConfig` includes `USD`, `EUR`, `PLN`, `JPY`, but the type is not restricted to those values.

### FormattingDataFormat

Available values: `numeric` | `percent` | `cash`
