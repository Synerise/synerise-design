import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import Select from '@synerise/ds-select';
import { Cities } from './dataset';
import { boolean, text } from '@storybook/addon-knobs';
import Dropdown from '@synerise/ds-dropdown';
import { Input } from '@synerise/ds-input';
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
  inputNumber: () => {
    const [value, setValue] = React.useState<number>();
    const [active, setActive] = React.useState<boolean | undefined>(false);

    const placeholder = 'Number';
    return (
      <div style={{ marginBottom: '16px', height: '57px' }}>
        <SubtleForm.Field
          value={value}
          active={active}
          activeElement={() => (
            <InputNumber
              autoFocus
              value={value}
              onFocus={()=>setActive(true)}
              onBlur={() => setActive(false)}
              onChange={e => setValue(e)}
              placeholder={placeholder}
            />
          )}
          inactiveElement={() => value || placeholder}
          label={renderLabel('Number')}
          labelTooltip={'Number'}
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
