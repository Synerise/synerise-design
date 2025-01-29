import React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import InlineEdit from '@synerise/ds-inline-edit';
import { action } from '@storybook/addon-actions';
import InlineSelect from '@synerise/ds-inline-edit/dist/InlineSelect/InlineSelect';
import { EditM } from '@synerise/ds-icon';

const DEFAULT_VALUE = 'Input value';
const dataSource = [{ text: 'Alisa Strosin' }, { text: 'Ayden Dietrich	' }, { text: 'Murl Schimmel' }];

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>(DEFAULT_VALUE);
    
    const size = select('Size', ['small', 'normal', 'large'], 'normal');
    const widthLimit = boolean('Width limit', false);
    const error = boolean('Error', false);
    const disabled = boolean('Disabled', false);
    const customIcon = boolean('CustomIcon', false)

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
          customIcon={customIcon ? <EditM/> : undefined}
        />
      </div>
    );
  },
  inlineSelect: () => {
    const error = boolean('Error', false);
    const disabled = boolean('Disabled', false);
    const expanded = boolean('Initially open', false);
    const placeholder = text('Placeholder', 'Placeholder');
    const size = select('Size', ['small', 'normal'], 'normal');
    return (
      <div style={{ padding: 8, display: 'inline-block' }}>
        <InlineSelect
          input={{
            name: 'name-of-input'
          }}
          placeholder={placeholder}
          size={size}
          error={error}
          disabled={disabled}
          dataSource={dataSource}
          expanded={expanded}
        />
      </div>
    );
  },
};

export default {
  name: 'Components/InlineEdit',
  stories,
  Component: InlineEdit,
};
