import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { itemSizes, LIST_ITEM_SIZE_MAPPING } from '@synerise/ds-list-item';
import { NOOP } from '@synerise/ds-utils';

import FormatPicker from '../FormatPicker';

const WAIT_FOR = {
  timeout: 800,
};

describe('FormatPicker', () => {
  it('should render basic version', () => {
    renderWithProvider(
      <FormatPicker
        format={{
          dataFormat: 'numeric',
          currency: '',
          useSeparator: false,
          compactNumbers: false,
          fixedLength: 0,
        }}
        value={0}
        onDataFormatChange={NOOP}
        onCurrencyChange={NOOP}
        onUseSeparatorChange={NOOP}
        onCompactNumbersChange={NOOP}
        onFixedLengthChange={NOOP}
      />
    );
    expect(screen.getByText('Format 0')).toBeTruthy();
  });
  test('change currency type and set default',async () => {
    const onChange = vi.fn();
    const onSetDefault = vi.fn();

    renderWithProvider(
      <FormatPicker
        format={{
          dataFormat: 'numeric',
          currency: 'USD',
          useSeparator: false,
          compactNumbers: false,
          fixedLength: 0,
        }}
        value={19000}
        onDataFormatChange={NOOP}
        onCurrencyChange={NOOP}
        onUseSeparatorChange={NOOP}
        onCompactNumbersChange={NOOP}
        onFixedLengthChange={NOOP}
        onFormattedValueChange={onChange}
        onSetDefault={onSetDefault}
      />
    );

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(screen.getByTestId('ds-format-picker-overlay')).toBeInTheDocument(), WAIT_FOR);
    const modal = within(screen.getByTestId('ds-format-picker-overlay'));
    await waitFor(
      () => expect(modal.getByTestId('ds-format-picker-type-cash')).not.toHaveStyle({ pointerEvents: 'none' }),
      WAIT_FOR
    );
    userEvent.click(modal.getByTestId('ds-format-picker-type-cash'));
    const clearBtn = screen.getByTestId('ds-format-picker-default-trigger');
    userEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByText('Format 19000')).toBeTruthy();
  });
});

