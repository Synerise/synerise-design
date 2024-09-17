import React from 'react';

import SubtleForm from '@synerise/ds-subtle-form';
import { boolean, text } from '@storybook/addon-knobs';
const decorator = storyFn => <div style={{ width: '314px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
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
    const [name, setName] = React.useState<string | undefined>();
    const validationState = boolean('Set validation state', false);
    const disabled = boolean('Set disabled', false);
    const errorMessage = text('Error Text', 'Error');

    return (
      <div style={{ marginBottom: '16px' }}>
        <SubtleForm.Input
          inputProps={{ }}
          value={name}
          onChange={setName}
          placeholder={'Name'}
          label={renderLabel('Name')}
          labelTooltip={'Name'}
          suffixTooltip={'Edit'}
          error={validationState}
          errorText={getErrorText(validationState, errorMessage)}
          disabled={disabled}
        />
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
