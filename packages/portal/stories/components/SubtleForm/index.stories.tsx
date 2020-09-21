import * as React from 'react';

import SubtleForm from '@synerise/ds-subtle-form';
import { number, text } from '@storybook/addon-knobs';
const decorator = storyFn => <div style={{ width: '400px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const stories = {
  withMinRows: () => {
    const min = number('Set min rows ', 5, { min: 1, max: 10, range: true });
    const labelText = text('Set label text ', 'Label');
    const labelTooltip = text('Set label tooltip ', 'Label');
    const placeholder = text('Set placeholder text ', 'Description');
    const [value, setValue] = React.useState('');
    return (
      <SubtleForm.TextArea
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
    const [value, setValue] = React.useState('');
    return (
      <SubtleForm.TextArea
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
  name: 'Components/SubtleForm',
  config: {},
  stories,
  decorator,
};
