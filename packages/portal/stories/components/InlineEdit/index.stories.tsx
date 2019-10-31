import * as React from 'react';
import { withState } from '@dump247/storybook-state';
import { select, boolean } from '@storybook/addon-knobs';
import InlineEdit from '@synerise/ds-inline-edit';
import { action } from '@storybook/addon-actions';

const stories = {
  default: withState({ value: '' })(({ store }) => {
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
            onBlur: action('onBlur'),
          }}
          style={widthLimit ? { maxWidth: 128 } : {}}
          maxLength={120}
          onChange={event => store.set({ value: event.target.value })}
          placeholder={'This is placeholder'}
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
