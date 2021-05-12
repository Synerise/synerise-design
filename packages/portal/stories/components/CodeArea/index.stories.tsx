import * as React from 'react';
import CodeArea from '@synerise/ds-code-area';
import { text, boolean } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';

const stories = {
  default: withState({
    value: 'Test',
  })(({store}) => {
    const handleOnChange = (value) => {
      store.set({
        value,
      });
    };

    return (
      <CodeArea
        onChange={handleOnChange}
        value={store.state.value}
      />
    )
  }),
  withLabel: () => ({
    onChange: (val, event) => console.log('val ', val, ' event ', event),
    value: text('Set value', ''),
    label: text('Set label', 'Label')
  }),
  withLabelAndDescription: () => ({
    onChange: (val, event) => console.log('val ', val, ' event ', event),
    value: text('Set value', ''),
    label: text('Set label', 'Label'),
    description: text('Set description', 'Description')
  }),
  withErrorAndDescription: () => ({
    onChange: (val, event) => console.log('val ', val, ' event ', event),
    value: text('Set value', ''),
    error: boolean('Set error', true),
    errorText: text('Set error text', 'Error'),
    description: text('Set description', 'Description')
  })
};

export default {
name: 'Components/CodeArea',
  config: {},
  stories,
  Component: CodeArea,
}
