import * as React from 'react';

import SubtleForm from '@synerise/ds-subtle-form';
import { boolean, number, text } from '@storybook/addon-knobs';

const decorator = storyFn => <div style={{ width: '400px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
const renderLabel = (text: string) => {
  if (!text) {
    return undefined;
  }
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};

const TextareaWithKnobs = () => {
  const [description, setDescription] = React.useState<string | undefined>();
  const validationState = boolean('Set validation state', false);
  const disabled = boolean('Set disabled', false);
  const errorMessage = text('Error Text', 'Error');
  return <SubtleForm.TextArea
    minRows={3}
    hideLabel={boolean('Hide label', false)}
    value={description}
    onChange={setDescription}
    placeholder={'Description'}
    label={renderLabel(text('Description', 'Description'))}
    labelTooltip={'Description'}
    suffixTooltip={'Edit'}
    error={validationState}
    errorText={getErrorText(validationState, errorMessage)}
    disabled={disabled}
  />
};

const stories = {
  default: TextareaWithKnobs,
  simpleForm: () => {
    const [city, setCity] = React.useState<string | undefined>();
    const [name, setName] = React.useState<string | undefined>();
    const validationState = boolean('Set validation state', false);
    const disabled = boolean('Set disabled', false);
    const errorMessage = text('Error Text', 'Error');

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <SubtleForm.Input
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
        <div style={{ marginBottom: '16px' }}>
          <SubtleForm.Input
            value={city}
            onChange={setCity}
            placeholder={'City'}
            label={renderLabel('City')}
            labelTooltip={'City'}
            suffixTooltip={'Edit'}
            error={validationState}
            errorText={getErrorText(validationState, errorMessage)}
            disabled={disabled}
          />
        </div>
        <div style={{ marginBottom: '0px' }}>
          <TextareaWithKnobs/>
        </div>
      </div>
    );
  },
  withMinRows: () => {
    const min = number('Set min rows ', 5, { min: 1, max: 10, range: true });
    const labelText = text('Set label text ', 'Label');
    const labelTooltip = text('Set label tooltip ', 'Label');
    const placeholder = text('Set placeholder text ', 'Description');
    const disabled = boolean('Set disabled', false);

    const [value, setValue] = React.useState('');
    return (
      <SubtleForm.TextArea
        disabled={disabled}
        minRows={min}
        maxRows={10}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        label={renderLabel(labelText)}
        labelTooltip={labelTooltip}
        suffixTooltip={'Edit'}
      />
    );
  },
  withMaxRows: () => {
    const max = number('Set max rows ', 5, { min: 1, max: 10, range: true });
    const labelText = text('Set label text ', 'Label');
    const labelTooltip = text('Set label tooltip ', 'Label');
    const placeholder = text('Set placeholder text ', 'Description');
    const disabled = boolean('Set disabled', false);

    const [value, setValue] = React.useState('');
    return (
      <SubtleForm.TextArea
        disabled={disabled}
        maxRows={max}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        label={renderLabel(labelText)}
        labelTooltip={labelTooltip}
        suffixTooltip={'Edit'}
      />
    );
  },
};

export default {
  name: 'Components/SubtleForm/TextArea',
  config: {},
  stories,
  decorator,
};
