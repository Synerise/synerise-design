import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';

import Select from '@synerise/ds-select';

const { Option, OptGroup } = Select;

const style = { width: 120, margin: '0 20px 20px' };

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

storiesOf('Components|Select|Basic', module).add('Basic', () => {
  const selectProps = () => ({
    dropdownClassName: text('dropdown classname', 'select'),
    defaultValue: text('defaultValue', 'Noodles'),
    placeholder: text('placeholder', 'select'),
    size: text('size', 'large'),
    value: text('value', 'Jackie Chan'),
    allowClear: boolean('allowClear', true),
    open: boolean('open', true),
    loading: boolean('loading', false),
    disabled: boolean('disabled', false),
    mode: text('mode', 'default'),
    onChange: action('I am changed'),
    onFocus: action('I am focused'),
    onBlur: action('I am blurred'),
  });

  return (
    <>
      <Select defaultValue="lucy" style={style} {...selectProps()}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </>
  );
});

storiesOf('Components|Select', module).add('multiple mode', () => {
  return (
    <Select
      style={{ ...style, width: '70%' }}
      mode="multiple"
      placeholder="Please select"
      defaultValue="a10"
      onChange={handleChange}
    >
      {children}
    </Select>
  );
});

storiesOf('Components|Select', module).add('with OptGroup', () => {
  return (
    <Select defaultValue="lucy" style={style} onChange={handleChange}>
      <OptGroup label="Manager">
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
      </OptGroup>
      <OptGroup label="Engineer">
        <Option value="Yiminghe">yiminghe</Option>
      </OptGroup>
    </Select>
  );
});
