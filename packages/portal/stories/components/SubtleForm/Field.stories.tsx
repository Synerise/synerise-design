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
  default: () => {
    const [value, setValue] = React.useState<number>(1);
    const validationState = boolean('Set validation state', false);
    const errorMessage = text('Error Text', 'Error');
    const disabled = boolean('Set disabled', false);
    return (
      <div style={{ marginBottom: '16px', height: '57px' }}>
        <SubtleForm.Field
          activeElement={()=><InputNumber autoFocus value={value} onChange={e => setValue(e)} />}
          inactiveElement={'inactive'}
          placeholder={'City'}
          label={renderLabel('City')}
        ></SubtleForm.Field>
      </div>
    );
  },
};

export default {
  name: 'Components/SubtleForm/Field',
  config: {},
  stories,
  decorator,
};
