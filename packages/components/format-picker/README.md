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
    header={'Number format'}
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

| Property | Description | Type | Default |
| --- | --- | --- | --- |
