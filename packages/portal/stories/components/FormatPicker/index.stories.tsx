import * as React from 'react';

import FormatPicker from '@synerise/ds-format-picker';
import { withState } from '@dump247/storybook-state';

const INITIAL_STATE = {
  format: {
    dataFormat: 'cash',
    currency: 'USD',
    useSeparator: false,
    fixedLength: 1,
    compactNumbers: false,
  },
};

const stories = {
  default: withState(INITIAL_STATE)(({ store }) => {
    const { format } = store.state;
    const handleDataFormatChange = dataFormat => {
      store.set({ format: { ...format, dataFormat } });
    };
    const handleCurrencyChange = currency => {
      store.set({ format: { ...format, currency } });
    };
    const handleUseSeparatorChange = useSeparator => {
      store.set({ format: { ...format, useSeparator } });
    };
    const handleFixedLengthChange = fixedLength => {
      store.set({ format: { ...format, fixedLength } });
    };
    const handleCompactNumberChange = compactNumbers => {
      store.set({ format: { ...format, compactNumbers } });
    };
    const handleSetDefault = () => {
      store.set({
        format: {
          dataFormat: 'numeric',
          currency: 'USD',
          useSeparator: false,
          fixedLength: 1,
          compactNumbers: false,
        },
      });
    };

    return (
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
    );
  }),
};

export default {
  name: 'Components/Pickers/FormatPicker',
  config: {},
  stories,
  Component: FormatPicker,
};
