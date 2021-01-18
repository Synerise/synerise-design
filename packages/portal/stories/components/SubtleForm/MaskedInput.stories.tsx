import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import Select from '@synerise/ds-select';
import { Cities } from './dataset';
import { boolean, text } from '@storybook/addon-knobs';
import Dropdown from '@synerise/ds-dropdown';
import { Input, MaskedInput } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
const decorator = storyFn => <div style={{ width: '314px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
export const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
export const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};

const stories = {
  maskedInput: () => {
    const [value, setValue] = React.useState<string>('');
    const placeholder = 'Number';
    const mask = '111-111-111';
    const mask_underscore = `_ _ _-_ _ _-_ _ _`;
    return (
      <div style={{ marginBottom: '16px', height: '57px' }}>
        <SubtleForm.Field
          value={value}
          activeElement={() => (
            <MaskedInput autoFocus mask={mask} value={value} onChange={e => setValue(e.target.value)} />
          )}
          inactiveElement={() => value || placeholder}
          label={renderLabel('Phone number')}
          labelTooltip={'Phone number'}
          mask={mask_underscore}
          maskVisible={!value}
        ></SubtleForm.Field>
      </div>
    );
  },
};

export default {
  name: 'Components/SubtleForm/Input',
  config: {},
  stories,
  decorator,
};
