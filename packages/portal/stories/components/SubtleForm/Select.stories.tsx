import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import Select from '@synerise/ds-select';
import { Cities } from './dataset';
import { boolean, text } from '@storybook/addon-knobs';
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
    const [value, setValue] = React.useState<string>();
    const validationState = boolean('Set validation state', false);
    const errorMessage = text('Error Text', 'Error');

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <SubtleForm.Select
            onChange={val => setValue(val)}
            value={value}
            placeholder={'City'}
            label={renderLabel('City')}
            labelTooltip={'City'}
            suffixTooltip={'Select'}
            error={validationState}
            errorText={getErrorText(validationState,errorMessage)}
          >
            {Cities.map(c => (
              <Select.Option value={c}>{c}</Select.Option>
            ))}
          </SubtleForm.Select>
        </div>
      </div>
    );
  },
};

export default {
  name: 'Components/SubtleForm/Select',
  config: {},
  stories,
  decorator,
};
