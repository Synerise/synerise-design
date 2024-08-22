import * as React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { NOOP } from '@synerise/ds-utils';

import FormatPicker from '../FormatPicker';

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
});
