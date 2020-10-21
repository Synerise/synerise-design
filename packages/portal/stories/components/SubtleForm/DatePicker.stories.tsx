import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import { replaceLettersWithUnderscore } from '@synerise/ds-subtle-form/dist/Elements/DatePicker/utils';
import { boolean, text } from '@storybook/addon-knobs';
const decorator = storyFn => (
  <div style={{ width: '350px', padding: '16px', background: '#fff', marginBottom: '400px' }}>{storyFn()}</div>
);
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};
const stories = {
  default: () => {
    const [value, setValue] = React.useState<Date>();
    const [open, setOpen] = React.useState<boolean>(false);
    const validationState = boolean('Set validation state', false);
    const errorMessage = text('Error Text', 'Error');
    const format = 'dd-MM-yyyy';
    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <SubtleForm.DatePicker
            autoFocus
            format={format}
            onApply={val => setValue(val)}
            onClear={()=>{
              setValue(undefined)
            }}
            value={value}
            placeholder={'Date'}
            label={renderLabel('Date')}
            labelTooltip={'Date'}
            suffixTooltip={'Select date'}
            error={validationState && !open}
            errorText={getErrorText(validationState && !open, errorMessage)}
            onDropdownVisibleChange={setOpen}
            dropdownProps={{ align: { offset: [0, 8] } }}
            activeProp={open}
            disabledHours={[]}
            disabledMinutes={[]}
            disabledSeconds={[]}
            texts={
              {
                inputPlaceholder: replaceLettersWithUnderscore(format),
                clearTooltip: 'Clear',
              } as any
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
