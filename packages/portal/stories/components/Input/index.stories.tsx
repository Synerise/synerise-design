import * as React from 'react';
import { Input, TextArea, RawInput, InputGroup } from '@synerise/ds-input';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Select from '@synerise/ds-select';
import { array, boolean, number, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

const decorator = (storyFn) => (
  <div style={{ width: '300px' }}>
    {storyFn()}
  </div>
);

const stories = {
  basic: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <Input
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    );
  },
  inputGroup: () => {
    const [value, setValue] = React.useState<string>('');

    const select = (
      <Select onChange={action('OnChange')} style={{ width: '50%' }} defaultValue="post">
        <Select.Option value="post">POST</Select.Option>
        <Select.Option value="get">GET</Select.Option>
      </Select>
    );

    const input = (
      <RawInput
        placeholder={text('placeholder', 'Placeholder')}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        style={{ width: '50%' }}
      />
    );

    return (
      <InputGroup
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errors={array('errors', ['First error', 'Second error'])}
        resetMargin={boolean('resetMargin', false)}
        compact
      >
        {select}
        {input}
      </InputGroup>
    );
  },
  inputWithIcons: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <Input
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        icon1={<Icon component={<FileM />} />}
        icon2={<Icon component={<FileM />} />}
      />
    );
  },
  textarea: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    );
  },
  textareaWithIcons: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        icon1={<Icon component={<FileM />} />}
        icon2={<Icon component={<FileM />} />}
      />
    );
  },
};

export default {
  name: 'Components|Input',
  decorator,
  stories,
  Component: Input,
};
