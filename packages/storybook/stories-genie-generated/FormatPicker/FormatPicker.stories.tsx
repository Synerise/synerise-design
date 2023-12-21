import React from 'react';
import {
  Meta,
  Story
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import FormatPicker, {
  FormatPickerProps
} from './FormatPicker';
export default {
  title: 'Example/FormatPicker',
  component: FormatPicker,
}
as Meta;
const Template: Story < FormatPickerProps > = (args) => <FormatPicker {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  onUseSeparatorChange: action('Use Separator Change'),
  onFixedLengthChange: action('Fixed Length Change'),
  onDataFormatChange: action('Data Format Change'),
  onCurrencyChange: action('Currency Change'),
  onCompactNumbersChange: action('Compact Numbers Change'),
  onSetDefault: action('Set Default'),
  value: '12345',
  format: 'default',
  text: {
    header: 'Number format',
    format: 'Format',
    numeric: 'Numeric',
    cash: 'Cash',
    percentage: 'Percentage',
    setDefault: 'Set default',
    useSeparator: 'Use 1000 separator',
    compactNumbers: 'Use compact numbers',
  },
  currenciesConfig: {
    USD: {
      symbol: '$',
      name: 'USD',
      fractionDigits: 2
    },
    EUR: {
      symbol: '€',
      name: 'EUR',
      fractionDigits: 2
    },
    GBP: {
      symbol: '£',
      name: 'GBP',
      fractionDigits: 2
    },
  },
};