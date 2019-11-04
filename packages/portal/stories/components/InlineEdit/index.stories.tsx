import * as React from 'react';
import { withState } from '@dump247/storybook-state';
import { select, boolean } from '@storybook/addon-knobs';
import InlineEdit from '@synerise/ds-inline-edit';

const stories = storiesOf('Components|InlineEdit', module);

const DEFAULT_VALUE = "Input value";
const stories = {
  default: withState({ value: DEFAULT_VALUE, tempValue: DEFAULT_VALUE })(({ store }) => {
    const size = select('Size', ['small', 'normal'], 'normal');
    const widthLimit = boolean('Width limit', false);
    const error = boolean('Error', false);
    const disabled = boolean('Disabled', false);

    return (
      <div style={{ padding: 8, display: 'inline-block' }}>
        <InlineEdit
          input={{
            name: 'name-of-input',
            value: store.state.value,
            onBlur: event => store.set({tempValue: store.state.value}),
            onChange: event => store.set({ tempValue: event.target.value }),
            onEnterPress: event => store.set({value: store.state.tempValue}),
            placeholder={'This is placeholder'}
            maxLength={120}
            placeholder={'This is placeholder'}
          }}
          style={widthLimit ? { maxWidth: 128 } : {}}
          size={size}
          error={error}
          disabled={disabled}
          hideIcon={boolean('HideIcon', false)}
        />
      </div>
    );
  }),
};

export default {
  name: 'Components|InlineEdit',
  stories,
  Component: InlineEdit,
};