describe('FormatPicker — empty state and clear', () => {
  const FORMAT = {
    dataFormat: 'numeric' as const,
    currency: 'USD',
    useSeparator: false,
    compactNumbers: false,
    fixedLength: 0,
  };
  const picker = (props: Partial<React.ComponentProps<typeof FormatPicker>> = {}) => (
    <FormatPicker
      format={FORMAT}
      value={19000}
      onDataFormatChange={NOOP}
      onCurrencyChange={NOOP}
      onUseSeparatorChange={NOOP}
      onCompactNumbersChange={NOOP}
      onFixedLengthChange={NOOP}
      {...props}
    />
  );

  it('shows the placeholder instead of the formatted example while empty', () => {
    renderWithProvider(picker({ isEmpty: true }));
    expect(screen.getByTestId('ds-format-picker-trigger')).toHaveTextContent('Set format');
    expect(screen.queryByText('Format 19000')).not.toBeInTheDocument();
  });

  it('accepts a custom placeholder through texts', () => {
    renderWithProvider(picker({ isEmpty: true, text: { placeholder: 'Use report format' } }));
    expect(screen.getByTestId('ds-format-picker-trigger')).toHaveTextContent('Use report format');
  });

  it('renders the clear icon for a set format and calls onClear', async () => {
    const onClear = vi.fn();
    renderWithProvider(picker({ onClear }));
    await userEvent.click(screen.getByTestId('ds-format-picker-clear'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('names the clear icon for assistive technology', () => {
    renderWithProvider(picker({ onClear: vi.fn() }));
    expect(screen.getByTestId('ds-format-picker-clear')).toHaveAccessibleName('Clear');
  });

  it('uses the custom clear text as the accessible name too', () => {
    renderWithProvider(picker({ onClear: vi.fn(), text: { clear: 'Reset format' } }));
    expect(screen.getByTestId('ds-format-picker-clear')).toHaveAccessibleName('Reset format');
  });

  it('has nothing to clear while empty, disabled or without onClear', () => {
    const { rerender } = renderWithProvider(picker({ isEmpty: true, onClear: vi.fn() }));
    expect(screen.queryByTestId('ds-format-picker-clear')).not.toBeInTheDocument();
    rerender(picker({ onClear: vi.fn(), disabled: true }));
    expect(screen.queryByTestId('ds-format-picker-clear')).not.toBeInTheDocument();
    rerender(picker());
    expect(screen.queryByTestId('ds-format-picker-clear')).not.toBeInTheDocument();
  });
});

describe('FormatPicker — currency list', () => {
  const CODES = [
    'USD', 'EUR', 'PLN', 'JPY', 'GBP', 'CHF', 'CZK', 'SEK', 'NOK', 'DKK',
    'HUF', 'RON', 'BGN', 'ISK', 'TRY', 'RUB', 'UAH', 'CNY', 'HKD', 'SGD',
    'KRW', 'INR', 'AUD', 'NZD', 'CAD', 'MXN', 'BRL', 'ARS', 'CLP', 'COP',
    'PEN', 'ZAR', 'EGP', 'AED', 'SAR', 'ILS', 'THB', 'MYR', 'IDR', 'PHP',
  ];
  const currencies = (count: number) =>
    CODES.slice(0, count).map((currency, index) => ({ currency, label: `Currency ${index}` }));

  const openCurrencies = async (currenciesConfig: ReturnType<typeof currencies>) => {
    const onCurrencyChange = vi.fn();
    renderWithProvider(
      <FormatPicker
        format={{
          dataFormat: 'cash',
          currency: currenciesConfig[0].currency,
          useSeparator: false,
          compactNumbers: false,
          fixedLength: 0,
        }}
        value={19000}
        currenciesConfig={currenciesConfig}
        onDataFormatChange={NOOP}
        onCurrencyChange={onCurrencyChange}
        onUseSeparatorChange={NOOP}
        onCompactNumbersChange={NOOP}
        onFixedLengthChange={NOOP}
      />
    );
    await userEvent.click(screen.getByTestId('ds-format-picker-trigger'));
    await screen.findByTestId('ds-format-picker-overlay');
    await userEvent.click(screen.getByTestId('ds-format-picker-currency-trigger'));
    await screen.findByText('Currency 1');
    return { onCurrencyChange };
  };

  it('caps a long currency list at a scrollable height', async () => {
    await openCurrencies(currencies(40));

    const scrollArea = screen.getByText('Currency 1').closest('[data-testid="virtual-scrollbar"]') as HTMLElement;
    expect(scrollArea).not.toBeNull();
    const maxHeight = Number.parseInt(scrollArea.style.maxHeight, 10);
    expect(maxHeight).toBeGreaterThan(0);
    expect(maxHeight).toBeLessThan(40 * LIST_ITEM_SIZE_MAPPING[itemSizes.DEFAULT]);
  });

  it('keeps the example value next to every currency', async () => {
    await openCurrencies(currencies(40));

    expect(screen.getAllByText(/^e\.g\. /)).toHaveLength(40);
  });

  it('offers a search box even for a short currency list', async () => {
    await openCurrencies(currencies(4));

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('narrows the list to the currencies matching the query', async () => {
    await openCurrencies(currencies(40));

    await userEvent.type(screen.getByPlaceholderText('Search'), 'Currency 39');

    expect(await screen.findByText('Currency 39')).toBeInTheDocument();
    expect(screen.queryByText('Currency 1')).not.toBeInTheDocument();
  });

  it('finds a currency by its code, whatever the case', async () => {
    await openCurrencies(currencies(40));

    await userEvent.type(screen.getByPlaceholderText('Search'), 'pln');

    expect(await screen.findByText('Currency 2')).toBeInTheDocument();
    expect(screen.queryByText('Currency 1')).not.toBeInTheDocument();
  });

  it('selects a currency picked from the search results', async () => {
    const { onCurrencyChange } = await openCurrencies(currencies(40));

    await userEvent.type(screen.getByPlaceholderText('Search'), 'Currency 39');
    await userEvent.click(await screen.findByText('Currency 39'));

    expect(onCurrencyChange).toHaveBeenCalledWith('PHP');
  });
});
