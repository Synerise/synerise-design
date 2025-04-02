import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { fn } from '@storybook/test';

import FormatPicker from '@synerise/ds-format-picker';
import type { FormatPickerProps } from '@synerise/ds-format-picker';
import { NOOP } from '@synerise/ds-utils';

import { centeredPaddedWrapper, controlFromOptionsArray, fixedWrapper200 } from '../../utils';

import { BUTTON_TYPES } from '../Button/Button.constants';

const DEFAULT_FORMAT: FormatPickerProps['format'] = {
  dataFormat: 'numeric',
  currency: 'USD',
  useSeparator: false,
  fixedLength: 1,
  compactNumbers: false,
};

export default {
  title: 'Components/Pickers/FormatPicker',
  component: FormatPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  argTypes: {
    buttonType: {
      ...controlFromOptionsArray('inline-radio', BUTTON_TYPES),
    },
  },
  args: {
    header: 'Number format',
    format: DEFAULT_FORMAT,
    onCompactNumbersChange: fn(),
    onCurrencyChange: fn(),
    onDataFormatChange: fn(),
    onFixedLengthChange: fn(),
    onFormattedValueChange: fn(),
    onSetDefault: fn(),
    onUseSeparatorChange: fn(),
  },
  render: args => {
    const [{ format }, updateArgs] = useArgs();
    const handleDataFormatChange = (dataFormat: string) => {
      updateArgs({ format: { ...format, dataFormat } });
    };
    const handleCurrencyChange = (currency: string) => {
      updateArgs({ format: { ...format, currency } });
    };
    const handleUseSeparatorChange = (useSeparator: boolean) => {
      updateArgs({ format: { ...format, useSeparator } });
    };
    const handleFixedLengthChange = (fixedLength: number) => {
      updateArgs({ format: { ...format, fixedLength } });
    };
    const handleCompactNumberChange = (compactNumbers: boolean) => {
      updateArgs({ format: { ...format, compactNumbers } });
    };
    const handleSetDefault = () => {
      updateArgs({
        format: DEFAULT_FORMAT,
      });
    };
    return (
      <FormatPicker
        {...args}
        format={format}
        value={19000.7}
        onDataFormatChange={handleDataFormatChange}
        onCurrencyChange={handleCurrencyChange}
        onUseSeparatorChange={handleUseSeparatorChange}
        onCompactNumbersChange={handleCompactNumberChange}
        onFixedLengthChange={handleFixedLengthChange}
        onSetDefault={handleSetDefault}
      />
    );
  },
} as Meta<FormatPickerProps>;

type Story = StoryObj<FormatPickerProps>;

export const Default: Story = {};

export const AllTypes: Story = {
  decorators: [fixedWrapper200],
  render: args => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center'}}>
        <FormatPicker
          {...args}
          format={{ ...DEFAULT_FORMAT, dataFormat: 'numeric' }}
          value={19000.7}
          onDataFormatChange={NOOP}
          onCurrencyChange={NOOP}
          onUseSeparatorChange={NOOP}
          onCompactNumbersChange={NOOP}
          onFixedLengthChange={NOOP}
          onSetDefault={NOOP}
        />
        <FormatPicker
          {...args}
          format={{ ...DEFAULT_FORMAT, dataFormat: 'cash' }}
          value={19000.7}
          onDataFormatChange={NOOP}
          onCurrencyChange={NOOP}
          onUseSeparatorChange={NOOP}
          onCompactNumbersChange={NOOP}
          onFixedLengthChange={NOOP}
          onSetDefault={NOOP}
        />
        <FormatPicker
          {...args}
          format={{ ...DEFAULT_FORMAT, dataFormat: 'percent' }}
          value={19000.7}
          onDataFormatChange={NOOP}
          onCurrencyChange={NOOP}
          onUseSeparatorChange={NOOP}
          onCompactNumbersChange={NOOP}
          onFixedLengthChange={NOOP}
          onSetDefault={NOOP}
        />
      </div>
    );
  },
};

