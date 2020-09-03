import * as React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import InlineEdit from '@synerise/ds-inline-edit';
import { action } from '@storybook/addon-actions';
import InlineSelect from '@synerise/ds-inline-edit/dist/InlineSelect/InlineSelect';

const DEFAULT_VALUE = "Input value";
const dataSource = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }]

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>(DEFAULT_VALUE);
    const inputValue = text( 'InputValue', value)
    const size = select('Size', ['small', 'normal'], 'normal');
    const widthLimit = boolean('Width limit', false);
    const error = boolean('Error', false);
    const disabled = boolean('Disabled', false);

    return (
      <div style={{ padding: 8, display: 'inline-block' }}>
        <InlineEdit
          input={{
            name: 'name-of-input',
            value: inputValue,
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
  },
  inlineSelect: () => {
    const widthLimit = boolean('Width limit', false);
    const error = boolean('Error', false);
    const disabled = boolean('Disabled', false);

    return (
      <div style={{ padding: 8, display: 'inline-block' }}>
        <InlineSelect
          input={{
            name: 'name-of-input',
            maxLength: 120,
            placeholder: 'This is placeholder',
            onEnterPress: action('onEnterPress'),
          }}
          style={widthLimit ? { maxWidth: 128 } : {}}
          size={'normal'}
          error={error}
          disabled={disabled}
          dataSource={dataSource}
        />
      </div>
    );
  }
};

export default {
name: 'Components/InlineEdit',
  stories,
  Component: InlineEdit,
};
