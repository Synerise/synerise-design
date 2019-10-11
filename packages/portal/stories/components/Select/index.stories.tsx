import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import { action } from '@storybook/addon-actions';
import { boolean, text, select, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import Select from '@synerise/ds-select';

const { Option, OptGroup } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const modes = ['default', 'multiple', 'tags'];
const sizes = ['default', 'large', 'small'];
const values = ['Option A', 'Option B', 'Option C'];
const wrapperStyles = { padding: '20px', width: '322px' };
const dropdownMenuStyles = {};
const dropdownStyles = {};

storiesOf('Components|Select|Basic', module)
  .addDecorator(centered)
  .add('default', () => {
  const selectProps = () => ({
    allowClear: boolean('allowClear', true),
    defaultActiveFirstOption: boolean('defaultActiveFirstOption', true),
    defaultValue: text('defaultValue', 'Option A'),
    disabled: boolean('disabled', false),
    dropdownMatchSelectWidth: boolean('dropdownMatchSelectWidth', true),
    dropdownStyle: object('dropdownStyle', dropdownMenuStyles),
    dropdownMenuStyle: object('dropdownMenuStyle', dropdownStyles),
    loading: boolean('loading', false),
    mode: select('mode', modes, 'default'),
    onBlur: action('I am blurred'),
    onChange: action('I am changed'),
    onFocus: action('I am focused'),
    placeholder: text('placeholder', 'Please select value...'),
    size: select<'default' | 'small' | 'large'>('size', sizes as any, 'default'),
    showArraow: boolean('showArrow', false),
  });

  return (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <Select
          description={text('description', 'Description')}
          errorText={text('errorText', 'Error')}
          label={text('label', 'Label')}
          {...selectProps()}
          onChange={action('OnChange')}
          style={{ width: '100%' }}
        >
          {values.map(opt => (
            <Option value={opt}>{opt}</Option>
          ))}
        </Select>
      </DSProvider>
    </div>
  );
});

storiesOf('Components|Select', module)
  .addDecorator(centered)
  .add('multiple mode', () => {
  return (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <Select style={{ width: '100%' }} mode="multiple" defaultValue="a10" onChange={action('OnChange')}>
          {children}
        </Select>
      </DSProvider>
    </div>
  );
});

storiesOf('Components|Select', module)
  .addDecorator(centered)
  .add('with OptGroup', () => {
  return (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <Select style={{ width: '100%' }} defaultValue="lucy" onChange={action('OnChange')}>
          <OptGroup label="Manager">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </OptGroup>
          <OptGroup label="Engineer">
            <Option value="Yiminghe">yiminghe</Option>
          </OptGroup>
        </Select>
      </DSProvider>
    </div>
  );
});
