import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider, NOOP } from '@synerise/ds-utils';

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
    const onChange = jest.fn();
    const onSetDefault = jest.fn();

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
