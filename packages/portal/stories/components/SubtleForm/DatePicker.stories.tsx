import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import { replaceLettersWithUnderscore } from '@synerise/ds-subtle-form/dist/Elements/DatePicker/utils';
const decorator = storyFn => <div style={{ width: '350px', padding: '16px', background: '#fff', marginBottom: '400px' }}>{storyFn()}</div>;
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>();
    const format = 'dd-MM-yyyy';
    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <SubtleForm.DatePicker
            autoFocus
            format={format}
            onApply={val => setValue(val)}
            value={value}
            placeholder={'Date'}
            label={renderLabel('Date')}
            labelTooltip={'Date'}
            suffixTooltip={'Select date'}
            texts={
              {
                inputPlaceholder: replaceLettersWithUnderscore(format),
                clearTooltip: 'Clear'
              }
            }
          />
        </div>
      </div>
    );
  },
};

export default {
  name: 'Components/SubtleForm/DatePicker',
  config: {},
  stories,
  decorator,
};
