import * as React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import InlineEdit from '@synerise/ds-inline-edit';
import { action } from '@storybook/addon-actions';

const DEFAULT_VALUE = "Input value";

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>(DEFAULT_VALUE);

    const size = select('Size', ['small', 'normal'], 'normal');
    const widthLimit = boolean('Width limit', false);
    const error = boolean('Error', false);
    const disabled = boolean('Disabled', false);

    return (
      <div style={{ padding: 8, display: 'inline-block' }}>
        <InlineEdit
          input={{
            name: 'name-of-input',
            value: value,
            maxLength: 120,
            placeholder: 'This is placeholder',
            onBlur: action('onBlur'),
            onChange: event => setValue(event.target.value),
            onEnterPress: action('onEnterPress'),
          }}
          style={widthLimit ? { maxWidth: 128 } : {}}
          size={size}
          error={error}
          disabled={disabled}
          hideIcon={boolean('HideIcon', false)}
        />
      </div>
    );
  }
};

export default {
  name: 'Components|InlineEdit',
  stories,
  Component: InlineEdit,
};
