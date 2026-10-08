import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import type { FormatPickerProps } from '@synerise/ds-format-picker';
import FormatPicker from '@synerise/ds-format-picker';
import { NOOP } from '@synerise/ds-utils';

import {
  centeredPaddedWrapper,
  controlFromOptionsArray,
  fixedWrapper200,
} from '../../utils';
import { BUTTON_TYPES } from '../Button/Button.constants';

const DEFAULT_FORMAT: FormatPickerProps['format'] = {
  dataFormat: 'numeric',
  currency: 'USD',
  useSeparator: false,
  fixedLength: 1,
  compactNumbers: false,
};

const MANY_CURRENCIES: FormatPickerProps['currenciesConfig'] = [
  // Long names first: the example value must stay on one line next to them.
  ['AWG', 'Aruban florin'],
  ['AZN', 'Azerbaijani manat'],
  ['BAM', 'Bosnia and Herzegovina konvertibilna marka'],
  ['BBD', 'Barbadian dollar'],
  ['XCD', 'East Caribbean dollar'],
  ['USD', 'Dollar (US)'],
  ['EUR', 'Euro (EU)'],
  ['PLN', 'Złoty (PL)'],
  ['JPY', 'Yen (JP)'],
  ['GBP', 'Pound (GB)'],
  ['CHF', 'Franc (CH)'],
  ['CZK', 'Koruna (CZ)'],
  ['SEK', 'Krona (SE)'],
  ['NOK', 'Krone (NO)'],
  ['DKK', 'Krone (DK)'],
  ['HUF', 'Forint (HU)'],
  ['RON', 'Leu (RO)'],
  ['BGN', 'Lev (BG)'],
  ['ISK', 'Króna (IS)'],
  ['TRY', 'Lira (TR)'],
  ['UAH', 'Hryvnia (UA)'],
  ['CNY', 'Yuan (CN)'],
  ['HKD', 'Dollar (HK)'],
  ['SGD', 'Dollar (SG)'],
  ['KRW', 'Won (KR)'],
  ['INR', 'Rupee (IN)'],
  ['AUD', 'Dollar (AU)'],
  ['NZD', 'Dollar (NZ)'],
  ['CAD', 'Dollar (CA)'],
  ['MXN', 'Peso (MX)'],
  ['BRL', 'Real (BR)'],
  ['ARS', 'Peso (AR)'],
  ['CLP', 'Peso (CL)'],
  ['COP', 'Peso (CO)'],
  ['ZAR', 'Rand (ZA)'],
  ['EGP', 'Pound (EG)'],
  ['AED', 'Dirham (AE)'],
  ['SAR', 'Riyal (SA)'],
  ['ILS', 'Shekel (IL)'],
  ['THB', 'Baht (TH)'],
  ['MYR', 'Ringgit (MY)'],
  ['IDR', 'Rupiah (ID)'],
  ['PHP', 'Peso (PH)'],
].map(([currency, label]) => ({ currency, label }));

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
  render: (args) => {
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
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
        }}
      >
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

// No format chosen yet: the trigger shows the placeholder; picking anything sets a value, after which
// the clear icon brings the placeholder back (an optional per-row setting that inherits a default).
export const EmptyWithClear: Story = {
  render: (args) => {
    const [format, setFormat] = useState<
      FormatPickerProps['format'] | undefined
    >(undefined);
    const current = format ?? DEFAULT_FORMAT;
    const update = (partial: Partial<FormatPickerProps['format']>) =>
      setFormat({ ...current, ...partial });
    return (
      <FormatPicker
        {...args}
        format={current}
        isEmpty={!format}
        value={19000.7}
        onDataFormatChange={(dataFormat) => update({ dataFormat })}
        onCurrencyChange={(currency) => update({ currency })}
        onUseSeparatorChange={(useSeparator) => update({ useSeparator })}
        onCompactNumbersChange={(compactNumbers) => update({ compactNumbers })}
        onFixedLengthChange={(fixedLength) => update({ fixedLength })}
        onSetDefault={() => setFormat(DEFAULT_FORMAT)}
        onClear={() => setFormat(undefined)}
      />
    );
  },
};

export const WithClear: Story = {
  args: {
    onClear: fn(),
  },
};

// Dozens of currencies: the menu shows seven rows and scrolls the rest; the search matches labels and ISO codes.
export const ManyCurrencies: Story = {
  args: {
    format: { ...DEFAULT_FORMAT, dataFormat: 'cash' },
    currenciesConfig: MANY_CURRENCIES,
  },
};
